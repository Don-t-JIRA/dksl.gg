package com.ssafy.dksl.model.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class GetAllTeamResponse {
    private List<TeamResponse> teamList;
    private List<TeamResponse> recentTeamList;
}
