import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';

import { useAuth } from '@/context/AuthProvider';

export const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full border-b bg-white shadow-sm">
      <NavigationMenu className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left side - Logo */}
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className="text-lg font-semibold">
                Cumin
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Right side - Auth buttons */}
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem>
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            ) : (
              <div className="flex gap-2">
                <NavigationMenuLink asChild>
                  <Link to="/login" className="text-black hover:text-gray-500">
                    Login
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/register" className="text-black hover:text-gray-500">
                    Register
                  </Link>
                </NavigationMenuLink>
              </div>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
