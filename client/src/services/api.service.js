import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const startMeditation = (data) => api.post('/meditation', data);
const completeMeditation = (id, data) => api.put(`/meditation/${id}`, data);
const getDashboardStats = () => api.get('/users/stats');
const getHabits = () => api.get('/habits');
const getTasks = () => api.get('/tasks');

export default {
  startMeditation,
  completeMeditation,
  getDashboardStats,
  getHabits,
  getTasks
};
