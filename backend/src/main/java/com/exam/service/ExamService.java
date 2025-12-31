package com.exam.service;

import com.exam.dto.ExamDTO;
import com.exam.dto.QuestionDTO;
import com.exam.entity.Exam;
import com.exam.entity.Question;
import com.exam.entity.Result;
import com.exam.repository.ExamRepository;
import com.exam.repository.QuestionRepository;
import com.exam.repository.ResultRepository;
import com.exam.repository.AnswerRepository;
import com.exam.entity.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private AnswerRepository answerRepository;

    // Generate random 6-character exam code
    public String generateExamCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            code.append(chars.charAt(random.nextInt(chars.length())));
        }
        return code.toString();
    }

    // Create new exam
    public ExamDTO createExam(Exam exam, Long teacherId) {
        exam.setTeacherId(teacherId);
        exam.setExamCode(generateExamCode());
        Exam savedExam = examRepository.save(exam);
        return convertToDTO(savedExam);
    }

    // Get all exams for a teacher
    public List<ExamDTO> getTeacherExams(Long teacherId) {
        return examRepository.findByTeacherId(teacherId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Get exam by ID
    public ExamDTO getExamById(Long examId) {
        Exam exam = examRepository.findById(examId)
            .orElseThrow(() -> new RuntimeException("Exam not found"));
        return convertToDTO(exam);
    }

    // Get exam by code for student
    public ExamDTO getExamByCode(String examCode) {
        Exam exam = examRepository.findByExamCode(examCode)
            .orElseThrow(() -> new RuntimeException("Exam code invalid"));
        
        ExamDTO dto = convertToDTO(exam);
        // Note: QuestionDTO doesn't include correctAnswer field for student security
        return dto;
    }

    // Add question to exam
    public void addQuestion(Long examId, Question question) {
        Exam exam = examRepository.findById(examId)
            .orElseThrow(() -> new RuntimeException("Exam not found"));
        question.setExam(exam);
        questionRepository.save(question);
    }

    // Get questions for exam
    public List<QuestionDTO> getExamQuestions(Long examId) {
        return questionRepository.findByExamId(examId)
            .stream()
            .map(q -> new QuestionDTO(q.getId(), q.getQuestionText(), q.getMarks(), 
                    q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD(), q.getQuestionOrder()))
            .collect(Collectors.toList());
    }

    // Get randomized questions for student
    public List<QuestionDTO> getRandomizedQuestions(Long examId) {
        List<Question> questions = questionRepository.findByExamId(examId);
        Collections.shuffle(questions);
        return questions.stream()
            .map(q -> new QuestionDTO(q.getId(), q.getQuestionText(), q.getMarks(), 
                    q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD(), q.getQuestionOrder()))
            .collect(Collectors.toList());
    }

    // Check if student already exists in exam
    public boolean studentExistsInExam(Long examId, String studentId) {
        return resultRepository.findByExamIdAndStudentId(examId, studentId).isPresent();
    }

    // Submit exam answers
    public Result submitExam(Long examId, String studentId, String studentName, 
                           List<Answer> answers, Integer warningCount) {
        // Check if student already submitted
        if (resultRepository.findByExamIdAndStudentId(examId, studentId).isPresent()) {
            throw new RuntimeException("Student has already submitted exam");
        }

        Exam exam = examRepository.findById(examId)
            .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<Question> questions = questionRepository.findByExamId(examId);
        double totalMarks = 0;
        int obtainedMarks = 0;

        for (Answer answer : answers) {
            answerRepository.save(answer);
            
            Question question = questions.stream()
                .filter(q -> q.getId().equals(answer.getQuestionId()))
                .findFirst()
                .orElse(null);

            if (question != null && answer.getSelectedAnswer().equals(question.getCorrectAnswer())) {
                obtainedMarks += question.getMarks();
                answer.setIsCorrect(true);
            } else {
                answer.setIsCorrect(false);
            }
            totalMarks += question != null ? question.getMarks() : 0;
        }

        Result result = new Result();
        result.setExam(exam);
        result.setStudentId(studentId);
        result.setStudentName(studentName);
        result.setMarksObtained((double) obtainedMarks);
        result.setWarningCount(warningCount);
        result.setExamCompleted(true);

        return resultRepository.save(result);
    }

    // Get exam results (sorted by student ID)
    public List<Result> getExamResults(Long examId) {
        return resultRepository.findByExamIdOrderByStudentId(examId);
    }

    // Convert Exam to DTO
    private ExamDTO convertToDTO(Exam exam) {
        ExamDTO dto = new ExamDTO();
        dto.setId(exam.getId());
        dto.setExamName(exam.getExamName());
        dto.setDuration(exam.getDuration());
        dto.setStartTime(exam.getStartTime());
        dto.setEndTime(exam.getEndTime());
        dto.setExamCode(exam.getExamCode());
        dto.setInstructions(exam.getInstructions());
        dto.setCreatedAt(exam.getCreatedAt());

        if (exam.getQuestions() != null) {
            dto.setQuestions(exam.getQuestions().stream()
                .map(q -> new QuestionDTO(q.getId(), q.getQuestionText(), q.getMarks(), 
                        q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD(), q.getQuestionOrder()))
                .collect(Collectors.toList()));
        }

        return dto;
    }
}
