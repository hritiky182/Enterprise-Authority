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
  Flag,
  Zap,
  Cpu,
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

const AI_KPI_SUGGESTIONS = [
  {
    code: 'KPI-2.1.1',
    name: 'Event Visitor Engagement Indicator',
    nameAr: 'مؤشر تفاعل وحضور زوار الفعاليات الإقليمية',
    formula: '(Total Actual Event Visitors - Target Visitors) / Target * 100%',
    unit: '%',
    target: 75,
    actual: 74,
    baseline: '-',
    target2026: '75%',
    target2027: '80%',
    frequency: 'Annual' as const,
    type: 'Lagging' as const,
    weight: 35,
    initiative: 'Initiative 6: Raise awareness of Al-Ahsa Strategy & Digital Engagement',
    project: 'Al-Ahsa Regional Event Storytelling Project',
  },
  {
    code: 'KPI-2.1.2',
    name: 'Digital Civic Dialogue Index',
    nameAr: 'مؤشر التفاعل الرقمي والحوار المجتمعي مع الهيئة',
    formula: "Average Results of Engagement Analysis Reports across Authority's Digital Platforms",
    unit: '%',
    target: 3.5,
    actual: 3.2,
    baseline: '2.00%',
    target2026: '3.50%',
    target2027: '4.00%',
    frequency: 'Quarterly' as const,
    type: 'Leading' as const,
    weight: 30,
    initiative: 'Initiative 7: Increase community participation in development planning',
    project: 'Digital Platforms & Technical Integration for Civic Co-Creation',
  },
  {
    code: 'KPI-2.2.1',
    name: 'Oasis Residents Satisfaction Score',
    nameAr: 'مؤشر رضا سكان الواحة وجودة الخدمات البلدية',
    formula: 'Comprehensive Standardized Municipal & Living Condition Survey Score (Scale 1-100)',
    unit: 'Score',
    target: 85,
    actual: 82,
    baseline: '72',
    target2026: '80',
    target2027: '85',
    frequency: 'Annual' as const,
    type: 'Lagging' as const,
    weight: 35,
    initiative: 'Initiative 8: Enhance urban living standards and oasis environmental services',
    project: 'Urban Observatory Quality of Life Index Project',
  },
];

