
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
  updateUserProfile: (userData: Partial<User>) => void;
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

  const updateUserProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // This simulates an API call to authenticate
      // In a real implementation, you would make an API request to your backend
      
      // Simulate a successful login with a mock user
      const mockUser: User = {
        id: '1',
        name: 'Sakshi Chhapolia',
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

  const simulateGoogleAuthFlow = (): Promise<User> => {
    return new Promise((resolve) => {
      // Simulate the Google authentication popup window
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popupWindow = window.open(
        'about:blank',
        'Google Sign In',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
      );
      
      if (popupWindow) {
        popupWindow.document.write(`
          <html>
            <head>
              <title>Google Sign In</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
                .container { max-width: 400px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h2 { color: #4285F4; }
                .account { padding: 12px; margin: 10px 0; border: 1px solid #e0e0e0; border-radius: 4px; cursor: pointer; display: flex; align-items: center; }
                .account:hover { background-color: #f9f9f9; }
                .avatar { width: 40px; height: 40px; border-radius: 50%; margin-right: 12px; }
                .google-logo { display: block; width: 100px; margin: 0 auto 20px; }
                .close-btn { margin-top: 20px; background: #f1f1f1; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
                .close-btn:hover { background: #e0e0e0; }
                .permission { margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 15px; }
                .permission p { font-size: 14px; color: #666; }
                .permission ul { font-size: 13px; color: #666; }
                .btn-continue { background: #4285F4; color: white; border: none; padding: 10px 16px; border-radius: 4px; cursor: pointer; display: block; width: 100%; margin-top: 15px; font-weight: bold; }
                .btn-continue:hover { background: #3b78e7; }
              </style>
            </head>
            <body>
              <div class="container">
                <img class="google-logo" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google">
                <h2>Choose an account</h2>
                <p>to continue to ClientFlow Financial Dashboard</p>
                
                <div class="account" id="account1">
                  <img class="avatar" src="https://i.pravatar.cc/150?img=68" alt="Sakshi Chhapolia">
                  <div>
                    <strong>Sakshi Chhapolia</strong><br>
                    <small>Sakshi.Chhapolia@gmail.com</small>
                  </div>
                </div>
                
                
                <button class="close-btn" id="closeBtn">Use another account</button>
                
                <div class="permission" id="permissionScreen" style="display: none;">
                  <h3>ClientFlow wants to access your Google Account</h3>
                  <p>This will allow ClientFlow to:</p>
                  <ul>
                    <li>See your name, email address, and profile picture</li>
                    <li>See your gender and birthdate</li>
                    <li>See your contacts</li>
                  </ul>
                  <p>Make sure you trust ClientFlow</p>
                  <button class="btn-continue" id="continueBtn">Continue as <span id="selectedName"></span></button>
                </div>
              </div>
              
              <script>
                let selectedUser = null;
                let selectedName = "";
                let selectedEmail = "";
                let selectedPhoto = "";
                
                document.getElementById('account1').addEventListener('click', function() {
                  selectedUser = 1;
                  selectedName = "Sakshi Chhapolia";
                  selectedEmail = "Sakshi.Chhapolia@gmail.com";
                  selectedPhoto = "https://i.pravatar.cc/150?img=68";
                  showPermissions();
                });
                
                function showPermissions() {
                  document.getElementById('permissionScreen').style.display = 'block';
                  document.getElementById('selectedName').textContent = selectedName;
                }
                
                document.getElementById('continueBtn').addEventListener('click', function() {
                  window.opener.postMessage({ 
                    type: 'GOOGLE_AUTH_SUCCESS', 
                    user: {
                      id: 'google_' + selectedUser,
                      name: selectedName,
                      email: selectedEmail,
                      photoUrl: selectedPhoto
                    }
                  }, '*');
                  window.close();
                });
                
                document.getElementById('closeBtn').addEventListener('click', function() {
                  window.opener.postMessage({ type: 'GOOGLE_AUTH_CANCELLED' }, '*');
                  window.close();
                });
              </script>
            </body>
          </html>
        `);
      }
      
      // Listen for the message from the popup
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          window.removeEventListener('message', messageHandler);
          resolve(event.data.user);
        } else if (event.data.type === 'GOOGLE_AUTH_CANCELLED') {
          window.removeEventListener('message', messageHandler);
          throw new Error('Google authentication cancelled');
        }
      };
      
      window.addEventListener('message', messageHandler);
      
      // Automatically close if user doesn't interact within 2 minutes
      setTimeout(() => {
        if (popupWindow && !popupWindow.closed) {
          popupWindow.close();
          window.removeEventListener('message', messageHandler);
          throw new Error('Google authentication timed out');
        }
      }, 120000); // 2 minutes
    });
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // Use the simulated Google auth flow
      const googleUser = await simulateGoogleAuthFlow();
      
      // Create a user object with the data from Google
      const user: User = {
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        role: 'client',
        photoUrl: googleUser.photoUrl
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      toast({
        title: "Google login successful",
        description: `Welcome, ${googleUser.name}!`,
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
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
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
