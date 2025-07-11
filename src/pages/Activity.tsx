import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Filter, Search, Calendar, 
  ArrowUp, ArrowDown, Clock, Check, X,
  TrendingUp, TrendingDown, BarChart3, PieChart
} from 'lucide-react';

const ActivityPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');

  const transactions = [
    { 
      id: 1, 
      type: 'received', 
      amount: '+$25.00', 
      from: 'Sarah Chen', 
      time: '2:34 PM', 
      date: 'Today',
      category: 'Transfer', 
      status: 'completed',
      description: 'Lunch payment'
    },
    { 
      id: 2, 
      type: 'sent', 
      amount: '-$12.50', 
      to: 'Starbucks Coffee', 
      time: '11:45 AM', 
      date: 'Today',
      category: 'Food', 
      status: 'completed',
      description: 'Morning coffee'
    },
    { 
      id: 3, 
      type: 'received', 
      amount: '+$100.00', 
      from: 'Alex Rodriguez', 
      time: '4:20 PM', 
      date: 'Yesterday',
      category: 'Payment', 
      status: 'completed',
      description: 'Freelance work'
    },
    { 
      id: 4, 
      type: 'sent', 
      amount: '-$45.99', 
      to: 'Uber Ride', 
      time: '7:30 PM', 
      date: 'Yesterday',
      category: 'Transport', 
      status: 'completed',
      description: 'Trip to airport'
    },
    { 
      id: 5, 
      type: 'pending', 
      amount: '-$89.50', 
      to: 'Amazon', 
      time: '3:15 PM', 
      date: '2 days ago',
      category: 'Shopping', 
      status: 'pending',
      description: 'Online purchase'
    },
    { 
      id: 6, 
      type: 'received', 
      amount: '+$200.00', 
      from: 'Maria Silva', 
      time: '1:00 PM', 
      date: '3 days ago',
      category: 'Transfer', 
      status: 'completed',
      description: 'Rent split'
    },
    { 
      id: 7, 
      type: 'failed', 
      amount: '-$25.00', 
      to: 'Gas Station', 
      time: '9:45 AM', 
      date: '3 days ago',
      category: 'Transport', 
      status: 'failed',
      description: 'Payment failed - insufficient funds'
    },
  ];

  const stats = {
    totalSpent: '$1,234.56',
    totalReceived: '$2,890.12',
    pendingTransactions: 2,
    monthlyChange: '+12.3%'
  };

  const filterTransactions = (type: string) => {
    switch (type) {
      case 'sent':
        return transactions.filter(t => t.type === 'sent');
      case 'received':
        return transactions.filter(t => t.type === 'received');
      case 'pending':
        return transactions.filter(t => t.status === 'pending' || t.status === 'failed');
      default:
        return transactions;
    }
  };

  const getStatusIcon = (status: string, type: string) => {
    switch (status) {
      case 'completed':
        return type === 'received' ? 
          <ArrowDown className="h-4 w-4 text-emerald-600" /> : 
          <ArrowUp className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <Check className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string, type: string) => {
    switch (status) {
      case 'completed':
        return type === 'received' ? 'text-emerald-600' : 'text-blue-600';
      case 'pending':
        return 'text-orange-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Activity</h1>
                <p className="text-sm text-muted-foreground">Transaction history</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="glass-card border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Spent</p>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-xl font-bold text-foreground">{stats.totalSpent}</p>
              <p className="text-xs text-red-500">This month</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Received</p>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-xl font-bold text-foreground">{stats.totalReceived}</p>
              <p className="text-xs text-emerald-500">{stats.monthlyChange}</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Tabs */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-muted/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="received">Received</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              
              <TabsContent value={selectedTab} className="space-y-3">
                {filterTransactions(selectedTab).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-all cursor-pointer border border-gray-100/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.status === 'completed' ? (
                          transaction.type === 'received' ? 'bg-emerald-100' : 'bg-blue-100'
                        ) : transaction.status === 'pending' ? 'bg-orange-100' : 'bg-red-100'
                      }`}>
                        {getStatusIcon(transaction.status, transaction.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">
                            {transaction.type === 'received' ? transaction.from : transaction.to}
                          </p>
                          <Badge variant="secondary" className="text-xs h-4 px-1">
                            {transaction.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.date} • {transaction.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-semibold ${getStatusColor(transaction.status, transaction.type)}`}>
                        {transaction.amount}
                      </p>
                      <p className={`text-xs capitalize ${
                        transaction.status === 'completed' ? 'text-muted-foreground' :
                        transaction.status === 'pending' ? 'text-orange-500' : 'text-red-500'
                      }`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
                
                {filterTransactions(selectedTab).length === 0 && (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No transactions found</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityPage;