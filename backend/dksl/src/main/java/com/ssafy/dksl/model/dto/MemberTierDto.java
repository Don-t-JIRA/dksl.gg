package com.ssafy.dksl.model.dto;

import com.ssafy.dksl.model.entity.Tier;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class MemberTierDto extends MemberDto {
    private TierDto tier;
    private int rank;
}
