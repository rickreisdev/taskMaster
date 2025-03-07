import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import taskService from '../../services/taskService';
import PropTypes from 'prop-types';

const TaskList = ({ activeFilter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const queryClient = useQueryClient();
  
  // Busca as tarefas
  const { data: tasks = [], isLoading, isError, error } = useQuery({
    queryKey: ['tasks', activeFilter],
    queryFn: () => {
      if (activeFilter === 'all') {
        return taskService.getAllTasks();
      } else {
        const status = activeFilter === 'completed' ? true : false;
        return taskService.getTasksByStatus(status);
      }
    }
  });

  // Mutação para criar/atualizar tarefa
  const mutationTask = useMutation({
    mutationFn: (taskData) => {
      if (taskData.id) {
        return taskService.updateTask(taskData.id, taskData);
      }
      return taskService.createTask(taskData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsModalOpen(false);
      setCurrentTask(null);
    }
  });

  // Mutação para excluir tarefa
  const deleteTask = useMutation({
    mutationFn: (taskId) => taskService.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setDeleteConfirmation(null);
    }
  });

  // Mutação para alternar status da tarefa
  const toggleTaskStatus = useMutation({
    mutationFn: ({ id, completed }) => taskService.toggleTaskStatus(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleCreateTask = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleSubmitTask = (taskData) => {
    mutationTask.mutate(taskData);
  };

  const confirmDelete = (taskId) => {
    setDeleteConfirmation(taskId);
  };

  const handleDeleteTask = () => {
    if (deleteConfirmation) {
      deleteTask.mutate(deleteConfirmation);
    }
  };

  const handleToggleStatus = (taskId, completed) => {
    toggleTaskStatus.mutate({ id: taskId, completed });
  };

  // Obtém o título de acordo com o filtro ativo
  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'pending':
        return 'Tarefas Pendentes';
      case 'completed':
        return 'Tarefas Concluídas';
      default:
        return 'Todas as Tarefas';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{getFilterTitle()}</h2>
        <Button onClick={handleCreateTask}>Nova Tarefa</Button>
      </div>

      {isLoading ? (
        <div className="py-10 text-center">
          <svg className="animate-spin h-8 w-8 mx-auto text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Carregando tarefas...</p>
        </div>
      ) : isError ? (
        <div className="py-10 text-center">
          <div className="text-red-500 mb-2">
            <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-700">Erro ao carregar tarefas</p>
          <p className="text-sm text-gray-500 mt-1">{error?.message || 'Tente novamente mais tarde'}</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="py-10 text-center border border-dashed rounded-lg">
          <svg className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="mt-2 text-gray-600">Nenhuma tarefa encontrada</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={handleCreateTask}>
            Criar nova tarefa
          </Button>
        </div>
      ) : (
        <div className="space-y-1">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={confirmDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {/* Modal para criar/editar tarefa */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentTask ? 'Editar Tarefa' : 'Nova Tarefa'}
      >
        <TaskForm
          task={currentTask}
          onSubmit={handleSubmitTask}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Modal de confirmação para excluir tarefa */}
      <Modal
        isOpen={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
        title="Confirmar exclusão"
        size="sm"
      >
        <div className="text-center">
          <svg className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <p className="mt-4 mb-6 text-gray-700">
            Tem certeza que deseja excluir esta tarefa?<br />
            Esta ação não pode ser desfeita.
          </p>
          <div className="flex space-x-3 justify-center">
            <Button
              variant="secondary"
              onClick={() => setDeleteConfirmation(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteTask}
              disabled={deleteTask.isLoading}
            >
              {deleteTask.isLoading ? 'Excluindo...' : 'Excluir'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

TaskList.propTypes = {
  activeFilter: PropTypes.string
};

export default TaskList;