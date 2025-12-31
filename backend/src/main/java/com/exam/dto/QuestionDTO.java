package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private Long id;
    private String questionText;
    private Integer marks;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private Integer questionOrder;
    // correctAnswer is NOT included in DTO for student endpoint
}
