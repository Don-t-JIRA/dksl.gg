package com.ssafy.dksl.model.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class MyTeamResponse {
    private List<TeamResponse> myTeamList;
    private List<TeamResponse> orderTeamList;
}
