from datetime import datetime
import time
from typing import Union, List, Dict
from fastapi import APIRouter, Depends
from sqlalchemy.exc import IntegrityError

from app.apis.riot.controller import RiotApiController
from app.common.schema import IResponseBase, create_response, create_match_history_response
from app.users.crud import lol_profiles as lol_profiles_crud
from app.users.model import LolProfiles as LolProfiles
from app.match_history.schema import (
    ICurrentSeasonSummariesCreate,
    IMatchHistoriesCreate,
    IMatchHistoriesRead,
)
from app.database import exec_query, get_db
from app.match_history.crud import match_history_crud, current_season_summaries_crud

router = APIRouter()

@router.get("", response_model=Dict[str, Union[List[IMatchHistoriesRead], str, Dict]])
def get_match_history(
    summoner_name: str,
    db_session=Depends(get_db),
):
    """
    유저의 전적 정보 불러오기
    """
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
    match_ids = riot_api.get_match_list(count=20, start_time=start_time)

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

        match_ids = riot_api.get_match_list(count=20, start_time=start_time)

        # 1번만 하기
        break
    match_histories_mapped = []
    batch = []  # Initialize an empty batch list

    for match in match_histories:
        for participant in match.get("info", {}).get("participants", []):
            # Create and append the IMatchHistoriesCreate object to the batch
            batch.append(
                IMatchHistoriesCreate(
                    level=participant.get("champLevel", ""),
                    CS=participant.get("totalMinionsKilled", 0),
                    item_0_id=participant.get("item0"),
                    item_1_id=participant.get("item1"),
                    item_2_id=participant.get("item2"),
                    item_3_id=participant.get("item3"),
                    item_4_id=participant.get("item4"),
                    item_5_id=participant.get("item5"),
                    item_6_id=participant.get("item6"),
                    spell_0_id=participant.get("summoner1Id", ""),
                    spell_1_id=participant.get("summoner2Id", ""),
                    rune_0_id=participant.get("perks", {}).get("styles", [])[0].get("style"),
                    rune_1_id=participant.get("perks", {}).get("styles", [])[1].get("style"),
                    season=match.get("info", {}).get("gameVersion", ""),
                    gold=participant.get("goldEarned", ""),
                    play_duration=str(match.get("info", {}).get("gameDuration", "")),
                    play_time=str(match.get("info", {}).get("gameStartTimestamp", "")),
                    queue_type=match.get("info", {}).get("queueId", ""),
                    summoner_name=participant.get("summonerName", ""),
                    match_id=match.get("metadata", {}).get("matchId", ""),
                    line_name=participant.get("teamPosition"),
                    champion_name_en=participant.get("championName", ""),
                    kill=participant.get("kills", ""),
                    death=participant.get("deaths", ""),
                    assist=participant.get("assists", ""),
                    win_or_lose=1 if participant.get("win", False) else 0,
                )
            )

            # Check if the batch contains 10 objects
            if len(batch) == 10:
                # Append the batch to the main list
                match_histories_mapped.extend(batch)
                # Clear the batch for the next 10 objects
                batch = []

    # Check if there are any remaining objects in the batch and append them
    if batch:
        match_histories_mapped.extend(batch)

    response_data = create_response(match_histories_mapped, message="전적 불러오기")

    return response_data



