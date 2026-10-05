import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Target,
  ArrowLeft,
  Sparkles,
  Layers,
  BarChart3,
  Calendar,
  DollarSign,
  User,
  Building,
  CheckCircle2,
  TrendingUp,
  Clock,
  Plus,
  RefreshCw,
  Calculator,
  FolderGit2,
  Milestone,
  Check,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  ExternalLink,
  ListTree,
  Filter,
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { toast } from 'sonner';

interface PresetItem {
  name: string;
  nameAr?: string;
  badge: string;
  badgeAr?: string;
  themeId: string;
  goalId: string;
  objId: string;
  kpiCode: string;
  initId: string;
  keyProject: string;
  keyProjectAr?: string;
}

const PRESETS: PresetItem[] = [
  {
    name: '🌴 2.1.1 Event Visitor Indicator',
    nameAr: '🌴 2.1.1 مؤشر زوار الفعاليات',
    badge: 'Initiative 6',
    badgeAr: 'المبادرة 6',
    themeId: 'st-people',
    goalId: 'sg-people-1',
    objId: 'so-2-1',
    kpiCode: '2.1.1',
    initId: 'init-aha-1',
    keyProject: 'Al-Ahsa Strategy Awareness Project',
    keyProjectAr: 'مشروع التوعية باستراتيجية تطوير الأحساء',
  },
  {
    name: '📱 2.1.2 Digital Engagement Index',
    nameAr: '📱 2.1.2 مؤشر التفاعل الرقمي',
    badge: 'Initiative 7',
    badgeAr: 'المبادرة 7',
    themeId: 'st-people',
    goalId: 'sg-people-1',
    objId: 'so-2-1',
    kpiCode: '2.1.2',
    initId: 'init-aha-2',
    keyProject: 'Digital Platforms and Technical Integration for Community Engagement',
    keyProjectAr: 'المنصات الرقمية والتكامل التقني للمشاركة المجتمعية',
  },
  {
    name: '🗳️ 2.1.3 Awareness of Al-Ahsa Strategy',
    nameAr: '🗳️ 2.1.3 مؤشر الوعي باستراتيجية الأحساء',
    badge: 'Initiative 6',
    badgeAr: 'المبادرة 6',
    themeId: 'st-people',
    goalId: 'sg-people-1',
    objId: 'so-2-1',
    kpiCode: '2.1.3',
    initId: 'init-aha-1',
    keyProject: 'Al-Ahsa Strategy Awareness Project',
    keyProjectAr: 'مشروع التوعية باستراتيجية تطوير الأحساء',
  },
  {
    name: '🎪 2.1.4 Number of Festival / Show Days',
    nameAr: '🎪 2.1.4 عدد أيام إقامة المهرجانات',
    badge: 'Initiative 7',
    badgeAr: 'المبادرة 7',
    themeId: 'st-people',
    goalId: 'sg-people-1',
    objId: 'so-2-1',
    kpiCode: '2.1.4',
    initId: 'init-aha-2',
    keyProject: 'Community Empowerment, Events and Impact Project',
    keyProjectAr: 'مشروع التمكين المجتمعي والفعاليات والأثر',
  },
  {
    name: "🏡 2.2.1 Residents' Satisfaction Index",
    nameAr: '🏡 2.2.1 مؤشر رضا السكان',
    badge: 'Initiative 8',
    badgeAr: 'المبادرة 8',
    themeId: 'st-people',
    goalId: 'sg-people-2',
    objId: 'so-2-2',
    kpiCode: '2.2.1',
    initId: 'init-aha-3',
    keyProject: 'Quality of Life & Oasis Civic Satisfaction Project',
    keyProjectAr: 'مشروع قياس جودة الحياة ورضا سكان الواحة',
  },
  {
    name: '🌾 2.2.2 Urban Quality of Life Score',
    nameAr: '🌾 2.2.2 نقاط جودة الحياة الحضرية',
    badge: 'Initiative 8',
    badgeAr: 'المبادرة 8',
    themeId: 'st-people',
    goalId: 'sg-people-2',
    objId: 'so-2-2',
    kpiCode: '2.2.2',
    initId: 'init-aha-3',
    keyProject: 'Regional Heritage and Urban Landscape Activation',
    keyProjectAr: 'تطوير المشهد الحضري والخدمات البلدية المتكاملة',
  },
];

