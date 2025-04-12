
import { Navigate, Outlet } from "react-router-dom";

// This is a simple auth layout that will redirect to login if not authenticated
// In a real app, this would check for a valid authentication token
const AuthLayout = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthLayout;
