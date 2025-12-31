package com.exam.service;

import com.exam.dto.LoginRequest;
import com.exam.dto.LoginResponse;
import com.exam.entity.Teacher;
import com.exam.repository.TeacherRepository;
import com.exam.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public LoginResponse loginTeacher(LoginRequest loginRequest) {
        Teacher teacher = teacherRepository.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("Teacher not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), teacher.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtTokenProvider.generateToken(teacher.getId(), teacher.getUsername(), "TEACHER");
        
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setUserId(teacher.getId());
        response.setUsername(teacher.getUsername());
        response.setUserType("TEACHER");

        return response;
    }

    public LoginResponse loginStudent(String examCode, String studentId, String studentName) {
        // Student login doesn't require actual user verification, just exam code validation
        // Real authentication happens when submitting the exam
        String token = jwtTokenProvider.generateToken(0L, studentId, "STUDENT");
        
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setUserId(0L);
        response.setUsername(studentId);
        response.setUserType("STUDENT");

        return response;
    }

    public void registerTeacher(Teacher teacher) {
        if (teacherRepository.findByUsername(teacher.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        teacherRepository.save(teacher);
    }
}
