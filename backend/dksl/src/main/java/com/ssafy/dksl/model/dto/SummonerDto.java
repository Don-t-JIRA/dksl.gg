package com.ssafy.dksl.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SummonerDto {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String accountId;
    private String puuid;
    private String name;
    private int profileIconId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long revisionDate;
    private long summonerLevel;
}
