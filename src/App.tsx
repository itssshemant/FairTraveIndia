import { useEffect, useRef, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./lib/supabaseclient";

import { LoginModal } from "./components/LoginModal";
import { SignUpModal } from "./components/SignUpModal";
import TopLoader from "./components/TopLoader";
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./components/Home').then(module => ({ default: module.Home })));
const ReportScreen = lazy(() => import('./components/ReportScreen').then(module => ({ default: module.ReportScreen })));
const ExploreScreen = lazy(() => import('./components/ExploreScreen').then(module => ({ default: module.ExploreScreen })));
const SavedScreen = lazy(() => import('./components/SavedScreen').then(module => ({ default: module.SavedScreen })));
const ProfileScreen = lazy(() => import('./components/ProfileScreen').then(module => ({ default: module.ProfileScreen })));
const CulturalTipsScreen = lazy(() => import('./components/CulturalTipsScreen').then(module => ({ default: module.CulturalTipsScreen })));


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

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const syncAuthFromSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("[auth] getSession failed:", error);
      }
      const session = data?.session ?? null;
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session?.user);
    } catch (e) {
      console.error("[auth] syncAuthFromSession error:", e);
    }
  };

  /* -------- SUPABASE AUTH STATE -------- */
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const hasCode = window.location.search.includes("code=");
        const hasAccessTokenHash = window.location.hash.includes("access_token=");

        // Handle OAuth callback in a version-safe way (v2 PKCE vs v1 implicit)
        if (hasCode || hasAccessTokenHash) {
          const authAny = supabase.auth as any;

          if (hasCode && typeof authAny.exchangeCodeForSession === "function") {
            const { error } = await authAny.exchangeCodeForSession(window.location.href);
            if (error) console.error("[auth] exchangeCodeForSession failed:", error);
          } else if (typeof authAny.getSessionFromUrl === "function") {
            // Older supabase-js fallback
            const { error } = await authAny.getSessionFromUrl({ storeSession: true });
            if (error) console.error("[auth] getSessionFromUrl failed:", error);
          } else {
            console.warn("[auth] No supported OAuth callback handler found on supabase.auth");
          }

          // Clean URL (remove query/hash callback params)
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (mounted) {
          await syncAuthFromSession();
        }
      } catch (e) {
        console.error("[auth] initAuth error:", e);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      const nextUser = session?.user ?? null;
      setUser(nextUser);
      setIsLoggedIn(!!nextUser);

      if (nextUser && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        try {
          const metaName =
            (nextUser.user_metadata as any)?.name ||
            (nextUser.user_metadata as any)?.full_name ||
            (nextUser.user_metadata as any)?.display_name ||
            null;

          const { data: profile } = await supabase
            .from("profiles")
            .select("id, display_name")
            .eq("id", nextUser.id)
            .maybeSingle();

          if (!profile) {
            // use upsert (safe if row race-creates elsewhere)
            await supabase.from("profiles").upsert({
              id: nextUser.id,
              role: "tourist",
              ...(metaName ? { display_name: metaName } : {}),
            });
          } else if (!profile.display_name && metaName) {
            await supabase.from("profiles").update({ display_name: metaName }).eq("id", nextUser.id);
          }
        } catch (e) {
          console.error("[auth] profile bootstrap failed:", e);
        }
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  /* -------- Temporary Supabase checks (development only) -------- */
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    // Enable only when you explicitly want it:
    // localStorage.setItem('supabase:devChecks', '1')
    if (localStorage.getItem('supabase:devChecks') !== '1') return;

    const runSupabaseChecks = async () => {
      try {
        // LEVEL 1: Basic read
        const { data: readData, error: readError } = await supabase
          .from('profiles')
          .select('*')
          .limit(1);
        // dev: basic read results (removed verbose logging)

        // LEVEL 2: Check logged-in user
        const { data: userResp } = await supabase.auth.getUser();
        const currentUser = userResp?.user ?? null;
        console.log('Auth user:', currentUser);
        if (!currentUser) return;

        // LEVEL 3: Profile row exists for user
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();
        console.log('Profile:', profileData, profileError);

        // LEVEL 4: Write test (update)
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ city: 'Delhi' })
          .eq('id', currentUser.id);
        console.log('Update error:', updateError);

        // LEVEL 5: Storage test (profile pictures)
        try {
          const { data: storageData, error: storageError } = await supabase.storage
            .from('profile-pictures')
            .list(currentUser.id);
            // dev: storage list result (removed verbose logging)
        } catch (e) {
          console.warn('Storage list failed:', e);
        }
      } catch (e) {
        console.error('Supabase checks error:', e);
      }
    };

    runSupabaseChecks();
  }, []);

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

  const userName = user?.email || 'User';

  // suppressed verbose auth state logs in production/dev

  const handleShowLogin = () => setShowLoginModal(true);
  const handleLogout = async () => {
    // Always log out locally (UI/session), and attempt remote sign-out best-effort.
    try {
      // Prefer remote sign-out; if network/DNS fails, fall back to local-only sign-out.
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.warn('Remote logout failed, falling back to local logout:', error);
        await supabase.auth.signOut({ scope: 'local' });
      }
    } catch (err) {
      console.warn('Remote logout threw, falling back to local logout:', err);
      try {
        await supabase.auth.signOut({ scope: 'local' });
      } catch (localErr) {
        console.warn('Local logout also failed:', localErr);
      }
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      setCurrentScreen('home');
    }
  };

  const commonProps = {
    onNavigate: handleNavigate,
    user,
    isDarkMode,
    onToggleDarkMode: setIsDarkMode,
    isLoggedIn,
    userName,
    onShowLogin: handleShowLogin,
    onLogout: handleLogout,
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
      {/* Loader */}
      <TopLoader visible={showLoader} />

      {/* Main Content */}
      <Suspense fallback={<div>Loading...</div>}>
        {renderScreen()}
      </Suspense>

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onAuthSuccess={syncAuthFromSession}
        onShowSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
      />

      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onAuthSuccess={syncAuthFromSession}
      />
    </div>
  );
}
