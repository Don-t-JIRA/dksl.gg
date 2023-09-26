package com.ssafy.dksl.model.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewSearchResponseDto {
    private LocalDateTime createdAt;
    private String clientId;
    private String matchId;
    private String content;
}
