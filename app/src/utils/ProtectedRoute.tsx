import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/context/AuthProvider';

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
