import { useState } from 'react';
import { X, User, Lock, Mail, Phone, UserPlus } from 'lucide-react';
import { Button } from './ui/button';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (name: string, email: string, phone: string, password: string) => void;
  isDarkMode?: boolean;
}

export function SignUpModal({ isOpen, onClose, onSignUp, isDarkMode = false }: SignUpModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Call signup with dummy data
    onSignUp(name.trim(), email.trim(), phone.trim(), password);
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md my-8 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 relative rounded-t-2xl">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:scale-110 z-50"
            aria-label="Close sign up"
          >
            <X className="w-6 h-6 text-green-600 font-bold" strokeWidth={3} />
          </button>
          <div className="flex items-center gap-3 pr-12">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
              <UserPlus className="w-7 h-7 text-green-600" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-md">Create Account</h2>
              <p className="text-green-100 text-sm">Join Fair Travel India</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Phone className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
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
                placeholder="Create a password"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input 
              type="checkbox" 
              required
              className="w-4 h-4 mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500" 
            />
            <label className="text-sm text-gray-600">
              I agree to the <a href="#" className="text-green-600 font-semibold hover:text-green-700">Terms of Service</a> and <a href="#" className="text-green-600 font-semibold hover:text-green-700">Privacy Policy</a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg font-semibold h-12"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create Account
          </Button>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button 
                type="button"
                onClick={handleClose}
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}