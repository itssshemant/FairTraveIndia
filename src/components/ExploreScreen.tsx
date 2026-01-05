import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { PriceChecker } from './PriceChecker';

interface ExploreScreenProps {
  onNavigate: (screen: 'home' | 'explore' | 'report' | 'saved' | 'profile' | 'cultural') => void;
  isLoggedIn: boolean;
  userName: string;
  onShowLogin: () => void;
  onLogout: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: (value: boolean) => void;
}

export function ExploreScreen({ onNavigate, isLoggedIn, userName, onShowLogin, onLogout, isDarkMode = false }: ExploreScreenProps) {
  return (
    <div className="min-h-screen pb-20">
      <Header isLoggedIn={isLoggedIn} userName={userName} onShowLogin={onShowLogin} onNavigate={onNavigate} onLogout={onLogout} isDarkMode={isDarkMode} />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>Fair Price Explorer</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Discover community-verified pricing across India</p>
        </div>
        
        <PriceChecker onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} isDarkMode={isDarkMode} />
      </main>

      <BottomNav currentScreen="explore" onNavigate={onNavigate} isLoggedIn={isLoggedIn} onShowLogin={onShowLogin} isDarkMode={isDarkMode} />
    </div>
  );
}