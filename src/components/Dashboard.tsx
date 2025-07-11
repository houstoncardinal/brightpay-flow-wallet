import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Plus, QrCode, Users, CreditCard, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const mockBalance = "$2,847.50";
  const mockTransactions = [
    { id: 1, type: 'received', amount: '+$25.00', from: 'Sarah Chen', time: '2 hours ago' },
    { id: 2, type: 'sent', amount: '-$12.50', to: 'Coffee Shop', time: '1 day ago' },
    { id: 3, type: 'received', amount: '+$100.00', from: 'Alex Rodriguez', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Good morning 👋</h1>
          <p className="text-muted-foreground text-lg">{user?.email}</p>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={signOut}
          className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all hover-scale h-12 w-12"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="glass-card border-0 shadow-xl mb-8 hover-lift animate-slide-up">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg text-muted-foreground font-medium">Total Balance</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-5xl font-bold text-foreground mb-6 animate-bounce-soft">
            {mockBalance}
          </div>
          <div className="flex gap-4 justify-center">
            <Button className="flex-1 max-w-40 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl glow-blue hover-scale shadow-lg">
              <ArrowUp className="h-5 w-5 mr-2" />
              Send Money
            </Button>
            <Button className="flex-1 max-w-40 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-xl glow-green hover-scale shadow-lg">
              <ArrowDown className="h-5 w-5 mr-2" />
              Request
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card className="glass-card border-0 shadow-lg hover-lift hover-glow cursor-pointer group animate-slide-in">
          <CardContent className="p-6 text-center">
            <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
              <QrCode className="h-8 w-8 text-white mx-auto" />
            </div>
            <p className="font-semibold text-foreground">QR Scanner</p>
            <p className="text-sm text-muted-foreground mt-1">Quick payments</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-0 shadow-lg hover-lift hover-glow cursor-pointer group animate-slide-in">
          <CardContent className="p-6 text-center">
            <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8 text-white mx-auto" />
            </div>
            <p className="font-semibold text-foreground">Contacts</p>
            <p className="text-sm text-muted-foreground mt-1">Send to friends</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="glass-card border-0 shadow-xl animate-fade-in">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-xl">
            <span className="text-foreground">Recent Activity</span>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockTransactions.map((transaction, index) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-4 rounded-xl bg-white/80 hover:bg-white transition-all hover-lift cursor-pointer border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${transaction.type === 'received' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                  {transaction.type === 'received' ? (
                    <ArrowDown className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <ArrowUp className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-base">
                    {transaction.type === 'received' ? transaction.from : transaction.to}
                  </p>
                  <p className="text-sm text-muted-foreground">{transaction.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${transaction.type === 'received' ? 'text-emerald-600' : 'text-blue-600'}`}>
                  {transaction.amount}
                </p>
                <p className="text-xs text-muted-foreground">
                  {transaction.type === 'received' ? 'Received' : 'Sent'}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <Button 
        size="icon" 
        className="fixed bottom-8 right-8 h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-2xl glow-blue hover-scale animate-bounce-soft"
      >
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default Dashboard;