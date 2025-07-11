import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MobileBottomNav from '@/components/MobileBottomNav';
import { 
  ArrowLeft, DollarSign, ArrowDown, 
  QrCode, Share, Copy, Clock
} from 'lucide-react';

const RequestPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [recipient, setRecipient] = useState('');

  const quickAmounts = [20, 50, 100, 200];
  const quickReasons = ['Lunch', 'Gas', 'Rent', 'Utilities'];

  const handleCreateRequest = () => {
    // Simulate creating a payment request
    console.log('Creating request:', { amount, reason, recipient });
    navigate('/', { state: { message: `Payment request for $${amount} created!` } });
  };

  const mockRequestURL = `brightpay.app/pay/${Math.random().toString(36).substr(2, 9)}`;

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
              <h1 className="text-xl font-bold text-foreground">Request Money</h1>
              <p className="text-sm text-muted-foreground">Create a payment request</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* Amount Input */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Request Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-12 text-2xl font-bold h-16 text-center bg-white border-2 focus:border-emerald-400"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="h-8 text-xs border-gray-200 hover:border-emerald-400 hover:bg-emerald-50"
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reason */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">What's this for?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter reason for payment request"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-white border-2 focus:border-emerald-400"
            />
            
            <div className="grid grid-cols-2 gap-2">
              {quickReasons.map((quickReason) => (
                <Button
                  key={quickReason}
                  variant="outline"
                  size="sm"
                  onClick={() => setReason(quickReason)}
                  className="h-8 text-xs border-gray-200 hover:border-emerald-400 hover:bg-emerald-50"
                >
                  {quickReason}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Request From (Optional) */}
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <Label htmlFor="recipient" className="text-sm font-medium">Request from (Optional)</Label>
            <Input
              id="recipient"
              placeholder="Enter email or phone number"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="mt-2 bg-white border-2 focus:border-emerald-400"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Leave empty to create a shareable link that anyone can pay
            </p>
          </CardContent>
        </Card>

        {/* Preview */}
        {amount && (
          <Card className="glass-card border-0 shadow-lg border-emerald-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-emerald-700">Request Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-emerald-50 rounded-xl">
                <ArrowDown className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-emerald-700 mb-2">${amount}</p>
                <p className="text-emerald-600 font-medium">{reason || 'Payment Request'}</p>
                {recipient && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-emerald-200 text-emerald-700 text-xs">
                        {recipient.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-emerald-600">to {recipient}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Shareable Link:</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono bg-white p-2 rounded border flex-1 text-blue-600">
                    {mockRequestURL}
                  </p>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleCreateRequest}
            disabled={!amount}
            className="w-full h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-lg rounded-xl glow-green hover-scale shadow-xl"
          >
            <ArrowDown className="h-5 w-5 mr-2" />
            Create Request
          </Button>
          
          {amount && (
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Show QR Code
              </Button>
              <Button
                variant="outline"
                className="h-12 border-2 border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <Share className="h-4 w-4 mr-2" />
                Share Link
              </Button>
            </div>
          )}
        </div>

        {/* Recent Requests */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Recent Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/60 border border-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">$50.00 - Dinner split</p>
                  <p className="text-sm text-muted-foreground">Sent to Alex Rodriguez • 2 hours ago</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-orange-600 border-orange-200">
                Pending
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/60 border border-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <ArrowDown className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">$25.00 - Gas money</p>
                  <p className="text-sm text-muted-foreground">From Sarah Chen • Yesterday</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200">
                Paid
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default RequestPage;