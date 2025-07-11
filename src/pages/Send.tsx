import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Search, QrCode, Users, 
  DollarSign, Send, Clock, Star
} from 'lucide-react';

const SendPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');

  const recentContacts = [
    { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', avatar: 'SC', lastSent: '$25.00' },
    { id: 2, name: 'Alex Rodriguez', email: 'alex@example.com', avatar: 'AR', lastSent: '$100.00' },
    { id: 3, name: 'Maria Silva', email: 'maria@example.com', avatar: 'MS', lastSent: '$50.00' },
    { id: 4, name: 'David Kim', email: 'david@example.com', avatar: 'DK', lastSent: '$75.00' },
  ];

  const quickAmounts = [10, 25, 50, 100];

  const handleSend = () => {
    // Simulate sending money
    console.log('Sending:', { amount, recipient, note });
    // Navigate back with success message
    navigate('/', { state: { message: `Successfully sent $${amount}!` } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Send Money</h1>
              <p className="text-sm text-muted-foreground">Quick and secure transfers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Amount Input */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Amount to Send</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-12 text-2xl font-bold h-16 text-center bg-white border-2 focus:border-blue-400"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="h-8 text-xs border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Send To */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center justify-between">
              Send To
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/scan')} className="h-8 w-8 p-0">
                  <QrCode className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate('/contacts')} className="h-8 w-8 p-0">
                  <Users className="h-4 w-4" />
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
                className="pl-10 bg-white border-2 focus:border-blue-400"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Recent Contacts</p>
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setRecipient(contact.email)}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-all cursor-pointer border border-gray-100/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-emerald-400 text-white font-semibold">
                        {contact.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Last: {contact.lastSent}
                    </Badge>
                    <Star className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <Label htmlFor="note" className="text-sm font-medium">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="Add a note for this payment"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 bg-white border-2 focus:border-blue-400"
            />
          </CardContent>
        </Card>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!amount || !recipient}
          className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-lg rounded-xl glow-blue hover-scale shadow-xl"
        >
          <Send className="h-5 w-5 mr-2" />
          Send ${amount || '0.00'}
        </Button>
      </div>
    </div>
  );
};

export default SendPage;