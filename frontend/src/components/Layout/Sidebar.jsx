import PropTypes from 'prop-types';

const Sidebar = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', label: 'Todas as tarefas' },
    { id: 'pending', label: 'Pendentes' },
    { id: 'completed', label: 'Concluídas' }
  ];

  return (
    <aside className="bg-gray-50 w-64 p-4 border-r border-gray-200 h-full hidden md:block">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros</h2>
      <nav className="space-y-1">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeFilter === filter.id
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired
};

export default Sidebar;
