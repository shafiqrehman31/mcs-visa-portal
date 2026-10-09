import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Check, 
  X, 
  AlertCircle, 
  Search, 
  GraduationCap,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  getTargetCountries, 
  saveTargetCountry, 
  deleteTargetCountry, 
  resetTargetCountries, 
  onStorageUpdate 
} from '../../services/storageService';
import { TargetCountryInfo } from '../../types';

export const AdminTargetCountries: React.FC = () => {
  const [countries, setCountries] = useState<TargetCountryInfo[]>(getTargetCountries());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TargetCountryInfo | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('🇩🇪');
  const [tagline, setTagline] = useState('');
  const [image, setImage] = useState('');
  const [tuitionRange, setTuitionRange] = useState('$2,500 – $5,000 / year');
  const [livingCost, setLivingCost] = useState('$250 – $400 / month');
  const [visaSuccessRate, setVisaSuccessRate] = useState('98.5%');
  const [processingTime, setProcessingTime] = useState('3 – 5 Weeks');
  const [workRights, setWorkRights] = useState('Legal 20 hrs/week with student permit');
  const [intakes, setIntakes] = useState('September & February');
  const [programsInput, setProgramsInput] = useState('General Medicine (MBBS)\nComputer Science & AI\nCivil & Mechanical Engineering');
  const [highlightsInput, setHighlightsInput] = useState('Degrees recognized by PMDC, WHO, and WFME\nDirect institutional admission without third-party fees\nModern student housing & English-medium faculties');
  const [requirementsInput, setRequirementsInput] = useState('F.Sc Pre-Medical / Pre-Engineering (Minimum 60%)\nMatric & Intermediate verified by IBCC & MOFA\nValid Pakistani passport (18+ months validity)');

  useEffect(() => {
    const sync = () => {
      setCountries(getTargetCountries());
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
    setFlag('🇩🇪');
    setTagline('Premier European Higher Education & Technical Universities');
    setImage('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80');
    setTuitionRange('Free Tuition / €300 Admin Fee');
    setLivingCost('€700 – €950 / month');
    setVisaSuccessRate('97.5%');
    setProcessingTime('4 – 8 Weeks');
    setWorkRights('120 full days or 240 half days/year');
    setIntakes('Winter (October) & Summer (April)');
    setProgramsInput('Automotive Engineering\nData Science & AI\nBusiness Informatics\nBiomedical Sciences');
    setHighlightsInput('Top-tier European public universities with minimal or zero tuition fees\nPost-study 18-month job seeker visa entitlement\nDegrees globally recognized across industries');
    setRequirementsInput('A-Levels or 13-year education equivalency (Studienkolleg if F.Sc)\nIELTS 6.5 or German B1/B2 (program dependent)\nBlocked account or financial solvency proof\nVerified educational transcripts from IBCC & MOFA');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TargetCountryInfo) => {
    setEditingItem(item);
    setName(item.name);
    setFlag(item.flag);
    setTagline(item.tagline);
    setImage(item.image);
    setTuitionRange(item.tuitionRange);
    setLivingCost(item.livingCost);
    setVisaSuccessRate(item.visaSuccessRate);
    setProcessingTime(item.processingTime);
    setWorkRights(item.workRights);
    setIntakes(item.intakes);
    setProgramsInput(item.popularPrograms.join('\n'));
    setHighlightsInput(item.highlights.join('\n'));
    setRequirementsInput(item.requirements.join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showNotification('error', 'Country name is required.');
      return;
    }

    const id = editingItem ? editingItem.id : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const programsArray = programsInput.split('\n').map(p => p.trim()).filter(Boolean);
    const highArray = highlightsInput.split('\n').map(h => h.trim()).filter(Boolean);
    const reqArray = requirementsInput.split('\n').map(r => r.trim()).filter(Boolean);

    const saved: TargetCountryInfo = {
      id,
      name: name.trim(),
      flag: flag.trim() || '🌐',
      tagline: tagline.trim(),
      image: image.trim() || 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=800&q=80',
      popularPrograms: programsArray.length ? programsArray : ['General Medicine', 'Computer Science'],
      tuitionRange: tuitionRange.trim(),
      livingCost: livingCost.trim(),
      visaSuccessRate: visaSuccessRate.trim(),
      processingTime: processingTime.trim(),
      workRights: workRights.trim(),
      intakes: intakes.trim(),
      highlights: highArray.length ? highArray : ['Accredited institutions', 'High visa approval'],
      requirements: reqArray.length ? reqArray : ['Verified academic documents', 'Passport']
    };

    saveTargetCountry(saved);
    setIsModalOpen(false);
    showNotification('success', `Country "${saved.name}" has been ${editingItem ? 'updated' : 'added'} successfully!`);
  };

  const handleDelete = (item: TargetCountryInfo) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}" from Global Destinations?`)) {
      deleteTargetCountry(item.id);
      showNotification('success', `Deleted "${item.name}".`);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all Global Destinations back to initial factory defaults?')) {
      resetTargetCountries();
      showNotification('success', 'Reset global destinations to defaults.');
    }
  };

  const filtered = countries.filter(c => {
    return !searchQuery.trim() || 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.popularPrograms.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white text-slate-900 text-left">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              GLOBAL DESTINATIONS (STUDY ABROAD & MEDICAL UNIVERSITIES)
            </h2>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-[#074592] text-white">
              {countries.length} Countries
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, update, or delete authorized study abroad destination countries, tuition fees, and admission criteria.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset to default countries"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#074592] hover:bg-[#05336e] text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Country</span>
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
            placeholder="Search country, program, tuition..."
            className="w-full px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden pl-8"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </div>
        <span className="text-xs text-slate-500 font-semibold">
          Showing {filtered.length} of {countries.length} destinations
        </span>
      </div>

      {/* Countries Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Globe2 className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-bold">No countries found matching your search.</p>
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
                    <span className="px-2 py-0.5 rounded bg-[#66d925] text-slate-950 text-[10px] font-black uppercase">
                      Grant: {item.visaSuccessRate}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-bold">
                    <span>Intakes: {item.intakes}</span>
                    <span>Proc: {item.processingTime}</span>
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
                        <span className="font-bold">Tuition Range:</span>
                        <span className="text-[#074592] font-black truncate max-w-[170px]">{item.tuitionRange}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold">Living Cost:</span>
                        <span className="text-slate-800 font-semibold">{item.livingCost}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold">Work Rights:</span>
                        <span className="text-slate-800 truncate max-w-[170px]">{item.workRights}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700">Top Programs: </span>
                      <span>{item.popularPrograms.slice(0, 3).join(', ')}</span>
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
                <Globe2 className="w-5 h-5 text-[#66d925]" />
                <h3 className="text-base font-black">
                  {editingItem ? `Edit Country: ${editingItem.name}` : 'Add New Global Destination Country'}
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
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Country Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Germany, Poland, Russia, Italy"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden font-semibold"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Flag Emoji
                  </label>
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="🇩🇪"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-center font-bold"
                  />
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
                  placeholder="e.g. High Visa Ratio & European Standard Medical & IT Degrees"
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
                    Tuition Range
                  </label>
                  <input
                    type="text"
                    value={tuitionRange}
                    onChange={(e) => setTuitionRange(e.target.value)}
                    placeholder="$2,500 – $4,500 / year"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Living Cost
                  </label>
                  <input
                    type="text"
                    value={livingCost}
                    onChange={(e) => setLivingCost(e.target.value)}
                    placeholder="$200 – $350 / month"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Visa Success
                  </label>
                  <input
                    type="text"
                    value={visaSuccessRate}
                    onChange={(e) => setVisaSuccessRate(e.target.value)}
                    placeholder="98.5%"
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
                    placeholder="3 – 5 Weeks"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Work Rights
                  </label>
                  <input
                    type="text"
                    value={workRights}
                    onChange={(e) => setWorkRights(e.target.value)}
                    placeholder="Legal 20 hrs/week with student permit"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Intakes / Semesters
                  </label>
                  <input
                    type="text"
                    value={intakes}
                    onChange={(e) => setIntakes(e.target.value)}
                    placeholder="September & February"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Popular Programs (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={programsInput}
                    onChange={(e) => setProgramsInput(e.target.value)}
                    placeholder="General Medicine&#10;Computer Science&#10;Engineering"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admission Requirements (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={requirementsInput}
                    onChange={(e) => setRequirementsInput(e.target.value)}
                    placeholder="F.Sc Pre-Medical 60%&#10;IBCC & MOFA attestation&#10;Passport valid 18 months"
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
                    placeholder="No mandatory IELTS&#10;PMDC & WHO approved&#10;Modern clinical labs"
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
                  {editingItem ? 'Save Country Changes' : 'Create & Publish Country'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
