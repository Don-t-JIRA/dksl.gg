package com.ssafy.dksl.model.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TierResponse {
    private int num;
    private String name;
}
