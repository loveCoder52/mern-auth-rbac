import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

/**
 * Protected Route Component
 * Protects routes based on:
 * - Authentication status
 * - User role
 * - Specific permissions
 * 
 * Usage:
 * <ProtectedRoute requiredRoles={['admin']} requiredPermissions={['delete_users']}>
 *   <Component />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ 
  children, 
  requiredRoles = null, 
  requiredPermissions = null,
  requireAllPermissions = false // If false, requires any one permission; if true, requires all
}) => {
  const { isLoggedIn, userRole, hasAnyPermission, hasAllPermissions, loading } = useContext(AppContext);

  // Show loading while checking auth
  if (loading) {
    return <div className='flex items-center justify-center min-h-screen'>Loading...</div>;
  }

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Check role requirements
  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check permission requirements
  if (requiredPermissions) {
    const permissions = Array.isArray(requiredPermissions) 
      ? requiredPermissions 
      : [requiredPermissions];

    let hasAccess = false;
    if (requireAllPermissions) {
      hasAccess = hasAllPermissions(permissions);
    } else {
      hasAccess = hasAnyPermission(permissions);
    }

    if (!hasAccess) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If all checks pass, render the component
  return children;
};

export default ProtectedRoute;