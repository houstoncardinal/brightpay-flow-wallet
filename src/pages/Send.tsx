import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import MobileBottomNav from '@/components/MobileBottomNav';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Search, QrCode, Users, 
  DollarSign, Send, Clock, Star, Plus, Minus,
  Sparkles, Zap, CreditCard
} from 'lucide-react';

const SendPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');

  const recentContacts = [
    { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', avatar: 'SC', lastSent: '$25.00', isOnline: true },
    { id: 2, name: 'Alex Rodriguez', email: 'alex@example.com', avatar: 'AR', lastSent: '$100.00', isOnline: false },
    { id: 3, name: 'Maria Silva', email: 'maria@example.com', avatar: 'MS', lastSent: '$50.00', isOnline: true },
    { id: 4, name: 'David Kim', email: 'david@example.com', avatar: 'DK', lastSent: '$75.00', isOnline: true },
  ];

  const quickAmounts = [
    { value: 10, label: '$10', color: 'from-blue-400 to-blue-500' },
    { value: 25, label: '$25', color: 'from-emerald-400 to-emerald-500' },
    { value: 50, label: '$50', color: 'from-purple-400 to-purple-500' },
    { value: 100, label: '$100', color: 'from-orange-400 to-orange-500' },
  ];

  const handleSend = () => {
    if (!amount || !recipient) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and recipient.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment Sent!",
      description: `Successfully sent $${amount} to ${recipient}`,
      duration: 3000,
    });
    
    navigate('/', { state: { message: `Successfully sent $${amount}!` } });
  };

  const adjustAmount = (increment: number) => {
    const currentAmount = parseFloat(amount) || 0;
    const newAmount = Math.max(0, currentAmount + increment);
    setAmount(newAmount.toString());
  };

  const formatAmount = (value: string) => {
    if (!value) return '';
    const num = parseFloat(value);
    return isNaN(num) ? '' : num.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 z-30 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)} 
              className="h-9 w-9 p-0 hover:bg-gray-100 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold gradient-text">Send Money</h1>
              <p className="text-sm text-muted-foreground">Quick and secure transfers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pb-32 space-y-6">
        {/* Enhanced Amount Input */}
        <Card className="glass-card border-0 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
          <CardHeader className="pb-4 relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                Amount to Send
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustAmount(-1)}
                  className="h-8 w-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustAmount(1)}
                  className="h-8 w-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            {/* Main Amount Display */}
            <div className="relative">
              <div className="text-center space-y-2">
                <div className="relative">
                  <DollarSign className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground/50 pointer-events-none" />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-5xl font-bold h-20 text-center bg-transparent border-0 focus:ring-0 text-gray-800 placeholder:text-gray-300"
                    style={{ fontSize: amount.length > 6 ? '2.5rem' : '3rem' }}
                  />
                </div>
                {amount && (
                  <p className="text-sm text-muted-foreground">
                    ${formatAmount(amount)} USD
                  </p>
                )}
              </div>
            </div>
            
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-3">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.value.toString())}
                  className={`h-12 text-sm font-semibold border-0 bg-gradient-to-r ${quickAmount.color} text-white hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-xl`}
                >
                  {quickAmount.label}
                </Button>
              ))}
            </div>

            {/* Balance Display */}
            <div className="flex items-center justify-center gap-2 p-3 bg-white/50 rounded-xl border border-white/20">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-muted-foreground">Available: </span>
              <span className="text-sm font-semibold text-emerald-600">$11,522.00</span>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Send To Section */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Send To
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/scan')} 
                  className="h-9 w-9 p-0 hover:bg-blue-50 rounded-xl"
                >
                  <QrCode className="h-4 w-4 text-blue-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/contacts')} 
                  className="h-9 w-9 p-0 hover:bg-emerald-50 rounded-xl"
                >
                  <Users className="h-4 w-4 text-emerald-500" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts or enter email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="pl-10 h-12 bg-white/70 border-2 focus:border-blue-400 rounded-xl"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Contacts
              </p>
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setRecipient(contact.email)}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 cursor-pointer border border-gray-100/50 hover:border-blue-200/50 hover-lift"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-emerald-400 text-white font-bold">
                          {contact.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-gray-100/50">
                      Last: {contact.lastSent}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-yellow-50"
                    >
                      <Star className="h-4 w-4 text-gray-400 hover:text-yellow-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Note Section */}
        <Card className="glass-card border-0 shadow-xl">
          <CardContent className="pt-6">
            <Label htmlFor="note" className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              Note (Optional)
            </Label>
            <Input
              id="note"
              placeholder="Add a note for this payment..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-3 h-12 bg-white/70 border-2 focus:border-purple-400 rounded-xl"
            />
          </CardContent>
        </Card>

        {/* Enhanced Send Button */}
        <div className="space-y-3">
          <Button
            onClick={handleSend}
            disabled={!amount || !recipient}
            className="w-full h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 hover:from-blue-600 hover:via-purple-600 hover:to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                <Send className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold">Send ${amount || '0.00'}</div>
                <div className="text-xs opacity-90">Instant Transfer</div>
              </div>
              <Zap className="h-5 w-5 ml-auto" />
            </div>
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Transfers are instant and secured with bank-level encryption
          </p>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Always at bottom */}
      <MobileBottomNav />
    </div>
  );
};

export default SendPage;