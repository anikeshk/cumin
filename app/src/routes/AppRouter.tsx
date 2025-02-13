import { createBrowserRouter, RouterProvider } from 'react-router';

import MainLayout from '@/components/main/MainLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import ProtectedRoute from '@/utils/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      // { path: 'register', element: <Login /> },
      {
        path: 'dashboard',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <Dashboard /> }],
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
