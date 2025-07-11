import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import MobileBottomNav from '@/components/MobileBottomNav';
import logoImage from '@/assets/logo.png';
import {
  Send,
  ArrowDown,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  Clock,
  Filter,
  Search,
  QrCode,
  SplitSquareHorizontal,
  Bell,
  Settings,
  Eye,
  EyeOff,
  CreditCard,
  Zap,
  Target,
  Gift,
  Users,
  LogOut,
  Wallet,
  MoreHorizontal,
  Star,
  ChevronRight,
  DollarSign,
  PieChart,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const mockBalance = "$11,522";
  const mockSavings = "$1,234.89";
  const mockSpending = "$567.23";
  
  const mockTransactions = [
    { 
      id: 'txn-001', 
      type: 'received', 
      amount: '+$124.50', 
      from: 'Sarah Johnson', 
      to: 'You',
      time: '2m ago', 
      category: 'Personal', 
      status: 'completed',
      description: 'Lunch split payment'
    },
    { 
      id: 'txn-002', 
      type: 'sent', 
      amount: '-$89.20', 
      from: 'You',
      to: 'Mike Chen', 
      time: '1h ago', 
      category: 'Bills', 
      status: 'completed',
      description: 'Utility bill payment'
    },
    { 
      id: 'txn-003', 
      type: 'pending', 
      amount: '-$45.00', 
      from: 'You',
      to: 'Emma Davis', 
      time: '3h ago', 
      category: 'Personal', 
      status: 'pending',
      description: 'Movie tickets'
    },
  ];

  const stats = [
    { label: 'This Month', value: '+$2,847.20', percent: '+12.5%', trend: 'up' },
    { label: 'Savings Goal', value: '78%', percent: '+5.2%', trend: 'up' },
    { label: 'Cash Back', value: '$47.92', percent: '+8.1%', trend: 'up' },
  ];

  const quickActions = [
    { 
      name: 'Send Money', 
      icon: Send, 
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      glow: 'glow-blue',
      action: () => navigate('/send')
    },
    { 
      name: 'Request', 
      icon: ArrowDown, 
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      glow: 'glow-emerald',
      action: () => navigate('/request')
    },
    { 
      name: 'Scan QR', 
      icon: QrCode, 
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      glow: 'glow-blue',
      action: () => navigate('/scan')
    },
    { 
      name: 'Split Bill', 
      icon: SplitSquareHorizontal, 
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      glow: 'glow-green',
      action: () => navigate('/send')
    },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatBalance = (balance: string) => {
    return balanceVisible ? balance : '••••••';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 z-30 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="BrightPay Logo" 
                className="h-8 w-8 rounded-lg shadow-md hover-lift"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">BrightPay</h1>
              <p className="text-xs text-muted-foreground">{getGreeting()}, {user?.email?.split('@')[0] || 'User'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 relative hover-glow"
            >
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 hover-glow"
              onClick={signOut}
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 pb-32 space-y-6">
        {/* Balance Card */}
        <Card className="glass-card border-0 shadow-xl hover-lift overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5" />
          <CardContent className="pt-6 relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {formatBalance(mockBalance)}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
                  >
                    {balanceVisible ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-sm font-medium">+5.2%</span>
                </div>
                <p className="text-xs text-muted-foreground">vs last month</p>
              </div>
            </div>
            
            {/* Mini Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/50 rounded-lg p-3 border border-white/20">
                <p className="text-xs text-muted-foreground">Savings</p>
                <p className="text-lg font-semibold text-emerald-600">{formatBalance(mockSavings)}</p>
              </div>
              <div className="bg-white/50 rounded-lg p-3 border border-white/20">
                <p className="text-xs text-muted-foreground">This Month</p>
                <p className="text-lg font-semibold text-blue-600">{formatBalance(mockSpending)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => navigate('/send')}
                className="flex-1 h-9 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Send className="h-3 w-3 mr-1" />
                Send
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => navigate('/request')}
                className="flex-1 h-9 border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-xs shadow-sm hover:shadow-md transition-all duration-300"
              >
                <ArrowDown className="h-3 w-3 mr-1" />
                Request
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => navigate('/send')}
                className="h-9 w-9 p-0 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              View All
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  onClick={action.action}
                  className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-xl border border-white/20 hover:bg-white/80 transition-all duration-300 cursor-pointer group hover-lift"
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} ${action.glow} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {action.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <Card className="glass-card border-0 shadow-lg hover-lift">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Financial Overview</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <BarChart3 className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white/40 rounded-lg border border-white/20">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-semibold">{stat.value}</p>
                </div>
                <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.percent}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card border-0 shadow-lg hover-lift">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Filter className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Search className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {mockTransactions.map((transaction, index) => (
                <div 
                  key={transaction.id} 
                  onClick={() => navigate(`/transaction/${transaction.id}`)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 cursor-pointer group border border-gray-100/50 hover:border-blue-200/50 hover-lift"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                      transaction.type === 'received' ? 'bg-gradient-to-br from-emerald-100 to-emerald-200' :
                      transaction.type === 'pending' ? 'bg-gradient-to-br from-orange-100 to-orange-200' : 'bg-gradient-to-br from-blue-100 to-blue-200'
                    }`}>
                      {transaction.type === 'received' ? (
                        <ArrowDown className="h-4 w-4 text-emerald-600" />
                      ) : transaction.type === 'pending' ? (
                        <Clock className="h-4 w-4 text-orange-600" />
                      ) : (
                        <ArrowUp className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {transaction.type === 'received' ? transaction.from : transaction.to}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs h-5 px-2 bg-gray-100/50">
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{transaction.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${
                        transaction.type === 'received' ? 'text-emerald-600' :
                        transaction.type === 'pending' ? 'text-orange-600' : 'text-blue-600'
                      }`}>
                        {transaction.amount}
                      </p>
                      <p className={`text-xs ${
                        transaction.status === 'pending' ? 'text-orange-500' : 'text-muted-foreground'
                      }`}>
                        {transaction.status}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <Button 
              variant="ghost" 
              className="w-full text-sm text-muted-foreground hover:text-blue-600 hover:bg-blue-50/50"
              onClick={() => navigate('/activity')}
            >
              View All Transactions
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Savings Goal Progress */}
        <Card className="glass-card border-0 shadow-lg hover-lift">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-semibold">Savings Goal</h3>
              </div>
              <span className="text-xs text-muted-foreground">78% complete</span>
            </div>
            <Progress value={78} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$1,234 saved</span>
              <span>$1,600 goal</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Dashboard;