import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import PropTypes from 'prop-types';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        priority: task.priority || 'medium'
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onSubmit({
      ...formData,
      id: task?.id
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="title"
        name="title"
        label="Título da tarefa"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Digite o título da tarefa"
        required
      />
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Descreva sua tarefa"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="dueDate"
          name="dueDate"
          label="Data de entrega"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
        
        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Prioridade
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
      </div>
      
      <div className="flex mt-6 space-x-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          variant="primary"
        >
          {task ? 'Atualizar' : 'Criar'} Tarefa
        </Button>
      </div>
    </form>
  );
};

TaskForm.propTypes = {
  task: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default TaskForm;