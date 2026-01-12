import axios from 'axios';
import { Product } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsApi = {
  getAll: (params?: { category?: string; skip?: number; limit?: number }) =>
    api.get('/api/products', { params }),
  
  getById: (id: number) =>
    api.get(`/api/products/${id}`),
  
  getCategories: () =>
    api.get('/api/products/categories/list'),
  
  create: (data: Partial<Product>) =>
    api.post('/api/products', data),
};

// Preorders API
export const preordersApi = {
  create: (data: { product_id: number; user_email: string; quantity: number }) =>
    api.post('/api/preorders', data),
  
  getByUser: (email: string) =>
    api.get(`/api/preorders/user/${email}`),
  
  getById: (id: number) =>
    api.get(`/api/preorders/${id}`),
};

// Analytics API
export const analyticsApi = {
  getDashboard: () =>
    api.get('/api/analytics/dashboard'),
  
  getTrending: (limit?: number) =>
    api.get('/api/analytics/trending', { params: { limit } }),
  
  getPriceImpact: () =>
    api.get('/api/analytics/price-impact'),
};

// Auth API
export const authApi = {
  register: (data: { email: string; full_name?: string; phone_number?: string }) =>
    api.post('/api/auth/register', data),
  
  checkIdentity: (email: string) =>
    api.get(`/api/auth/check/${email}`),
};

// Sourcing API
export const sourcingApi = {
  findDeals: () =>
    api.post('/api/sourcing/find-deals'),
  
  approveDeal: (id: number) =>
    api.patch(`/api/sourcing/approve/${id}`),
};

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;