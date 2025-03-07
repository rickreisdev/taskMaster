import { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';

const LoginForm = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Entrar no TaskMaster
      </h2>
      
      {errors.form && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          label="E-mail"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="seu@email.com"
          required
        />
        
        <Input
          id="password"
          name="password"
          label="Senha"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        
        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary-600 hover:text-primary-700 font-medium focus:outline-none"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onSwitchToRegister: PropTypes.func.isRequired
};

export default LoginForm;