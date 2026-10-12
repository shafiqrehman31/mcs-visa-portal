import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Upload, 
  Trash2, 
  Plus, 
  Eye, 
  Save, 
  RotateCcw, 
  Check, 
  Image as ImageIcon, 
  Info, 
  Sparkles,
  ShieldCheck,
  Phone,
  AlertOctagon,
  X
} from 'lucide-react';
import { DisclaimerPopupSettings } from '../../types';
import { 
  getDisclaimerPopup, 
  saveDisclaimerPopup, 
  resetDisclaimerPopup,
  onStorageUpdate 
} from '../../services/storageService';
import { DisclaimerModal } from '../DisclaimerModal';

export const AdminDisclaimerPopup: React.FC = () => {
  const [settings, setSettings] = useState<DisclaimerPopupSettings>(getDisclaimerPopup());
  const [notification, setNotification] = useState<{ type: 'success' | 'info'; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [newBulletText, setNewBulletText] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync with storage
  useEffect(() => {
    const sync = () => {
      setSettings(getDisclaimerPopup());
    };
    sync();
    return onStorageUpdate(sync);
  }, []);

  const handleFieldChange = <K extends keyof DisclaimerPopupSettings>(
    field: K, 
    value: DisclaimerPopupSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  // Image Upload handler (converts file to base64 data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Selected image exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleFieldChange('personImage', reader.result);
        setNotification({
          type: 'success',
          message: 'Person photo uploaded successfully! Click "Save Disclaimer" to make it live.'
        });
        setTimeout(() => setNotification(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    handleFieldChange('personImage', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add bullet point
  const handleAddBullet = () => {
    if (!newBulletText.trim()) return;
    setSettings(prev => ({
      ...prev,
      bulletPoints: [...prev.bulletPoints, newBulletText.trim()]
    }));
    setNewBulletText('');
  };

  // Remove bullet point
  const handleRemoveBullet = (index: number) => {
    setSettings(prev => ({
      ...prev,
      bulletPoints: prev.bulletPoints.filter((_, i) => i !== index)
    }));
  };

  // Update bullet point
  const handleUpdateBullet = (index: number, val: string) => {
    setSettings(prev => {
      const updated = [...prev.bulletPoints];
      updated[index] = val;
      return { ...prev, bulletPoints: updated };
    });
  };

  // Save changes
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      saveDisclaimerPopup(settings);
      setIsSaving(false);
      setNotification({
        type: 'success',
        message: 'Disclaimer Popup settings published live! Website visitors will see this updated warning.'
      });
      setTimeout(() => setNotification(null), 4500);
    }, 300);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Reset Disclaimer Popup back to official Modernminds default warning message?')) {
      const def = resetDisclaimerPopup();
      setSettings(def);
      setNotification({
        type: 'info',
        message: 'Disclaimer Popup content restored to default Islamabad Head Office warning notice.'
      });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 text-left">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center shadow-md shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">
                  Public Disclaimer & Fraud Warning Popup
                </h2>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  settings.isEnabled ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {settings.isEnabled ? 'Active on Website Load' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage the public caution modal that displays when visitors load the website, alerting them against unauthorized impostors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#074592]/10 hover:bg-[#074592]/20 text-[#074592] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#074592]/20"
              title="Test how visitors see this disclaimer popup"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Popup</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Reset to default Islamabad Head Office warning notice"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Status Notification Toast */}
        {notification && (
          <div className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
            notification.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
              : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}>
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification.message}</span>
          </div>
        )}

        {/* Main Configuration Form */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Visibility & Behavior */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              1. Popup Visibility & Severity Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Enable / Disable Toggle */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-slate-900">Show on Website Load</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Automatically display warning when user lands on site</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-3">
                  <input
                    type="checkbox"
                    checked={settings.isEnabled}
                    onChange={(e) => handleFieldChange('isEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              {/* Repetition behavior */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-slate-900">Display Repetition</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Show every page load or once per browsing session</p>
                </div>
                <select
                  value={settings.showOnEveryVisit ? 'every' : 'session'}
                  onChange={(e) => handleFieldChange('showOnEveryVisit', e.target.value === 'every')}
                  className="px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="every">Every Visit</option>
                  <option value="session">Once Per Session</option>
                </select>
              </div>

              {/* Warning Level */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-slate-900">Alert Visual Theme</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Color palette and urgency styling</p>
                </div>
                <select
                  value={settings.warningLevel}
                  onChange={(e) => handleFieldChange('warningLevel', e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="critical">Critical (Emergency Red)</option>
                  <option value="alert">Alert (Caution Amber)</option>
                  <option value="notice">Notice (Brand Navy)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Header Copy & Badges */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#074592]" />
              2. Headline, Badges & Advisory Subtitle
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={settings.badgeText}
                  onChange={(e) => handleFieldChange('badgeText', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="e.g. PUBLIC NOTICE & FRAUD WARNING"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Main Modal Heading / Title
                </label>
                <input
                  type="text"
                  value={settings.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none font-bold"
                  placeholder="e.g. Important Disclaimer: Beware of Unauthorized Agents & Fraudulent Impersonators"
                />
              </div>

              <div className="col-span-1 md:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Advisory Subtitle Banner
                </label>
                <input
                  type="text"
                  value={settings.subtitle}
                  onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="e.g. Modernminds Consulting Services (Pvt) Ltd Official Public Advisory Notice"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Person's Image & Impersonator Identity */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-red-600" />
              3. Person's Image & Reported Details (Upload Person's Image)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Image Preview & Upload Controls (5 cols) */}
              <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <p className="text-xs font-black text-slate-800">Person's Photograph / Evidence</p>
                
                {settings.personImage ? (
                  <div className="relative rounded-lg overflow-hidden border-2 border-red-300 bg-slate-200 aspect-3/4 max-h-[220px] flex items-center justify-center">
                    <img 
                      src={settings.personImage} 
                      alt="Person of concern" 
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      Caution Photo
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-white flex flex-col items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
                    <p className="text-xs font-bold text-slate-700">No person photo selected</p>
                    <p className="text-[10px] text-slate-400 mt-1">Upload a photo of the reported individual</p>
                  </div>
                )}

                {/* Upload from file button */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#074592] hover:bg-[#05336e] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                  </button>

                  {settings.personImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Or Image URL Input */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Or Enter Image URL:
                  </label>
                  <input
                    type="url"
                    value={settings.personImage || ''}
                    onChange={(e) => handleFieldChange('personImage', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Person Identity Fields (7 cols) */}
              <div className="md:col-span-7 space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Person Name / Identification
                  </label>
                  <input
                    type="text"
                    value={settings.personName}
                    onChange={(e) => handleFieldChange('personName', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none font-bold"
                    placeholder="e.g. Muhammad Tariq / Reported Unauthorized Impersonator"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Reported Role / False Claim Description
                  </label>
                  <input
                    type="text"
                    value={settings.personRoleOrAlias}
                    onChange={(e) => handleFieldChange('personRoleOrAlias', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="e.g. Operating illegally with forged letterhead and demanding unverified cash"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    CNIC / Alert Details / Known Contact Numbers
                  </label>
                  <textarea
                    rows={2}
                    value={settings.personCnicOrDetails || ''}
                    onChange={(e) => handleFieldChange('personCnicOrDetails', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="e.g. Reported operating around Rawalpindi / Lahore; claims to provide quick Poland visas. Never make payments to this person."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Warning Message Text & Bullet Points */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              4. Detailed Warning Statement & Protection Directives
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Main Warning Statement Paragraph
              </label>
              <textarea
                rows={4}
                value={settings.warningMessage}
                onChange={(e) => handleFieldChange('warningMessage', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none leading-relaxed"
                placeholder="Write the full warning advisory clarifying that MCS does not authorize this individual..."
              />
            </div>

            {/* Bullet Points Management */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-800">
                Key Client Protection Bullet Points:
              </label>

              <div className="space-y-2">
                {settings.bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleUpdateBullet(index, e.target.value)}
                      className="flex-1 px-2 py-1 text-xs bg-white border border-slate-200 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(index)}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete bullet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Bullet Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newBulletText}
                  onChange={(e) => setNewBulletText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddBullet();
                    }
                  }}
                  placeholder="Add another warning directive (e.g. Always demand official printed receipt)..."
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddBullet}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Point</span>
                </button>
              </div>
            </div>

            {/* Official Legal Notice */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                SECP Registration & Legal Disclaimer Footer Note
              </label>
              <textarea
                rows={2}
                value={settings.officialNotice}
                onChange={(e) => handleFieldChange('officialNotice', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none italic text-slate-600"
                placeholder="SECP Registration disclaimer, liability waiver..."
              />
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-[#074592]" />
              <span>
                Changes take effect immediately upon saving and display to all website visitors on load.
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-slate-600" />
                <span>Test / Preview</span>
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 sm:flex-none px-7 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Publishing Notice...' : 'Save & Publish Disclaimer'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Live Preview Modal */}
        <DisclaimerModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          previewSettings={settings}
          isPreview={true}
        />

      </div>
    </div>
  );
};
