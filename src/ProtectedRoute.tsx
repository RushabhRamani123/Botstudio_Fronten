import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth = true }) => {
  const location = useLocation();
  const isAuthenticated = true; // Replace with your auth logic

  const authRoutes = [
    '/login',
    '/signup',
    '/signup-details',
    '/check-email',
    '/email-verified',
    '/forgot-password',
    '/reset-password'
  ];

  const isAuthRoute = authRoutes.includes(location.pathname);

  if (requireAuth) {
    // Redirect to home if authenticated user tries to access auth routes
    if (isAuthenticated && isAuthRoute) {
      return <Navigate to="/" replace />;
    }
  } else {
    // For non-protected routes (auth routes), redirect to home if authenticated
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  }

  // Allow access to protected routes when authenticated
  if (!isAuthenticated && requireAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;