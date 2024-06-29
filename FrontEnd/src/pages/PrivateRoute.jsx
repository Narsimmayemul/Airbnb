// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={authenticated ? <Component /> : <Navigate to="/signin" />}
    />
  );
};

export default PrivateRoute;
