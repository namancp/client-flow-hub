
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'advisor' | 'admin';
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // This simulates checking for a stored token and validating it
    const checkAuth = async () => {
      try {
        // In a real implementation, you would verify the JWT token here
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // This simulates an API call to authenticate
      // In a real implementation, you would make an API request to your backend
      
      // Simulate a successful login with a mock user
      const mockUser: User = {
        id: '1',
        name: 'Jane Doe',
        email: email,
        role: 'client'
      };
      
      // Store user in localStorage (in a real app, you'd store the JWT token)
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Login successful",
        description: "Welcome back to your dashboard.",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      // Simulate Google authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate a successful login with Google
      const mockGoogleUser: User = {
        id: '2',
        name: 'John Google',
        email: 'john.google@gmail.com',
        role: 'client',
        photoUrl: 'https://i.pravatar.cc/150?img=68'
      };
      
      localStorage.setItem('user', JSON.stringify(mockGoogleUser));
      setUser(mockGoogleUser);
      
      toast({
        title: "Google login successful",
        description: "Welcome to your dashboard.",
      });
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: "Failed to authenticate with Google. Please try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
