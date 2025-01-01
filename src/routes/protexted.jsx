import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcon';

const Protexted = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protexted;
