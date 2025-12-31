package com.exam.repository;

import com.exam.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByTeacherId(Long teacherId);
    Optional<Exam> findByExamCode(String examCode);
}
