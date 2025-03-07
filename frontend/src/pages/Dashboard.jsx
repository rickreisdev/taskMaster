import { Navigate } from 'react-router-dom';
// import Layout from '../components/Layout/Layout';
import TaskList from '../components/Tasks/TaskList';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { isAuthenticated, loading } = useAuth();

  // Aguarde o carregamento antes de verificar a autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redireciona para a página de login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div>
      <TaskList activeFilter={activeFilter}/>
    </div>
  );
};

export default Dashboard;