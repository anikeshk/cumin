import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi } from '@/services/api';
// import { connectSocket, disconnectSocket } from '@/services/socket';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthenticationContextType {
  isAuthenticated: boolean;
  auth: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(
  undefined
);

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<User | null>(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });

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
    setIsAuthenticated(true);
    setAuth(data.data);
    //connectSocket();
  };

  const logout = async () => {
    await authApi.post('/logout');
    //disconnectSocket();
    setAuth(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider value={{ auth, isAuthenticated, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) throw new Error('useAuth must be used within AuthenticationProvider');
  return context;
};
