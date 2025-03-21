
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  icon: React.ReactNode;
}

// Custom account type icons
const AccountIcon = ({ type }: { type: string }) => {
  let iconClass = "w-6 h-6 rounded-full flex items-center justify-center";
  
  switch (type) {
    case 'managed':
      return <div className={cn(iconClass, "bg-gray-200 text-gray-700")}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 5h16v14H4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 9h6M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>;
    case 'investment':
      return <div className={cn(iconClass, "bg-green-100 text-green-700")}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18h16M4 6h16M20 12H4M16 9l4 3-4 3M8 15l-4-3 4-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>;
    case 'manual':
      return <div className={cn(iconClass, "bg-yellow-100 text-yellow-700")}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4v4M4 8l2 2M20 8l-2 2M12 12v8M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>;
    case 'loans':
      return <div className={cn(iconClass, "bg-blue-100 text-blue-700")}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>;
    case 'banking':
      return <div className={cn(iconClass, "bg-red-100 text-red-700")}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9h18v10H3V9zM7 13h.01M12 13h.01M17 13h.01M21 5H3l9-4 9 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>;
    case 'credit':
      return <div className={cn(iconClass, "bg-purple-100 text-purple-700")}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 10h18M7 15h2M12 15h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>;
    default:
      return <div className={cn(iconClass, "bg-gray-100 text-gray-700")}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>;
  }
};

// Mock accounts data
const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Farther Managed',
    type: 'managed',
    balance: 0, // Unable to retrieve balance
    currency: 'USD',
    icon: <AccountIcon type="managed" />
  },
  {
    id: '2',
    name: 'External Investment',
    type: 'investment',
    balance: 0,
    currency: 'USD',
    icon: <AccountIcon type="investment" />
  },
  {
    id: '3',
    name: 'External Manually-Tracked',
    type: 'manual',
    balance: 0,
    currency: 'USD',
    icon: <AccountIcon type="manual" />
  },
  {
    id: '4',
    name: 'External Loans',
    type: 'loans',
    balance: 0,
    currency: 'USD',
    icon: <AccountIcon type="loans" />
  },
  {
    id: '5',
    name: 'External Banking',
    type: 'banking',
    balance: 0,
    currency: 'USD',
    icon: <AccountIcon type="banking" />
  },
  {
    id: '6',
    name: 'External Credit Cards',
    type: 'credit',
    balance: 0,
    currency: 'USD',
    icon: <AccountIcon type="credit" />
  }
];

export const AccountsList = () => {
  const [expandedAccounts, setExpandedAccounts] = useState<string[]>([]);

  const toggleAccountExpansion = (accountId: string) => {
    setExpandedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId) 
        : [...prev, accountId]
    );
  };

  const formatCurrency = (amount: number | null, currency: string = 'USD') => {
    if (amount === null) return 'Unable to retrieve balance';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {mockAccounts.map(account => (
        <Card 
          key={account.id}
          className="overflow-hidden bg-card border border-gray-700/20 hover:border-gray-700/30 transition-all"
        >
          <div 
            className="p-4 cursor-pointer flex items-center justify-between"
            onClick={() => toggleAccountExpansion(account.id)}
          >
            <div className="flex items-center">
              {account.icon}
              <span className="ml-3 font-medium">{account.name}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3 font-medium">
                {account.balance === null 
                  ? 'Unable to retrieve balance' 
                  : formatCurrency(account.balance, account.currency)
                }
              </span>
              {expandedAccounts.includes(account.id) ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          
          {expandedAccounts.includes(account.id) && (
            <div className="bg-muted/50 p-4 border-t">
              <div className="text-sm text-muted-foreground">
                <p>Account details will appear here when expanded.</p>
                <p>This could include transaction history, account details, etc.</p>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
