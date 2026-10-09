import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X, 
  User as UserIcon, 
  Bell, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MCS_INFO } from '../data/mockData';
import { getCurrentUser, getNotifications, onStorageUpdate } from '../services/storageService';
import { User, NotificationItem } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentUser?: User | null;
  onOpenAuth: (defaultRole?: 'student' | 'admin') => void;
  onOpenPortal: () => void;
  onOpenNotifications: () => void;
  onLogout?: () => void;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser: propUser,
  onOpenAuth,
  onOpenPortal,
  onOpenNotifications,
  onLogout,
  activeSection = 'home',
  setActiveSection
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(propUser || getCurrentUser());
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const updateHeaderState = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    const notifs = getNotifications(user?.id);
    setUnreadCount(notifs.filter((n: NotificationItem) => !n.isRead).length);
  };

  useEffect(() => {
    updateHeaderState();
    const cleanup = onStorageUpdate(updateHeaderState);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      cleanup();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'WORK & VISIT VISAS', href: '#work-and-visit-visas' },
    { label: 'JOB OPENINGS', href: '#job-opportunities' },
    { label: 'ABOUT US', href: '#about-us' },
    { label: 'FAQS', href: '#faqs' },
    { label: 'CONTACT US', href: '#contact-us' },
  ];

  const handleNavClick = (href: string) => {
    if (setActiveSection) {
      setActiveSection(href.replace('#', ''));
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Notification / Hotline Bar with Brand Navy (#074592) & Accent Green (#66d925) */}
      <div className="bg-[#074592] text-white text-xs py-2 px-4 border-b border-[#05336e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-4 text-blue-100">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <MapPin className="w-3.5 h-3.5 text-[#66d925]" />
              Islamabad Head Office (Blue Area)
            </span>
            <span className="hidden sm:inline text-blue-300/50">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#66d925]" />
              Client Assistance & Transition Active
            </span>
            <span className="hidden md:inline text-blue-300/50">|</span>
            <span className="hidden md:flex items-center gap-1.5 font-bold text-[#66d925]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#66d925]" />
              SECP Registered Firm
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${MCS_INFO.phonePrimary}`} 
              className="flex items-center gap-1.5 text-white hover:text-[#66d925] font-semibold tracking-wide transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#ff4958]" />
              Call: {MCS_INFO.phonePrimary}
            </a>
            <span className="text-blue-300/40">/</span>
            <a 
              href={`tel:${MCS_INFO.phoneMobile}`} 
              className="text-[#66d925] hover:text-white font-bold tracking-wide transition-colors"
            >
              {MCS_INFO.phoneMobile}
            </a>
            
            <a 
              href={`https://wa.me/${MCS_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Modernminds%20Consulting%20Services,%20I%20need%20visa%20and%20work%20permit%20guidance`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#66d925] hover:bg-[#55ba1d] text-slate-950 font-extrabold text-[11px] shadow-xs transition-colors"
            >
              WhatsApp Us
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' : 'bg-white py-3.5'} border-b border-slate-200 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <a 
            href="#home" 
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Modernminds Consulting Services Homepage"
          >
            <Logo variant="inline" size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-xs font-bold tracking-wider transition-colors py-1 relative ${
                    isActive 
                      ? 'text-[#074592] font-black' 
                      : 'text-slate-600 hover:text-[#074592]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4958] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* User Actions / Portal / Notifications */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              id="header-notification-btn"
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-600 hover:text-[#074592] hover:bg-blue-50/60 rounded-full transition-colors"
              title="Milestone Alerts & Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ff4958] text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* User Session / Admin Portal Button */}
            {currentUser && currentUser.role === 'admin' ? (
              <button
                id="header-user-portal-btn"
                onClick={onOpenPortal}
                className="flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-[#074592]/5 hover:bg-[#074592]/10 text-[#074592] border border-[#074592]/20 text-xs font-semibold transition-all shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#074592] text-white flex items-center justify-center text-xs font-black uppercase">
                  A
                </div>
                <div className="text-left hidden sm:block">
                  <p className="leading-none text-[11px] font-bold text-slate-900 truncate max-w-[100px]">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-[#66d925] font-black uppercase leading-tight">
                    Admin Panel
                  </p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#074592]" />
              </button>
            ) : null}

            {/* CTA Book Assessment with Brand Red (#ff4958) */}
            <a
              href="#contact-us"
              onClick={() => handleNavClick('#contact-us')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black tracking-wide shadow-sm shadow-[#ff4958]/30 hover:shadow transition-all"
            >
              Free Assessment
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#074592] transition-colors flex items-center justify-between"
              >
                {link.label}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              {currentUser && currentUser.role === 'admin' && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#074592] text-white text-sm font-bold flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-4 h-4" />
                  Open Admin Dashboard
                </button>
              )}

              <a
                href="#contact-us"
                onClick={() => handleNavClick('#contact-us')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#ff4958] text-white text-sm font-bold text-center"
              >
                Free Overseas Assessment
              </a>

              <a
                href={`tel:${MCS_INFO.phonePrimary}`}
                className="w-full mt-1 py-2 px-3 rounded-lg bg-slate-100 text-slate-900 text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#074592]" />
                Call Islamabad Office: {MCS_INFO.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
