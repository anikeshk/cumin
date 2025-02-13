import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi } from '@/services/api';
import { connectSocket, disconnectSocket } from '@/services/socket';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authApi.get('/me');
        setIsAuthenticated(true);
        setUser(data.user);
        connectSocket();
      } catch (error) {
        console.error('Auth check failed', error);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await authApi.post('/login', { email, password });
    if (data.error) {
      throw new Error(data.error);
    }
    setIsAuthenticated(true);
    setUser(data.user);
    connectSocket();
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await authApi.post('/register', { name, email, password });
    if (data.error) {
      throw new Error(data.error);
    }
  };

  const logout = async () => {
    await authApi.post('/logout');
    setUser(null);
    disconnectSocket();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
