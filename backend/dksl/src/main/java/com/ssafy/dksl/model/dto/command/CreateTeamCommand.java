package com.ssafy.dksl.model.dto.command;

import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.Team;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Getter
public class CreateTeamCommand {
    @NotNull
    private String name;
    private String description;
    private String accessToken;
    // private Member chairman;
    private MultipartFile img;

    public Team toTeam(Member chairman) {
        return Team.builder()
                .name(this.getName())
                .description(this.getDescription())
                .chairman(chairman)
                .build();
    }
}
