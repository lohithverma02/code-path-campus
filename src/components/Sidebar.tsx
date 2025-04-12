import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Code, 
  PieChart, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  Users,
  Clock,
  ClipboardList,
  BookCheck,
  GraduationCap,
  Bot,
  FileJson
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [academicExpanded, setAcademicExpanded] = useState(true);
  const [codingExpanded, setCodingExpanded] = useState(false);
  const [aiExpanded, setAiExpanded] = useState(false);
  const [developerExpanded, setDeveloperExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    <aside className="bg-sidebar w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center">
          <BookOpen className="h-6 w-6 text-campus-primary" />
          <div className="ml-2">
            <h1 className="text-white font-semibold text-lg">Campus Bridge</h1>
            <p className="text-sidebar-foreground text-xs">Student Portal</p>
          </div>
        </Link>
      </div>

      {/* Profile */}
      <div className="p-5 border-b border-sidebar-border flex items-center">
        <div className="w-10 h-10 rounded-full bg-campus-primary flex items-center justify-center text-white font-medium">
          JS
        </div>
        <div className="ml-3">
          <p className="text-white font-medium">John Smith</p>
          <p className="text-xs text-sidebar-foreground">ID: ST12345</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {/* Academic Section */}
        <div>
          <button 
            onClick={() => setAcademicExpanded(!academicExpanded)}
            className="w-full nav-item"
          >
            <BookOpen size={18} />
            <span className="flex-1 text-left">Academic</span>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${academicExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {academicExpanded && (
            <div className="ml-7 mt-2 space-y-1">
              <Link 
                to="/dashboard" 
                className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                <PieChart size={16} />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/courses" 
                className={`nav-item ${location.pathname === '/courses' ? 'active' : ''}`}
              >
                <BookCheck size={16} />
                <span>Courses</span>
              </Link>
              <Link 
                to="/attendance" 
                className={`nav-item ${location.pathname === '/attendance' ? 'active' : ''}`}
              >
                <Clock size={16} />
                <span>Attendance</span>
              </Link>
              <Link 
                to="/assignments" 
                className={`nav-item ${location.pathname === '/assignments' ? 'active' : ''}`}
              >
                <ClipboardList size={16} />
                <span>Assignments</span>
              </Link>
              <Link 
                to="/grades" 
                className={`nav-item ${location.pathname === '/grades' ? 'active' : ''}`}
              >
                <GraduationCap size={16} />
                <span>Grades</span>
              </Link>
            </div>
          )}
        </div>
        
        {/* Coding Section */}
        <div>
          <button 
            onClick={() => setCodingExpanded(!codingExpanded)}
            className="w-full nav-item"
          >
            <Code size={18} />
            <span className="flex-1 text-left">Coding</span>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${codingExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {codingExpanded && (
            <div className="ml-7 mt-2 space-y-1">
              <Link 
                to="/learning-paths" 
                className={`nav-item ${location.pathname === '/learning-paths' ? 'active' : ''}`}
              >
                <span>Learning Paths</span>
              </Link>
              <Link 
                to="/practice" 
                className={`nav-item ${location.pathname === '/practice' ? 'active' : ''}`}
              >
                <span>Practice</span>
              </Link>
              <Link 
                to="/code-editor" 
                className={`nav-item ${location.pathname === '/code-editor' ? 'active' : ''}`}
              >
                <span>Code Editor</span>
              </Link>
              <Link 
                to="/daily-tasks" 
                className={`nav-item ${location.pathname === '/daily-tasks' ? 'active' : ''}`}
              >
                <span>Daily Tasks</span>
              </Link>
            </div>
          )}
        </div>
        
        {/* AI Assistant */}
        <div>
          <button 
            onClick={() => setAiExpanded(!aiExpanded)}
            className="w-full nav-item"
          >
            <Bot size={18} />
            <span className="flex-1 text-left">AI Assistant</span>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${aiExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {aiExpanded && (
            <div className="ml-7 mt-2 space-y-1">
              <Link 
                to="/code-hints" 
                className={`nav-item ${location.pathname === '/code-hints' ? 'active' : ''}`}
              >
                <span>Code Hints</span>
              </Link>
              <Link 
                to="/code-rooms" 
                className={`nav-item ${location.pathname === '/code-rooms' ? 'active' : ''}`}
              >
                <span>Code Rooms</span>
              </Link>
              <Link 
                to="/job-matcher" 
                className={`nav-item ${location.pathname === '/job-matcher' ? 'active' : ''}`}
              >
                <span>Job Matcher</span>
              </Link>
              <Link 
                to="/code-review" 
                className={`nav-item ${location.pathname === '/code-review' ? 'active' : ''}`}
              >
                <span>Code Review</span>
              </Link>
            </div>
          )}
        </div>
        
        {/* Developer Section */}
        <div>
          <button 
            onClick={() => setDeveloperExpanded(!developerExpanded)}
            className="w-full nav-item"
          >
            <FileJson size={18} />
            <span className="flex-1 text-left">Developer</span>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${developerExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {developerExpanded && (
            <div className="ml-7 mt-2 space-y-1">
              <Link 
                to="/api" 
                className={`nav-item ${location.pathname === '/api' ? 'active' : ''}`}
              >
                <span>API Documentation</span>
              </Link>
            </div>
          )}
        </div>
        
        {/* Other Nav Items */}
        <Link to="/settings" className="nav-item">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
        
        <Link to="/help" className="nav-item">
          <HelpCircle size={18} />
          <span>Help & Support</span>
        </Link>
      </nav>
      
      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button onClick={handleLogout} className="w-full nav-item text-campus-danger hover:bg-campus-danger/10">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
