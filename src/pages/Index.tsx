
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-3xl px-4 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="bg-campus-primary p-4 rounded-2xl">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Campus Bridge</h1>
        <p className="text-xl text-gray-600 mb-8">
          Unified platform for university students and faculty to manage academics and coding skill development
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate("/login")} 
            className="bg-campus-primary hover:bg-campus-primary/90 text-white px-8 py-6 rounded-xl text-lg"
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            className="border-campus-primary text-campus-primary hover:bg-campus-primary/10 px-8 py-6 rounded-xl text-lg"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">For Students</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Access course materials and assignments</li>
              <li>• Practice coding with interactive exercises</li>
              <li>• Get AI-powered learning assistance</li>
              <li>• Track your academic and coding progress</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">For Faculty</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Create and manage courses</li>
              <li>• Assign and grade assignments</li>
              <li>• Track student attendance and progress</li>
              <li>• Provide personalized feedback</li>
            </ul>
          </div>
        </div>
        
        <p className="mt-8 text-gray-500 text-sm">
          Campus Bridge - Integrated Academic LMS + Coding Skill Development Platform
        </p>
      </div>
    </div>
  );
};

export default Index;
