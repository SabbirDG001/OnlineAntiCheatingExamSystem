import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, examAPI } from '../services/api';
import '../styles/StudentAuth.css';

export function StudentLogin() {
  const [examCode, setExamCode] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');
  const [examLoading, setExamLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartExam = async (e) => {
    e.preventDefault();
    setExamLoading(true);
    try {
      // Verify exam code exists
      const examResponse = await examAPI.getExamByCode(examCode);
      
      // Check if student already submitted
      const checkResponse = await examAPI.checkStudentExists(examResponse.data.id, studentId);
      if (checkResponse.data) {
        setError('This student ID has already submitted the exam.');
        setExamLoading(false);
        return;
      }

      // Login student
      const loginResponse = await authAPI.loginStudent(examCode, studentId, studentName);
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('studentId', studentId);
      localStorage.setItem('studentName', studentName);
      localStorage.setItem('examCode', examCode);
      localStorage.setItem('examId', examResponse.data.id);
      // store exam duration (minutes) for exam timer
      if (examResponse.data.duration) {
        localStorage.setItem('duration', String(examResponse.data.duration));
      }
      localStorage.setItem('userType', 'STUDENT');

      navigate('/student/exam-instructions');
    } catch (err) {
      setError(err.response?.data || 'Invalid exam code or check your details');
    } finally {
      setExamLoading(false);
    }
  };

  return (
    <div className="student-auth-container">
      <div className="student-auth-box">
        <h1>Start Your Exam</h1>
        <form onSubmit={handleStartExam}>
          <div className="form-group">
            <label>Exam Code:</label>
            <input
              type="text"
              value={examCode}
              onChange={(e) => setExamCode(e.target.value.toUpperCase())}
              placeholder="Enter 6-character code"
              maxLength="6"
              required
            />
          </div>
          <div className="form-group">
            <label>Student ID:</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Student Name:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={examLoading}>
            {examLoading ? 'Loading...' : 'Start Exam'}
          </button>
        </form>
      </div>
    </div>
  );
}
