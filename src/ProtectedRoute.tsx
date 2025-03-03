import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
interface ProtectedRouteProps {
  requireAuth?: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAuth = true }) => {
  const location = useLocation();
  const isAuthenticated = true; // Replace with your auth logic
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;