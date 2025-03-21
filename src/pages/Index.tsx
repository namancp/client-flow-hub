
import React, { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AccountsOverview } from '@/components/AccountsOverview';
import { DocumentCenter } from '@/components/DocumentCenter';
import { InvestmentPortfolio } from '@/components/InvestmentPortfolio';
import { FinancialPlanning } from '@/components/FinancialPlanning';
import { InsuranceCards } from '@/components/InsuranceCards';
import { LoanManagement } from '@/components/LoanManagement';
import { CashFlow } from '@/components/CashFlow';
import { TransferFunds } from '@/components/TransferFunds';
import { TaxPlanning } from '@/components/TaxPlanning';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  ClipboardList,
  Shield,
  BanknoteIcon,
  ArrowRightLeft,
  Receipt,
  BellRing,
  User,
  Calendar,
  CircleDollarSign,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const performanceData = [
  { date: 'Jan', assets: 750000 },
  { date: 'Feb', assets: 758000 },
  { date: 'Mar', assets: 765000 },
  { date: 'Apr', assets: 771000 },
  { date: 'May', assets: 779000 },
  { date: 'Jun', assets: 782000 },
  { date: 'Jul', assets: 790000 },
  { date: 'Aug', assets: 795000 },
  { date: 'Sep', assets: 798000 },
  { date: 'Oct', assets: 810000 },
  { date: 'Nov', assets: 825000 },
  { date: 'Dec', assets: 834000 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm border border-gray-100 p-3 rounded-md shadow-sm">
          <p className="text-sm font-medium">{payload[0].payload.date}</p>
          <p className="text-sm text-primary">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const WelcomeHeader = () => (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Welcome back</p>
          <h1 className="text-3xl font-bold tracking-tight">Jane Doe</h1>
        </div>
        <div className="flex items-center mt-4 sm:mt-0 space-x-2">
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="h-4 w-4 mr-2" />
            December 01, 2023
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 relative">
            <BellRing className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
          </Button>
          <Avatar className="h-9 w-9 border">
            <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );

  const OverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
      <Card className="md:col-span-8 border overflow-hidden dashboard-item">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Total Net Worth</h3>
                <p className="text-3xl font-bold">{formatCurrency(834000)}</p>
                <p className="text-sm text-financial-positive flex items-center">
                  <span className="inline-block mr-1">↑</span> 11.2% from last year
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Tabs defaultValue="1y" className="w-[260px]">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="1m">1M</TabsTrigger>
                    <TabsTrigger value="3m">3M</TabsTrigger>
                    <TabsTrigger value="6m">6M</TabsTrigger>
                    <TabsTrigger value="1y">1Y</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency} 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="assets" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorAssets)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-4 space-y-6">
        <Card className="border dashboard-item shine-effect overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Next Meeting</p>
                <h3 className="text-lg font-semibold">Annual Review</h3>
                <p className="text-sm mt-1">Dec 15, 2023 • 2:00 PM</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline" size="sm">
              Join Meeting
            </Button>
          </CardContent>
        </Card>

        <Card className="border dashboard-item shine-effect">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Financial Advisor</p>
                <h3 className="text-lg font-semibold">John Smith</h3>
                <p className="text-sm mt-1">Available for call</p>
              </div>
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="https://i.pravatar.cc/101" alt="Advisor" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button className="flex-1" variant="outline" size="sm">
                Message
              </Button>
              <Button className="flex-1" size="sm">
                Call
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="balance-card dashboard-item shine-effect">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Monthly Budget</p>
                <h3 className="text-lg font-semibold">Remaining</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(3450)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <CircleDollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-sm text-white/80">
                <span>Progress</span>
                <span>42%</span>
              </div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <WelcomeHeader />
      
      <OverviewCards />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="overflow-auto pb-2">
          <TabsList className="inline-flex h-9 lg:h-10 bg-muted/30">
            <TabsTrigger value="overview" className="flex items-center">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center">
              <BanknoteIcon className="h-4 w-4 mr-2" />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="investments" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Investments
            </TabsTrigger>
            <TabsTrigger value="planning" className="flex items-center">
              <ClipboardList className="h-4 w-4 mr-2" />
              Planning
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Insurance
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex items-center">
              <BanknoteIcon className="h-4 w-4 mr-2" />
              Loans
            </TabsTrigger>
            <TabsTrigger value="cash" className="flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-2" />
              Cash
            </TabsTrigger>
            <TabsTrigger value="transfers" className="flex items-center">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Transfers
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center">
              <Receipt className="h-4 w-4 mr-2" />
              Tax
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <AccountsOverview />
          <Separator className="my-8" />
          <InvestmentPortfolio />
          <Separator className="my-8" />
          <FinancialPlanning />
        </TabsContent>
        
        <TabsContent value="accounts" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Accounts Management</h2>
              <p className="text-muted-foreground">View and manage all your linked financial accounts in one place</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Link New Account</h3>
                      <p className="text-sm text-muted-foreground mt-1">Connect your external financial accounts</p>
                    </div>
                    <BanknoteIcon className="h-6 w-6 text-primary" />
                  </div>
                  <Button className="mt-4 w-full">Connect Account</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Account Statements</h3>
                      <p className="text-sm text-muted-foreground mt-1">Download and view recent statements</p>
                    </div>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View Statements</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Account Security</h3>
                      <p className="text-sm text-muted-foreground mt-1">Manage account access and settings</p>
                    </div>
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Security Settings</Button>
                </CardContent>
              </Card>
            </div>
            <AccountsOverview />
          </div>
        </TabsContent>
        
        <TabsContent value="investments" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Investment Portfolio</h2>
              <p className="text-muted-foreground">Track performance and manage your investment assets across markets</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Performance Analysis</h3>
                      <p className="text-sm text-muted-foreground mt-1">Review detailed performance metrics</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <Button className="mt-4 w-full">Analyze Portfolio</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Rebalance Portfolio</h3>
                      <p className="text-sm text-muted-foreground mt-1">Adjust your asset allocation</p>
                    </div>
                    <ArrowRightLeft className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Rebalance</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Tax Efficiency</h3>
                      <p className="text-sm text-muted-foreground mt-1">Optimize for tax-efficient investing</p>
                    </div>
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Optimize</Button>
                </CardContent>
              </Card>
            </div>
            <InvestmentPortfolio />
          </div>
        </TabsContent>
        
        <TabsContent value="planning" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Financial Planning</h2>
              <p className="text-muted-foreground">Set goals, track progress, and plan your financial future with confidence</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Goal Setting</h3>
                      <p className="text-sm text-muted-foreground mt-1">Create and manage financial goals</p>
                    </div>
                    <ClipboardList className="h-6 w-6 text-primary" />
                  </div>
                  <Button className="mt-4 w-full">Set New Goal</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Retirement Planning</h3>
                      <p className="text-sm text-muted-foreground mt-1">Prepare for your retirement</p>
                    </div>
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Plan Retirement</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Estate Planning</h3>
                      <p className="text-sm text-muted-foreground mt-1">Organize your estate and legacy</p>
                    </div>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Estate Tools</Button>
                </CardContent>
              </Card>
            </div>
            <FinancialPlanning />
          </div>
        </TabsContent>
        
        <TabsContent value="insurance" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Insurance Protection</h2>
              <p className="text-muted-foreground">Manage your insurance policies and ensure comprehensive coverage</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Life Insurance</h3>
                      <p className="text-sm text-muted-foreground mt-1">Term & permanent policies</p>
                    </div>
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View Policies</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Health Insurance</h3>
                      <p className="text-sm text-muted-foreground mt-1">Medical coverage details</p>
                    </div>
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View Coverage</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Property Insurance</h3>
                      <p className="text-sm text-muted-foreground mt-1">Home & auto protection</p>
                    </div>
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View Policies</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Add Insurance</h3>
                      <p className="text-sm text-muted-foreground mt-1">Link new policy</p>
                    </div>
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <Button className="mt-4 w-full">Add Policy</Button>
                </CardContent>
              </Card>
            </div>
            <InsuranceCards />
          </div>
        </TabsContent>
        
        <TabsContent value="loans" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Loan Management</h2>
              <p className="text-muted-foreground">Track and manage your loans, mortgages, and credit facilities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Mortgage Calculator</h3>
                      <p className="text-sm text-muted-foreground mt-1">Calculate payments and scenarios</p>
                    </div>
                    <BanknoteIcon className="h-6 w-6 text-primary" />
                  </div>
                  <Button className="mt-4 w-full">Calculate</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Refinancing Options</h3>
                      <p className="text-sm text-muted-foreground mt-1">Explore better rates & terms</p>
                    </div>
                    <ArrowRightLeft className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View Options</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Credit Analysis</h3>
                      <p className="text-sm text-muted-foreground mt-1">Review your credit standing</p>
                    </div>
                    <ClipboardList className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Analyze Credit</Button>
                </CardContent>
              </Card>
            </div>
            <LoanManagement />
          </div>
        </TabsContent>
        
        <TabsContent value="cash" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Cash Management</h2>
              <p className="text-muted-foreground">Monitor cash flow, track expenses, and manage your liquid assets</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Budgeting Tools</h3>
                      <p className="text-sm text-muted-foreground mt-1">Create and manage your budget</p>
                    </div>
                    <CircleDollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <Button className="mt-4 w-full">Budget Planner</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Expense Tracking</h3>
                      <p className="text-sm text-muted-foreground mt-1">Monitor your spending patterns</p>
                    </div>
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Track Expenses</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Liquidity Analysis</h3>
                      <p className="text-sm text-muted-foreground mt-1">Assess your liquid assets</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Analyze</Button>
                </CardContent>
              </Card>
            </div>
            <CashFlow />
          </div>
        </TabsContent>
        
        <TabsContent value="transfers" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Fund Transfers</h2>
              <p className="text-muted-foreground">Send and receive funds securely between your accounts and external destinations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">New Transfer</h3>
                      <p className="text-sm text-muted-foreground mt-1">Move funds between accounts</p>
                    </div>
                    <ArrowRightLeft className="h-6 w-6 text-primary" />
                  </div>
                  <Button className="mt-4 w-full">Transfer Funds</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Scheduled Transfers</h3>
                      <p className="text-sm text-muted-foreground mt-1">Manage recurring transfers</p>
                    </div>
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View Schedule</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Transfer History</h3>
                      <p className="text-sm text-muted-foreground mt-1">Review past transactions</p>
                    </div>
                    <ClipboardList className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View History</Button>
                </CardContent>
              </Card>
            </div>
            <TransferFunds />
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Document Center</h2>
              <p className="text-muted-foreground">Store, organize, and securely share your important financial documents</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Upload Document</h3>
                      <p className="text-sm text-muted-foreground mt-1">Add files to your vault</p>
                    </div>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Button className="mt-4 w-full">Upload</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Shared Documents</h3>
                      <p className="text-sm text-muted-foreground mt-1">Manage shared access</p>
                    </div>
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Manage Sharing</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Tax Documents</h3>
                      <p className="text-sm text-muted-foreground mt-1">Access tax-related files</p>
                    </div>
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View Tax Docs</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Create Folder</h3>
                      <p className="text-sm text-muted-foreground mt-1">Organize your documents</p>
                    </div>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">New Folder</Button>
                </CardContent>
              </Card>
            </div>
            <DocumentCenter />
          </div>
        </TabsContent>
        
        <TabsContent value="tax" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Tax Planning</h2>
              <p className="text-muted-foreground">Organize tax documents, plan for tax events, and maximize your tax efficiency</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Tax Projection</h3>
                      <p className="text-sm text-muted-foreground mt-1">Estimate upcoming tax liability</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <Button className="mt-4 w-full">Project Taxes</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Tax-Loss Harvesting</h3>
                      <p className="text-sm text-muted-foreground mt-1">Optimize investment tax efficiency</p>
                    </div>
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Harvest Losses</Button>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Tax Documents</h3>
                      <p className="text-sm text-muted-foreground mt-1">Access tax forms and statements</p>
                    </div>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full">View Documents</Button>
                </CardContent>
              </Card>
            </div>
            <TaxPlanning />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
