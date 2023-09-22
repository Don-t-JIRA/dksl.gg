package com.ssafy.dksl.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

// 회원가입 시 필요한 정보
@Builder
@Getter
@ToString
public class MemberDto {
    @NotNull
    private String clientId;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private TierDto tier;

    @NotNull
    private int rank;

    @NotNull
    private int level;
}
