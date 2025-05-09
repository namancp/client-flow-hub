
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdvisorCard, AdvisorProps } from './AdvisorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function AdvisorsList() {
  const [advisors, setAdvisors] = useState<AdvisorProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    async function fetchAdvisors() {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('users')
          .select(`
            id,
            full_name,
            role,
            avatar_url,
            bio,
            location
          `)
          .eq('role', 'advisor');
          
        if (error) throw error;
        
        const formattedAdvisors = data.map(advisor => ({
          id: advisor.id,
          name: advisor.full_name || 'Unknown Advisor',
          role: 'Financial Advisor',
          avatar: advisor.avatar_url || '',
          bio: advisor.bio || 'Professional financial advisor ready to help you meet your financial goals.',
          location: advisor.location || 'Remote',
          specialties: ['Investment', 'Retirement', 'Tax Planning'],
          rating: 4.5,
          availability: 'Available this week'
        }));
        
        setAdvisors(formattedAdvisors);
      } catch (error) {
        console.error('Error fetching advisors:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAdvisors();
  }, []);
  
  const filteredAdvisors = advisors.filter(advisor => 
    advisor.name.toLowerCase().includes(search.toLowerCase()) ||
    advisor.location?.toLowerCase().includes(search.toLowerCase()) ||
    advisor.bio?.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search advisors..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="h-64 rounded-md border border-border bg-background/50 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {filteredAdvisors.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg font-medium">No advisors found</p>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdvisors.map((advisor) => (
                <AdvisorCard key={advisor.id} advisor={advisor} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
