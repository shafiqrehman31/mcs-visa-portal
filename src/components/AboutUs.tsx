import React from 'react';
import { 
  Building2, 
  Target, 
  Award, 
  Headphones, 
  FileText, 
  PlaneTakeoff, 
  Phone, 
  CheckCircle2, 
  HeartHandshake
} from 'lucide-react';
import { MCS_INFO, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { SiteContent } from '../types';
import { Logo } from './Logo';

interface AboutUsProps {
  content?: SiteContent['about'];
}

export const AboutUs: React.FC<AboutUsProps> = ({ content }) => {
  const c = content || DEFAULT_SITE_CONTENT.about;

  return (
    <section id="about-us" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#074592]/10 text-[#074592] text-xs font-black uppercase tracking-wider mb-3 border border-[#074592]/20">
            <Building2 className="w-3.5 h-3.5 text-[#074592]" />
            {c.badgeText}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {c.headline}
          </h2>
          <div className="w-20 h-1 bg-[#ff4958] mx-auto mt-4 rounded-full" />
        </div>

        {/* Featured Mission Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase / Experience Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80" 
                alt="Modernminds Consulting Services Islamabad Office" 
                className="w-full h-[460px] object-cover opacity-85 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="px-3 py-1 rounded-full bg-[#ff4958] text-white font-black text-xs shadow-md">
                  {c.cardTag}
                </span>
                <h3 className="text-xl font-black mt-2">
                  {c.cardTitle}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {c.cardSubtitle}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-[#66d925] font-bold">
                  <span>Call: {MCS_INFO.phonePrimary}</span>
                  <span>{MCS_INFO.phoneMobile}</span>
                </div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200 max-w-xs text-left">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/70 p-1 flex items-center justify-center shrink-0">
                <Logo variant="mark" size="sm" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 tracking-tight">Modernminds Consulting</p>
                <p className="text-[11px] text-[#66d925] font-bold">SECP Registered Firm • Islamabad</p>
              </div>
            </div>
          </div>

          {/* Text Content with exact user prompt manifesto */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="bg-white p-7 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
              <p className="text-base sm:text-lg font-bold text-[#074592] leading-relaxed">
                {c.manifestoStatement}
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {c.paragraph1}
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {c.paragraph2}
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#074592]/10 text-[#074592] flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">{c.pillar1Title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{c.pillar1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#66d925]/15 text-[#4fa81d] flex items-center justify-center shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">{c.pillar2Title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{c.pillar2Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Assurances: 24/7 Support, Documentation, Pre-Departure */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#66d925] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#66d925]/15 text-[#4fa81d] flex items-center justify-center mb-2.5">
                  <Headphones className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-black text-slate-900">24/7 Student Support</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Ensuring a smooth overseas transition with round-the-clock emergency support.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#074592] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#074592]/10 text-[#074592] flex items-center justify-center mb-2.5">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-black text-slate-900">Documentation Assistance</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Comprehensive IBCC, HEC, MOFA attestation and legal certified translation.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#ff4958] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#ff4958]/10 text-[#ff4958] flex items-center justify-center mb-2.5">
                  <PlaneTakeoff className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-black text-slate-900">Pre-Departure Briefing</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Thorough orientation covering airport procedures, currency exchange & foreign laws.
                </p>
              </div>
            </div>

            {/* In-Person Islamabad Office Invitation */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#074592] to-[#05336e] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
              <div>
                <p className="text-xs font-bold text-[#66d925]">Free Walk-In Consultations</p>
                <p className="text-sm font-black mt-0.5">Visit Our Islamabad Office (Mon – Sat)</p>
                <p className="text-[11px] text-blue-200 mt-0.5">{MCS_INFO.fullAddress}</p>
              </div>
              <a
                href="#contact-us"
                className="px-4 py-2 rounded-lg bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black tracking-wide shrink-0 transition-all shadow-sm"
              >
                Get Directions
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
