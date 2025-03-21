
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Check, ArrowUpRight, ArrowDownRight, ArrowRightLeft, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transfer {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

const mockTransfers: Transfer[] = [
  {
    id: '1',
    fromAccount: 'Primary Checking',
    toAccount: 'Savings Account',
    amount: 1500,
    date: '2023-11-28',
    status: 'completed',
    reference: 'Monthly savings'
  },
  {
    id: '2',
    fromAccount: 'Primary Checking',
    toAccount: 'Investment Portfolio',
    amount: 750,
    date: '2023-11-20',
    status: 'completed',
    reference: 'Stock purchase'
  },
  {
    id: '3',
    fromAccount: 'Savings Account',
    toAccount: 'Primary Checking',
    amount: 500,
    date: '2023-11-15',
    status: 'completed',
    reference: 'Emergency funds'
  },
  {
    id: '4',
    fromAccount: 'Primary Checking',
    toAccount: 'Credit Card',
    amount: 1250,
    date: '2023-12-01',
    status: 'pending',
    reference: 'Credit card payment'
  }
];

export const TransferFunds = () => {
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
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-financial-positive" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed':
        return <ArrowDownRight className="h-4 w-4 text-financial-negative" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Transfer Funds</h2>
          <p className="text-muted-foreground">Move money between your accounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>New Transfer</CardTitle>
            <CardDescription>Transfer funds between your accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="from-account">From Account</Label>
                  <Select defaultValue="checking">
                    <SelectTrigger id="from-account">
                      <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Primary Checking</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="investment">Investment Portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center py-2">
                  <div className="bg-muted/50 p-2 rounded-full">
                    <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to-account">To Account</Label>
                  <Select defaultValue="savings">
                    <SelectTrigger id="to-account">
                      <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Primary Checking</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="investment">Investment Portfolio</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Input id="amount" type="number" placeholder="0.00" className="pl-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Transfer Date</Label>
                  <Input id="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Reference (Optional)</Label>
                  <Input id="reference" placeholder="e.g., Monthly savings" />
                </div>
              </div>

              <Button className="w-full" type="button">Transfer Funds</Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
              <CardDescription>Your last 4 transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left">Date</th>
                      <th scope="col" className="px-6 py-3 text-left">From → To</th>
                      <th scope="col" className="px-6 py-3 text-right">Amount</th>
                      <th scope="col" className="px-6 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransfers.map((transfer) => (
                      <tr key={transfer.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(transfer.date)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="font-medium">{transfer.fromAccount}</span>
                            <span className="mx-2">→</span>
                            <span>{transfer.toAccount}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Ref: {transfer.reference}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {formatCurrency(transfer.amount)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {getStatusIcon(transfer.status)}
                            <span className={cn(
                              "text-sm capitalize",
                              transfer.status === 'completed' ? "text-financial-positive" : 
                              transfer.status === 'pending' ? "text-amber-500" : 
                              "text-financial-negative"
                            )}>
                              {transfer.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <a href="#" className="text-sm text-primary flex items-center justify-end">
                  View all transfers
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
