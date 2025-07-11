import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MobileBottomNav from '@/components/MobileBottomNav';
import { 
  ArrowLeft, QrCode, Camera, Upload, 
  Flashlight, FlashlightOff, RotateCcw
} from 'lucide-react';

const ScanPage = () => {
  const navigate = useNavigate();
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [scanning, setScanning] = useState(true);

  const mockQRCodes = [
    { id: 1, name: 'Coffee Shop', amount: '$12.50', description: 'Order #1234' },
    { id: 2, name: 'Sarah Chen', description: 'Split dinner bill' },
    { id: 3, name: 'Parking Meter', amount: '$3.00', description: 'Zone A - 2 hours' },
  ];

  const handleScanResult = (qrData: any) => {
    // Simulate QR scan result
    navigate('/send', { state: { qrData } });
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)} 
                className="h-8 w-8 p-0 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">QR Scanner</h1>
                <p className="text-sm text-gray-400">Scan to pay or receive</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFlashlightOn(!flashlightOn)}
                className="h-10 w-10 p-0 text-white hover:bg-white/10"
              >
                {flashlightOn ? <FlashlightOff className="h-5 w-5" /> : <Flashlight className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-white hover:bg-white/10"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Camera View */}
      <div className="relative h-96 bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        
        {/* Scanner Frame */}
        <div className="relative">
          <div className="w-64 h-64 border-2 border-white/30 rounded-3xl relative">
            {/* Corner indicators */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-blue-400 rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-blue-400 rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-blue-400 rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-blue-400 rounded-br-lg" />
            
            {/* Scanning line */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" 
                   style={{ 
                     animation: 'scan 2s ease-in-out infinite',
                     transform: 'translateY(120px)'
                   }} />
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-white text-lg font-medium mb-2">Position QR code in frame</p>
            <p className="text-gray-400 text-sm">The code will be scanned automatically</p>
          </div>
        </div>

        {/* Camera placeholder */}
        <div className="absolute inset-0 bg-gray-800 opacity-50 flex items-center justify-center">
          <Camera className="h-16 w-16 text-gray-600" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-4">
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 h-12 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
          <Button
            onClick={() => navigate('/send')}
            className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            <QrCode className="h-4 w-4 mr-2" />
            My QR Code
          </Button>
        </div>

        {/* Recent QR Codes */}
        <Card className="glass-card border-0 shadow-lg bg-white/95">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent QR Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockQRCodes.map((qr) => (
              <div
                key={qr.id}
                onClick={() => handleScanResult(qr)}
                className="flex items-center justify-between p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-all cursor-pointer border border-gray-100/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-lg flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{qr.name}</p>
                    <p className="text-sm text-muted-foreground">{qr.description}</p>
                  </div>
                </div>
                {qr.amount && (
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{qr.amount}</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(240px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default ScanPage;