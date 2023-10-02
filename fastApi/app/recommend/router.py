from typing import Union, List, Dict
from fastapi import APIRouter, Depends

from app.apis.riot.controller import RiotApiController
from app.common.schema import IResponseBase, create_response, create_match_history_response

    @router.get("", response_model=Dict[str, Union[List[IResponseBase], str, Dict]])
def get_recommend_list(
    summoner_name: Union[str, None] = ""
)
    riot_api = RiotApiController(summoner_name=summoner_name)
    summoner_info = riot_api.get_summoner_info()


