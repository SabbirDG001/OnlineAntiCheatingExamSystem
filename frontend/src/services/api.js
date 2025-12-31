import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  loginTeacher: (username, password) =>
    axiosInstance.post('/auth/teacher/login', { username, password }),
  registerTeacher: (teacher) =>
    axiosInstance.post('/auth/teacher/register', teacher),
  loginStudent: (examCode, studentId, studentName) =>
    axiosInstance.post('/auth/student/login', null, {
      params: { examCode, studentId, studentName },
    }),
};

// Exam APIs
export const examAPI = {
  createExam: (exam) => axiosInstance.post('/exam/create', exam),
  getTeacherExams: () => axiosInstance.get('/exam/teacher/exams'),
  getExamById: (examId) => axiosInstance.get(`/exam/${examId}`),
  getExamByCode: (examCode) => axiosInstance.get('/exam/start', { params: { examCode } }),
  addQuestion: (examId, question) =>
    axiosInstance.post(`/exam/${examId}/add-question`, question),
  getExamQuestions: (examId) => axiosInstance.get(`/exam/${examId}/questions`),
  getExamResults: (examId) => axiosInstance.get(`/exam/${examId}/results`),
  checkStudentExists: (examId, studentId) =>
    axiosInstance.get(`/exam/${examId}/check-student/${studentId}`),
  submitExam: (submitData) => axiosInstance.post('/exam/submit', submitData),
};

export default axiosInstance;
