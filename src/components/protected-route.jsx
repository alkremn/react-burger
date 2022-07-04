import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useSelector(store => store.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? children : <Redirect to={{ pathname: '/login', from: location.pathname }} />
      }
    />
  );
};
