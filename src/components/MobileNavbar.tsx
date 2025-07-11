import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, Send, QrCode, Users, BarChart3, 
  Plus, ArrowDown, Wallet, Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/', notifications: 0 },
    { icon: Send, label: 'Send', path: '/send', notifications: 0 },
    { icon: QrCode, label: 'Scan', path: '/scan', notifications: 0 },
    { icon: Users, label: 'Contacts', path: '/contacts', notifications: 2 },
    { icon: BarChart3, label: 'Activity', path: '/activity', notifications: 0 },
  ];

  const quickActions = [
    { icon: ArrowDown, label: 'Request', path: '/request', color: 'emerald' },
    { icon: Wallet, label: 'Cards', path: '/cards', color: 'blue' },
    { icon: Settings, label: 'Settings', path: '/settings', color: 'gray' },
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 z-50">
        <div className="grid grid-cols-5 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 h-auto py-2 px-1 relative",
                  isActive 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <div className="relative">
                  <item.icon className={cn("h-5 w-5", isActive && "text-blue-600")} />
                  {item.notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-red-500 text-white">
                      {item.notifications}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Floating Action Menu */}
      <div className="fixed bottom-20 right-4 z-40">
        <div className="flex flex-col-reverse gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={action.path}
              size="sm"
              onClick={() => navigate(action.path)}
              className={cn(
                "h-10 w-10 rounded-full shadow-lg hover-scale transition-all duration-300",
                action.color === 'emerald' && "bg-emerald-500 hover:bg-emerald-600 text-white",
                action.color === 'blue' && "bg-blue-500 hover:bg-blue-600 text-white",
                action.color === 'gray' && "bg-gray-500 hover:bg-gray-600 text-white"
              )}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: `translateY(${index * 2}px)`
              }}
            >
              <action.icon className="h-4 w-4" />
            </Button>
          ))}
          
          {/* Main FAB */}
          <Button
            size="icon"
            onClick={() => navigate('/send')}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-2xl glow-blue hover-scale rotate-0 hover:rotate-45 transition-all duration-300"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;