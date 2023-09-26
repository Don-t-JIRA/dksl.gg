package com.ssafy.dksl.model.dto.request;

import com.ssafy.dksl.model.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EvaluationCreateRequestDto {
    private String evaluation;
    private String evaluatorName;
    private String evaluateeName;
    private int score;
}
