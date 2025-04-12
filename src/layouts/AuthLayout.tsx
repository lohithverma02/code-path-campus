
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const AuthLayout = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const authToken = localStorage.getItem("authToken");
  
  useEffect(() => {
    // In a real app, we would validate the JWT token here
    // For demo purposes, we're just checking if the token exists
    if (!authToken && isAuthenticated) {
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/login";
    }
  }, [authToken, isAuthenticated]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="space-y-2 w-[80%] max-w-md">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthLayout;
