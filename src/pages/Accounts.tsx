
import React, { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AccountsList } from '@/components/accounts/AccountsList';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { AddAccountModal } from '@/components/accounts/AddAccountModal';

const Accounts = () => {
  const [isAddingAccount, setIsAddingAccount] = useState(false);

  return (
    <DashboardLayout>
      {!isAddingAccount ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
              <p className="text-muted-foreground">Manage and track all your financial accounts</p>
            </div>
            <Button 
              onClick={() => setIsAddingAccount(true)}
              className="mt-4 sm:mt-0"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
          
          <AccountsList />
        </>
      ) : (
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6" 
            onClick={() => setIsAddingAccount(false)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <AddAccountModal onClose={() => setIsAddingAccount(false)} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Accounts;
