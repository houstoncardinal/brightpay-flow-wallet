import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowUp, ArrowDown, Plus, QrCode, Users, CreditCard, LogOut, 
  TrendingUp, TrendingDown, Eye, EyeOff, Wallet, Send, 
  MoreHorizontal, Star, Clock, Filter, Search, Bell,
  ChevronRight, DollarSign, PieChart, BarChart3, Settings
} from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);

  const mockBalance = "$2,847.50";
  const mockSavings = "$1,234.89";
  const mockSpending = "$567.23";
  
  const mockTransactions = [
    { id: 1, type: 'received', amount: '+$25.00', from: 'Sarah Chen', time: '2:34 PM', category: 'Transfer', status: 'completed' },
    { id: 2, type: 'sent', amount: '-$12.50', to: 'Starbucks Coffee', time: '11:45 AM', category: 'Food', status: 'completed' },
    { id: 3, type: 'received', amount: '+$100.00', from: 'Alex Rodriguez', time: 'Yesterday', category: 'Payment', status: 'completed' },
    { id: 4, type: 'sent', amount: '-$45.99', to: 'Uber Ride', time: 'Yesterday', category: 'Transport', status: 'completed' },
    { id: 5, type: 'pending', amount: '-$89.50', to: 'Amazon', time: '2 days ago', category: 'Shopping', status: 'pending' },
    { id: 6, type: 'received', amount: '+$200.00', from: 'Maria Silva', time: '3 days ago', category: 'Transfer', status: 'completed' },
  ];

  const quickActions = [
    { icon: Send, label: 'Send', color: 'blue', count: 3 },
    { icon: ArrowDown, label: 'Request', color: 'emerald', count: 1 },
    { icon: QrCode, label: 'Scan', color: 'purple', count: null },
    { icon: Users, label: 'Split', color: 'cyan', count: 2 },
  ];

  const stats = [
    { label: 'This Month', value: '+$1,245', trend: 'up', percent: '+12%' },
    { label: 'Last Month', value: '$2,156', trend: 'down', percent: '-3%' },
    { label: 'Avg/Week', value: '$286', trend: 'up', percent: '+8%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Header Navigation */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">BrightPay</h1>
                <p className="text-xs text-muted-foreground">Good afternoon, {user?.email?.split('@')[0]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut} className="h-8 w-8 p-0">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 glass-card border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="h-6 w-6 p-0"
                >
                  {balanceVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-foreground mb-4">
                {balanceVisible ? mockBalance : '••••••'}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-emerald-50 rounded-lg p-3">
                  <p className="text-xs text-emerald-600 font-medium">Savings</p>
                  <p className="text-lg font-semibold text-emerald-700">
                    {balanceVisible ? mockSavings : '••••••'}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-600 font-medium">This Month</p>
                  <p className="text-lg font-semibold text-blue-700">
                    {balanceVisible ? mockSpending : '••••••'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 h-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs">
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </Button>
                <Button size="sm" variant="outline" className="flex-1 h-8 border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-xs">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  Request
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-gray-200">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Card key={index} className="glass-card border-0 shadow-md hover-lift cursor-pointer group">
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${
                  action.color === 'blue' ? 'from-blue-400 to-blue-500' :
                  action.color === 'emerald' ? 'from-emerald-400 to-emerald-500' :
                  action.color === 'purple' ? 'from-purple-400 to-purple-500' :
                  'from-cyan-400 to-cyan-500'
                } flex items-center justify-center group-hover:scale-110 transition-transform relative`}>
                  <action.icon className="h-5 w-5 text-white" />
                  {action.count && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 text-white">
                      {action.count}
                    </Badge>
                  )}
                </div>
                <p className="text-xs font-medium text-foreground">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transactions */}
        <Card className="glass-card border-0 shadow-lg">
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
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-all cursor-pointer group border border-gray-100/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      transaction.type === 'received' ? 'bg-emerald-100' :
                      transaction.type === 'pending' ? 'bg-orange-100' : 'bg-blue-100'
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
                        <Badge variant="secondary" className="text-xs h-4 px-1">
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
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button variant="ghost" className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <Button 
        size="icon" 
        className="fixed bottom-6 right-6 h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl glow-blue hover-scale"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Dashboard;