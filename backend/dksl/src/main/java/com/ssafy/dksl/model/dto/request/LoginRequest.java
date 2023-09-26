package com.ssafy.dksl.model.dto.request;

import com.ssafy.dksl.model.dto.command.LoginCommand;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginRequest {
    @NotNull
    @Size(max = 20)
    private String clientId;

    @NotNull
    @Size(min = 8, max = 20)
    private String password;

    public LoginCommand toLoginCommand() {
        return LoginCommand.builder()
                .clientId(this.getClientId())
                .password(this.getPassword())
                .build();
    }
}
