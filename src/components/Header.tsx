import { Globe, LogIn, User } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string;
  onShowLogin?: () => void;
  onNavigate?: (screen: 'home' | 'explore' | 'report' | 'saved' | 'profile' | 'cultural') => void;
  onLogout?: () => void;
  isDarkMode?: boolean;
}

export function Header({
  isLoggedIn,
  userName,
  onShowLogin,
  onNavigate,
  onLogout,
  isDarkMode = false,
}: HeaderProps) {
  return (
    <header
      className={`${
        isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/80 border-gray-200'
      } backdrop-blur-lg border-b sticky top-0 z-40`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Fair Travel India" className="w-9 h-9" />
          <h1 className="font-bold text-orange-600">Fair Travel India</h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">EN</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>🇬🇧 English</DropdownMenuItem>
              <DropdownMenuItem>🇮🇳 हिंदी</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <User className="w-4 h-4 mr-1" />
                  <span className="max-w-[100px] truncate">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() => onNavigate?.('profile')}
                  className="cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onLogout?.()}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => {
                console.log('SIGN IN CLICKED');
                onShowLogin?.();
              }}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <LogIn className="w-4 h-4 mr-1" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
