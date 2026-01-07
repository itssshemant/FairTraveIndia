import { useState, useEffect } from 'react';
import { X, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '../lib/supabaseclient';

/* eslint-disable */
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowSignUp: () => void;
  onAuthSuccess?: () => void | Promise<void>;
}

export function LoginModal({ isOpen, onClose, onShowSignUp, onAuthSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      await onAuthSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Use origin to avoid carrying OAuth query params and to work in both dev/prod
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Google OAuth error:', error);
        setError(error.message);
      }
    } catch (err: any) {
      console.error('Google sign-in failed:', err);
      setError('Failed to sign in with Google');
    }
  };

  return (
    <div className={`fixed inset-0 z-[9999] ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* 🔥 Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-lg transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className={`w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 transform transition-all duration-300 ease-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="
                w-full h-11
                bg-gradient-to-r from-orange-500 to-orange-600
                hover:from-orange-600 hover:to-orange-700
                text-white font-semibold
                shadow-lg shadow-orange-200
                transition-all
                active:scale-[0.98]
              "
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500 font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <Button
            variant="outline"
            onClick={signInWithGoogle}
            className="w-full h-11 rounded-xl border-gray-300 hover:bg-gray-50 font-semibold"
          >
            Continue with Google
          </Button>

          {/* Footer */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{' '}
            <button
              className="text-orange-600 font-semibold hover:text-orange-700"
              onClick={onShowSignUp}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
