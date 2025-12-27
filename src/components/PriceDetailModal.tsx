import { X, Star, Users, TrendingUp, MapPin, Clock, CheckCircle, AlertTriangle, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface PriceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    service: string;
    price: string;
    reports: number;
    rating: number;
    avgPrice: number;
    icon: string;
    verified: boolean;
  };
  isDarkMode?: boolean;
  onNavigate?: (screen: 'home' | 'explore' | 'report' | 'saved' | 'profile' | 'cultural') => void;
}

export function PriceDetailModal({ isOpen, onClose, service, isDarkMode = false, onNavigate }: PriceDetailModalProps) {
  if (!isOpen) return null;

  const reviews = [
    { user: 'Raj Kumar', rating: 5, comment: 'Fair pricing, driver was honest and used meter', time: '2 days ago', verified: true },
    { user: 'Sarah M.', rating: 4, comment: 'Slightly higher at peak hours but reasonable', time: '5 days ago', verified: true },
    { user: 'Amit Patel', rating: 5, comment: 'Exactly as expected, no haggling needed', time: '1 week ago', verified: true },
  ];

  const priceBreakdown = [
    { item: 'Base Fare', amount: '₹30' },
    { item: 'Distance (3km @ ₹12/km)', amount: '₹36' },
    { item: 'Time Charge', amount: '₹10' },
    { item: 'Waiting (if any)', amount: '₹0-20' },
  ];

  const tips = [
    'Always ask the driver to use the meter before starting',
    'Night charges (10 PM - 5 AM) are usually 25% extra',
    'Some drivers may refuse short distances - it\'s illegal but common',
    'Keep small change ready, many drivers claim they don\'t have change',
  ];

  const priceHistory = [
    { month: 'Nov', min: 38, avg: 50, max: 62 },
    { month: 'Oct', min: 35, avg: 48, max: 60 },
    { month: 'Sep', min: 38, avg: 50, max: 65 },
    { month: 'Aug', min: 40, avg: 52, max: 65 },
  ];

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div 
        className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 p-6 relative z-10 rounded-t-2xl">
          {/* Close Button - More Prominent */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:scale-110 z-50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-orange-600 font-bold" strokeWidth={3} />
          </button>
          
          <div className="flex items-start gap-4 pr-12">
            <div className="text-6xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{service.icon}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">{service.service}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Star Rating - Enhanced Visibility */}
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-md">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 drop-shadow" strokeWidth={2} />
                  <span className="text-gray-900 font-bold text-base">{service.rating}</span>
                </div>
                
                {/* Users - Enhanced Visibility */}
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-md">
                  <Users className="w-5 h-5 text-orange-600 drop-shadow" strokeWidth={2} />
                  <span className="text-gray-900 font-bold text-base">{service.reports} reports</span>
                </div>
                
                {service.verified && (
                  <Badge className="bg-green-500 text-white border-0 px-3 py-2 text-sm font-bold shadow-md">
                    <CheckCircle className="w-4 h-4 mr-1" strokeWidth={2.5} />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`p-6 space-y-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          {/* Price Range */}
          <Card className={`${isDarkMode ? 'border-green-800 bg-gradient-to-br from-green-950 to-emerald-950' : 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'}`}>
            <CardContent className="p-6">
              <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
                <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                Fair Price Range
              </h3>
              <div className="text-center mb-4">
                <p className={`text-5xl font-bold ${isDarkMode ? 'text-green-400' : 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'}`}>
                  {service.price}
                </p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Average: ₹{service.avgPrice}</p>
              </div>
              <div className={`flex items-center justify-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Clock className="w-4 h-4" />
                <span>Updated 2 hours ago</span>
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-3 flex items-center gap-2`}>
              <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              Typical Price Breakdown
            </h3>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4 space-y-2`}>
              {priceBreakdown.map((item, index) => (
                <div key={index} className={`flex items-center justify-between py-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} last:border-0`}>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{item.item}</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{item.amount}</span>
                </div>
              ))}
              <div className={`flex items-center justify-between pt-3 border-t-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                <span className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Total Estimate</span>
                <span className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} text-lg`}>{service.price}</span>
              </div>
            </div>
          </div>

          {/* Price History */}
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-3`}>4-Month Price Trend</h3>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4`}>
              <div className="space-y-3">
                {priceHistory.map((month, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} w-12`}>{month.month}</span>
                    <div className={`flex-1 relative h-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div 
                        className={`absolute h-full ${isDarkMode ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-green-400 to-green-500'} rounded-full`}
                        style={{ left: '20%', width: '60%' }}
                      ></div>
                    </div>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} w-24`}>₹{month.min}-₹{month.max}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-3 flex items-center gap-2`}>
              <AlertTriangle className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              Important Tips
            </h3>
            <div className="space-y-2">
              {tips.map((tip, index) => (
                <div key={index} className={`flex items-start gap-3 ${isDarkMode ? 'bg-orange-950 border border-orange-900' : 'bg-orange-50'} p-3 rounded-lg`}>
                  <span className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'} font-bold`}>•</span>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-3 flex items-center gap-2`}>
              <MessageSquare className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              Recent Community Reviews
            </h3>
            <div className="space-y-3">
              {reviews.map((review, index) => (
                <div key={index} className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'} p-4 rounded-xl`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{review.user}</p>
                        {review.verified && (
                          <Badge className={`${isDarkMode ? 'bg-green-900 text-green-300 border-green-800' : 'bg-green-100 text-green-700 border-green-200'} text-xs`}>
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{review.time}</span>
                  </div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{review.comment}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className={`flex items-center gap-1 text-sm ${isDarkMode ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-600'} transition-colors`}>
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful (12)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className={`flex-1 h-12 rounded-xl ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} font-semibold`}
            >
              Save for Later
            </Button>
            <Button 
              onClick={() => {
                onClose();
                if (onNavigate) {
                  onNavigate('report');
                }
              }}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg font-semibold text-white"
            >
              Report Different Price
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}