
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AdvisorProps = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  location?: string;
  specialties?: string[];
  rating?: number;
  reviews?: number;
  availability?: string;
};

export function AdvisorCard({ advisor }: { advisor: AdvisorProps }) {
  const { id, name, role, avatar, bio, location, specialties, rating, availability } = advisor;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="flex items-center text-sm mt-1">
              {role}
              {rating && (
                <span className="flex items-center ml-2 text-amber-500">
                  {'★'.repeat(Math.floor(rating))}
                  {rating % 1 > 0 && '☆'}
                  <span className="ml-1 text-muted-foreground">({rating})</span>
                </span>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-4">
        {bio && <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{bio}</p>}
        
        {location && (
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
        )}
        
        {availability && (
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{availability}</span>
          </div>
        )}
        
        {specialties && specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="font-normal">
                {specialty}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className={cn("px-6 py-4 bg-muted/30 flex justify-between")}>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/profile/${id}`}>View Profile</Link>
        </Button>
        <Button size="sm" className="gap-1" asChild>
          <Link to={`/schedule/${id}`}>
            Schedule Meeting
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
