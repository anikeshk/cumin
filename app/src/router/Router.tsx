import { createBrowserRouter, RouterProvider } from 'react-router';

import ProtectedRoute from './ProtectedRouter';

import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import RegisterPage from '@/pages/RegisterPage';
import ProjectPage from '@/pages/ProjectPage';
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
          { path: '', element: <HomePage /> },
          { path: 'project/:id', element: <ProjectPage /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
