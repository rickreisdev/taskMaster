import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <h1 className="text-9xl font-bold text-primary-600">404</h1>
                <h2 className="mt-3 text-2xl font-semibold text-gray-900">Página não encontrada</h2>
                <p className="mt-2 text-gray-600">
                    A página que você está procurando não existe ou foi movida.
                </p>
                <div className="mt-6">
                    <Link to="/">
                        <Button variant="primary">Voltar para o início</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;