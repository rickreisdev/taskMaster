import api from './api';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao realizar login');
    }
  },

  async register(name, email, password) {
    try {
      const response = await api.post('/users', { name, email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao realizar cadastro');
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

export default authService;