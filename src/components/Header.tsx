import { Globe, LogIn, MapPin, User } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onShowLogin?: () => void;
  onNavigate?: (screen: 'home' | 'explore' | 'report' | 'saved' | 'profile' | 'cultural') => void;
  onLogout?: () => void;
  isDarkMode?: boolean;
}

export function Header({ isLoggedIn = false, userName = '', onShowLogin, onNavigate, onLogout, isDarkMode = false }: HeaderProps = {}) {
  return (
    <header className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/80'} backdrop-blur-lg border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-40 shadow-sm`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Modern Logo */}
            <div className="relative">
              <div className="flex items-center gap-3">
                <img
                  src={'./src/assets/logo.png'}
                  alt="FairTravel India"
                  className="w-9 h-9"
                />
              </div>

            </div>
            <div>
              <h1 className={`text-base sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent`}>
                Fair Travel India
              </h1>
              <p className={`text-[10px] sm:text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium hidden xs:block`}>High Fidelity Prototype</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 hover:bg-orange-50 h-8 sm:h-9 px-2 sm:px-3">
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
                  <span className="hidden sm:inline font-semibold text-gray-700 text-sm">EN</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-xl border-gray-200">
                <DropdownMenuItem className="hover:bg-orange-50 cursor-pointer">🇬🇧 English</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-orange-50 cursor-pointer">🇮🇳 हिंदी</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-orange-50 cursor-pointer">🇮🇳 தமிழ்</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" size="sm" className="gap-1 sm:gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-200 font-semibold h-8 sm:h-9 px-2 sm:px-3 text-sm">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline max-w-[80px] truncate">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-xl border-gray-200">
                  <DropdownMenuItem 
                    className="hover:bg-orange-50 cursor-pointer" 
                    onClick={() => onNavigate?.('profile')}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-orange-50 cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuItem 
                    className="hover:bg-red-50 cursor-pointer text-red-600" 
                    onClick={onLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" className="gap-1 sm:gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-200 font-semibold h-8 sm:h-9 px-2 sm:px-3 text-sm" onClick={onShowLogin}>
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}