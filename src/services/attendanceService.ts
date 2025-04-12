
// Attendance Service - Handles API interactions for the attendance module

// In a real application, these would be actual API calls
// For now, we'll use localStorage to simulate a database

const STORAGE_KEY = "campus_bridge_attendance";

// Types
export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: "present" | "absent";
  markedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
}

// Helper function to initialize sample data if none exists
const initializeAttendanceData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    // Sample courses
    const courses = [
      { id: "1", code: "CS301", name: "Data Structures & Algorithms" },
      { id: "2", code: "CS302", name: "Web Development" },
      { id: "3", code: "CS303", name: "Object Oriented Programming" },
    ];
    
    // Sample students
    const students = [
      { id: "s1", name: "Alex Johnson", email: "alex@example.com" },
      { id: "s2", name: "Samantha Lee", email: "samantha@example.com" },
      { id: "s3", name: "Michael Chen", email: "michael@example.com" },
    ];
    
    // Sample faculty
    const faculty = { id: "f1", name: "Dr. Smith", email: "drsmith@example.com" };
    
    // Generate sample attendance records
    const currentDate = new Date();
    const attendanceRecords: AttendanceRecord[] = [];
    
    // Generate attendance for the last 20 days
    for (let i = 0; i < 20; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // For each course
      courses.forEach(course => {
        // For each student
        students.forEach(student => {
          // 80% chance of being present
          const status = Math.random() > 0.2 ? "present" : "absent";
          attendanceRecords.push({
            id: `attendance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            studentId: student.id,
            courseId: course.id,
            date: date.toISOString().split('T')[0],
            status,
            markedBy: faculty.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        });
      });
    }
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      courses, 
      students, 
      faculty, 
      attendanceRecords 
    }));
  }
};

// Get all records from storage
const getAllRecords = (): { 
  courses: Course[], 
  students: Student[], 
  faculty: any, 
  attendanceRecords: AttendanceRecord[] 
} => {
  initializeAttendanceData();
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
};

// Update records in storage
const updateRecords = (data: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Service methods
export const attendanceService = {
  // Student-side methods
  getStudentAttendance: (studentId: string) => {
    const { attendanceRecords, courses } = getAllRecords();
    
    // Filter records for this student
    const studentRecords = attendanceRecords.filter(
      (record: AttendanceRecord) => record.studentId === studentId
    );
    
    // Group by course
    const groupedByCourse = studentRecords.reduce((acc: any, record: AttendanceRecord) => {
      if (!acc[record.courseId]) {
        const course = courses.find((c: Course) => c.id === record.courseId);
        acc[record.courseId] = {
          course,
          records: []
        };
      }
      
      acc[record.courseId].records.push(record);
      return acc;
    }, {});
    
    return Object.values(groupedByCourse);
  },
  
  getStudentCourseAttendance: (studentId: string, courseId: string) => {
    const { attendanceRecords, courses } = getAllRecords();
    
    // Filter records for this student and course
    const records = attendanceRecords.filter(
      (record: AttendanceRecord) => 
        record.studentId === studentId && record.courseId === courseId
    );
    
    const course = courses.find((c: Course) => c.id === courseId);
    
    return {
      course,
      records
    };
  },
  
  // Faculty-side methods
  getFacultyCourseAttendance: (facultyId: string, courseId: string) => {
    const { attendanceRecords, students, courses } = getAllRecords();
    
    // Get the course
    const course = courses.find((c: Course) => c.id === courseId);
    
    // Group by date and student
    const attendanceByDate: Record<string, Record<string, AttendanceRecord>> = {};
    
    attendanceRecords.filter((record: AttendanceRecord) => record.courseId === courseId)
      .forEach((record: AttendanceRecord) => {
        if (!attendanceByDate[record.date]) {
          attendanceByDate[record.date] = {};
        }
        attendanceByDate[record.date][record.studentId] = record;
      });
    
    // Get all dates in descending order
    const dates = Object.keys(attendanceByDate).sort().reverse();
    
    return {
      course,
      students,
      dates,
      attendanceByDate
    };
  },
  
  markAttendance: (data: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    const allRecords = getAllRecords();
    const { attendanceRecords } = allRecords;
    
    // Check if there's already a record for this student, course, and date
    const existingIndex = attendanceRecords.findIndex(
      (record: AttendanceRecord) => 
        record.studentId === data.studentId &&
        record.courseId === data.courseId &&
        record.date === data.date
    );
    
    // Create new record
    const newRecord: AttendanceRecord = {
      id: `attendance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Replace if exists, otherwise add
    if (existingIndex >= 0) {
      attendanceRecords[existingIndex] = newRecord;
    } else {
      attendanceRecords.push(newRecord);
    }
    
    // Update storage
    updateRecords(allRecords);
    
    return newRecord;
  },
  
  updateAttendance: (attendanceId: string, newStatus: "present" | "absent") => {
    const allRecords = getAllRecords();
    const { attendanceRecords } = allRecords;
    
    // Find the record
    const index = attendanceRecords.findIndex(
      (record: AttendanceRecord) => record.id === attendanceId
    );
    
    if (index >= 0) {
      // Update the record
      attendanceRecords[index] = {
        ...attendanceRecords[index],
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      
      // Update storage
      updateRecords(allRecords);
      return attendanceRecords[index];
    }
    
    return null;
  },
  
  deleteAttendance: (attendanceId: string) => {
    const allRecords = getAllRecords();
    const { attendanceRecords } = allRecords;
    
    // Filter out the record
    const updatedRecords = attendanceRecords.filter(
      (record: AttendanceRecord) => record.id !== attendanceId
    );
    
    // Update storage
    updateRecords({
      ...allRecords,
      attendanceRecords: updatedRecords
    });
    
    return true;
  },
  
  // Helper methods
  getCourses: () => {
    const { courses } = getAllRecords();
    return courses;
  },
  
  getStudents: () => {
    const { students } = getAllRecords();
    return students;
  }
};
