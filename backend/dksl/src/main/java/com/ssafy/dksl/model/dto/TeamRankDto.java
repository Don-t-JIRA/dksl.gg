package com.ssafy.dksl.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@SuperBuilder
public class TeamRankDto extends TeamDto {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private MultipartFile img;

    @JsonProperty(value = "image", access = JsonProperty.Access.READ_ONLY)
    private byte[] imgByteArray;

    @JsonProperty(value = "member_list", access = JsonProperty.Access.READ_ONLY)
    private List<MemberTierDto> memberDtoList;
}
