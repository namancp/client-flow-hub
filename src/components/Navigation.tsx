
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

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

  const primaryNavItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/',
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
      icon: <BanknoteIcon className="h-5 w-5" />,
      href: '/cash',
    },
    {
      label: 'Transfers',
      icon: <ArrowRightLeft className="h-5 w-5" />,
      href: '/transfers',
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
      <div className={cn(
        "flex items-center space-x-3 p-3 rounded-md transition-colors",
        "hover:bg-sidebar-accent cursor-pointer"
      )}>
        <Avatar className="h-10 w-10 border-2 border-white">
          <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        {(!isMobile || isOpen) && (
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">Jane Doe</p>
            <p className="text-xs text-muted-foreground truncate">jane.doe@example.com</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <aside className={cn(
      "bg-sidebar border-r border-border transition-all duration-300 flex flex-col z-30",
      isMobile ? (isOpen ? "fixed inset-y-0 left-0 w-64" : "fixed inset-y-0 left-0 w-16") : "w-64",
      "h-screen"
    )}>
      <NavHeader />
      <ScrollArea className="flex-1 py-2">
        <nav className="px-2 space-y-1">
          {primaryNavItems.map((item) => {
            const isActive = location.pathname === item.href;
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
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
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
        </nav>
      </ScrollArea>
      <UserProfile />
    </aside>
  );
};
