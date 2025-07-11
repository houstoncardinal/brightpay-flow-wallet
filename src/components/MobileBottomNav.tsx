import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowUpRight, Scan, Users, Activity, Settings, Plus, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: 'Home', 
      path: '/',
      badge: null
    },
    { 
      id: 'send', 
      icon: ArrowUpRight, 
      label: 'Send', 
      path: '/send',
      badge: null
    },
    { 
      id: 'scan', 
      icon: Scan, 
      label: 'Scan', 
      path: '/scan',
      badge: 'QR'
    },
    { 
      id: 'contacts', 
      icon: Users, 
      label: 'Contacts', 
      path: '/contacts',
      badge: null
    },
    { 
      id: 'activity', 
      icon: Activity, 
      label: 'Activity', 
      path: '/activity',
      badge: '3'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Floating Action Button for Quick Pay */}
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={() => navigate('/send')}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-white"
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl transition-all duration-300 relative ${
                  active 
                    ? 'bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <Icon 
                    className={`h-5 w-5 transition-all duration-300 ${
                      active ? 'scale-110' : ''
                    }`} 
                  />
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-orange-400 to-red-400 text-white border-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs font-medium transition-all duration-300 ${
                  active ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind the bottom nav */}
      <div className="h-20" />
    </>
  );
};

export default MobileBottomNav;