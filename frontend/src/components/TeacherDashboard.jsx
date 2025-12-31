import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { examAPI } from '../services/api';
import '../styles/TeacherDashboard.css';

export function TeacherDashboard() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await examAPI.getTeacherExams();
      setExams(response.data);
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="teacher-dashboard">
      <nav className="navbar">
        <h1>Teacher Panel</h1>
        <div className="nav-buttons">
          <button className="btn-primary" onClick={() => navigate('/teacher/create-exam')}>
            Create New Exam
          </button>
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h2>Your Exams</h2>
        {loading ? (
          <p>Loading exams...</p>
        ) : exams.length === 0 ? (
          <p>No exams created yet. <a href="/teacher/create-exam">Create one now</a></p>
        ) : (
          <div className="exams-grid">
            {exams.map((exam) => (
              <div key={exam.id} className="exam-card">
                <h3>{exam.examName}</h3>
                <p>Code: <strong>{exam.examCode}</strong>
                    <button className="btn-copy" onClick={() => handleCopyCode(exam.examCode)}>
                      {copiedCode === exam.examCode ? 'Copied!' : 'Copy'}
                    </button>
                </p>
                <p>Duration: {exam.duration} minutes</p>
                <p>Questions: {exam.questions?.length || 0}</p>
                <div className="exam-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => navigate(`/teacher/exam/${exam.id}/edit`)}
                  >
                    Edit Exam
                  </button>
                  <button 
                    className="btn-info"
                    onClick={() => navigate(`/teacher/exam/${exam.id}/results`)}
                  >
                    View Results
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
