import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log(token);
        console.log(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  // Public Routes
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password: newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  resendVerification: async (email) => {
    try {
      const response = await api.post('/auth/resend-verification', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Protected Routes
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await api.post('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Admin Routes
  importFromCSV: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/auth/import/csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  importFromExcel: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/auth/import/excel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // User Management Routes
  getAllUsers: async () => {
    try {
      const response = await api.get('/auth/users/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await api.get(`/auth/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateUserStatus: async (userId, status) => {
    try {
      const response = await api.put(`/auth/users/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};


  export const payslipService = {
  // Protected Routes - HR & Admin Only
  addSinglePayslip: async (payslipData) => {
    try {
      const response = await api.post('/payslip', payslipData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  importPayslipsCSV: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/payslip/import/csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  importPayslipsExcel: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/payslip/import/excel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // User-specific Routes
  getUserPayslips: async (natId) => {
    try {
      const response = await api.get(`/payslip/user/${natId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Admin/HR Routes
  getPayslipById: async (id) => {
    try {
      const response = await api.get(`/payslip/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updatePayslip: async (id, payslipData) => {
    try {
      const response = await api.put(`/payslip/${id}`, payslipData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deletePayslip: async (id) => {
    try {
      const response = await api.delete(`/payslip/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
export default api;