import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { examAPI } from '../services/api';
import '../styles/StudentExam.css';

export function StudentExamInstructions() {
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExamInstructions();
  }, []);

  const fetchExamInstructions = async () => {
    try {
      const examCode = localStorage.getItem('examCode');
      const response = await examAPI.getExamByCode(examCode);
      setExam(response.data);
    } catch (error) {
      console.error('Failed to fetch exam:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions to proceed.');
      return;
    }
    // Start exam (no fullscreen)
    navigate('/student/exam');
  };

  return (
    <div className="instructions-container">
      <div className="instructions-content">
        <h1>Exam Instructions & Rules</h1>
        
        {loading ? (
          <p>Loading instructions...</p>
        ) : exam ? (
          <>
            <div className="exam-details">
              <h2>{exam.examName}</h2>
              <p>Duration: <strong>{exam.duration} minutes</strong></p>
            </div>

            <div className="instructions-box">
              <h3>General Instructions:</h3>
              <ul>
                <li>Your exam will be monitored for focus and tab changes</li>
                <li>Switching tabs or losing window focus will trigger a warning</li>
                <li>Tab switching or losing focus will be detected and counted</li>
                <li>Copy, Cut, Paste, Right-click, Drag & Drop, and Print Screen are disabled</li>
                <li>You have <strong>3 warnings maximum</strong> before the exam ends automatically</li>
              </ul>

              <h3>Warning System:</h3>
              <ul>
                <li><strong>1st Warning:</strong> "1st attempt. You have been warned."</li>
                <li><strong>2nd Warning:</strong> "2nd attempt. You have been warned again."</li>
                <li><strong>3rd Warning:</strong> "3rd attempt. Ending exam automatically." - Exam will auto-submit</li>
              </ul>

              <h3>Exam Rules:</h3>
              <ul>
                <li>Read questions carefully before answering</li>
                <li>Questions will be displayed one at a time</li>
                <li>Your progress is automatically tracked</li>
                {exam.instructions && (
                  <>
                    <li><strong>Additional Instructions:</strong></li>
                    <li>{exam.instructions}</li>
                  </>
                )}
              </ul>

              <h3 className="warning-text">⚠️ Anti-Cheat Features:</h3>
              <p>
                This exam system has advanced anti-cheat monitoring. Any suspicious activity 
                (tab switching, copy-paste attempts, fullscreen exit, etc.) will be recorded 
                and may result in exam termination.
              </p>
            </div>

            <div className="agreement-box">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span>
                  I have read and understood all the instructions and rules. 
                  I agree to follow all the exam guidelines.
                </span>
              </label>
            </div>

            <button
              className="btn-primary btn-large"
              onClick={handleStartExam}
              disabled={!agreedToTerms}
            >
              Start Exam
            </button>
          </>
        ) : (
          <p>Unable to load exam details.</p>
        )}
      </div>
    </div>
  );
}
