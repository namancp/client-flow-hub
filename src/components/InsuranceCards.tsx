
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Calendar, ArrowRight, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsurancePolicy {
  id: string;
  name: string;
  type: 'health' | 'life' | 'auto' | 'home' | 'disability';
  provider: string;
  policyNumber: string;
  premium: number;
  frequency: 'monthly' | 'quarterly' | 'annually';
  coverage: number;
  renewalDate: string;
  status: 'active' | 'pending' | 'expired';
}

const mockPolicies: InsurancePolicy[] = [
  {
    id: '1',
    name: 'Health Insurance',
    type: 'health',
    provider: 'Blue Cross Blue Shield',
    policyNumber: 'HC1234567',
    premium: 450,
    frequency: 'monthly',
    coverage: 1000000,
    renewalDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Term Life Insurance',
    type: 'life',
    provider: 'Prudential',
    policyNumber: 'LF7654321',
    premium: 120,
    frequency: 'monthly',
    coverage: 500000,
    renewalDate: '2030-06-30',
    status: 'active'
  },
  {
    id: '3',
    name: 'Auto Insurance',
    type: 'auto',
    provider: 'State Farm',
    policyNumber: 'AU9876543',
    premium: 180,
    frequency: 'monthly',
    coverage: 300000,
    renewalDate: '2023-12-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'Home Insurance',
    type: 'home',
    provider: 'Allstate',
    policyNumber: 'HM5432109',
    premium: 125,
    frequency: 'monthly',
    coverage: 450000,
    renewalDate: '2024-03-22',
    status: 'active'
  }
];

export const InsuranceCards = () => {
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

  const getStatusBadge = (status: InsurancePolicy['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-financial-positive">Active</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Pending</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Insurance Management</h2>
          <p className="text-muted-foreground">Monitor and manage your insurance policies</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {mockPolicies.map((policy) => (
          <Card 
            key={policy.id} 
            className="overflow-hidden transition-all duration-300 border-l-blue-500 border-l-4 card-hover"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1.5">
                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                    <CardTitle className="text-xl font-medium">{policy.name}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <span>{policy.provider}</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                    <span>Policy #{policy.policyNumber}</span>
                  </CardDescription>
                </div>
                {getStatusBadge(policy.status)}
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Premium</p>
                    <p className="font-medium">
                      {formatCurrency(policy.premium)}/{policy.frequency.charAt(0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Coverage</p>
                    <p className="font-medium">{formatCurrency(policy.coverage)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <span>Renews {formatDate(policy.renewalDate)}</span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">
                    <span className="mr-1">Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
