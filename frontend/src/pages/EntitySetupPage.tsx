import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Palette,
  Eye,
  CheckCircle2,
  Sparkles,
  Upload,
  Plus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Landmark,
  Compass,
  Check,
  Crown,
  Leaf,
  Layers,
  Award,
} from 'lucide-react';
import { toast } from 'sonner';
import { OrganizationLogo } from '../components/common/OrganizationLogo';

const COLOR_THEMES = [
  { id: 'blue', name: 'Executive Navy', hex: '#1e40af', bg: 'bg-blue-600', border: 'border-blue-600', ring: 'ring-blue-500' },
  { id: 'emerald', name: 'Oasis Emerald', hex: '#059669', bg: 'bg-emerald-600', border: 'border-emerald-600', ring: 'ring-emerald-500' },
  { id: 'indigo', name: 'Royal Indigo', hex: '#4338ca', bg: 'bg-indigo-600', border: 'border-indigo-600', ring: 'ring-indigo-500' },
  { id: 'teal', name: 'Coastal Teal', hex: '#0f766e', bg: 'bg-teal-600', border: 'border-teal-600', ring: 'ring-teal-500' },
  { id: 'amber', name: 'Desert Amber', hex: '#d97706', bg: 'bg-amber-600', border: 'border-amber-600', ring: 'ring-amber-500' },
];

