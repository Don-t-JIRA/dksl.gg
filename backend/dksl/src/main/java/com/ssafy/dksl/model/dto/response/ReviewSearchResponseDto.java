package com.ssafy.dksl.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dksl.model.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewSearchRequestDto {
    private String clientId;
    private String matchId;
    private String content;
}
