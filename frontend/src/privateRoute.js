import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, role, ...rest }) => (
  <Route
    {...rest}
    element={(props) => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('role');

      if (!token) {
        return <Navigate to="/login" />;
      }

      if (role && userRole !== role) {
        return <Navigate to="/login" />;
      }

      return <Element {...props} />;
    }}
  />
);

export default PrivateRoute;
