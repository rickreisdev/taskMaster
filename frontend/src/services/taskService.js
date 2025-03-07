import api from './api';

export const taskService = {
  async getAllTasks() {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar tarefas');
    }
  },

  async getTasksByStatus(status) {
    try {
      const response = await api.get(`/tasks?status=${status}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao filtrar tarefas');
    }
  },

  async createTask(taskData) {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar tarefa');
    }
  },

  async updateTask(id, taskData) {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar tarefa');
    }
  },

  async deleteTask(id) {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao excluir tarefa');
    }
  },

  async toggleTaskStatus(id, completed) {
    try {
      const response = await api.patch(`/tasks/${id}/status`, { completed });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar status da tarefa');
    }
  }
};

export default taskService;