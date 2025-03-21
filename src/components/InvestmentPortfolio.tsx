
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, PieChart as PieChartIcon, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssetAllocation {
  name: string;
  value: number;
  color: string;
}

interface InvestmentPerformance {
  date: string;
  value: number;
}

const mockPerformanceData: InvestmentPerformance[] = [
  { date: 'Jan', value: 240000 },
  { date: 'Feb', value: 238000 },
  { date: 'Mar', value: 245000 },
  { date: 'Apr', value: 251000 },
  { date: 'May', value: 249000 },
  { date: 'Jun', value: 252000 },
  { date: 'Jul', value: 258000 },
  { date: 'Aug', value: 263000 },
  { date: 'Sep', value: 268000 },
  { date: 'Oct', value: 274000 },
  { date: 'Nov', value: 278000 },
  { date: 'Dec', value: 284000 },
];

const mockAllocationData: AssetAllocation[] = [
  { name: 'Stocks', value: 65, color: '#4F46E5' },
  { name: 'Bonds', value: 20, color: '#10B981' },
  { name: 'Cash', value: 10, color: '#F59E0B' },
  { name: 'Alternatives', value: 5, color: '#EC4899' },
];

export const InvestmentPortfolio = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const totalValue = 284000;
  const startValue = 240000;
  const gainValue = totalValue - startValue;
  const gainPercentage = ((gainValue / startValue) * 100).toFixed(2);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-sm">
          <p className="text-sm font-medium">{payload[0].payload.date}</p>
          <p className="text-sm text-primary">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Investment Portfolio</h2>
          <p className="text-muted-foreground">Track and analyze your investment performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border shadow-sm">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Portfolio value over time</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="1y" className="px-6">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="1m">1M</TabsTrigger>
                  <TabsTrigger value="3m">3M</TabsTrigger>
                  <TabsTrigger value="6m">6M</TabsTrigger>
                  <TabsTrigger value="1y">1Y</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    "flex items-center text-sm font-medium",
                    gainValue >= 0 ? "text-financial-positive" : "text-financial-negative"
                  )}>
                    {gainValue >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    <span>{gainPercentage}%</span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {formatCurrency(gainValue)}
                  </span>
                </div>
              </div>
              <TabsContent value="1m" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mockPerformanceData.slice(-2)}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
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
                        dataKey="value" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="3m" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mockPerformanceData.slice(-4)}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
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
                        dataKey="value" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="6m" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mockPerformanceData.slice(-7)}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
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
                        dataKey="value" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="1y" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mockPerformanceData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
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
                        dataKey="value" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="all" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mockPerformanceData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
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
                        dataKey="value" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current portfolio breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {mockAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Allocation']} 
                    itemStyle={{ color: '#333' }} 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {mockAllocationData.map((asset) => (
                <div key={asset.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
                    <span className="text-sm font-medium">{asset.name}</span>
                  </div>
                  <span className="text-sm">{formatPercentage(asset.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
