import { useState } from 'react';
import { X, User, Lock, LogIn } from 'lucide-react';
import { Button } from './ui/button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, password: string) => void;
  onShowSignUp: () => void;
  isDarkMode?: boolean;
}

export function LoginModal({ isOpen, onClose, onLogin, onShowSignUp, isDarkMode = false }: LoginModalProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }
    
    // Dummy login - accept any credentials
    onLogin(name.trim(), password);
    setName('');
    setPassword('');
    setError('');
  };

  const handleClose = () => {
    setName('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 relative rounded-t-2xl">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:scale-110 z-50"
            aria-label="Close login"
          >
            <X className="w-6 h-6 text-orange-600 font-bold" strokeWidth={3} />
          </button>
          <div className="flex items-center gap-3 pr-12">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
              <LogIn className="w-7 h-7 text-orange-600" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-md">Welcome Back</h2>
              <p className="text-orange-100 text-sm">Login to Fair Travel India</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-orange-600 font-semibold hover:text-orange-700">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg font-semibold h-12"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login to Account
          </Button>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-orange-600 font-semibold hover:text-orange-700" onClick={onShowSignUp}>
                Sign up for free
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}