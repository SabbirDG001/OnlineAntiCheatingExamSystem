import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examAPI } from '../services/api';
import '../styles/EditExam.css';

export function EditExam() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    marks: 1,
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
    questionOrder: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExam();
  }, [examId]);

  const fetchExam = async () => {
    try {
      const response = await examAPI.getExamById(examId);
      setExam(response.data);
      setNewQuestion((prev) => ({
        ...prev,
        questionOrder: (response.data.questions?.length || 0) + 1,
      }));
    } catch (err) {
      setError('Failed to load exam');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await examAPI.addQuestion(examId, newQuestion);
      setSuccess('Question added successfully!');
      fetchExam();
      setNewQuestion({
        questionText: '',
        marks: 1,
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'A',
        questionOrder: (exam.questions?.length || 0) + 1,
      });
    } catch (err) {
      setError('Failed to add question');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="edit-exam-container">
      <div className="exam-header">
        <h1>{exam?.examName}</h1>
        <div className="header-info">
          <p>Code: <strong>{exam?.examCode}</strong></p>
          <p>Duration: {exam?.duration} minutes</p>
          <p>Questions: {exam?.questions?.length || 0}</p>
        </div>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/teacher/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="exam-content">
        <div className="questions-section">
          <h2>Exam Questions</h2>
          {exam?.questions && exam.questions.length > 0 ? (
            <div className="questions-list">
              {exam.questions.map((q, index) => (
                <div key={q.id} className="question-item">
                  <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
                  <p className="marks">Marks: {q.marks}</p>
                  <p className="options">
                    A) {q.optionA} | B) {q.optionB} | C) {q.optionC} | D) {q.optionD}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No questions added yet.</p>
          )}
        </div>

        <div className="add-question-section">
          <h2>Add New Question</h2>
          <form onSubmit={handleAddQuestion}>
            <div className="form-group">
              <label>Question Text:</label>
              <textarea
                name="questionText"
                value={newQuestion.questionText}
                onChange={handleQuestionChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Marks:</label>
              <input
                type="number"
                name="marks"
                value={newQuestion.marks}
                onChange={handleQuestionChange}
                min="1"
                required
              />
            </div>

            <div className="options-grid">
              <div className="form-group">
                <label>Option A:</label>
                <input
                  type="text"
                  name="optionA"
                  value={newQuestion.optionA}
                  onChange={handleQuestionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Option B:</label>
                <input
                  type="text"
                  name="optionB"
                  value={newQuestion.optionB}
                  onChange={handleQuestionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Option C:</label>
                <input
                  type="text"
                  name="optionC"
                  value={newQuestion.optionC}
                  onChange={handleQuestionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Option D:</label>
                <input
                  type="text"
                  name="optionD"
                  value={newQuestion.optionD}
                  onChange={handleQuestionChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Correct Answer:</label>
              <select
                name="correctAnswer"
                value={newQuestion.correctAnswer}
                onChange={handleQuestionChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit" className="btn-primary">Add Question</button>
          </form>
        </div>
      </div>
    </div>
  );
}
