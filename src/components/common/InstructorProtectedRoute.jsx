import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useInstructorAuth } from '../../contexts/InstructorAuthContext';

const InstructorProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useInstructorAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to instructor login page with return url
    return <Navigate to="/instructor/login" state={{ from: location }} replace />;
  }

  return children;
};

export default InstructorProtectedRoute;