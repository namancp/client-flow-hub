
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/hooks/use-toast';
import { UserData } from '@/types/supabase';

export type UserProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  role: 'customer' | 'advisor';
  avatar_url: string | null;
  location: string | null;
  linkedin_url: string | null;
  bio: string | null;
  theme_preference: string | null;
  created_at: string;
};

export type UserContextType = {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  setTheme: (theme: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Clean up auth state to prevent issues
  const cleanUpAuthState = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Also clean sessionStorage if used
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  // Fetch user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      if (data) setProfile(data as UserData as UserProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Setup auth state listener
  useEffect(() => {
    // First set up the auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        if (currentUser && event === 'SIGNED_IN') {
          // Use setTimeout to avoid potential deadlocks
          setTimeout(() => {
            fetchUserProfile(currentUser.id);
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    const initializeUser = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);
        
        if (currentUser) {
          await fetchUserProfile(currentUser.id);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in function - modified to return void
  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Clean up auth state first
      cleanUpAuthState();
      
      // Attempt to sign out from any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function - modified to return void
  const signUp = async (email: string, password: string, userData: Partial<UserProfile>): Promise<void> => {
    setIsLoading(true);
    try {
      // Clean up auth state
      cleanUpAuthState();
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            role: userData.role || 'customer',
            avatar_url: userData.avatar_url
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "You have successfully signed up.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "Please try again with different credentials.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      // Clean up auth state
      cleanUpAuthState();
      
      await supabase.auth.signOut({ scope: 'global' });
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      
      // Force page reload for a clean state
      window.location.href = '/login';
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "Please try again.",
      });
    }
  };

  // Update profile function
  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from('users')
        .update(updates as any)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state with new profile data
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "Failed to update profile.",
      });
      throw error;
    }
  };

  // Set theme preference
  const setTheme = async (theme: string) => {
    if (!user || !profile) return;
    
    try {
      await updateProfile({ theme_preference: theme });
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  const value: UserContextType = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    updateProfile,
    setTheme,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
