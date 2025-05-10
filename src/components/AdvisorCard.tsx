
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Calendar } from 'lucide-react';
import { UserData } from '@/types/supabase';

// Define and export the AdvisorProps interface
export interface AdvisorProps {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  location?: string;
  email?: string;
  specialties?: string[];
  rating?: number;
  availability?: string;
}

interface AdvisorCardProps {
  advisor?: AdvisorProps;
}

export function AdvisorCard({ advisor }: AdvisorCardProps = {}) {
  const [loadedAdvisor, setLoadedAdvisor] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(!advisor);
  
  useEffect(() => {
    // Only fetch from database if no advisor prop is provided
    if (!advisor) {
      async function fetchAdvisor() {
        try {
          setIsLoading(true);
          
          // Fetch an advisor (in a real app, this would be the assigned advisor)
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('role', 'advisor')
            .limit(1)
            .single();
          
          if (error) throw error;
          setLoadedAdvisor(data as UserData);
        } catch (error) {
          console.error('Error fetching advisor:', error);
        } finally {
          setIsLoading(false);
        }
      }
      
      fetchAdvisor();
    }
  }, [advisor]);
  
  if (isLoading) {
    return (
      <Card className="mt-auto mx-2 mb-4 bg-[#13293D]">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-3">
            <div className="h-12 w-12 rounded-full bg-background/20 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-background/20 rounded animate-pulse" />
              <div className="h-3 w-16 bg-background/20 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 w-full bg-background/20 rounded animate-pulse" />
            <div className="h-3 w-full bg-background/20 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-8 w-full bg-background/20 rounded animate-pulse" />
            <div className="h-8 w-full bg-background/20 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Use provided advisor prop if available, otherwise use the loaded advisor
  const displayAdvisor = advisor || {
    id: loadedAdvisor?.id || '',
    name: loadedAdvisor?.full_name || 'Tony Hein',
    role: 'Financial Advisor',
    avatar: loadedAdvisor?.avatar_url || '',
    location: loadedAdvisor?.location || 'Chicago, IL',
    email: loadedAdvisor?.email || 'tony.hein@demo.com'
  };
  
  return (
    <Card className="mt-auto mx-2 mb-4 bg-[#13293D] border-[#1C3A55]">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-10 w-10 border border-[#1C3A55]">
            <AvatarImage src={displayAdvisor.avatar} alt={displayAdvisor.name} />
            <AvatarFallback>{displayAdvisor.name?.substring(0, 2) || 'AD'}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-medium text-white">{displayAdvisor.name}</h4>
            <p className="text-xs text-[#A3B5C2]">{displayAdvisor.role}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4 text-xs text-[#A3B5C2]">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1.5" />
            <span>{displayAdvisor.location}</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-3 w-3 mr-1.5" />
            <span className="truncate">{displayAdvisor.email}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs border-[#1C3A55] bg-[#0B1C2C] hover:bg-[#1C3A55]"
            asChild
          >
            <Link to="/advisor-profile">View Profile</Link>
          </Button>
          <Button 
            size="sm" 
            className="w-full text-xs bg-[#00C896] hover:bg-[#00B389] text-white"
            asChild
          >
            <Link to="/schedule-session">
              <Calendar className="h-3 w-3 mr-1" />
              Book a Session
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
