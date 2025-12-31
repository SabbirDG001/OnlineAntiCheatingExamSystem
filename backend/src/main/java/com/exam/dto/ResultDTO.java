package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultDTO {
    private Long id;
    private String studentId;
    private String studentName;
    private Double marksObtained;
    private Integer warningCount;
    private Boolean examCompleted;
    private String submittedAt;
}
