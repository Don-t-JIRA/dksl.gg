package com.ssafy.dksl.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SummonerDto {
    private String id;
    private String accountId;
    private String puuid;
    private int profileIconId;
    private long summonerLevel;
}
