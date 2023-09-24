package com.ssafy.dksl.model.dto.command;

import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.MemberTeam;
import com.ssafy.dksl.model.entity.Team;
import com.ssafy.dksl.model.entity.Tier;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.ToString;

public interface OrderTeamCommand {
    //Member getMember();
    Team getTeam();
    // Tier getTier();
    int getAvgTier();
}
