import { Outlet } from 'react-router';

import Navbar from '@/components/NavBar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
