package com.exam.controller;

import com.exam.dto.LoginRequest;
import com.exam.dto.LoginResponse;
import com.exam.entity.Teacher;
import com.exam.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/teacher/login")
    public ResponseEntity<LoginResponse> loginTeacher(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authService.loginTeacher(loginRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/teacher/register")
    public ResponseEntity<String> registerTeacher(@RequestBody Teacher teacher) {
        try {
            authService.registerTeacher(teacher);
            return ResponseEntity.ok("Teacher registered successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/student/login")
    public ResponseEntity<LoginResponse> loginStudent(
            @RequestParam String examCode,
            @RequestParam String studentId,
            @RequestParam String studentName) {
        try {
            LoginResponse response = authService.loginStudent(examCode, studentId, studentName);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
