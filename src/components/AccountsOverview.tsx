
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccountData {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'credit' | 'loan';
  balance: number;
  currency: string;
  institution: string;
  change: number;
  lastUpdated: string;
}

const mockAccounts: AccountData[] = [
  {
    id: '1',
    name: 'Primary Checking',
    type: 'checking',
    balance: 12548.23,
    currency: 'USD',
    institution: 'Chase Bank',
    change: 1250,
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    name: 'Savings Account',
    type: 'savings',
    balance: 38975.12,
    currency: 'USD',
    institution: 'Wells Fargo',
    change: 875.50,
    lastUpdated: '1 day ago'
  },
  {
    id: '3',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 241368.45,
    currency: 'USD',
    institution: 'Vanguard',
    change: -1231.75,
    lastUpdated: '3 hours ago'
  },
  {
    id: '4',
    name: 'Credit Card',
    type: 'credit',
    balance: -4235.87,
    currency: 'USD',
    institution: 'American Express',
    change: -435.21,
    lastUpdated: '4 hours ago'
  }
];

export const AccountsOverview = () => {
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getAccountTypeColor = (type: AccountData['type']) => {
    switch (type) {
      case 'checking':
        return 'bg-blue-50 text-blue-700';
      case 'savings':
        return 'bg-green-50 text-green-700';
      case 'investment':
        return 'bg-purple-50 text-purple-700';
      case 'credit':
        return 'bg-orange-50 text-orange-700';
      case 'loan':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Accounts Overview</h2>
          <p className="text-muted-foreground">Manage and track all your financial accounts</p>
        </div>
        <Badge variant="outline" className="px-3 py-1.5">
          <span className="text-xs font-medium">Last Updated: Today, 2:45 PM</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockAccounts.map((account) => (
          <Card 
            key={account.id} 
            className={cn(
              "overflow-hidden transition-all duration-300 border card-hover",
              account.type === 'credit' || account.type === 'loan' ? "border-l-amber-400 border-l-4" : "border-l-primary border-l-4"
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <Badge 
                    variant="secondary" 
                    className={cn("font-medium mb-1", getAccountTypeColor(account.type))}
                  >
                    {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                  </Badge>
                  <CardTitle className="text-xl font-medium">{account.name}</CardTitle>
                  <CardDescription>{account.institution}</CardDescription>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-2xl font-semibold">
                    {formatCurrency(account.balance, account.currency)}
                  </span>
                  <div className="flex items-center mt-1 space-x-2">
                    <div className={cn(
                      "flex items-center text-sm",
                      account.change >= 0 ? "text-financial-positive" : "text-financial-negative"
                    )}>
                      {account.change >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {formatCurrency(Math.abs(account.change), account.currency)}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      Updated {account.lastUpdated}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <a
                    href="#"
                    className="text-sm text-primary inline-flex items-center hover:underline"
                  >
                    <span>View Details</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
