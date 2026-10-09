import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Eye, 
  Share2, 
  Filter, 
  Search, 
  Sparkles, 
  X,
  Phone,
  ExternalLink,
  Award,
  Users
} from 'lucide-react';
import { getJobOpportunities, onStorageUpdate } from '../services/storageService';
import { JobOpportunity } from '../types';
import { MCS_INFO } from '../data/mockData';
import { Logo } from './Logo';

interface JobOpportunitiesSectionProps {
  onSelectJobForInquiry?: (jobTitle: string, country: string) => void;
}

export const JobOpportunitiesSection: React.FC<JobOpportunitiesSectionProps> = ({
  onSelectJobForInquiry
}) => {
  const [jobs, setJobs] = useState<JobOpportunity[]>(getJobOpportunities());
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('all');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBrochureJob, setActiveBrochureJob] = useState<JobOpportunity | null>(null);

  useEffect(() => {
    const sync = () => {
      setJobs(getJobOpportunities());
    };
    sync();
    return onStorageUpdate(sync);
  }, []);

  // Unique countries and sectors
  const countryList = Array.from(new Set(jobs.map(j => j.country))).filter(Boolean);
  const sectorList = Array.from(new Set(jobs.map(j => j.sector))).filter(Boolean);

  const filteredJobs = jobs.filter(job => {
    const matchCountry = selectedCountryFilter === 'all' || job.country.toLowerCase() === selectedCountryFilter.toLowerCase();
    const matchSector = selectedSectorFilter === 'all' || job.sector.toLowerCase() === selectedSectorFilter.toLowerCase();
    const matchSearch = !searchQuery.trim() || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCountry && matchSector && matchSearch;
  });

  const handleApply = (job: JobOpportunity) => {
    if (onSelectJobForInquiry) {
      onSelectJobForInquiry(job.title, job.country);
    }
    const elem = document.getElementById('contact-us');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    if (activeBrochureJob) {
      setActiveBrochureJob(null);
    }
  };

  const handleDownloadBrochure = (job: JobOpportunity) => {
    // Printable view / save brochure trigger
    window.print();
  };

  return (
    <section id="job-opportunities" className="py-20 bg-slate-900 text-white relative overflow-hidden text-left">
      {/* Glow effects */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#074592]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#66d925]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#66d925]/10 text-[#66d925] text-xs font-black uppercase tracking-wider mb-3 border border-[#66d925]/30">
            <Briefcase className="w-3.5 h-3.5 text-[#66d925]" />
            LIVE OVERSEAS EMPLOYMENT & BROCHURES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            New Global Job Opportunities & <span className="text-[#66d925]">Official Brochures</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto">
            Explore active European and international employment quotas with direct employer sponsorships. View and download official brochures designed with full job specifications and legal permits.
          </p>
          <div className="w-24 h-1 bg-[#ff4958] mx-auto mt-5 rounded-full" />
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 sm:p-5 mb-10 shadow-xl">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, company..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-[#66d925] outline-hidden pl-9"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Country Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Country:
              </span>
              <button
                onClick={() => setSelectedCountryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCountryFilter === 'all'
                    ? 'bg-[#66d925] text-slate-950 font-black shadow-xs'
                    : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All Countries
              </button>
              {countryList.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountryFilter(country)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCountryFilter === country
                      ? 'bg-[#66d925] text-slate-950 font-black shadow-xs'
                      : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>

            {/* Sector Dropdown */}
            {sectorList.length > 0 && (
              <div className="w-full md:w-auto shrink-0">
                <select
                  value={selectedSectorFilter}
                  onChange={(e) => setSelectedSectorFilter(e.target.value)}
                  className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:ring-2 focus:ring-[#66d925] outline-hidden cursor-pointer"
                >
                  <option value="all">All Industries / Sectors</option>
                  {sectorList.map(sec => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-12 text-center max-w-lg mx-auto">
            <Briefcase className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Vacancies Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your filter or search query. Our Islamabad office receives new European quotas regularly.
            </p>
            <button
              onClick={() => { setSelectedCountryFilter('all'); setSelectedSectorFilter('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#074592] text-white text-xs font-bold hover:bg-blue-600 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-800/90 rounded-2xl border border-slate-700/90 hover:border-[#66d925]/60 hover:shadow-2xl hover:shadow-[#074592]/20 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Flyer Thumbnail & Badges */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={job.brochureUrl || "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80"}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Country & Quota tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-xs text-white text-xs font-black border border-white/20">
                      <span>{job.countryFlag}</span>
                      <span>{job.country}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#ff4958] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {job.vacanciesCount}
                    </span>
                  </div>

                  {/* Sector Tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-0.5 rounded-md bg-[#66d925] text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      {job.sector}
                    </span>
                  </div>

                  {/* Brochure badge preview button */}
                  <button
                    onClick={() => setActiveBrochureJob(job)}
                    className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-white/90 hover:bg-white text-slate-950 text-[11px] font-black flex items-center gap-1 shadow-md transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#074592]" />
                    <span>View Brochure</span>
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-[#66d925] transition-colors leading-snug mb-1.5">
                      {job.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold mb-3">
                      <Building2 className="w-3.5 h-3.5 text-[#66d925] shrink-0" />
                      <span className="truncate">{job.companyName}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#ff4958] shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>

                    {/* Salary Highlight Box */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Package:</span>
                        <span className="text-xs font-black text-[#66d925]">{job.salary}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[11px] text-slate-300">
                        <span>Contract: {job.contractDuration}</span>
                      </div>
                    </div>

                    {/* Accommodation / Benefits */}
                    <div className="text-[11px] text-slate-300 flex items-start gap-1.5 mb-4">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#66d925] shrink-0 mt-0.5" />
                      <span className="leading-tight">{job.accommodationBenefits}</span>
                    </div>

                    {/* Key Requirements snippet */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="mb-4 space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Key Criteria:</span>
                        {job.requirements.slice(0, 2).map((req, i) => (
                          <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#66d925] shrink-0" />
                            <span className="truncate">{req}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-700/70 flex items-center gap-2">
                    <button
                      onClick={() => setActiveBrochureJob(job)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Brochure</span>
                    </button>

                    <button
                      onClick={() => handleApply(job)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-[#ff4958]/30 transition-all cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Deadline Footer */}
                <div className="bg-slate-950/60 px-5 py-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> Deadline: {job.deadline}
                  </span>
                  <span className="text-[#66d925] font-black">Authorized Pipeline</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Global Assistance Callout */}
        <div className="mt-12 bg-gradient-to-r from-[#074592] to-slate-900 border border-blue-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-black text-white">
              Need a Custom Overseas Employment or Trade Assessment?
            </h4>
            <p className="text-xs sm:text-sm text-blue-200">
              Our certified legal case officers in Islamabad evaluate trade diplomas, driver licenses, and technical credentials.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${MCS_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Modernminds,%20I%20am%20inquiring%20about%20overseas%20job%20vacancies%20and%20brochures`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#66d925] hover:bg-[#55ba1d] text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <span>WhatsApp Job Desk</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="#contact-us"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              Direct Assessment
            </a>
          </div>
        </div>

      </div>

      {/* ================= OFFICIAL DESIGN BROCHURE MODAL ================= */}
      {activeBrochureJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="p-4 bg-[#074592] text-white flex items-center justify-between border-b border-blue-900">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{activeBrochureJob.countryFlag}</span>
                <div>
                  <h4 className="text-sm font-black text-white leading-tight">
                    Official Overseas Vacancy Brochure
                  </h4>
                  <p className="text-[11px] text-blue-200">
                    Modernminds Consulting Services • SECP Registered Firm
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadBrochure(activeBrochureJob)}
                  className="px-3 py-1.5 rounded-lg bg-[#66d925] hover:bg-[#55ba1d] text-slate-950 text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Print or Save Brochure as PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
                <button
                  onClick={() => setActiveBrochureJob(null)}
                  className="p-1.5 text-blue-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Brochure Printable Card */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-6 text-left">
              
              {/* Brochure Header Banner */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#074592] via-[#05336e] to-slate-950 text-white p-6 shadow-md border border-[#05336e]">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{activeBrochureJob.countryFlag}</span>
                      <span className="text-xs font-black tracking-widest text-[#66d925] uppercase">
                        {activeBrochureJob.country} EMPLOYMENT VACANCY
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {activeBrochureJob.title}
                    </h2>
                    <p className="text-xs text-blue-200 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#66d925]" />
                      <span>{activeBrochureJob.companyName}</span> • <span>{activeBrochureJob.location}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="px-3 py-1 rounded-full bg-[#ff4958] text-white text-xs font-black uppercase shadow-xs">
                      {activeBrochureJob.vacanciesCount}
                    </div>
                    <span className="text-[10px] text-blue-300 block mt-1 font-mono">
                      Ref: {activeBrochureJob.id.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Salary & Contract callouts */}
                <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-blue-200 block">Monthly Base Wage:</span>
                    <span className="text-xs sm:text-sm font-black text-[#66d925]">{activeBrochureJob.salary}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-blue-200 block">Contract Duration:</span>
                    <span className="text-xs sm:text-sm font-black text-white">{activeBrochureJob.contractDuration}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-blue-200 block">Batch Application Deadline:</span>
                    <span className="text-xs sm:text-sm font-black text-amber-300">{activeBrochureJob.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Brochure Flyer Media Image (if available) */}
              {activeBrochureJob.brochureUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-72 bg-slate-900">
                  <img
                    src={activeBrochureJob.brochureUrl}
                    alt="Job Flyer"
                    className="w-full h-full object-cover max-h-72"
                  />
                </div>
              )}

              {/* Verified Employment Benefits */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Employer-Provided Provisions & Statutory Rights
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  {activeBrochureJob.accommodationBenefits}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-emerald-700 font-semibold">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-200/60">✓ Legal Labor Permit</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-200/60">✓ Medical Health Cover</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-200/60">✓ Overtime Entitlement</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-200/60">✓ Temporary Residency (TRC)</span>
                </div>
              </div>

              {/* Requirements & Candidate Eligibility */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#074592]" />
                  Eligibility Criteria & Documentation Checklist
                </h4>
                <ul className="space-y-2">
                  {activeBrochureJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                      <CheckCircle2 className="w-4 h-4 text-[#66d925] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultancy Guarantee Footer & Seal */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Logo variant="inline" size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Official Representation: Modernminds Consulting Services • Office 402, Executive Heights, Blue Area, Islamabad
                  </p>
                  <p className="text-[11px] text-slate-700 font-bold">
                    Hotlines: {MCS_INFO.phonePrimary} / {MCS_INFO.phoneMobile} • SECP: {MCS_INFO.registrationNo}
                  </p>
                </div>

                <div className="shrink-0 text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#074592] flex flex-col items-center justify-center text-center p-1 bg-blue-50/50">
                    <span className="text-[8px] font-black uppercase text-[#074592] leading-none">VERIFIED</span>
                    <span className="text-[9px] font-extrabold text-[#ff4958] leading-none mt-0.5">MCS</span>
                    <span className="text-[7px] text-slate-500 leading-none mt-0.5">ISLAMABAD</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Bottom CTA */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveBrochureJob(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Close Brochure
              </button>

              <button
                onClick={() => handleApply(activeBrochureJob)}
                className="px-6 py-2.5 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black shadow-md shadow-[#ff4958]/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Apply for this Position in {activeBrochureJob.country}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
