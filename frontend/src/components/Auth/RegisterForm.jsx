import { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';

const RegisterForm = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const { register, loading } = useAuth();

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

        if (!formData.name) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!formData.email) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (!formData.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não conferem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');

        if (!validate()) return;

        try {
            await register(formData.name, formData.email, formData.password);
            setSuccess('Cadastro realizado com sucesso! Você já pode fazer login.');
            // Limpa o formulário após o cadastro bem-sucedido
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            // Redireciona para o login após um pequeno delay
            setTimeout(() => {
                onSwitchToLogin();
            }, 2000);
        } catch (error) {
            setErrors({ form: error.message });
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Cadastre-se no TaskMaster
            </h2>

            {errors.form && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                    {errors.form}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <Input
                    id="name"
                    name="name"
                    label="Nome completo"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Seu nome"
                    required
                />

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

                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirme sua senha"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                />

                <div className="mt-6">
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                </div>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-primary-600 hover:text-primary-700 font-medium focus:outline-none"
                    >
                        Faça login
                    </button>
                </p>
            </div>
        </div>
    );
};

RegisterForm.propTypes = {
    onSwitchToLogin: PropTypes.func.isRequired
};

export default RegisterForm;