import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkAndVisitVisas } from './components/WorkAndVisitVisas';
import { JobOpportunitiesSection } from './components/JobOpportunitiesSection';
import { AboutUs } from './components/AboutUs';
import { TargetCountries } from './components/TargetCountries';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TeamSection } from './components/TeamSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { NotificationCenter } from './components/NotificationCenter';
import { AuthModal } from './components/AuthModal';
import { PortalModal } from './components/PortalModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { 
  getCurrentUser, 
  logoutUser, 
  onStorageUpdate, 
  getSiteContent 
} from './services/storageService';
import { User, Role, SiteContent } from './types';
import { DEFAULT_SITE_CONTENT } from './data/mockData';

export default function App() {
  const [currentUser, setUser] = useState<User | null>(null);
  const [siteContent, setSiteContent] = useState<SiteContent>(getSiteContent());
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Cross-component prefilling for inquiry form
  const [prefilledCountry, setPrefilledCountry] = useState<string>('Russia');
  const [prefilledService, setPrefilledService] = useState<string>('Visa Consultant');
  const [prefilledTeamMember, setPrefilledTeamMember] = useState<string>('');

  useEffect(() => {
    setUser(getCurrentUser());
    setSiteContent(getSiteContent());

    const unsub = onStorageUpdate(() => {
      setUser(getCurrentUser());
      setSiteContent(getSiteContent());
    });

    // Check if URL specifies Admin access (/admin, #/admin, #admin, ?admin=true)
    const checkAdminUrl = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const path = (window.location.pathname || '').toLowerCase();
      const search = (window.location.search || '').toLowerCase();
      const isAdminRoute = 
        hash === '#admin' || 
        hash === '#/admin' || 
        hash === '#admin-portal' || 
        hash === '#admin-login' ||
        path === '/admin' ||
        path === '/admin/' ||
        search.includes('admin=true') ||
        search.includes('admin=1');

      if (isAdminRoute) {
        const user = getCurrentUser();
        if (user && user.role === 'admin') {
          setIsPortalOpen(true);
          setIsAuthOpen(false);
        } else {
          setIsAuthOpen(true);
          setIsPortalOpen(false);
        }
      }
    };

    checkAdminUrl();
    window.addEventListener('hashchange', checkAdminUrl);
    window.addEventListener('popstate', checkAdminUrl);

    // Keyboard shortcut: Alt+A or Ctrl+Shift+A for Admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        const user = getCurrentUser();
        if (user && user.role === 'admin') {
          setIsPortalOpen(prev => !prev);
        } else {
          setIsAuthOpen(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsub();
      window.removeEventListener('hashchange', checkAdminUrl);
      window.removeEventListener('popstate', checkAdminUrl);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenAuth = (_role: Role = 'admin') => {
    const user = getCurrentUser();
    if (user && user.role === 'admin') {
      setIsPortalOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleAuthSuccess = (user: User) => {
    setUser(user);
    setIsAuthOpen(false);
    setIsPortalOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setIsPortalOpen(false);
  };

  const handleSelectCountryForInquiry = (countryName: string) => {
    setPrefilledCountry(countryName);
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
  };

  const handleSelectWorkVisitForInquiry = (countryName: string, serviceType: string) => {
    setPrefilledCountry(countryName);
    setPrefilledService(serviceType);
  };

  const handleSelectTeamMemberForInquiry = (memberName: string) => {
    setPrefilledTeamMember(memberName);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      
      {/* Primary Sticky Header */}
      <Header
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Page Landmark */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          content={siteContent?.hero || DEFAULT_SITE_CONTENT.hero}
          onSelectCountry={handleSelectCountryForInquiry}
        />

        {/* Work Permits & Visit Visas Section */}
        <WorkAndVisitVisas
          onSelectCountryForInquiry={handleSelectWorkVisitForInquiry}
          customHeadline={siteContent?.workAndVisit?.headline}
          customSubtitle={siteContent?.workAndVisit?.subtitle}
        />

        {/* Live Overseas Job Vacancies & Design Brochures */}
        <JobOpportunitiesSection
          onSelectJobForInquiry={(jobTitle, country) => {
            setPrefilledCountry(country);
            setPrefilledService(`Work Permit & Job: ${jobTitle}`);
          }}
        />

        {/* About Us (with exact prompt manifesto & Islamabad head office) */}
        <AboutUs 
          content={siteContent?.about || DEFAULT_SITE_CONTENT.about}
        />

        {/* Target Countries (Belarus, Russia, Portugal, Italy, Turkey, Serbia, etc.) */}
        <TargetCountries
          content={siteContent?.countries || DEFAULT_SITE_CONTENT.countries}
          onSelectCountryForInquiry={handleSelectCountryForInquiry}
        />

        {/* Services Section (Work permit, visa consultant, student admission, medical, article services, 24/7 support) */}
        <ServicesSection
          content={siteContent?.services || DEFAULT_SITE_CONTENT.services}
          onSelectService={handleSelectServiceForInquiry}
        />

        {/* Why Choose Us (SECP registered, 98.8% success, medical advisory, Islamabad office) */}
        <WhyChooseUs 
          content={siteContent?.whyUs || DEFAULT_SITE_CONTENT.whyUs}
        />

        {/* Dedicated Team Section (Ali Anwar, Dr. Sayyed Numan Akbar, Shabana Khan, Sher Muhammad Khan) */}
        <TeamSection
          content={siteContent?.team || DEFAULT_SITE_CONTENT.team}
          onDirectConsult={handleSelectTeamMemberForInquiry}
        />

        {/* FAQs */}
        <FaqSection 
          content={siteContent?.faqs || DEFAULT_SITE_CONTENT.faqs}
        />

        {/* Contact Form on landing page + 051-4862273 and 03002346521 */}
        <ContactSection
          content={siteContent?.contact || DEFAULT_SITE_CONTENT.contact}
          prefilledCountry={prefilledCountry}
          prefilledService={prefilledService}
          prefilledTeamMember={prefilledTeamMember}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPortal={() => {
          if (currentUser) {
            setIsPortalOpen(true);
          } else {
            handleOpenAuth('admin');
          }
        }}
        onOpenAuth={handleOpenAuth}
      />

      {/* 24/7 Interactive Support Chatbot */}
      <Chatbot />

      {/* Automated Milestone Alerts & Notification Center */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        currentUser={currentUser}
        onViewApplication={() => {
          setIsNotificationsOpen(false);
          setIsPortalOpen(true);
        }}
      />

      {/* Dedicated Admin Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Dedicated Real-Time Application Tracking Dashboard & Admin Console */}
      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Public Disclaimer & Fraud Warning Modal (Shows on website load) */}
      <DisclaimerModal />

    </div>
  );
}
