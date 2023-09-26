package com.ssafy.dksl.model.dto.command;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class CreateTeamMemberCommand extends TokenCommand {
    private String teamName;
}
