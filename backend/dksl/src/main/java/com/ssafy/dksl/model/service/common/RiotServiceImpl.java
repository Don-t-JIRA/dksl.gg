package com.ssafy.dksl.model.service.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dksl.util.exception.common.CustomException;
import com.ssafy.dksl.util.exception.RiotApiCallFailedException;
import com.ssafy.dksl.util.exception.SummonerNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Slf4j
public class RiotServiceImpl implements RiotService {

    @Value("${riot.api.key}")
    private String RIOT_API_KEY;

    @Value("${riot.summoner.api.uri}")
    private String RIOT_SUMMONER_API_URI;

    @Value("${riot.league.api.uri}")
    private String RIOT_LEAGUE_API_URI;

    public JsonNode findSummonerByName(String name) throws CustomException {
        HttpClient client = HttpClient.newBuilder().build();

        HttpRequest getRequest = HttpRequest.newBuilder()
                .header("X-Riot-Token", RIOT_API_KEY)
                .uri(URI.create(RIOT_SUMMONER_API_URI + URLEncoder.encode(name)))
                .GET().build();

        HttpResponse<String> response;  // Response 받을 변수
        try {
            response = client.send(getRequest, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage());
            throw new RiotApiCallFailedException();
        }

        // 응답 코드 확인
        int statusCode = response.statusCode();
        if (statusCode == HttpStatus.SC_NOT_FOUND) throw new SummonerNotFoundException();  // 닉네임 없음
        else if (statusCode != HttpStatus.SC_OK) throw new RiotApiCallFailedException();  // 라이엇 API 호출 실패

        ObjectMapper objectmapper = new ObjectMapper();
        try {
            return objectmapper.readTree(response.body());
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            throw new RiotApiCallFailedException();
        }
    }

    @Override
    public JsonNode findLeagueBySummonerId(String summonerId) throws CustomException {
        HttpClient client = HttpClient.newBuilder().build();

        HttpRequest getRequest = HttpRequest.newBuilder()
                .header("X-Riot-Token", RIOT_API_KEY)
                .uri(URI.create(RIOT_LEAGUE_API_URI + URLEncoder.encode(summonerId)))
                .GET().build();

        HttpResponse<String> response;
        try {
            response = client.send(getRequest, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage());
            throw new RiotApiCallFailedException();
        }

        // 응답 코드 확인
        int statusCode = response.statusCode();
        if (statusCode != HttpStatus.SC_OK) throw new RiotApiCallFailedException();  // 라이엇 API 호출 실패

        ObjectMapper objectmapper = new ObjectMapper();
        try {
            return objectmapper.readTree(response.body());
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            throw new RiotApiCallFailedException();
        }
    }
}
