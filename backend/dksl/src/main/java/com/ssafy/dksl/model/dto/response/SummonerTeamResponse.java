package com.ssafy.dksl.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SummonerTeamResponse {
    @JsonProperty(value = "teamList")
    private List<TeamDetailResponse> summonerTeamList;
    private List<TeamResponse> teamRankList;
}
