package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitExamRequest {
    private Long examId;
    private String studentId;
    private String studentName;
    private List<SubmitAnswerRequest> answers;
    private Integer warningCount;
}
