import { Outlet } from 'react-router';
import { useAuth } from '@/context/AuthenticationProvider';

import LoginPage from '@/pages/LoginPage';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoute;
