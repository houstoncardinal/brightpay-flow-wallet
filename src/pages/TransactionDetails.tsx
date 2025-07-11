import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, MoreHorizontal, ArrowDown, ArrowUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MobileBottomNav from "@/components/MobileBottomNav";

// Mock transaction data - in a real app, this would come from an API
const mockTransactionDetails = {
  "txn-001": {
    id: "txn-001",
    type: "received",
    from: "Sarah Johnson",
    to: "You",
    amount: "+$124.50",
    status: "completed",
    category: "Personal",
    time: "2m ago",
    date: "January 15, 2025",
    fullTime: "2:34 PM",
    description: "Lunch split payment",
    transactionId: "TXN001234567890",
    paymentMethod: "Bank Account •••• 4532",
    reference: "Lunch at Café Luna",
    feeAmount: "$0.00",
    totalAmount: "$124.50"
  },
  "txn-002": {
    id: "txn-002",
    type: "sent",
    from: "You",
    to: "Mike Chen",
    amount: "-$89.20",
    status: "completed", 
    category: "Bills",
    time: "1h ago",
    date: "January 15, 2025",
    fullTime: "1:15 PM",
    description: "Utility bill payment",
    transactionId: "TXN001234567891",
    paymentMethod: "Bank Account •••• 4532",
    reference: "Electric bill - December",
    feeAmount: "$0.00",
    totalAmount: "$89.20"
  },
  "txn-003": {
    id: "txn-003",
    type: "pending",
    from: "You",
    to: "Emma Davis",
    amount: "-$45.00",
    status: "pending",
    category: "Personal",
    time: "3h ago",
    date: "January 15, 2025",
    fullTime: "11:30 AM",
    description: "Movie tickets",
    transactionId: "TXN001234567892",
    paymentMethod: "Bank Account •••• 4532",
    reference: "Cinema booking",
    feeAmount: "$0.00",
    totalAmount: "$45.00"
  }
};

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const transaction = id ? mockTransactionDetails[id as keyof typeof mockTransactionDetails] : null;

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Transaction Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested transaction could not be found.</p>
            <Button onClick={() => navigate('/')}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTransactionIcon = () => {
    if (transaction.type === 'received') {
      return <ArrowDown className="h-5 w-5 text-emerald-600" />;
    } else if (transaction.type === 'pending') {
      return <Clock className="h-5 w-5 text-orange-600" />;
    } else {
      return <ArrowUp className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusColor = () => {
    if (transaction.status === 'completed') return 'text-emerald-600';
    if (transaction.status === 'pending') return 'text-orange-600';
    return 'text-gray-600';
  };

  const getAmountColor = () => {
    if (transaction.type === 'received') return 'text-emerald-600';
    if (transaction.type === 'pending') return 'text-orange-600';
    return 'text-blue-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Transaction Details</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 pb-20 space-y-4">
        {/* Transaction Summary */}
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                transaction.type === 'received' ? 'bg-emerald-100' :
                transaction.type === 'pending' ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                {getTransactionIcon()}
              </div>
              
              <div>
                <h2 className={`text-3xl font-bold ${getAmountColor()}`}>
                  {transaction.amount}
                </h2>
                <p className="text-muted-foreground mt-1">{transaction.description}</p>
              </div>

              <Badge 
                variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                className={`${getStatusColor()} border-0`}
              >
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Transaction Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">From</span>
              <span className="font-medium">{transaction.from}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">To</span>
              <span className="font-medium">{transaction.to}</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{transaction.date}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Time</span>
              <span className="font-medium">{transaction.fullTime}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Category</span>
              <Badge variant="secondary" className="text-xs">
                {transaction.category}
              </Badge>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-sm">{transaction.transactionId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">{transaction.paymentMethod}</span>
            </div>

            {transaction.reference && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Reference</span>
                <span className="font-medium">{transaction.reference}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Amount Breakdown */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Amount Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">{transaction.amount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Fee</span>
              <span className="font-medium">{transaction.feeAmount}</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span className={getAmountColor()}>{transaction.totalAmount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}