import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// A wrapper component to protect routes from unauthenticated access
const PrivateRoute = ({ children }) => {
  // Get authentication status from Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // If authenticated, render the protected component
  // Otherwise, redirect to login page
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
