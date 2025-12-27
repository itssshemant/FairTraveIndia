import {
  Home,
  Compass,
  Flag,
  Bookmark,
  User,
} from "lucide-react";

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (
    screen:
      | "home"
      | "explore"
      | "report"
      | "saved"
      | "profile"
      | "cultural",
  ) => void;
  isDarkMode?: boolean;
}

export function BottomNav({
  currentScreen,
  onNavigate,
  isDarkMode = false,
}: BottomNavProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "report", label: "Report", icon: Flag },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? "bg-gray-800/95" : "bg-white/90"} backdrop-blur-lg border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} shadow-2xl z-50 safe-area-inset-bottom`}
    >
      <div className="max-w-lg mx-auto px-1 sm:px-2">
        <div className="flex justify-around items-center h-16 sm:h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-2 rounded-xl transition-all duration-200 transform flex-1 ${
                  isActive
                    ? "text-orange-600 scale-110"
                    : isDarkMode
                      ? "text-gray-400 hover:text-gray-200 hover:scale-105"
                      : "text-gray-500 hover:text-gray-700 hover:scale-105"
                }`}
              >
                <div
                  className={`relative ${isActive ? "animate-pulse" : ""}`}
                >
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? "fill-orange-100 stroke-2" : ""}`}
                  />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></div>
                  )}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-semibold ${isActive ? "text-orange-600" : ""}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}