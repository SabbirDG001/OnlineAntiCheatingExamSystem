package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAnswerRequest {
    private Long questionId;
    private String answer; // A, B, C, D, or UNANSWERED
    private Integer warningCount;
}
