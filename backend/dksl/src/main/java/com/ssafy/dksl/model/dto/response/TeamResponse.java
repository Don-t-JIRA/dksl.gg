package com.ssafy.dksl.model.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TeamResponse {
    @NotNull
    private String name;
    private String description;
    private byte[] imgByteArray;
}
