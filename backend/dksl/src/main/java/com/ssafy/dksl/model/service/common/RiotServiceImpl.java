package com.ssafy.dksl.model.service.common;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dksl.util.exception.RiotApiException;
import lombok.extern.slf4j.Slf4j;
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

    public JsonNode findSummonerByName(String name) throws RiotApiException {
        HttpClient client = HttpClient.newBuilder().build();

        HttpRequest getRequest = HttpRequest.newBuilder()
                .header("X-Riot-Token", RIOT_API_KEY)
                .uri(URI.create(RIOT_SUMMONER_API_URI + URLEncoder.encode(name)))
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(getRequest, HttpResponse.BodyHandlers.ofString());

            // 응답 코드 확인
            int statusCode = response.statusCode();
            if(statusCode != 200) throw new RiotApiException("해당 롤 닉네임이 존재하지 않습니다.");

            ObjectMapper objectmapper = new ObjectMapper();
            return objectmapper.readTree(response.body());
        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage());
            throw new RiotApiException();
        }
    }

    @Override
    public JsonNode findLeagueBySummonerId(String summonerId) throws RiotApiException {
        HttpClient client = HttpClient.newBuilder().build();

        HttpRequest getRequest = HttpRequest.newBuilder()
                .header("X-Riot-Token", RIOT_API_KEY)
                .uri(URI.create(RIOT_LEAGUE_API_URI + URLEncoder.encode(summonerId)))
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(getRequest, HttpResponse.BodyHandlers.ofString());

            // 응답 코드 확인
            int statusCode = response.statusCode();
            if(statusCode != 200) throw new RiotApiException("해당 롤 닉네임이 존재하지 않습니다.");

            ObjectMapper objectmapper = new ObjectMapper();
            return objectmapper.readTree(response.body());
        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage());
            throw new RiotApiException();
        }
    }
}
