package com.exam.controller;

import com.exam.dto.ExamDTO;
import com.exam.dto.QuestionDTO;
import com.exam.dto.ResultDTO;
import com.exam.dto.SubmitExamRequest;
import com.exam.entity.Answer;
import com.exam.entity.Exam;
import com.exam.entity.Result;
import com.exam.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ExamController {

    @Autowired
    private ExamService examService;

    // Teacher: Create new exam
    @PostMapping("/create")
    public ResponseEntity<ExamDTO> createExam(@RequestBody Exam exam, Authentication authentication) {
        Long teacherId = (Long) authentication.getPrincipal();
        ExamDTO createdExam = examService.createExam(exam, teacherId);
        return ResponseEntity.ok(createdExam);
    }

    // Teacher: Get all exams
    @GetMapping("/teacher/exams")
    public ResponseEntity<List<ExamDTO>> getTeacherExams(Authentication authentication) {
        Long teacherId = (Long) authentication.getPrincipal();
        List<ExamDTO> exams = examService.getTeacherExams(teacherId);
        return ResponseEntity.ok(exams);
    }

    // Teacher: Get exam by ID
    @GetMapping("/{examId}")
    public ResponseEntity<ExamDTO> getExam(@PathVariable Long examId, Authentication authentication) {
        ExamDTO exam = examService.getExamById(examId);
        return ResponseEntity.ok(exam);
    }

    // Teacher: Add question to exam
    @PostMapping("/{examId}/add-question")
    public ResponseEntity<String> addQuestion(@PathVariable Long examId, 
                                             @RequestBody com.exam.entity.Question question,
                                             Authentication authentication) {
        examService.addQuestion(examId, question);
        return ResponseEntity.ok("Question added successfully");
    }

    // Teacher: Get exam results
    @GetMapping("/{examId}/results")
    public ResponseEntity<List<ResultDTO>> getExamResults(@PathVariable Long examId, 
                                                         Authentication authentication) {
        List<Result> results = examService.getExamResults(examId);
        List<ResultDTO> resultDTOs = results.stream()
            .map(r -> new ResultDTO(
                r.getId(),
                r.getStudentId(),
                r.getStudentName(),
                r.getMarksObtained(),
                r.getWarningCount(),
                r.getExamCompleted(),
                r.getSubmittedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
            ))
            .collect(Collectors.toList());
        return ResponseEntity.ok(resultDTOs);
    }

    // Student: Get exam by code
    @GetMapping("/start")
    public ResponseEntity<ExamDTO> getExamByCode(@RequestParam String examCode) {
        ExamDTO exam = examService.getExamByCode(examCode);
        return ResponseEntity.ok(exam);
    }

    // Student: Get randomized questions
    @GetMapping("/{examId}/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions(@PathVariable Long examId) {
        List<QuestionDTO> questions = examService.getRandomizedQuestions(examId);
        return ResponseEntity.ok(questions);
    }

    // Student: Check if student already submitted
    @GetMapping("/{examId}/check-student/{studentId}")
    public ResponseEntity<Boolean> checkStudentExists(@PathVariable Long examId, 
                                                     @PathVariable String studentId) {
        boolean exists = examService.studentExistsInExam(examId, studentId);
        return ResponseEntity.ok(exists);
    }

    // Student: Submit exam
    @PostMapping("/submit")
    public ResponseEntity<String> submitExam(@RequestBody SubmitExamRequest submitRequest) {
        try {
            List<Answer> answers = submitRequest.getAnswers().stream()
                .map(a -> new Answer(null, submitRequest.getExamId(), a.getQuestionId(), 
                        submitRequest.getStudentId(), a.getAnswer(), false))
                .collect(Collectors.toList());

            Result result = examService.submitExam(
                submitRequest.getExamId(),
                submitRequest.getStudentId(),
                submitRequest.getStudentName(),
                answers,
                submitRequest.getWarningCount()
            );

            return ResponseEntity.ok("Exam submitted successfully. Score: " + result.getMarksObtained());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
