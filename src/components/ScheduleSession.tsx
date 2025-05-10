
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, Clock, User } from 'lucide-react';
import { UserData } from '@/types/supabase';

type AdvisorWithCalendly = UserData & {
  calendly_link?: string;
};

export function ScheduleSession() {
  const [advisor, setAdvisor] = useState<AdvisorWithCalendly | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionLength, setSessionLength] = useState<'15min' | '30min'>('30min');
  
  useEffect(() => {
    async function fetchAdvisorWithCalendly() {
      try {
        setIsLoading(true);
        
        // In a real app, this would fetch the specific advisor by ID
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'advisor')
          .limit(1)
          .single();
          
        if (userError) throw userError;
        
        // Get the calendly link for this advisor
        const { data: advisorData, error: advisorError } = await supabase
          .from('advisors')
          .select('calendly_link')
          .eq('id', userData.id)
          .single();
        
        if (advisorError && advisorError.code !== 'PGRST116') { // Not found is ok
          throw advisorError;
        }
        
        setAdvisor({
          ...userData as UserData,
          calendly_link: advisorData?.calendly_link || 'https://calendly.com/tony-hein/30min'
        });
      } catch (error) {
        console.error('Error fetching advisor details:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAdvisorWithCalendly();
  }, []);
  
  const getCalendlyUrl = () => {
    // If we have a custom calendly link, use it, otherwise use a default
    const baseUrl = advisor?.calendly_link || 'https://calendly.com/tony-hein';
    return `${baseUrl.replace(/\\/+$/, '')}/${sessionLength}`;
  };
  
  if (isLoading) {
    return (
      <div className="container max-w-5xl py-8 animate-pulse">
        <div className="h-8 w-40 bg-muted rounded mb-6"></div>
        <div className="h-[600px] bg-muted rounded"></div>
      </div>
    );
  }
  
  if (!advisor) {
    return (
      <div className="container max-w-5xl py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Advisor Not Found</h2>
          <p className="text-muted-foreground">The advisor you're looking for doesn't exist or is not available for booking.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/advisor-profile">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Profile
          </Link>
        </Button>
      </div>
      
      <Card className="bg-[#13293D] border-[#1C3A55]">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-[#1C3A55]">
              <AvatarImage src={advisor.avatar_url || undefined} alt={advisor.full_name || 'Advisor'} />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl text-white">Schedule with {advisor.full_name || 'Tony Hein'}</CardTitle>
              <p className="text-[#A3B5C2] text-sm mt-1">Select your preferred session length and time</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs 
            defaultValue="30min" 
            value={sessionLength}
            onValueChange={(value) => setSessionLength(value as '15min' | '30min')}
            className="mb-6"
          >
            <TabsList className="bg-[#0B1C2C] border border-[#1C3A55]">
              <TabsTrigger value="15min" className="data-[state=active]:bg-[#1C3A55]">
                <Clock className="mr-1 h-4 w-4" />
                15 Minutes
              </TabsTrigger>
              <TabsTrigger value="30min" className="data-[state=active]:bg-[#1C3A55]">
                <Clock className="mr-1 h-4 w-4" />
                30 Minutes
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative rounded-md overflow-hidden border border-[#1C3A55] bg-[#0B1C2C] h-[600px]">
            <iframe
              src={getCalendlyUrl()}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule appointment"
              className="absolute inset-0"
            />
          </div>
          
          <p className="text-center text-[#A3B5C2] text-xs mt-4">
            Timezone is automatically detected. For any scheduling issues, please contact support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
