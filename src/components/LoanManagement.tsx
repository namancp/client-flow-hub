
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Percent, ArrowRight, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoanData {
  id: string;
  name: string;
  type: 'mortgage' | 'auto' | 'personal' | 'student' | 'business';
  lender: string;
  accountNumber: string;
  originalAmount: number;
  remainingAmount: number;
  interestRate: number;
  monthlyPayment: number;
  nextPaymentDate: string;
  maturityDate: string;
  status: 'current' | 'late' | 'paid';
}

const mockLoans: LoanData[] = [
  {
    id: '1',
    name: 'Home Mortgage',
    type: 'mortgage',
    lender: 'Chase Bank',
    accountNumber: 'MTG1234567',
    originalAmount: 350000,
    remainingAmount: 298750,
    interestRate: 4.25,
    monthlyPayment: 1720.50,
    nextPaymentDate: '2023-12-01',
    maturityDate: '2053-11-01',
    status: 'current'
  },
  {
    id: '2',
    name: 'Car Loan',
    type: 'auto',
    lender: 'Toyota Financial',
    accountNumber: 'AUTO9876543',
    originalAmount: 35000,
    remainingAmount: 18200,
    interestRate: 3.9,
    monthlyPayment: 645.30,
    nextPaymentDate: '2023-12-15',
    maturityDate: '2026-06-15',
    status: 'current'
  },
  {
    id: '3',
    name: 'Student Loan',
    type: 'student',
    lender: 'Sallie Mae',
    accountNumber: 'SL5678901',
    originalAmount: 45000,
    remainingAmount: 12000,
    interestRate: 5.5,
    monthlyPayment: 520.75,
    nextPaymentDate: '2023-12-10',
    maturityDate: '2025-01-10',
    status: 'current'
  },
  {
    id: '4',
    name: 'Personal Loan',
    type: 'personal',
    lender: 'Discover',
    accountNumber: 'PL2468135',
    originalAmount: 15000,
    remainingAmount: 0,
    interestRate: 6.25,
    monthlyPayment: 0,
    nextPaymentDate: '2023-11-01',
    maturityDate: '2023-11-01',
    status: 'paid'
  }
];

export const LoanManagement = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateProgress = (original: number, remaining: number) => {
    return Math.round(((original - remaining) / original) * 100);
  };

  const getStatusBadge = (status: LoanData['status']) => {
    switch (status) {
      case 'current':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Current</Badge>;
      case 'late':
        return <Badge variant="destructive">Late</Badge>;
      case 'paid':
        return <Badge className="bg-financial-positive">Paid</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Loan Management</h2>
          <p className="text-muted-foreground">Track and manage your loans</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Apply for Loan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockLoans.map((loan) => {
          const progress = calculateProgress(loan.originalAmount, loan.remainingAmount);
          
          return (
            <Card 
              key={loan.id} 
              className={cn(
                "overflow-hidden transition-all duration-300 border card-hover",
                loan.status === 'paid' 
                  ? "border-l-financial-positive border-l-4" 
                  : loan.status === 'late'
                  ? "border-l-destructive border-l-4"
                  : "border-l-blue-500 border-l-4"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-medium">{loan.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span>{loan.lender}</span>
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                      <span>#{loan.accountNumber}</span>
                    </CardDescription>
                  </div>
                  {getStatusBadge(loan.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Original</p>
                      <p className="font-medium">{formatCurrency(loan.originalAmount)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Remaining</p>
                      <p className="font-medium">{loan.status === 'paid' ? '$0' : formatCurrency(loan.remainingAmount)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Rate</p>
                      <p className="font-medium flex items-center">
                        <Percent className="h-3.5 w-3.5 mr-0.5" />
                        {loan.interestRate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    {loan.status !== 'paid' && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Repayment Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                    )}
                    <Progress 
                      value={progress} 
                      className={loan.status === 'paid' ? "bg-muted h-2" : "h-2"}
                      indicatorClassName={loan.status === 'paid' ? "bg-financial-positive" : undefined}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    {loan.status !== 'paid' ? (
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{formatCurrency(loan.monthlyPayment)}/month</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Due {formatDate(loan.nextPaymentDate)}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Paid off on {formatDate(loan.maturityDate)}</span>
                    )}
                    
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">
                      <span className="mr-1">Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
