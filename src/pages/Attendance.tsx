
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
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
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { attendanceService, AttendanceRecord } from "@/services/attendanceService";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Check, 
  X, 
  Calendar,
  CalendarCheck,
  BookOpen,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Attendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Fetch courses on load
  useEffect(() => {
    const allCourses = attendanceService.getCourses();
    setCourses(allCourses);
    
    if (allCourses.length > 0) {
      setSelectedCourse(allCourses[0].id);
    }
  }, []);

  // Fetch attendance data when course changes
  useEffect(() => {
    if (!selectedCourse || !user) return;
    
    try {
      if (user.role === "student") {
        const data = attendanceService.getStudentCourseAttendance(user.id, selectedCourse);
        setAttendanceData(data);
      } else if (user.role === "faculty") {
        const data = attendanceService.getFacultyCourseAttendance(user.id, selectedCourse);
        setAttendanceData(data);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      toast({
        title: "Error",
        description: "Failed to load attendance data. Please try again.",
        variant: "destructive"
      });
    }
  }, [selectedCourse, user, toast]);

  const toggleDateExpansion = (date: string) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const handleMarkAttendance = (studentId: string, date: string, status: "present" | "absent") => {
    if (!user || !selectedCourse) return;
    
    try {
      attendanceService.markAttendance({
        studentId,
        courseId: selectedCourse,
        date,
        status,
        markedBy: user.id
      });
      
      // Refresh data
      const data = attendanceService.getFacultyCourseAttendance(user.id, selectedCourse);
      setAttendanceData(data);
      
      toast({
        title: "Success",
        description: `Attendance marked as ${status} for the student`,
      });
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast({
        title: "Error",
        description: "Failed to mark attendance. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateAttendance = (attendanceId: string, newStatus: "present" | "absent") => {
    if (!user || !selectedCourse) return;
    
    try {
      attendanceService.updateAttendance(attendanceId, newStatus);
      
      // Refresh data
      if (user.role === "faculty") {
        const data = attendanceService.getFacultyCourseAttendance(user.id, selectedCourse);
        setAttendanceData(data);
      } else {
        const data = attendanceService.getStudentCourseAttendance(user.id, selectedCourse);
        setAttendanceData(data);
      }
      
      setIsEditing(null);
      
      toast({
        title: "Success",
        description: `Attendance updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast({
        title: "Error",
        description: "Failed to update attendance. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAttendance = (attendanceId: string) => {
    if (!user || !selectedCourse) return;
    
    try {
      attendanceService.deleteAttendance(attendanceId);
      
      // Refresh data
      if (user.role === "faculty") {
        const data = attendanceService.getFacultyCourseAttendance(user.id, selectedCourse);
        setAttendanceData(data);
      } else {
        const data = attendanceService.getStudentCourseAttendance(user.id, selectedCourse);
        setAttendanceData(data);
      }
      
      toast({
        title: "Success",
        description: "Attendance record deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting attendance:", error);
      toast({
        title: "Error",
        description: "Failed to delete attendance record. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Get course statistics
  const getStatistics = () => {
    if (!attendanceData || !attendanceData.records) return { total: 0, present: 0, absent: 0, percentage: 0 };
    
    const records = attendanceData.records;
    const total = records.length;
    const present = records.filter((record: AttendanceRecord) => record.status === "present").length;
    const absent = total - present;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { total, present, absent, percentage };
  };

  // Format chart data for student view
  const getChartData = () => {
    const stats = getStatistics();
    return [
      { name: "Present", value: stats.present, color: "#22c55e" },
      { name: "Absent", value: stats.absent, color: "#ef4444" },
    ];
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Get status color for badge
  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "bg-campus-success text-campus-success bg-opacity-10";
    if (percentage >= 75) return "bg-campus-primary text-campus-primary bg-opacity-10";
    if (percentage >= 60) return "bg-campus-warning text-campus-warning bg-opacity-10";
    return "bg-campus-danger text-campus-danger bg-opacity-10";
  };

  // Get status text
  const getStatusText = (percentage: number) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "Good";
    if (percentage >= 60) return "Warning";
    return "Critical";
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>
      
      {/* Course Selector */}
      {courses.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
              <CardTitle>Select Course</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedCourse}
              onValueChange={setSelectedCourse}
            >
              <SelectTrigger className="w-full sm:w-72">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}
      
      {selectedCourse && attendanceData ? (
        <>
          {/* Role-based attendance view */}
          {user?.role === "student" ? (
            /* Student View */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center">
                    <UserCheck className="mr-2 h-5 w-5 text-muted-foreground" />
                    <CardTitle>Your Attendance for {attendanceData.course.code}</CardTitle>
                  </div>
                  <CardDescription>{attendanceData.course.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-bold">{getStatistics().percentage}%</span>
                    <span className="text-gray-500 pb-1">attendance rate</span>
                  </div>
                  <Progress value={getStatistics().percentage} className="h-2" />
                  
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Total Classes</p>
                      <p className="text-xl font-medium">{getStatistics().total}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Present</p>
                      <p className="text-xl font-medium text-campus-success">{getStatistics().present}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Absent</p>
                      <p className="text-xl font-medium text-campus-danger">{getStatistics().absent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <CalendarCheck className="mr-2 h-5 w-5 text-muted-foreground" />
                    <CardTitle>Attendance Summary</CardTitle>
                  </div>
                  <CardDescription>Present vs Absent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getChartData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {getChartData().map((entry, index) => (
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
                <CardFooter className="border-t px-6 py-4">
                  <Badge className={getStatusColor(getStatistics().percentage)}>
                    {getStatusText(getStatistics().percentage)}
                  </Badge>
                </CardFooter>
              </Card>
              
              <Card className="md:col-span-3">
                <CardHeader>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                    <CardTitle>Attendance Records</CardTitle>
                  </div>
                  <CardDescription>Your attendance history for this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceData.records.sort((a: AttendanceRecord, b: AttendanceRecord) => 
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                      ).map((record: AttendanceRecord) => (
                        <TableRow key={record.id}>
                          <TableCell>{formatDate(record.date)}</TableCell>
                          <TableCell>
                            {isEditing === record.id ? (
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateAttendance(record.id, "present")}
                                  className="text-campus-success hover:text-campus-success hover:border-campus-success"
                                >
                                  <Check className="mr-1 h-4 w-4" />
                                  Present
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateAttendance(record.id, "absent")}
                                  className="text-campus-danger hover:text-campus-danger hover:border-campus-danger"
                                >
                                  <X className="mr-1 h-4 w-4" />
                                  Absent
                                </Button>
                              </div>
                            ) : (
                              <Badge className={record.status === "present" 
                                ? "bg-campus-success text-white" 
                                : "bg-campus-danger text-white"
                              }>
                                {record.status === "present" 
                                  ? <Check className="mr-1 h-3 w-3" /> 
                                  : <X className="mr-1 h-3 w-3" />
                                }
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {isEditing === record.id ? (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setIsEditing(null)}
                              >
                                Cancel
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsEditing(record.id)}
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Faculty View */
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <UserCheck className="mr-2 h-5 w-5 text-muted-foreground" />
                    <CardTitle>Attendance Management for {attendanceData.course.code}</CardTitle>
                  </div>
                  <CardDescription>{attendanceData.course.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Manage attendance records for all students enrolled in this course. 
                    Click on a date to expand and view/edit individual student attendance.
                  </p>
                  
                  <div className="space-y-4">
                    {attendanceData.dates.map((date: string) => (
                      <Card key={date} className="border border-gray-200">
                        <CardHeader className="py-3 cursor-pointer" onClick={() => toggleDateExpansion(date)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                              <CardTitle className="text-base">{formatDate(date)}</CardTitle>
                            </div>
                            {expandedDates[date] ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </CardHeader>
                        
                        {expandedDates[date] && (
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Student</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {attendanceData.students.map((student: any) => {
                                  const record = attendanceData.attendanceByDate[date]?.[student.id];
                                  
                                  return (
                                    <TableRow key={`${date}-${student.id}`}>
                                      <TableCell>{student.name}</TableCell>
                                      <TableCell>
                                        {record ? (
                                          isEditing === record.id ? (
                                            <div className="flex space-x-2">
                                              <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleUpdateAttendance(record.id, "present")}
                                                className="text-campus-success hover:text-campus-success hover:border-campus-success"
                                              >
                                                <Check className="mr-1 h-4 w-4" />
                                                Present
                                              </Button>
                                              <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleUpdateAttendance(record.id, "absent")}
                                                className="text-campus-danger hover:text-campus-danger hover:border-campus-danger"
                                              >
                                                <X className="mr-1 h-4 w-4" />
                                                Absent
                                              </Button>
                                            </div>
                                          ) : (
                                            <Badge className={record.status === "present" 
                                              ? "bg-campus-success text-white" 
                                              : "bg-campus-danger text-white"
                                            }>
                                              {record.status === "present" 
                                                ? <Check className="mr-1 h-3 w-3" /> 
                                                : <X className="mr-1 h-3 w-3" />
                                              }
                                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                            </Badge>
                                          )
                                        ) : (
                                          <div className="flex space-x-2">
                                            <Button 
                                              variant="outline" 
                                              size="sm"
                                              onClick={() => handleMarkAttendance(student.id, date, "present")}
                                              className="text-campus-success hover:text-campus-success hover:border-campus-success"
                                            >
                                              <Check className="mr-1 h-4 w-4" />
                                              Present
                                            </Button>
                                            <Button 
                                              variant="outline" 
                                              size="sm"
                                              onClick={() => handleMarkAttendance(student.id, date, "absent")}
                                              className="text-campus-danger hover:text-campus-danger hover:border-campus-danger"
                                            >
                                              <X className="mr-1 h-4 w-4" />
                                              Absent
                                            </Button>
                                          </div>
                                        )}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        {record && (
                                          <div className="flex justify-end space-x-1">
                                            {isEditing === record.id ? (
                                              <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => setIsEditing(null)}
                                              >
                                                Cancel
                                              </Button>
                                            ) : (
                                              <>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={() => setIsEditing(record.id)}
                                                  className="h-8 w-8"
                                                >
                                                  <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={() => handleDeleteAttendance(record.id)}
                                                  className="h-8 w-8 text-campus-danger"
                                                >
                                                  <Trash2 className="h-4 w-4" />
                                                </Button>
                                              </>
                                            )}
                                          </div>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="pt-6 pb-6 text-center">
            <div className="py-8">
              <h3 className="text-lg font-medium mb-2">No Attendance Data Available</h3>
              <p className="text-gray-500">
                {courses.length === 0 
                  ? "You haven't enrolled in any courses yet. Enroll in courses to track attendance."
                  : "Please select a course to view attendance data."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Attendance;
