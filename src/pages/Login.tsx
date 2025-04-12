
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Loader2 } from "lucide-react";

type UserRole = "student" | "faculty" | "admin";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {
      username: username ? "" : "Username is required",
      password: password ? "" : "Password is required",
    };
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials for testing
      if (username === "demo" && password === "password") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", role);
        navigate("/dashboard");
        toast({
          title: "Login Successful",
          description: `Welcome back to Campus Bridge!`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleDemoLogin = (demoRole: UserRole) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", demoRole);
      navigate("/dashboard");
      toast({
        title: "Demo Login",
        description: `Logged in as ${demoRole}`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Illustration */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-campus-primary to-campus-secondary p-8 flex items-center justify-center">
        <div className="max-w-md text-white">
          <div className="mb-8 flex items-center">
            <BookOpen className="h-10 w-10 mr-2" />
            <h1 className="text-3xl font-bold">Campus Bridge</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-xl opacity-90 mb-8">
            Access your academic resources, coding practice, and AI assistants in one place.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-full mr-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Comprehensive LMS</h3>
                <p className="opacity-80">Access courses, assignments, and track your attendance</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium">Coding Platform</h3>
                <p className="opacity-80">Practice coding, track progress, and enhance your skills</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium">AI Assistants</h3>
                <p className="opacity-80">Get code hints, reviews and job matching recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-md animate-scale-in">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>
          <p className="text-gray-600 mb-8">Welcome back! Please enter your details</p>
          
          <Tabs defaultValue="student" value={role} onValueChange={(value) => setRole(value as UserRole)}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50"
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-campus-primary hover:underline">Forgot password?</a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-campus-primary hover:bg-campus-primary/90 py-6 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              
              <div className="mt-8">
                <p className="text-center text-gray-500 mb-4">Demo Accounts</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleDemoLogin("student")}
                    disabled={isLoading}
                  >
                    Student Demo
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleDemoLogin("faculty")}
                    disabled={isLoading}
                  >
                    Faculty Demo
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleDemoLogin("admin")}
                    disabled={isLoading}
                  >
                    Admin Demo
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faculty">
              <div className="space-y-4">
                <p>Faculty login form with the same fields as student login.</p>
                <Button
                  className="w-full"
                  onClick={() => handleDemoLogin("faculty")}
                >
                  Continue as Demo Faculty
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="admin">
              <div className="space-y-4">
                <p>Admin login form with the same fields as student login.</p>
                <Button
                  className="w-full"
                  onClick={() => handleDemoLogin("admin")}
                >
                  Continue as Demo Admin
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <p className="mt-8 text-center text-gray-500 text-sm">
            Campus Bridge - Integrated Academic LMS + Coding Skill Development Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
