
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUser, UserContextType } from './UserContext';

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
  updateUserProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a compatibility wrapper that uses the new UserContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userContext = useUser();
  const [compatUser, setCompatUser] = useState<User | null>(null);
  
  // Convert the UserContext user to the old format expected by components
  useEffect(() => {
    if (userContext?.user && userContext?.profile) {
      setCompatUser({
        id: userContext.user.id,
        name: userContext.profile.full_name || '',
        email: userContext.user.email || '',
        role: userContext.profile.role === 'advisor' ? 'advisor' : 'client',
        photoUrl: userContext.profile.avatar_url || undefined
      });
    } else {
      setCompatUser(null);
    }
  }, [userContext?.user, userContext?.profile]);
  
  // These are compatibility methods that will call the actual methods from UserContext
  const login = async (email: string, password: string) => {
    if (userContext?.signIn) {
      await userContext.signIn(email, password);
    }
  };
  
  const loginWithGoogle = async () => {
    // Not implemented in the new context, but kept for compatibility
    throw new Error('Google login not supported in this version');
  };
  
  const logout = () => {
    if (userContext?.signOut) {
      userContext.signOut();
    }
  };
  
  const updateUserProfile = (userData: Partial<User>) => {
    if (userContext?.updateProfile) {
      userContext.updateProfile({
        full_name: userData.name,
        // Add other fields as needed
      });
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user: compatUser, 
      isAuthenticated: userContext?.isAuthenticated || false, 
      isLoading: userContext?.isLoading || false, 
      login, 
      loginWithGoogle, 
      logout,
      updateUserProfile 
    }}>
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
