package com.ssafy.dksl.model.dto.command;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateSummonerCommand {
    private String name;
}
