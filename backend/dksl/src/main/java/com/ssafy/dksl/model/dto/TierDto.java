package com.ssafy.dksl.model.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TierDto {
    private String id;
    private int num;
    private String name;
}
