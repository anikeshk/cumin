import { useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

import AuthenticationContext from '@/context/AuthenticationContext';
import { User } from '@/types';
import { authApi } from '@/services/api';

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User | null>(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = async (email: string, password: string) => {
    const { data } = await authApi.post('/login', { email, password });
    if (data.error) {
      throw new Error(data.error);
    }
    setSocket(
      io(`${import.meta.env.VITE_API_URL}`, {
        withCredentials: true,
        //autoConnect: false,
      })
    );
    setAuth(data.data);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authApi.post('/logout');
    setIsAuthenticated(false);
    setAuth(null);
    if (socket?.connected) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <AuthenticationContext.Provider value={{ auth, isAuthenticated, socket, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) throw new Error('useAuth must be used within AuthenticationProvider');
  return context;
};
