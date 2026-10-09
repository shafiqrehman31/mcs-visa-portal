import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Check, 
  X, 
  AlertCircle, 
  Search, 
  Eye, 
  Upload, 
  Sparkles, 
  Palette, 
  Building2, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Award,
  Download
} from 'lucide-react';
import { 
  getJobOpportunities, 
  saveJobOpportunity, 
  deleteJobOpportunity, 
  resetJobOpportunities, 
  onStorageUpdate 
} from '../../services/storageService';
import { JobOpportunity } from '../../types';
import { MCS_INFO } from '../../data/mockData';
import { Logo } from '../Logo';

export const AdminJobOpportunities: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpportunity[]>(getJobOpportunities());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<JobOpportunity | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Brochure Preview in Admin
  const [previewingBrochure, setPreviewingBrochure] = useState<JobOpportunity | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('Poland');
  const [countryFlag, setCountryFlag] = useState('🇵🇱');
  const [sector, setSector] = useState('Logistics & Transport');
  const [companyName, setCompanyName] = useState('EuroLogistics Trans Sp. z o.o.');
  const [location, setLocation] = useState('Warsaw, Poland');
  const [salary, setSalary] = useState('€1,400 – €2,100 / Month + Overtime');
  const [vacanciesCount, setVacanciesCount] = useState('30 Open Vacancies');
  const [contractDuration, setContractDuration] = useState('2 Years Renewable (TRC / Karta Pobytu)');
  const [accommodationBenefits, setAccommodationBenefits] = useState('Free Shared Apartment, Transport & Medical Insurance');
  const [deadline, setDeadline] = useState('November 30, 2026');
  const [requirementsInput, setRequirementsInput] = useState('Valid Driving License or Trade Certificate\nClean Police Character Record (MOFA)\nMedical Fitness Examination\nBasic English Communication');
  const [brochureUrl, setBrochureUrl] = useState('');
  const [brochureTheme, setBrochureTheme] = useState<'navy' | 'emerald' | 'amber' | 'crimson'>('navy');

  useEffect(() => {
    const sync = () => {
      setJobs(getJobOpportunities());
    };
    sync();
    return onStorageUpdate(sync);
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('Industrial CNC Machine Operator & Welder');
    setCountry('Poland');
    setCountryFlag('🇵🇱');
    setSector('Manufacturing & Engineering');
    setCompanyName('Silesia Steel & Fabrication Sp. z o.o.');
    setLocation('Katowice, Poland');
    setSalary('€1,200 – €1,850 / Month + Free Housing');
    setVacanciesCount('25 Open Vacancies');
    setContractDuration('2 Years Renewable (Type-D National Permit)');
    setAccommodationBenefits('Free Employer-Provided Housing & Daily Factory Shuttle');
    setDeadline('December 15, 2026');
    setRequirementsInput('Prior welding (MIG/MAG) or machine shop experience\nPolice Character Certificate attested by MOFA Islamabad\nMedical fitness clearance certificate\nAge between 21 and 48 years');
    setBrochureUrl('https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80');
    setBrochureTheme('navy');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: JobOpportunity) => {
    setEditingItem(item);
    setTitle(item.title);
    setCountry(item.country);
    setCountryFlag(item.countryFlag);
    setSector(item.sector);
    setCompanyName(item.companyName);
    setLocation(item.location);
    setSalary(item.salary);
    setVacanciesCount(item.vacanciesCount);
    setContractDuration(item.contractDuration);
    setAccommodationBenefits(item.accommodationBenefits);
    setDeadline(item.deadline);
    setRequirementsInput(item.requirements.join('\n'));
    setBrochureUrl(item.brochureUrl || '');
    setBrochureTheme(item.brochureTheme || 'navy');
    setIsModalOpen(true);
  };

  // Quick preset countries
  const handleCountryPreset = (cName: string, flag: string, defaultLoc: string) => {
    setCountry(cName);
    setCountryFlag(flag);
    setLocation(defaultLoc);
  };

  // Image upload or paste handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setBrochureUrl(dataUrl);
      showNotification('success', 'Custom brochure flyer uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !country.trim()) {
      showNotification('error', 'Job title and country are required.');
      return;
    }

    const id = editingItem ? editingItem.id : `job-${country.toLowerCase().substring(0, 2)}-${Date.now().toString().slice(-4)}`;
    const reqArray = requirementsInput.split('\n').map(r => r.trim()).filter(Boolean);

    const saved: JobOpportunity = {
      id,
      title: title.trim(),
      country: country.trim(),
      countryFlag: countryFlag.trim() || '🌐',
      sector: sector.trim() || 'General Employment',
      companyName: companyName.trim() || 'Verified Employer',
      location: location.trim(),
      salary: salary.trim(),
      vacanciesCount: vacanciesCount.trim() || 'Open Vacancies',
      contractDuration: contractDuration.trim(),
      accommodationBenefits: accommodationBenefits.trim(),
      deadline: deadline.trim(),
      requirements: reqArray.length ? reqArray : ['Valid Passport', 'Police Certificate'],
      brochureUrl: brochureUrl.trim() || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
      brochureTheme,
      postedAt: editingItem ? editingItem.postedAt : new Date().toISOString()
    };

    saveJobOpportunity(saved);
    setIsModalOpen(false);
    showNotification('success', `Job opportunity "${saved.title}" in ${saved.country} saved & published!`);
  };

  const handleDelete = (item: JobOpportunity) => {
    if (window.confirm(`Are you sure you want to delete job "${item.title}" in ${item.country}?`)) {
      deleteJobOpportunity(item.id);
      showNotification('success', `Deleted job vacancy.`);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset Overseas Job Opportunities back to initial brochure catalog?')) {
      resetJobOpportunities();
      showNotification('success', 'Reset job opportunities to initial catalog.');
    }
  };

  const filtered = jobs.filter(j => {
    return !searchQuery.trim() || 
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.sector.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white text-slate-900 text-left">
      {/* Action Header */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              OVERSEAS JOB OPPORTUNITIES & BROCHURES
            </h2>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-[#074592] text-white">
              {jobs.length} Active Vacancies
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Post new international employment opportunities, design or upload official brochures, and publish directly to the frontend.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset to default jobs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#074592] hover:bg-[#05336e] text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job Opportunity</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-3 text-xs font-bold flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200' : 'bg-rose-50 text-rose-800 border-b border-rose-200'
        }`}>
          {notification.type === 'success' ? <Check className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job title, country, employer..."
            className="w-full px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden pl-8"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </div>
        <span className="text-xs text-slate-500 font-semibold">
          Active Opportunities: {filtered.length}
        </span>
      </div>

      {/* Jobs Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-bold">No job opportunities found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#074592] transition-all"
              >
                {/* Header Thumbnail */}
                <div className="relative h-32 overflow-hidden bg-slate-900">
                  <img
                    src={item.brochureUrl || "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-xs font-black">
                      <span className="text-base">{item.countryFlag}</span>
                      <span>{item.country}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#ff4958] text-white text-[10px] font-black uppercase">
                      {item.vacanciesCount}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-bold">
                    <span className="px-1.5 py-0.5 rounded bg-[#66d925] text-slate-950 text-[9px] font-black uppercase">
                      {item.sector}
                    </span>
                    <button
                      onClick={() => setPreviewingBrochure(item)}
                      className="px-2 py-0.5 rounded bg-white text-slate-900 text-[10px] font-black flex items-center gap-1 hover:bg-slate-100 cursor-pointer"
                    >
                      <Eye className="w-3 h-3 text-[#074592]" />
                      <span>Brochure</span>
                    </button>
                  </div>
                </div>

                {/* Body info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-[#074592]" />
                        <span className="truncate">{item.companyName} • {item.location}</span>
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold">Monthly Wage:</span>
                        <span className="text-[#074592] font-black truncate max-w-[170px]">{item.salary}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold">Contract:</span>
                        <span className="text-slate-800 truncate max-w-[170px]">{item.contractDuration}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold">Deadline:</span>
                        <span className="text-amber-600 font-bold">{item.deadline}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-600 leading-tight">
                      <span className="font-bold text-slate-800">Benefits: </span>
                      <span>{item.accommodationBenefits}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                    <button
                      onClick={() => setPreviewingBrochure(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Preview brochure flyer"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>Brochure</span>
                    </button>

                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#074592] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-4 bg-[#074592] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#66d925]" />
                <h3 className="text-base font-black">
                  {editingItem ? `Edit Job Vacancy & Brochure` : 'Post New Overseas Job & Design Brochure'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-300 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="overflow-y-auto p-5 space-y-4 flex-1">
              {/* Presets */}
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                <span className="font-bold text-[#074592] mr-2">Quick Country Presets:</span>
                <div className="inline-flex flex-wrap gap-1 mt-1 sm:mt-0">
                  <button type="button" onClick={() => handleCountryPreset('Poland', '🇵🇱', 'Warsaw & Katowice, Poland')} className="px-2 py-0.5 rounded bg-white hover:bg-blue-100 font-bold border border-blue-200">🇵🇱 Poland</button>
                  <button type="button" onClick={() => handleCountryPreset('Romania', '🇷🇴', 'Bucharest, Romania')} className="px-2 py-0.5 rounded bg-white hover:bg-blue-100 font-bold border border-blue-200">🇷🇴 Romania</button>
                  <button type="button" onClick={() => handleCountryPreset('Lithuania', '🇱🇹', 'Vilnius, Lithuania')} className="px-2 py-0.5 rounded bg-white hover:bg-blue-100 font-bold border border-blue-200">🇱🇹 Lithuania</button>
                  <button type="button" onClick={() => handleCountryPreset('Hungary', '🇭🇺', 'Debrecen, Hungary')} className="px-2 py-0.5 rounded bg-white hover:bg-blue-100 font-bold border border-blue-200">🇭🇺 Hungary</button>
                  <button type="button" onClick={() => handleCountryPreset('Malta', '🇲🇹', 'Valletta, Malta')} className="px-2 py-0.5 rounded bg-white hover:bg-blue-100 font-bold border border-blue-200">🇲🇹 Malta</button>
                  <button type="button" onClick={() => handleCountryPreset('Serbia', '🇷🇸', 'Belgrade, Serbia')} className="px-2 py-0.5 rounded bg-white hover:bg-blue-100 font-bold border border-blue-200">🇷🇸 Serbia</button>
                  <button type="button" onClick={() => handleCountryPreset('UAE', '🇦🇪', 'Dubai, UAE')} className="px-2 py-0.5 rounded bg-white hover:bg-blue-100 font-bold border border-blue-200">🇦🇪 UAE</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Title / Position Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Heavy Logistics Fleet Driver (CE)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden font-bold"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Industry / Sector
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    <option value="Logistics & Transport">🚚 Logistics & Transport</option>
                    <option value="Construction & Engineering">🏗️ Construction & Trades</option>
                    <option value="Manufacturing & Automotive">⚙️ Manufacturing & Automotive</option>
                    <option value="Warehousing & Supply Chain">📦 Warehousing & Storage</option>
                    <option value="Hospitality & Tourism">🍽️ Hospitality & Culinary</option>
                    <option value="Agriculture & Food Processing">🌾 Agriculture & Food</option>
                    <option value="Healthcare & Nursing">🩺 Healthcare & Nursing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Country Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Poland"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Country Flag
                  </label>
                  <input
                    type="text"
                    value={countryFlag}
                    onChange={(e) => setCountryFlag(e.target.value)}
                    placeholder="🇵🇱"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vacancies / Quota
                  </label>
                  <input
                    type="text"
                    value={vacanciesCount}
                    onChange={(e) => setVacanciesCount(e.target.value)}
                    placeholder="35 Open Vacancies"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-rose-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Employer / Sponsoring Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. EuroLogistics Sp. z o.o."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Job Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Warsaw & Katowice, Poland"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Salary Package *
                  </label>
                  <input
                    type="text"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. €1,400 – €2,100 / Month"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-[#074592]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contract Duration
                  </label>
                  <input
                    type="text"
                    value={contractDuration}
                    onChange={(e) => setContractDuration(e.target.value)}
                    placeholder="2 Years Renewable (TRC)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="November 30, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Employer-Provided Accommodation & Statutory Benefits
                </label>
                <input
                  type="text"
                  value={accommodationBenefits}
                  onChange={(e) => setAccommodationBenefits(e.target.value)}
                  placeholder="e.g. Free Shared Accommodation, Daily Transport & Health Insurance"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-emerald-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Candidate Requirements & Eligibility (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={requirementsInput}
                  onChange={(e) => setRequirementsInput(e.target.value)}
                  placeholder="Valid Driver License&#10;Clean Police Clearance&#10;Medical Certificate"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>

              {/* ================= BROCHURE DESIGN & UPLOAD STUDIO ================= */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#66d925]" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      Official Brochure Design & Upload Studio
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600/50 text-blue-200">
                    Live Front-End Flyer
                  </span>
                </div>

                <p className="text-[11px] text-slate-300">
                  Upload an image brochure flyer or paste an image URL. Visitors on the front end will be able to view, zoom, and print this official design brochure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-8">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Brochure Image URL
                    </label>
                    <input
                      type="url"
                      value={brochureUrl}
                      onChange={(e) => setBrochureUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... or data:image/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:ring-1 focus:ring-[#66d925] outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Upload Flyer Image
                    </label>
                    <label className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#66d925]" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Brochure Theme Picker */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-700/80">
                  <span className="text-[11px] font-bold text-slate-300">Brochure Palette Theme:</span>
                  {(['navy', 'emerald', 'amber', 'crimson'] as const).map(th => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setBrochureTheme(th)}
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase transition-all cursor-pointer ${
                        brochureTheme === th ? 'ring-2 ring-white scale-105' : 'opacity-70 hover:opacity-100'
                      } ${
                        th === 'navy' ? 'bg-[#074592] text-white' :
                        th === 'emerald' ? 'bg-emerald-600 text-white' :
                        th === 'amber' ? 'bg-amber-500 text-slate-950' :
                        'bg-[#ff4958] text-white'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#074592] hover:bg-[#05336e] text-white text-xs font-black shadow-md cursor-pointer"
                >
                  {editingItem ? 'Save Job & Brochure Changes' : 'Publish Job & Brochure to Frontend'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BROCHURE PREVIEW MODAL ================= */}
      {previewingBrochure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-4 bg-[#074592] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{previewingBrochure.countryFlag}</span>
                <div>
                  <h4 className="text-sm font-black">{previewingBrochure.title}</h4>
                  <p className="text-[10px] text-blue-200">Brochure Flyer Preview (Admin View)</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewingBrochure(null)}
                className="p-1 text-slate-300 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-left">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#074592] to-slate-900 text-white">
                <span className="text-[10px] font-black uppercase text-[#66d925] tracking-widest block">
                  {previewingBrochure.country} EMPLOYMENT VACANCY
                </span>
                <h3 className="text-lg font-black mt-1">{previewingBrochure.title}</h3>
                <p className="text-xs text-blue-200 mt-1">{previewingBrochure.companyName} • {previewingBrochure.location}</p>
                <div className="mt-3 flex items-center justify-between text-xs font-bold pt-2 border-t border-white/20">
                  <span className="text-[#66d925] font-black">{previewingBrochure.salary}</span>
                  <span>{previewingBrochure.vacanciesCount}</span>
                </div>
              </div>

              {previewingBrochure.brochureUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-60 bg-slate-900">
                  <img src={previewingBrochure.brochureUrl} alt="Brochure" className="w-full h-full object-cover max-h-60" />
                </div>
              )}

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <p className="font-bold text-slate-800">Provisions & Benefits:</p>
                <p className="text-slate-600">{previewingBrochure.accommodationBenefits}</p>
              </div>

              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-800">Requirements:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                  {previewingBrochure.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end">
              <button
                onClick={() => setPreviewingBrochure(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
