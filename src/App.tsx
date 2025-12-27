import { useRef, useState } from "react";
import { Home } from "./components/Home";
import { ReportScreen } from "./components/ReportScreen";
import { ExploreScreen } from "./components/ExploreScreen";
import { SavedScreen } from "./components/SavedScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { CulturalTipsScreen } from "./components/CulturalTipsScreen";
import { LoginModal } from "./components/LoginModal";
import { SignUpModal } from "./components/SignUpModal";
import TopLoader from "./components/TopLoader";

type Screen =
  | "home"
  | "explore"
  | "report"
  | "saved"
  | "profile"
  | "cultural";

const MIN_LOAD = 1000;
const LOADER_DELAY = 300;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [showLoader, setShowLoader] = useState(false);

  const loaderTimer = useRef<number | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  /* -------- Navigation -------- */

  const handleNavigate = (screen: Screen) => {
    if (screen === currentScreen) return;

    loaderTimer.current = window.setTimeout(() => {
      setShowLoader(true);
    }, LOADER_DELAY);

    setTimeout(() => {
      setCurrentScreen(screen);
      setShowLoader(false);
      if (loaderTimer.current) clearTimeout(loaderTimer.current);
    }, MIN_LOAD);
  };

  const commonProps = {
    onNavigate: handleNavigate,
    isLoggedIn,
    userName,
    onShowLogin: () => setShowLoginModal(true),
    onLogout: () => {
      setIsLoggedIn(false);
      setUserName("");
      handleNavigate("home");
    },
    isDarkMode,
    onToggleDarkMode: setIsDarkMode,
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <Home {...commonProps} />;
      case "explore":
        return <ExploreScreen {...commonProps} />;
      case "report":
        return <ReportScreen {...commonProps} />;
      case "saved":
        return <SavedScreen {...commonProps} />;
      case "profile":
        return <ProfileScreen {...commonProps} />;
      case "cultural":
        return <CulturalTipsScreen {...commonProps} />;
      default:
        return <Home {...commonProps} />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-orange-50 via-white to-green-50"
      }`}
    >
      {/* ✅ Single, clear loading signal */}
      <TopLoader visible={showLoader} />

      {/* ✅ Content never blocked */}
      {renderScreen()}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={(name) => {
          setUserName(name);
          setIsLoggedIn(true);
          setShowLoginModal(false);
        }}
        onShowSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
        isDarkMode={isDarkMode}
      />

      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSignUp={(name) => {
          setUserName(name);
          setIsLoggedIn(true);
          setShowSignUpModal(false);
        }}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
