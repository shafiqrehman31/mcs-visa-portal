import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  FileCheck2, 
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { MCS_INFO, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { SiteContent } from '../types';

interface WhyChooseUsProps {
  content?: SiteContent['whyUs'];
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ content }) => {
  const c = content || DEFAULT_SITE_CONTENT.whyUs;

  const reasons = [
    {
      icon: <MapPin className="w-6 h-6 text-[#074592]" />,
      title: "Physical Islamabad Head Office",
      description: "Conveniently located at Blue Area Islamabad, prospective students and parents can visit us anytime for in-person document scrutiny, legal affidavits, and one-on-one counseling."
    },
    {
      icon: <Award className="w-6 h-6 text-[#ff4958]" />,
      title: "98.8% Documented Visa Success",
      description: "Under the legal leadership of Sher Muhammad Khan, our multi-tier visa audit and mock interview coaching virtually eliminates embassy rejection risks across Schengen & Eurasia."
    },
    {
      icon: <Clock className="w-6 h-6 text-[#4fa81d]" />,
      title: "Genuine 24/7 Overseas Support",
      description: "Unlike ordinary agencies, MCS provides on-ground assistance upon arrival in Minsk, Moscow, Lisbon, Rome, Istanbul, and Belgrade, including housing and emergency care."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#074592]" />,
      title: "SECP Registered Consulting Firm",
      description: "Fully registered and compliant Pakistani consulting entity (SECP-ISB). We operate transparently with official bank invoices and zero hidden surcharges."
    },
    {
      icon: <Users className="w-6 h-6 text-[#4fa81d]" />,
      title: "Specialized Medical Advisory",
      description: "With Dr. Sayyed Numan Akbar (MD) directing academic compliance, our medical candidates receive PMDC/WFME accredited curriculums and guaranteed clinical internships."
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-[#ff4958]" />,
      title: "Complete Documentation Assistance",
      description: "End-to-end management of IBCC, HEC, and MOFA attestations, apostilles, sworn translations, and statement of purpose (SOP) drafting for scholarships."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#074592]/10 text-[#074592] text-xs font-black uppercase tracking-wider mb-3 border border-[#074592]/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#074592]" />
            {c.badgeText}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {c.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            {c.subtitle}
          </p>
          <div className="w-20 h-1 bg-[#ff4958] mx-auto mt-4 rounded-full" />
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#074592] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {reason.icon}
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mb-2.5 group-hover:text-[#074592] transition-colors">
                {reason.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Box with Brand Navy (#074592) & Accent Green (#66d925) */}
        <div className="mt-14 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-left">
          <div className="bg-[#074592] text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-black text-[#66d925]">
                Transparent Accountability
              </span>
              <h3 className="text-lg sm:text-xl font-black mt-1">
                Modernminds (MCS) vs. Ordinary Consultants
              </h3>
            </div>
            <div className="text-xs text-blue-100 font-semibold">
              Registered in Islamabad | Verified Direct Contracts
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 font-bold text-slate-900">
                Overseas Student Support
              </div>
              <div className="md:col-span-4 text-[#074592] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4fa81d] shrink-0" />
                <span>24/7 dedicated support & local coordinators abroad</span>
              </div>
              <div className="md:col-span-4 text-slate-400">
                Stops once student boards the flight
              </div>
            </div>

            <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-slate-50/50">
              <div className="md:col-span-4 font-bold text-slate-900">
                Visa File Vetting
              </div>
              <div className="md:col-span-4 text-[#074592] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4fa81d] shrink-0" />
                <span>Legal audit & mock interview by Sher Muhammad Khan</span>
              </div>
              <div className="md:col-span-4 text-slate-400">
                Generic file templates resulting in frequent refusals
              </div>
            </div>

            <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 font-bold text-slate-900">
                Medical Curriculum Accreditation
              </div>
              <div className="md:col-span-4 text-[#074592] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4fa81d] shrink-0" />
                <span>Medical oversight by Dr. Sayyed Numan Akbar (MD)</span>
              </div>
              <div className="md:col-span-4 text-slate-400">
                Non-accredited programs causing PMDC licensing issues
              </div>
            </div>

            <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-slate-50/50">
              <div className="md:col-span-4 font-bold text-slate-900">
                Fee & Invoice Transparency
              </div>
              <div className="md:col-span-4 text-[#074592] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4fa81d] shrink-0" />
                <span>Direct State Bank tuition transfers, zero hidden surcharges</span>
              </div>
              <div className="md:col-span-4 text-slate-400">
                Undisclosed agent commissions and unverified charges
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
