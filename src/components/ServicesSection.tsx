import React, { useState } from 'react';
import { 
  Briefcase, 
  FileCheck2, 
  GraduationCap, 
  Stethoscope, 
  BookOpenCheck, 
  Headphones, 
  ShieldCheck, 
  PlaneTakeoff,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { SERVICES_LIST, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { SiteContent } from '../types';

interface ServicesSectionProps {
  content?: SiteContent['services'];
  onSelectService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  content, 
  onSelectService 
}) => {
  const c = content || DEFAULT_SITE_CONTENT.services;
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#074592]" />;
      case 'FileCheck2': return <FileCheck2 className="w-6 h-6 text-[#ff4958]" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[#074592]" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-[#ff4958]" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-6 h-6 text-[#074592]" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-[#4fa81d]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#074592]" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-6 h-6 text-[#4fa81d]" />;
      default: return <GraduationCap className="w-6 h-6 text-[#074592]" />;
    }
  };

  const handleInquireService = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    }
    const elem = document.getElementById('contact-us');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#074592]/10 text-[#074592] text-xs font-black uppercase tracking-wider mb-3 border border-[#074592]/20">
            <Briefcase className="w-3.5 h-3.5 text-[#074592]" />
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {SERVICES_LIST.map((service) => {
            const isExpanded = activeServiceId === service.id;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#074592] transition-all p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>

                  <span className="text-[10px] font-black tracking-wider uppercase text-[#074592] bg-[#66d925]/20 px-2 py-0.5 rounded border border-[#66d925]/40">
                    {service.popularFor}
                  </span>

                  <h3 className="text-base font-extrabold text-slate-900 mt-2 mb-2 group-hover:text-[#074592] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.summary}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {service.details.slice(0, 2).map((det, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4fa81d] shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </div>
                    ))}
                  </div>

                  {/* Collapsible deeper details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 animate-in fade-in duration-200">
                      <p className="text-[11px] font-bold text-slate-800 uppercase">Key Benefits:</p>
                      {service.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="text-[11px] text-[#074592] bg-[#074592]/5 p-1.5 rounded flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#66d925]" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveServiceId(isExpanded ? null : service.id)}
                    className="text-xs text-slate-500 hover:text-[#074592] font-bold transition-colors cursor-pointer"
                  >
                    {isExpanded ? 'Show Less' : 'Learn More'}
                  </button>

                  <button
                    onClick={() => handleInquireService(service.title)}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#074592] hover:text-[#ff4958] transition-colors"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner on 24/7 Support and Orientation with Brand Colors */}
        <div className="mt-12 bg-gradient-to-r from-[#074592] via-[#05336e] to-slate-950 rounded-2xl p-6 sm:p-8 text-white text-left shadow-xl border border-blue-800/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#66d925] text-slate-950 text-xs font-black shadow-xs">
                EXCLUSIVE PAKISTANI STUDENT COMMITMENT
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                24/7 Student Support & Pre-Departure Orientation
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                We believe your journey doesn’t end with a visa stamp. Our dedicated local coordinators in Minsk, Moscow, Lisbon, Rome, Istanbul, and Belgrade assist with airport reception, university dormitory registration, residence permits (TRC), and 24/7 emergency care.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <a
                href="#contact-us"
                className="text-center px-5 py-3 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white font-black text-xs shadow-md transition-all"
              >
                Schedule Office Counseling in Islamabad
              </a>
              <p className="text-[11px] text-[#66d925] font-bold text-center">
                Hotlines: 051-4862273 | 03002346521
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
