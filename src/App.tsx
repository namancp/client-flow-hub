
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AccountsOverview } from "./components/AccountsOverview";
import { InvestmentPortfolio } from "./components/InvestmentPortfolio";
import { FinancialPlanning } from "./components/FinancialPlanning";
import { InsuranceCards } from "./components/InsuranceCards";
import { LoanManagement } from "./components/LoanManagement";
import { CashFlow } from "./components/CashFlow";
import { TransferFunds } from "./components/TransferFunds";
import { DocumentCenter } from "./components/DocumentCenter";
import { TaxPlanning } from "./components/TaxPlanning";

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

// Dashboard page wrapper component to provide consistent layout
const DashboardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DashboardPage><Index /></DashboardPage>} />
      <Route path="/accounts" element={<DashboardPage><AccountsOverview /></DashboardPage>} />
      <Route path="/investments" element={<DashboardPage><InvestmentPortfolio /></DashboardPage>} />
      <Route path="/plans" element={<DashboardPage><FinancialPlanning /></DashboardPage>} />
      <Route path="/insurance" element={<DashboardPage><InsuranceCards /></DashboardPage>} />
      <Route path="/loans" element={<DashboardPage><LoanManagement /></DashboardPage>} />
      <Route path="/cash" element={<DashboardPage><CashFlow /></DashboardPage>} />
      <Route path="/transfers" element={<DashboardPage><TransferFunds /></DashboardPage>} />
      <Route path="/documents" element={<DashboardPage><DocumentCenter /></DashboardPage>} />
      <Route path="/tax" element={<DashboardPage><TaxPlanning /></DashboardPage>} />
      <Route path="/settings" element={<DashboardPage><div>Settings Page</div></DashboardPage>} />
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
