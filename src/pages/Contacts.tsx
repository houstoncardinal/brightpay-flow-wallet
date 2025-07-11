import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import MobileBottomNav from '@/components/MobileBottomNav';
import { 
  ArrowLeft, Search, Plus, Star, Send, 
  ArrowDown, MessageCircle, Phone, Mail
} from 'lucide-react';

const ContactsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    { 
      id: 1, 
      name: 'Sarah Chen', 
      email: 'sarah@example.com', 
      phone: '+1 234-567-8901',
      avatar: 'SC', 
      favorite: true,
      balance: '+$25.00',
      status: 'active',
      lastActivity: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'Alex Rodriguez', 
      email: 'alex@example.com', 
      phone: '+1 234-567-8902',
      avatar: 'AR', 
      favorite: false,
      balance: '-$15.50',
      status: 'active',
      lastActivity: '1 day ago'
    },
    { 
      id: 3, 
      name: 'Maria Silva', 
      email: 'maria@example.com', 
      phone: '+1 234-567-8903',
      avatar: 'MS', 
      favorite: true,
      balance: '+$100.00',
      status: 'pending',
      lastActivity: '3 days ago'
    },
    { 
      id: 4, 
      name: 'David Kim', 
      email: 'david@example.com', 
      phone: '+1 234-567-8904',
      avatar: 'DK', 
      favorite: false,
      balance: '$0.00',
      status: 'active',
      lastActivity: '1 week ago'
    },
    { 
      id: 5, 
      name: 'Emma Wilson', 
      email: 'emma@example.com', 
      phone: '+1 234-567-8905',
      avatar: 'EW', 
      favorite: true,
      balance: '-$75.25',
      status: 'active',
      lastActivity: '2 days ago'
    },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteContacts = filteredContacts.filter(contact => contact.favorite);
  const regularContacts = filteredContacts.filter(contact => !contact.favorite);

  const handleSendMoney = (contact: any) => {
    navigate('/send', { state: { recipient: contact.email, name: contact.name } });
  };

  const handleRequestMoney = (contact: any) => {
    navigate('/request', { state: { recipient: contact.email, name: contact.name } });
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
                <h1 className="text-xl font-bold text-foreground">Contacts</h1>
                <p className="text-sm text-muted-foreground">{contacts.length} contacts</p>
              </div>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Search */}
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-2 focus:border-blue-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Favorites */}
        {favoriteContacts.length > 0 && (
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Favorites
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {favoriteContacts.map((contact) => (
                <ContactCard 
                  key={contact.id} 
                  contact={contact} 
                  onSend={handleSendMoney}
                  onRequest={handleRequestMoney}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {/* All Contacts */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">All Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {regularContacts.map((contact) => (
              <ContactCard 
                key={contact.id} 
                contact={contact} 
                onSend={handleSendMoney}
                onRequest={handleRequestMoney}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

const ContactCard = ({ contact, onSend, onRequest }: any) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-all border border-gray-100/50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-gradient-to-r from-blue-400 to-emerald-400 text-white font-semibold">
              {contact.avatar}
            </AvatarFallback>
          </Avatar>
          {contact.favorite && (
            <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 fill-current" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">{contact.name}</p>
            <Badge 
              variant={contact.status === 'active' ? 'default' : 'secondary'}
              className="text-xs h-4"
            >
              {contact.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{contact.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className={`text-xs font-medium ${
              contact.balance.includes('+') ? 'text-emerald-600' : 
              contact.balance.includes('-') ? 'text-red-600' : 'text-gray-600'
            }`}>
              {contact.balance}
            </p>
            <span className="text-xs text-muted-foreground">• {contact.lastActivity}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onRequest(contact)}
          className="h-8 w-8 p-0 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
        >
          <ArrowDown className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          onClick={() => onSend(contact)}
          className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Send className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default ContactsPage;