interface MultiSelectDropdownProps {
  label: string;
  sublabel: string;
  items: {
    id: string;
    code: string;
    title: string;
    titleAr?: string | undefined;
    description?: string | undefined;
    badge?: string | undefined;
    extra?: string | undefined;
  }[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  accentColor: 'teal' | 'indigo' | 'emerald' | 'amber' | 'blue';
  placeholder: string;
  lang: string;
  manageLink?: { to: string; text: string } | undefined;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  sublabel,
  items,
  selectedIds,
  onChange,
  accentColor,
  placeholder,
  lang,
  manageLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        (item.titleAr && item.titleAr.toLowerCase().includes(q)) ||
        (item.extra && item.extra.toLowerCase().includes(q))
    );
  }, [items, search]);

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    const allFilteredIds = filteredItems.map((i) => i.id);
    const combined = Array.from(new Set([...selectedIds, ...allFilteredIds]));
    onChange(combined);
  };

  const clearAll = () => {
    onChange([]);
  };

  // Color mappings
  const colorStyles = {
    teal: {
      badge: 'bg-teal-50 text-teal-700 border-teal-200',
      activeBorder: 'border-teal-500 ring-teal-500',
      checkbox: 'text-teal-600 focus:ring-teal-500',
      tagBg: 'bg-teal-50 text-teal-800 border-teal-200',
      btn: 'text-teal-700 hover:bg-teal-50',
    },
    indigo: {
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      activeBorder: 'border-indigo-500 ring-indigo-500',
      checkbox: 'text-indigo-600 focus:ring-indigo-500',
      tagBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      btn: 'text-indigo-700 hover:bg-indigo-50',
    },
    emerald: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeBorder: 'border-emerald-500 ring-emerald-500',
      checkbox: 'text-emerald-600 focus:ring-emerald-500',
      tagBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      btn: 'text-emerald-700 hover:bg-emerald-50',
    },
    amber: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      activeBorder: 'border-amber-500 ring-amber-500',
      checkbox: 'text-amber-600 focus:ring-amber-500',
      tagBg: 'bg-amber-50 text-amber-800 border-amber-200',
      btn: 'text-amber-700 hover:bg-amber-50',
    },
    blue: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
      activeBorder: 'border-blue-500 ring-blue-500',
      checkbox: 'text-blue-600 focus:ring-blue-500',
      tagBg: 'bg-blue-50 text-blue-800 border-blue-200',
      btn: 'text-blue-700 hover:bg-blue-50',
    },
  }[accentColor];

  return (
    <div className="space-y-2.5" ref={dropdownRef}>
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold text-slate-800">{label}</label>
          <p className="text-[11px] text-slate-500">{sublabel}</p>
        </div>
        <div className="flex items-center gap-2">
          {manageLink && (
            <Link
              to={manageLink.to}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              <span>{manageLink.text}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${colorStyles.badge}`}>
            {selectedIds.length} {lang === 'ar' ? 'محدد' : 'Selected'}
          </span>
        </div>
      </div>

      {/* Dropdown Trigger Box */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white border rounded-xl text-start text-xs font-medium text-slate-800 flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
            isOpen ? `${colorStyles.activeBorder} bg-white ring-2 ring-opacity-20` : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-slate-700">
              {selectedIds.length === 0
                ? placeholder
                : lang === 'ar'
                ? `تم اختيار (${selectedIds.length}) من (${items.length})`
                : `(${selectedIds.length}) of (${items.length}) items selected`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Dropdown Menu Popover */}
        {isOpen && (
          <div className="absolute z-30 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Search and Action Bar */}
            <div className="p-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={lang === 'ar' ? 'بحث سريع بالرمز أو العنوان...' : 'Search by code or title...'}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={selectAll}
                  className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${colorStyles.btn}`}
                >
                  {lang === 'ar' ? 'تحديد الكل' : 'Select All'}
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-2 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Clear'}
                </button>
              </div>
            </div>

            {/* List of Selectable Items */}
            <div className="max-h-64 overflow-y-auto p-1.5 space-y-1 divide-y divide-slate-50">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  {lang === 'ar' ? 'لا توجد عناصر مطابقة للبحث' : 'No items match your search filter'}
                </div>
              ) : (
                filteredItems.map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-2 rounded-xl flex items-start gap-2.5 transition-colors cursor-pointer text-xs ${
                        isChecked ? 'bg-blue-50/60 text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="pt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] shrink-0">
                            {item.code}
                          </span>
                          <span className="font-semibold text-slate-900 truncate">
                            {lang === 'ar' ? item.titleAr || item.title : item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                        )}
                        {item.extra && <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.extra}</div>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Items Tags / Pills */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {selectedIds.map((id) => {
            const item = items.find((i) => i.id === id);
            if (!item) return null;
            return (
              <span
                key={id}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border shadow-2xs ${colorStyles.tagBg}`}
              >
                <span className="font-mono font-bold text-[10px]">{item.code}</span>
                <span className="max-w-[180px] sm:max-w-[240px] truncate">
                  {lang === 'ar' ? item.titleAr || item.title : item.title}
                </span>
                <button
                  type="button"
                  onClick={() => toggleItem(id)}
                  className="hover:opacity-75 rounded-full p-0.5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title={lang === 'ar' ? 'إزالة' : 'Remove'}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const CreateStrategyPage: React.FC = () => {
  const navigate = useNavigate();
  const { themes, goals, objectives, kpis, initiatives, cascadeStrategy, currentUser, lang } = useApp();

  // Primary Strategic Pillar (Theme)
  const defaultTheme = themes.find((t) => t.code === '02') || themes[0];
  const [selectedThemeId, setSelectedThemeId] = useState<string>(defaultTheme?.id || '');

  // Filter goals that match the selected theme, but allow selecting any
  const [onlyShowThemeGoals, setOnlyShowThemeGoals] = useState(false);

  // Multi-Select States for entities
  const [selectedGoalIds, setSelectedGoalIds] = useState<string[]>(() => {
    const defaultGoal = goals.find((g) => g.themeId === selectedThemeId) || goals[0];
    return defaultGoal ? [defaultGoal.id] : [];
  });

  const [selectedObjectiveIds, setSelectedObjectiveIds] = useState<string[]>(() => {
    const defaultObj = objectives.find((o) => o.themeId === selectedThemeId) || objectives[0];
    return defaultObj ? [defaultObj.id] : [];
  });

  const [selectedKpiIds, setSelectedKpiIds] = useState<string[]>(() => {
    const defaultKpi = kpis.find((k) => k.pillarCode === '02' || k.code.startsWith('2.')) || kpis[0];
    return defaultKpi ? [defaultKpi.id] : [];
  });

  const [selectedInitiativeIds, setSelectedInitiativeIds] = useState<string[]>(() => {
    const defaultInit = initiatives.find((i) => i.code === 'INIT-6') || initiatives[0];
    return defaultInit ? [defaultInit.id] : [];
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resolve currently selected theme object
  const currentTheme = themes.find((t) => t.id === selectedThemeId) || defaultTheme;

  // Sync selected goals when pillar changes if no goals selected
  const handlePillarChange = (themeId: string) => {
    setSelectedThemeId(themeId);
    const themeGoals = goals.filter((g) => g.themeId === themeId);
    if (themeGoals.length > 0) {
      setSelectedGoalIds(themeGoals.map((g) => g.id));
    }
    const themeObjectives = objectives.filter((o) => o.themeId === themeId);
    if (themeObjectives.length > 0) {
      setSelectedObjectiveIds(themeObjectives.map((o) => o.id));
    }
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThemeId) {
      toast.error(lang === 'ar' ? 'الرجاء اختيار الركيزة الاستراتيجية' : 'Please select a Strategic Pillar');
      return;
    }

    if (
      selectedGoalIds.length === 0 &&
      selectedObjectiveIds.length === 0 &&
      selectedKpiIds.length === 0 &&
      selectedInitiativeIds.length === 0
    ) {
      toast.error(
        lang === 'ar'
          ? 'الرجاء اختيار عنصر واحد على الأقل للمواءمة'
          : 'Please select at least one entity to cascade'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      cascadeStrategy({
        themeId: selectedThemeId,
        goalIds: selectedGoalIds,
        objectiveIds: selectedObjectiveIds,
        kpiIds: selectedKpiIds,
        initiativeIds: selectedInitiativeIds,
      });

      // Redirect back to strategy view
      navigate('/strategy');
    } catch (err) {
      console.error('Error cascading strategy:', err);
      toast.error(lang === 'ar' ? 'حدث خطأ أثناء حفظ المواءمة' : 'Failed to save strategy cascade');
      setIsSubmitting(false);
    }
  };

  // Apply benchmark preset
  const applyPreset = (preset: PresetItem) => {
    setSelectedThemeId(preset.themeId);
    setSelectedGoalIds([preset.goalId]);
    setSelectedObjectiveIds([preset.objId]);

    const matchingKpi = kpis.find((k) => k.code === preset.kpiCode);
    if (matchingKpi) {
      setSelectedKpiIds([matchingKpi.id]);
    }

    const matchingInit = initiatives.find((i) => i.id === preset.initId || i.code.includes(preset.badge));
    if (matchingInit) {
      setSelectedInitiativeIds([matchingInit.id]);
    } else {
      setSelectedInitiativeIds([preset.initId]);
    }

    toast.success(
      lang === 'ar' ? `تم تحميل النموذج: ${preset.nameAr || preset.name}` : `Loaded benchmark: ${preset.name}`
    );
  };

  // Aggregated data for preview
  const selectedGoals = goals.filter((g) => selectedGoalIds.includes(g.id));
  const selectedObjectives = objectives.filter((o) => selectedObjectiveIds.includes(o.id));
  const selectedKPIs = kpis.filter((k) => selectedKpiIds.includes(k.id));
  const selectedInits = initiatives.filter((i) => selectedInitiativeIds.includes(i.id));

  const totalBudget = selectedInits.reduce((sum, i) => sum + (i.budgetSAR || 0), 0);
  const avgProgress =
    selectedObjectives.length > 0
      ? Math.round(selectedObjectives.reduce((sum, o) => sum + (o.progress || 0), 0) / selectedObjectives.length)
      : 0;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
            <Link
              to="/strategy"
              className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180 ml-0.5' : 'mr-0.5'}`} />
              <span>{lang === 'ar' ? 'مصفوفة الاستراتيجية' : 'Strategy Matrix'}</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-bold uppercase">
              {lang === 'ar' ? 'صياغة المواءمة الاستراتيجية المتعددة' : 'Multi-Entity Cascade Formulation'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'صياغة الأداء والمواءمة الاستراتيجية' : 'Strategic Cascade & Entity Alignment'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            {lang === 'ar'
              ? 'اختر الركيزة الاستراتيجية ثم حدد أهدافاً ومستهدفات ومؤشرات ومبادرات متعددة من السجلات لربطها في مصفوفة مواءمة استراتيجية متكاملة.'
              : 'Select a Strategic Pillar, then pick multiple Strategic Goals, Objectives, KPIs, and Initiatives from the registers to bind them into an aligned strategy cascade.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/strategy"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>
              {isSubmitting
                ? lang === 'ar'
                  ? 'جاري الاعتماد...'
                  : 'Cascading...'
                : lang === 'ar'
                ? 'حفظ ومواءمة الاستراتيجية'
                : 'Save & Cascade Strategy'}
            </span>
          </button>
        </div>
      </div>

      {/* Preset Strategy Templates Banner (from AHDA Diagram) */}
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 p-4 rounded-2xl border border-blue-100 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>
              {lang === 'ar'
                ? 'نماذج استراتيجية هيئة تطوير الأحساء المعتمدة (انقر للتحميل الفوري للمواءمة)'
                : 'AHDA Strategic Model Benchmarks (Click to auto-populate multi-entity cascade)'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-blue-600">
            {lang === 'ar' ? '6 مؤشرات ومبادرات معتمدة' : '6 Verified Benchmark Cascades'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="p-2.5 bg-white/90 hover:bg-white border border-blue-200/70 hover:border-blue-400 rounded-xl text-start text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
            >
              <div className="flex items-center justify-between font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                <span className="truncate">{lang === 'ar' ? p.nameAr || p.name : p.name}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 shrink-0 mx-1">
                  {lang === 'ar' ? p.badgeAr || p.badge : p.badge}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                {lang === 'ar' ? p.keyProjectAr || p.keyProject : p.keyProject}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form (7 cols) + Live Preview (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Area */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Card 1: Strategic Pillar / Theme Dropdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'الركيزة الاستراتيجية (المحور)' : 'Strategic Pillar (Theme)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'اختر الركيزة الاستراتيجية المعتمدة للمواءمة'
                      : 'Choose the primary organizational pillar from the register'}
                  </p>
                </div>
              </div>

              <Link
                to="/hierarchy-tree"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <span>{lang === 'ar' ? 'شجرة المحاور ↗' : 'Hierarchy Tree ↗'}</span>
              </Link>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اختر الركيزة الاستراتيجية' : 'Select Strategic Pillar'}
                </label>
                <select
                  value={selectedThemeId}
                  onChange={(e) => handlePillarChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer shadow-2xs"
                >
                  {themes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.code} — {lang === 'ar' ? t.titleAr || t.title : t.title} ({t.weight}%{' '}
                      {lang === 'ar' ? 'وزن' : 'weight'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Pillar Summary Badge */}
              {currentTheme && (
                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/60 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white text-[11px]">
                        {currentTheme.code}
                      </span>
                      <span className="font-bold text-slate-900">
                        {lang === 'ar' ? currentTheme.titleAr || currentTheme.title : currentTheme.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{currentTheme.description}</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200 shrink-0">
                    {lang === 'ar' ? `الوزن: ${currentTheme.weight}%` : `Weight: ${currentTheme.weight}%`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Strategic Goals Multi-Select Dropdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'الأهداف الاستراتيجية' : 'Strategic Goals'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'حدد هدفاً أو عدة أهداف استراتيجية للمواءمة مع الركيزة'
                      : 'Select one or multiple strategic goals to cascade'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOnlyShowThemeGoals(!onlyShowThemeGoals)}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                    onlyShowThemeGoals
                      ? 'bg-teal-50 text-teal-700 border-teal-200 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {onlyShowThemeGoals
                    ? lang === 'ar'
                      ? 'أهداف الركيزة فقط'
                      : 'Pillar Goals Only'
                    : lang === 'ar'
                    ? 'عرض جميع الأهداف'
                    : 'All Goals'}
                </button>
              </div>
            </div>

            <MultiSelectDropdown
              label={lang === 'ar' ? 'اختر الأهداف الاستراتيجية من القائمة' : 'Select Strategic Goals'}
              sublabel={
                lang === 'ar'
                  ? 'يمكنك تحديد أهداف متعددة بالنقر على الصناديق'
                  : 'You can check multiple strategic goals from the dropdown'
              }
              items={(onlyShowThemeGoals ? goals.filter((g) => g.themeId === selectedThemeId) : goals).map((g) => {
                const parentTheme = themes.find((t) => t.id === g.themeId);
                return {
                  id: g.id,
                  code: g.code,
                  title: g.title,
                  description: g.description,
                  badge: parentTheme ? `Pillar ${parentTheme.code}` : undefined,
                };
              })}
              selectedIds={selectedGoalIds}
              onChange={setSelectedGoalIds}
              accentColor="teal"
              placeholder={lang === 'ar' ? 'اختر أهدافاً استراتيجية...' : 'Select Strategic Goals...'}
              lang={lang}
              manageLink={{ to: '/hierarchy-tree', text: lang === 'ar' ? 'إدارة الأهداف ↗' : 'Goals Register ↗' }}
            />
          </div>

          {/* Card 3: Strategic Objectives Multi-Select Dropdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'الأهداف التشغيلية التكتيكية (OKR)' : 'Strategic Objectives (OKR Targets)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'حدد مستهدفات تكتيكية فردية من السجل أو تم إنشاؤها مؤخراً'
                      : 'Select multiple tactical objectives created in the Objectives Register'}
                  </p>
                </div>
              </div>

              <Link
                to="/objectives"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <span>{lang === 'ar' ? 'سجل المستهدفات ↗' : 'Objectives Register ↗'}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <MultiSelectDropdown
              label={lang === 'ar' ? 'اختر الأهداف التكتيكية (مستهدفات الإدارات)' : 'Select Strategic Objectives'}
              sublabel={
                lang === 'ar'
                  ? 'تشمل المستهدفات المنشأة فردياً وسجلات الإدارات'
                  : 'Includes individually created objectives and departmental OKRs'
              }
              items={objectives.map((o) => ({
                id: o.id,
                code: o.code,
                title: o.title,
                titleAr: o.titleAr,
                description: `${o.owner} • ${o.department} • FY ${o.targetYear}`,
                badge: `${o.progress}% Progress`,
                extra: `Status: ${o.status}`,
              }))}
              selectedIds={selectedObjectiveIds}
              onChange={setSelectedObjectiveIds}
              accentColor="indigo"
              placeholder={lang === 'ar' ? 'اختر أهدافاً تكتيكية...' : 'Select Strategic Objectives...'}
              lang={lang}
              manageLink={{ to: '/objectives', text: lang === 'ar' ? '+ إنشاء هدف في السجل ↗' : '+ Create in Objectives ↗' }}
            />
          </div>

          {/* Card 4: Key Performance Indicators Multi-Select Dropdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'مؤشرات الأداء الرئيسية (KPIs)' : 'Key Performance Indicators (KPIs)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'اختر مؤشرات الأداء المعتمدة مع معادلاتها ومستهدفاتها القياسية'
                      : 'Select multiple verified KPIs with formulas and baseline/targets'}
                  </p>
                </div>
              </div>

              <Link
                to="/kpis"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-800 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <span>{lang === 'ar' ? 'سجل المؤشرات ↗' : 'KPIs Register ↗'}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <MultiSelectDropdown
              label={lang === 'ar' ? 'اختر مؤشرات الأداء من السجل' : 'Select Key Performance Indicators'}
              sublabel={
                lang === 'ar'
                  ? 'يمكنك ربط مؤشرات متعددة بالمصفوفة دفعة واحدة'
                  : 'You can link multiple indicators into this strategy cascade'
              }
              items={kpis.map((k) => ({
                id: k.id,
                code: k.code,
                title: k.name,
                titleAr: k.nameAr,
                description: k.formula ? `Formula: ${k.formula}` : undefined,
                badge: `${k.actual} / ${k.target} ${k.unit}`,
                extra: `Freq: ${k.frequency} • ${k.status}`,
              }))}
              selectedIds={selectedKpiIds}
              onChange={setSelectedKpiIds}
              accentColor="emerald"
              placeholder={lang === 'ar' ? 'اختر مؤشرات أداء...' : 'Select KPIs...'}
              lang={lang}
              manageLink={{ to: '/kpis', text: lang === 'ar' ? '+ إنشاء مؤشر في السجل ↗' : '+ Create in KPIs ↗' }}
            />
          </div>

          {/* Card 5: Strategic Initiatives Multi-Select Dropdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                  5
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'المبادرات الاستراتيجية والمشاريع' : 'Strategic Initiatives & Programs'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'حدد المبادرات والمشاريع الممولة لتحقيق هذه الأهداف'
                      : 'Select multiple implementation initiatives and funding packages'}
                  </p>
                </div>
              </div>

              <Link
                to="/initiatives"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 hover:text-amber-800 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <span>{lang === 'ar' ? 'سجل المبادرات ↗' : 'Initiatives Register ↗'}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <MultiSelectDropdown
              label={lang === 'ar' ? 'اختر المبادرات الاستراتيجية' : 'Select Strategic Initiatives'}
              sublabel={
                lang === 'ar'
                  ? 'تشمل المبادرات المنشأة فردياً مع ميزانياتها ومحطاتها التنفيذية'
                  : 'Includes all initiatives created individually with budgets and milestones'
              }
              items={initiatives.map((i) => ({
                id: i.id,
                code: i.code,
                title: i.title,
                titleAr: i.titleAr,
                description: i.description,
                badge: `SAR ${(i.budgetSAR / 1000000).toFixed(1)}M`,
                extra: `Owner: ${i.owner} • ${i.milestones?.length || 0} Milestones`,
              }))}
              selectedIds={selectedInitiativeIds}
              onChange={setSelectedInitiativeIds}
              accentColor="amber"
              placeholder={lang === 'ar' ? 'اختر مبادرات استراتيجية...' : 'Select Strategic Initiatives...'}
              lang={lang}
              manageLink={{ to: '/initiatives', text: lang === 'ar' ? '+ إنشاء مبادرة في السجل ↗' : '+ Create in Initiatives ↗' }}
            />
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <Link
              to="/strategy"
              className="px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? lang === 'ar'
                    ? 'جاري الاعتماد...'
                    : 'Cascading...'
                  : lang === 'ar'
                  ? 'حفظ ومواءمة الاستراتيجية'
                  : 'Save & Cascade Strategy'}
              </span>
            </button>
          </div>
        </form>

        {/* Live Interactive Preview (Right Column - 5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {lang === 'ar' ? 'شجرة مواءمة الاستراتيجية للهيئة' : 'AHDA Strategy Cascade Tree'}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {lang === 'ar' ? 'مواءمة متتالية' : 'Cascading Ready'}
              </span>
            </div>

            {/* Strategic Theme Box */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200/70 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded">
                      {currentTheme?.code || '02'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {lang === 'ar' ? currentTheme?.titleAr || currentTheme?.title : currentTheme?.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border bg-blue-50 text-blue-700 border-blue-200">
                      {lang === 'ar' ? 'الركيزة المعتمدة' : 'PRIMARY PILLAR'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {lang === 'ar' ? `الوزن: ${currentTheme?.weight}%` : `Weight: ${currentTheme?.weight}%`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Goals Tree Node */}
              <div className="pl-3 border-l-2 border-teal-400 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-teal-800">
                    <Layers className="w-3.5 h-3.5 text-teal-600" />
                    <span>{lang === 'ar' ? 'الأهداف الاستراتيجية' : 'Strategic Goals'}</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                    {selectedGoals.length}
                  </span>
                </div>
                {selectedGoals.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">
                    {lang === 'ar' ? 'لم يتم تحديد أهداف' : 'No goals selected yet'}
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {selectedGoals.map((g) => (
                      <div
                        key={g.id}
                        className="p-2 bg-white rounded-lg border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-mono text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200 shrink-0">
                            {g.code}
                          </span>
                          <span className="truncate font-medium text-slate-800">{g.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Objectives Tree Node */}
              <div className="pl-3 border-l-2 border-indigo-400 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-indigo-800">
                    <Target className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{lang === 'ar' ? 'الأهداف التكتيكية (OKR)' : 'Strategic Objectives'}</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {selectedObjectives.length}
                  </span>
                </div>
                {selectedObjectives.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">
                    {lang === 'ar' ? 'لم يتم تحديد مستهدفات' : 'No objectives selected yet'}
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {selectedObjectives.map((o) => (
                      <div
                        key={o.id}
                        className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                              {o.code}
                            </span>
                            <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                              {lang === 'ar' ? o.titleAr || o.title : o.title}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-[10px] text-indigo-700">{o.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full transition-all"
                            style={{ width: `${o.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* KPIs Tree Node */}
              <div className="pl-3 border-l-2 border-emerald-400 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'ar' ? 'مؤشرات الأداء (KPIs)' : 'Key Performance Indicators'}</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {selectedKPIs.length}
                  </span>
                </div>
                {selectedKPIs.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">
                    {lang === 'ar' ? 'لم يتم تحديد مؤشرات' : 'No KPIs selected yet'}
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {selectedKPIs.map((k) => (
                      <div
                        key={k.id}
                        className="p-2 bg-white rounded-lg border border-slate-200 text-xs flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 shrink-0">
                            {k.code}
                          </span>
                          <span className="truncate font-medium text-slate-800">
                            {lang === 'ar' ? k.nameAr || k.name : k.name}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-slate-900 shrink-0">
                          {k.actual} / {k.target} {k.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Initiatives Tree Node */}
              <div className="pl-3 border-l-2 border-amber-400 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-amber-800">
                    <FolderGit2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? 'المبادرات الاستراتيجية' : 'Strategic Initiatives'}</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    {selectedInits.length}
                  </span>
                </div>
                {selectedInits.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">
                    {lang === 'ar' ? 'لم يتم تحديد مبادرات' : 'No initiatives selected yet'}
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {selectedInits.map((i) => (
                      <div
                        key={i.id}
                        className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 shrink-0">
                            {i.code}
                          </span>
                          <span className="truncate font-medium text-slate-800">
                            {lang === 'ar' ? i.titleAr || i.title : i.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-amber-800 shrink-0">
                          SAR {(i.budgetSAR / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Aggregated Blueprint Summary Stats */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {lang === 'ar' ? 'إجمالي ميزانية المبادرات' : 'Total Initiatives Budget'}
                </span>
                <span className="font-mono font-bold text-sm text-slate-900">
                  {lang === 'ar'
                    ? `${(totalBudget / 1000000).toFixed(1)} مليون ر.س`
                    : `SAR ${(totalBudget / 1000000).toFixed(1)}M`}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {lang === 'ar' ? 'متوسط إنجاز المستهدفات' : 'Avg Objectives Progress'}
                </span>
                <span className="font-mono font-bold text-sm text-indigo-700">{avgProgress}%</span>
              </div>
            </div>

            {/* Quick Action Button in preview */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? lang === 'ar'
                    ? 'جاري الاعتماد...'
                    : 'Cascading...'
                  : lang === 'ar'
                  ? 'اعتماد ومواءمة في مصفوفة الاستراتيجية'
                  : 'Deploy into Strategy Matrix'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
