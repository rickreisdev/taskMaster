import { Navigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const Auth = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { isAuthenticated } = useAuth();

  // Redireciona para o dashboard se o usuário já estiver autenticado
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {isLoginView ? (
          <LoginForm onSwitchToRegister={() => setIsLoginView(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLoginView(true)} />
        )}
      </div>
    </div>
  );
};

export default Auth;