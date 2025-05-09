
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCircle, CircleDollarSign, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, signIn, signUp } = useUser();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [fullName, setFullName] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!loginEmail || !loginPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await signIn(loginEmail, loginPassword);
    } catch (error) {
      console.error('Login error:', error);
      // Error is handled in the signIn function via toast
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!signupEmail || !signupPassword || !signupConfirm || !fullName) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (signupPassword !== signupConfirm) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (signupPassword.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await signUp(signupEmail, signupPassword, {
        full_name: fullName,
        role: 'customer',
      });
      
      // Automatically switch to login tab after successful signup
      setActiveTab('login');
      setLoginEmail(signupEmail);
    } catch (error) {
      console.error('Signup error:', error);
      // Error is handled in the signUp function via toast
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-r-transparent rounded-full inline-block mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-6 py-4">
        <div className="container flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <CircleDollarSign size={28} className="text-primary" />
            <h1 className="text-xl font-bold">ClientFlow</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6 bg-muted/30">
        <div className="container max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to ClientFlow</CardTitle>
              <CardDescription>
                Sign in to access your financial dashboard
              </CardDescription>
            </CardHeader>
            
            <Tabs 
              defaultValue="login" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mx-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-auto text-xs text-muted-foreground"
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    {formError && (
                      <div className="text-sm text-destructive">{formError}</div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex flex-col gap-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="name@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Create a password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={signupConfirm}
                        onChange={(e) => setSignupConfirm(e.target.value)}
                        required
                      />
                    </div>
                    
                    {formError && (
                      <div className="text-sm text-destructive">{formError}</div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating account..." : "Create account"}
                      <UserCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
}
