// API utility functions for backend communication
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Doctor API calls
export const doctorAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/doctors${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/doctors/${id}`);
  },
  
  create: async (formData) => {
    return fetch(`${API_URL}/doctors`, {
      method: 'POST',
      body: formData, // FormData for file upload
    }).then(res => res.json());
  },
  
  update: async (id, formData) => {
    return fetch(`${API_URL}/doctors/${id}`, {
      method: 'PUT',
      body: formData,
    }).then(res => res.json());
  },
  
  delete: async (id) => {
    return apiCall(`/doctors/${id}`, { method: 'DELETE' });
  },
  
  login: async (credentials) => {
    return apiCall('/doctors/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Service API calls
export const serviceAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/services${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/services/${id}`);
  },
  
  create: async (formData) => {
    return fetch(`${API_URL}/services`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  },
  
  update: async (id, formData) => {
    return fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      body: formData,
    }).then(res => res.json());
  },
  
  delete: async (id) => {
    return apiCall(`/services/${id}`, { method: 'DELETE' });
  },
};

// Appointment API calls
export const appointmentAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/appointments${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/appointments/${id}`);
  },
  
  getByDoctor: async (doctorId) => {
    return apiCall(`/appointments/doctor/${doctorId}`);
  },
  
  create: async (appointmentData) => {
    return apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },
  
  update: async (id, appointmentData) => {
    return apiCall(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  },
  
  delete: async (id) => {
    return apiCall(`/appointments/${id}`, { method: 'DELETE' });
  },
  
  getStats: async () => {
    return apiCall('/appointments/stats');
  },
  
  confirmPayment: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/appointments/confirm-payment?${queryString}`);
  },
};

// Service Appointment API calls
export const serviceAppointmentAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/service-appointments${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/service-appointments/${id}`);
  },
  
  create: async (appointmentData) => {
    return apiCall('/service-appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },
  
  update: async (id, appointmentData) => {
    return apiCall(`/service-appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  },
  
  delete: async (id) => {
    return apiCall(`/service-appointments/${id}`, { method: 'DELETE' });
  },
};

export default {
  doctorAPI,
  serviceAPI,
  appointmentAPI,
  serviceAppointmentAPI,
};
