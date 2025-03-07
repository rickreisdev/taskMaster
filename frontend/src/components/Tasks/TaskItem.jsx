import PropTypes from 'prop-types';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className={`border rounded-lg shadow-sm p-4 mb-3 ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            className="h-5 w-5 mt-0.5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            checked={task.completed}
            onChange={() => onToggleStatus(task.id, !task.completed)}
          />
          
          <div>
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {task.dueDate && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(task.dueDate)}
                </span>
              )}
              
              {task.priority && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                  {priorityLabels[task.priority]}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-primary-600 transition-colors"
            title="Editar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-600 transition-colors"
            title="Excluir"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired
};

export default TaskItem;