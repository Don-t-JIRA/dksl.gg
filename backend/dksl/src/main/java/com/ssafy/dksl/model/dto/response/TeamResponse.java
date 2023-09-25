package com.ssafy.dksl.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TeamResponse {
    @NotNull
    private String name;
    private String description;
    @JsonProperty(value = "img")
    private byte[] imgByteArray;
    private TierResponse tierResponse;
}
