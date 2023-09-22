from datetime import datetime
from riotwatcher import ApiError
from app.apis.riot.controller import RiotApiController
from app.common.schema import IResponseBase, create_response
from app.common.utils import as_dict
from fastapi import APIRouter, Body, Depends, HTTPException
from app.users.crud import lol_profiles as lol_profiles_crud
from app.database import exec_query, get_db


router = APIRouter()


@router.get("/lolprofile")
def get_my_lol_profile(
    summoner_name: str,
    db_session=Depends(get_db),
):
    """
    1. LOL_PROFILES, CURRENT_SEASON_SUMMARIES
    2. MOST CHAMP 3개 가져오고
    3. MOST LINE 3개 가져오기
    4. Merge


    summonerName: string;
    tierName: string;
    rank: number;
    winRate: number;
    wins: number;
    loses: number;
    champions: {img: string, win_rate: number, kda: number}[];
    positions: {img: string, win_rate: number, kda: number}[];
    """

    # 1번 쿼리
    query = """
            SELECT LP.summoner_name, T.name as tier_name, CSS.queue_id, CSS.rank , CSS.wins, CSS.losses, CSS.id as current_season_summary_id, CSS.queue_id as queue_id FROM USERS U
              LEFT OUTER JOIN LOL_PROFILES LP
                ON U.curr_lol_account = LP.puu_id
              LEFT OUTER JOIN CURRENT_SEASON_SUMMARIES CSS
                ON CSS.puu_id = LP.puu_id
              LEFT OUTER JOIN TIERS T
                ON T.id = CSS.tier_id
             WHERE LP.summoner_name = %(summoner_name)s
             ;
        """

    summoner_info = exec_query(db_session, query, input_params={"summoner_name": summoner_name})

    query_2 = f"""
        SELECT MCS.*, C.image_url as image_url, CSS.queue_id as queue_id
          FROM MOST_CHAMPION_SUMMARIES MCS
          LEFT OUTER JOIN CHAMPIONS C
            ON C.name_en = MCS.champion_name
          LEFT OUTER JOIN CURRENT_SEASON_SUMMARIES CSS
            ON CSS.id = MCS.current_season_summary_id
         WHERE current_season_summary_id in ({','.join(map(lambda item: str(item.get("current_season_summary_id")), summoner_info))})

         ;
    """

    most_champs = exec_query(db_session, query_2)

    most_champs = list(
        map(
            lambda item: {
                "queue_id": item.get("queue_id"),
                "img": item.get("image_url"),
                "win_rate": item.get("win_rate", 0),
                "kda": item.get("kda", 0),
                "champion_name": item.get("champion_name"),
            },
            most_champs,
        )
    )

    query_3 = f"""
        SELECT MLS.*, L.image_url as image_url, CSS.queue_id as queue_id, L.name as line_name
          FROM MOST_LINE_SUMMARIES MLS
          LEFT OUTER JOIN `LINES` L
            ON L.name = MLS.line_name
          LEFT OUTER JOIN CURRENT_SEASON_SUMMARIES CSS
            ON CSS.id = MLS.current_season_summary_id
         WHERE MLS.current_season_summary_id in ({','.join(map(lambda item: str(item.get("current_season_summary_id")), summoner_info))})

         ;
    """
    most_lines = exec_query(db_session, query_3)

    most_lines = list(
        map(
            lambda item: {
                "queue_id": item.get("queue_id"),
                "img": item.get("image_url"),
                "win_rate": item.get("win_rate", 0),
                "kda": item.get("kda", 0),
                "line": item.get("line_name", "NONE"),
            },
            most_lines,
        )
    )

    ret = []

    for info in summoner_info:
        champs = list(
            filter(
                lambda item: item.get("queue_id") == info.get("queue_id"), most_champs
            )
        )
        lines = list(
            filter(
                lambda item: item.get("queue_id") == info.get("queue_id"), most_lines
            )
        )

        ret.append(
            {
                **info,
                "champions": champs,
                "positions": lines,
            }
        )

    return ret