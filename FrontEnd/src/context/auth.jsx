import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  let token = localStorage.getItem('token');
  
  const [authenticated, setAuthenticated] = useState(!!token);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login , setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
