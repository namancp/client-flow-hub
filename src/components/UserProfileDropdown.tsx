
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Users, 
  FileText, 
  Shield, 
  Palette, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export function UserProfileDropdown() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useUser();
  const { theme, setTheme } = useTheme();
  
  const initials = profile?.full_name 
    ? profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'U';
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account."
    });
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || 'User'} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.full_name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>Profile</span>
              <span className="text-xs text-muted-foreground">View and update your personal details</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/contact-info')}>
            <Mail className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>Contact Info</span>
              <span className="text-xs text-muted-foreground">Update your phone, email, or address</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/additional-info')}>
            <BookOpen className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>Additional Info</span>
              <span className="text-xs text-muted-foreground">Add more background information</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/beneficiaries')}>
            <Users className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>Beneficiaries</span>
              <span className="text-xs text-muted-foreground">Manage people you've designated to benefit</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/affiliations')}>
            <Users className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>Affiliations</span>
              <span className="text-xs text-muted-foreground">List organizations or institutions you're connected with</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/trusts')}>
            <FileText className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>Trusts</span>
              <span className="text-xs text-muted-foreground">Add and manage your trust structures</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/security')}>
            <Shield className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>Security & Access</span>
              <span className="text-xs text-muted-foreground">Change password, enable 2FA, and manage access</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between cursor-default">
          <div className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            <span>Change Theme</span>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
