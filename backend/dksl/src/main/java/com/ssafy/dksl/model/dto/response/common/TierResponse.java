package com.ssafy.dksl.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TierResponse {
    private String id;
    private String name;
    private int orderNum;
}
