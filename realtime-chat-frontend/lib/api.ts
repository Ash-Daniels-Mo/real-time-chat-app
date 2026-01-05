import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh or logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// File API functions
export const saveFile = async (data: {
  filename: string;
  file_url: string;
  file_size: number;
  public_message_id?: number;
  private_chat_id?: number;
}) => {
  const response = await api.post('/files/', data);
  return response.data;
};

// Auth user profile
export const getAuthUser = async () => {
  const response = await api.get('/users/auth-user');
  return response.data.user;
};

export const updateAuthUser = async (data: {
  username?: string;
  email?: string;
  avatar_url?: string;
  password?: string;
}) => {
  const response = await api.put('/users/auth-user', data);
  return response.data.user;
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const response = await api.post('/users/auth-user/change-password', {
    current_password: currentPassword,
    new_password: newPassword,
  });
  return response.data;
};