
import { 
  Clock, 
  ClipboardList, 
  Code, 
  Star 
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Sample data
const weeklyActivity = [
  { day: 'Mon', problems: 5 },
  { day: 'Tue', problems: 3 },
  { day: 'Wed', problems: 7 },
  { day: 'Thu', problems: 2 },
  { day: 'Fri', problems: 4 },
  { day: 'Sat', problems: 8 },
  { day: 'Sun', problems: 6 },
];

const Dashboard = () => {
  const courses = [
    { id: 1, name: "Data Structures & Algorithms", instructor: "Dr. Jane Smith", progress: 65 },
    { id: 2, name: "Web Development", instructor: "Prof. John Doe", progress: 42 },
    { id: 3, name: "Object Oriented Programming", instructor: "Dr. Robert Johnson", progress: 78 },
  ];
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Attendance"
          value="82%"
          icon={<Clock className="h-5 w-5" />}
          trend={{ value: 2.5, isPositive: true }}
          description="Overall for this semester"
          color="blue"
        />
        
        <DashboardCard 
          title="Assignments"
          value="5/7"
          icon={<ClipboardList className="h-5 w-5" />}
          description="Due this week"
          color="purple"
        />
        
        <DashboardCard 
          title="Coding Problems"
          value="23"
          icon={<Code className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
          description="Solved this month"
          color="green"
        />
        
        <DashboardCard 
          title="Current GPA"
          value="3.7"
          icon={<Star className="h-5 w-5" />}
          trend={{ value: 0.2, isPositive: true }}
          description="On track for honors"
          color="orange"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Current Courses</CardTitle>
            <CardDescription>Your enrolled courses this semester</CardDescription>
          </CardHeader>
          <CardContent>
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{course.name}</h3>
                        <p className="text-sm text-gray-500">{course.instructor}</p>
                      </div>
                      <span className="text-campus-primary font-medium">{course.progress}%</span>
                    </div>
                    <div className="mt-3 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-campus-primary h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No courses enrolled yet.</p>
                <Button>Browse Available Courses</Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline">View All Courses</Button>
          </CardFooter>
        </Card>
        
        {/* Coding Skills Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Coding Skills Progress</CardTitle>
            <CardDescription>Your weekly coding activity</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="problems" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="justify-between">
            <p className="text-sm text-gray-500">Total problems solved: 35</p>
            <Button variant="outline">View Full Skill Report</Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Upcoming Deadlines */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Tasks and assignments due soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-3 border rounded-lg">
              <div className="w-2 h-12 bg-campus-danger rounded-full mr-4"></div>
              <div className="flex-1">
                <h3 className="font-medium">Database Design Assignment</h3>
                <p className="text-sm text-gray-500">Due tomorrow at 11:59 PM</p>
              </div>
              <Button size="sm">View</Button>
            </div>
            
            <div className="flex items-center p-3 border rounded-lg">
              <div className="w-2 h-12 bg-campus-warning rounded-full mr-4"></div>
              <div className="flex-1">
                <h3 className="font-medium">Web Development Quiz</h3>
                <p className="text-sm text-gray-500">Due in 3 days</p>
              </div>
              <Button size="sm">View</Button>
            </div>
            
            <div className="flex items-center p-3 border rounded-lg">
              <div className="w-2 h-12 bg-campus-secondary rounded-full mr-4"></div>
              <div className="flex-1">
                <h3 className="font-medium">DSA Contest Participation</h3>
                <p className="text-sm text-gray-500">Due in 5 days</p>
              </div>
              <Button size="sm">View</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="outline">View All Deadlines</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
