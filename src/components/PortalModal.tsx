import React, { useState, useEffect } from 'react';
import { 
  X, 
  User as UserIcon, 
  ShieldCheck, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Download, 
  Send, 
  Sparkles, 
  Building2, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  LogOut,
  RefreshCw,
  Eye,
  CheckCheck,
  Search,
  Filter,
  Edit3,
  Save,
  RotateCcw,
  Layout,
  Globe,
  HelpCircle,
  Users,
  Layers,
  PhoneCall,
  Image as ImageIcon,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  getCurrentUser, 
  setCurrentUser, 
  getApplications, 
  getStudentApplication, 
  advanceApplicationMilestone, 
  getDocuments, 
  getStudentDocuments, 
  uploadDocument, 
  updateDocumentStatus, 
  getLeads, 
  updateLeadStatus, 
  addNotification, 
  onStorageUpdate,
  getSiteContent,
  updateSiteContent,
  resetSiteContent,
  getBranding,
  updateBranding,
  resetBranding,
  applyFavicon
} from '../services/storageService';
import { 
  User, 
  StudentApplication, 
  StudentDocument, 
  ContactInquiry, 
  MilestoneStage, 
  DocumentStatus,
  DocumentType,
  SiteContent,
  SiteBranding
} from '../types';
import { Logo } from './Logo';
import { AdminWorkVisitDestinations } from './admin/AdminWorkVisitDestinations';
import { AdminTargetCountries } from './admin/AdminTargetCountries';
import { AdminLeadership } from './admin/AdminLeadership';
import { AdminJobOpportunities } from './admin/AdminJobOpportunities';
import { AdminSecurity } from './admin/AdminSecurity';
import { AdminDisclaimerPopup } from './admin/AdminDisclaimerPopup';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const PortalModal: React.FC<PortalModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    | 'applications' 
    | 'documents' 
    | 'leads' 
    | 'work_visit_destinations' 
    | 'target_countries' 
    | 'leadership' 
    | 'jobs_brochures' 
    | 'broadcast' 
    | 'cms' 
    | 'branding' 
    | 'security'
    | 'disclaimer_popup'
  >('applications');
  const [activeStudentTab, setActiveStudentTab] = useState<'timeline' | 'documents'>('timeline');

  // CMS Content Editing States
  const [siteContent, setSiteContent] = useState<SiteContent>(getSiteContent());
  const [activeCmsSection, setActiveCmsSection] = useState<'hero' | 'about' | 'countries' | 'services' | 'whyUs' | 'team' | 'faqs' | 'contact'>('hero');
  const [cmsSaveMessage, setCmsSaveMessage] = useState<string | null>(null);

  // Branding Management States
  const [branding, setBranding] = useState<SiteBranding>(getBranding());
  const [logoInputUrl, setLogoInputUrl] = useState<string>(branding.logoUrl || '');
  const [faviconInputUrl, setFaviconInputUrl] = useState<string>(branding.faviconUrl || '');
  const [brandNameInput, setBrandNameInput] = useState<string>(branding.brandName || 'Modernminds');
  const [brandingSuccessMsg, setBrandingSuccessMsg] = useState<string | null>(null);

  // Data states
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [leads, setLeads] = useState<ContactInquiry[]>([]);
  const [selectedStudentAppId, setSelectedStudentAppId] = useState<string | null>(null);
  const [caseCategoryFilter, setCaseCategoryFilter] = useState<'all' | 'work_permit' | 'visit_visa' | 'student'>('all');

  // Document upload form
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState<DocumentType>('passport');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Admin milestone updater
  const [milestoneRemarks, setMilestoneRemarks] = useState('');
  const [selectedStageToAdvance, setSelectedStageToAdvance] = useState<MilestoneStage | ''>('');

  // Admin document reviewer
  const [reviewNote, setReviewNote] = useState('');

  // Broadcast
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const refreshAllData = () => {
    const apps = getApplications();
    setApplications(apps);
    setDocuments(getDocuments());
    setLeads(getLeads());
    setSiteContent(getSiteContent());
    const b = getBranding();
    setBranding(b);
    setLogoInputUrl(b.logoUrl || '');
    setFaviconInputUrl(b.faviconUrl || '');
    setBrandNameInput(b.brandName || 'Modernminds');

    if (apps.length > 0 && !selectedStudentAppId) {
      setSelectedStudentAppId(apps[0].id);
    }
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLogoInputUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFaviconInputUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateBranding({
      logoUrl: logoInputUrl.trim() || undefined,
      faviconUrl: faviconInputUrl.trim() || undefined,
      brandName: brandNameInput.trim() || 'Modernminds'
    });
    setBranding(updated);
    if (updated.faviconUrl) {
      applyFavicon(updated.faviconUrl);
    }
    setBrandingSuccessMsg('Branding successfully updated! Logo and Favicon are now active across the website.');
    setTimeout(() => setBrandingSuccessMsg(null), 4000);
  };

  const handleResetBranding = () => {
    if (window.confirm('Reset Logo and Favicon back to official Modernminds default vector assets?')) {
      const res = resetBranding();
      setBranding(res);
      setLogoInputUrl('');
      setFaviconInputUrl('');
      setBrandNameInput('Modernminds');
      setBrandingSuccessMsg('Branding assets reset to default Modernminds brand guidelines.');
      setTimeout(() => setBrandingSuccessMsg(null), 4000);
    }
  };

  const handleSaveCms = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(siteContent);
    setCmsSaveMessage('Changes published live across website sections!');
    setTimeout(() => setCmsSaveMessage(null), 3500);
  };

  const handleResetCms = () => {
    if (window.confirm('Reset all website text back to default Islamabad Head Office content?')) {
      const resetData = resetSiteContent();
      setSiteContent(resetData);
      setCmsSaveMessage('Website text reset to default content successfully.');
      setTimeout(() => setCmsSaveMessage(null), 3500);
    }
  };

  const updateCmsField = (section: keyof SiteContent, field: string, value: string) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  useEffect(() => {
    if (isOpen) {
      refreshAllData();
      const unsub = onStorageUpdate(refreshAllData);
      return () => unsub();
    }
  }, [isOpen]);

  if (!isOpen || !currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  // For student mode: find current student's application
  const myApplication = applications.find(a => a.studentId === currentUser.id) || applications[0];
  const myDocuments = documents.filter(d => d.userId === currentUser.id);

  // For admin mode: active inspected application
  const inspectedApp = applications.find(a => a.id === selectedStudentAppId) || applications[0];

  // Document upload handler
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;

    setUploading(true);
    setTimeout(() => {
      uploadDocument(
        currentUser.id,
        currentUser.name,
        docTitle,
        docType,
        uploadFileName || `${docTitle.replace(/\s+/g, '_')}.pdf`,
        `${(Math.random() * 3 + 1.2).toFixed(1)} MB`
      );

      setUploading(false);
      setUploadSuccess(true);
      setDocTitle('');
      setUploadFileName('');
      setTimeout(() => setUploadSuccess(false), 4000);
      refreshAllData();
    }, 400);
  };

  // Admin advance milestone handler
  const handleAdvanceMilestone = (appId: string, stage: MilestoneStage) => {
    const updated = advanceApplicationMilestone(appId, stage, milestoneRemarks);
    if (updated) {
      if (stage === 'visa_approved') {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      setMilestoneRemarks('');
      setSelectedStageToAdvance('');
      refreshAllData();
    }
  };

  // Admin update document status
  const handleReviewDoc = (docId: string, status: DocumentStatus) => {
    updateDocumentStatus(docId, status, reviewNote);
    setReviewNote('');
    refreshAllData();
  };

  // Admin broadcast notification
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    addNotification({
      userId: 'all',
      title: `📢 ${broadcastTitle}`,
      message: broadcastMessage,
      type: 'alert'
    });

    setBroadcastTitle('');
    setBroadcastMessage('');
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'verified':
        return <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">Verified</span>;
      case 'under_review':
        return <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">Under Review</span>;
      case 'needs_revision':
        return <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold">Needs Revision</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">Pending</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200 text-left">
      <div 
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[92vh] max-h-[850px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Portal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#074592] via-[#05336e] to-slate-950 text-white flex items-center justify-between border-b border-[#05336e]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center font-bold shadow-md shrink-0">
              <Logo variant="mark" size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isAdmin ? 'MCS Admin & Case Management Console' : 'Student Document Vault & Tracking Portal'}
                </h3>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isAdmin ? 'bg-[#66d925] text-slate-950' : 'bg-[#074592] border border-blue-400/40 text-white'
                }`}>
                  {isAdmin ? 'Admin Officer' : 'Student File'}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs text-blue-200 mt-0.5">
                <span>Modernminds Consulting Services | Islamabad Head Office</span>
                <span className="hidden sm:inline text-blue-300/40">|</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[#66d925] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#66d925]" />
                  SECP: SECP-ISB-2018-0941
                </span>
                <span className="hidden md:inline text-blue-300/40">|</span>
                <span className="hidden md:inline-flex items-center gap-1 text-white font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#ff4958]" />
                  Hotline: 051-4862273
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 mr-2 text-xs text-blue-100">
              <span className="w-2 h-2 rounded-full bg-[#66d925] animate-pulse" />
              <span>{currentUser.name}</span>
            </div>

            {isAdmin && (
              <button
                onClick={() => setActiveAdminTab('security')}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-emerald-500/30"
                title="Change Admin Username & Password"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#66d925]" />
                <span className="hidden md:inline">Change Credentials</span>
              </button>
            )}

            <button
              onClick={onLogout}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= ADMIN INTERFACE ================= */}
        {isAdmin ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Admin Sub Navigation */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between overflow-x-auto">
              <div className="flex items-center gap-1 py-2">
                <button
                  onClick={() => setActiveAdminTab('applications')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'applications'
                      ? 'bg-[#074592] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Cases ({applications.length})</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('work_visit_destinations')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'work_visit_destinations'
                      ? 'bg-[#074592] text-white shadow-xs ring-2 ring-[#66d925]'
                      : 'text-slate-700 hover:bg-slate-200 bg-white/70'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#ff4958]" />
                  <span>Work & Travel Destinations</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('target_countries')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'target_countries'
                      ? 'bg-[#074592] text-white shadow-xs ring-2 ring-[#66d925]'
                      : 'text-slate-700 hover:bg-slate-200 bg-white/70'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-[#074592]" />
                  <span>Global Destinations</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('jobs_brochures')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'jobs_brochures'
                      ? 'bg-[#074592] text-[#66d925] shadow-xs font-black ring-2 ring-[#66d925]'
                      : 'text-slate-700 hover:bg-slate-200 bg-white/70'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#66d925]" />
                  <span>Jobs & Brochures</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('leadership')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'leadership'
                      ? 'bg-[#074592] text-white shadow-xs ring-2 ring-[#074592]'
                      : 'text-slate-700 hover:bg-slate-200 bg-white/70'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-[#074592]" />
                  <span>Leadership & Advisors</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('leads')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'leads'
                      ? 'bg-[#074592] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Leads ({leads.length})</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('documents')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'documents'
                      ? 'bg-[#074592] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Doc Audits ({documents.length})</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('broadcast')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'broadcast'
                      ? 'bg-[#ff4958] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Alerts</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('cms')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'cms'
                      ? 'bg-[#074592] text-white shadow-xs font-black'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>CMS</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('branding')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'branding'
                      ? 'bg-[#074592] text-white shadow-xs font-black'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Logo</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('disclaimer_popup')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'disclaimer_popup'
                      ? 'bg-red-700 text-white shadow-xs ring-2 ring-red-500 font-black'
                      : 'text-red-700 hover:bg-red-50 bg-red-50/70 border border-red-200'
                  }`}
                  title="Configure Public Disclaimer & Fraud Warning Popup on Website Load"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                  <span>Disclaimer Popup</span>
                </button>

                <button
                  onClick={() => setActiveAdminTab('security')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeAdminTab === 'security'
                      ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-500 font-black'
                      : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                  title="Change Admin Username and Password"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Security & Pass</span>
                </button>
              </div>
            </div>

            {/* Admin Tab 1: Student Applications & Milestone Controller */}
            {activeAdminTab === 'applications' && (
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                {/* Left list of applicants */}
                <div className="lg:col-span-4 border-r border-slate-200 overflow-y-auto p-3 space-y-2 bg-slate-50">
                  <div className="flex items-center justify-between px-1 py-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Active Client & Student Cases
                    </p>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                      {applications.length}
                    </span>
                  </div>

                  {/* Category Filter Chips */}
                  <div className="grid grid-cols-4 gap-1 p-1 bg-white rounded-lg border border-slate-200 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setCaseCategoryFilter('all')}
                      className={`py-1 rounded text-center cursor-pointer transition-all ${
                        caseCategoryFilter === 'all'
                          ? 'bg-[#074592] text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => setCaseCategoryFilter('work_permit')}
                      className={`py-1 rounded text-center cursor-pointer transition-all ${
                        caseCategoryFilter === 'work_permit'
                          ? 'bg-amber-500 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      💼 Work
                    </button>
                    <button
                      type="button"
                      onClick={() => setCaseCategoryFilter('visit_visa')}
                      className={`py-1 rounded text-center cursor-pointer transition-all ${
                        caseCategoryFilter === 'visit_visa'
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      ✈️ Visit
                    </button>
                    <button
                      type="button"
                      onClick={() => setCaseCategoryFilter('student')}
                      className={`py-1 rounded text-center cursor-pointer transition-all ${
                        caseCategoryFilter === 'student'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      🎓 Study
                    </button>
                  </div>

                  {applications
                    .filter((app) => caseCategoryFilter === 'all' || (app.category || 'student') === caseCategoryFilter)
                    .map((app) => {
                      const isSelected = app.id === inspectedApp?.id;
                      const cat = app.category || 'student';
                      return (
                        <div
                          key={app.id}
                          onClick={() => setSelectedStudentAppId(app.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'bg-white border-blue-900 shadow-md ring-2 ring-blue-900/10'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-extrabold text-slate-900 truncate">
                              {app.studentName}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                                cat === 'work_permit'
                                  ? 'bg-amber-100 text-amber-900'
                                  : cat === 'visit_visa'
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : 'bg-blue-100 text-blue-900'
                              }`}>
                                {cat === 'work_permit' ? 'WORK' : cat === 'visit_visa' ? 'VISIT' : 'STUDENT'}
                              </span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                                {app.targetCountry}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-600 truncate">
                            {app.program}
                          </p>

                          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                            <span>Ref: {app.caseRef}</span>
                            <span className="font-bold text-amber-700">
                              {app.progressPercentage}% Complete
                            </span>
                          </div>

                          {/* Mini progress bar */}
                          <div className="w-full h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                cat === 'work_permit'
                                  ? 'bg-amber-500'
                                  : cat === 'visit_visa'
                                  ? 'bg-emerald-600'
                                  : 'bg-blue-900'
                              }`}
                              style={{ width: `${app.progressPercentage}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Right detailed inspection & milestone controller */}
                <div className="lg:col-span-8 overflow-y-auto p-6 text-left space-y-6">
                  {inspectedApp && (
                    <>
                      {/* Top Bar for Selected Applicant */}
                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide bg-amber-100 px-2 py-0.5 rounded">
                              {inspectedApp.caseRef}
                            </span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                              inspectedApp.category === 'work_permit'
                                ? 'bg-amber-500 text-white'
                                : inspectedApp.category === 'visit_visa'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-blue-900 text-white'
                            }`}>
                              {inspectedApp.category === 'work_permit'
                                ? 'European Work Permit'
                                : inspectedApp.category === 'visit_visa'
                                ? 'Tourist / Visit Visa'
                                : 'Student Admission'}
                            </span>
                          </div>
                          <h4 className="text-lg font-black text-slate-900 mt-1">
                            {inspectedApp.studentName}
                          </h4>
                          <p className="text-xs text-slate-600">
                            {inspectedApp.program} • {inspectedApp.university}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-500">Assigned Counselor</p>
                          <p className="text-xs font-bold text-blue-900">{inspectedApp.assignedCounselor}</p>
                          <p className="text-[11px] text-slate-500">Contact: {inspectedApp.studentPhone}</p>
                        </div>
                      </div>

                      {/* Admin Milestone Advance Action Box */}
                      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                            Advance Milestone & Trigger Automated Student Alert
                          </h5>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                          <div className="sm:col-span-5">
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Milestone to Complete
                            </label>
                            <select
                              value={selectedStageToAdvance}
                              onChange={(e) => setSelectedStageToAdvance(e.target.value as MilestoneStage)}
                              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                            >
                              <option value="">Select Milestone to Finalize...</option>
                              {inspectedApp.milestones.map((m) => (
                                <option key={m.id} value={m.stage}>
                                  {m.status === 'completed' ? '✓ ' : ''}{m.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="sm:col-span-5">
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Counselor Remarks / Action for Student
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Invitation letter verified at Blue Area office."
                              value={milestoneRemarks}
                              onChange={(e) => setMilestoneRemarks(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <button
                              disabled={!selectedStageToAdvance}
                              onClick={() => {
                                if (selectedStageToAdvance) {
                                  handleAdvanceMilestone(inspectedApp.id, selectedStageToAdvance);
                                }
                              }}
                              className="w-full py-2 px-3 rounded-lg bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold transition-colors cursor-pointer"
                            >
                              Advance
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Milestones Visual Status Checklist */}
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                          Case Milestones Timeline ({inspectedApp.progressPercentage}% Completed)
                        </h5>

                        <div className="space-y-3">
                          {inspectedApp.milestones.map((milestone, idx) => (
                            <div
                              key={milestone.id}
                              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                                milestone.status === 'completed'
                                  ? 'bg-emerald-50/50 border-emerald-200'
                                  : milestone.status === 'in_progress'
                                  ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-400/40'
                                  : 'bg-white border-slate-200 opacity-60'
                              }`}
                            >
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                milestone.status === 'completed'
                                  ? 'bg-emerald-600 text-white'
                                  : milestone.status === 'in_progress'
                                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                                  : 'bg-slate-200 text-slate-600'
                              }`}>
                                {milestone.status === 'completed' ? '✓' : idx + 1}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h6 className="text-xs font-bold text-slate-900">
                                    {milestone.title}
                                  </h6>
                                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                    milestone.status === 'completed'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : milestone.status === 'in_progress'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-slate-100 text-slate-500'
                                  }`}>
                                    {milestone.status.replace('_', ' ')}
                                  </span>
                                </div>

                                <p className="text-[11px] text-slate-600 mt-0.5">
                                  {milestone.description}
                                </p>

                                {milestone.completedDate && (
                                  <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                                    Completed: {milestone.completedDate}
                                  </span>
                                )}

                                {milestone.remarks && (
                                  <div className="mt-1.5 p-2 rounded bg-white border border-slate-200 text-[11px] text-slate-700">
                                    <span className="font-bold">Officer Note:</span> {milestone.remarks}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Admin Tab 2: Document Audits Console */}
            {activeAdminTab === 'documents' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      Student Document Verification Vault
                    </h4>
                    <p className="text-xs text-slate-500">
                      Audit academic credentials, IBCC/HEC stamps, MOFA verifications, and police clearances.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Document Title</th>
                        <th className="p-3">File Info</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Reviewer Notes</th>
                        <th className="p-3 text-right">Verification Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-slate-900">{doc.studentName}</td>
                          <td className="p-3">
                            <span className="font-semibold text-blue-900">{doc.title}</span>
                            <span className="block text-[10px] text-slate-400 capitalize">{doc.type.replace(/_/g, ' ')}</span>
                          </td>
                          <td className="p-3 text-slate-500">
                            {doc.fileName} ({doc.fileSize})
                          </td>
                          <td className="p-3 text-slate-500">{doc.uploadDate}</td>
                          <td className="p-3">{getStatusBadge(doc.status)}</td>
                          <td className="p-3 text-slate-600 max-w-xs truncate">
                            {doc.notes || '—'}
                          </td>
                          <td className="p-3 text-right space-x-1">
                            <button
                              onClick={() => handleReviewDoc(doc.id, 'verified')}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold cursor-pointer"
                              title="Verify Document"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReviewDoc(doc.id, 'needs_revision')}
                              className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold cursor-pointer"
                              title="Request Revision"
                            >
                              Revise
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Admin Tab 3: Website Inquiry Leads */}
            {activeAdminTab === 'leads' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Landing Page Inquiries & Leads Desk
                  </h4>
                  <p className="text-xs text-slate-500">
                    Real-time inquiries received from prospective students and business partners across Pakistan.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Applicant / Client</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Phone / WhatsApp</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Target Country</th>
                        <th className="p-3">Service Requested</th>
                        <th className="p-3">Message Note</th>
                        <th className="p-3 text-right">Lead Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {leads.map((lead) => {
                        const cat = lead.category || (lead.serviceRequired.toLowerCase().includes('work') ? 'work_permit' : lead.serviceRequired.toLowerCase().includes('visit') ? 'visit_visa' : 'student');
                        return (
                          <tr key={lead.id} className="hover:bg-slate-50">
                            <td className="p-3">
                              <span className="font-bold text-slate-900 block">{lead.fullName}</span>
                              <span className="text-[10px] text-slate-400">{lead.email}</span>
                            </td>
                            <td className="p-3">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                                cat === 'work_permit'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : cat === 'visit_visa'
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                  : 'bg-blue-100 text-blue-900 border border-blue-300'
                              }`}>
                                {cat === 'work_permit' ? '💼 Work Permit' : cat === 'visit_visa' ? '✈️ Visit Visa' : '🎓 Study Visa'}
                              </span>
                            </td>
                            <td className="p-3">
                              <a href={`tel:${lead.phone}`} className="text-blue-900 font-semibold hover:underline">
                                {lead.phone}
                              </a>
                            </td>
                            <td className="p-3 text-slate-600">{lead.city}</td>
                            <td className="p-3 font-bold text-amber-700">{lead.targetCountry}</td>
                            <td className="p-3 text-slate-700 font-medium">{lead.serviceRequired}</td>
                            <td className="p-3 text-slate-500 max-w-xs truncate">{lead.message}</td>
                            <td className="p-3 text-right">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as ContactInquiry['status'])}
                                className="px-2 py-1 rounded border border-slate-300 bg-white text-[11px] font-semibold"
                              >
                                <option value="new">New Lead</option>
                                <option value="contacted">Contacted</option>
                                <option value="assessment_scheduled">Assessment Scheduled</option>
                                <option value="closed">Closed / Enrolled</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Admin Tab 4: Broadcast Alert Dispatcher */}
            {activeAdminTab === 'broadcast' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-2xl text-left space-y-4">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Automated Milestone Notification Dispatcher
                  </h4>
                  <p className="text-xs text-slate-500">
                    Broadcast critical embassy deadline alerts, scholarship updates, or orientation announcements to all student portals.
                  </p>
                </div>

                {broadcastSent && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
                    ✓ Notification broadcasted successfully to all active students!
                  </div>
                )}

                <form onSubmit={handleSendBroadcast} className="space-y-3.5 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Notification Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Embassy Appointment Quota Opened for Italy & Belarus"
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Detailed Announcement Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Enter the detailed milestone advisory or orientation venue instructions in Blue Area Islamabad..."
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900 outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Dispatch Automated Alert to All Students
                  </button>
                </form>
              </div>
            )}

            {/* Admin Tab 5: Frontend CMS (Edit Live Website Text) */}
            {activeAdminTab === 'cms' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
                {/* CMS Header Bar */}
                <div className="p-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                        <Edit3 className="w-4 h-4" />
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        Live Website Frontend CMS Content Manager
                      </h4>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                        Live Sync
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Edit headlines, phone numbers, stats, and text across every website section. Changes apply instantly without redeploying.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetCms}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>Reset Defaults</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveCms}
                      className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Publish Live</span>
                    </button>
                  </div>
                </div>

                {/* Save Feedback Banner */}
                {cmsSaveMessage && (
                  <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{cmsSaveMessage}</span>
                    </div>
                    <button
                      onClick={() => setCmsSaveMessage(null)}
                      className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* CMS Body with Section Selector Sidebar & Editor Panel */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                  {/* Left Section Navigation */}
                  <div className="md:col-span-3 border-r border-slate-200 bg-white p-3 space-y-1 overflow-y-auto">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 py-1">
                      Choose Section to Edit
                    </p>

                    {[
                      { id: 'hero', label: 'Hero Banner & Stats', icon: Layout },
                      { id: 'about', label: 'About Us & Manifesto', icon: Building2 },
                      { id: 'countries', label: 'Target Countries', icon: Globe },
                      { id: 'services', label: 'Our Services', icon: Layers },
                      { id: 'whyUs', label: 'Why Choose Us', icon: ShieldCheck },
                      { id: 'team', label: 'Leadership Team', icon: Users },
                      { id: 'faqs', label: 'FAQ Section', icon: HelpCircle },
                      { id: 'contact', label: 'Contact & Office Info', icon: PhoneCall },
                    ].map((sec) => {
                      const IconComp = sec.icon;
                      const isSelected = activeCmsSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => setActiveCmsSection(sec.id as any)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-900 text-white shadow-xs'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <IconComp className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                          <span>{sec.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Form Editor Panel */}
                  <div className="md:col-span-9 p-4 sm:p-6 overflow-y-auto bg-slate-50">
                    <form onSubmit={handleSaveCms} className="space-y-6 max-w-3xl">
                      {/* HERO SECTION */}
                      {activeCmsSection === 'hero' && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <h5 className="font-extrabold text-slate-900 text-sm">Hero Banner Content</h5>
                            <p className="text-xs text-slate-500">Edit the primary headline, tagline, phone number, and stats bar.</p>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Top Badge Pill</label>
                              <input
                                type="text"
                                value={siteContent.hero.badgeText}
                                onChange={(e) => updateCmsField('hero', 'badgeText', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 outline-hidden"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Headline Text</label>
                                <input
                                  type="text"
                                  value={siteContent.hero.headline}
                                  onChange={(e) => updateCmsField('hero', 'headline', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 outline-hidden"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Headline Highlight (Colored)</label>
                                <input
                                  type="text"
                                  value={siteContent.hero.headlineHighlight}
                                  onChange={(e) => updateCmsField('hero', 'headlineHighlight', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 outline-hidden text-blue-900 font-bold"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Mission Pitch</label>
                              <textarea
                                rows={3}
                                value={siteContent.hero.subtitle}
                                onChange={(e) => updateCmsField('hero', 'subtitle', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 outline-hidden"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Button</label>
                                <input
                                  type="text"
                                  value={siteContent.hero.primaryCtaText}
                                  onChange={(e) => updateCmsField('hero', 'primaryCtaText', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 outline-hidden"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Button Label</label>
                                <input
                                  type="text"
                                  value={siteContent.hero.phoneButtonText}
                                  onChange={(e) => updateCmsField('hero', 'phoneButtonText', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 outline-hidden"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                                <input
                                  type="text"
                                  value={siteContent.hero.phoneButtonNumber}
                                  onChange={(e) => updateCmsField('hero', 'phoneButtonNumber', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 outline-hidden font-mono"
                                />
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-100">
                              <p className="text-xs font-bold text-slate-800 mb-2">Four Key Hero Statistics</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat 1</label>
                                  <input
                                    type="text"
                                    placeholder="Value (e.g. 98.8%)"
                                    value={siteContent.hero.stat1Value}
                                    onChange={(e) => updateCmsField('hero', 'stat1Value', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Label"
                                    value={siteContent.hero.stat1Label}
                                    onChange={(e) => updateCmsField('hero', 'stat1Label', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                                  />
                                </div>

                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat 2</label>
                                  <input
                                    type="text"
                                    placeholder="Value (e.g. 1,850+)"
                                    value={siteContent.hero.stat2Value}
                                    onChange={(e) => updateCmsField('hero', 'stat2Value', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Label"
                                    value={siteContent.hero.stat2Label}
                                    onChange={(e) => updateCmsField('hero', 'stat2Label', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                                  />
                                </div>

                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat 3</label>
                                  <input
                                    type="text"
                                    placeholder="Value (e.g. 45+)"
                                    value={siteContent.hero.stat3Value}
                                    onChange={(e) => updateCmsField('hero', 'stat3Value', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Label"
                                    value={siteContent.hero.stat3Label}
                                    onChange={(e) => updateCmsField('hero', 'stat3Label', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                                  />
                                </div>

                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat 4</label>
                                  <input
                                    type="text"
                                    placeholder="Value (e.g. 100%)"
                                    value={siteContent.hero.stat4Value}
                                    onChange={(e) => updateCmsField('hero', 'stat4Value', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Label"
                                    value={siteContent.hero.stat4Label}
                                    onChange={(e) => updateCmsField('hero', 'stat4Label', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ABOUT US SECTION */}
                      {activeCmsSection === 'about' && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <h5 className="font-extrabold text-slate-900 text-sm">About Us & Director Manifesto</h5>
                            <p className="text-xs text-slate-500">Edit the about section headings, paragraphs, and leadership card.</p>
                          </div>

                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
                                <input
                                  type="text"
                                  value={siteContent.about.badgeText}
                                  onChange={(e) => updateCmsField('about', 'badgeText', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Section Headline</label>
                                <input
                                  type="text"
                                  value={siteContent.about.headline}
                                  onChange={(e) => updateCmsField('about', 'headline', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                                />
                              </div>
                            </div>

                            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                              <p className="text-xs font-bold text-slate-800">Founder Card Details</p>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500">Role Tag</label>
                                  <input
                                    type="text"
                                    value={siteContent.about.cardTag}
                                    onChange={(e) => updateCmsField('about', 'cardTag', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500">Founder Name</label>
                                  <input
                                    type="text"
                                    value={siteContent.about.cardTitle}
                                    onChange={(e) => updateCmsField('about', 'cardTitle', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500">Credentials Subtitle</label>
                                  <input
                                    type="text"
                                    value={siteContent.about.cardSubtitle}
                                    onChange={(e) => updateCmsField('about', 'cardSubtitle', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Featured Manifesto Statement (Quote Box)</label>
                              <textarea
                                rows={2}
                                value={siteContent.about.manifestoStatement}
                                onChange={(e) => updateCmsField('about', 'manifestoStatement', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Narrative Paragraph 1</label>
                              <textarea
                                rows={3}
                                value={siteContent.about.paragraph1}
                                onChange={(e) => updateCmsField('about', 'paragraph1', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Narrative Paragraph 2</label>
                              <textarea
                                rows={3}
                                value={siteContent.about.paragraph2}
                                onChange={(e) => updateCmsField('about', 'paragraph2', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>

                            <div className="pt-2 border-t border-slate-100 space-y-2">
                              <p className="text-xs font-bold text-slate-800">Three Foundation Pillars</p>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                                  <input
                                    type="text"
                                    value={siteContent.about.pillar1Title}
                                    onChange={(e) => updateCmsField('about', 'pillar1Title', e.target.value)}
                                    className="w-full px-2 py-1 text-xs rounded-md border border-slate-300 font-bold mb-1"
                                  />
                                  <textarea
                                    rows={2}
                                    value={siteContent.about.pillar1Desc}
                                    onChange={(e) => updateCmsField('about', 'pillar1Desc', e.target.value)}
                                    className="w-full px-2 py-1 text-[11px] rounded-md border border-slate-300"
                                  />
                                </div>
                                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                                  <input
                                    type="text"
                                    value={siteContent.about.pillar2Title}
                                    onChange={(e) => updateCmsField('about', 'pillar2Title', e.target.value)}
                                    className="w-full px-2 py-1 text-xs rounded-md border border-slate-300 font-bold mb-1"
                                  />
                                  <textarea
                                    rows={2}
                                    value={siteContent.about.pillar2Desc}
                                    onChange={(e) => updateCmsField('about', 'pillar2Desc', e.target.value)}
                                    className="w-full px-2 py-1 text-[11px] rounded-md border border-slate-300"
                                  />
                                </div>
                                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                                  <input
                                    type="text"
                                    value={siteContent.about.pillar3Title}
                                    onChange={(e) => updateCmsField('about', 'pillar3Title', e.target.value)}
                                    className="w-full px-2 py-1 text-xs rounded-md border border-slate-300 font-bold mb-1"
                                  />
                                  <textarea
                                    rows={2}
                                    value={siteContent.about.pillar3Desc}
                                    onChange={(e) => updateCmsField('about', 'pillar3Desc', e.target.value)}
                                    className="w-full px-2 py-1 text-[11px] rounded-md border border-slate-300"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TARGET COUNTRIES SECTION */}
                      {activeCmsSection === 'countries' && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <h5 className="font-extrabold text-slate-900 text-sm">Target Countries Section Header</h5>
                            <p className="text-xs text-slate-500">Edit the introductory text introducing the 12 destination countries.</p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
                              <input
                                type="text"
                                value={siteContent.countries.badgeText}
                                onChange={(e) => updateCmsField('countries', 'badgeText', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteContent.countries.headline}
                                onChange={(e) => updateCmsField('countries', 'headline', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                              <textarea
                                rows={2}
                                value={siteContent.countries.subtitle}
                                onChange={(e) => updateCmsField('countries', 'subtitle', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SERVICES SECTION */}
                      {activeCmsSection === 'services' && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <h5 className="font-extrabold text-slate-900 text-sm">Services Section Header</h5>
                            <p className="text-xs text-slate-500">Edit the text introducing admissions, visas, work permits, and writing services.</p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
                              <input
                                type="text"
                                value={siteContent.services.badgeText}
                                onChange={(e) => updateCmsField('services', 'badgeText', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteContent.services.headline}
                                onChange={(e) => updateCmsField('services', 'headline', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                              <textarea
                                rows={2}
                                value={siteContent.services.subtitle}
                                onChange={(e) => updateCmsField('services', 'subtitle', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* WHY US SECTION */}
                      {activeCmsSection === 'whyUs' && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <h5 className="font-extrabold text-slate-900 text-sm">Why Choose Us Section Header</h5>
                            <p className="text-xs text-slate-500">Edit the text highlighting legal oversight, ethical standards, and high visa rates.</p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
                              <input
                                type="text"
                                value={siteContent.whyUs.badgeText}
                                onChange={(e) => updateCmsField('whyUs', 'badgeText', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteContent.whyUs.headline}
                                onChange={(e) => updateCmsField('whyUs', 'headline', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                              <textarea
                                rows={2}
                                value={siteContent.whyUs.subtitle}
                                onChange={(e) => updateCmsField('whyUs', 'subtitle', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TEAM SECTION */}
                      {activeCmsSection === 'team' && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <h5 className="font-extrabold text-slate-900 text-sm">Leadership Team Section Header</h5>
                            <p className="text-xs text-slate-500">Edit headings for the advisory board and leadership team.</p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
                              <input
                                type="text"
                                value={siteContent.team.badgeText}
                                onChange={(e) => updateCmsField('team', 'badgeText', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteContent.team.headline}
                                onChange={(e) => updateCmsField('team', 'headline', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                              <textarea
                                rows={2}
                                value={siteContent.team.subtitle}
                                onChange={(e) => updateCmsField('team', 'subtitle', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* FAQ SECTION */}
                      {activeCmsSection === 'faqs' && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <h5 className="font-extrabold text-slate-900 text-sm">Frequently Asked Questions Header</h5>
                            <p className="text-xs text-slate-500">Edit the intro text for the FAQ questions accordion.</p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
                              <input
                                type="text"
                                value={siteContent.faqs.badgeText}
                                onChange={(e) => updateCmsField('faqs', 'badgeText', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteContent.faqs.headline}
                                onChange={(e) => updateCmsField('faqs', 'headline', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                              <textarea
                                rows={2}
                                value={siteContent.faqs.subtitle}
                                onChange={(e) => updateCmsField('faqs', 'subtitle', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CONTACT INFO SECTION */}
                      {activeCmsSection === 'contact' && (
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <h5 className="font-extrabold text-slate-900 text-sm">Contact Information & Islamabad Office</h5>
                            <p className="text-xs text-slate-500">Update head office address, official phone lines, email, and working hours.</p>
                          </div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
                                <input
                                  type="text"
                                  value={siteContent.contact.badgeText}
                                  onChange={(e) => updateCmsField('contact', 'badgeText', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                                <input
                                  type="text"
                                  value={siteContent.contact.headline}
                                  onChange={(e) => updateCmsField('contact', 'headline', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                              <textarea
                                rows={2}
                                value={siteContent.contact.subtitle}
                                onChange={(e) => updateCmsField('contact', 'subtitle', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Office Address (Islamabad Head Office)</label>
                              <input
                                type="text"
                                value={siteContent.contact.address}
                                onChange={(e) => updateCmsField('contact', 'address', e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-medium"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Landline / Primary Phone</label>
                                <input
                                  type="text"
                                  value={siteContent.contact.phonePrimary}
                                  onChange={(e) => updateCmsField('contact', 'phonePrimary', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Helpline</label>
                                <input
                                  type="text"
                                  value={siteContent.contact.phoneMobile}
                                  onChange={(e) => updateCmsField('contact', 'phoneMobile', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
                                <input
                                  type="email"
                                  value={siteContent.contact.email}
                                  onChange={(e) => updateCmsField('contact', 'email', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Consultancy Operating Hours</label>
                                <input
                                  type="text"
                                  value={siteContent.contact.hours}
                                  onChange={(e) => updateCmsField('contact', 'hours', e.target.value)}
                                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Sticky Save Bar */}
                      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                        <span className="text-xs text-slate-500 font-medium">
                          All changes update the live site instantly upon clicking save.
                        </span>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>Publish All Changes Live</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Tab 6: Branding & Logo / Favicon Upload */}
            {activeAdminTab === 'branding' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100">
                <div className="max-w-5xl mx-auto space-y-6">
                  
                  {/* Top Notification Toast */}
                  {brandingSuccessMsg && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="text-xs sm:text-sm font-black">{brandingSuccessMsg}</span>
                      </div>
                      <button 
                        onClick={() => setBrandingSuccessMsg(null)}
                        className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-1"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {/* Header info */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#074592]/10 text-[#074592] text-xs font-black uppercase tracking-wider mb-2">
                        <ImageIcon className="w-3.5 h-3.5 text-[#ff4958]" />
                        <span>Visual Identity & Brand Assets</span>
                      </div>
                      <h4 className="text-xl font-black text-slate-900">
                        Website Logo & Browser Favicon Manager
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Upload custom logos and favicons for Modernminds Consulting Services. Changes take effect instantly across the whole application and browser tab.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetBranding}
                      className="px-4 py-2 rounded-xl border border-slate-300 hover:border-rose-400 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Default Assets</span>
                    </button>
                  </div>

                  <form onSubmit={handleSaveBranding} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left Column: Uploaders & Configuration (7 cols) */}
                      <div className="lg:col-span-7 space-y-5">
                        
                        {/* 1. Website Logo Upload */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-[#074592]/10 text-[#074592] flex items-center justify-center font-black text-xs">
                                1
                              </div>
                              <div>
                                <h5 className="font-extrabold text-slate-900 text-sm">Main Website Logo</h5>
                                <p className="text-[11px] text-slate-500">Displayed in the top navigation header and footer across all pages.</p>
                              </div>
                            </div>
                            {logoInputUrl && (
                              <button
                                type="button"
                                onClick={() => setLogoInputUrl('')}
                                className="text-xs text-rose-600 hover:underline font-bold"
                              >
                                Clear Custom
                              </button>
                            )}
                          </div>

                          {/* File Upload Dropzone */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              Upload Logo File (PNG, SVG, JPG, WebP)
                            </label>
                            <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 hover:border-[#074592] bg-slate-50 hover:bg-blue-50/40 rounded-xl cursor-pointer transition-all">
                              <Upload className="w-6 h-6 text-[#074592] mb-2" />
                              <span className="text-xs font-bold text-slate-700">Click to choose image from computer</span>
                              <span className="text-[10px] text-slate-400 mt-1">Recommended: Transparent background PNG or SVG (approx. 240x60px)</span>
                              <input 
                                type="file" 
                                accept="image/png,image/svg+xml,image/jpeg,image/webp" 
                                onChange={handleLogoFileUpload}
                                className="hidden" 
                              />
                            </label>
                          </div>

                          {/* Alternative: Image URL */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Or Provide Image URL
                            </label>
                            <input
                              type="url"
                              placeholder="https://example.com/modernminds-logo.png"
                              value={logoInputUrl}
                              onChange={(e) => setLogoInputUrl(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden font-mono"
                            />
                          </div>

                          {/* Quick Logo Presets */}
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">
                              Logo Presets:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => setLogoInputUrl('')}
                                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#074592] bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                              >
                                <span className="w-2 h-2 rounded-full bg-[#66d925]" />
                                <span>Default Modernminds Vector Logo</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 2. Favicon Upload */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-[#66d925]/20 text-[#074592] flex items-center justify-center font-black text-xs">
                                2
                              </div>
                              <div>
                                <h5 className="font-extrabold text-slate-900 text-sm">Browser Tab Favicon</h5>
                                <p className="text-[11px] text-slate-500">The small icon shown in browser tabs, bookmarks, and mobile home screens.</p>
                              </div>
                            </div>
                            {faviconInputUrl && (
                              <button
                                type="button"
                                onClick={() => {
                                  setFaviconInputUrl('');
                                  applyFavicon('/favicon.ico');
                                }}
                                className="text-xs text-rose-600 hover:underline font-bold"
                              >
                                Clear Custom
                              </button>
                            )}
                          </div>

                          {/* File Upload Dropzone for Favicon */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              Upload Favicon File (.ico, .png, .svg)
                            </label>
                            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-[#66d925] bg-slate-50 hover:bg-emerald-50/40 rounded-xl cursor-pointer transition-all">
                              <Upload className="w-5 h-5 text-[#66d925] mb-1.5" />
                              <span className="text-xs font-bold text-slate-700">Click to upload favicon (.ico or .png)</span>
                              <span className="text-[10px] text-slate-400 mt-1">Recommended: Square 32x32 or 64x64 pixels</span>
                              <input 
                                type="file" 
                                accept="image/x-icon,image/png,image/svg+xml,image/vnd.microsoft.icon" 
                                onChange={handleFaviconFileUpload}
                                className="hidden" 
                              />
                            </label>
                          </div>

                          {/* Alternative: Favicon URL */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Or Favicon Direct URL
                            </label>
                            <input
                              type="url"
                              placeholder="https://example.com/favicon.png"
                              value={faviconInputUrl}
                              onChange={(e) => setFaviconInputUrl(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#074592] focus:border-transparent outline-hidden font-mono"
                            />
                          </div>
                        </div>

                        {/* 3. Brand Identity & Name Specification */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-[#ff4958]/10 text-[#ff4958] flex items-center justify-center font-black text-xs">
                              3
                            </div>
                            <div>
                              <h5 className="font-extrabold text-slate-900 text-sm">Brand Name & Guidelines</h5>
                              <p className="text-[11px] text-slate-500">Enforce standard company naming and brand color codes.</p>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Brand Name (Always Single Word)
                            </label>
                            <input
                              type="text"
                              value={brandNameInput}
                              onChange={(e) => setBrandNameInput(e.target.value)}
                              placeholder="Modernminds"
                              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 font-extrabold text-[#074592]"
                            />
                            <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Rule: &quot;Modernminds&quot; is one continuous word (not separated).
                            </p>
                          </div>

                          {/* Brand Color Palette Swatches */}
                          <div className="pt-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                              Modernminds Official Color Palette:
                            </span>
                            <div className="grid grid-cols-3 gap-2.5">
                              <div className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2.5 shadow-2xs">
                                <span className="w-6 h-6 rounded-md bg-[#074592] shrink-0 border border-slate-300" />
                                <div className="min-w-0">
                                  <p className="text-[11px] font-bold text-slate-900 truncate">Navy Blue</p>
                                  <p className="text-[10px] font-mono text-slate-500">#074592</p>
                                </div>
                              </div>

                              <div className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2.5 shadow-2xs">
                                <span className="w-6 h-6 rounded-md bg-[#66d925] shrink-0 border border-slate-300" />
                                <div className="min-w-0">
                                  <p className="text-[11px] font-bold text-slate-900 truncate">Vibrant Green</p>
                                  <p className="text-[10px] font-mono text-slate-500">#66d925</p>
                                </div>
                              </div>

                              <div className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2.5 shadow-2xs">
                                <span className="w-6 h-6 rounded-md bg-[#ff4958] shrink-0 border border-slate-300" />
                                <div className="min-w-0">
                                  <p className="text-[11px] font-bold text-slate-900 truncate">Accent Crimson</p>
                                  <p className="text-[10px] font-mono text-slate-500">#ff4958</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Right Column: Live Real-Time Previews (5 cols) */}
                      <div className="lg:col-span-5 space-y-5">
                        
                        {/* 1. Header Light Preview */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                              Header Bar Preview (Light)
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">Live Simulation</span>
                          </div>

                          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex items-center justify-between">
                            <Logo 
                              customLogoUrl={logoInputUrl || undefined} 
                              customBrandName={brandNameInput} 
                              size="md" 
                              variant="inline" 
                            />
                            <div className="flex items-center gap-2">
                              <span className="hidden sm:inline text-[10px] font-bold text-[#074592] bg-blue-50 px-2 py-1 rounded">
                                Hotline Active
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 2. Footer Dark Preview */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                              Footer Preview (Dark)
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">Dark Background</span>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-950 shadow-xs flex items-center justify-between">
                            <Logo 
                              customLogoUrl={logoInputUrl || undefined} 
                              customBrandName={brandNameInput} 
                              theme="dark" 
                              size="md" 
                              variant="inline" 
                            />
                          </div>
                        </div>

                        {/* 3. Browser Tab Preview */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                              Browser Tab & Favicon Simulation
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">Browser Head</span>
                          </div>

                          {/* Simulated Browser Chrome */}
                          <div className="rounded-xl border border-slate-300 bg-slate-200 p-2 space-y-2">
                            {/* Window controls */}
                            <div className="flex items-center gap-1.5 px-1">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            </div>

                            {/* Active Tab */}
                            <div className="max-w-[280px] bg-white rounded-t-lg px-3 py-1.5 shadow-xs flex items-center gap-2 border-t-2 border-[#074592]">
                              {faviconInputUrl ? (
                                <img 
                                  src={faviconInputUrl} 
                                  alt="Favicon preview" 
                                  className="w-4 h-4 object-contain rounded-xs shrink-0" 
                                />
                              ) : (
                                <span className="w-4 h-4 rounded-xs bg-[#074592] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                                  M
                                </span>
                              )}
                              <span className="text-[11px] font-bold text-slate-800 truncate">
                                {brandNameInput} | Immigration & Visas
                              </span>
                              <X className="w-3 h-3 text-slate-400 ml-auto shrink-0" />
                            </div>

                            {/* Simulated Address Bar */}
                            <div className="bg-white rounded-md px-3 py-1 text-[11px] font-mono text-slate-500 border border-slate-300 flex items-center gap-1.5">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span className="text-slate-800 font-semibold">https://modernminds.pk</span>
                            </div>
                          </div>

                          {/* Multi-Size Favicon Display */}
                          <div className="pt-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                              Favicon Resolution Scales:
                            </span>
                            <div className="flex items-end gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                              <div className="text-center space-y-1">
                                <div className="w-4 h-4 mx-auto flex items-center justify-center bg-white border border-slate-300 rounded-xs overflow-hidden">
                                  {faviconInputUrl ? <img src={faviconInputUrl} alt="16x16" className="w-full h-full object-contain" /> : <span className="text-[8px] font-black text-[#074592]">M</span>}
                                </div>
                                <span className="text-[9px] text-slate-500 font-bold block">16px</span>
                              </div>

                              <div className="text-center space-y-1">
                                <div className="w-8 h-8 mx-auto flex items-center justify-center bg-white border border-slate-300 rounded-sm overflow-hidden">
                                  {faviconInputUrl ? <img src={faviconInputUrl} alt="32x32" className="w-full h-full object-contain" /> : <span className="text-xs font-black text-[#074592]">M</span>}
                                </div>
                                <span className="text-[9px] text-slate-500 font-bold block">32px</span>
                              </div>

                              <div className="text-center space-y-1">
                                <div className="w-12 h-12 mx-auto flex items-center justify-center bg-white border border-slate-300 rounded-md overflow-hidden">
                                  {faviconInputUrl ? <img src={faviconInputUrl} alt="48x48" className="w-full h-full object-contain" /> : <span className="text-base font-black text-[#074592]">M</span>}
                                </div>
                                <span className="text-[9px] text-slate-500 font-bold block">48px</span>
                              </div>

                              <div className="text-center space-y-1">
                                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-white border border-slate-300 rounded-lg overflow-hidden shadow-xs">
                                  {faviconInputUrl ? <img src={faviconInputUrl} alt="64x64" className="w-full h-full object-contain" /> : <span className="text-xl font-black text-[#074592]">M</span>}
                                </div>
                                <span className="text-[9px] text-slate-500 font-bold block">64px</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Sticky Save Bar */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-md">
                      <span className="text-xs text-slate-500 font-medium">
                        Clicking save instantly updates the header logo, footer logo, and browser favicon across the whole application.
                      </span>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#ff4958] hover:bg-[#e63140] text-white text-xs font-black flex items-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save & Publish Branding Assets</span>
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            )}

            {/* Admin Tab: Global Employment & Travel Destinations */}
            {activeAdminTab === 'work_visit_destinations' && (
              <AdminWorkVisitDestinations />
            )}

            {/* Admin Tab: Global Destinations (Study Abroad Countries) */}
            {activeAdminTab === 'target_countries' && (
              <AdminTargetCountries />
            )}

            {/* Admin Tab: Executive Leadership & Advisors */}
            {activeAdminTab === 'leadership' && (
              <AdminLeadership />
            )}

            {/* Admin Tab: Job Opportunities & Design Brochures */}
            {activeAdminTab === 'jobs_brochures' && (
              <AdminJobOpportunities />
            )}

            {/* Admin Tab: Admin Security & Password */}
            {activeAdminTab === 'security' && (
              <AdminSecurity />
            )}

            {/* Admin Tab: Public Warning & Fraud Disclaimer Popup */}
            {activeAdminTab === 'disclaimer_popup' && (
              <AdminDisclaimerPopup />
            )}
          </div>
        ) : (
          /* ================= STUDENT INTERFACE ================= */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Student Navigation Bar */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStudentTab('timeline')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeStudentTab === 'timeline'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Application Status Tracker</span>
                </button>

                <button
                  onClick={() => setActiveStudentTab('documents')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeStudentTab === 'documents'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Document Vault ({myDocuments.length})</span>
                </button>
              </div>

              <div className="text-xs text-slate-500 font-semibold">
                Case Ref: <span className="text-amber-800 font-bold">{myApplication?.caseRef || 'MCS-2026'}</span>
              </div>
            </div>

            {/* Student Tab 1: Real-Time Application Timeline */}
            {activeStudentTab === 'timeline' && (
              <div className="flex-1 overflow-y-auto p-6 text-left space-y-6">
                {/* Status Hero Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950 to-indigo-950 text-white shadow-lg">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                        {myApplication?.targetCountry} • {myApplication?.intake}
                      </span>
                      <h4 className="text-xl font-black text-white mt-1">
                        {myApplication?.program}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {myApplication?.university}
                      </p>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl border border-white/15 text-right">
                      <p className="text-[10px] text-slate-400 uppercase">Assigned Counselor</p>
                      <p className="text-xs font-bold text-amber-300">{myApplication?.assignedCounselor}</p>
                      <p className="text-[11px] text-slate-300">Islamabad Office: 051-4862273</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 pt-4 border-t border-white/15">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-slate-300">Application Progress</span>
                      <span className="font-black text-amber-400 text-sm">
                        {myApplication?.progressPercentage}% Completed
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500" 
                        style={{ width: `${myApplication?.progressPercentage}%` }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Milestone Stages Step-by-Step */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Real-Time Milestone Stages
                  </h5>

                  <div className="space-y-3">
                    {myApplication?.milestones.map((milestone, idx) => (
                      <div
                        key={milestone.id}
                        className={`p-4 rounded-xl border transition-all ${
                          milestone.status === 'completed'
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : milestone.status === 'in_progress'
                            ? 'bg-amber-50/70 border-amber-300 shadow-xs ring-2 ring-amber-400/30'
                            : 'bg-white border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                            milestone.status === 'completed'
                              ? 'bg-emerald-600 text-white'
                              : milestone.status === 'in_progress'
                              ? 'bg-amber-500 text-slate-950 animate-pulse'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {milestone.status === 'completed' ? '✓' : idx + 1}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h6 className="text-sm font-bold text-slate-900">
                                {milestone.title}
                              </h6>
                              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                milestone.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : milestone.status === 'in_progress'
                                  ? 'bg-amber-200 text-amber-900 font-black'
                                  : 'bg-slate-100 text-slate-500'
                              }`}>
                                {milestone.status.replace('_', ' ')}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 mt-1">
                              {milestone.description}
                            </p>

                            {milestone.actionRequired && (
                              <div className="mt-2 p-2 rounded-lg bg-amber-100/70 border border-amber-300 text-xs font-semibold text-amber-950">
                                ⚠️ Required Action: {milestone.actionRequired}
                              </div>
                            )}

                            {milestone.remarks && (
                              <div className="mt-2 p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                                <span className="font-bold text-blue-900">Advisor Note:</span> {milestone.remarks}
                              </div>
                            )}

                            {milestone.completedDate && (
                              <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                                Stage Approved Date: {milestone.completedDate}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Student Tab 2: Document Management Vault */}
            {activeStudentTab === 'documents' && (
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden text-left">
                {/* Upload Form (Left Column) */}
                <div className="lg:col-span-5 p-6 border-r border-slate-200 overflow-y-auto space-y-4 bg-slate-50">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Upload Required Documents
                    </h4>
                    <p className="text-xs text-slate-500">
                      Upload PDF/JPEG scans for IBCC, HEC, and Embassy verification.
                    </p>
                  </div>

                  {uploadSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
                      ✓ Document uploaded successfully! Placed under officer review.
                    </div>
                  )}

                  <form onSubmit={handleUploadSubmit} className="space-y-3.5 bg-white p-4 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Document Category *
                      </label>
                      <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value as DocumentType)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <optgroup label="Primary Identity & Police / Health">
                          <option value="passport">Passport (Valid Color Scan)</option>
                          <option value="police_clearance">Police Character Clearance Certificate</option>
                          <option value="medical_fitness">Medical Fitness & Chest X-Ray</option>
                          <option value="bank_statement">Bank Statement & Account Maintenance Letter</option>
                        </optgroup>
                        <optgroup label="Work Permit & Employment Documents">
                          <option value="employment_contract">Foreign Employment Contract / Labor Approval</option>
                          <option value="work_experience">Work Experience / Trade Skill Certificate</option>
                        </optgroup>
                        <optgroup label="Tourist & Visit Visa Documents">
                          <option value="tax_fbr_record">FBR Tax Returns & NTN Certificate</option>
                          <option value="sponsorship_letter">Host Invitation & Sponsorship Guarantee</option>
                          <option value="hotel_ticket_booking">Flight Itinerary & Hotel Reservation</option>
                          <option value="travel_insurance">International Travel Medical Insurance</option>
                        </optgroup>
                        <optgroup label="Student Admission Documents">
                          <option value="academic_matric">Matric / O-Level Certificate</option>
                          <option value="academic_fsc_degree">F.Sc / A-Level / Bachelor Transcript</option>
                          <option value="language_test">IELTS / PTE / English Proficiency Letter</option>
                          <option value="sop_essay">Statement of Purpose (SOP)</option>
                        </optgroup>
                        <optgroup label="Other">
                          <option value="other">Other Document / Legal Affidavit</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Document Title / Description *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. F.Sc Pre-Medical IBCC Attested Marksheet"
                        value={docTitle}
                        onChange={(e) => setDocTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        File Attachment
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-900 transition-colors">
                        <Upload className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                        <p className="text-xs text-slate-600 font-medium">Click or Drag PDF/Images</p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setUploadFileName(e.target.files[0].name);
                              if (!docTitle) {
                                setDocTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
                              }
                            }
                          }}
                          className="hidden"
                          id="file-upload-input"
                        />
                        <label
                          htmlFor="file-upload-input"
                          className="mt-2 inline-block px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-bold text-slate-700 cursor-pointer"
                        >
                          Select File from Device
                        </label>
                        {uploadFileName && (
                          <p className="text-xs font-bold text-blue-900 mt-2">
                            Selected: {uploadFileName}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={uploading}
                      className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      {uploading ? 'Encrypting & Storing...' : 'Upload to Secure Vault'}
                    </button>
                  </form>
                </div>

                {/* Document List (Right Column) */}
                <div className="lg:col-span-7 p-6 overflow-y-auto space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">
                    Your Uploaded Credentials Vault ({myDocuments.length})
                  </h4>

                  {myDocuments.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                      No documents uploaded yet. Please upload your passport and educational transcripts.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {myDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex items-start justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-slate-900">{doc.title}</h5>
                              <p className="text-[11px] text-slate-500">
                                {doc.fileName} • {doc.fileSize} • Uploaded {doc.uploadDate}
                              </p>

                              {doc.notes && (
                                <p className="text-[11px] text-slate-700 bg-slate-50 p-1.5 rounded mt-1.5 border border-slate-100">
                                  <span className="font-semibold">Reviewer Note:</span> {doc.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            {getStatusBadge(doc.status)}
                            <button
                              onClick={() => {
                                alert(`Simulated secure preview for ${doc.fileName}. In production, this opens the attested PDF.`);
                              }}
                              className="text-[11px] text-blue-900 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <Download className="w-3 h-3" />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Bar */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-blue-900" />
            Modernminds Consulting Services • Executive Heights, Blue Area, Islamabad
          </span>
          <span className="font-bold text-blue-900">
            Helpline: 051-4862273 | 03002346521
          </span>
        </div>
      </div>
    </div>
  );
};
