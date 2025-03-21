
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';
import { Receipt, CircleDollarSign, FileText, FileCheck, CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaxCategory {
  name: string;
  actual: number;
  budget: number;
}

interface Document {
  id: string;
  name: string;
  status: 'uploaded' | 'pending' | 'verified';
  date: string;
}

const mockTaxCategories: TaxCategory[] = [
  { name: 'Income', actual: 95000, budget: 100000 },
  { name: 'Deductions', actual: 18500, budget: 25000 },
  { name: 'Credits', actual: 3200, budget: 5000 },
  { name: 'Payments', actual: 21000, budget: 24000 },
  { name: 'Tax Due', actual: 15700, budget: 18000 }
];

const mockTaxDocuments: Document[] = [
  { id: '1', name: 'W-2 Form', status: 'verified', date: '2023-02-15' },
  { id: '2', name: '1099-INT', status: 'verified', date: '2023-02-20' },
  { id: '3', name: 'Mortgage Interest', status: 'uploaded', date: '2023-03-10' },
  { id: '4', name: 'Charitable Donations', status: 'pending', date: '' },
  { id: '5', name: 'Business Expenses', status: 'pending', date: '' }
];

export const TaxPlanning = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) : 'Not uploaded';
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-financial-positive">Verified</Badge>;
      case 'uploaded':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Uploaded</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Pending</Badge>;
      default:
        return null;
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-sm">
          <p className="text-sm font-medium">{payload[0].payload.name}</p>
          <p className="text-sm text-primary">Actual: {formatCurrency(payload[0].value)}</p>
          <p className="text-sm text-gray-600">Budget: {formatCurrency(payload[0].payload.budget)}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate tax due date and days remaining
  const currentYear = new Date().getFullYear();
  const taxDueDate = new Date(`April 15, ${currentYear + 1}`);
  const today = new Date();
  const daysRemaining = Math.ceil((taxDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.ceil((today.getTime() - new Date(`January 1, ${currentYear}`).getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = Math.ceil((taxDueDate.getTime() - new Date(`January 1, ${currentYear}`).getTime()) / (1000 * 60 * 60 * 24));
  const progressPercentage = Math.min(Math.round((daysPassed / totalDays) * 100), 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tax Planning</h2>
          <p className="text-muted-foreground">Plan and track your tax obligations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Tax Timeline</CardTitle>
                <CardDescription>Track important tax dates</CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1.5">
                <CalendarClock className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs font-medium">Tax Year {currentYear}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="pt-2 pb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium">Tax Filing Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Jan 1, {currentYear}</span>
                <span>Apr 15, {currentYear + 1}</span>
              </div>
            </div>
            
            <div className="p-4 bg-background rounded-lg border">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Tax Return Due</h4>
                  <p className="text-muted-foreground text-sm">April 15, {currentYear + 1}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={cn(
                    "px-2 py-1",
                    daysRemaining < 30 ? "bg-orange-50 text-orange-700 border-orange-200" : 
                                        "bg-blue-50 text-blue-700 border-blue-200"
                  )}>
                    {daysRemaining} days left
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md text-sm">
                <div className="flex items-center">
                  <CircleDollarSign className="h-4 w-4 mr-2 text-financial-positive" />
                  <span>Q4 Estimated Payment</span>
                </div>
                <span className="text-xs">Jan 15, {currentYear + 1}</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md text-sm">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  <span>W-2 Forms Due</span>
                </div>
                <span className="text-xs">Jan 31, {currentYear + 1}</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md text-sm">
                <div className="flex items-center">
                  <FileCheck className="h-4 w-4 mr-2 text-purple-500" />
                  <span>1099 Forms Due</span>
                </div>
                <span className="text-xs">Jan 31, {currentYear + 1}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Tax Categories</CardTitle>
              <CardDescription>Current year tax breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockTaxCategories}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#888' }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${value/1000}k`}
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#888' }}
                      width={60}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="actual" 
                      name="Actual" 
                      fill="#4F46E5" 
                      radius={[4, 4, 0, 0]}
                    >
                      {mockTaxCategories.map((entry, index) => {
                        const color = entry.name === 'Tax Due' ? '#ef4444' : 
                                     entry.name === 'Deductions' || entry.name === 'Credits' ? '#10b981' : 
                                     '#4F46E5';
                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Tax Documents</CardTitle>
          <CardDescription>Track your tax document status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">Document</th>
                  <th scope="col" className="px-6 py-3 text-center">Status</th>
                  <th scope="col" className="px-6 py-3 text-right">Date Processed</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTaxDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Receipt className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="px-6 py-4 text-right text-muted-foreground">
                      {formatDate(doc.date)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a href="#" className="text-primary text-sm hover:underline">
                        {doc.status === 'pending' ? 'Upload' : 'View'}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
