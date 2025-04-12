
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download
} from "lucide-react";

interface Assignment {
  id: number;
  title: string;
  course: string;
  courseCode: string;
  dueDate: string;
  status: "pending" | "submitted" | "overdue" | "graded";
  grade?: string;
  description: string;
}

const Assignments = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Sample data
  const assignments: Assignment[] = [
    {
      id: 1,
      title: "Database Design Project",
      course: "Database Systems",
      courseCode: "CS304",
      dueDate: "2025-04-13",
      status: "pending",
      description: "Design a normalized database schema for a university management system."
    },
    {
      id: 2,
      title: "Web Development Assignment 2",
      course: "Web Development",
      courseCode: "CS302",
      dueDate: "2025-04-15",
      status: "pending",
      description: "Create a responsive dashboard using React and Tailwind CSS."
    },
    {
      id: 3,
      title: "Data Structures & Algorithms Quiz",
      course: "Data Structures & Algorithms",
      courseCode: "CS301",
      dueDate: "2025-04-10",
      status: "submitted",
      description: "Online quiz covering graph algorithms and dynamic programming."
    },
    {
      id: 4,
      title: "Python Programming Assignment 1",
      course: "Object Oriented Programming",
      courseCode: "CS303",
      dueDate: "2025-04-05",
      status: "graded",
      grade: "A",
      description: "Implement a library management system using OOP principles in Python."
    },
    {
      id: 5,
      title: "Computer Networks Lab Report",
      course: "Computer Networks",
      courseCode: "CS305",
      dueDate: "2025-04-01",
      status: "overdue",
      description: "Document the results of TCP/IP and subnet mask configuration lab."
    }
  ];
  
  // Filter assignments based on the active filter
  const filteredAssignments = assignments.filter(assignment => {
    if (activeFilter === "all") return true;
    if (activeFilter === "due-soon") {
      const dueDate = new Date(assignment.dueDate);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return assignment.status === "pending" && diffDays <= 7 && diffDays >= 0;
    }
    if (activeFilter === "submitted") return assignment.status === "submitted" || assignment.status === "graded";
    if (activeFilter === "overdue") return assignment.status === "overdue";
    return false;
  });
  
  const getStatusBadge = (status: string, grade?: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Pending</Badge>;
      case "submitted":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Submitted</Badge>;
      case "overdue":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Overdue</Badge>;
      case "graded":
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Graded</Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">{grade}</Badge>
          </div>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  
  const getDaysRemaining = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return "Due today";
    } else if (diffDays === 1) {
      return "Due tomorrow";
    } else {
      return `Due in ${diffDays} days`;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "submitted":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "graded":
        return <CheckCircle className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>
      
      <div className="mb-6">
        <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="due-soon">Due Soon</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Assignment List</CardTitle>
          <CardDescription>
            {activeFilter === "all" ? "All assignments" : 
             activeFilter === "due-soon" ? "Assignments due within 7 days" :
             activeFilter === "submitted" ? "Submitted and graded assignments" :
             "Overdue assignments"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAssignments.length > 0 ? (
            <div className="space-y-4">
              {filteredAssignments.map(assignment => (
                <div key={assignment.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-gray-100">
                      {getStatusIcon(assignment.status)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between flex-wrap gap-y-2">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-gray-500">{assignment.course} ({assignment.courseCode})</p>
                        </div>
                        <div className="flex flex-col items-end">
                          {getStatusBadge(assignment.status, assignment.grade)}
                        </div>
                      </div>
                      
                      <p className="text-sm mt-2">{assignment.description}</p>
                      
                      <div className="flex justify-between items-center mt-4 flex-wrap gap-y-2">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">{formatDate(assignment.dueDate)}</span>
                          </div>
                          <div className="text-sm">
                            {assignment.status === "pending" && (
                              <span className={`
                                ${
                                  getDaysRemaining(assignment.dueDate).includes("Overdue") 
                                    ? "text-red-600" 
                                    : getDaysRemaining(assignment.dueDate).includes("today") 
                                      ? "text-orange-600" 
                                      : "text-blue-600"
                                }
                              `}>
                                {getDaysRemaining(assignment.dueDate)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm">
                            {assignment.status === "pending" || assignment.status === "overdue" 
                              ? "Submit" 
                              : assignment.status === "submitted" 
                                ? "View Submission" 
                                : "View Feedback"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No assignments found in this category</h3>
              <p className="text-gray-500 mb-4">
                {activeFilter === "all" 
                  ? "You don't have any assignments yet" 
                  : activeFilter === "due-soon" 
                    ? "You don't have any assignments due soon" 
                    : activeFilter === "submitted" 
                      ? "You haven't submitted any assignments yet" 
                      : "You don't have any overdue assignments"}
              </p>
              {activeFilter !== "all" && (
                <Button variant="outline" onClick={() => setActiveFilter("all")}>
                  View All Assignments
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Assignments;
