
import React, { useState } from 'react';
import { AccountsOverview } from '@/components/AccountsOverview';
import { InvestmentPortfolio } from '@/components/InvestmentPortfolio';
import { FinancialPlanning } from '@/components/FinancialPlanning';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
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

const currentDate = new Date();
const nextDate = new Date(currentDate);
nextDate.setDate(nextDate.getDate() + 1);
const formatDate = (date) => {
  const optionsDate = { month: 'short', day: '2-digit', year: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };

  const formattedDate = date.toLocaleDateString('en-US', optionsDate);
  const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

  return `${formattedDate.replace(',', '')} • ${formattedTime}`;
};

const Index = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Mohan Singh</h1>
        </div>
        <div className="flex items-center mt-4 sm:mt-0 space-x-2">
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="h-4 w-4 mr-2" />
            Current Date: {formatDate(currentDate)}
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
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">1M</Button>
                  <Button variant="outline" size="sm">3M</Button>
                  <Button variant="outline" size="sm">6M</Button>
                  <Button variant="outline" size="sm" className="bg-muted">1Y</Button>
                  <Button variant="outline" size="sm">All</Button>
                </div>
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
                <p className="text-sm mt-1">Next Date: {formatDate(nextDate)}</p>
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
    <>
      <WelcomeHeader />
      
      <OverviewCards />
      
      <div className="space-y-8">
        <AccountsOverview />
        <Separator className="my-8" />
        <InvestmentPortfolio />
        <Separator className="my-8" />
        <FinancialPlanning />
      </div>
    </>
  );
};

export default Index;
