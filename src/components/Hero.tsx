import React, { useState } from 'react';
import { 
  Building2, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Globe2, 
  Send,
  CheckCircle2,
  Calendar,
  Sparkles,
  Users,
  Briefcase,
  Plane
} from 'lucide-react';
import { MCS_INFO, TARGET_COUNTRIES, WORK_AND_VISIT_COUNTRIES, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { submitContactInquiry } from '../services/storageService';
import { SiteContent } from '../types';

interface HeroProps {
  onSelectCountry?: (countryName: string) => void;
  content?: SiteContent['hero'];
}

export const Hero: React.FC<HeroProps> = ({ onSelectCountry, content }) => {
  const [applicantCategory, setApplicantCategory] = useState<'work_permit' | 'visit_visa' | 'student'>('work_permit');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    targetCountry: 'Poland',
    serviceRequired: 'European Work Permits & Employment',
    qualification: 'Skilled Tradesman / Experienced Worker',
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCategoryChange = (cat: 'work_permit' | 'visit_visa' | 'student') => {
    setApplicantCategory(cat);
    if (cat === 'work_permit') {
      setFormData(prev => ({
        ...prev,
        targetCountry: 'Poland',
        serviceRequired: 'European Work Permits & Employment',
        qualification: 'Skilled Tradesman / Experienced Worker'
      }));
    } else if (cat === 'visit_visa') {
      setFormData(prev => ({
        ...prev,
        targetCountry: 'United Kingdom',
        serviceRequired: 'Worldwide Visit & Tourist Visas',
        qualification: 'Business Owner / Self-Employed'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        targetCountry: 'Belarus',
        serviceRequired: 'Student Admissions Abroad',
        qualification: 'Intermediate / FSc / A-Levels'
      }));
    }
  };

  // Content from CMS or defaults
  const heroContent = content || {
    badgeText: "ISLAMABAD REGISTERED CONSULTING FIRM (MCS)",
    headline: "Premier Immigration, Work Permits, Study Abroad & Visit Visas for",
    headlineHighlight: "Pakistani Professionals & Students",
    subtitle: "Modernminds Consulting Services (MCS), based in Islamabad, delivers certified expertise in European Work Permits, Global Tourist & Visit Visas, and World-Class University Admissions. From legal contract attestation and bank statements to embassy interviews and seamless relocation.",
    phoneButtonText: "03002346521",
    phoneButtonNumber: "03002346521",
    primaryCtaText: "Book Free Assessment",
    stat1Value: "98.8%",
    stat1Label: "Visa Approval Rate",
    stat2Value: "2,450+",
    stat2Label: "Clients Facilitated",
    stat3Value: "Work & Visit",
    stat3Label: "Licensed Pathways",
    stat4Value: "Islamabad",
    stat4Label: "Head Office"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setLoading(true);

    setTimeout(() => {
      submitContactInquiry({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || `${formData.fullName.toLowerCase().replace(/\s+/g, '')}@modernminds.pk`,
        city: formData.city,
        targetCountry: formData.targetCountry,
        category: applicantCategory,
        serviceRequired: formData.serviceRequired,
        qualification: formData.qualification,
        message: formData.message || `Inquiry for ${formData.targetCountry} (${formData.serviceRequired}) submitted via Hero inquiry form.`
      });

      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
    }, 400);
  };

  return (
    <section id="home" className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slate-950 text-white min-h-[640px]">
      {/* High-Resolution University Campus Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85" 
          alt="International University Campus Architecture" 
          className="w-full h-full object-cover object-center"
        />
        {/* Layered cinematic gradient overlays with Brand Navy (#074592) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#074592]/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#66d925_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Registered Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#074592]/80 border border-[#66d925]/60 text-white text-xs font-bold backdrop-blur-md shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-[#66d925]" />
              <span>{heroContent.badgeText}</span>
              <span className="w-2 h-2 rounded-full bg-[#66d925] animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {heroContent.headline}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66d925] via-emerald-300 to-[#66d925]">
                {heroContent.headlineHighlight}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              {heroContent.subtitle}
            </p>

            {/* Service Category Quick Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#074592]/90 border border-blue-400/40 text-white text-xs font-black">
                <Briefcase className="w-3.5 h-3.5 text-[#66d925]" />
                <span>European Work Permits</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4958]/90 border border-red-400/40 text-white text-xs font-black">
                <Plane className="w-3.5 h-3.5 text-white" />
                <span>Worldwide Visit & Tourist Visas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-bold">
                <Globe2 className="w-3.5 h-3.5 text-[#66d925]" />
                <span>Global Student Admissions</span>
              </span>
            </div>

            {/* Target Countries Quick Badges */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-300 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-[#66d925]" />
                  Popular Work, Visit & Study Destinations:
                </span>
                <a href="#work-and-visit-visas" className="text-[#66d925] hover:underline text-[11px] font-bold">
                  View Work & Visit Quotas →
                </a>
              </p>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1">
                {WORK_AND_VISIT_COUNTRIES.slice(0, 6).map((c) => (
                  <a
                    key={c.id}
                    href="#work-and-visit-visas"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 hover:bg-[#074592] border border-[#66d925]/40 hover:border-[#66d925] text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                    <span className="text-[10px] text-[#66d925] font-black">{c.category === 'visit_visa' ? 'Visit' : 'Work'}</span>
                  </a>
                ))}
                {TARGET_COUNTRIES.slice(0, 6).map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => {
                      if (onSelectCountry) onSelectCountry(c.name);
                      const el = document.getElementById('countries');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 hover:bg-[#074592] border border-slate-700/80 hover:border-[#66d925]/60 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                    <span className="text-[10px] text-[#66d925] font-bold ml-0.5">{c.visaSuccessRate}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons & Phone Hotlines (Red CTA + Blue Explore + Green WhatsApp/Call) */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#work-and-visit-visas"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#074592] hover:bg-[#05336e] border border-blue-400/40 text-white font-black text-xs sm:text-sm shadow-lg transition-all"
              >
                <Briefcase className="w-4 h-4 text-[#66d925]" />
                <span>Work Permits & Visit Visas</span>
              </a>

              <a
                href="#contact-us"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#ff4958]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{heroContent.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Phone Button: 03002346521 */}
              <a
                href={`tel:${heroContent.phoneButtonNumber || '03002346521'}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#66d925] hover:bg-[#55ba1d] text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all"
              >
                <Phone className="w-4 h-4 text-[#074592]" />
                <span>{heroContent.phoneButtonText || '03002346521'}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#66d925]">{heroContent.stat1Value}</p>
                <p className="text-xs text-slate-400 font-medium">{heroContent.stat1Label}</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">{heroContent.stat2Value}</p>
                <p className="text-xs text-slate-400 font-medium">{heroContent.stat2Label}</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#ff4958]">{heroContent.stat3Value}</p>
                <p className="text-xs text-slate-400 font-medium">{heroContent.stat3Label}</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#66d925]">{heroContent.stat4Value}</p>
                <p className="text-xs text-slate-400 font-medium">{heroContent.stat4Label}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Business & Student Inquiry Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-900 border border-slate-200/80 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#074592] bg-[#074592]/10 px-2.5 py-0.5 rounded border border-[#074592]/20">
                    Official Consultancy Desk
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    Direct Inquiry & Profile Evaluation
                  </h2>
                  <p className="text-xs text-slate-500">
                    Response within 2 hours by Islamabad Senior Advisors
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#074592]/10 text-[#074592] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#074592]" />
                </div>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#66d925]/20 text-[#66d925] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#4fa81d]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Inquiry Received!</h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Thank you, <span className="font-semibold">{formData.fullName}</span>. Our Islamabad senior visa consultant will contact you at <span className="font-semibold">{formData.phone}</span> shortly.
                  </p>
                  <div className="pt-2">
                    <p className="text-xs text-[#074592] bg-[#074592]/10 rounded-lg p-2 font-bold border border-[#074592]/20">
                      Immediate Assistance? Call 03002346521
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                  {/* Category Selector for Non-Students vs Students */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                      I am applying for:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => handleCategoryChange('work_permit')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                          applicantCategory === 'work_permit'
                            ? 'bg-[#074592] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <span>💼</span>
                        <span className="truncate">Work Permit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategoryChange('visit_visa')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                          applicantCategory === 'visit_visa'
                            ? 'bg-[#074592] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <span>✈️</span>
                        <span className="truncate">Visit Visa</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategoryChange('student')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                          applicantCategory === 'student'
                            ? 'bg-[#074592] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <span>🎓</span>
                        <span className="truncate">Study Abroad</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={applicantCategory === 'student' ? 'e.g. Muhammad Usman' : 'e.g. Tariq Mahmood'}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your City
                      </label>
                      <input
                        type="text"
                        placeholder="Islamabad / Rawalpindi / Lahore"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Target Country *
                      </label>
                      <select
                        value={formData.targetCountry}
                        onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden bg-white"
                      >
                        {applicantCategory === 'work_permit' && (
                          <optgroup label="European Work Permit Destinations">
                            {WORK_AND_VISIT_COUNTRIES.filter(c => c.category === 'work_permit').map((wc) => (
                              <option key={wc.id} value={wc.name}>
                                {wc.name} ({wc.flag}) - Work Permit
                              </option>
                            ))}
                          </optgroup>
                        )}
                        {applicantCategory === 'visit_visa' && (
                          <optgroup label="Tourist & Visit Visa Destinations">
                            {WORK_AND_VISIT_COUNTRIES.filter(c => c.category === 'visit_visa').map((wc) => (
                              <option key={wc.id} value={wc.name}>
                                {wc.name} ({wc.flag}) - Visit Visa
                              </option>
                            ))}
                          </optgroup>
                        )}
                        {applicantCategory === 'student' && (
                          <optgroup label="Study Destinations">
                            {TARGET_COUNTRIES.map((tc) => (
                              <option key={tc.id} value={tc.name}>
                                {tc.name} ({tc.flag})
                              </option>
                            ))}
                          </optgroup>
                        )}
                        <optgroup label="Other Available Destinations">
                          {applicantCategory !== 'work_permit' && (
                            <option value="Poland">Poland (🇵🇱) - Work</option>
                          )}
                          {applicantCategory !== 'visit_visa' && (
                            <option value="United Kingdom">United Kingdom (🇬🇧) - Visit</option>
                          )}
                          {applicantCategory !== 'student' && (
                            <option value="Belarus">Belarus (🇧🇾) - Study</option>
                          )}
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Service Needed *
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden bg-white"
                      >
                        {applicantCategory === 'work_permit' && (
                          <>
                            <option value="European Work Permits & Employment">European Work Permits & Employment</option>
                            <option value="Voivodeship & Ministry Work Authorization">Voivodeship & Ministry Work Authorization</option>
                            <option value="Type-D National Work Visa Stamping">Type-D National Work Visa Stamping</option>
                            <option value="Skilled Trades & Logistics Work Permit">Skilled Trades & Logistics Work Permit</option>
                          </>
                        )}
                        {applicantCategory === 'visit_visa' && (
                          <>
                            <option value="Worldwide Visit & Tourist Visas">Worldwide Visit & Tourist Visas</option>
                            <option value="UK Standard Visitor Visa (6-Month)">UK Standard Visitor Visa (6-Month)</option>
                            <option value="Schengen Tourist & Business Visa">Schengen Tourist & Business Visa</option>
                            <option value="USA B1/B2 Visitor Visa Prep">USA B1/B2 Visitor Visa Prep</option>
                            <option value="Canada Visitor Visa Application">Canada Visitor Visa Application</option>
                          </>
                        )}
                        {applicantCategory === 'student' && (
                          <>
                            <option value="Student Admissions Abroad">Student Admissions Abroad</option>
                            <option value="Visa Consultancy & Embassy File Prep">Visa Consultancy & Embassy File Prep</option>
                            <option value="Medical Admissions (MBBS/MD)">Medical Admissions (MBBS/MD)</option>
                            <option value="DSU Italian Scholarship Filing">DSU Italian Scholarship Filing</option>
                            <option value="24/7 Airport & Transition Support">24/7 Airport & Transition Support</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="client@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {applicantCategory === 'work_permit'
                          ? 'Trade / Experience'
                          : applicantCategory === 'visit_visa'
                          ? 'Occupation / Source'
                          : 'Current Qualification'}
                      </label>
                      <select
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden bg-white"
                      >
                        {applicantCategory === 'work_permit' && (
                          <>
                            <option value="Skilled Tradesman / Experienced Worker">Skilled Tradesman / Experienced Worker</option>
                            <option value="Logistics / Heavy Vehicle Driver / Forklift">Logistics / Heavy Driver / Forklift</option>
                            <option value="Construction & Civil Works">Construction & Civil Works</option>
                            <option value="Hospitality & Culinary Worker">Hospitality & Culinary Worker</option>
                            <option value="Engineering & IT Professional">Engineering & IT Professional</option>
                            <option value="Factory & Warehouse Operative">Factory & Warehouse Operative</option>
                          </>
                        )}
                        {applicantCategory === 'visit_visa' && (
                          <>
                            <option value="Business Owner / Self-Employed">Business Owner / Self-Employed</option>
                            <option value="Corporate Salaried Professional">Corporate Salaried Professional</option>
                            <option value="Freelancer / Consultant">Freelancer / Consultant</option>
                            <option value="Family Traveler / Homemaker">Family Traveler / Homemaker</option>
                            <option value="Retired Government / Military Officer">Retired Govt / Military Officer</option>
                          </>
                        )}
                        {applicantCategory === 'student' && (
                          <>
                            <option value="Matric / O-Levels">Matric / O-Levels</option>
                            <option value="Intermediate / FSc / A-Levels">Intermediate / FSc / A-Levels</option>
                            <option value="Bachelor's Degree (BS / BA)">Bachelor's Degree (BS / BA)</option>
                            <option value="Master's Degree (MS / MPhil)">Master's Degree (MS / MPhil)</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-[#074592] hover:bg-[#05336e] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting to Islamabad Desk...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#66d925]" />
                        <span>Submit Free Profile Assessment</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center font-medium">
                    Strict privacy. Islamabad Head Office: 051-4862273 / 03002346521
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
