import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their default dashboard based on role
    switch (user.role) {
      case 'Employee': return <Navigate to="/dashboard/employee" replace />;
      case 'Team Member': return <Navigate to="/dashboard/team" replace />;
      case 'Admin': return <Navigate to="/dashboard/admin" replace />;
      default: return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
