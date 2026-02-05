import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('flowart_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('flowart_token');
      localStorage.removeItem('flowart_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getUsers: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },
  getUser: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
  updateUser: async (userId, data) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },
};

export default api;