@router.put("")
def put_match_history(
    summoner_name: str,
    db_session=Depends(get_db),
) -> IResponseBase[IMatchHistoriesRead]:
    """
    유저의 정보를 최신으로 갱신

    1. CURRENT_SEASON_SUMMARIES 통계 및 삽입
    2. 유저의 전적 정보 불러오기
    3. MOST_CHAMPION_SUMMARIES 통계 및 삽입
    4. MOST_LINE_SUMMARIES 통계 및 삽입
    """

    # 1
    tiers = exec_query(db_session, "SELECT * FROM TIERS;")
    # tiers_map = {}
    # for tier in tiers:
    #     tiers_map[tier.get("name_en")] = tier.get("name_en")
    #     print(tier.get("name_en"))

    rank_map = {"IV": 4, "III": 3, "II": 2, "I": 1}
    queues = exec_query(db_session, "SELECT * FROM QUEUES;")

    riot_api = RiotApiController(summoner_name=summoner_name)
    summoner_info = riot_api.get_summoner_info()

    puu_id = summoner_info.get("puuid", "")

    league_infos = riot_api.get_league_info()

    # 2
    match_histories = match_history_crud.get_user_match_histories(
        summoner_name=summoner_name, db_session=db_session
    )

    for league_info in league_infos:
        queue_type = league_info.get("queueType")
        # 큐 타입에 해당하는 큐를 찾기
        matching_queue = next((q for q in queues if q.get("name_en") == queue_type), None)

        # 큐를 찾았을 때 큐의 id를 사용하고, 찾지 못했을 때 기본값 0 사용
        queue = matching_queue.get("id", 0)

        # tier_id 찾기
        tier_name = league_info.get("tier")

        # 존재하는가?
        current_season_summary = current_season_summaries_crud.get_by_puu_id_queue(
            puu_id=puu_id, queue_id=queue, db_session=db_session
        )

        obj_new = ICurrentSeasonSummariesCreate(
            losses=league_info.get("losses"),
            lp=league_info.get("leaguePoints"),
            queue_id=queue,
            rank=rank_map.get(league_info.get("rank"), "IV"),
            summoner_id=league_info.get("summonerId"),
            puu_id=puu_id,
            tier_name=tier_name,
            wins=league_info.get("wins"),
        )
        # current_season summary 가 이미 존재할 때
        if current_season_summary:
            current_season_summaries_crud.update(
                obj_current=current_season_summary,
                obj_new=obj_new,
                db_session=db_session,
            )
        # 존재하지 않을 때
        else:
            current_season_summaries_crud.create(
                obj_in=obj_new, db_session=db_session)

            current_season_summary = current_season_summaries_crud.get_by_puu_id_queue(
                puu_id=puu_id, queue_id=queue, db_session=db_session
            )

        ########## 3 ##########
        exec_query(
            conn=db_session,
            select_flag=False,
            query_str="""
                DELETE 
                  FROM MOST_CHAMPION_SUMMARIES
                 WHERE current_season_summary_id = %(current_season_summary_id)s
                ;
                """,
            input_params={
                "current_season_summary_id": current_season_summary.puu_id,
            },
        )
        most_champion_summaries = exec_query(
            conn=db_session,
            select_flag=False,
            query_str="""
            INSERT INTO MOST_CHAMPION_SUMMARIES (champion_name, count, win_rate, kda, current_season_summary_id)
            SELECT M.champion_name_en AS champion_name
                    , COUNT(M.champion_name_en) AS count
                    , AVG(IF(M.win_or_lose, 1, 0)) AS win_rate
                    , (AVG(M.kill) + AVG(M.assist)) / IF(AVG(M.death) <> 0, AVG(M.death), 1) as kda
                    , CONVERT(%(current_season_summary_id)s, CHAR(78)) AS current_season_summary_id
              FROM MATCH_HISTORIES M
             WHERE M.summoner_name = %(summoner_name)s
               AND M.queue_type in (
                    SELECT Q.id
                        FROM QUEUES Q
                    )
               AND M.queue_type = %(queue_type)s
             GROUP BY M.summoner_name, M.champion_name_en, M.queue_type
             ORDER BY count desc
             LIMIT 3
            ;
            """,
            # 쿼리 안의 값을 조정할 수 있다.
            input_params={
                "current_season_summary_id": current_season_summary.puu_id,
                "summoner_name": summoner_name,
                "queue_type": queue,
            },
        )

        ########## 3 ##########
        exec_query(
            conn=db_session,
            select_flag=False,
            query_str="""
                DELETE 
                  FROM MOST_LINE_SUMMARIES
                 WHERE current_season_summary_id = %(current_season_summary_id)s
                ;
                """,
            input_params={
                "current_season_summary_id": current_season_summary.puu_id,
            },
        )
        most_line_summaries = exec_query(
            conn=db_session,
            select_flag=False,
            query_str="""
            INSERT INTO MOST_LINE_SUMMARIES (line_name, count, win_rate, kda, current_season_summary_id)
            SELECT M.line_name AS line_name
                    , COUNT(M.line_name) AS count
                    , AVG(IF(M.win_or_lose, 1, 0)) AS win_rate
                    , (AVG(M.kill) + AVG(M.assist)) / IF(AVG(M.death) <> 0, AVG(M.death), 1) as kda
                    , CONVERT(%(current_season_summary_id)s, CHAR(78)) AS current_season_summary_id
              FROM MATCH_HISTORIES M
             WHERE M.summoner_name = %(summoner_name)s
               AND M.queue_type in (
                    SELECT Q.id
                        FROM QUEUES Q
                    )
               AND M.queue_type = %(queue_type)s
             GROUP BY M.summoner_name, M.line_name, M.queue_type
             ORDER BY count desc
             LIMIT 3
            ;
            """,
            input_params={
                "current_season_summary_id": current_season_summary.puu_id,
                "summoner_name": summoner_name,
                "queue_type": queue,
            },
        )

    db_session.commit()

    return ""

    # return create_response(data=match_historeis)
    return create_response(data={})


