package com.ssafy.dksl.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class TeamDto {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long id;

    private String name;

    private String description;

}
