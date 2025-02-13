import { createBrowserRouter, RouterProvider } from 'react-router';

import ProtectedRoute from './ProtectedRouter';

import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'register', element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: 'dashboard', element: <DashboardPage /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
