import { Link, useNavigate } from 'react-router';

import { useAuth } from '@/context/AuthenticationProvider';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div>
      <nav className="bg-transparent p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="text-black text-2xl font-bold hover:text-gray-500">
              Cumin
            </Link>
          </div>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-black hover:text-blue-500">
              Logout
            </button>
          ) : (
            <div>
              <Link to="/register" className="text-black hover:text-gray-500">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
