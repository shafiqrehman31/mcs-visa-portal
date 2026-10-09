import React from 'react';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  ArrowUp,
  Lock
} from 'lucide-react';
import { MCS_INFO, TEAM_MEMBERS, TARGET_COUNTRIES } from '../data/mockData';
import { Logo } from './Logo';

interface FooterProps {
  onOpenPortal: () => void;
  onOpenAuth: (role?: 'student' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, onOpenAuth }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Firm Intro */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <Logo variant="inline" theme="dark" size="md" />
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Modernminds Consulting Services (MCS), based in Islamabad, is a registered consulting firm dedicated to European Work Permits, Worldwide Visit Visas, and Professional Higher Education Abroad for Pakistani professionals, workers, and students.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-slate-300">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#66d925]" />
                <span className="font-semibold">SECP Registration: {MCS_INFO.registrationNo}</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#66d925]" />
                <span>{MCS_INFO.supportHours}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Services & Target Countries */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-black text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Our Core Services
            </h4>
            <ul className="space-y-2">
              <li><a href="#work-and-visit-visas" className="hover:text-[#66d925] transition-colors font-semibold text-white">European Work Permits (Poland, Romania, etc.)</a></li>
              <li><a href="#work-and-visit-visas" className="hover:text-[#66d925] transition-colors font-semibold text-white">Visit & Tourist Visas (UK, USA, Schengen, Canada)</a></li>
              <li><a href="#services" className="hover:text-[#66d925] transition-colors">Student Admission (Complete Process)</a></li>
              <li><a href="#services" className="hover:text-[#66d925] transition-colors">Visa Consultant & Dossier Prep</a></li>
              <li><a href="#services" className="hover:text-[#66d925] transition-colors">Medical & MBBS Abroad Advisory</a></li>
              <li><a href="#services" className="hover:text-[#66d925] transition-colors">Academic Article & SOP Services</a></li>
              <li><a href="#services" className="hover:text-[#66d925] transition-colors">24/7 Client Overseas Transition Support</a></li>
            </ul>
          </div>

          {/* Col 3: Target Countries & Team */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-black text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Destinations
            </h4>
            <ul className="space-y-1.5">
              {TARGET_COUNTRIES.map((c) => (
                <li key={c.id}>
                  <a href="#countries" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>{c.flag} {c.name}</span>
                    <span className="text-[10px] text-[#66d925] font-black">{c.visaSuccessRate}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Islamabad Contact & Call Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-black text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Islamabad Office
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#66d925] shrink-0 mt-0.5" />
                <span>{MCS_INFO.fullAddress}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ff4958] shrink-0" />
                <a href={`tel:${MCS_INFO.phonePrimary}`} className="text-white font-black hover:text-[#66d925]">
                  {MCS_INFO.phonePrimary}
                </a>
                <span className="text-slate-600">/</span>
                <a href={`tel:${MCS_INFO.phoneMobile}`} className="text-[#66d925] font-black hover:text-white">
                  {MCS_INFO.phoneMobile}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${MCS_INFO.email}`} className="hover:text-white">
                  {MCS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact-us"
                className="w-full py-2.5 px-3 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white font-black text-center block transition-all shadow-md"
              >
                Inquire for Visa Assistance
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Modernminds Consulting Services (MCS), Islamabad. All rights reserved. Registered Consulting Firm.
          </p>
          <div className="flex items-center gap-4">
            <span>Leadership: Ali Anwar (CEO) | Dr. Sayyed Numan Akbar (MD)</span>
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                onOpenAuth('admin');
              }}
              className="text-slate-700 hover:text-[#66d925] transition-colors p-1"
              title="Admin Portal Access"
            >
              <Lock className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
