package com.exam.repository;

import com.exam.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByExamIdAndStudentId(Long examId, String studentId);
}
