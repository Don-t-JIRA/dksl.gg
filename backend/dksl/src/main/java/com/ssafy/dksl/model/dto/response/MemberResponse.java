package com.ssafy.dksl.model.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberResponse {
    @NotNull
    private String name;

    @NotNull
    private String phone;

    @NotNull
    private String email;

    @NotNull
    private TierResponse tier;

    @NotNull
    private int rank;

    @NotNull
    private int profileIconId;

    @NotNull
    private int level;
}
