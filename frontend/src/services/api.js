import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/doctors/login', credentials);
    return response.data;
  },
};

// Appointment APIs
export const appointmentAPI = {
  getAll: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  create: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  update: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/appointments/stats');
    return response.data;
  },
};

// Service Appointment APIs
export const serviceAppointmentAPI = {
  getAll: async () => {
    const response = await api.get('/service-appointments');
    return response.data;
  },

  create: async (appointmentData) => {
    const response = await api.post('/service-appointments', appointmentData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/service-appointments/${id}`);
    return response.data;
  },
};

export default api;
