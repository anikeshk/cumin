import { Outlet } from 'react-router';

import { NavBar } from '@/components/main/NavBar';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex justify-center items-center p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
