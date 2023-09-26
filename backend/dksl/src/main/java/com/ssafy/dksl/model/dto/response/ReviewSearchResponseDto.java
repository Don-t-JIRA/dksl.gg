package com.ssafy.dksl.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dksl.model.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Comment;

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

    @Override
    public String toString() {
        return "{" +
                "createdAt=" + createdAt +
                ", clientId='" + clientId + '\'' +
                ", matchId='" + matchId + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
