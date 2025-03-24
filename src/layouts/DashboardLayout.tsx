
import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { cn } from '@/lib/utils';
import { BellIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your account has been updated", read: false },
    { id: 2, text: "New document has been shared with you", read: false },
    { id: 3, text: "Portfolio review scheduled for tomorrow", read: true },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-shrink-0 w-64 md:block">
        <Navigation />
      </div>
      <div className="flex-1 flex flex-col w-0">
        <header className="h-16 border-b flex items-center justify-end px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 px-1.5 h-5 min-w-5 flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-2 border-b">
                <h4 className="font-medium">Notifications</h4>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="py-4 px-2 text-center text-muted-foreground">
                    No notifications
                  </p>
                ) : (
                  notifications.map(notification => (
                    <DropdownMenuItem 
                      key={notification.id}
                      className={cn(
                        "p-3 cursor-pointer", 
                        !notification.read && "bg-muted/40"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-2">
                        <div 
                          className={cn(
                            "w-2 h-2 rounded-full mt-1.5",
                            !notification.read ? "bg-primary" : "bg-transparent"
                          )} 
                        />
                        <span>{notification.text}</span>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main 
          className={cn(
            "flex-1 p-6 md:p-8 lg:p-10 overflow-auto transition-all duration-300",
            className
          )}
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
