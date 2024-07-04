import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Intercept the request to add the Authorization header.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const createQuiz = (quizData) => API.post('/quiz', quizData);
export const getQuizzesByGenre = (genre) => API.get(`/quiz/quizzes/${genre}`);
export const getQuizById = (id) => API.get(`/quiz/${id}`);

