
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, LinkedinIcon, Mail, MapPin, User } from 'lucide-react';
import { UserData } from '@/types/supabase';

export function AdvisorProfile() {
  const [advisor, setAdvisor] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchAdvisorDetails() {
      try {
        setIsLoading(true);
        
        // In a real app, this would fetch the specific advisor by ID
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'advisor')
          .limit(1)
          .single();
          
        if (error) throw error;
        setAdvisor(data as UserData);
      } catch (error) {
        console.error('Error fetching advisor details:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAdvisorDetails();
  }, []);
  
  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 animate-pulse">
        <div className="h-8 w-40 bg-muted rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="rounded-lg h-72 bg-muted"></div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="h-10 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-32 bg-muted rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!advisor) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Advisor Not Found</h2>
          <p className="text-muted-foreground">This advisor doesn't exist or is no longer available.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-4xl py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="bg-[#13293D] border-[#1C3A55]">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 border-2 border-[#1C3A55] mb-4">
                <AvatarImage src={advisor.avatar_url || undefined} alt={advisor.full_name || 'Tony Hein'} />
                <AvatarFallback>
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-2xl font-semibold text-white">{advisor.full_name || 'Tony Hein'}</h2>
              <p className="text-[#A3B5C2] mb-4">Financial Advisor</p>
              
              <div className="w-full space-y-4 mt-2 text-left">
                {advisor.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-[#A3B5C2]" />
                    <a 
                      href={`mailto:${advisor.email}`} 
                      className="text-sm text-[#A3B5C2] hover:text-white"
                    >
                      {advisor.email}
                    </a>
                  </div>
                )}
                
                {advisor.linkedin_url && (
                  <div className="flex items-center">
                    <LinkedinIcon className="h-4 w-4 mr-2 text-[#A3B5C2]" />
                    <a 
                      href={advisor.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[#00C896] hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                
                {advisor.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-[#A3B5C2]" />
                    <span className="text-sm text-[#A3B5C2]">{advisor.location || 'Chicago, IL'}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="bio" className="w-full">
            <TabsList className="bg-[#13293D] border border-[#1C3A55] mb-6">
              <TabsTrigger value="bio" className="data-[state=active]:bg-[#1C3A55]">Bio</TabsTrigger>
              <TabsTrigger value="location" className="data-[state=active]:bg-[#1C3A55]">Location</TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-[#1C3A55]">Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bio" className="mt-0">
              <Card className="bg-[#13293D] border-[#1C3A55]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">About</h3>
                  <p className="text-[#A3B5C2] leading-relaxed">
                    {advisor.bio || `Tony, a financial strategist, specializes in holistic wealth planning for high-net-worth clients. 
                    With over 15 years of experience in investment management and estate planning, he helps clients navigate complex 
                    financial situations with clarity and confidence. Tony is known for his personalized approach, 
                    taking time to understand each client's unique goals and concerns before developing customized strategies.`}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="location" className="mt-0">
              <Card className="bg-[#13293D] border-[#1C3A55]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">Office Location</h3>
                  <p className="text-[#A3B5C2]">
                    123 Financial Avenue<br />
                    Chicago, IL 60601<br /><br />
                    Our offices are located in the heart of Chicago's financial district,
                    easily accessible by public transportation and with parking available nearby.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="education" className="mt-0">
              <Card className="bg-[#13293D] border-[#1C3A55]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">Education & Certifications</h3>
                  <ul className="space-y-3 text-[#A3B5C2]">
                    <li className="border-b border-[#1C3A55] pb-2">
                      <span className="font-medium text-white">MBA, Finance</span><br />
                      University of Chicago, Booth School of Business
                    </li>
                    <li className="border-b border-[#1C3A55] pb-2">
                      <span className="font-medium text-white">BA, Economics</span><br />
                      Northwestern University
                    </li>
                    <li className="border-b border-[#1C3A55] pb-2">
                      <span className="font-medium text-white">Certified Financial Planner (CFP®)</span>
                    </li>
                    <li>
                      <span className="font-medium text-white">Chartered Financial Analyst (CFA)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="sticky bottom-8 flex justify-center mt-8">
        <Button 
          size="lg" 
          className="bg-[#00C896] hover:bg-[#00B389] text-white px-8"
          asChild
        >
          <Link to="/schedule-session">
            <Calendar className="mr-2 h-5 w-5" />
            Book a Session
          </Link>
        </Button>
      </div>
    </div>
  );
}
