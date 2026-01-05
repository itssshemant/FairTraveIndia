import { useState } from 'react';
import { X, Bell, Settings, Shield, HelpCircle, ChevronRight, Globe, Moon, Volume2, Lock, Eye, Trash2, Mail, MessageSquare, Key } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { supabase } from '../lib/supabaseclient';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'notifications' | 'preferences' | 'privacy' | 'help';
  isDarkMode?: boolean;
  onToggleDarkMode?: (value: boolean) => void;
}

export function SettingsModal({ isOpen, onClose, type, isDarkMode, onToggleDarkMode }: SettingsModalProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(false);
  
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('INR (₹)');
  const [darkMode, setDarkMode] = useState(isDarkMode || false);
  const [soundEffects, setSoundEffects] = useState(true);
  
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showActivity, setShowActivity] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (!isOpen) return null;

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordError('');
      setShowPasswordChange(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Password updated successfully');
    } catch (error: any) {
      setPasswordError(error.message);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'notifications': return 'Notification Preferences';
      case 'preferences': return 'App Preferences';
      case 'privacy': return 'Privacy & Security';
      case 'help': return 'Help & Support';
      default: return 'Settings';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'notifications': return <Bell className="w-7 h-7" strokeWidth={2.5} />;
      case 'preferences': return <Settings className="w-7 h-7" strokeWidth={2.5} />;
      case 'privacy': return <Shield className="w-7 h-7" strokeWidth={2.5} />;
      case 'help': return <HelpCircle className="w-7 h-7" strokeWidth={2.5} />;
      default: return <Settings className="w-7 h-7" strokeWidth={2.5} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'notifications': return 'from-blue-500 to-blue-600';
      case 'preferences': return 'from-purple-500 to-purple-600';
      case 'privacy': return 'from-green-500 to-green-600';
      case 'help': return 'from-amber-500 to-amber-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getColorValue = () => {
    switch (type) {
      case 'notifications': return '#3b82f6';
      case 'preferences': return '#a855f7';
      case 'privacy': return '#22c55e';
      case 'help': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-gray-700">
                Manage how and when you receive notifications from Fair Travel India.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive alerts on your device</p>
                  </div>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`w-12 h-7 rounded-full transition-colors ${pushNotifications ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${pushNotifications ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Get updates via email</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-12 h-7 rounded-full transition-colors ${emailNotifications ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💰</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Price Alerts</p>
                    <p className="text-sm text-gray-600">Notify when prices change</p>
                  </div>
                </div>
                <button
                  onClick={() => setPriceAlerts(!priceAlerts)}
                  className={`w-12 h-7 rounded-full transition-colors ${priceAlerts ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${priceAlerts ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Community Updates</p>
                    <p className="text-sm text-gray-600">News and tips from community</p>
                  </div>
                </div>
                <button
                  onClick={() => setCommunityUpdates(!communityUpdates)}
                  className={`w-12 h-7 rounded-full transition-colors ${communityUpdates ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${communityUpdates ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-xl">
              <p className="text-sm text-gray-700">
                Customize your app experience with these preferences.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Language</p>
                    <p className="text-sm text-gray-600">Select your preferred language</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  aria-label="Select language"
                >
                  <option>English</option>
                  <option>हिंदी (Hindi)</option>
                  <option>தமிழ் (Tamil)</option>
                  <option>বাংলা (Bengali)</option>
                  <option>मराठी (Marathi)</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">₹</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Currency</p>
                    <p className="text-sm text-gray-600">Display prices in</p>
                  </div>
                </div>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  aria-label="Select currency"
                >
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Moon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-600">Use dark theme</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                    if (onToggleDarkMode) onToggleDarkMode(!darkMode);
                  }}
                  className={`w-12 h-7 rounded-full transition-colors ${darkMode ? 'bg-indigo-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sound Effects</p>
                    <p className="text-sm text-gray-600">Play sounds for actions</p>
                  </div>
                </div>
                <button
                  onClick={() => setSoundEffects(!soundEffects)}
                  className={`w-12 h-7 rounded-full transition-colors ${soundEffects ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${soundEffects ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-700">
                Control your privacy and how your data is used.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                </div>
                {!showPasswordChange ? (
                  <Button onClick={() => setShowPasswordChange(true)} className="w-full bg-blue-500 hover:bg-blue-600">
                    Change Password
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    <div className="flex gap-2">
                      <Button onClick={handlePasswordChange} className="flex-1 bg-blue-500 hover:bg-blue-600">
                        Update Password
                      </Button>
                      <Button onClick={() => { setShowPasswordChange(false); setPasswordError(''); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }} variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Profile Visibility</p>
                    <p className="text-sm text-gray-600">Who can see your profile</p>
                  </div>
                </div>
                <select
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                  aria-label="Select profile visibility"
                >
                  <option value="public">Public - Everyone</option>
                  <option value="community">Community Only</option>
                  <option value="private">Private - Only Me</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Show Activity</p>
                    <p className="text-sm text-gray-600">Display your recent activity</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowActivity(!showActivity)}
                  className={`w-12 h-7 rounded-full transition-colors ${showActivity ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${showActivity ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Data Collection</p>
                    <p className="text-sm text-gray-600">Help improve the app</p>
                  </div>
                </div>
                <button
                  onClick={() => setDataCollection(!dataCollection)}
                  className={`w-12 h-7 rounded-full transition-colors ${dataCollection ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${dataCollection ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors border-2 border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-red-600">Delete Account</p>
                    <p className="text-sm text-red-500">Permanently delete your data</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-xl">
              <p className="text-sm text-gray-700">
                Get help and support for using Fair Travel India.
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📖</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">User Guide</p>
                    <p className="text-sm text-gray-600">Learn how to use the app</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">❓</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">FAQs</p>
                    <p className="text-sm text-gray-600">Frequently asked questions</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💬</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Contact Support</p>
                    <p className="text-sm text-gray-600">Get in touch with our team</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🐛</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Report a Bug</p>
                    <p className="text-sm text-gray-600">Help us improve the app</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">ℹ️</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">About App</p>
                    <p className="text-sm text-gray-600">Version 2.1.0</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
        className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl w-full max-w-2xl my-8 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 bg-gradient-to-r ${getColor()} p-6 relative z-10 rounded-t-2xl`}>
          {/* Close Button - More Prominent */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:scale-110 z-50"
            aria-label="Close settings"
          >
            <X className="w-6 h-6 font-bold" style={{ color: getColorValue() }} strokeWidth={3} />
          </button>
          <div className="flex items-center gap-3 pr-12">
            {/* Left Icon - Better Contrast */}
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
              <div style={{ color: getColorValue(), filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
                {getIcon()}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-md">{getTitle()}</h2>
              <p className="text-white text-opacity-90 text-sm">Manage your settings</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
          
          {/* Save Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              onClick={onClose}
              className={`w-full h-12 rounded-xl bg-gradient-to-r ${getColor()} hover:opacity-90 shadow-lg font-semibold`}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}