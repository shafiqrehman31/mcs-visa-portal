import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plane, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  DollarSign, 
  Building2, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { getWorkAndVisitCountries, onStorageUpdate } from '../services/storageService';
import { WorkAndVisitCountryInfo } from '../types';

interface WorkAndVisitVisasProps {
  onSelectCountryForInquiry?: (countryName: string, serviceType: string) => void;
  customHeadline?: string;
  customSubtitle?: string;
}

export const WorkAndVisitVisas: React.FC<WorkAndVisitVisasProps> = ({
  onSelectCountryForInquiry,
  customHeadline,
  customSubtitle,
}) => {
  const [countriesList, setCountriesList] = useState<WorkAndVisitCountryInfo[]>(getWorkAndVisitCountries());
  const [activeCategory, setActiveCategory] = useState<'all' | 'work_permit' | 'visit_visa'>('all');
  const [selectedCountry, setSelectedCountry] = useState<WorkAndVisitCountryInfo | null>(null);

  useEffect(() => {
    const sync = () => {
      setCountriesList(getWorkAndVisitCountries());
    };
    sync();
    return onStorageUpdate(sync);
  }, []);

  const filteredCountries = countriesList.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'work_permit') return item.category === 'work_permit' || item.category === 'both';
    if (activeCategory === 'visit_visa') return item.category === 'visit_visa' || item.category === 'both';
    return true;
  });

  const handleApplyClick = (country: WorkAndVisitCountryInfo) => {
    const serviceType = country.category === 'visit_visa' ? 'Visit Visa / Tourist Visa' : 'Work Permit & Employment Visas';
    if (onSelectCountryForInquiry) {
      onSelectCountryForInquiry(country.name, serviceType);
    }
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="work-and-visit-visas" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#074592]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#66d925]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#074592]/10 border border-[#074592]/20 text-[#074592] text-xs font-black tracking-wide uppercase mb-3.5">
            <Briefcase className="w-3.5 h-3.5 text-[#ff4958]" />
            <span>GLOBAL EMPLOYMENT & TRAVEL DESTINATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {customHeadline || "Target Countries for Work Permits & Visit Visas"}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {customSubtitle || "Modernminds facilitates certified legal European Work Permits, Government Employment Authorizations, and Worldwide Tourist/Visit Visas for Pakistani citizens with proven success records."}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-[#074592] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Destinations ({countriesList.length})
            </button>

            <button
              onClick={() => setActiveCategory('work_permit')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'work_permit'
                  ? 'bg-[#074592] text-[#66d925] shadow-md ring-2 ring-[#66d925]/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#66d925]" />
              <span>European & Global Work Permits</span>
            </button>

            <button
              onClick={() => setActiveCategory('visit_visa')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'visit_visa'
                  ? 'bg-[#074592] text-white shadow-md ring-2 ring-[#ff4958]/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Plane className="w-4 h-4 text-[#ff4958]" />
              <span>Worldwide Visit & Tourist Visas</span>
            </button>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => {
            const isWork = country.category === 'work_permit' || country.category === 'both';
            const isVisit = country.category === 'visit_visa';

            return (
              <div 
                key={country.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#074592]/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Card Image Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={country.image} 
                    alt={`${country.name} immigration`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-2xl drop-shadow-md" role="img" aria-label={country.name}>
                      {country.flag}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#66d925] text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {country.visaSuccessRate} Grant Rate
                      </span>
                    </div>
                  </div>

                  {/* Country Name & Tagline */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-black text-white drop-shadow-sm">
                        {country.name}
                      </h3>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                        country.category === 'work_permit'
                          ? 'bg-[#074592] text-[#66d925] border border-[#66d925]/40'
                          : country.category === 'visit_visa'
                          ? 'bg-[#ff4958] text-white'
                          : 'bg-[#66d925] text-slate-950'
                      }`}>
                        {country.category === 'work_permit' ? 'Work Permit' : country.category === 'visit_visa' ? 'Visit Visa' : 'Work & Visit'}
                      </span>
                    </div>
                    <p className="text-xs text-blue-100 line-clamp-1">
                      {country.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
                  
                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        Processing Time
                      </span>
                      <span className="font-black text-slate-800 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-[#074592]" />
                        {country.processingTime}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        {isWork ? 'Income / Package' : 'Solvency Proof'}
                      </span>
                      <span className="font-black text-[#074592] truncate block mt-0.5" title={country.salaryOrProof}>
                        {country.salaryOrProof}
                      </span>
                    </div>
                  </div>

                  {/* Permit / Visa Category */}
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                      Permit / Visa Authorization
                    </span>
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#ff4958] shrink-0" />
                      <span className="truncate">{country.permitTypeOrPurpose}</span>
                    </p>
                  </div>

                  {/* Top Sectors or Travel Highlights */}
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {isWork ? 'Demand Job Sectors' : 'Popular Itineraries'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {country.topSectorsOrDestinations.slice(0, 3).map((item, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-blue-50/80 text-[#074592] text-[11px] font-bold border border-blue-100 truncate max-w-[200px]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Highlight Bullets */}
                  <ul className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
                    {country.keyHighlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#66d925] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCountry(country)}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 hover:border-[#074592] hover:bg-slate-50 text-slate-700 hover:text-[#074592] text-xs font-bold transition-all text-center cursor-pointer"
                    >
                      View Dossier
                    </button>

                    <button
                      onClick={() => handleApplyClick(country)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Islamabad Office Guarantee Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#074592] via-[#05336e] to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#66d925]/20 text-[#66d925] border border-[#66d925]/40 text-xs font-black">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% SECP Registered & Direct Embassy Filing</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Need a Case Evaluation for a Work Permit or Visit Visa?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl">
              Bring your passport, educational or trade credentials, and bank statements to our Blue Area, Islamabad office. Our licensed legal advisors assess your profile with zero upfront consultation fee.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a 
              href="tel:03002346521"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-[#074592] hover:bg-blue-50 text-xs font-black tracking-wide text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Call Hotline: 03002346521</span>
            </a>

            <a 
              href="#contact-us"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black tracking-wide text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Book Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Country Detail Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200 text-left">
          <div 
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 bg-gradient-to-r from-[#074592] to-[#05336e] text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl" role="img" aria-label={selectedCountry.name}>
                    {selectedCountry.flag}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      {selectedCountry.name}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#66d925] text-slate-950 font-black">
                        {selectedCountry.visaSuccessRate} Visa Success
                      </span>
                    </h3>
                    <p className="text-xs text-blue-200 mt-1">
                      {selectedCountry.tagline}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCountry(null)}
                  className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Scroll */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
              
              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Processing Duration</span>
                  <span className="font-extrabold text-slate-900 mt-0.5 block">{selectedCountry.processingTime}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Visa / Permit Validity</span>
                  <span className="font-extrabold text-slate-900 mt-0.5 block">{selectedCountry.validity}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Salary / Solvency</span>
                  <span className="font-extrabold text-[#074592] mt-0.5 block">{selectedCountry.salaryOrProof}</span>
                </div>
              </div>

              {/* Legal Visa / Permit Category */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#ff4958]" />
                  Official Consular / Permit Classification
                </h4>
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-800 font-semibold">
                  {selectedCountry.permitTypeOrPurpose}
                </div>
              </div>

              {/* Demand Sectors or Itineraries */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#074592]" />
                  {selectedCountry.category === 'visit_visa' ? 'Recommended Travel Itineraries & Purposes' : 'In-Demand Employment Categories'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCountry.topSectorsOrDestinations.map((sector, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#074592]" />
                      <span>{sector}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Requirements */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#66d925]" />
                  Required Documentation for Pakistani Citizens
                </h4>
                <ul className="space-y-2 text-xs">
                  {selectedCountry.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-[#66d925] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits & Highlights */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#ff4958]" />
                  Key Highlights & Relocation Advantages
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedCountry.keyHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#074592] font-black">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedCountry(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  const target = selectedCountry;
                  setSelectedCountry(null);
                  handleApplyClick(target);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Initiate Visa Application for {selectedCountry.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
