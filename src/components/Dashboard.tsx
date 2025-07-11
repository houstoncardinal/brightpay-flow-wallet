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
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={signOut}
          className="border-primary/30 hover:border-primary"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="glass border-primary/20 neon-glow mb-8">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-sm text-muted-foreground">Total Balance</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-foreground mb-4 animate-fade-in">
            {mockBalance}
          </div>
          <div className="flex gap-2 justify-center">
            <Button className="flex-1 max-w-32 neon-glow">
              <ArrowUp className="h-4 w-4 mr-2" />
              Send
            </Button>
            <Button variant="secondary" className="flex-1 max-w-32 neon-glow-purple">
              <ArrowDown className="h-4 w-4 mr-2" />
              Request
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="glass border-accent/20 hover:border-accent transition-colors cursor-pointer group">
          <CardContent className="p-4 text-center">
            <QrCode className="h-8 w-8 mx-auto mb-2 text-accent group-hover:animate-float" />
            <p className="text-sm font-medium">QR Pay</p>
          </CardContent>
        </Card>
        <Card className="glass border-secondary/20 hover:border-secondary transition-colors cursor-pointer group">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-secondary group-hover:animate-float" />
            <p className="text-sm font-medium">Contacts</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="glass border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Activity
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${transaction.type === 'received' ? 'bg-accent/20' : 'bg-secondary/20'}`}>
                  {transaction.type === 'received' ? (
                    <ArrowDown className="h-4 w-4 text-accent" />
                  ) : (
                    <ArrowUp className="h-4 w-4 text-secondary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.type === 'received' ? transaction.from : transaction.to}
                  </p>
                  <p className="text-sm text-muted-foreground">{transaction.time}</p>
                </div>
              </div>
              <p className={`font-semibold ${transaction.type === 'received' ? 'text-accent' : 'text-secondary'}`}>
                {transaction.amount}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <Button 
        size="icon" 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full neon-glow animate-glow-pulse"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Dashboard;