
import React, { createContext, useContext, useEffect, useState } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "faculty";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setCurrentUser: (user: User) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  setCurrentUser: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const checkAuth = async () => {
      try {
        const isAuth = localStorage.getItem('isAuthenticated') === 'true';
        
        if (isAuth) {
          // In a real app, you would validate the JWT token here
          // For this demo, we'll just get user data from localStorage
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            // If no user data but authenticated flag is true, something is wrong
            localStorage.removeItem('isAuthenticated');
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API endpoint
    // For this demo, we'll simulate success with hardcoded users
    
    const demoUsers = [
      { id: "s1", name: "Alex Johnson", email: "alex@example.com", role: "student" as const, password: "password" },
      { id: "f1", name: "Dr. Smith", email: "drsmith@example.com", role: "faculty" as const, password: "password" }
    ];
    
    // Find the user
    const user = demoUsers.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Remove password before storing
    const { password: _, ...userWithoutPassword } = user;
    
    // Store in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('authToken', 'mock-jwt-token');
    
    // Update state
    setUser(userWithoutPassword);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Set the current user (useful for testing different roles)
  const setCurrentUser = (newUser: User) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
