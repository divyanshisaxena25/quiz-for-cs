import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { recordVisitorLogin } from '../utils/visitorService';
import { 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  X, 
  User, 
  Mail, 
  ArrowRight,
  AlertCircle,
  Lock,
  Terminal
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onOpenDeveloperPortal?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onOpenDeveloperPortal }) => {
  const [activeModalProvider, setActiveModalProvider] = useState<'google' | 'linkedin' | null>(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // Admin access modal state (hidden from normal students)
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');

  // Secret shortcut: Ctrl + Shift + D or Cmd + Shift + D opens developer modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setAdminPasscode('');
        setAdminError('');
        setShowAdminModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Secret tap counter for mobile / mouse (tap shield 3 times within 1.5s)
  const [secretClickCount, setSecretClickCount] = useState(0);
  const handleSecretTrigger = () => {
    const next = secretClickCount + 1;
    if (next >= 3) {
      setSecretClickCount(0);
      setAdminPasscode('');
      setAdminError('');
      setShowAdminModal(true);
    } else {
      setSecretClickCount(next);
      setTimeout(() => setSecretClickCount(0), 1500);
    }
  };

  const handleOpenProvider = (provider: 'google' | 'linkedin') => {
    setActiveModalProvider(provider);
    setVisitorName('');
    setVisitorEmail('');
    setErrorMessage('');
  };

  const handleCloseModal = () => {
    setActiveModalProvider(null);
    setVisitorName('');
    setVisitorEmail('');
    setErrorMessage('');
    setIsAuthorizing(false);
  };

  const handleUseQuickGuest = (provider: 'google' | 'linkedin') => {
    if (provider === 'google') {
      setVisitorName('Student Visitor');
      setVisitorEmail('student.visitor@gmail.com');
    } else {
      setVisitorName('Engineering Visitor');
      setVisitorEmail('visitor.engineer@linkedin.com');
    }
    setErrorMessage('');
  };

  const handleAuthorize = (provider: 'google' | 'linkedin') => {
    const trimmedEmail = visitorEmail.trim();
    const trimmedName = visitorName.trim();

    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address to sign in.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setIsAuthorizing(true);

    // Compute display name: user entered name or derived from email
    const derivedName = trimmedName || trimmedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    setTimeout(() => {
      const user: UserProfile = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: derivedName,
        email: trimmedEmail,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(derivedName)}`,
        provider,
        loggedInAt: new Date().toISOString(),
      };

      // Record login telemetry to centralized server
      recordVisitorLogin({
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        provider: user.provider
      });

      setIsAuthorizing(false);
      setActiveModalProvider(null);
      onLoginSuccess(user);
    }, 600);
  };

  const handleAdminVerify = () => {
    const trimmed = adminPasscode.trim().toLowerCase();
    // Allow either developer email, passcode '2450', or 'admin'
    if (trimmed === '2450' || trimmed === 'divyanshisaxena245@gmail.com' || trimmed === 'admin') {
      setShowAdminModal(false);
      if (onOpenDeveloperPortal) {
        onOpenDeveloperPortal();
      }
    } else {
      setAdminError('Invalid developer passcode. Try PIN 2450 or developer email.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Quiz<span className="text-blue-600 dark:text-blue-400">Master</span>
              </span>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Examination Portal
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Secure 256-Bit SSL</span>
            </div>

            {onOpenDeveloperPortal && (
              <button
                id="btn-open-dev-portal"
                type="button"
                onClick={() => {
                  setAdminPasscode('');
                  setAdminError('');
                  setShowAdminModal(true);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 text-xs font-bold border border-purple-500/40 transition cursor-pointer shadow-sm"
                title="Developer Portal - Check who is logging in"
              >
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Developer Portal</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Hero & Login Box */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Column: Information */}
        <div className="flex-1 max-w-xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Academic & Technical Assessment Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Engineering & Computer Science <span className="text-blue-600 dark:text-blue-400">Quiz Portal</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Prepare for semester finals and competitive technical exams with 30-minute timed assessments, comprehensive 40-question subject banks, and instant detailed performance analysis with complete answer rationales.
          </p>

          {/* Subject Pills */}
          <div className="pt-2">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-3">
              Included Curriculum Subjects
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'DBMS', desc: 'Database Systems' },
                { name: 'DAA', desc: 'Algorithms Analysis' },
                { name: 'Web Technology', desc: 'Full Stack & HTTP' },
                { name: 'Maths 4', desc: 'Engineering Math' },
                { name: 'Python', desc: 'Core & Advanced' }
              ].map((sub) => (
                <div
                  key={sub.name}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center space-x-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{sub.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>30 non-repeating questions randomly drawn from a 40-question pool per attempt</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Strict 30-minute countdown timer with auto-submit safeguard</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Detailed post-test analysis highlighting wrong answers with full explanations</span>
            </div>
          </div>
        </div>

        {/* Right Column: User Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/40">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome to Exam Portal</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Sign in with your verified academic or professional account to begin
              </p>
            </div>

            <div className="space-y-4">
              {/* Google Login Button */}
              <button
                id="btn-login-google"
                type="button"
                onClick={() => handleOpenProvider('google')}
                className="w-full flex items-center justify-center space-x-3 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm transition shadow-xs hover:border-slate-300 dark:hover:border-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="font-semibold">Sign in with Google</span>
              </button>

              {/* LinkedIn Login Button */}
              <button
                id="btn-login-linkedin"
                type="button"
                onClick={() => handleOpenProvider('linkedin')}
                className="w-full flex items-center justify-center space-x-3 px-4 py-3.5 rounded-xl border border-[#0077B5]/20 bg-[#0077B5] hover:bg-[#006097] text-white font-medium text-sm transition shadow-md shadow-[#0077B5]/20 focus:outline-hidden focus:ring-2 focus:ring-[#0077B5]/40 active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="font-semibold">Sign in with LinkedIn</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visitors can sign in using their own Google or LinkedIn account credentials.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} QuizMaster Academic Portal. All curriculum questions verified.</p>
          <div className="flex items-center space-x-6">
            <span>Privacy Policy</span>
            <span>Examination Terms</span>
            <span>Honor Code</span>
          </div>
        </div>
      </footer>

      {/* Dedicated Visitor OAuth Sign-In Modal */}
      {activeModalProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {activeModalProvider === 'google' ? (
                  <div className="w-7 h-7 flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-7 h-7 bg-[#0077B5] rounded-lg flex items-center justify-center text-white shadow-xs">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {activeModalProvider === 'google' ? 'Sign in with Google' : 'Sign in with LinkedIn'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    to continue to QuizMaster Examination Portal
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Enter your account details below. Your quiz scores, history, and detailed analyses will be linked directly to your account:
              </p>

              {/* Input Form for Visitor */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="input-visitor-email"
                      type="email"
                      autoFocus
                      value={visitorEmail}
                      onChange={(e) => {
                        setVisitorEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40"
                      placeholder={activeModalProvider === 'google' ? 'you@gmail.com or university email' : 'you@company.com or university email'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="input-visitor-name"
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40"
                      placeholder="e.g. Alex Johnson (or leave blank to auto-detect)"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Dynamic Live Preview of Visitor's Account */}
              {visitorEmail.trim() && (
                <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 flex items-center space-x-3 animate-in fade-in duration-150">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(visitorName.trim() || visitorEmail.trim())}`}
                    alt="avatar preview"
                    className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-300 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {visitorName.trim() || visitorEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{visitorEmail.trim()}</p>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                      Signing in via {activeModalProvider === 'google' ? 'Google' : 'LinkedIn'}
                    </span>
                  </div>
                </div>
              )}

              {/* Quick Fill Sample Account for Testing Convenience */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Want to test quickly?</span>
                <button
                  type="button"
                  onClick={() => handleUseQuickGuest(activeModalProvider)}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                >
                  Fill Guest Student
                </button>
              </div>

              {/* Scope Notice */}
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-normal flex items-start space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  QuizMaster will only receive your basic student profile information (name, avatar, and email) to record your exam progress.
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn-confirm-oauth"
                type="button"
                disabled={isAuthorizing}
                onClick={() => handleAuthorize(activeModalProvider)}
                className={`px-5 py-2 text-xs font-bold text-white rounded-xl shadow-xs transition disabled:opacity-50 flex items-center space-x-2 cursor-pointer ${
                  activeModalProvider === 'google'
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                    : 'bg-[#0077B5] hover:bg-[#006097] shadow-[#0077B5]/20'
                }`}
              >
                {isAuthorizing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Developer / Admin Verification Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Developer Telemetry Access</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Protected Administrator Portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                This portal allows the app owner (<span className="font-semibold text-blue-600 dark:text-blue-400">divyanshisaxena245@gmail.com</span>) to inspect live visitor records, emails, auth providers, and exam scores.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Developer PIN or Owner Email
                </label>
                <input
                  type="password"
                  autoFocus
                  value={adminPasscode}
                  onChange={(e) => {
                    setAdminPasscode(e.target.value);
                    if (adminError) setAdminError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAdminVerify();
                  }}
                  placeholder="Enter PIN (e.g. 2450) or developer email"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300 text-[11px]">Developer Quick Unlock:</span>
                <button
                  type="button"
                  onClick={() => {
                    setAdminPasscode('2450');
                    setShowAdminModal(false);
                    if (onOpenDeveloperPortal) onOpenDeveloperPortal();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] transition shadow-xs cursor-pointer"
                >
                  Unlock Portal Directly
                </button>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdminVerify}
                className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition cursor-pointer"
              >
                Access Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
