
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowUpRight, ArrowDownRight, ArrowUp, ArrowDown, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CashFlowData {
  month: string;
  income: number;
  expenses: number;
}

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

const mockCashFlowData: CashFlowData[] = [
  { month: 'Jul', income: 6500, expenses: 5100 },
  { month: 'Aug', income: 6500, expenses: 5300 },
  { month: 'Sep', income: 6500, expenses: 4800 },
  { month: 'Oct', income: 7200, expenses: 5100 },
  { month: 'Nov', income: 7200, expenses: 5700 },
  { month: 'Dec', income: 7200, expenses: 6200 },
];

const mockRecentTransactions: Transaction[] = [
  { id: '1', name: 'Salary Deposit', amount: 3600, date: '2023-11-30', category: 'Income', type: 'income' },
  { id: '2', name: 'Rent Payment', amount: -1800, date: '2023-11-28', category: 'Housing', type: 'expense' },
  { id: '3', name: 'Grocery Store', amount: -250, date: '2023-11-25', category: 'Food', type: 'expense' },
  { id: '4', name: 'Bonus', amount: 1500, date: '2023-11-20', category: 'Income', type: 'income' },
  { id: '5', name: 'Phone Bill', amount: -85, date: '2023-11-15', category: 'Utilities', type: 'expense' },
];

export const CashFlow = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const totalIncome = mockCashFlowData.reduce((acc, item) => acc + item.income, 0);
  const totalExpenses = mockCashFlowData.reduce((acc, item) => acc + item.expenses, 0);
  const netCashFlow = totalIncome - totalExpenses;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-sm">
          <p className="text-sm font-medium">{payload[0].payload.month}</p>
          <p className="text-sm text-financial-positive">Income: {formatCurrency(payload[0].value)}</p>
          <p className="text-sm text-financial-negative">Expenses: {formatCurrency(payload[1].value)}</p>
          <p className="text-sm font-medium mt-1 border-t pt-1">
            Net: {formatCurrency(payload[0].value - payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Cash Management</h2>
          <p className="text-muted-foreground">Track your income and expenses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>6-month income vs expenses</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 pb-2 pt-1">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Income</p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="h-4 w-4 mr-1 text-financial-positive" />
                      <span className="text-xl font-medium">{formatCurrency(totalIncome)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Expenses</p>
                    <div className="flex items-center mt-1">
                      <ArrowDown className="h-4 w-4 mr-1 text-financial-negative" />
                      <span className="text-xl font-medium">{formatCurrency(totalExpenses)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Net Cash Flow</p>
                    <div className="flex items-center mt-1">
                      {netCashFlow >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1 text-financial-positive" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1 text-financial-negative" />
                      )}
                      <span className={cn(
                        "text-xl font-medium",
                        netCashFlow >= 0 ? "text-financial-positive" : "text-financial-negative"
                      )}>
                        {formatCurrency(netCashFlow)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-80 px-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockCashFlowData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                    <XAxis 
                      dataKey="month" 
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
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="income" name="Income" fill="#4ade80" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Last 5 transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        transaction.type === 'income' ? "bg-green-100" : "bg-red-100"
                      )}>
                        <DollarSign className={cn(
                          "h-4 w-4",
                          transaction.type === 'income' ? "text-financial-positive" : "text-financial-negative"
                        )} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {formatDate(transaction.date)} • {transaction.category}
                        </p>
                      </div>
                    </div>
                    <span className={cn(
                      "font-medium",
                      transaction.type === 'income' ? "text-financial-positive" : "text-financial-negative"
                    )}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                    </span>
                  </div>
                ))}

                <div className="pt-2">
                  <a href="#" className="text-sm text-primary flex items-center">
                    View all transactions
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
