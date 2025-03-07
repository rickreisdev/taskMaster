import axios from 'axios';

// Configuração base do axios para todas as requisições
const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL da sua API real
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em todas as requisições
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

// Interceptor para tratar erros nas respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;