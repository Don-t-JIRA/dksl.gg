package com.ssafy.dksl.model.service.common;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.dksl.util.exception.RiotApiException;

import java.util.Map;

public interface RiotService {
    JsonNode findSummonerByName(String name) throws RiotApiException;
    JsonNode findLeagueBySummonerId(String summonerId) throws RiotApiException;
}
