/* eslint-disable */
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { User, Flag, Award, Settings, LogOut, Bell, Shield, HelpCircle, Star, TrendingUp, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { SettingsModal } from './SettingsModal';
import { useState, useEffect } from 'react';
import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabaseclient';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface Achievement {
  name: string;
  icon: string;
  condition: string;
  unlocked: boolean;
}

interface Profile {
  id: string;
  trust_score: number;
  achievements: Achievement[];
  display_name?: string;
  profile_picture?: string;
  reports_count?: number;
  points?: number;
}

interface Report {
  location: string;
  price: number;
  created_at: string;
}

interface ProfileScreenProps {
  onNavigate: (screen: 'home' | 'explore' | 'report' | 'saved' | 'profile' | 'cultural') => void;
  isLoggedIn: boolean;
  userName: string;
  user: SupabaseUser | null;
  onShowLogin: () => void;
  onLogout: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: (value: boolean) => void;
}

export function ProfileScreen({ onNavigate, isLoggedIn, userName, user, onShowLogin, onLogout, isDarkMode = false, onToggleDarkMode }: ProfileScreenProps) {
  const [settingsModal, setSettingsModal] = useState<'notifications' | 'preferences' | 'privacy' | 'help' | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recentActivity, setRecentActivity] = useState<Report[]>([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [originalDisplayName, setOriginalDisplayName] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
  const [isUploadingPic, setIsUploadingPic] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchProfile();
      fetchRecentActivity();
    }
  }, [isLoggedIn, user]);
  

  const uploadProfilePicture = async (file: File) => {
    if (!user) return;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      const msg = 'Missing Supabase credentials (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).';
      console.error('[ProfileScreen]', msg);
      setUploadError(msg);
      setIsUploadingPic(false);
      return;
    }

    setUploadError(null);
    setIsUploadingPic(true);
    setUploadError(null);

    setTimeout(() => {
      setIsUploadingPic(false);
    }, 15000);


    if (!file || !file.type.startsWith('image/')) {
      setUploadError('Invalid file type');
      setIsUploadingPic(false);
      return;
    }
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // 1️⃣ Upload to storage
      let uploadResult: any;
      try {
        uploadResult = await supabase.storage
          .from('profile-pictures')
          .upload(filePath, file, {
            upsert: true,
            contentType: file.type,
          });
      } catch (e) {
        console.error('[ProfileScreen] storage.upload threw:', e);
        throw e;
      }

      console.log('[ProfileScreen] storage.upload response:', uploadResult);

      if (uploadResult?.error) {
        console.error('[ProfileScreen] upload error object:', uploadResult.error);
        throw uploadResult.error;
      }

      // 2️⃣ Save path in profiles table — use upsert so row exists
      const { data: dbData, error: dbError } = await supabase
        .from('profiles')
        .upsert({ id: user.id, profile_picture: filePath }, { returning: 'minimal' });

      console.log('[ProfileScreen] profiles.upsert response:', { dbData, dbError });

      if (dbError) {
        console.error('[ProfileScreen] profiles upsert error:', dbError);
        throw dbError;
      }

      // 3️⃣ Get public URL (getPublicUrl doesn't return `error`)
      const { data: urlData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath as string);

      console.log('[ProfileScreen] getPublicUrl response:', { urlData });

      setProfilePicture(urlData?.publicUrl);

      // refresh profile so DB value persists in UI
      try {
        await fetchProfile();
      } catch (e) {
        console.warn('Failed to refresh profile after upload', e);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setUploadError((err as any)?.message || 'Failed to upload image');
    } finally {
      setIsUploadingPic(false);
    }
  };

  const updateDisplayName = async () => {
    if (!user) return;
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      const msg = 'Missing Supabase credentials (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).';
      console.error('[ProfileScreen]', msg);
      setNameError(msg);
      return;
    }
    setIsSavingName(true);
    setNameError(null);
    try {
      console.log('[ProfileScreen] updating display_name ->', displayName);
      // Use upsert so the profile row is created if missing.
      const { data, error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, display_name: displayName }, { returning: 'representation' });

      console.log('[ProfileScreen] upsert response:', { data, error });

      if (error) {
        setNameError((error as any)?.message || 'Failed to update display name');
        return;
      }

      setIsEditingName(false);
      setOriginalDisplayName(displayName);
      await fetchProfile();
    } catch (error: any) {
      console.error('Error updating display name:', error);
      setNameError(error?.message || 'Error updating display name');
    } finally {
      setIsSavingName(false);
    }
  };

  const fetchRecentActivity = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('reports')
      .select('location, price, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);
    setRecentActivity(data || []);
  };

  const fetchProfile = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('id, display_name, profile_picture, trust_score, points, reports_count, achievements, created_at')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setProfile(data);
    setDisplayName(data.display_name || user.email || 'User');
    setOriginalDisplayName(data.display_name || user.email || 'User');

    if (data.profile_picture) {
      const { data: urlData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(data.profile_picture);

      setProfilePicture(urlData.publicUrl);
    } else {
      setProfilePicture(undefined);
    }
  };

  const removeProfilePicture = async () => {
    if (!user) return;
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_picture: null })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error removing profile picture:', updateError);
        alert('Failed to remove profile picture');
        return;
      }

      setProfilePicture(undefined);
      fetchProfile();
    } catch (error) {
      console.error('Error removing profile picture:', error);
      alert('Error removing profile picture');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header isLoggedIn={isLoggedIn} userName={userName} onShowLogin={onShowLogin} onNavigate={onNavigate} onLogout={onLogout} />
      {!isLoggedIn ? (
        <main className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-center min-h-[60vh]">
          <Card className="border-gray-200 shadow-lg p-8 text-center max-w-md">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your profile and manage your account.</p>
            <Button onClick={onShowLogin} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              Sign In
            </Button>
          </Card>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Profile Header */}
          <Card className="border-gray-200 shadow-lg overflow-hidden">
            <div className="h-20 sm:h-24 bg-gradient-to-r from-orange-500 to-orange-600"></div>
            <CardContent className="p-4 sm:p-6 -mt-10 sm:-mt-12 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gray-200 flex items-center justify-center group shadow-lg border-4 border-white -mt-12 sm:-mt-16">
                {isUploadingPic ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-orange-600 font-semibold">Uploading...</span>
                  </div>
                ) : uploadError ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-red-600 font-semibold">{uploadError}</span>
                  </div>
                ) : profilePicture ? (
                  <>
                    <img src={profilePicture} alt="Profile" className="w-full h-full rounded-2xl object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 rounded-2xl transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => document.getElementById('profile-pic-input')?.click()}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-2 border-white hover:scale-105 hover:shadow-xl"
                        style={{ pointerEvents: 'auto' }}
                      >
                        Change Photo
                      </button>
                      <button
                        onClick={removeProfilePicture}
                        className="ml-2 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-2 border-white hover:scale-105 hover:shadow-xl"
                        style={{ pointerEvents: 'auto' }}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 rounded-2xl transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => document.getElementById('profile-pic-input')?.click()}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-2 border-white hover:scale-105 hover:shadow-xl"
                        style={{ pointerEvents: 'auto' }}
                      >
                        Upload Photo
                      </button>
                    </div>
                  </>
                )}
                <input
                  id="profile-pic-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      uploadProfilePicture(e.target.files[0]);
                      e.target.value = '';
                    }
                  }}
                  className="hidden"
                  aria-label="Upload profile picture"
                />
              </div>
              <div className="flex-1 mt-0 sm:mt-12 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  {isEditingName ? (
                    <>
                      <div className="flex gap-2">
                        <input
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="text-xl sm:text-2xl font-bold text-gray-900 border rounded px-2"
                          placeholder="Enter display name"
                        />
                        <Button onClick={updateDisplayName} size="sm" disabled={isSavingName}>{isSavingName ? 'Saving...' : 'Save'}</Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setDisplayName(originalDisplayName);
                            setIsEditingName(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                      {nameError && <p className="text-sm text-red-600 mt-1">{nameError}</p>}
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{displayName}</h3>
                      <button onClick={() => { setIsEditingName(true); setOriginalDisplayName(displayName); }} className="text-gray-500 hover:text-gray-700">
                        ✏️
                      </button>
                    </div>
                  )}
                  <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold w-fit">
                    Level {Math.floor((profile?.trust_score ?? 0) / 10) + 1}
                  </Badge>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Unknown'} • Delhi, India
                </p>
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
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{profile?.reports_count ?? 0}</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Reports Filed</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-3 sm:p-5 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{profile?.points ?? 0}</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Points Earned</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-3 sm:p-5 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{profile?.trust_score ?? 0}</p>
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
                  {profile?.achievements?.filter(a => a.unlocked).length ?? 0} of {profile?.achievements?.length ?? 0} Unlocked
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile?.achievements?.map((achievement, index) => (
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
                    {achievement.unlocked ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs mt-2 font-semibold">
                        Unlocked
                      </Badge>
                    ) : (
                      <p className="text-xs text-gray-400 mt-2">{achievement.condition}</p>
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
                      <p className="font-semibold text-gray-900">Reported price in {activity.location}</p>
                      <p className="text-sm text-gray-600">₹{activity.price}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold mb-1">
                        +10 pts
                      </Badge>
                      <p className="text-xs text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</p>
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
      )}
      <BottomNav currentScreen="profile" onNavigate={onNavigate} isLoggedIn={isLoggedIn} onShowLogin={onShowLogin} />
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