const AI_INITIATIVE_SUGGESTIONS = [
  {
    code: 'INIT-06',
    title: 'Initiative 6: Raise awareness of Al-Ahsa Strategy & Digital Civic Engagement',
    titleAr: 'المبادرة 6: رفع الوعي باستراتيجية تطوير الأحساء وتعزيز التفاعل الرقمي',
    description: 'Comprehensive public awareness campaigns, multi-media storytelling of oasis heritage, and unified digital communication channels.',
    budget: 8500000,
    spent: 5200000,
    owner: 'Tourism Destination Management Office',
    department: 'Marketing & Public Relations',
    milestones: [
      { title: 'Develop community awareness framework & brand guide', dueDate: '2026-06-30' },
      { title: 'Launch multimedia digital engagement portal', dueDate: '2026-10-15' },
      { title: 'Execute regional oasis festival campaigns', dueDate: '2027-02-28' },
    ],
    keyProject: 'Al-Ahsa Strategy Awareness Project',
  },
  {
    code: 'INIT-07',
    title: 'Initiative 7: Increase community participation in regional development planning',
    titleAr: 'المبادرة 7: تعزيز المشاركة المجتمعية في تخطيط مسارات التنمية الإقليمية',
    description: 'Unified civic engagement digital portal enabling citizens to vote on regional ideas, participate in municipal surveys, and empower local community economy.',
    budget: 12000000,
    spent: 7800000,
    owner: 'Strategy & Sector Development Sector',
    department: 'Strategy Development',
    milestones: [
      { title: 'Digital Platforms and Technical Integration Framework', dueDate: '2026-05-15' },
      { title: 'Unified digital civic voting & consultation portal', dueDate: '2026-12-15' },
      { title: 'Local initiatives incubator & community impact dashboard', dueDate: '2027-03-31' },
    ],
    keyProject: 'Digital Platforms & Technical Integration for Community Engagement',
  },
  {
    code: 'INIT-08',
    title: 'Initiative 8: Enhance urban living standards & oasis environmental services',
    titleAr: 'المبادرة 8: تحسين جودة الحياة الحضرية والخدمات البيئية لواحة الأحساء',
    description: 'Upgrading recreational spaces, developing continuous green corridors, expanding pedestrian network, and monitoring living satisfaction.',
    budget: 16500000,
    spent: 6200000,
    owner: 'Spatial & Urban Development Sector',
    department: 'Urban & Rural Planning',
    milestones: [
      { title: 'Regional green corridor environmental baseline audit', dueDate: '2026-07-31' },
      { title: 'Municipal park revitalizations & community sports track', dueDate: '2026-12-31' },
      { title: 'Comprehensive civic satisfaction measurement benchmark', dueDate: '2027-04-30' },
    ],
    keyProject: 'Quality of Life & Oasis Civic Satisfaction Project',
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
          className={`w-full px-3.5 py-2.5 bg-slate-50 hover:bg-white border rounded-xl text-start text-xs font-medium text-slate-800 flex items-center justify-between transition-all cursor-pointer shadow-2xs ${isOpen ? `${colorStyles.activeBorder} bg-white ring-2 ring-opacity-20` : 'border-slate-200'
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
                      className={`p-2 rounded-xl flex items-start gap-2.5 transition-colors cursor-pointer text-xs ${isChecked ? 'bg-blue-50/60 text-slate-900' : 'hover:bg-slate-50 text-slate-700'
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
  const {
    themes,
    goals,
    objectives,
    kpis,
    initiatives,
    cascadeStrategy,
    strategyPlan,
    updateStrategyPlan,
    addStrategyTheme,
    addGoal,
    addObjective,
    addKPI,
    addInitiative,
    currentUser,
    sectors,
    lang,
    t,
  } = useApp();

  // 1. Institutional Strategy Core Baseline (Name, Duration, Statement)
  const [strategyName, setStrategyName] = useState(
    strategyPlan?.name || 'Al-Ahsa Regional Sustainable Transformation Strategy 2026–2030'
  );
  const [strategyNameAr, setStrategyNameAr] = useState(
    strategyPlan?.nameAr || 'استراتيجية هيئة تطوير الأحساء للتنمية الإقليمية المستدامة 2026–2030'
  );
  const [startYear, setStartYear] = useState<number>(strategyPlan?.startYear || 2026);
  const [endYear, setEndYear] = useState<number>(strategyPlan?.endYear || 2030);
  const [strategyDuration, setStrategyDuration] = useState(
    strategyPlan?.duration || '2026 – 2030 (5-Year Strategic Cycle)'
  );
  const [strategyStatement, setStrategyStatement] = useState(
    strategyPlan?.statement ||
    "To lead comprehensive socio-economic, spatial, and cultural transformation in Al-Ahsa, unlocking the heritage oasis economy, enhancing residents' quality of life, and achieving sustainable regional prosperity in alignment with Saudi Vision 2030."
  );
  const [strategyStatementAr, setStrategyStatementAr] = useState(
    strategyPlan?.statementAr ||
    'قيادة التحول التنموي الشامل، والمكاني، والاقتصادي في الأحساء، وتعظيم الاستفادة من واحة التراث العالمي، والارتقاء بجودة حياة السكان، وتحقيق الازدهار المستدام بما يتماشى مع رؤية السعودية 2030.'
  );

  const handleYearChange = (start: number, end: number) => {
    setStartYear(start);
    setEndYear(end);
    const cycleYears = Math.max(1, end - start + 1);
    setStrategyDuration(`${start} – ${end} (${cycleYears}-Year Strategic Cycle)`);
  };

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

  // Quick Inline Creation States
  const [showQuickObj, setShowQuickObj] = useState(false);
  const [quickObjCode, setQuickObjCode] = useState(`SO-0${objectives.length + 1}`);
  const [quickObjTitle, setQuickObjTitle] = useState('');
  const [quickObjTitleAr, setQuickObjTitleAr] = useState('');
  const [quickObjOwner, setQuickObjOwner] = useState(currentUser.name);
  const [quickObjDept, setQuickObjDept] = useState(currentUser.department);
  const [quickObjDesc, setQuickObjDesc] = useState('');
  const [quickObjYear, setQuickObjYear] = useState(2027);

  const handleQuickAddObj = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickObjTitle.trim()) {
      toast.error(lang === 'ar' ? 'الرجاء إدخال عنوان الهدف' : 'Please enter objective title');
      return;
    }
    const created = addObjective({
      code: quickObjCode || `SO-0${objectives.length + 1}`,
      title: quickObjTitle,
      titleAr: quickObjTitleAr || undefined,
      description: quickObjDesc || undefined,
      owner: quickObjOwner,
      department: quickObjDept,
      themeId: selectedThemeId,
      themeName: currentTheme?.title || '02 People and Society',
      goalId: selectedGoalIds[0] || goals[0]?.id || 'goal-1',
      targetYear: quickObjYear,
      kpiCount: 0,
      progress: 0,
      status: 'on-track',
    });
    setSelectedObjectiveIds((prev) => [...prev, created.id]);
    setShowQuickObj(false);
    setQuickObjTitle('');
    setQuickObjTitleAr('');
    setQuickObjDesc('');
    toast.success(
      lang === 'ar'
        ? `تم إنشاء الهدف ${created.code} وربطه بالاستراتيجية`
        : `Created & linked objective ${created.code}`
    );
  };

  const [showQuickKpi, setShowQuickKpi] = useState(false);
  const [quickKpiCode, setQuickKpiCode] = useState(`2.1.${kpis.length + 1}`);
  const [quickKpiName, setQuickKpiName] = useState('');
  const [quickKpiFormula, setQuickKpiFormula] = useState('');
  const [quickKpiOwner, setQuickKpiOwner] = useState(currentUser.name);
  const [quickKpiTarget2026, setQuickKpiTarget2026] = useState('100');
  const [quickKpiTarget2027, setQuickKpiTarget2027] = useState('120');
  const [quickKpiBaseline, setQuickKpiBaseline] = useState('80');
  const [quickKpiUnit, setQuickKpiUnit] = useState('%');
  const [quickKpiFreq, setQuickKpiFreq] = useState<'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual'>('Quarterly');
  const [quickKpiWeight, setQuickKpiWeight] = useState(25);

  const handleQuickAddKpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickKpiName.trim()) {
      toast.error(lang === 'ar' ? 'الرجاء إدخال اسم المؤشر' : 'Please enter KPI name');
      return;
    }
    const targetNum = Number(quickKpiTarget2026) || 100;
    const parentObj = objectives.find((o) => selectedObjectiveIds.includes(o.id)) || objectives[0];
    const created = addKPI({
      code: quickKpiCode || `2.1.${kpis.length + 1}`,
      name: quickKpiName,
      objectiveId: parentObj?.id || 'obj-1',
      objectiveTitle: parentObj?.title || 'Strategic Objective',
      unit: quickKpiUnit,
      owner: quickKpiOwner,
      target: targetNum,
      actual: Number(quickKpiBaseline) || 0,
      achievementPct: 0,
      frequency: quickKpiFreq,
      status: 'on-track',
      formula: quickKpiFormula || undefined,
      baseline: quickKpiBaseline || undefined,
      target2026: quickKpiTarget2026 || undefined,
      target2027: quickKpiTarget2027 || undefined,
      weight: quickKpiWeight,
      pillarCode: currentTheme?.code || '02',
      pillarTitle: currentTheme?.title || '02 People and Society',
    });
    setSelectedKpiIds((prev) => [...prev, created.id]);
    setShowQuickKpi(false);
    setQuickKpiName('');
    setQuickKpiFormula('');
    toast.success(
      lang === 'ar' ? `تم إنشاء المؤشر ${created.code} وربطه بالهدف` : `Created & linked KPI ${created.code}`
    );
  };

  const [showQuickInit, setShowQuickInit] = useState(false);
  const [quickInitCode, setQuickInitCode] = useState(`INIT-${initiatives.length + 1}`);
  const [quickInitTitle, setQuickInitTitle] = useState('');
  const [quickInitProject, setQuickInitProject] = useState('');
  const [quickInitBudgetM, setQuickInitBudgetM] = useState('15.0');
  const [quickInitOwner, setQuickInitOwner] = useState(currentUser.name);

  const handleQuickAddInit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInitTitle.trim()) {
      toast.error(lang === 'ar' ? 'الرجاء إدخال عنوان المبادرة' : 'Please enter initiative title');
      return;
    }
    const parentObj = objectives.find((o) => selectedObjectiveIds.includes(o.id)) || objectives[0];
    const budgetSAR = (parseFloat(quickInitBudgetM) || 10) * 1000000;
    const created = addInitiative({
      code: quickInitCode || `INIT-${initiatives.length + 1}`,
      title: quickInitTitle,
      objectiveId: parentObj?.id || 'obj-1',
      objectiveTitle: parentObj?.title || 'Strategic Objective',
      owner: quickInitOwner,
      department: currentUser.department,
      budgetSAR,
      spentSAR: 0,
      progress: 0,
      startDate: '2026-01-01',
      endDate: '2027-12-31',
      status: 'Planning',
      milestones: [],
      risksCount: 0,
      actionsCount: 0,
      keyProjects: quickInitProject ? [quickInitProject] : undefined,
    });
    setSelectedInitiativeIds((prev) => [...prev, created.id]);
    setShowQuickInit(false);
    setQuickInitTitle('');
    setQuickInitProject('');
    toast.success(
      lang === 'ar'
        ? `تم إنشاء المبادرة ${created.code} وربطها بالهدف`
        : `Created & linked initiative ${created.code}`
    );
  };

  // Modals for Cards 2, 3, 4, 5, 6
  const [isCreatePillarModalOpen, setIsCreatePillarModalOpen] = useState(false);
  const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);
  const [isCreateObjModalOpen, setIsCreateObjModalOpen] = useState(false);
  const [isCreateKpiModalOpen, setIsCreateKpiModalOpen] = useState(false);
  const [isCreateInitModalOpen, setIsCreateInitModalOpen] = useState(false);
  const [isAiKpiDrawerOpen, setIsAiKpiDrawerOpen] = useState(false);
  const [isAiInitDrawerOpen, setIsAiInitDrawerOpen] = useState(false);

  // Card 2: Pillar Modal Form States
  const [pillarCode, setPillarCode] = useState(`ST-0${themes.length + 1}`);
  const [pillarTitle, setPillarTitle] = useState('');
  const [pillarTitleAr, setPillarTitleAr] = useState('');
  const [pillarDesc, setPillarDesc] = useState('');
  const [pillarDescAr, setPillarDescAr] = useState('');
  const [pillarWeight, setPillarWeight] = useState(20);
  const [pillarColor, setPillarColor] = useState('blue');

  // Card 3: Goal Modal Form States
  const [goalCode, setGoalCode] = useState(`SG-0${goals.length + 1}`);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTitleAr, setGoalTitleAr] = useState('');
  const [goalDesc, setGoalDesc] = useState('');
  const [goalThemeId, setGoalThemeId] = useState('');

  // Card 4: Objective Modal Form States (matches ObjectivesPage)
  const [formObjCode, setFormObjCode] = useState(`SO-0${objectives.length + 1}`);
  const [formObjTitle, setFormObjTitle] = useState('');
  const [formObjTitleAr, setFormObjTitleAr] = useState('');
  const [formObjDesc, setFormObjDesc] = useState('');
  const [formObjDescAr, setFormObjDescAr] = useState('');
  const [formObjThemeId, setFormObjThemeId] = useState('');
  const [formObjSectorId, setFormObjSectorId] = useState('');
  const [formObjOwner, setFormObjOwner] = useState('Strategy Specialist');
  const [formObjDept, setFormObjDept] = useState('Strategic Planning & PMO');
  const [formObjTargetYear, setFormObjTargetYear] = useState(2026);
  const [formObjProgress, setFormObjProgress] = useState(0);
  const [formObjStatus, setFormObjStatus] = useState<'on-track' | 'at-risk' | 'behind' | 'achieved'>('on-track');

  // Card 5: KPI Modal Form States (matches KPIsPage)
  const [formKpiCode, setFormKpiCode] = useState(`KPI-0${kpis.length + 1}`);
  const [formKpiName, setFormKpiName] = useState('');
  const [formKpiNameAr, setFormKpiNameAr] = useState('');
  const [formKpiObjId, setFormKpiObjId] = useState('');
  const [formKpiFormula, setFormKpiFormula] = useState('');
  const [formKpiUnit, setFormKpiUnit] = useState('%');
  const [formKpiTarget, setFormKpiTarget] = useState(100);
  const [formKpiActual, setFormKpiActual] = useState(0);
  const [formKpiBaseline, setFormKpiBaseline] = useState('0%');
  const [formKpiTarget2026, setFormKpiTarget2026] = useState('100%');
  const [formKpiTarget2027, setFormKpiTarget2027] = useState('100%');
  const [formKpiFrequency, setFormKpiFrequency] = useState<'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual'>('Quarterly');
  const [formKpiStatus, setFormKpiStatus] = useState<'on-track' | 'warning' | 'critical' | 'achieved'>('on-track');
  const [formKpiType, setFormKpiType] = useState<'Leading' | 'Lagging'>('Lagging');
  const [formKpiWeight, setFormKpiWeight] = useState(25);
  const [formKpiStrategicInit, setFormKpiStrategicInit] = useState('');
  const [formKpiKeyProject, setFormKpiKeyProject] = useState('');

  // Card 6: Initiative Modal Form States (matches InitiativesPage)
  const [formInitCode, setFormInitCode] = useState(`INIT-0${initiatives.length + 1}`);
  const [formInitTitle, setFormInitTitle] = useState('');
  const [formInitTitleAr, setFormInitTitleAr] = useState('');
  const [formInitObjId, setFormInitObjId] = useState('');
  const [formInitDesc, setFormInitDesc] = useState('');
  const [formInitOwner, setFormInitOwner] = useState('Strategy Specialist');
  const [formInitDept, setFormInitDept] = useState('Regional Transformation & Urban Planning');
  const [formInitBudget, setFormInitBudget] = useState(12000000);
  const [formInitSpent, setFormInitSpent] = useState(2500000);
  const [formInitProgress, setFormInitProgress] = useState(20);
  const [formInitStart, setFormInitStart] = useState('2026-01-01');
  const [formInitEnd, setFormInitEnd] = useState('2027-12-31');
  const [formInitStatus, setFormInitStatus] = useState<'Planning' | 'In Progress' | 'At Risk' | 'Completed'>('In Progress');
  const [formInitKeyProject, setFormInitKeyProject] = useState('Al-Ahsa Strategy Awareness Project');
  const [formInitMilestoneTitle, setFormInitMilestoneTitle] = useState('Phase 1 Detailed Master Scope Sign-off');
  const [formInitMilestoneDate, setFormInitMilestoneDate] = useState('2026-11-30');

  // AI Copilot handlers
  const handleApplyAiKpiSuggestion = (sug: typeof AI_KPI_SUGGESTIONS[0]) => {
    setFormKpiCode(sug.code);
    setFormKpiName(sug.name);
    setFormKpiNameAr(sug.nameAr);
    setFormKpiFormula(sug.formula);
    setFormKpiUnit(sug.unit);
    setFormKpiTarget(sug.target);
    setFormKpiActual(sug.actual);
    setFormKpiBaseline(sug.baseline);
    setFormKpiTarget2026(sug.target2026);
    setFormKpiTarget2027(sug.target2027);
    setFormKpiFrequency(sug.frequency);
    setFormKpiType(sug.type);
    setFormKpiWeight(sug.weight);
    setFormKpiStrategicInit(sug.initiative);
    setFormKpiKeyProject(sug.project);
    setIsAiKpiDrawerOpen(false);
    toast.success(
      lang === 'ar' ? 'تم تطبيق مقترح المؤشر بالذكاء الاصطناعي بنجاح' : 'AI Copilot KPI Recommendation Applied!',
      { description: `${sug.code}: ${sug.name}` }
    );
  };

  const handleApplyAiInitSuggestion = (sug: typeof AI_INITIATIVE_SUGGESTIONS[0]) => {
    setFormInitCode(sug.code);
    setFormInitTitle(sug.title);
    setFormInitTitleAr(sug.titleAr);
    setFormInitDesc(sug.description);
    setFormInitBudget(sug.budget);
    setFormInitSpent(sug.spent);
    setFormInitOwner(sug.owner);
    setFormInitDept(sug.department);
    setFormInitKeyProject(sug.keyProject);
    setFormInitMilestoneTitle(sug.milestones[0]?.title || 'Master Scope Sign-off');
    setFormInitMilestoneDate(sug.milestones[0]?.dueDate || '2026-11-30');
    setIsAiInitDrawerOpen(false);
    toast.success(
      lang === 'ar' ? 'تم تطبيق مقترح المبادرة بالذكاء الاصطناعي بنجاح' : 'AI Copilot Initiative Recommendation Applied!',
      { description: `${sug.code}: ${sug.title}` }
    );
  };

  // Handlers for modal submissions
  const handleCreatePillarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pillarTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان الركيزة' : 'Pillar title is required');
      return;
    }
    const newTheme = addStrategyTheme({
      code: pillarCode.trim() || `ST-0${themes.length + 1}`,
      title: pillarTitle.trim(),
      titleAr: pillarTitleAr.trim() || undefined,
      description: pillarDesc.trim() || pillarTitle.trim(),
      descriptionAr: pillarDescAr.trim() || undefined,
      weight: Number(pillarWeight) || 20,
      color: pillarColor,
    });
    setSelectedThemeId(newTheme.id);
    setIsCreatePillarModalOpen(false);
    setPillarTitle('');
    setPillarTitleAr('');
    setPillarDesc('');
    setPillarDescAr('');
    toast.success(
      lang === 'ar'
        ? `تم إنشاء الركيزة "${newTheme.titleAr || newTheme.title}" واختيارها بنجاح`
        : `Created Strategic Pillar "${newTheme.title}" and selected`
    );
  };

  const handleCreateGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان الهدف' : 'Goal title is required');
      return;
    }
    const targetThemeId = goalThemeId || selectedThemeId;
    const newGoal = addGoal({
      code: goalCode.trim() || `SG-0${goals.length + 1}`,
      title: goalTitle.trim(),
      titleAr: goalTitleAr.trim() || undefined,
      description: goalDesc.trim() || goalTitle.trim(),
      themeId: targetThemeId,
    });
    setSelectedGoalIds((prev) => Array.from(new Set([...prev, newGoal.id])));
    setIsCreateGoalModalOpen(false);
    setGoalTitle('');
    setGoalTitleAr('');
    setGoalDesc('');
    toast.success(
      lang === 'ar'
        ? `تم إنشاء الهدف الاستراتيجي "${newGoal.titleAr || newGoal.title}" وربطه بنجاح`
        : `Created Strategic Goal "${newGoal.title}" and linked`
    );
  };

  const handleCreateObjectiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formObjTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان الهدف' : 'Objective title is required');
      return;
    }
    const targetThemeId = formObjThemeId || selectedThemeId;
    const matchedTheme = themes.find((t) => t.id === targetThemeId);
    const matchedSector = sectors.find((s) => s.id === formObjSectorId);

    const created = addObjective({
      code: formObjCode.trim() || `SO-0${objectives.length + 1}`,
      title: formObjTitle.trim(),
      titleAr: formObjTitleAr.trim() || undefined,
      description: formObjDesc.trim() || undefined,
      descriptionAr: formObjDescAr.trim() || undefined,
      themeId: targetThemeId,
      themeName: matchedTheme ? matchedTheme.title : 'Strategic Theme',
      goalId: selectedGoalIds[0] || goals[0]?.id || 'goal-1',
      owner: formObjOwner.trim() || 'Strategy Specialist',
      department: formObjDept.trim() || 'Strategic Planning & PMO',
      sectorId: formObjSectorId || undefined,
      sectorName: matchedSector ? matchedSector.name : undefined,
      targetYear: Number(formObjTargetYear) || 2026,
      progress: Number(formObjProgress) || 0,
      status: formObjStatus,
      kpiCount: 0,
    });

    setSelectedObjectiveIds((prev) => Array.from(new Set([...prev, created.id])));
    setIsCreateObjModalOpen(false);
    setFormObjTitle('');
    setFormObjTitleAr('');
    setFormObjDesc('');
    setFormObjDescAr('');
    toast.success(
      lang === 'ar'
        ? `تم حفظ ونشر الهدف الاستراتيجي "${created.titleAr || created.title}" وربطه بنجاح`
        : `Saved and linked Strategic Objective "${created.title}"`
    );
  };

  const handleCreateKpiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formKpiName.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال اسم المؤشر' : 'KPI Name is required');
      return;
    }
    const targetObjId = formKpiObjId || (selectedObjectiveIds[0] || objectives[0]?.id || 'obj-1');
    const matchedObj = objectives.find((o) => o.id === targetObjId);
    const targetVal = Number(formKpiTarget) || 100;
    const actualVal = Number(formKpiActual) || 0;
    const achievementPct = targetVal > 0 ? Math.min(100, Math.round((actualVal / targetVal) * 100)) : 0;

    const created = addKPI({
      code: formKpiCode.trim() || `KPI-0${kpis.length + 1}`,
      name: formKpiName.trim(),
      nameAr: formKpiNameAr.trim() || undefined,
      objectiveId: targetObjId,
      objectiveTitle: matchedObj ? matchedObj.title : 'Strategic Objective',
      target: targetVal,
      actual: actualVal,
      achievementPct,
      owner: matchedObj?.owner || 'Strategy Specialist',
      unit: formKpiUnit || '%',
      frequency: formKpiFrequency,
      status: formKpiStatus,
      formula: formKpiFormula.trim() || undefined,
      baseline: formKpiBaseline.trim() || undefined,
      target2026: formKpiTarget2026.trim() || undefined,
      target2027: formKpiTarget2027.trim() || undefined,
      type: formKpiType,
      weight: Number(formKpiWeight) || 25,
      strategicInitiative: formKpiStrategicInit.trim() || undefined,
      keyProject: formKpiKeyProject.trim() || undefined,
      pillarCode: currentTheme?.code,
      pillarTitle: currentTheme?.title,
    });

    setSelectedKpiIds((prev) => Array.from(new Set([...prev, created.id])));
    setIsCreateKpiModalOpen(false);
    setFormKpiName('');
    setFormKpiNameAr('');
    setFormKpiFormula('');
    toast.success(
      lang === 'ar'
        ? `تم حفظ ونشر المؤشر "${created.nameAr || created.name}" وربطه بنجاح`
        : `Saved and linked KPI "${created.name}"`
    );
  };

  const handleCreateInitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInitTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان المبادرة' : 'Initiative Title is required');
      return;
    }
    const targetObjId = formInitObjId || (selectedObjectiveIds[0] || objectives[0]?.id || 'obj-1');
    const matchedObj = objectives.find((o) => o.id === targetObjId);

    const created = addInitiative({
      code: formInitCode.trim() || `INIT-0${initiatives.length + 1}`,
      title: formInitTitle.trim(),
      titleAr: formInitTitleAr.trim() || undefined,
      objectiveId: targetObjId,
      objectiveTitle: matchedObj ? matchedObj.title : 'Strategic Objective',
      description: formInitDesc.trim() || undefined,
      owner: formInitOwner.trim() || 'Strategy Specialist',
      department: formInitDept.trim() || 'Strategic Planning & PMO',
      budgetSAR: Number(formInitBudget) || 12000000,
      spentSAR: Number(formInitSpent) || 0,
      progress: Number(formInitProgress) || 20,
      startDate: formInitStart || '2026-01-01',
      endDate: formInitEnd || '2027-12-31',
      status: formInitStatus,
      risksCount: 0,
      actionsCount: 0,
      keyProjects: formInitKeyProject.trim() ? [formInitKeyProject.trim()] : undefined,
      milestones: [
        {
          id: `ms-${Date.now()}`,
          title: formInitMilestoneTitle.trim() || 'Phase 1 Master Scope Sign-off',
          dueDate: formInitMilestoneDate || '2026-11-30',
          status: 'In Progress',
        },
      ],
    });

    setSelectedInitiativeIds((prev) => Array.from(new Set([...prev, created.id])));
    setIsCreateInitModalOpen(false);
    setFormInitTitle('');
    setFormInitTitleAr('');
    setFormInitDesc('');
    toast.success(
      lang === 'ar'
        ? `تم حفظ ونشر المبادرة "${created.titleAr || created.title}" وربطها بنجاح`
        : `Saved and linked Initiative "${created.title}"`
    );
  };

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
    if (!strategyName.trim()) {
      toast.error(lang === 'ar' ? 'الرجاء إدخال اسم الاستراتيجية' : 'Please enter strategy name');
      return;
    }

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
      // 1. Update Strategy Plan (Name, Duration, Statement)
      updateStrategyPlan({
        name: strategyName,
        nameAr: strategyNameAr || undefined,
        duration: strategyDuration,
        startYear,
        endYear,
        statement: strategyStatement,
        statementAr: strategyStatementAr || undefined,
        status: 'Active',
      });

      // 2. Cascade Components (Pillars, Objectives, KPIs, Initiatives)
      cascadeStrategy({
        themeId: selectedThemeId,
        goalIds: selectedGoalIds,
        objectiveIds: selectedObjectiveIds,
        kpiIds: selectedKpiIds,
        initiativeIds: selectedInitiativeIds,
      });

      toast.success(
        lang === 'ar'
          ? `تم حفظ مواءمة "${strategyNameAr || strategyName}" بنجاح!`
          : `Strategy "${strategyName}" successfully saved and cascaded!`,
        {
          description:
            lang === 'ar'
              ? `تم ربط ${selectedObjectives.length} أهداف و ${selectedKPIs.length} مؤشرات و ${selectedInits.length} مبادرات بالاستراتيجية.`
              : `Bound ${selectedObjectives.length} objectives, ${selectedKPIs.length} KPIs, and ${selectedInits.length} initiatives into the strategy architecture.`,
        }
      );

      // Redirect back to strategy matrix view
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
            <span className="font-bold uppercase">
              {lang === 'ar' ? 'التخطيط والمواءمة الاستراتيجية' : 'STRATEGIC CASCADE FORMULATION'}
            </span>
            <span className="text-slate-300">/</span>
            <span>
              {lang === 'ar' ? 'التخطيط الاستراتيجي وصياغة المواءمة' : 'Strategy Planning & Cascade Formulation'}
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
          {/* Card 1: Master Institutional Strategy Foundation (Name, Duration, Statement) */}
          <div className="bg-white rounded-2xl border border-blue-200/80 shadow-xs p-6 space-y-4 ring-1 ring-blue-500/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  1
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {lang === 'ar' ? 'تعريف الاستراتيجية المؤسسية والمدى الزمني' : 'Institutional Strategy Mandate & Horizon'}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {lang === 'ar' ? 'الأساس المؤسسي' : 'CORE BASELINE'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {lang === 'ar'
                      ? 'حدد اسم الاستراتيجية، المدى الزمني، وبيان التكليف الاستراتيجي المعتمد'
                      : 'Define the Strategy Name, Time Horizon Duration, and Executive Mandate Statement'}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{lang === 'ar' ? 'معتمد رسمياً' : 'Active Horizon'}</span>
              </span>
            </div>

            <div className="space-y-4">
              {/* Strategy Name (EN & AR) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'اسم الاستراتيجية (بالإنجليزية)' : 'Strategy Name (English)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={strategyName}
                    onChange={(e) => setStrategyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
                    placeholder="e.g. Al-Ahsa Regional Sustainable Transformation Strategy 2026–2030"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'اسم الاستراتيجية (بالعربية)' : 'Strategy Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={strategyNameAr}
                    onChange={(e) => setStrategyNameAr(e.target.value)}
                    dir="rtl"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
                    placeholder="مثال: استراتيجية هيئة تطوير الأحساء للتنمية الإقليمية المستدامة 2026–2030"
                  />
                </div>
              </div>

              {/* Duration & Cycle Horizon */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'سنة البدء' : 'Cycle Start Year'}
                  </label>
                  <input
                    type="number"
                    min="2020"
                    max="2035"
                    value={startYear}
                    onChange={(e) => handleYearChange(Number(e.target.value), endYear)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'سنة الانتهاء' : 'Cycle Horizon Year'}
                  </label>
                  <input
                    type="number"
                    min="2024"
                    max="2040"
                    value={endYear}
                    onChange={(e) => handleYearChange(startYear, Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المدى الزمني للاستراتيجية' : 'Strategy Duration Label'}
                  </label>
                  <div className="px-3 py-1.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs font-mono font-bold text-blue-900 truncate">
                    {strategyDuration}
                  </div>
                </div>
              </div>

              {/* Strategic Statement / Executive Mandate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'بيان الاستراتيجية / التكليف التنفيذي (EN)' : 'Strategic Statement / Executive Mandate'}
                  </label>
                  <textarea
                    rows={2}
                    value={strategyStatement}
                    onChange={(e) => setStrategyStatement(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs leading-relaxed"
                    placeholder="Overarching strategic mandate and institutional commitment..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'بيان الاستراتيجية / التكليف التنفيذي (AR)' : 'Strategic Statement (Arabic)'}
                  </label>
                  <textarea
                    rows={2}
                    value={strategyStatementAr}
                    onChange={(e) => setStrategyStatementAr(e.target.value)}
                    dir="rtl"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs leading-relaxed"
                    placeholder="التكليف الاستراتيجي والهدف الأسمى للمنظومة..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Strategic Pillar / Theme Dropdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'ربط الركيزة الاستراتيجية (المحور)' : 'Link Strategic Pillar (Theme)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'اختر الركيزة الاستراتيجية المعتمدة لربطها بالاستراتيجية'
                      : 'Choose the primary organizational pillar to anchor the cascade'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPillarCode(`ST-0${themes.length + 1}`);
                    setIsCreatePillarModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إنشاء ركيزة' : 'Create Pillar'}</span>
                </button>
                <Link
                  to="/hierarchy-tree"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{lang === 'ar' ? 'شجرة المحاور ↗' : 'Hierarchy Tree ↗'}</span>
                </Link>
              </div>
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

          {/* Card 3: Strategic Goals Multi-Select Dropdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                  3
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
                  onClick={() => {
                    setGoalCode(`SG-0${goals.length + 1}`);
                    setGoalThemeId(selectedThemeId);
                    setIsCreateGoalModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[11px] font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إنشاء هدف' : 'Create Goal'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOnlyShowThemeGoals(!onlyShowThemeGoals)}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${onlyShowThemeGoals
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

          {/* Card 4: Strategic Objectives Multi-Select & Quick Create */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'الأهداف التشغيلية والتكتيكية (OKR)' : 'Strategic Objectives (Tactical OKRs)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'حدد مستهدفات تكتيكية واربطها بالركيزة، مع تفاصيل المسؤول والوصف من ملف الهيئة'
                      : 'Select or quickly create objectives with Owner & Description attributes'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormObjCode(`SO-0${objectives.length + 1}`);
                    setFormObjThemeId(selectedThemeId);
                    setIsCreateObjModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إنشاء هدف' : 'Create Objective'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickObj(!showQuickObj)}
                  className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-semibold border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'إضافة سريعة' : 'Quick Add'}</span>
                </button>
                <Link
                  to="/objectives"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{lang === 'ar' ? 'السجل ↗' : 'Register ↗'}</span>
                </Link>
              </div>
            </div>

            {/* Quick Add Objective Collapsible Form */}
            {showQuickObj && (
              <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900">
                    {lang === 'ar' ? 'إنشاء هدف استراتيجي جديد وربطه فوراً' : 'Quick Create & Link Strategic Objective'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowQuickObj(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'رمز الهدف' : 'Code'}</label>
                    <input
                      type="text"
                      value={quickObjCode}
                      onChange={(e) => setQuickObjCode(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                      placeholder="e.g. 2.3"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'سنة الاستهداف' : 'Target Year'}</label>
                    <input
                      type="number"
                      value={quickObjYear}
                      onChange={(e) => setQuickObjYear(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'عنوان الهدف (EN)' : 'Objective Title (EN)'} *</label>
                  <input
                    type="text"
                    value={quickObjTitle}
                    onChange={(e) => setQuickObjTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    placeholder="e.g. Expand Cultural Tourism Footfall in Historic Oasis"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'المسؤول' : 'Owner'}</label>
                    <input
                      type="text"
                      value={quickObjOwner}
                      onChange={(e) => setQuickObjOwner(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'الإدارة' : 'Department'}</label>
                    <input
                      type="text"
                      value={quickObjDept}
                      onChange={(e) => setQuickObjDept(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'الوصف الاستراتيجي' : 'Objective Strategic Description'}</label>
                  <textarea
                    rows={2}
                    value={quickObjDesc}
                    onChange={(e) => setQuickObjDesc(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    placeholder="Detailed strategic description matching client Excel attributes..."
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowQuickObj(false)}
                    className="px-3 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickAddObj}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-semibold"
                  >
                    {lang === 'ar' ? 'إنشاء وربط' : 'Create & Link'}
                  </button>
                </div>
              </div>
            )}

            <MultiSelectDropdown
              label={lang === 'ar' ? 'اختر الأهداف التكتيكية (مستهدفات الإدارات)' : 'Select Strategic Objectives'}
              sublabel={
                lang === 'ar'
                  ? 'تشمل المستهدفات مع المالك والوصف المعتمد في ملف الهيئة'
                  : 'Includes objectives with Owner and Description attributes'
              }
              items={objectives.map((o) => ({
                id: o.id,
                code: o.code,
                title: o.title,
                titleAr: o.titleAr,
                description: `${o.owner} • ${o.department} • FY ${o.targetYear}${o.description ? ` — ${o.description}` : ''
                  }`,
                badge: `${o.progress}% Progress`,
                extra: `Status: ${o.status}`,
              }))}
              selectedIds={selectedObjectiveIds}
              onChange={setSelectedObjectiveIds}
              accentColor="indigo"
              placeholder={lang === 'ar' ? 'اختر أهدافاً تكتيكية...' : 'Select Strategic Objectives...'}
              lang={lang}
              manageLink={{ to: '/objectives', text: lang === 'ar' ? 'فتح سجل المستهدفات ↗' : 'Objectives Register ↗' }}
            />
          </div>

          {/* Card 5: Key Performance Indicators Multi-Select & Quick Create */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  5
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'مؤشرات الأداء الرئيسية (KPIs)' : 'Key Performance Indicators (KPIs)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'مؤشرات الأداء مع معادلة الحساب، المستهدفات (2026/2027)، والوزن النسبي'
                      : 'KPIs with calculation formula, 2026/2027 targets, and weighting'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormKpiCode(`KPI-0${kpis.length + 1}`);
                    setFormKpiObjId(selectedObjectiveIds[0] || objectives[0]?.id || 'obj-1');
                    setIsCreateKpiModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إنشاء مؤشر' : 'Create KPI'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickKpi(!showQuickKpi)}
                  className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-semibold border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'إضافة سريعة' : 'Quick Add'}</span>
                </button>
                <Link
                  to="/kpis"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-800 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{lang === 'ar' ? 'السجل ↗' : 'Register ↗'}</span>
                </Link>
              </div>
            </div>

            {/* Quick Add KPI Collapsible Form */}
            {showQuickKpi && (
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900">
                    {lang === 'ar' ? 'إنشاء مؤشر أداء جديد وربطه بالمستهدف' : 'Quick Create & Link KPI'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowQuickKpi(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'رمز المؤشر' : 'Code'}</label>
                    <input
                      type="text"
                      value={quickKpiCode}
                      onChange={(e) => setQuickKpiCode(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                      placeholder="e.g. 2.1.5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'الوحدة' : 'Unit'}</label>
                    <input
                      type="text"
                      value={quickKpiUnit}
                      onChange={(e) => setQuickKpiUnit(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      placeholder="%"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'اسم المؤشر' : 'KPI Name'} *</label>
                  <input
                    type="text"
                    value={quickKpiName}
                    onChange={(e) => setQuickKpiName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    placeholder="e.g. Cultural Tourism Satisfaction Index"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'معادلة الحساب القياسية' : 'Calculation Formula'}</label>
                  <input
                    type="text"
                    value={quickKpiFormula}
                    onChange={(e) => setQuickKpiFormula(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                    placeholder="∑ (Satisfied Survey Responses) / (Total Sample Size) * 100"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'خط الأساس' : 'Baseline'}</label>
                    <input
                      type="text"
                      value={quickKpiBaseline}
                      onChange={(e) => setQuickKpiBaseline(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'مستهدف 2026' : 'Target 2026'}</label>
                    <input
                      type="text"
                      value={quickKpiTarget2026}
                      onChange={(e) => setQuickKpiTarget2026(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'مستهدف 2027' : 'Target 2027'}</label>
                    <input
                      type="text"
                      value={quickKpiTarget2027}
                      onChange={(e) => setQuickKpiTarget2027(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowQuickKpi(false)}
                    className="px-3 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickAddKpi}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold"
                  >
                    {lang === 'ar' ? 'إنشاء وربط' : 'Create & Link'}
                  </button>
                </div>
              </div>
            )}

            <MultiSelectDropdown
              label={lang === 'ar' ? 'اختر مؤشرات الأداء من السجل' : 'Select Key Performance Indicators'}
              sublabel={
                lang === 'ar'
                  ? 'يمكنك ربط مؤشرات متعددة بالمصفوفة مع الحفاظ على خصائص المعادلة والمستهدفات'
                  : 'Link indicators with formulas, baseline & 2026/2027 targets'
              }
              items={kpis.map((k) => ({
                id: k.id,
                code: k.code,
                title: k.name,
                titleAr: k.nameAr,
                description: k.formula ? `Formula: ${k.formula}` : undefined,
                badge: `${k.actual} / ${k.target} ${k.unit}`,
                extra: `Target 2026: ${k.target2026 || '-'} • Target 2027: ${k.target2027 || '-'} • Owner: ${k.owner}`,
              }))}
              selectedIds={selectedKpiIds}
              onChange={setSelectedKpiIds}
              accentColor="emerald"
              placeholder={lang === 'ar' ? 'اختر مؤشرات أداء...' : 'Select KPIs...'}
              lang={lang}
              manageLink={{ to: '/kpis', text: lang === 'ar' ? 'فتح سجل المؤشرات ↗' : 'KPIs Register ↗' }}
            />
          </div>

          {/* Card 6: Strategic Initiatives Multi-Select & Quick Create */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                  6
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'المبادرات الاستراتيجية والمشاريع الريادية' : 'Strategic Initiatives & Flagship Projects'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'حدد المبادرات والمشاريع الممولة (SAR M) لتحقيق هذه الأهداف'
                      : 'Select implementation initiatives, milestones, and funding packages (SAR M)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormInitCode(`INIT-0${initiatives.length + 1}`);
                    setFormInitObjId(selectedObjectiveIds[0] || objectives[0]?.id || 'obj-1');
                    setIsCreateInitModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إنشاء مبادرة' : 'Create Initiative'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickInit(!showQuickInit)}
                  className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-[10px] font-semibold border border-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'إضافة سريعة' : 'Quick Add'}</span>
                </button>
                <Link
                  to="/initiatives"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 hover:text-amber-800 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{lang === 'ar' ? 'السجل ↗' : 'Register ↗'}</span>
                </Link>
              </div>
            </div>

            {/* Quick Add Initiative Collapsible Form */}
            {showQuickInit && (
              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">
                    {lang === 'ar' ? 'إنشاء مبادرة جديدة وربطها بالمستهدف' : 'Quick Create & Link Initiative'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowQuickInit(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'رمز المبادرة' : 'Code'}</label>
                    <input
                      type="text"
                      value={quickInitCode}
                      onChange={(e) => setQuickInitCode(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                      placeholder="e.g. INIT-9"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'الميزانية (مليون ر.س)' : 'Budget (SAR Millions)'}</label>
                    <input
                      type="number"
                      step="0.1"
                      value={quickInitBudgetM}
                      onChange={(e) => setQuickInitBudgetM(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                      placeholder="15.0"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'عنوان المبادرة' : 'Initiative Title'} *</label>
                  <input
                    type="text"
                    value={quickInitTitle}
                    onChange={(e) => setQuickInitTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    placeholder="e.g. Al-Ahsa Sustainable Oasis Ecotourism Corridor"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-[10px] font-semibold text-slate-700 mb-0.5">{lang === 'ar' ? 'المشروع الريادي الرئيسي' : 'Flagship Project'}</label>
                  <input
                    type="text"
                    value={quickInitProject}
                    onChange={(e) => setQuickInitProject(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    placeholder="e.g. Oasis Palm Date Heritage Infrastructure Project"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowQuickInit(false)}
                    className="px-3 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickAddInit}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-semibold"
                  >
                    {lang === 'ar' ? 'إنشاء وربط' : 'Create & Link'}
                  </button>
                </div>
              </div>
            )}

            <MultiSelectDropdown
              label={lang === 'ar' ? 'اختر المبادرات الاستراتيجية' : 'Select Strategic Initiatives'}
              sublabel={
                lang === 'ar'
                  ? 'تشمل المبادرات المنشأة مع الميزانيات المعتمدة والمشاريع الريادية'
                  : 'Includes initiatives with approved budget (SAR M) and flagship projects'
              }
              items={initiatives.map((i) => ({
                id: i.id,
                code: i.code,
                title: i.title,
                titleAr: i.titleAr,
                description: i.description,
                badge: `SAR ${(i.budgetSAR / 1000000).toFixed(1)}M`,
                extra: `Flagship: ${i.keyProjects?.[0] || 'Strategic Project'} • Owner: ${i.owner}`,
              }))}
              selectedIds={selectedInitiativeIds}
              onChange={setSelectedInitiativeIds}
              accentColor="amber"
              placeholder={lang === 'ar' ? 'اختر مبادرات استراتيجية...' : 'Select Strategic Initiatives...'}
              lang={lang}
              manageLink={{ to: '/initiatives', text: lang === 'ar' ? 'فتح سجل المبادرات ↗' : 'Initiatives Register ↗' }}
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
                    ? 'حفظ واعتماد مواءمة الاستراتيجية'
                    : 'Save & Deploy Strategy Cascade'}
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

            {/* Master Strategy Foundation Preview Card */}
            <div className="p-4 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-700/50">
                  {lang === 'ar' ? 'الاستراتيجية المؤسسية المعتمدة' : 'INSTITUTIONAL STRATEGY PLAN'}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  {strategyDuration}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">
                {lang === 'ar' ? strategyNameAr || strategyName : strategyName}
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-2 italic">
                "{lang === 'ar' ? strategyStatementAr || strategyStatement : strategyStatement}"
              </p>
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
                        className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-mono font-bold text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200 shrink-0">
                              {o.code}
                            </span>
                            <span className="font-semibold text-slate-900 truncate">
                              {lang === 'ar' ? o.titleAr || o.title : o.title}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-[10px] text-indigo-700 shrink-0">{o.progress}%</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {o.owner} • {o.department} • FY {o.targetYear}
                        </div>
                        {o.description && (
                          <p className="text-[10px] text-slate-600 line-clamp-1 italic bg-slate-50 p-1 rounded border border-slate-100">
                            {lang === 'ar' ? o.descriptionAr || o.description : o.description}
                          </p>
                        )}
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
                        className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 shrink-0">
                              {k.code}
                            </span>
                            <span className="truncate font-semibold text-slate-800">
                              {lang === 'ar' ? k.nameAr || k.name : k.name}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] font-bold text-slate-900 shrink-0">
                            {k.actual} / {k.target} {k.unit}
                          </span>
                        </div>
                        {k.formula && (
                          <div className="text-[9px] text-slate-500 font-mono truncate">
                            fx: {k.formula}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                          <span>Target 2026: {k.target2026 || '-'}</span>
                          <span>Owner: {k.owner}</span>
                        </div>
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
                    <span>{lang === 'ar' ? 'المبادرات والمشاريع الريادية' : 'Strategic Initiatives'}</span>
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
                        className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 shrink-0">
                              {i.code}
                            </span>
                            <span className="truncate font-semibold text-slate-800">
                              {lang === 'ar' ? i.titleAr || i.title : i.title}
                            </span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded shrink-0">
                            SAR {(i.budgetSAR / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        {i.keyProjects && i.keyProjects[0] && (
                          <div className="text-[10px] text-slate-500 font-medium truncate">
                            ★ {i.keyProjects[0]}
                          </div>
                        )}
                        <div className="text-[9px] text-slate-400 font-mono">
                          Owner: {i.owner} • {i.milestones?.length || 0} Milestones
                        </div>
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

      {/* ======================================================== */}
      {/* MODAL 2: Create Strategic Pillar (Theme)                 */}
      {/* ======================================================== */}
      {isCreatePillarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'إنشاء ركيزة استراتيجية جديدة' : 'Create Strategic Pillar (Theme)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'حدد رمز الركيزة، الوزن والوصف، وسيتم ربطها فوراً بهذه الاستراتيجية'
                      : 'Define pillar code, weighting, titles, and auto-link to this strategy cascade'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreatePillarModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePillarSubmit} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'رمز الركيزة' : 'Pillar Code'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={pillarCode}
                    onChange={(e) => setPillarCode(e.target.value)}
                    placeholder="e.g. 06 or ST-06"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الوزن النسبي (%)' : 'Weight (%)'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={pillarWeight}
                    onChange={(e) => setPillarWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان الركيزة (EN)' : 'Pillar Title (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={pillarTitle}
                  onChange={(e) => setPillarTitle(e.target.value)}
                  placeholder="e.g. Sustainable Digital Innovation & AI"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان الركيزة (AR)' : 'Pillar Title (Arabic)'}
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={pillarTitleAr}
                  onChange={(e) => setPillarTitleAr(e.target.value)}
                  placeholder="مثال: الابتكار الرقمي والذكاء الاصطناعي المستدام"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الوصف الاستراتيجي (EN)' : 'Description (English)'}
                </label>
                <textarea
                  rows={2}
                  value={pillarDesc}
                  onChange={(e) => setPillarDesc(e.target.value)}
                  placeholder="Strategic description and primary institutional focus..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اللون المميز' : 'Theme Accent Color'}
                </label>
                <select
                  value={pillarColor}
                  onChange={(e) => setPillarColor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="blue">Blue (أزرق)</option>
                  <option value="emerald">Emerald (زمردي)</option>
                  <option value="teal">Teal (سماوي مائي)</option>
                  <option value="indigo">Indigo (نيلي)</option>
                  <option value="purple">Purple (بنفسجي)</option>
                  <option value="amber">Amber (كهرماني)</option>
                  <option value="rose">Rose (وردي)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatePillarModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ وربط الركيزة' : 'Save & Link Pillar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: Create Strategic Goal                           */}
      {/* ======================================================== */}
      {isCreateGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'إنشاء هدف استراتيجي جديد' : 'Create Strategic Goal'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'حدد الهدف الاستراتيجي ومواءمته مع الركيزة المختارة'
                      : 'Define strategic goal and align under active organizational pillar'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateGoalModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGoalSubmit} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'رمز الهدف' : 'Goal Code'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={goalCode}
                    onChange={(e) => setGoalCode(e.target.value)}
                    placeholder="e.g. 2.1 or SG-06"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الركيزة التابعة' : 'Strategic Pillar'}
                  </label>
                  <select
                    value={goalThemeId || selectedThemeId}
                    onChange={(e) => setGoalThemeId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                  >
                    {themes.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.code} - {t.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان الهدف الاستراتيجي (EN)' : 'Goal Title (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g. Enrich Community Engagement & Heritage Culture"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان الهدف الاستراتيجي (AR)' : 'Goal Title (Arabic)'}
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={goalTitleAr}
                  onChange={(e) => setGoalTitleAr(e.target.value)}
                  placeholder="مثال: إثراء التفاعل المجتمعي وثقافة التراث"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'وصف الهدف الاستراتيجي' : 'Goal Description'}
                </label>
                <textarea
                  rows={2}
                  value={goalDesc}
                  onChange={(e) => setGoalDesc(e.target.value)}
                  placeholder="Strategic purpose and high-level outcome..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateGoalModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ وربط الهدف' : 'Save & Link Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: Create Strategic Objective (Full Modal)         */}
      {/* ======================================================== */}
      {isCreateObjModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Flag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'إنشاء هدف استراتيجي وتكتيكي جديد (OKR)' : 'Create Strategic Objective (Tactical OKR)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'نفس النموذج المعتمد بسجل الأهداف مع تفاصيل المالك والوصف والسنة المستهدفة'
                      : 'Comprehensive objective form matching Objectives Register'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateObjModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateObjectiveSubmit} className="p-5 space-y-3.5 text-xs overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'رمز الهدف' : 'Objective Code'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formObjCode}
                    onChange={(e) => setFormObjCode(e.target.value)}
                    placeholder="SO-06 or 2.1"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'سنة الاستهداف' : 'Target Year'} *
                  </label>
                  <input
                    type="number"
                    value={formObjTargetYear}
                    onChange={(e) => setFormObjTargetYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان الهدف بالإنجليزية' : 'Objective Title (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={formObjTitle}
                  onChange={(e) => setFormObjTitle(e.target.value)}
                  placeholder="e.g. Elevate Sustainable Heritage & Agri-Tourism Capacity"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان الهدف بالعربية' : 'Objective Title (Arabic)'}
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={formObjTitleAr}
                  onChange={(e) => setFormObjTitleAr(e.target.value)}
                  placeholder="مثال: رفع القدرة الاستيعابية للسياحة الزراعية والتراث المستدام"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الوصف والنطاق الاستراتيجي (EN)' : 'Strategic Description (EN)'}
                </label>
                <textarea
                  rows={2}
                  value={formObjDesc}
                  onChange={(e) => setFormObjDesc(e.target.value)}
                  placeholder="Detailed strategic statement, scope, target audience, and expected outcome..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الوصف والنطاق الاستراتيجي (AR)' : 'Strategic Description (AR)'}
                </label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={formObjDescAr}
                  onChange={(e) => setFormObjDescAr(e.target.value)}
                  placeholder="النطاق الاستراتيجي للهدف، والجهات المستهدفة، والمخرجات المرجوة..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الركيزة الاستراتيجية' : 'Strategic Pillar'} *
                  </label>
                  <select
                    value={formObjThemeId || selectedThemeId}
                    onChange={(e) => setFormObjThemeId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600 cursor-pointer"
                  >
                    {themes.map((th) => (
                      <option key={th.id} value={th.id}>
                        {th.code} - {th.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'القطاع المؤسسي' : 'Sector Alignment'}
                  </label>
                  <select
                    value={formObjSectorId}
                    onChange={(e) => setFormObjSectorId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600 cursor-pointer"
                  >
                    <option value="">{lang === 'ar' ? 'عام / غير محدد' : 'General / Central'}</option>
                    {sectors.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المسؤول' : 'Owner'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formObjOwner}
                    onChange={(e) => setFormObjOwner(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الإدارة' : 'Department'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formObjDept}
                    onChange={(e) => setFormObjDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الحالة الأولية' : 'Initial Status'}
                  </label>
                  <select
                    value={formObjStatus}
                    onChange={(e) => setFormObjStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600 cursor-pointer"
                  >
                    <option value="on-track">{lang === 'ar' ? 'على المسار' : 'On Track'}</option>
                    <option value="at-risk">{lang === 'ar' ? 'معرض للخطر' : 'At Risk'}</option>
                    <option value="behind">{lang === 'ar' ? 'متأخر' : 'Behind'}</option>
                    <option value="achieved">{lang === 'ar' ? 'مكتمل' : 'Achieved'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'نسبة الإنجاز الحالية (%)' : 'Current Progress (%)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formObjProgress}
                    onChange={(e) => setFormObjProgress(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateObjModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ ونشر الهدف' : 'Save & Publish Objective'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: Create KPI (Full Modal with AI Copilot)         */}
      {/* ======================================================== */}
      {isCreateKpiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'إنشاء مؤشر أداء رئيسي جديد (KPI)' : 'Create Key Performance Indicator (KPI)'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'نموذج المؤشرات المتكامل مع معادلة الحساب والمستهدفات ودعم الذكاء الاصطناعي'
                      : 'Comprehensive KPI modal matching KPIs Register with AI Copilot support'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateKpiModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* AI Copilot Suggestion Banner */}
            <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-b border-indigo-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
                  <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                  <span>{lang === 'ar' ? 'مساعد الذكاء الاصطناعي لاقتراح المؤشرات' : 'AI Copilot KPI Recommender'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAiKpiDrawerOpen(!isAiKpiDrawerOpen)}
                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <Cpu className="w-3 h-3" />
                  <span>{isAiKpiDrawerOpen ? (lang === 'ar' ? 'إغلاق المقترحات' : 'Hide Suggestions') : (lang === 'ar' ? 'عرض مقترحات الهيئة' : 'View AI Recommendations')}</span>
                </button>
              </div>

              {isAiKpiDrawerOpen && (
                <div className="mt-3 space-y-2 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {AI_KPI_SUGGESTIONS.map((sug) => (
                      <div
                        key={sug.code}
                        className="p-2.5 bg-white rounded-xl border border-purple-200/80 shadow-2xs flex flex-col justify-between text-left"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono font-bold text-[10px] text-purple-700">{sug.code}</span>
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-50 text-indigo-700">
                              {sug.type}
                            </span>
                          </div>
                          <div className="font-bold text-[11px] text-slate-900 line-clamp-1">
                            {lang === 'ar' ? sug.nameAr : sug.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                            Target: {sug.target2026}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleApplyAiKpiSuggestion(sug)}
                          className="mt-2 w-full py-1 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-lg text-[10px] font-semibold cursor-pointer text-center"
                        >
                          {lang === 'ar' ? 'تطبيق هذا المؤشر' : 'Apply Preset'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleCreateKpiSubmit} className="p-5 space-y-3.5 text-xs overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'رمز المؤشر' : 'KPI Code'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formKpiCode}
                    onChange={(e) => setFormKpiCode(e.target.value)}
                    placeholder="KPI-2.1.1"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الهدف الاستراتيجي المرتبط' : 'Linked Objective'} *
                  </label>
                  <select
                    value={formKpiObjId || (selectedObjectiveIds[0] || objectives[0]?.id || '')}
                    onChange={(e) => setFormKpiObjId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    {objectives.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.code} - {o.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المؤشر بالإنجليزية' : 'Indicator Name (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={formKpiName}
                  onChange={(e) => setFormKpiName(e.target.value)}
                  placeholder="e.g. Cultural Event Visitor Indicator"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المؤشر بالعربية' : 'Indicator Name (Arabic)'}
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={formKpiNameAr}
                  onChange={(e) => setFormKpiNameAr(e.target.value)}
                  placeholder="مثال: مؤشر زوار الفعاليات الثقافية الإقليمية"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-emerald-600 text-right"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'معادلة حساب المؤشر الرياضية' : 'Indicator Calculation Formula'}
                </label>
                <input
                  type="text"
                  value={formKpiFormula}
                  onChange={(e) => setFormKpiFormula(e.target.value)}
                  placeholder="(Total Actual Event Visitors - Target Visitors) / Target * 100%"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase font-mono">
                    {lang === 'ar' ? 'نوع المؤشر' : 'KPI Type'}
                  </label>
                  <select
                    value={formKpiType}
                    onChange={(e) => setFormKpiType(e.target.value as any)}
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-md font-semibold text-slate-800"
                  >
                    <option value="Lagging">{lang === 'ar' ? 'أثر (Lagging)' : 'Lagging'}</option>
                    <option value="Leading">{lang === 'ar' ? 'استباقي (Leading)' : 'Leading'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase font-mono">
                    {lang === 'ar' ? 'الوزن النسبي (%)' : 'Weight (%)'}
                  </label>
                  <input
                    type="number"
                    value={formKpiWeight}
                    onChange={(e) => setFormKpiWeight(Number(e.target.value))}
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase font-mono">
                    {lang === 'ar' ? 'وحدة القياس' : 'Unit'}
                  </label>
                  <input
                    type="text"
                    value={formKpiUnit}
                    onChange={(e) => setFormKpiUnit(e.target.value)}
                    placeholder="%, Score, SAR"
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-md font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase font-mono">
                    {lang === 'ar' ? 'دورية القياس' : 'Frequency'}
                  </label>
                  <select
                    value={formKpiFrequency}
                    onChange={(e) => setFormKpiFrequency(e.target.value as any)}
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800"
                  >
                    <option value="Annual">{lang === 'ar' ? 'سنوي' : 'Annual'}</option>
                    <option value="Quarterly">{lang === 'ar' ? 'ربع سنوي' : 'Quarterly'}</option>
                    <option value="Monthly">{lang === 'ar' ? 'شهري' : 'Monthly'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'خط الأساس' : 'Baseline'}
                  </label>
                  <input
                    type="text"
                    value={formKpiBaseline}
                    onChange={(e) => setFormKpiBaseline(e.target.value)}
                    placeholder="e.g. 50%"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-700 mb-1">
                    {lang === 'ar' ? 'مستهدف 2026' : 'Target 2026'}
                  </label>
                  <input
                    type="text"
                    value={formKpiTarget2026}
                    onChange={(e) => setFormKpiTarget2026(e.target.value)}
                    placeholder="e.g. 75%"
                    className="w-full px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-indigo-700 mb-1">
                    {lang === 'ar' ? 'مستهدف 2027' : 'Target 2027'}
                  </label>
                  <input
                    type="text"
                    value={formKpiTarget2027}
                    onChange={(e) => setFormKpiTarget2027(e.target.value)}
                    placeholder="e.g. 85%"
                    className="w-full px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateKpiModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ ونشر المؤشر' : 'Save & Publish KPI'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 6: Create Initiative (Full Modal with AI Copilot)  */}
      {/* ======================================================== */}
      {isCreateInitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'إنشاء مبادرة استراتيجية ومشروع ريادي' : 'Create Strategic Initiative & Flagship Project'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'نموذج المبادرات المتكامل مع الميزانية (SAR M) والمخرجات ودعم الذكاء الاصطناعي'
                      : 'Comprehensive initiative form matching Initiatives Register with AI Copilot support'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateInitModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* AI Copilot Suggestion Banner */}
            <div className="p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/50 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>{lang === 'ar' ? 'مساعد الذكاء الاصطناعي لاقتراح حزم المبادرات' : 'AI Copilot Initiative Generator'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAiInitDrawerOpen(!isAiInitDrawerOpen)}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <Cpu className="w-3 h-3" />
                  <span>{isAiInitDrawerOpen ? (lang === 'ar' ? 'إغلاق المقترحات' : 'Hide Suggestions') : (lang === 'ar' ? 'عرض مبادرات الهيئة الريادية' : 'View Flagship Packages')}</span>
                </button>
              </div>

              {isAiInitDrawerOpen && (
                <div className="mt-3 space-y-2 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {AI_INITIATIVE_SUGGESTIONS.map((sug) => (
                      <div
                        key={sug.code}
                        className="p-2.5 bg-white rounded-xl border border-amber-200 shadow-2xs flex flex-col justify-between text-left"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono font-bold text-[10px] text-amber-700">{sug.code}</span>
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-800">
                              SAR {(sug.budget / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="font-bold text-[11px] text-slate-900 line-clamp-1">
                            {lang === 'ar' ? sug.titleAr : sug.title}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                            {sug.description}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleApplyAiInitSuggestion(sug)}
                          className="mt-2 w-full py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[10px] font-semibold cursor-pointer text-center"
                        >
                          {lang === 'ar' ? 'تطبيق هذه المبادرة' : 'Apply Package'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleCreateInitSubmit} className="p-5 space-y-3.5 text-xs overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'رمز المبادرة' : 'Initiative Code'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formInitCode}
                    onChange={(e) => setFormInitCode(e.target.value)}
                    placeholder="INIT-06"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الهدف الاستراتيجي المرتبط' : 'Linked Objective'} *
                  </label>
                  <select
                    value={formInitObjId || (selectedObjectiveIds[0] || objectives[0]?.id || '')}
                    onChange={(e) => setFormInitObjId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-600 cursor-pointer"
                  >
                    {objectives.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.code} - {o.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان المبادرة بالإنجليزية' : 'Initiative Title (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={formInitTitle}
                  onChange={(e) => setFormInitTitle(e.target.value)}
                  placeholder="e.g. Raise Awareness of Al-Ahsa Regional Strategy"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان المبادرة بالعربية' : 'Initiative Title (Arabic)'}
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={formInitTitleAr}
                  onChange={(e) => setFormInitTitleAr(e.target.value)}
                  placeholder="مثال: رفع الوعي باستراتيجية تطوير الأحساء والمشاركة المجتمعية"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-amber-600 text-right"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'المشروع الريادي الرئيسي (Flagship Project)' : 'Flagship Project Name'}
                </label>
                <input
                  type="text"
                  value={formInitKeyProject}
                  onChange={(e) => setFormInitKeyProject(e.target.value)}
                  placeholder="e.g. Al-Ahsa Regional Event Storytelling Project"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الميزانية المعتمدة (SAR)' : 'Total Budget (SAR)'}
                  </label>
                  <input
                    type="number"
                    value={formInitBudget}
                    onChange={(e) => setFormInitBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المسؤول' : 'Owner'}
                  </label>
                  <input
                    type="text"
                    value={formInitOwner}
                    onChange={(e) => setFormInitOwner(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الإدارة المنفذة' : 'Department'}
                </label>
                <input
                  type="text"
                  value={formInitDept}
                  onChange={(e) => setFormInitDept(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateInitModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ ونشر المبادرة' : 'Save & Publish Initiative'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
