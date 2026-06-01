import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, KeyRound, Mail, AlertCircle, Home, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to admin panel if already signed in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/admin');
      } else {
        setLocalError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setLocalError('Network error. Node.js backend server might be offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-bg-gradient min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 grid-glow-bg relative">
      
      {/* Return home link */}
      <div className="absolute top-8 left-8">
        <Link
          to="/"
          className="flex items-center space-x-2 text-sm font-semibold text-slate-500 hover:text-primary-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Portfolio</span>
        </Link>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 bg-primary-500/10 rounded-2xl border border-primary-500/25 text-primary-500 mb-4 animate-float">
            <KeyRound className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Admin Console</h2>
          <p className="text-sm text-slate-500 mt-2">
            Secure administrative login for portfolio custom configurations.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 rounded-3xl border border-slate-200/50 dark:border-dark-cardBorder/50 shadow-2xl flex flex-col space-y-6"
        >
          {/* Error reporting banner */}
          {localError && (
            <div className="p-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl text-sm font-medium flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{localError}</span>
            </div>
          )}

          {/* Email input field */}
          <div className="flex flex-col space-y-2 text-left">
            <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Administrator Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sreerajk8@gmail.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-semibold transition-all duration-200"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="flex flex-col space-y-2 text-left">
            <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Console Key Phrase
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <KeyRound className="h-4.5 w-4.5" />
              </span>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-semibold transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3.5 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white rounded-xl font-bold text-center flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-md shadow-primary-500/20"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <LogIn className="h-4.5 w-4.5" />
            )}
            <span>Sign In Administrator</span>
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-slate-500">
          <p>Protected resource. Unauthorized operations are logged automatically.</p>
        </div>
      </div>

    </div>
  );
};

export default Login;
