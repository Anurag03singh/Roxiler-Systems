import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
};

export const storesAPI = {
  getAll: (search?: string) => api.get('/stores', { params: { search } }),
  getOne: (id: string) => api.get(`/stores/${id}`),
  create: (data: any) => api.post('/admin/stores', data),
  getRatings: (id: string) => api.get(`/stores/${id}/ratings`),
};

export const ratingsAPI = {
  create: (data: any) => api.post('/ratings', data),
  update: (id: string, data: any) => api.put(`/ratings/${id}`, data),
  getMyRatings: () => api.get('/ratings/my-ratings'),
};

export const usersAPI = {
  getAll: (filters?: any) => api.get('/admin/users', { params: filters }),
  getOne: (id: string) => api.get(`/admin/users/${id}`),
  create: (data: any) => api.post('/admin/users', data),
  updatePassword: (data: any) => api.put('/users/password', data),
  getProfile: () => api.get('/users/me'),
};

export default api;
