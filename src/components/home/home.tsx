import HomeSkeleton from "./HomeSkeleton";

interface HomeProps {
  onNavigate: (screen: any) => void;
  isLoggedIn: boolean;
  userName: string;
  onShowLogin: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: (v: boolean) => void;
  isScreenLoading?: boolean;
}

export function Home({
  isScreenLoading,
}: HomeProps) {
  if (isScreenLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">FairTravel India</h1>
      <p className="text-gray-600">
        Community-verified fair pricing for travelers.
      </p>

      {/* rest of your real UI */}
    </div>
  );
}
