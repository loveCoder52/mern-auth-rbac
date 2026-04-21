import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// ProtectedRoute component to protect routes based on authentication and role
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isLoggedIn, userRole } = useContext(AppContext);

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the component
  return children;
};

export default ProtectedRoute;
