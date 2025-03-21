
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    // Could return a loading spinner here
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/accounts" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/investments" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/plans" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/insurance" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/loans" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/cash" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/transfers" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/documents" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/tax" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
