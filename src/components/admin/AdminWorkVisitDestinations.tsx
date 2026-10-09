import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plane, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Check, 
  X, 
  AlertCircle, 
  Search, 
  Filter, 
  ExternalLink,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  getWorkAndVisitCountries, 
  saveWorkAndVisitCountry, 
  deleteWorkAndVisitCountry, 
  resetWorkAndVisitCountries,
  onStorageUpdate 
} from '../../services/storageService';
import { WorkAndVisitCountryInfo } from '../../types';

export const AdminWorkVisitDestinations: React.FC = () => {
  const [destinations, setDestinations] = useState<WorkAndVisitCountryInfo[]>(getWorkAndVisitCountries());
  const [filterCategory, setFilterCategory] = useState<'all' | 'work_permit' | 'visit_visa'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WorkAndVisitCountryInfo | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('🇵🇱');
  const [category, setCategory] = useState<'work_permit' | 'visit_visa' | 'both'>('work_permit');
  const [tagline, setTagline] = useState('');
  const [image, setImage] = useState('');
  const [visaSuccessRate, setVisaSuccessRate] = useState('97.0%');
  const [processingTime, setProcessingTime] = useState('6 – 10 Weeks');
  const [validity, setValidity] = useState('2 Years Renewable');
  const [salaryOrProof, setSalaryOrProof] = useState('€1,000 – €1,800 / Month + Free Housing');
  const [permitTypeOrPurpose, setPermitTypeOrPurpose] = useState('Type-D National Work Permit');
  const [sectorsInput, setSectorsInput] = useState('Logistics & Warehousing\nConstruction Trades\nManufacturing & Packing');
  const [requirementsInput, setRequirementsInput] = useState('Pakistani Biometric Passport (2+ yrs validity)\nPolice Character Certificate (MOFA Islamabad)\nMedical Fitness Examination');
  const [highlightsInput, setHighlightsInput] = useState('Full Schengen travel mobility across 27 countries\nDirect pathway to European Temporary Residence (TRC)\nLegal employment contract with health insurance');

  useEffect(() => {
    const sync = () => {
      setDestinations(getWorkAndVisitCountries());
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
    setName('');
    setFlag('🇵🇱');
    setCategory('work_permit');
    setTagline('European Employment Quota with Authorized Employer Sponsorship');
    setImage('https://images.unsplash.com/photo-1519197924294-4ba991a11f28?auto=format&fit=crop&w=800&q=80');
    setVisaSuccessRate('97.0%');
    setProcessingTime('6 – 10 Weeks');
    setValidity('2 Years Renewable');
    setSalaryOrProof('€1,100 – €1,900 / Month + Free Accommodation');
    setPermitTypeOrPurpose('Type-D National Work Authorization (Aviz / Voivodeship)');
    setSectorsInput('Logistics & Heavy Transport\nIndustrial Electricians & Welders\nFood Processing & Warehousing\nCivil Construction');
    setRequirementsInput('Valid Pakistani Passport (minimum 2 years validity)\nPolice Character Certificate attested by MOFA Islamabad\nMedical fitness certificate\nTrade experience certificate / driver license (if applicable)');
    setHighlightsInput('Full European Schengen travel rights\nDirect pathway to European Temporary Residence (TRC)\nEmployer provides subsidized lodging & transport');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: WorkAndVisitCountryInfo) => {
    setEditingItem(item);
    setName(item.name);
    setFlag(item.flag);
    setCategory(item.category);
    setTagline(item.tagline);
    setImage(item.image);
    setVisaSuccessRate(item.visaSuccessRate);
    setProcessingTime(item.processingTime);
    setValidity(item.validity);
    setSalaryOrProof(item.salaryOrProof);
    setPermitTypeOrPurpose(item.permitTypeOrPurpose);
    setSectorsInput(item.topSectorsOrDestinations.join('\n'));
    setRequirementsInput(item.requirements.join('\n'));
    setHighlightsInput(item.keyHighlights.join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showNotification('error', 'Country name is required.');
      return;
    }

    const id = editingItem ? editingItem.id : `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${category}`;
    const sectorsArray = sectorsInput.split('\n').map(s => s.trim()).filter(Boolean);
    const reqArray = requirementsInput.split('\n').map(r => r.trim()).filter(Boolean);
    const highArray = highlightsInput.split('\n').map(h => h.trim()).filter(Boolean);

    const saved: WorkAndVisitCountryInfo = {
      id,
      name: name.trim(),
      flag: flag.trim() || '🌐',
      category,
      tagline: tagline.trim(),
      image: image.trim() || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      visaSuccessRate: visaSuccessRate.trim(),
      processingTime: processingTime.trim(),
      validity: validity.trim(),
      salaryOrProof: salaryOrProof.trim(),
      permitTypeOrPurpose: permitTypeOrPurpose.trim(),
      topSectorsOrDestinations: sectorsArray.length ? sectorsArray : ['General Employment', 'Logistics'],
      requirements: reqArray.length ? reqArray : ['Valid Passport', 'Police Character Certificate'],
      keyHighlights: highArray.length ? highArray : ['Official legal authorization', 'Schengen Area mobility']
    };

    saveWorkAndVisitCountry(saved);
    setIsModalOpen(false);
    showNotification('success', `Destination "${saved.name}" has been ${editingItem ? 'updated' : 'added'} successfully!`);
  };

  const handleDelete = (item: WorkAndVisitCountryInfo) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}" from Employment & Travel Destinations?`)) {
      deleteWorkAndVisitCountry(item.id);
      showNotification('success', `Deleted "${item.name}".`);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all Employment & Travel destinations back to original factory defaults?')) {
      resetWorkAndVisitCountries();
      showNotification('success', 'Reset destinations to default catalog.');
    }
  };

  const filtered = destinations.filter(d => {
    const matchCat = filterCategory === 'all' || d.category === filterCategory || d.category === 'both';
    const matchSearch = !searchQuery.trim() || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.permitTypeOrPurpose.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white text-slate-900 text-left">
      {/* Action Header */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              GLOBAL EMPLOYMENT & TRAVEL DESTINATIONS
            </h2>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-[#074592] text-white">
              {destinations.length} Countries
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, update, or remove European work permit countries and global visit visa pathways with all details.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset to default destinations"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#074592] hover:bg-[#05336e] text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Destination</span>
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

      {/* Filter / Search Bar */}
      <div className="p-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 w-full sm:w-72">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination country..."
              className="w-full px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden pl-8"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-semibold mr-1">Category:</span>
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer ${
              filterCategory === 'all' ? 'bg-[#074592] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All ({destinations.length})
          </button>
          <button
            onClick={() => setFilterCategory('work_permit')}
            className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer ${
              filterCategory === 'work_permit' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            💼 Work Permits
          </button>
          <button
            onClick={() => setFilterCategory('visit_visa')}
            className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer ${
              filterCategory === 'visit_visa' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ✈️ Visit Visas
          </button>
        </div>
      </div>

      {/* Destinations List / Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-bold">No destinations match your filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#074592] transition-all"
              >
                {/* Header Image */}
                <div className="relative h-32 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-xs font-black">
                      <span className="text-base">{item.flag}</span>
                      <span>{item.name}</span>
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      item.category === 'work_permit' 
                        ? 'bg-amber-500 text-white' 
                        : item.category === 'visit_visa' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-indigo-600 text-white'
                    }`}>
                      {item.category === 'both' ? 'Work & Visit' : item.category.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-bold">
                    <span className="text-[#66d925]">Success: {item.visaSuccessRate}</span>
                    <span>Time: {item.processingTime}</span>
                  </div>
                </div>

                {/* Body info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-700 font-semibold line-clamp-2">
                      {item.tagline}
                    </p>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold">Permit/Type:</span>
                        <span className="text-slate-900 truncate max-w-[170px] font-semibold">{item.permitTypeOrPurpose}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold">Salary / Solvency:</span>
                        <span className="text-[#074592] font-black truncate max-w-[170px]">{item.salaryOrProof}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold">Validity:</span>
                        <span className="text-slate-800">{item.validity}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700">Top Sectors / Cities: </span>
                      <span>{item.topSectorsOrDestinations.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#074592] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
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
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-4 bg-[#074592] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#66d925]" />
                <h3 className="text-base font-black">
                  {editingItem ? `Edit Destination: ${editingItem.name}` : 'Add New Employment & Travel Destination'}
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
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Country Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Poland, Czech Republic, Canada"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Flag Emoji
                  </label>
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="🇵🇱"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-center font-bold"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Visa Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    <option value="work_permit">💼 Work Permit</option>
                    <option value="visit_visa">✈️ Visit Visa</option>
                    <option value="both">🌐 Both Work & Visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tagline / Overview *
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Official Schengen Member with High Quotas for Pakistani Workforce"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden font-mono"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Success Rate
                  </label>
                  <input
                    type="text"
                    value={visaSuccessRate}
                    onChange={(e) => setVisaSuccessRate(e.target.value)}
                    placeholder="97.2%"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Processing Time
                  </label>
                  <input
                    type="text"
                    value={processingTime}
                    onChange={(e) => setProcessingTime(e.target.value)}
                    placeholder="6 – 10 Weeks"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Validity
                  </label>
                  <input
                    type="text"
                    value={validity}
                    onChange={(e) => setValidity(e.target.value)}
                    placeholder="2 Years Renewable"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Permit / Document Name
                  </label>
                  <input
                    type="text"
                    value={permitTypeOrPurpose}
                    onChange={(e) => setPermitTypeOrPurpose(e.target.value)}
                    placeholder="Type-D National Work Permit"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Salary Package / Financial Proof *
                </label>
                <input
                  type="text"
                  required
                  value={salaryOrProof}
                  onChange={(e) => setSalaryOrProof(e.target.value)}
                  placeholder="e.g. €950 – €1,700 / Month + Lodging OR Bank Solvency PKR 2.0M"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-[#074592]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Top Sectors / Cities (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={sectorsInput}
                    onChange={(e) => setSectorsInput(e.target.value)}
                    placeholder="Logistics&#10;Construction&#10;Manufacturing"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Requirements (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={requirementsInput}
                    onChange={(e) => setRequirementsInput(e.target.value)}
                    placeholder="Pakistani Passport&#10;MOFA Police Certificate&#10;Medical Certificate"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Key Highlights (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    placeholder="Full Schengen rights&#10;Temporary Residence card&#10;Health insurance"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono"
                  />
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
                  {editingItem ? 'Save Destination Changes' : 'Create & Publish Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
