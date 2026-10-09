import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { MCS_INFO, TARGET_COUNTRIES, WORK_AND_VISIT_COUNTRIES, DEFAULT_SITE_CONTENT } from '../data/mockData';
import { submitContactInquiry } from '../services/storageService';
import { SiteContent } from '../types';

interface ContactSectionProps {
  content?: SiteContent['contact'];
  prefilledCountry?: string;
  prefilledService?: string;
  prefilledTeamMember?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  prefilledCountry,
  prefilledService,
  prefilledTeamMember
}) => {
  const c = content || DEFAULT_SITE_CONTENT.contact;
  const [applicantCategory, setApplicantCategory] = useState<'work_permit' | 'visit_visa' | 'student'>('work_permit');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Islamabad',
    targetCountry: prefilledCountry || 'Poland',
    serviceRequired: prefilledService || 'Work Permit & Employment Visas',
    qualification: 'Experienced Professional / Skilled Tradesman',
    message: prefilledTeamMember 
      ? `Requesting consultation with ${prefilledTeamMember} at Modernminds Islamabad office.` 
      : ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategorySwitch = (cat: 'work_permit' | 'visit_visa' | 'student') => {
    setApplicantCategory(cat);
    if (cat === 'work_permit') {
      setFormData(prev => ({
        ...prev,
        targetCountry: 'Poland',
        serviceRequired: 'Work Permit & Employment Visas',
        qualification: 'Experienced Professional / Skilled Tradesman'
      }));
    } else if (cat === 'visit_visa') {
      setFormData(prev => ({
        ...prev,
        targetCountry: 'United Kingdom',
        serviceRequired: 'Worldwide Visit & Tourist Visas',
        qualification: 'Tourist / Family Visitor'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        targetCountry: 'Belarus',
        serviceRequired: 'Student Admission with complete process',
        qualification: 'Intermediate / F.Sc Pre-Medical'
      }));
    }
  };

  // Sync if props change
  React.useEffect(() => {
    if (prefilledCountry) {
      setFormData(prev => ({ ...prev, targetCountry: prefilledCountry }));
      // Auto-detect category from prefilled country
      const workMatch = WORK_AND_VISIT_COUNTRIES.find(c => c.name.toLowerCase() === prefilledCountry.toLowerCase());
      if (workMatch) {
        setApplicantCategory(workMatch.category === 'visit_visa' ? 'visit_visa' : 'work_permit');
      }
    }
    if (prefilledService) {
      setFormData(prev => ({ ...prev, serviceRequired: prefilledService }));
    }
    if (prefilledTeamMember) {
      setFormData(prev => ({ 
        ...prev, 
        message: `Requesting consultation with ${prefilledTeamMember} at Modernminds Islamabad office.` 
      }));
    }
  }, [prefilledCountry, prefilledService, prefilledTeamMember]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitContactInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        targetCountry: formData.targetCountry,
        category: applicantCategory,
        serviceRequired: formData.serviceRequired,
        qualification: formData.qualification,
        message: formData.message || `Professional visa assistance request submitted via landing page (${applicantCategory}).`
      });

      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  return (
    <section id="contact-us" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#074592]/10 text-[#074592] text-xs font-black uppercase tracking-wider mb-3 border border-[#074592]/20">
            <Mail className="w-3.5 h-3.5 text-[#074592]" />
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

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Office Details, Phones & Map Info */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Direct Calling Hotlines Card with Brand Navy (#074592) & Red (#ff4958) */}
            <div className="bg-gradient-to-br from-[#074592] via-[#05336e] to-slate-950 rounded-2xl p-6 text-white shadow-xl border border-blue-800/80">
              <span className="px-2.5 py-1 rounded-md bg-[#ff4958] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                IMMEDIATE OFFICIAL HOTLINES
              </span>
              <h3 className="text-xl font-black mt-3 text-white">
                Call Us for Instant Guidance
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Connect directly with our admissions and visa desks in Islamabad during business hours or via our 24/7 hotline.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`tel:${c.phonePrimary || MCS_INFO.phonePrimary}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#074592] border border-blue-400/40 text-white flex items-center justify-center font-bold">
                      <Phone className="w-5 h-5 text-[#66d925]" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-300 font-medium">Head Office Line (Islamabad)</p>
                      <p className="text-base font-black text-white tracking-wider group-hover:text-[#66d925] transition-colors">
                        {c.phonePrimary || MCS_INFO.phonePrimary}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#66d925] font-black uppercase tracking-wider">Call</span>
                </a>

                <a
                  href={`tel:${c.phoneMobile || MCS_INFO.phoneMobile}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#66d925] text-slate-950 flex items-center justify-center font-bold">
                      <Phone className="w-5 h-5 text-slate-950" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-300 font-medium">Direct Mobile / WhatsApp</p>
                      <p className="text-base font-black text-white tracking-wider group-hover:text-[#66d925] transition-colors">
                        {c.phoneMobile || MCS_INFO.phoneMobile}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#66d925] font-black uppercase tracking-wider">Call</span>
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#66d925]" />
                  {c.hours || MCS_INFO.officeHours}
                </span>
              </div>
            </div>

            {/* Office Location Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#074592]/10 text-[#074592] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#074592]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Islamabad Head Office Address</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {c.address || MCS_INFO.fullAddress}
                  </p>
                  <p className="text-[11px] text-[#ff4958] font-bold mt-1">
                    Near Metro Station, Blue Area Financial District, Islamabad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#ff4958]/10 text-[#ff4958] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-[#ff4958]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Official Correspondence</h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    {c.email || MCS_INFO.email}
                  </p>
                  <p className="text-xs text-slate-500">
                    24/7 Support: {MCS_INFO.supportEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#66d925]/20 text-[#4fa81d] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-[#4fa81d]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Registration & Legal Standing</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Registered Consulting Firm Islamabad ({MCS_INFO.registrationNo})
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Contact Form on Landing Page */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200 shadow-md text-left relative">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#074592] bg-[#074592]/10 px-2.5 py-1 rounded border border-[#074592]/20">
                      Application & Visa Assistance Form
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">
                      Request Professional Visa Assistance
                    </h3>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#ff4958]" />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your academic background and preferred destination. Our team will review your eligibility and reach out with a comprehensive step-by-step roadmap.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#66d925]/20 text-[#4fa81d] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#4fa81d]" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">
                    Visa Consultation Request Registered!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{formData.fullName}</span>. Your case file for <span className="font-bold text-[#074592]">{formData.targetCountry}</span> ({formData.serviceRequired}) has been forwarded to our senior visa consultant Sher Muhammad Khan.
                  </p>
                  <p className="text-xs text-slate-500">
                    A confirmation SMS/call will be placed to <span className="font-semibold text-slate-800">{formData.phone}</span>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          city: 'Islamabad',
                          targetCountry: 'Belarus',
                          serviceRequired: 'Visa Consultant',
                          qualification: 'Intermediate / F.Sc',
                          message: ''
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                    <a
                      href={`tel:${MCS_INFO.phonePrimary}`}
                      className="px-5 py-2.5 rounded-xl bg-[#074592] text-white text-xs font-black hover:bg-[#05336e] flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#66d925]" />
                      Direct Call: {MCS_INFO.phonePrimary}
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Category Selection Tabs */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                      Service Category:
                    </label>
                    <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => handleCategorySwitch('work_permit')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                          applicantCategory === 'work_permit'
                            ? 'bg-[#074592] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <span>💼</span>
                        <span className="truncate">Work Permit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategorySwitch('visit_visa')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                          applicantCategory === 'visit_visa'
                            ? 'bg-[#074592] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <span>✈️</span>
                        <span className="truncate">Visit Visa</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategorySwitch('student')}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                          applicantCategory === 'student'
                            ? 'bg-[#074592] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <span>🎓</span>
                        <span className="truncate">Study Abroad</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={applicantCategory === 'student' ? 'e.g. Asad Ullah' : 'e.g. Tariq Mahmood'}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-2345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Current City in Pakistan
                      </label>
                      <input
                        type="text"
                        placeholder="Islamabad / Rawalpindi / Lahore..."
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Target Country *
                      </label>
                      <select
                        value={formData.targetCountry}
                        onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden bg-white"
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
                          <optgroup label="Worldwide Visit Visa Destinations">
                            {WORK_AND_VISIT_COUNTRIES.filter(c => c.category === 'visit_visa').map((wc) => (
                              <option key={wc.id} value={wc.name}>
                                {wc.name} ({wc.flag}) - Visit Visa
                              </option>
                            ))}
                          </optgroup>
                        )}
                        {applicantCategory === 'student' && (
                          <optgroup label="Student Admission Destinations">
                            {TARGET_COUNTRIES.map((tc) => (
                              <option key={tc.id} value={tc.name}>
                                {tc.name} ({tc.flag})
                              </option>
                            ))}
                          </optgroup>
                        )}
                        <optgroup label="All Destinations">
                          {WORK_AND_VISIT_COUNTRIES.map((wc) => (
                            <option key={`all-${wc.id}`} value={wc.name}>
                              {wc.name} ({wc.flag})
                            </option>
                          ))}
                          {TARGET_COUNTRIES.map((tc) => (
                            <option key={`all-${tc.id}`} value={tc.name}>
                              {tc.name} ({tc.flag})
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Service Requested *
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden bg-white"
                      >
                        {applicantCategory === 'work_permit' && (
                          <>
                            <option value="Work Permit & Employment Visas">European Work Permits & Employment Visas</option>
                            <option value="Voivodeship & Ministry Work Authorization">Voivodeship & Ministry Work Authorization</option>
                            <option value="Type-D National Work Visa Dossier">Type-D National Work Visa Dossier</option>
                            <option value="Skilled Trades & Logistics Work Permit">Skilled Trades & Logistics Work Permit</option>
                          </>
                        )}
                        {applicantCategory === 'visit_visa' && (
                          <>
                            <option value="Worldwide Visit & Tourist Visas">Worldwide Visit & Tourist Visas (UK, USA, Schengen, Canada)</option>
                            <option value="UK Standard Visitor Visa (6-Month)">UK Standard Visitor Visa (6-Month)</option>
                            <option value="Schengen Tourist & Business Visa">Schengen Tourist & Business Visa</option>
                            <option value="USA B1/B2 Visitor Visa Prep">USA B1/B2 Visitor Visa Prep</option>
                            <option value="Family Visit & Tourism Dossier">Family Visit & Tourism Dossier</option>
                          </>
                        )}
                        {applicantCategory === 'student' && (
                          <>
                            <option value="Student Admission with complete process">Student Admission (Complete Process)</option>
                            <option value="Visa Consultant">Visa Consultant & Dossier Filing</option>
                            <option value="Medical">Medical Degree (MBBS/BDS)</option>
                            <option value="Article Services">Article & SOP Writing</option>
                            <option value="Documentation Assistance">Documentation & MOFA Attestation</option>
                            <option value="Pre-Departure">Pre-Departure Orientation</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {applicantCategory === 'work_permit'
                        ? 'Trade, Skills or Professional Experience'
                        : applicantCategory === 'visit_visa'
                        ? 'Current Occupation & Travel Profile'
                        : 'Academic Background / Qualification'}
                    </label>
                    <select
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden bg-white"
                    >
                      {applicantCategory === 'work_permit' && (
                        <>
                          <option value="Experienced Professional / Skilled Tradesman">Experienced Professional / Skilled Tradesman</option>
                          <option value="Logistics, Truck / Heavy Machinery Driver">Logistics, Truck / Heavy Machinery Driver</option>
                          <option value="Construction, Welding, Carpentry, Electrical">Construction, Welding, Carpentry, Electrical</option>
                          <option value="Hospitality, Culinary & Hotel Operations">Hospitality, Culinary & Hotel Operations</option>
                          <option value="Engineering & IT Professional">Engineering & IT Professional</option>
                          <option value="Agriculture & General Manufacturing">Agriculture & General Manufacturing</option>
                        </>
                      )}
                      {applicantCategory === 'visit_visa' && (
                        <>
                          <option value="Tourist / Family Visitor">Tourist / Family Visitor</option>
                          <option value="Business Owner / Commercial Trader">Business Owner / Commercial Trader</option>
                          <option value="Corporate Salaried Professional">Corporate Salaried Professional</option>
                          <option value="Freelancer / Consultant">Freelancer / Consultant</option>
                          <option value="Retired Officer / Senior Citizen">Retired Officer / Senior Citizen</option>
                        </>
                      )}
                      {applicantCategory === 'student' && (
                        <>
                          <option value="Intermediate / F.Sc Pre-Medical">Intermediate / F.Sc Pre-Medical</option>
                          <option value="Intermediate / F.Sc Pre-Engineering / ICS">Intermediate / F.Sc Pre-Engineering / ICS</option>
                          <option value="O-Levels / A-Levels">O-Levels / A-Levels</option>
                          <option value="Bachelor Degree (14 or 16 Years)">Bachelor Degree (14 or 16 Years)</option>
                          <option value="Master Degree / M.Phil">Master Degree / M.Phil</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Specific Questions or Notes for the Consultant
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention any questions regarding fee structure, IELTS waiver, embassy interview, or visa requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white font-black text-sm shadow-md shadow-[#ff4958]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Submitting your case to Islamabad office...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit for Professional Visa Assistance</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="text-[#074592] font-bold">SECP Registered Consultancy</span>
                    <span>Direct Call: 051-4862273</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
