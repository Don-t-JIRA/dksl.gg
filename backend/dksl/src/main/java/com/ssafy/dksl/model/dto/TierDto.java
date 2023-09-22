package com.ssafy.dksl.model.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TierDto {
    private int num;
    private String name;
}
