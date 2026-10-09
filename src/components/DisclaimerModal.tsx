import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  X, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  AlertOctagon,
  Eye,
  Building2
} from 'lucide-react';
import { DisclaimerPopupSettings } from '../types';
import { getDisclaimerPopup, onStorageUpdate } from '../services/storageService';
import { MCS_INFO } from '../data/mockData';

interface DisclaimerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  previewSettings?: DisclaimerPopupSettings | null;
  isPreview?: boolean;
}

const SESSION_DISMISS_KEY = 'mcs_disclaimer_dismissed_session';

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  previewSettings,
  isPreview = false
}) => {
  const [settings, setSettings] = useState<DisclaimerPopupSettings>(
    previewSettings || getDisclaimerPopup()
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dontShowAgainSession, setDontShowAgainSession] = useState<boolean>(false);

  // Sync settings with storage
  useEffect(() => {
    if (previewSettings) {
      setSettings(previewSettings);
      return;
    }

    const sync = () => {
      setSettings(getDisclaimerPopup());
    };
    sync();
    return onStorageUpdate(sync);
  }, [previewSettings]);

  // Determine initial open state on website load
  useEffect(() => {
    if (isPreview) {
      setIsVisible(propIsOpen ?? true);
      return;
    }

    if (propIsOpen !== undefined) {
      setIsVisible(propIsOpen);
      return;
    }

    // Normal website load logic
    if (!settings.isEnabled) {
      setIsVisible(false);
      return;
    }

    const dismissedInSession = sessionStorage.getItem(SESSION_DISMISS_KEY);
    if (!settings.showOnEveryVisit && dismissedInSession === 'true') {
      setIsVisible(false);
      return;
    }

    // Slight delay on load for smooth presentation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [propIsOpen, isPreview, settings.isEnabled, settings.showOnEveryVisit]);

  // Handle Close
  const handleClose = () => {
    if (dontShowAgainSession && !isPreview) {
      sessionStorage.setItem(SESSION_DISMISS_KEY, 'true');
    }
    setIsVisible(false);
    if (propOnClose) {
      propOnClose();
    }
  };

  // Keyboard Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isVisible]);

  if (!isVisible) return null;

  const isCritical = settings.warningLevel === 'critical';
  const isAlert = settings.warningLevel === 'alert';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-red-200 overflow-hidden relative my-auto animate-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Emergency Warning Header */}
        <div className={`p-4 sm:p-5 text-white flex items-center justify-between border-b ${
          isCritical 
            ? 'bg-gradient-to-r from-red-700 via-rose-800 to-red-950 border-red-900' 
            : isAlert 
            ? 'bg-gradient-to-r from-amber-600 via-orange-700 to-amber-900 border-amber-800'
            : 'bg-gradient-to-r from-[#074592] via-[#05336e] to-slate-900 border-[#05336e]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20 shrink-0">
              {isCritical ? (
                <AlertOctagon className="w-6 h-6 text-white animate-pulse" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-amber-300" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full bg-white text-red-700 uppercase shadow-xs">
                  {settings.badgeText || 'PUBLIC FRAUD WARNING'}
                </span>
                <span className="text-[11px] font-bold text-red-100 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#66d925]" />
                  SECP: SECP-ISB-2018-0941
                </span>
              </div>
              <h2 id="disclaimer-title" className="text-base sm:text-lg font-black text-white mt-0.5 leading-snug">
                {settings.title}
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close disclaimer"
            title="Close Notice"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Subtitle / Advisory Banner */}
          {settings.subtitle && (
            <div className="p-3 bg-red-50 border-l-4 border-red-600 rounded-r-xl flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-bold text-red-950">
                {settings.subtitle}
              </p>
            </div>
          )}

          {/* Grid Layout: Person's Image & Details + Warning Message */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Person Card (Left column on md) */}
            {settings.personImage ? (
              <div className="md:col-span-5 bg-slate-50 border-2 border-red-300 rounded-xl p-3 shadow-xs space-y-2.5">
                <div className="relative rounded-lg overflow-hidden bg-slate-200 border border-slate-300 aspect-3/4 max-h-[260px] flex items-center justify-center">
                  <img 
                    src={settings.personImage} 
                    alt={settings.personName || "Unauthorized Individual"} 
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      // Fallback placeholder if broken URL
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Warning Stamp overlay */}
                  <div className="absolute top-2 left-2 bg-red-600/90 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-md tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Caution: Impersonator
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-2 text-white">
                    <p className="text-[11px] font-bold text-center">
                      Reported Unauthorized Person
                    </p>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <p className="text-xs font-black text-slate-900">
                    {settings.personName || 'Reported Unauthorized Individual'}
                  </p>
                  {settings.personRoleOrAlias && (
                    <p className="text-[11px] text-red-700 font-semibold mt-0.5">
                      {settings.personRoleOrAlias}
                    </p>
                  )}
                  {settings.personCnicOrDetails && (
                    <p className="text-[10px] text-slate-600 bg-white border border-slate-200 rounded p-1.5 mt-2 text-left">
                      <span className="font-bold text-slate-800">Alert Details: </span>
                      {settings.personCnicOrDetails}
                    </p>
                  )}
                </div>
              </div>
            ) : null}

            {/* Warning Message Statement & Bullets (Right column or full width) */}
            <div className={settings.personImage ? "md:col-span-7 space-y-3.5" : "col-span-12 space-y-3.5"}>
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5">
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {settings.warningMessage}
                </p>
              </div>

              {/* Bullet Points */}
              {settings.bulletPoints && settings.bulletPoints.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-red-600" />
                    Important Client Protection Directives:
                  </p>
                  <ul className="space-y-2">
                    {settings.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                        <span className="w-4 h-4 rounded-full bg-red-100 text-red-700 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          !
                        </span>
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Official Office & SECP Verification Notice */}
              {settings.officialNotice && (
                <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {settings.officialNotice}
                </p>
              )}
            </div>
          </div>

          {/* Quick Verification & Hotline Strip */}
          <div className="bg-slate-900 text-white p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#074592] flex items-center justify-center shrink-0 border border-blue-400/30">
                <Building2 className="w-5 h-5 text-[#66d925]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">
                  Modernminds Islamabad Head Office Hotline
                </p>
                <p className="text-[11px] text-blue-200">
                  Executive Heights, Blue Area • 051-4862273 / 0300-2346521
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${MCS_INFO.phoneLandline}`}
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline</span>
              </a>

              <a
                href={`https://wa.me/${MCS_INFO.whatsappNumber.replace('+', '')}?text=Hello%20MCS%20Compliance,%20I%20would%20like%20to%20verify%20a%20consultant%20or%20report%20an%20unauthorized%20agent.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-[#66d925] hover:bg-[#55ba1d] text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>WhatsApp Verify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={dontShowAgainSession}
              onChange={(e) => setDontShowAgainSession(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
            />
            <span>Don't show this warning again during this browsing session</span>
          </label>

          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white text-xs sm:text-sm font-black tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>I Understand & Acknowledge Notice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
