import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { User, Flag, Award, Settings, LogOut, Bell, Shield, HelpCircle, Star, TrendingUp, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { SettingsModal } from './SettingsModal';
import { useState } from 'react';

interface ProfileScreenProps {
  onNavigate: (screen: 'home' | 'explore' | 'report' | 'saved' | 'profile' | 'cultural') => void;
  isLoggedIn: boolean;
  userName: string;
  onShowLogin: () => void;
  onLogout: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: (value: boolean) => void;
}

export function ProfileScreen({ onNavigate, isLoggedIn, userName, onShowLogin, onLogout, isDarkMode = false, onToggleDarkMode }: ProfileScreenProps) {
  const [settingsModal, setSettingsModal] = useState<'notifications' | 'preferences' | 'privacy' | 'help' | null>(null);
  
  const achievements = [
    { name: 'First Reporter', icon: '🎯', unlocked: true },
    { name: 'Helpful Guide', icon: '⭐', unlocked: true },
    { name: 'Price Master', icon: '💎', unlocked: false },
    { name: 'Community Hero', icon: '🏆', unlocked: false },
  ];

  const recentActivity = [
    { action: 'Reported overcharging', location: 'Taj Mahal, Agra', points: 10, time: '2 hours ago' },
    { action: 'Saved fair price', location: 'Auto Rickshaw, Delhi', points: 5, time: '1 day ago' },
    { action: 'Verified price', location: 'Street Food, Mumbai', points: 15, time: '3 days ago' },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Header isLoggedIn={isLoggedIn} userName={userName} onShowLogin={onShowLogin} onNavigate={onNavigate} onLogout={onLogout} />
      
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="border-gray-200 shadow-lg overflow-hidden">
          <div className="h-20 sm:h-24 bg-gradient-to-r from-orange-500 to-orange-600"></div>
          <CardContent className="p-4 sm:p-6 -mt-10 sm:-mt-12">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="flex-1 mt-0 sm:mt-12 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{isLoggedIn ? userName : 'Guest User'}</h3>
                  <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold w-fit">
                    Level 3
                  </Badge>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">Member since November 2024 • Delhi, India</p>
                {!isLoggedIn && (
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg font-semibold w-full sm:w-auto" onClick={onShowLogin}>
                    Create Account & Save Progress
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <Card className="border-gray-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-50 to-amber-50">
            <CardContent className="p-3 sm:p-5 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">12</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Reports Filed</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-3 sm:p-5 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">350</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Points Earned</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-3 sm:p-5 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">4.8</p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Trust Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-bold text-xl text-gray-900">Achievements</h4>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 font-semibold">
                2 of 4 Unlocked
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-center transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200'
                      : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <p className={`text-sm font-semibold ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </p>
                  {achievement.unlocked && (
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs mt-2 font-semibold">
                      ✓ Unlocked
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-gray-200 shadow-md">
          <CardContent className="p-6">
            <h4 className="font-bold text-xl text-gray-900 mb-5">Recent Activity</h4>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold mb-1">
                      +{activity.points} pts
                    </Badge>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings Menu */}
        <Card className="border-gray-200 shadow-md">
          <CardContent className="p-6 space-y-2">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Settings</h4>
            
            <Button variant="ghost" className="w-full justify-start gap-4 h-14 hover:bg-orange-50 font-semibold" onClick={() => setSettingsModal('notifications')}>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <span>Notifications</span>
              <Badge className="ml-auto bg-orange-100 text-orange-700 border-orange-200 font-semibold">
                New
              </Badge>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-4 h-14 hover:bg-orange-50 font-semibold" onClick={() => setSettingsModal('preferences')}>
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <span>Preferences</span>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-4 h-14 hover:bg-orange-50 font-semibold" onClick={() => setSettingsModal('privacy')}>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <span>Privacy & Security</span>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-4 h-14 hover:bg-orange-50 font-semibold" onClick={() => setSettingsModal('help')}>
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <span>Help & Support</span>
            </Button>
            
            <div className="pt-4 border-t border-gray-200 mt-4">
              {isLoggedIn && (
                <Button variant="ghost" className="w-full justify-start gap-4 h-14 hover:bg-red-50 text-red-600 font-semibold" onClick={onLogout}>
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <span>Logout</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">About Fair Travel India</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Community-driven platform ensuring fair pricing for travelers across India. 
                  Join 50,000+ users helping each other travel smarter and avoid scams.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Version 2.1.0</span>
                  <span>•</span>
                  <a href="#" className="text-orange-600 font-semibold hover:text-orange-700">Terms</a>
                  <span>•</span>
                  <a href="#" className="text-orange-600 font-semibold hover:text-orange-700">Privacy</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav currentScreen="profile" onNavigate={onNavigate} />
      
      {settingsModal && (
        <SettingsModal
          type={settingsModal}
          isOpen={!!settingsModal}
          onClose={() => setSettingsModal(null)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
      )}
    </div>
  );
}