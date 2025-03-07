import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';

const Layout = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header fixo no topo */}
            <Header />

            <div className="flex flex-1">
                {/* Sidebar Desktop */}
                <Sidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

                {/* Sidebar Mobile */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-40 md:hidden">
                        <div
                            className="fixed inset-0 bg-gray-600 bg-opacity-75"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                            <div className="px-4 pt-5 pb-4">
                                <Sidebar activeFilter={activeFilter} setActiveFilter={(filter) => {
                                    setActiveFilter(filter);
                                    setMobileMenuOpen(false);
                                }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Conteúdo Principal com Outlet */}
                <main className="flex-1 p-4">
                    {/* Botão para abrir menu mobile */}
                    <div className="md:hidden mb-4">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Abrir menu</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Aqui os filhos (Dashboard, NotFound, etc) serão renderizados */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
