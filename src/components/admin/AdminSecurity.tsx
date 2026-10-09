import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  User as UserIcon, 
  Lock, 
  Check, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Save, 
  Sparkles,
  Info
} from 'lucide-react';
import { getAdminCredentials, updateAdminCredentials, onStorageUpdate } from '../../services/storageService';
import { AdminCredentials } from '../../types';

export const AdminSecurity: React.FC = () => {
  const [creds, setCreds] = useState<AdminCredentials>(getAdminCredentials());
  
  // Form fields
  const [username, setUsername] = useState(creds.username);
  const [displayName, setDisplayName] = useState(creds.displayName);
  const [email, setEmail] = useState(creds.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Toggles
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Status
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const sync = () => {
      const c = getAdminCredentials();
      setCreds(c);
      setUsername(c.username);
      setDisplayName(c.displayName);
      setEmail(c.email);
    };
    sync();
    return onStorageUpdate(sync);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!username.trim()) {
      setNotification({ type: 'error', message: 'Admin username cannot be blank.' });
      return;
    }

    if (!currentPassword) {
      setNotification({ type: 'error', message: 'Please enter your current password to authorize this update.' });
      return;
    }

    if (currentPassword !== creds.password) {
      setNotification({ type: 'error', message: 'Current password does not match. Please verify your current password.' });
      return;
    }

    if (newPassword) {
      if (newPassword.length < 4) {
        setNotification({ type: 'error', message: 'New password must be at least 4 characters.' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setNotification({ type: 'error', message: 'New password and confirm password do not match.' });
        return;
      }
    }

    setIsSaving(true);
    setTimeout(() => {
      const res = updateAdminCredentials({
        username: username.trim(),
        displayName: displayName.trim(),
        email: email.trim(),
        currentPassword,
        newPassword: newPassword ? newPassword.trim() : undefined
      });

      setIsSaving(false);
      if (res.success) {
        const updated = getAdminCredentials();
        setCreds(updated);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setNotification({ 
          type: 'success', 
          message: `Admin credentials updated successfully! New Username: "${updated.username}". Password updated.` 
        });
      } else {
        setNotification({ type: 'error', message: res.error || 'Failed to update credentials.' });
      }
    }, 200);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-white text-slate-900 text-left p-4 sm:p-8">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#074592]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Admin Security & Credentials
              </h2>
              <p className="text-xs text-slate-500">
                Change your administrative username and login password. These credentials grant access to the MCS console.
              </p>
            </div>
          </div>
        </div>

        {/* Current Active Credentials Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#074592] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Active Admin Login Account
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-blue-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold">Active Username:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{creds.username}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-blue-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold">Admin Email:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm truncate block">{creds.email}</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block text-right shrink-0">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#66d925] text-slate-950 font-black uppercase">
                AUTHENTICATED
              </span>
              <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                URL: #/admin
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-blue-200/60 flex items-center gap-1.5 text-[11px] text-slate-600">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>You can log in using either your admin username (<code className="font-mono text-[#074592]">{creds.username}</code>) or email.</span>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
            notification.type === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
          }`}>
            {notification.type === 'success' ? <Check className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Change Credentials Form */}
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-200">
            Update Administrative Credentials
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Username *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin or mcs_director"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono font-bold focus:ring-2 focus:ring-[#074592] outline-hidden pl-9"
                />
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Username used on login form</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Ali Anwar"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold focus:ring-2 focus:ring-[#074592] outline-hidden"
              />
              <p className="text-[10px] text-slate-500 mt-1">Shown in admin header & cases</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Admin Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@modernminds.pk"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-[#074592] outline-hidden"
            />
          </div>

          <div className="pt-2 border-t border-slate-200">
            <div className="mb-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Password * (Required to save changes)
              </label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password to authorize"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono focus:ring-2 focus:ring-[#074592] outline-hidden pl-9 pr-10"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  New Password (Optional, leave blank to keep current)
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 4 chars)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono focus:ring-2 focus:ring-[#074592] outline-hidden pl-9 pr-10"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono focus:ring-2 focus:ring-[#074592] outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#074592] hover:bg-[#05336e] active:bg-slate-900 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Updating Credentials...' : 'Save New Credentials'}</span>
            </button>
          </div>
        </form>

        {/* URL Access Instructions Card */}
        <div className="bg-slate-100 rounded-2xl border border-slate-200 p-4 text-xs space-y-1">
          <p className="font-bold text-slate-800">
            How to Access Admin Portal:
          </p>
          <p className="text-slate-600">
            Type <code className="bg-slate-200 px-1 py-0.5 rounded text-blue-900 font-mono">#/admin</code> or <code className="bg-slate-200 px-1 py-0.5 rounded text-blue-900 font-mono">/admin</code> in the browser URL bar, or press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-xs text-[10px] font-mono font-bold">Alt+A</kbd> anytime.
          </p>
        </div>

      </div>
    </div>
  );
};
