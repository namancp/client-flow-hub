
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { UserData, BookingData } from '@/types/supabase';

type AdvisorInfo = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
};

type TimeSlot = {
  id: string;
  time: string;
  display: string;
  duration: number;
};

export function ScheduleBooking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useUser();
  const [advisor, setAdvisor] = useState<AdvisorInfo | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  
  useEffect(() => {
    async function fetchAdvisorInfo() {
      try {
        if (!id) return;
        
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('users')
          .select('id, full_name, avatar_url')
          .eq('id', id)
          .eq('role', 'advisor')
          .single();
          
        if (error) throw error;
        setAdvisor(data as AdvisorInfo);
      } catch (error) {
        console.error('Error fetching advisor info:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAdvisorInfo();
  }, [id]);
  
  // Generate time slots for demonstration (in real app would come from API)
  const generateTimeSlots = (date: Date) => {
    const slots: TimeSlot[] = [];
    let startHour = 9; // 9 AM
    let endHour = 17; // 5 PM
    
    // Generate fewer slots for dates more than 3 days away
    const isNearDate = isSameDay(date, new Date()) || 
                       isSameDay(date, addDays(new Date(), 1)) || 
                       isSameDay(date, addDays(new Date(), 2));
    
    if (!isNearDate) {
      startHour = 10;
      endHour = 15;
    }
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          id: `slot-${time}`,
          time,
          display: `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`,
          duration: 30,
        });
      }
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots(selectedDate);
  
  const handleBookSession = async () => {
    if (!user || !advisor || !selectedDate || !selectedSlot) {
      toast({
        variant: "destructive",
        title: "Unable to book session",
        description: "Please select a date and time slot."
      });
      return;
    }
    
    try {
      setIsBooking(true);
      
      // Combine the selected date with the selected time slot
      const [hours, minutes] = selectedSlot.time.split(':').map(Number);
      const sessionDateTime = new Date(selectedDate);
      sessionDateTime.setHours(hours, minutes, 0, 0);
      
      const bookingData: BookingData = {
        user_id: user.id,
        advisor_id: advisor.id,
        session_time: sessionDateTime.toISOString(),
        session_length: selectedSlot.duration,
      };
      
      const { error } = await supabase
        .from('bookings')
        .insert(bookingData);
      
      if (error) throw error;
      
      toast({
        title: "Session booked!",
        description: `Your meeting with ${advisor.full_name} has been scheduled for ${format(sessionDateTime, 'PPpp')}.`
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error booking session:', error);
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: error.message || "Failed to book your session. Please try again."
      });
    } finally {
      setIsBooking(false);
    }
  };
  
  if (!user || !profile) {
    return (
      <div className="container max-w-3xl py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Sign in required</h2>
          <p className="text-muted-foreground mb-6">Please sign in to book a session with an advisor.</p>
          <Button asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="container max-w-3xl py-8 animate-pulse">
        <div className="h-8 w-40 bg-muted rounded mb-6"></div>
        <div className="h-96 bg-muted rounded"></div>
      </div>
    );
  }
  
  if (!advisor) {
    return (
      <div className="container max-w-3xl py-8">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/advisors">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Advisors
          </Link>
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Advisor Not Found</h2>
          <p className="text-muted-foreground">This advisor doesn't exist or is no longer available for booking.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-3xl py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link to={`/profile/${advisor.id}`}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Advisor Profile
        </Link>
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={advisor.avatar_url || undefined} alt={advisor.full_name || 'Advisor'} />
              <AvatarFallback>{advisor.full_name?.substring(0, 2) || 'AD'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">Book a Session with {advisor.full_name}</CardTitle>
              <CardDescription>Select a date and time for your financial consultation</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Select Date</h3>
              <div className="border rounded-md p-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      disabled={(date) => 
                        date < new Date(new Date().setHours(0, 0, 0, 0)) || // Past dates
                        date > addDays(new Date(), 30) // More than 30 days in future
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Select Time</h3>
              <div className="border rounded-md p-3 h-64 overflow-y-auto">
                {timeSlots.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No slots available</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "justify-start",
                          selectedSlot?.id === slot.id && "border-primary"
                        )}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <Clock className="mr-2 h-3 w-3" />
                        {slot.display}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {selectedSlot && (
            <div className="mt-6 p-4 border rounded-md bg-muted/30">
              <h3 className="text-sm font-medium mb-2">Session Summary</h3>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{format(selectedDate, 'PPP')}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Time:</span>
                  <span>{selectedSlot.display}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{selectedSlot.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Advisor:</span>
                  <span>{advisor.full_name}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="bg-muted/30 flex justify-between">
          <Button variant="ghost" onClick={() => navigate(`/profile/${advisor.id}`)}>
            Cancel
          </Button>
          <Button 
            onClick={handleBookSession}
            disabled={!selectedDate || !selectedSlot || isBooking}
          >
            {isBooking ? "Booking..." : "Book Session"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
