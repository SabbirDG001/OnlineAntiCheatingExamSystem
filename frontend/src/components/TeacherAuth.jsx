import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/Auth.css';

export function TeacherLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.loginTeacher(username, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userType', 'TEACHER');
      navigate('/teacher/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Teacher Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p>Don't have an account? <a href="/teacher-register">Register here</a></p>
      </div>
    </div>
  );
}

export function TeacherRegister() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authAPI.registerTeacher(formData);
      setSuccess('Registration successful. Please login.');
      setTimeout(() => navigate('/teacher-login'), 2000);
    } catch (err) {
      setError('Registration failed. Try another username.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Teacher Registration</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p>Already have an account? <a href="/teacher-login">Login here</a></p>
      </div>
    </div>
  );
}
