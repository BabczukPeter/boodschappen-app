import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthChange, registerUser, loginUser, logoutUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth outside provider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const register = async (email, password, username) => {
    setLoading(true);
    const res = await registerUser(email, password, username);
    if (res.success) setUser(res.user);
    else setError(res.error);
    setLoading(false);
    return res;
  };

  const login = async (email, password) => {
    setLoading(true);
    const res = await loginUser(email, password);
    if (res.success) setUser(res.user);
    else setError(res.error);
    setLoading(false);
    return res;
  };

  const logout = async () => {
    setLoading(true);
    const res = await logoutUser();
    if (res.success) setUser(null);
    setLoading(false);
    return res;
  };

  return <AuthContext.Provider value={{ user, loading, error, register, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
};
