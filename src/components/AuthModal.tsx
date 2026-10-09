import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Building2,
  KeyRound,
  User as UserIcon,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { loginUser, loginAdmin, getAdminCredentials } from '../services/storageService';
import { User, AdminCredentials } from '../types';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  initialRole?: 'admin' | 'work_permit' | 'visit_visa' | 'student';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialRole = 'admin'
}) => {
  const [adminCreds, setAdminCreds] = useState<AdminCredentials>(getAdminCredentials());
  const [activeRoleTab, setActiveRoleTab] = useState<'admin' | 'work_permit' | 'visit_visa' | 'student'>(initialRole);
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('admin');
  const [password, setPassword] = useState<string>('admin123');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const creds = getAdminCredentials();
      setAdminCreds(creds);
      setError('');
      if (initialRole === 'admin') {
        setActiveRoleTab('admin');
        setUsernameOrEmail(creds.username || 'admin');
        setPassword(creds.password || 'admin123');
      }
    }
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  const handleRoleSelect = (roleKey: 'admin' | 'work_permit' | 'visit_visa' | 'student') => {
    setActiveRoleTab(roleKey);
    setError('');
    const creds = getAdminCredentials();
    if (roleKey === 'admin') {
      setUsernameOrEmail(creds.username || 'admin');
      setPassword(creds.password || 'admin123');
    } else if (roleKey === 'work_permit') {
      setUsernameOrEmail('tariq.work@gmail.com');
      setPassword('client123');
    } else if (roleKey === 'visit_visa') {
      setUsernameOrEmail('zainab.visit@gmail.com');
      setPassword('client123');
    } else {
      setUsernameOrEmail('hamza.ali@gmail.com');
      setPassword('student123');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      let res;
      if (activeRoleTab === 'admin') {
        res = loginAdmin(usernameOrEmail, password);
      } else {
        res = loginUser(usernameOrEmail);
      }
      setIsLoading(false);
      if (res.success && res.user) {
        onAuthSuccess(res.user);
        onClose();
      } else {
        setError(res.error || 'Invalid credentials. Please verify your username and password.');
      }
    }, 200);
  };

  const handleAutoFillAdmin = () => {
    const creds = getAdminCredentials();
    setActiveRoleTab('admin');
    setUsernameOrEmail(creds.username);
    setPassword(creds.password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 text-left">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#074592] via-[#05336e] to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
              <Logo variant="mark" size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-black text-white">
                  {activeRoleTab === 'admin' ? 'MCS Admin Portal Login' : 'Client & Student Portal Login'}
                </h3>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  activeRoleTab === 'admin' ? 'bg-[#66d925] text-slate-950' : 'bg-blue-200 text-blue-950'
                }`}>
                  {activeRoleTab === 'admin' ? 'ADMIN URL' : 'PORTAL'}
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                URL Access: <code className="bg-blue-900/60 px-1 py-0.5 rounded text-amber-300 font-mono">#/admin</code> or <code className="bg-blue-900/60 px-1 py-0.5 rounded text-amber-300 font-mono">/admin</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Credential Banner - Direct & Transparent */}
        <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200/80">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-black tracking-wider uppercase text-[#074592] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#66d925]" />
                Admin Login Credentials:
              </span>
              <div className="flex items-center gap-2 mt-1 text-xs font-mono text-slate-800">
                <span className="bg-white px-2 py-0.5 rounded border border-slate-300 font-bold">
                  User: <span className="text-[#074592]">{adminCreds.username}</span>
                </span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-300 font-bold">
                  Pass: <span className="text-rose-600">{adminCreds.password}</span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAutoFillAdmin}
              className="px-2.5 py-1.5 rounded-lg bg-[#074592] hover:bg-[#05336e] text-white text-[11px] font-black shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-1.5">
            💡 You can change your admin username and password anytime inside the Admin Portal.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`p-1.5 rounded-lg text-center border transition-all cursor-pointer ${
                activeRoleTab === 'admin'
                  ? 'bg-blue-100 border-[#074592] font-black text-[#074592] ring-1 ring-[#074592]'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold'
              }`}
            >
              <span className="text-[11px] block">👑 Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('work_permit')}
              className={`p-1.5 rounded-lg text-center border transition-all cursor-pointer ${
                activeRoleTab === 'work_permit'
                  ? 'bg-amber-100 border-amber-600 font-black text-amber-900 ring-1 ring-amber-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold'
              }`}
            >
              <span className="text-[11px] block">💼 Work</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('visit_visa')}
              className={`p-1.5 rounded-lg text-center border transition-all cursor-pointer ${
                activeRoleTab === 'visit_visa'
                  ? 'bg-emerald-100 border-emerald-600 font-black text-emerald-900 ring-1 ring-emerald-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold'
              }`}
            >
              <span className="text-[11px] block">✈️ Visit</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className={`p-1.5 rounded-lg text-center border transition-all cursor-pointer ${
                activeRoleTab === 'student'
                  ? 'bg-indigo-100 border-indigo-600 font-black text-indigo-900 ring-1 ring-indigo-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold'
              }`}
            >
              <span className="text-[11px] block">🎓 Study</span>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {activeRoleTab === 'admin' ? 'Admin Username or Email' : 'Account Email Address'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder={activeRoleTab === 'admin' ? 'admin or admin@modernminds.pk' : 'client@example.com'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] outline-hidden pl-10"
                />
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] outline-hidden pl-10 pr-10"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#074592] hover:bg-[#05336e] active:bg-slate-900 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{activeRoleTab === 'admin' ? 'Access Admin Console' : 'Enter Portal & Case Tracking'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500">
              Modernminds Consulting Services • SECP-ISB-2018-0941 • Blue Area Islamabad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

