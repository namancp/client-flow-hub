
import React, { createContext, useContext, useEffect } from 'react';
import { useUser } from './UserContext';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  const { profile, setTheme: updateUserTheme } = useUser();
  const [theme, setThemeState] = React.useState(() => {
    // Check user preference first
    if (profile?.theme_preference) {
      return profile.theme_preference;
    }
    
    // Then check localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    
    // Then check user system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Fall back to default
    return defaultTheme;
  });

  const setTheme = (theme: string) => {
    setThemeState(theme);
    localStorage.setItem('theme', theme);
    
    // Update user preference in database if logged in
    if (profile) {
      updateUserTheme(theme);
    }
  };

  useEffect(() => {
    // Apply theme when it changes
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    // Update theme when user profile changes
    if (profile?.theme_preference) {
      setThemeState(profile.theme_preference);
    }
  }, [profile]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
