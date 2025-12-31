package com.exam.repository;

import com.exam.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByExamIdOrderByStudentId(Long examId);
    Optional<Result> findByExamIdAndStudentId(Long examId, String studentId);
}
