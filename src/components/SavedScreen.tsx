import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Card, CardContent } from './ui/card';
import { Bookmark, MapPin, Trash2, Share2, Star, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseclient';
import { User } from '@supabase/supabase-js';

interface SavedScreenProps {
  onNavigate: (screen: 'home' | 'explore' | 'report' | 'saved' | 'profile' | 'cultural') => void;
  isLoggedIn: boolean;
  userName: string;
  user: User | null;
  onShowLogin: () => void;
  onLogout: () => void;
}

interface SavedItem {
  icon?: any;
  service: string;
  trending?: boolean;
  location?: string;
  category?: string;
  price?: number | string;
  rating?: number | string;
  savedDate?: string;
}

export function SavedScreen({ onNavigate, isLoggedIn, userName, user, onShowLogin, onLogout }: SavedScreenProps) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchSavedItems();
    }
  }, [isLoggedIn, user]);

  const fetchSavedItems = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('saved_items')
      .select('*')
      .eq('user_id', user.id)
      .order('saved_date', { ascending: false });
    setSavedItems(data || []);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pb-20">
        <Header isLoggedIn={isLoggedIn} userName={userName} onShowLogin={onShowLogin} onNavigate={onNavigate} onLogout={onLogout} />
        <main className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-center min-h-[60vh]">
          <Card className="border-gray-200 shadow-lg p-8 text-center max-w-md">
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your saved prices and favorites.</p>
            <Button onClick={onShowLogin} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              Sign In
            </Button>
          </Card>
        </main>
        <BottomNav currentScreen="saved" onNavigate={onNavigate} isLoggedIn={isLoggedIn} onShowLogin={onShowLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Header isLoggedIn={isLoggedIn} userName={userName} onShowLogin={onShowLogin} onNavigate={onNavigate} onLogout={onLogout} />
      
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Saved Prices</h2>
            <p className="text-gray-600">Your bookmarked fair prices • {savedItems.length} items</p>
          </div>
          <Button 
            variant="outline"
            className="gap-2 rounded-xl border-gray-300 hover:bg-gray-50 font-semibold"
          >
            <Share2 className="w-4 h-4" />
            Export List
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-gray-200 bg-gradient-to-br from-orange-50 to-amber-50">
            <CardContent className="p-4 text-center">
              <Bookmark className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{savedItems.length}</p>
              <p className="text-xs text-gray-600 font-medium">Saved Items</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">₹890</p>
              <p className="text-xs text-gray-600 font-medium">Total Saved</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">4.6</p>
              <p className="text-xs text-gray-600 font-medium">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Saved Items */}
        {savedItems.length === 0 ? (
          <Card className="border-gray-200">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Saved Prices Yet</h3>
              <p className="text-gray-600 mb-6">Start saving prices from the Explore section to build your collection</p>
              <Button 
                onClick={() => onNavigate('explore')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg font-semibold"
              >
                Explore Prices
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedItems.map((item, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-xl transition-all group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                              {item.service}
                            </h4>
                            {item.trending && (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs font-semibold">
                                🔥 Trending
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {item.location}
                            </div>
                            <Badge variant="outline" className="text-xs font-medium">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Fair Price</p>
                            <p className="text-2xl font-bold text-green-600">{item.price}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold text-gray-700">{item.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full border-gray-300 hover:bg-gray-50"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Bookmark className="w-5 h-5 text-orange-600 fill-orange-600 cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-3">Saved {item.savedDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-5">
            <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                className="h-12 justify-start gap-3 bg-white border-gray-200 hover:border-orange-300 hover:bg-white font-semibold"
                onClick={() => onNavigate('explore')}
              >
                <span className="text-xl">🔍</span>
                Find More Prices
              </Button>
              <Button 
                variant="outline"
                className="h-12 justify-start gap-3 bg-white border-gray-200 hover:border-orange-300 hover:bg-white font-semibold"
              >
                <span className="text-xl">📊</span>
                View Statistics
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav currentScreen="saved" onNavigate={onNavigate} isLoggedIn={isLoggedIn} onShowLogin={onShowLogin} />
    </div>
  );
}