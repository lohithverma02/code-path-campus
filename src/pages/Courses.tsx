
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("my-courses");
  
  // Sample data - in a real app, this would come from an API
  const myCourses = [
    {
      id: 1,
      code: "CS301",
      name: "Data Structures & Algorithms",
      instructor: "Dr. Jane Smith",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      progress: 65
    },
    {
      id: 2,
      code: "CS302",
      name: "Web Development",
      instructor: "Prof. John Doe",
      schedule: "Tue, Thu - 2:00 PM",
      progress: 42
    },
    {
      id: 3,
      code: "CS303",
      name: "Object Oriented Programming",
      instructor: "Dr. Robert Johnson",
      schedule: "Mon, Wed - 1:00 PM",
      progress: 78
    }
  ];
  
  const availableCourses = [
    {
      id: 4,
      code: "CS304",
      name: "Database Systems",
      instructor: "Prof. Sarah Wilson",
      schedule: "Tue, Thu - 11:00 AM",
      seats: "32/40"
    },
    {
      id: 5,
      code: "CS305",
      name: "Computer Networks",
      instructor: "Dr. Michael Brown",
      schedule: "Wed, Fri - 3:00 PM",
      seats: "25/35"
    },
    {
      id: 6,
      code: "CS306",
      name: "Software Engineering",
      instructor: "Prof. Emily Clark",
      schedule: "Mon, Wed - 9:00 AM",
      seats: "18/30"
    }
  ];
  
  // Filter courses based on search query
  const filteredMyCourses = myCourses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredAvailableCourses = availableCourses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Courses</h1>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search courses by name, code, or instructor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6"
        />
      </div>
      
      <Tabs defaultValue="my-courses" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-muted w-full">
          <TabsTrigger value="my-courses" className="flex-1">My Courses</TabsTrigger>
          <TabsTrigger value="available-courses" className="flex-1">Available Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-courses">
          {filteredMyCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMyCourses.map(course => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="h-2 bg-campus-primary"></div>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>{course.code}</CardDescription>
                      </div>
                      <span className="text-campus-primary font-medium">{course.progress}%</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Instructor:</span> {course.instructor}</p>
                      <p className="text-sm"><span className="font-medium">Schedule:</span> {course.schedule}</p>
                      <div className="mt-4">
                        <div className="text-sm text-gray-500 mb-1">Progress</div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-campus-primary h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button>Go to Course</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 pb-6 text-center">
                <div className="py-8">
                  <h3 className="text-lg font-medium mb-2">No Courses Enrolled</h3>
                  <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
                  <Button onClick={() => setActiveTab("available-courses")}>
                    Browse Available Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="available-courses">
          {filteredAvailableCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAvailableCourses.map(course => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="h-2 bg-gray-400"></div>
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Instructor:</span> {course.instructor}</p>
                      <p className="text-sm"><span className="font-medium">Schedule:</span> {course.schedule}</p>
                      <p className="text-sm"><span className="font-medium">Available seats:</span> {course.seats}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button>Enroll</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 pb-6 text-center">
                <div className="py-8">
                  <h3 className="text-lg font-medium mb-2">No Courses Found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
