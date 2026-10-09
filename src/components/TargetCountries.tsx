import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Coins, 
  Briefcase, 
  FileText, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { getTargetCountries, onStorageUpdate } from '../services/storageService';
import { DEFAULT_SITE_CONTENT } from '../data/mockData';
import { TargetCountryInfo, SiteContent } from '../types';

interface TargetCountriesProps {
  content?: SiteContent['countries'];
  onSelectCountryForInquiry?: (countryName: string) => void;
}

export const TargetCountries: React.FC<TargetCountriesProps> = ({ 
  content, 
  onSelectCountryForInquiry 
}) => {
  const c = content || DEFAULT_SITE_CONTENT.countries;
  const [countries, setCountries] = useState<TargetCountryInfo[]>(getTargetCountries());
  const [selectedCountryId, setSelectedCountryId] = useState<string>(countries[0]?.id || 'russia');

  useEffect(() => {
    const sync = () => {
      const updated = getTargetCountries();
      setCountries(updated);
      if (updated.length > 0 && !updated.find(item => item.id === selectedCountryId)) {
        setSelectedCountryId(updated[0].id);
      }
    };
    sync();
    return onStorageUpdate(sync);
  }, [selectedCountryId]);

  const activeCountry = countries.find(item => item.id === selectedCountryId) || countries[0];

  if (!activeCountry) return null;

  const handleApplyClick = (country: TargetCountryInfo) => {
    if (onSelectCountryForInquiry) {
      onSelectCountryForInquiry(country.name);
    }
    const contactElem = document.getElementById('contact-us');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="countries" className="py-20 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#074592]/10 text-[#074592] text-xs font-black uppercase tracking-wider mb-3 border border-[#074592]/20">
            <Globe2 className="w-3.5 h-3.5 text-[#074592]" />
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

        {/* Country Selector Pills with Brand Blue (#074592) & Accent Green (#66d925) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {countries.map((country) => {
            const isSelected = country.id === selectedCountryId;
            return (
              <button
                key={country.id}
                onClick={() => setSelectedCountryId(country.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#074592] text-white shadow-md shadow-[#074592]/25 scale-105' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span className="text-lg">{country.flag}</span>
                <span>{country.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                  isSelected ? 'bg-[#66d925] text-slate-950' : 'bg-slate-200 text-slate-800'
                }`}>
                  {country.visaSuccessRate}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Country Detailed Showcase Card */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Image & Quick Highlight Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img 
                src={activeCountry.image} 
                alt={`${activeCountry.name} Education`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-black flex items-center gap-1.5 shadow-sm border border-slate-200/80">
                  <span className="text-base">{activeCountry.flag}</span>
                  {activeCountry.name} Specialized Admissions
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <p className="text-xs uppercase tracking-wider text-[#66d925] font-black">
                  High Commission Verified
                </p>
                <h3 className="text-2xl font-black mt-1">
                  {activeCountry.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {activeCountry.tagline}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-white/20 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Visa Ratio</span>
                    <span className="font-black text-[#66d925] text-sm">{activeCountry.visaSuccessRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Processing</span>
                    <span className="font-extrabold text-white text-sm">{activeCountry.processingTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-depth Details Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 text-left">
              
              {/* Core Financial & Work Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Coins className="w-4 h-4 text-[#074592]" />
                    <span className="font-semibold">Tuition Estimate</span>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900">{activeCountry.tuitionRange}</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Clock className="w-4 h-4 text-[#074592]" />
                    <span className="font-semibold">Living Cost</span>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900">{activeCountry.livingCost}</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Briefcase className="w-4 h-4 text-[#4fa81d]" />
                    <span className="font-semibold">Student Work Rights</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-snug">{activeCountry.workRights}</p>
                </div>
              </div>

              {/* Popular Degrees */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#074592]" />
                  Leading In-Demand Degree Programs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCountry.popularPrograms.map((prog, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#074592]/5 text-[#074592] border border-[#074592]/20 text-xs font-bold"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>

              {/* Destination Highlights */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#4fa81d]" />
                  Key Advantages for Pakistani Students
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeCountry.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4fa81d] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documentation & Entry Requirements */}
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#ff4958]" />
                  Eligibility & Required Documents for Submission
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activeCountry.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff4958]" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  <span className="font-bold text-slate-700">Next Intake:</span> {activeCountry.intakes}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleApplyClick(activeCountry)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black shadow-sm transition-all cursor-pointer"
                  >
                    <span>Apply for {activeCountry.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
