import { useState } from "react";
import { Home } from "./components/Home";
import { ReportScreen } from "./components/ReportScreen";
import { PriceChecker } from "./components/PriceChecker";
import { ExploreScreen } from "./components/ExploreScreen";
import { SavedScreen } from "./components/SavedScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { CulturalTipsScreen } from "./components/CulturalTipsScreen";
import { LoginModal } from "./components/LoginModal";
import { SignUpModal } from "./components/SignUpModal";


export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    | "home"
    | "explore"
    | "report"
    | "saved"
    | "profile"
    | "cultural"
  >("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogin = (name: string, password: string) => {
    // Dummy login - accept any credentials
    setUserName(name);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleSignUp = (
    name: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    // Dummy signup - accept any credentials
    setUserName(name);
    setIsLoggedIn(true);
    setShowSignUpModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setCurrentScreen("home");
  };

  const renderScreen = () => {
    const commonProps = {
      onNavigate: setCurrentScreen,
      isLoggedIn,
      userName,
      onShowLogin: () => setShowLoginModal(true),
      onLogout: handleLogout,
      isDarkMode,
      onToggleDarkMode: setIsDarkMode,
    };

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
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-orange-50 via-white to-green-50"}`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">
          FairTravel
        </h1>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-sm px-3 py-1 rounded border"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      {renderScreen()}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onShowSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
        isDarkMode={isDarkMode}
      />
      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSignUp={handleSignUp}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}