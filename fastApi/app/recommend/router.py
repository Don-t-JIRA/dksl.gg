from typing import Union, List, Dict
from fastapi import APIRouter, Depends
from datetime import datetime
import time
import pandas as pd
from sklearn.cluster import KMeans
import statistics
import random

from app.apis.riot.controller import RiotApiController
from app.users.crud import lol_profiles as lol_profiles_crud
from app.common.schema import create_response
from app.database import get_db
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler

router = APIRouter()

@router.get("")
def get_recommend_list(
    summoner_name: Union[str, None] = "",
    db_session=Depends(get_db),
):
    riot_api = RiotApiController(summoner_name=summoner_name)
    summoner_info = riot_api.get_summoner_info()
    puu_id = summoner_info['puuid']

    current_lol_profile = lol_profiles_crud.get(
        puu_id=puu_id, db_session=db_session)
    if current_lol_profile == None:
        return create_response(message="no lol_profile", data={})

    # 마지막 전적 갱신 시간
    last_updated_at = current_lol_profile.last_updated_at
    start_time = int(
        time.mktime(
            datetime.strptime(str(last_updated_at),
                              "%Y-%m-%d %H:%M:%S").timetuple()
        )
    )
    match_histories = []
    match_ids = []
    match_ids = riot_api.get_match_list_timeless(count=20)

    while match_ids:
        for match_id in match_ids:
            match_histories.append(
                riot_api.get_match_info_by_id(match_id=match_id))

        match_histories = sorted(
            match_histories,
            key=lambda item: item.get("info", {}).get("gameStartTimestamp"),
        )

        start_time = match_histories[0].get(
            "info", {}).get("gameStartTimestamp")

        # 1번만 하기
        break

    match_histories_mapped = []

    for match in match_histories:
        for participant in match.get("info", {}).get("participants", []):
            challenges = participant.get("challenges", {})
            if puu_id != participant.get("puuid", ""):
                continue
            else:
                data = {
                    "ChampLevel": int(participant.get("champLevel", 0)),
                    "SoloKills": int(challenges.get("soloKills", 0)),
                    "Assists": int(participant.get("assists", 0)),
                    "DamagePerMinute": float(challenges.get("damagePerMinute", 0.0)),
                    "DamageTakenOnTeamPercentage": float(challenges.get("damageTakenOnTeamPercentage", 0.0)),
                    "Kda": float(challenges.get("kda", 0.0)),
                    "LaneMinions10Min": int(challenges.get("laneMinionsFirst10Minutes", 0)),
                    "TotalDamageDealtToChampions": int(participant.get("totalDamageDealtToChampions", 0)),
                    "VisionScore": int(participant.get("visionScore", 0)),
                    "ControlWard": int(challenges.get("controlWardsPlaced", 0))
                }

                match_histories_mapped.append(data)

    print(match_histories_mapped)
    # match_histories_mapped 리스트를 DataFrame으로 변환
    df_train = pd.DataFrame(match_histories_mapped)

    print(df_train)

    Cluster0 = ["Ornn", "Blitzcrank", "Nautilus", "Maokai", "Zac", "Jarvan IV", "Karma", "Volibear", "Sion", "Braum"]
    Cluster1 = ["Fiora", "Nasus", "Trundle", "Jax", "Yorick", "Wukong", "Camille", "Garen", "Sett", "Master Yi"]
    Cluster2 = ["Ezreal", "Xerath", "Zed", "Darius", "Olaf", "Talon", "LeBlanc",
                "Kennen", "Warwick", 'Khazix']

    celebrity0 = ['Insec', "oyo", "destiny", "Zeus", "Kingen"]
    celebrity1 = ['Thal', 'paka', 'Irelking', "Rich", "Kanavi"]
    celebrity2 = ['The Shy', "Pz_zzang", 'Baekk', "Showmaker", "Ruler"]

    ans = []
    dict = {}

    min_max_scaler = MinMaxScaler()

    class CustomPreprocessor(BaseEstimator, TransformerMixin):

        def fit(self, X, y=None):
            return self  # Nothing else to do

        def transform(self, X):
            # 필요한 컬럼 추출
            columns = ['ChampLevel', 'SoloKills', 'Assists', 'DamagePerMinute', 'DamageTakenOnTeamPercentage', 'Kda', 'LaneMinions10Min', 'TotalDamageDealtToChampions', 'VisionScore', 'ControlWard']

            X = X[columns]

            # 각 컬럼별 전처리
            X = X[X['ChampLevel'] > 6]
            X.loc[X['SoloKills'] >= 6, 'SoloKills'] = 5
            X = X[X['DamagePerMinute'].between(100, 1800)]
            X = X[X['DamageTakenOnTeamPercentage'] > 0.05]
            X = X[X['Kda'] > 0]
            X = X[X['LaneMinions10Min'] > 0]
            X = X[X['VisionScore'] > 0]

            # ControlWard 컬럼 처리
            X['ControlWard'] = X['ControlWard'] + 1
            # 새로운 컬럼 생성 및 처리
            X['min'] = X['TotalDamageDealtToChampions'] / X["DamagePerMinute"]
            X["assists_per_minutes"] = X["Assists"] / X["min"]
            X = X[X["assists_per_minutes"] > 0]

            X.drop(['Assists', 'min'], axis=1, inplace=True)

            return X

    pipeline = Pipeline(steps=[
        ('preprocessing', CustomPreprocessor()),
        ('scaling', MinMaxScaler()),
        ('kmeans', KMeans(n_clusters=3))
    ])

    pipeline.fit(df_train)

    cluster_labels = pipeline.predict(df_train)

    mode_value = statistics.mode(cluster_labels)

    def cluster_result(value):
        if value == 0:
            ans.append((random.sample(Cluster0, 3), random.choice(celebrity0)))
        elif value == 1:
            ans.append((random.sample(Cluster1, 3), random.choice(celebrity1)))
        elif value == 2:
            ans.append((random.sample(Cluster2, 3), random.choice(celebrity2)))
        elif isinstance(value, str):
            return "error"
        else:
            return "error"

    try:
        result = cluster_result(mode_value)
    except NameError:
        result = "Error"

    for i in range(len(ans[0][0])):
        dict['champ' + str(i)] = ans[0][0][i]

    dict['celeb'] = ans[0][1]

    return dict