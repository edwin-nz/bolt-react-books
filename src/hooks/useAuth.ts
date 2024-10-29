import { useState, useCallback } from 'react';
import { login, setAuthToken, removeAuthToken } from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await login(email, password);
      setAuthToken(token);
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    removeAuthToken();
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  }, []);

  return { isAuthenticated, isLoading, error, login: handleLogin, logout: handleLogout };
};