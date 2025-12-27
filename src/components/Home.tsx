import { Search, MapPin, IndianRupee, AlertTriangle, BookOpen, TrendingUp, Users, Shield, Star } from 'lucide-react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PriceDetailModal } from './PriceDetailModal';
import { useState } from 'react';

interface HomeProps {
  onNavigate: (screen: 'home' | 'explore' | 'report' | 'saved' | 'profile' | 'cultural') => void;
  isLoggedIn: boolean;
  userName: string;
  onShowLogin: () => void;
  onLogout: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: (value: boolean) => void;
}

export function Home({ onNavigate, isLoggedIn, userName, onShowLogin, onLogout, isDarkMode = false }: HomeProps) {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchSuggestions = [
    { query: 'Auto rickshaw Delhi', category: 'Transport' },
    { query: 'Taxi to airport Mumbai', category: 'Transport' },
    { query: 'Street food prices', category: 'Food' },
    { query: 'Taj Mahal entry ticket', category: 'Attraction' },
    { query: 'Hotel prices Jaipur', category: 'Accommodation' },
  ];

  const features = [
    {
      icon: IndianRupee,
      title: 'Fair Prices',
      description: 'Access 10,000+ verified prices across India',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      onClick: () => onNavigate('explore'),
    },
    {
      icon: AlertTriangle,
      title: 'Report Scam',
      description: 'Help 50K+ travelers with your experience',
      color: 'from-red-500 to-rose-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      onClick: () => onNavigate('report'),
    },
    {
      icon: BookOpen,
      title: 'Travel Tips',
      description: 'Learn bargaining & cultural etiquette',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      onClick: () => onNavigate('cultural'),
    },
  ];

  const popularServices = [
    { 
      name: 'Auto Rickshaw (3km)', 
      price: '₹40-60', 
      icon: '🛺',
      location: 'Delhi',
      verified: true,
      reports: 1248,
      rating: 4.7,
      description: 'Standard auto rickshaw fare for short distances in Delhi'
    },
    { 
      name: 'Taxi to Airport (10km)', 
      price: '₹180-250', 
      icon: '🚕',
      location: 'Mumbai',
      verified: true,
      reports: 856,
      rating: 4.5,
      description: 'Prepaid taxi or app-based cab to airport'
    },
    { 
      name: 'Street Food (Chaat)', 
      price: '₹30-50', 
      icon: '🍲',
      location: 'Delhi',
      verified: true,
      reports: 2341,
      rating: 4.9,
      description: 'Delicious street food at popular locations'
    },
    { 
      name: 'Museum Entry', 
      price: '₹100-500', 
      icon: '🏛️',
      location: 'Jaipur',
      verified: true,
      reports: 542,
      rating: 4.6,
      description: 'Entry fees for major museums and heritage sites'
    },
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: Shield, value: '10K+', label: 'Verified Prices' },
    { icon: Star, value: '4.8', label: 'App Rating' },
  ];

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    alert(`Searching for: ${query}`);
    // In a real app, this would filter results
  };

  return (
    <div className="min-h-screen pb-24">
      <Header isLoggedIn={isLoggedIn} userName={userName} onShowLogin={onShowLogin} onNavigate={onNavigate} onLogout={onLogout} isDarkMode={isDarkMode} />
      
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Never Overpay Again
            </h2>
            <p className="text-orange-100 text-base sm:text-lg mb-4 sm:mb-6">
              Community-powered fair pricing across India
            </p>
            
            {/* Search Bar with Suggestions */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-20" />
              <Input
                placeholder="Search prices (e.g., Taxi to Taj Mahal)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 2);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery) {
                    handleSearch(searchQuery);
                  }
                }}
                className="pl-10 sm:pl-12 pr-20 sm:pr-24 h-12 sm:h-14 text-sm sm:text-base bg-white border-0 shadow-xl rounded-xl focus:ring-2 focus:ring-white relative z-10"
              />
              <button 
                onClick={() => searchQuery && handleSearch(searchQuery)}
                className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg z-20"
              >
                Search
              </button>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        </div>

        {/* Search Suggestions Dropdown - Moved outside hero section */}
        {showSuggestions && (
          <div className="relative -mt-2 max-w-2xl">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border overflow-hidden z-50`}>
              <div className="p-2">
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-semibold px-3 py-2`}>Popular Searches</p>
                {searchSuggestions
                  .filter(s => s.query.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion.query)}
                      className={`w-full text-left px-3 py-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-orange-50'} rounded-lg transition-colors flex items-center justify-between group`}
                    >
                      <div className="flex items-center gap-3">
                        <Search className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'} font-medium`}>{suggestion.query}</span>
                      </div>
                      <Badge className={`${isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-600 border-gray-200'} text-xs ${isDarkMode ? 'group-hover:bg-orange-900 group-hover:text-orange-200 group-hover:border-orange-800' : 'group-hover:bg-orange-100 group-hover:text-orange-700 group-hover:border-orange-200'}`}>
                        {suggestion.category}
                      </Badge>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Location Indicator */}
        <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm border border-gray-200">
          <MapPin className="w-5 h-5 text-orange-600" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Current Location</p>
            <p className="font-semibold text-gray-900">Connaught Place, New Delhi</p>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold">
            📍 Active
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-3 sm:p-4 text-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Cards */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200 group overflow-hidden"
                  onClick={feature.onClick}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                      <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                    <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      <span>Learn More</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Popular Prices */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Popular Prices in Your Area</h3>
            <button 
              onClick={() => onNavigate('explore')}
              className="text-orange-600 font-semibold text-sm hover:text-orange-700"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularServices.map((item, index) => (
              <Card 
                key={index} 
                className="border-gray-200 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => handleServiceClick(item)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">📍 {item.location}</p>
                        </div>
                        {item.verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs font-semibold">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-2xl font-bold text-green-600">{item.price}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.reports} reports</p>
                        </div>
                        <button 
                          className="text-orange-600 font-semibold text-sm hover:text-orange-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceClick(item);
                          }}
                        >
                          Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-orange-600" />
              <h4 className="font-bold text-gray-900 text-lg">Community Verified</h4>
            </div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              All prices are verified by real travelers like you. Join our community of 50,000+ users helping each other travel smarter.
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNav currentScreen="home" onNavigate={onNavigate} isDarkMode={isDarkMode} />
      
      {/* Price Detail Modal */}
      {selectedService && (
        <PriceDetailModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
          isDarkMode={isDarkMode}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}