@router.post("")
def add_match_history(
    puu_id: Union[str, None] = "",
    summoner_name: Union[str, None] = "",
    db_session=Depends(get_db),
) -> IResponseBase[IMatchHistoriesCreate]:
    """
    1. 해당 summoner 의 `last_updated_at` 을 불러온다
    2. `last_updated_at` 이후의 전적 리스트를 불러온다
    3. 각 전적의 상세 정보를 불러온다.
    4. TODO: `MATCH_HISTORY` 에 갱신한다.
    """
    riot_api = RiotApiController(summoner_name=summoner_name)

    summoner_info = riot_api.get_summoner_info()
    print(summoner_info)

    lol_profile_data = {
        "puu_id": summoner_info['puuid'],
        "profile_icon_id": summoner_info['profileIconId'],
        "region": "KR",
        "summoner_id": summoner_info["id"],
        "summoner_level": summoner_info['summonerLevel'],
        "summoner_name": summoner_info['name'],
        "last_updated_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "created_at": datetime.utcnow()
    }
    try:
        # 유저의 `puu_id`로 이미 저장된 레코드가 있는지 확인
        existing_profile = db_session.query(LolProfiles).filter_by(puu_id=lol_profile_data["puu_id"]).first()

        if existing_profile is None:
            # 존재하지 않을 때만 새로운 레코드 추가
            lol_profile_data['last_updated_at'] = datetime.strptime("2023-09-20 14:30:00", "%Y-%m-%d %H:%M:%S")
            new_profile = LolProfiles(**lol_profile_data)
            db_session.add(new_profile)
            db_session.commit()
        else:
            # 이미 존재하는 경우 처리할 작업 추가 (예: 로그 출력)
            print("이미 존재하는 유저 프로필:", existing_profile)

    except IntegrityError as e:
        # IntegrityError가 발생할 경우 (중복 저장 시) 예외 처리
        db_session.rollback()  # 트랜잭션 롤백
        print("IntegrityError 발생:", e)

    finally:
        puu_id = summoner_info['puuid']

        # * TODO token 기반 user get 으로 변경
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
        match_ids = riot_api.get_match_list(count=50, start_time=start_time)

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

            match_ids = riot_api.get_match_list(count=100, start_time=start_time)

            # 1번만 하기
            break
        match_histories_mapped = []
        for match in match_histories:

            for participant in match.get("info", {}).get("participants", []):
                match_histories_mapped.append(
                    IMatchHistoriesCreate(
                        level=participant.get("champLevel", ""),
                        CS=participant.get("totalMinionsKilled", 0),
                        item_0_id=participant.get("item0"),
                        item_1_id=participant.get("item1"),
                        item_2_id=participant.get("item2"),
                        item_3_id=participant.get("item3"),
                        item_4_id=participant.get("item4"),
                        item_5_id=participant.get("item5"),
                        item_6_id=participant.get("item6"),
                        spell_0_id=participant.get("summoner1Id", ""),
                        spell_1_id=participant.get("summoner2Id", ""),
                        rune_0_id=participant.get("perks", {})
                        .get("styles", [])[0]
                        .get("style"),
                        rune_1_id=participant.get("perks", {})
                        .get("styles", [])[1]
                        .get("style"),
                        season=match.get("info", {}).get("gameVersion", ""),
                        gold=participant.get("goldEarned", ""),
                        play_duration=str(
                            match.get("info", {}).get("gameDuration", "")),
                        play_time=str(match.get("info", {}).get(
                            "gameStartTimestamp", "")),
                        queue_type=match.get("info", {}).get("queueId", ""),
                        summoner_name=participant.get("summonerName", ""),
                        match_id=match.get("metadata", {}).get("matchId", ""),
                        line_name=participant.get("teamPosition"),
                        champion_name_en=participant.get("championName", ""),
                        kill=participant.get("kills", ""),
                        death=participant.get("deaths", ""),
                        assist=participant.get("assists", ""),
                        win_or_lose=1 if participant.get("win", False) else 0,
                    )
                )
        # * List<MatchHistories> create
        match_history_crud.create_multiple(
            obj_in_list=match_histories_mapped, db_session=db_session
        )

        return create_response(
            data={}, message=f"Riot 전적 정보 {len(match_histories)} 개 insert 완료"
        )
        # 세션 닫기
        db_session.close()
