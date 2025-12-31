import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examAPI } from '../services/api';
import '../styles/ExamResults.css';

export function ExamResults() {
  const { examId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, [examId]);

  const fetchResults = async () => {
    try {
      const response = await examAPI.getExamResults(examId);
      setResults(response.data);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Exam Results</h1>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/teacher/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="results-content">
        {loading ? (
          <p>Loading results...</p>
        ) : results.length === 0 ? (
          <p>No results available yet.</p>
        ) : (
          <table className="results-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Marks Obtained</th>
                <th>Warning Count</th>
                <th>Exam Completed</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.studentId}</td>
                  <td>{result.studentName}</td>
                  <td className="marks">{result.marksObtained}</td>
                  <td className={`warnings warning-${result.warningCount}`}>
                    {result.warningCount}
                  </td>
                  <td>{result.examCompleted ? 'Yes' : 'No'}</td>
                  <td>{result.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
