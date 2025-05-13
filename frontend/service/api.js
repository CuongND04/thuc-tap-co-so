import axios from "axios";
const API_BASE_URL = 'http://localhost:5173/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
    register: () => api.post('/auth/register'),
    login: () => api.post('/auth/login'),
};

export default api;