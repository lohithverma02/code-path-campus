
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
          Unified platform for university students to manage academics and coding skill development
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
        
        <p className="mt-8 text-gray-500 text-sm">
          Campus Bridge - Integrated Academic LMS + Coding Skill Development Platform
        </p>
      </div>
    </div>
  );
};

export default Index;
