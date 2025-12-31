package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamDTO {
    private Long id;
    private String examName;
    private Integer duration;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String examCode;
    private String instructions;
    private List<QuestionDTO> questions;
    private LocalDateTime createdAt;
}
