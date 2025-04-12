
import { Bell, Search, HelpCircle } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-800">Academic Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] pl-8 rounded-full bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-campus-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="py-3">
                <div>
                  <p className="font-medium">New Assignment Posted</p>
                  <p className="text-sm text-gray-500">Data Structures - Assignment 3 due in 7 days</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3">
                <div>
                  <p className="font-medium">Attendance Warning</p>
                  <p className="text-sm text-gray-500">Your Web Development course attendance is below 75%</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3">
                <div>
                  <p className="font-medium">Grade Released</p>
                  <p className="text-sm text-gray-500">Your Python midterm exam grade has been released</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium text-campus-primary">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Help */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
