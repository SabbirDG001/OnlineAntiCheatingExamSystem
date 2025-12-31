import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExamCompleted.css';

export function ExamCompleted() {
  const navigate = useNavigate();

  return (
    <div className="exam-completed-container">
      <div className="completed-card">
        <div className="success-icon">✓</div>
        <h1>Exam Submitted Successfully!</h1>
        <p className="secondary">Results will be available once the teacher reviews the submissions.</p>
        
        <div className="exam-info">
          <p><strong>Student ID:</strong> {localStorage.getItem('studentId')}</p>
          <p><strong>Student Name:</strong> {localStorage.getItem('studentName')}</p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