const PRESET_LOGOS = [
  {
    id: 'ahda-emblem',
    name: 'AHDA Development Emblem',
    nameAr: 'شعار هيئة تطوير الأحساء الرسمي',
    icon: Landmark,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    id: 'oasis-palm',
    name: 'Green Oasis Heritage Palm',
    nameAr: 'شعار النخلة التراثية والواحة',
    icon: Leaf,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    id: 'royal-crest',
    name: 'Sovereign Royal Crest',
    nameAr: 'الشعار السيادي الملكي',
    icon: Crown,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    id: 'modern-shield',
    name: 'Modern Executive Shield',
    nameAr: 'شعار الدرع التنفيذي الحديث',
    icon: ShieldCheck,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
];

export const EntitySetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { organization, updateOrganization, lang, setDemoJourneyStep } = useApp();

  const [name, setName] = useState(organization.name);
  const [nameAr, setNameAr] = useState(organization.nameAr || 'هيئة تطوير الأحساء');
  const [shortName, setShortName] = useState(organization.shortName);
  const [logo, setLogo] = useState(organization.logo || 'ahda-emblem');
  const [logoUrl, setLogoUrl] = useState(organization.logoUrl || '');
  const [themeColor, setThemeColor] = useState(organization.themeColor || 'blue');
  const [vision, setVision] = useState(organization.vision);
  const [visionAr, setVisionAr] = useState(organization.visionAr || 'رؤية: رائد في التنمية المستدامة في الأحساء');
  const [mission, setMission] = useState(organization.mission);
  const [missionAr, setMissionAr] = useState(
    organization.missionAr || 'قيادة التنمية المكانية والاجتماعية والاقتصادية المستدامة عبر واحة الأحساء والمراكز الحضرية.'
  );
  const [values, setValues] = useState<string[]>(organization.values || []);
  const [newValue, setNewValue] = useState('');
  const [boardChair, setBoardChair] = useState(organization.boardChair);
  const [ceo, setCeo] = useState(organization.ceo);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(lang === 'ar' ? 'حجم الملف يتجاوز 5 ميجابايت' : 'File size exceeds 5MB limit');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoUrl(result);
        toast.success(lang === 'ar' ? 'تم رفع الشعار المخصص بنجاح!' : 'Custom logo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearCustomLogo = () => {
    setLogoUrl('');
    toast.info(lang === 'ar' ? 'تم الرجوع إلى الشعارات الرسمية المعتمدة' : 'Reverted to preset official emblems');
  };

  const handleAddValue = () => {
    if (newValue.trim() && !values.includes(newValue.trim())) {
      setValues([...values, newValue.trim()]);
      setNewValue('');
    }
  };

  const handleRemoveValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrganization({
      name,
      nameAr,
      shortName,
      logo,
      logoUrl,
      themeColor,
      vision,
      visionAr,
      mission,
      missionAr,
      values,
      boardChair,
      ceo,
    });
  };

  const handleContinue = () => {
    updateOrganization({
      name,
      nameAr,
      shortName,
      logo,
      logoUrl,
      themeColor,
      vision,
      visionAr,
      mission,
      missionAr,
      values,
      boardChair,
      ceo,
    });
    setDemoJourneyStep(2);
    navigate('/org-structure');
  };

  const selectedTheme = COLOR_THEMES.find((c) => c.id === themeColor) || COLOR_THEMES[0]!;
  const selectedLogoObj = PRESET_LOGOS.find((l) => l.id === logo) || PRESET_LOGOS[0]!;
  const LogoIcon = selectedLogoObj.icon;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
            <span className="font-bold uppercase">
              {lang === 'ar' ? 'المرحلة 1 • مسار الاستراتيجية' : 'STEP 1 • STRATEGY JOURNEY'}
            </span>
            <span className="text-slate-300">/</span>
            <span>{lang === 'ar' ? 'إعداد وهوية المنظومة' : 'Entity Identity & Branding'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'إعداد المنظومة وتخصيص الهوية والميثاق' : 'Entity Setup & White-Label Customization'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'تخصيص الهوية المؤسسية الكاملة للهيئة: الشعار، الألوان، الرؤية، الرسالة، والقيم الاستراتيجية.'
              : 'Configure full corporate identity: Official branding, emblem, palette, vision, mission, and core values.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>{lang === 'ar' ? 'المتابعة: الهيكل التنظيمي والصلاحيات' : 'Next: Hierarchy & Permissions'}</span>
            <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180 mr-1' : 'ml-1'}`} />
          </button>
        </div>
      </div>

      {/* Main Grid: Form (7 cols) + Live Charter Preview (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Settings */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* Section 1: Entity Name & Acronym */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Building2 className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'ar' ? 'بيانات المنظومة والاسم الرسمي' : 'Official Entity Identity'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {lang === 'ar' ? 'الاسم باللغتين العربية والإنجليزية والرمز المختصر' : 'Bilingual corporate name and acronym'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المنظومة (بالإنجليزية)' : 'Organization Name (English)'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المنظومة (بالعربية)' : 'Organization Name (Arabic)'}
                </label>
                <input
                  type="text"
                  required
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  dir="rtl"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الرمز المختصر للمنظومة' : 'Entity Short Code / Acronym'}
                </label>
                <input
                  type="text"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الرئيس التنفيذي' : 'Chief Executive Officer'}
                </label>
                <input
                  type="text"
                  value={ceo}
                  onChange={(e) => setCeo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Logo and Brand Color Palette */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Palette className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'ar' ? 'الشعار وهوية الألوان المؤسسية' : 'Corporate Emblem & Brand Palette'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {lang === 'ar' ? 'اختيار رمز الشعار ولون السمة المعتمد للمنصة' : 'Theme accent and executive emblem styling'}
                </p>
              </div>
            </div>

            {/* Logo Options */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700">
                  {lang === 'ar' ? 'اختر رمز شعار المنظومة (الشعارات الرسمية المعتمدة)' : 'Official Emblems & Vector Presets'}
                </label>
                {logoUrl && (
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {lang === 'ar' ? 'الشعار المخصص نشط حالياً' : 'Custom Uploaded Logo Active'}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESET_LOGOS.map((l) => {
                  const isSelected = logo === l.id && !logoUrl;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        setLogo(l.id);
                        setLogoUrl('');
                        toast.success(lang === 'ar' ? `تم اختيار ${l.nameAr}` : `Selected ${l.name}`);
                      }}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center p-1 bg-white border border-slate-200 shadow-2xs">
                        <OrganizationLogo logoId={l.id} size="sm" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-800 line-clamp-1">
                        {lang === 'ar' ? l.nameAr : l.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Logo File Upload Dropzone */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {lang === 'ar' ? 'رفع شعار مخصص للمنظومة (PNG, SVG, JPG)' : 'Upload Custom Organization Logo File'}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {lang === 'ar'
                        ? 'يمكنك رفع شعار الهيئة الرسمي وتطبيقه فوراً على كامل المنصة والمستندات'
                        : 'Upload high-resolution official emblem to brand the entire suite and reports'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'اختر ملف الشعار' : 'Choose Logo File'}</span>
                    <input
                      type="file"
                      accept="image/png,image/svg+xml,image/jpeg,image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>

                  {logoUrl && (
                    <button
                      type="button"
                      onClick={handleClearCustomLogo}
                      className="px-2.5 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                    >
                      {lang === 'ar' ? 'إزالة' : 'Clear'}
                    </button>
                  )}
                </div>
              </div>

              {logoUrl && (
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={logoUrl} alt="Custom Logo Preview" className="w-10 h-10 object-contain rounded-lg p-0.5 border border-slate-200" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{lang === 'ar' ? 'الشعار المخصص الحالي' : 'Active Custom Logo'}</div>
                      <div className="text-[10px] text-emerald-600 font-mono">✓ {lang === 'ar' ? 'مطبق على رأس القائمة والتقارير' : 'Applied to navigation and PDF dossiers'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Brand Color Theme Palette */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                {lang === 'ar' ? 'لون تمييز المنظومة الرئيسي' : 'Primary Executive Accent Palette'}
              </label>
              <div className="flex flex-wrap gap-3">
                {COLOR_THEMES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setThemeColor(c.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      themeColor === c.id
                        ? `${c.border} bg-slate-900 text-white shadow-xs`
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${c.bg}`} />
                    <span>{c.name}</span>
                    {themeColor === c.id && <Check className="w-3.5 h-3.5 text-white ml-1" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Vision, Mission & Core Strategic Values */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Compass className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'ar' ? 'الرؤية والرسالة والقيم الاستراتيجية' : 'Strategic Vision, Mission & Values'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {lang === 'ar'
                    ? 'الميثاق التأسيسي الذي يمثل قمة هرم المواءمة الاستراتيجية (الرؤية ← الرسالة ← الركائز)'
                    : 'The institutional charter forming the pinnacle of strategic cascading'}
                </p>
              </div>
            </div>

            {/* Vision Statement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'نص الرؤية (بالإنجليزية)' : 'Vision Statement (English)'}
                </label>
                <textarea
                  rows={2}
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'نص الرؤية (بالعربية)' : 'Vision Statement (Arabic)'}
                </label>
                <textarea
                  rows={2}
                  value={visionAr}
                  onChange={(e) => setVisionAr(e.target.value)}
                  dir="rtl"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-right"
                />
              </div>
            </div>

            {/* Mission Statement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'نص الرسالة (بالإنجليزية)' : 'Mission Statement (English)'}
                </label>
                <textarea
                  rows={2}
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'نص الرسالة (بالعربية)' : 'Mission Statement (Arabic)'}
                </label>
                <textarea
                  rows={2}
                  value={missionAr}
                  onChange={(e) => setMissionAr(e.target.value)}
                  dir="rtl"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-right"
                />
              </div>
            </div>

            {/* Core Values */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {lang === 'ar' ? 'القيم المؤسسية الاستراتيجية' : 'Core Strategic Values'}
              </label>

              <div className="flex flex-wrap gap-2 mb-3">
                {values.map((val, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    <span>{val}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveValue(idx)}
                      className="text-emerald-500 hover:text-emerald-800 cursor-pointer"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder={lang === 'ar' ? 'إضافة قيمة جديدة (مثال: الاستدامة، الابتكار)...' : 'Add new value (e.g. Agility, Innovation)...'}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddValue();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddValue}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إضافة' : 'Add'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Live Charter & Letterhead Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {lang === 'ar' ? 'معاينة الميثاق المؤسسي المعتمد' : 'Official Charter Preview'}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                {lang === 'ar' ? 'حي ومحدث' : 'Live Preview'}
              </span>
            </div>

            {/* Branded Official Certificate / Charter Card */}
            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 space-y-4 text-xs shadow-2xs">
              {/* Emblem Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200 bg-white shadow-xs p-1">
                    <OrganizationLogo logoId={logo} logoUrl={logoUrl} size="md" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-tight">
                      {lang === 'ar' ? nameAr : name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">
                      {shortName} • KINGDOM OF SAUDI ARABIA
                    </span>
                  </div>
                </div>

                <span className={`w-4 h-4 rounded-full ${selectedTheme.bg} shadow-xs ring-2 ring-white`} />
              </div>

              {/* Vision Box */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الرؤية المؤسسية' : 'Institutional Vision'}</span>
                </div>
                <p className="text-[11px] text-slate-700 italic leading-relaxed">
                  "{lang === 'ar' ? visionAr : vision}"
                </p>
              </div>

              {/* Mission Box */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-[11px]">
                  <Award className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الرسالة الاستراتيجية' : 'Strategic Mission'}</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {lang === 'ar' ? missionAr : mission}
                </p>
              </div>

              {/* Values List */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                  {lang === 'ar' ? 'القيم المؤسسية الخمس:' : 'Core Institutional Values:'}
                </span>
                <div className="flex flex-wrap gap-1">
                  {values.map((v, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Leadership Signatures */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <div>
                  <span className="block text-slate-400">Board Chairman:</span>
                  <span className="font-semibold text-slate-800">{boardChair}</span>
                </div>
                <div className="text-right">
                  <span className="block text-slate-400">Executive CEO:</span>
                  <span className="font-semibold text-slate-800">{ceo}</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleContinue}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center space-x-2 cursor-pointer transition-all"
            >
              <span>{lang === 'ar' ? 'اعتماد الهوية والانتقال للمرحلة 2: الهيكل والأدوار' : 'Apply Branding & Proceed to Step 2: Org Structure & Roles'}</span>
              <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180 mr-1' : 'ml-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
