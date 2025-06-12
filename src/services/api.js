import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const usersApi = {
  getAll: () => api.get('/users'),
  create: (user) => api.post('/users', user),
};

// Products API
export const productsApi = {
  getAll: () => api.get('/products'),
  create: (product) => api.post('/products', product),
};

// Suppliers API
export const suppliersApi = {
  getAll: () => api.get('/suppliers'),
  create: (supplier) => api.post('/suppliers', supplier),
};

export default api;