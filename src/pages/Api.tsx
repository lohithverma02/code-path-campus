
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiStructure = () => {
  const apiModules = [
    {
      name: "Authentication & User Roles",
      icon: "🔐",
      routes: [
        { method: "POST", path: "/auth/register", description: "Register new users with roles (student/faculty/admin)" },
        { method: "POST", path: "/auth/login", description: "User login with JWT or OAuth" },
        { method: "GET", path: "/auth/me", description: "Get current user profile" },
        { method: "PUT", path: "/auth/update-profile", description: "Update user details" },
        { method: "GET", path: "/users/role/:role", description: "Get all users by role" }
      ]
    },
    {
      name: "LMS Module",
      icon: "📚",
      routes: [
        { method: "GET", path: "/courses", description: "List all academic courses" },
        { method: "POST", path: "/courses", description: "Create a new course (faculty only)" },
        { method: "PUT", path: "/courses/:id", description: "Update course info" },
        { method: "DELETE", path: "/courses/:id", description: "Remove course" },
        { method: "POST", path: "/attendance/mark", description: "Mark attendance" },
        { method: "GET", path: "/attendance/:studentId", description: "View attendance by student" },
        { method: "GET", path: "/attendance/course/:courseId", description: "Attendance by course" },
        { method: "POST", path: "/assignments", description: "Create/upload assignments" },
        { method: "GET", path: "/assignments/:courseId", description: "List course assignments" },
        { method: "POST", path: "/assignments/submit", description: "Student submission" },
        { method: "GET", path: "/assignments/submissions/:assignmentId", description: "Faculty view" },
        { method: "POST", path: "/materials/upload", description: "Upload PDFs, videos" },
        { method: "GET", path: "/materials/:courseId", description: "List materials for a course" }
      ]
    },
    {
      name: "Coding Module",
      icon: "👨‍💻",
      routes: [
        { method: "GET", path: "/coding/tracks", description: "Available tracks (DSA, Web Dev, etc.)" },
        { method: "POST", path: "/coding/enroll", description: "Enroll in track" },
        { method: "GET", path: "/coding/my-tracks", description: "View enrolled tracks" },
        { method: "GET", path: "/coding/questions/:trackId", description: "List questions" },
        { method: "POST", path: "/coding/submit", description: "Submit code" },
        { method: "POST", path: "/coding/compile", description: "Compile code (Judge0 or custom service)" },
        { method: "GET", path: "/coding/heatmap/:userId", description: "Get skill heatmap" },
        { method: "GET", path: "/coding/leaderboard", description: "Global leaderboard" }
      ]
    },
    {
      name: "AI Assistant Endpoints",
      icon: "🤖",
      routes: [
        { method: "POST", path: "/ai/code-hint", description: "Send code and get real-time GPT hint" },
        { method: "POST", path: "/ai/review", description: "Send code and get review with feedback" },
        { method: "POST", path: "/ai/job-match", description: "Match profile with JD (JSON in, matches out)" },
        { method: "POST", path: "/ai/group-room", description: "Create/join group code session (use WebSockets)" }
      ]
    },
    {
      name: "Analytics & Dashboards",
      icon: "📊",
      routes: [
        { method: "GET", path: "/analytics/student/:id", description: "Student's academic + coding progress" },
        { method: "GET", path: "/analytics/faculty/:id", description: "Faculty course/coding impact" },
        { method: "GET", path: "/analytics/admin", description: "Placement readiness + stats" },
        { method: "GET", path: "/analytics/export", description: "Download report (CSV/PDF)" }
      ]
    },
    {
      name: "Contests & Placement Tools",
      icon: "🎯",
      routes: [
        { method: "POST", path: "/contests/schedule", description: "Admin schedules coding test" },
        { method: "GET", path: "/contests/list", description: "Upcoming + past contests" },
        { method: "POST", path: "/contests/submit", description: "Submit contest code" },
        { method: "GET", path: "/placement/eligible-students", description: "Filter by criteria" },
        { method: "GET", path: "/placement/skills-report", description: "Aggregate skill data" }
      ]
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-blue-100 text-blue-800";
      case "POST": return "bg-green-100 text-green-800";
      case "PUT": return "bg-yellow-100 text-yellow-800";
      case "DELETE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">API Documentation</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-muted w-full">
          <TabsTrigger value="all" className="flex-1">All APIs</TabsTrigger>
          {apiModules.map((module, index) => (
            <TabsTrigger key={index} value={`tab-${index}`} className="flex-1 hidden md:flex">
              {module.icon} {module.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiModules.map((module, moduleIndex) => (
              <Card key={moduleIndex} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center">
                    <span className="mr-2">{module.icon}</span>
                    {module.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {module.routes.map((route, routeIndex) => (
                      <div key={routeIndex} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`${getMethodColor(route.method)}`}>
                            {route.method}
                          </Badge>
                          <span className="text-sm font-mono text-gray-600">{route.path}</span>
                        </div>
                        <p className="text-sm text-gray-500">{route.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {apiModules.map((module, tabIndex) => (
          <TabsContent key={tabIndex} value={`tab-${tabIndex}`}>
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center">
                  <span className="mr-2">{module.icon}</span>
                  {module.name} API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {module.routes.map((route, routeIndex) => (
                    <div key={routeIndex} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${getMethodColor(route.method)}`}>
                          {route.method}
                        </Badge>
                        <span className="text-sm font-mono text-gray-600">{route.path}</span>
                      </div>
                      <p className="text-sm text-gray-500">{route.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ApiStructure;
