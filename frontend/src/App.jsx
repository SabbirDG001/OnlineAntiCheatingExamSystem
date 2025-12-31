import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TeacherLogin, TeacherRegister } from './components/TeacherAuth';
import { StudentLogin } from './components/StudentAuth';
import { TeacherDashboard } from './components/TeacherDashboard';
import { CreateExam } from './components/CreateExam';
import { EditExam } from './components/EditExam';
import { ExamResults } from './components/ExamResults';
import { StudentExamInstructions } from './components/StudentExamInstructions';
import { StudentExam } from './components/StudentExam';
import { ExamCompleted } from './components/ExamCompleted';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Teacher Routes */}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/create-exam" element={<CreateExam />} />
        <Route path="/teacher/exam/:examId/edit" element={<EditExam />} />
        <Route path="/teacher/exam/:examId/results" element={<ExamResults />} />

        {/* Student Routes */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student/exam-instructions" element={<StudentExamInstructions />} />
        <Route path="/student/exam" element={<StudentExam />} />
        <Route path="/student/exam-completed" element={<ExamCompleted />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Online Anti-Cheat Quiz System</h1>
        <p className="subtitle">A secure platform for conducting online examinations</p>

        <div className="home-content">
          <div className="home-cards">
            <div className="card teacher-card">
              <h2>Teacher Panel</h2>
              <p>Create exams, manage questions, and view student results</p>
              <div className="card-actions">
                <a href="/teacher-login" className="btn-primary">Login</a>
                <a href="/teacher-register" className="btn-secondary">Register</a>
              </div>
            </div>

            <div className="card student-card">
              <h2>Student Panel</h2>
              <p>Take exams securely with anti-cheat monitoring</p>
              <a href="/student-login" className="btn-primary">Start Exam</a>
            </div>
          </div>

          {/* <div className="features">
            <h2>Key Features</h2>
            <ul>
              <li>✓ JWT Authentication for secure login</li>
              <li>✓ Advanced anti-cheat monitoring (tab switching, copy/paste blocking)</li>
              <li>✓ Real-time warning system (3 warnings max)</li>
              <li>✓ Fullscreen exam mode with watermark</li>
              <li>✓ Randomized question sequence</li>
              <li>✓ Server-side answer validation</li>
              <li>✓ Duplicate student ID prevention</li>
              <li>✓ Comprehensive results dashboard</li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
