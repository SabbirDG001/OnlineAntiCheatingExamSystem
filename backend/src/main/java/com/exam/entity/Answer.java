package com.exam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "answers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long examId;

    @Column(nullable = false)
    private Long questionId;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String selectedAnswer; // A, B, C, or D or UNANSWERED

    @Column(nullable = false)
    private Boolean isCorrect;
}
