import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CalendarIcon, ChevronLeft, Clock, LinkedinIcon, Mail, MapPin, Phone, User } from 'lucide-react';
import { UserData } from '@/types/supabase';

type AdvisorDetails = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: 'customer' | 'advisor';
  avatar_url: string | null;
  location: string | null;
  linkedin_url: string | null;
  bio: string | null;
};

export function AdvisorProfile() {
  const { id } = useParams<{ id: string }>();
  const [advisor, setAdvisor] = useState<AdvisorDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchAdvisorDetails() {
      try {
        if (!id) return;
        
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .eq('role', 'advisor')
          .single();
          
        if (error) throw error;
        setAdvisor(data as AdvisorDetails);
      } catch (error) {
        console.error('Error fetching advisor details:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAdvisorDetails();
  }, [id]);
  
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
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/advisors">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Advisors
          </Link>
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Advisor Not Found</h2>
          <p className="text-muted-foreground">This advisor doesn't exist or is no longer available.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-4xl py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link to="/advisors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Advisors
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 border-2 border-primary/20 mb-4">
                <AvatarImage src={advisor.avatar_url || undefined} alt={advisor.full_name || 'Advisor'} />
                <AvatarFallback>
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-2xl font-semibold">{advisor.full_name}</h2>
              <p className="text-muted-foreground mb-4">Financial Advisor</p>
              
              <div className="w-full space-y-4 mt-2">
                {advisor.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm truncate">{advisor.email}</span>
                  </div>
                )}
                
                {advisor.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{advisor.phone}</span>
                  </div>
                )}
                
                {advisor.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{advisor.location}</span>
                  </div>
                )}
                
                {advisor.linkedin_url && (
                  <div className="flex items-center">
                    <LinkedinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a 
                      href={advisor.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">About Me</h3>
                <p className="text-muted-foreground">
                  {advisor.bio || 'No biography provided.'}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Specializations</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Investment Planning</li>
                  <li>Retirement Planning</li>
                  <li>Tax Optimization</li>
                  <li>Estate Planning</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>10+ years of experience in financial planning and wealth management.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Schedule a Meeting</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Available for meetings Monday - Friday</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>9:00 AM - 5:00 PM (Eastern Time)</span>
                    </div>
                    
                    <Button className="w-full mt-4" asChild>
                      <Link to={`/schedule/${advisor.id}`}>
                        Schedule Appointment
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Client Reviews</h3>
                  <p className="text-muted-foreground">No reviews available yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
