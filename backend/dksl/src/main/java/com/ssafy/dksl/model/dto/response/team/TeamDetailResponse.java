package com.ssafy.dksl.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class TeamDetailResponse {
    @NotNull
    private boolean isJoined;
    @NotNull
    private String chairman;
    @NotNull
    private String name;
    @NotNull
    private String description;
    @JsonProperty(value = "img")
    private byte[] imgByteArray;
    @JsonProperty(value = "avgTier")
    private TierResponse tierResponse;
    private List<SummonerResponse> summonerResponse;
}
