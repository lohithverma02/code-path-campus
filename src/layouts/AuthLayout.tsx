
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

// This is a simple auth layout that will redirect to login if not authenticated
// In a real app, this would verify the JWT token with the backend
const AuthLayout = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const authToken = localStorage.getItem("authToken");
  
  useEffect(() => {
    // In a real app, we would validate the JWT token here
    // and redirect to login if it's invalid or expired
    // For demo purposes, we're just checking if the token exists
    if (!authToken && isAuthenticated) {
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/login";
    }
  }, [authToken, isAuthenticated]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthLayout;
