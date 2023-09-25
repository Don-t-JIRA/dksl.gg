package com.ssafy.dksl.model.dto.response;

import com.ssafy.dksl.model.dto.MemberDto;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

// 회원가입 시 필요한 정보
@Builder
@Getter
public class LoginResponse {
    @NotNull
    private MemberResponse memberResponse;

    @NotNull
    private String accessToken;

}
