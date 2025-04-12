
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const Attendance = () => {
  // Sample data - in a real app, this would come from an API
  const courses = [
    {
      id: 1,
      code: "CS301",
      name: "Data Structures & Algorithms",
      attended: 18,
      total: 20,
      percentage: 90,
      lastAttendance: "2025-04-10",
      status: "Excellent"
    },
    {
      id: 2,
      code: "CS302",
      name: "Web Development",
      attended: 12,
      total: 18,
      percentage: 67,
      lastAttendance: "2025-04-11",
      status: "Warning"
    },
    {
      id: 3,
      code: "CS303",
      name: "Object Oriented Programming",
      attended: 16,
      total: 20,
      percentage: 80,
      lastAttendance: "2025-04-09",
      status: "Good"
    }
  ];
  
  // Data for pie chart
  const attendanceData = [
    { name: "Present", value: 46, color: "#22c55e" },
    { name: "Absent", value: 12, color: "#ef4444" },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-campus-success text-campus-success bg-opacity-10";
      case "Good":
        return "bg-campus-primary text-campus-primary bg-opacity-10";
      case "Warning":
        return "bg-campus-warning text-campus-warning bg-opacity-10";
      case "Critical":
        return "bg-campus-danger text-campus-danger bg-opacity-10";
      default:
        return "bg-gray-200 text-gray-800";
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
  
  const overallAttendance = courses.reduce((acc, course) => acc + course.attended, 0) / 
                            courses.reduce((acc, course) => acc + course.total, 0) * 100;
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>
      
      {courses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Overall Attendance Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Overall Attendance</CardTitle>
                <CardDescription>Your attendance across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold">{Math.round(overallAttendance)}%</span>
                  <span className="text-gray-500 pb-1">attendance rate</span>
                </div>
                <Progress value={overallAttendance} className="h-2" />
                
                <div className="mt-6 grid grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Classes</p>
                    <p className="text-xl font-medium">{courses.reduce((acc, course) => acc + course.total, 0)}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Present</p>
                    <p className="text-xl font-medium text-campus-success">{courses.reduce((acc, course) => acc + course.attended, 0)}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Absent</p>
                    <p className="text-xl font-medium text-campus-danger">
                      {courses.reduce((acc, course) => acc + (course.total - course.attended), 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Courses</p>
                    <p className="text-xl font-medium">{courses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Attendance Chart Card */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Distribution</CardTitle>
                <CardDescription>Present vs Absent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-campus-success mr-2"></span>
                    <span className="text-sm">Present</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-campus-danger mr-2"></span>
                    <span className="text-sm">Absent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Course-wise Attendance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Course-wise Attendance</CardTitle>
              <CardDescription>Detailed attendance for each enrolled course</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead className="text-right">Present/Total</TableHead>
                    <TableHead className="text-right">Last Attended</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map(course => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p>{course.name}</p>
                          <p className="text-sm text-muted-foreground">{course.code}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{course.percentage}%</p>
                          <Progress value={course.percentage} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {course.attended}/{course.total}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(course.lastAttendance)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="pt-6 pb-6 text-center">
            <div className="py-8">
              <h3 className="text-lg font-medium mb-2">No Courses Enrolled</h3>
              <p className="text-gray-500">
                You haven't enrolled in any courses yet. Enroll in courses to track attendance.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Attendance;
