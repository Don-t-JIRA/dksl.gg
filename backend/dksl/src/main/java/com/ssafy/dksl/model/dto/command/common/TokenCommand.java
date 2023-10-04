package com.ssafy.dksl.model.dto.command;

import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class TokenCommand {
    private String token;
}
