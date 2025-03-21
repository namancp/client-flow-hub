
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface AddAccountModalProps {
  onClose: () => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({ onClose }) => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Add Account</h1>
        <p className="text-muted-foreground">Please select the type of account you would like to add</p>
      </div>
      
      <div className="space-y-4">
        <AccountOption 
          title="Link Account via Plaid"
          description="Connect to your bank accounts, investment accounts, and more"
          onClick={() => console.log("Link via Plaid clicked")}
        />
        
        <AccountOption 
          title="Add Manually-Tracked Account"
          description="Enter account details manually for tracking purposes"
          onClick={() => console.log("Add manual account clicked")}
        />
      </div>
    </div>
  );
};

interface AccountOptionProps {
  title: string;
  description?: string;
  onClick: () => void;
}

const AccountOption: React.FC<AccountOptionProps> = ({ title, description, onClick }) => {
  return (
    <Card 
      className="border border-slate-800 bg-slate-900 hover:border-slate-700 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
        </div>
        <ChevronRight className="h-5 w-5 text-slate-400" />
      </div>
    </Card>
  );
};
