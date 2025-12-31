import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { examAPI } from '../services/api';
import '../styles/CreateExam.css';

export function CreateExam() {
  const [formData, setFormData] = useState({
    examName: '',
    duration: 60,
    startTime: '',
    endTime: '',
    instructions: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await examAPI.createExam(formData);
      setSuccess('Exam created successfully!');
      setTimeout(() => {
        navigate(`/teacher/exam/${response.data.id}/edit`);
      }, 1500);
    } catch (err) {
      setError('Failed to create exam. Please try again.');
    }
  };

  return (
    <div className="create-exam-container">
      <div className="create-exam-form">
        <h1>Create New Exam</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Exam Name:</label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Duration (minutes):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="5"
              max="300"
              required
            />
          </div>

          <div className="form-group">
            <label>Start Time:</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Time:</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Instructions:</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows="4"
              placeholder="Enter exam instructions and rules"
            />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <div className="form-actions">
            <button type="submit" className="btn-primary">Create Exam</button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/teacher/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
