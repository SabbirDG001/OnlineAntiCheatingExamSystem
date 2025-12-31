package com.exam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "results", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"exam_id", "student_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(name = "student_id", nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private Double marksObtained;

    @Column(nullable = false)
    private Integer warningCount;

    @Column(nullable = false)
    private Boolean examCompleted;

    @Column(nullable = false, updatable = false)
    private LocalDateTime submittedAt;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
    }
}
