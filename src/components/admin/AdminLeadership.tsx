import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Check, 
  X, 
  AlertCircle, 
  Search, 
  Mail, 
  Phone, 
  Award,
  Sparkles,
  Quote
} from 'lucide-react';
import { 
  getTeamMembers, 
  saveTeamMember, 
  deleteTeamMember, 
  resetTeamMembers, 
  onStorageUpdate 
} from '../../services/storageService';
import { TeamMember } from '../../types';

export const AdminLeadership: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(getTeamMembers());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [qualification, setQualification] = useState('');
  const [bio, setBio] = useState('');
  const [expertiseInput, setExpertiseInput] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phone, setPhone] = useState('03002346521');
  const [avatar, setAvatar] = useState('');
  const [featuredQuote, setFeaturedQuote] = useState('');

  useEffect(() => {
    const sync = () => {
      setMembers(getTeamMembers());
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
    setRole('Senior Immigration & Legal Advisor');
    setQualification('LL.M. International Migration & Human Rights');
    setBio('Oversees strategic case compliance, embassy visa files, and diplomatic correspondence between Islamabad and European embassies.');
    setExpertiseInput('European Immigration Law\nSchengen Visa Defense\nLabor Contract Attestations\nEmbassy Consular Representation');
    setContactEmail('advisor@modernminds.com.pk');
    setPhone('051-4862273');
    setAvatar('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80');
    setFeaturedQuote('Integrity and meticulous legal preparation are the cornerstones of successful global migration.');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TeamMember) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role);
    setQualification(item.qualification);
    setBio(item.bio);
    setExpertiseInput(item.expertise.join('\n'));
    setContactEmail(item.contactEmail);
    setPhone(item.phone || '051-4862273');
    setAvatar(item.avatar);
    setFeaturedQuote(item.featuredQuote);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showNotification('error', 'Member name is required.');
      return;
    }

    const id = editingItem ? editingItem.id : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const expArray = expertiseInput.split('\n').map(e => e.trim()).filter(Boolean);

    const saved: TeamMember = {
      id,
      name: name.trim(),
      role: role.trim() || 'Consultant',
      qualification: qualification.trim(),
      bio: bio.trim(),
      expertise: expArray.length ? expArray : ['Strategic Counseling', 'Visa Guidance'],
      contactEmail: contactEmail.trim() || 'info@modernminds.com.pk',
      phone: phone.trim() || '051-4862273',
      avatar: avatar.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      featuredQuote: featuredQuote.trim() || 'Committed to empowering Pakistani professionals and students worldwide.'
    };

    saveTeamMember(saved);
    setIsModalOpen(false);
    showNotification('success', `Team Member "${saved.name}" has been ${editingItem ? 'updated' : 'added'} successfully!`);
  };

  const handleDelete = (item: TeamMember) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}" from Executive Leadership & Advisors?`)) {
      deleteTeamMember(item.id);
      showNotification('success', `Deleted "${item.name}".`);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset Executive Leadership & Advisors back to original defaults?')) {
      resetTeamMembers();
      showNotification('success', 'Reset team members to initial catalog.');
    }
  };

  const filtered = members.filter(m => {
    return !searchQuery.trim() || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.qualification.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white text-slate-900 text-left">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              EXECUTIVE LEADERSHIP & ADVISORS
            </h2>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-[#074592] text-white">
              {members.length} Members
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, update, or remove leadership directors, medical advisors, and legal visa consultants.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset to default team members"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#074592] hover:bg-[#05336e] text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
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
            placeholder="Search team member name, role..."
            className="w-full px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden pl-8"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </div>
        <span className="text-xs text-slate-500 font-semibold">
          Active Consultants & Directors: {filtered.length}
        </span>
      </div>

      {/* Team Members List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-bold">No team members found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#074592] transition-all"
              >
                {/* Avatar Photo */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#66d925] text-slate-950 text-[10px] font-black uppercase tracking-wider inline-block">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Profile info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#074592] font-bold">
                        {item.qualification}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3">
                      {item.bio}
                    </p>

                    {/* Expertise Pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.expertise.slice(0, 2).map((exp, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-blue-50 text-[#074592] text-[9px] font-bold truncate max-w-[120px]">
                          {exp}
                        </span>
                      ))}
                    </div>

                    {/* Contact Details */}
                    <div className="pt-2 text-[10px] text-slate-500 space-y-0.5">
                      <div className="flex items-center gap-1 truncate">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{item.contactEmail}</span>
                      </div>
                      {item.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-end gap-2">
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
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-4 bg-[#074592] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#66d925]" />
                <h3 className="text-base font-black">
                  {editingItem ? `Edit Member: ${editingItem.name}` : 'Add Executive Leader / Advisor'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Sayyed Numan Akbar"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Managing Director / Visa Consultant"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Academic Qualifications / Certifications
                </label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. MD, Senior Academic Director, LL.B."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Avatar / Photograph URL
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="advisor@modernminds.com.pk"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="051-4862273"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Professional Bio / Background
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe executive responsibilities, global partner liaisons, and student welfare management..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Expertise Areas (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  placeholder="Schengen Visa Protocols&#10;Overseas MBBS Verification&#10;Labor Market Approval"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Featured Leadership Quote
                </label>
                <input
                  type="text"
                  value={featuredQuote}
                  onChange={(e) => setFeaturedQuote(e.target.value)}
                  placeholder="A bulletproof visa application begins with meticulous preparation..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#074592] outline-hidden italic"
                />
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
                  {editingItem ? 'Save Member Changes' : 'Add Team Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
