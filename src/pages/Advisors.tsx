
import React from 'react';
import { AdvisorsList } from '@/components/AdvisorsList';

export default function Advisors() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight">Our Advisors</h1>
      </div>
      <p className="text-muted-foreground">
        Connect with our team of professional financial advisors for personalized guidance.
      </p>
      <AdvisorsList />
    </div>
  );
}
