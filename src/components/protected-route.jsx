import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const location = useLocation();
  const { user } = useSelector(store => store.auth);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: '/login' }} state={{ from: location.pathname }} />
  );
};
