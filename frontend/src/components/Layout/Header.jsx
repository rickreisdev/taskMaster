import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-primary-600">TaskMaster</h1>
            </div>
          </div>
          
          {currentUser && (
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex md:items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-700">
                      {currentUser.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {currentUser.email}
                    </span>
                  </div>
                  
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Sair
                  </button>
                </div>
              </div>
              
              {/* Menu móvel */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;