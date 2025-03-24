
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  ClipboardList,
  Shield,
  BanknoteIcon,
  ArrowRightLeft,
  Receipt,
  Settings,
  Menu,
  X,
  UserCircle,
  LogOut,
  BellRing,
  CircleDollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: {
    count: number;
    variant: 'default' | 'destructive' | 'outline' | 'secondary';
  };
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const primaryNavItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/',
    },
    {
      label: 'Accounts',
      icon: <BanknoteIcon className="h-5 w-5" />,
      href: '/accounts',
      badge: {
        count: 4,
        variant: 'secondary',
      },
    },
    {
      label: 'Investments',
      icon: <TrendingUp className="h-5 w-5" />,
      href: '/investments',
    },
    {
      label: 'Financial Plans',
      icon: <ClipboardList className="h-5 w-5" />,
      href: '/plans',
    },
    {
      label: 'Insurance',
      icon: <Shield className="h-5 w-5" />,
      href: '/insurance',
    },
    {
      label: 'Loans',
      icon: <BanknoteIcon className="h-5 w-5" />,
      href: '/loans',
    },
    {
      label: 'Cash Management',
      icon: <CircleDollarSign className="h-5 w-5" />,
      href: '/cash',
    },
    {
      label: 'Transfers',
      icon: <ArrowRightLeft className="h-5 w-5" />,
      href: '/transfers',
    },
    {
      label: 'Documents',
      icon: <FileText className="h-5 w-5" />,
      href: '/documents',
      badge: {
        count: 2,
        variant: 'secondary',
      },
    },
    {
      label: 'Tax Planning',
      icon: <Receipt className="h-5 w-5" />,
      href: '/tax',
    },
    {
      label: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/settings',
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavHeader = () => (
    <div className="px-4 py-6 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-lg">CF</span>
        </div>
        {(!isMobile || isOpen) && (
          <span className="font-medium text-xl">ClientFlow</span>
        )}
      </Link>
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}
    </div>
  );

  const UserProfile = () => (
    <div className="mt-auto p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={cn(
            "flex items-center space-x-3 p-3 rounded-md transition-colors",
            "hover:bg-sidebar-accent cursor-pointer"
          )}>
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
              <AvatarFallback>{user?.name.substring(0, 2) || 'JD'}</AvatarFallback>
            </Avatar>
            {(!isMobile || isOpen) && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{user?.name || 'Jane Doe'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || 'jane.doe@example.com'}</p>
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellRing className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <aside className={cn(
      "bg-sidebar text-sidebar-foreground border-r border-border transition-all duration-300 flex flex-col z-30",
      isMobile ? (isOpen ? "fixed inset-y-0 left-0 w-64" : "fixed inset-y-0 left-0 w-16") : "w-64",
      "h-screen"
    )}>
      <NavHeader />
      <nav className="flex-1 py-2 overflow-y-auto">
        <div className="px-2 space-y-1">
          {primaryNavItems.map((item) => {
            const isActive = location.pathname === item.href || 
                            (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <TooltipProvider key={item.href} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center py-3 px-3 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                        isMobile && !isOpen ? "justify-center" : "space-x-3"
                      )}
                    >
                      {item.icon}
                      {(!isMobile || isOpen) && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <Badge variant={item.badge.variant} className="ml-auto">
                              {item.badge.count}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {isMobile && !isOpen && (
                    <TooltipContent side="right">
                      {item.label}
                      {item.badge && ` (${item.badge.count})`}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </nav>
      <UserProfile />
    </aside>
  );
};
