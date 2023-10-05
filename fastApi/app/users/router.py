from datetime import datetime
from riotwatcher import ApiError
from app.apis.riot.controller import RiotApiController
from app.common.schema import IResponseBase, create_response
from app.common.utils import as_dict
from fastapi import APIRouter, Body, Depends, HTTPException
from app.users.crud import lol_profiles as lol_profiles_crud
from app.database import exec_query, get_db


router = APIRouter()


@router.get("")
def get_challengers(
):
    riot_api = RiotApiController(summoner_name="Hide on bush")

    challengers = RiotApiController.get_challengers_info()

    result = []
    cnt = 0
    for entry in challengers[0]["entries"]:
        result.append({
            "summonerName": entry["summonerName"],
            "leaguePoints": entry["leaguePoints"]
        })
        cnt += 1

        if cnt==30:
            break


    return result