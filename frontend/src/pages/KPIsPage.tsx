import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { KPI } from '../types';
import {
  BarChart3,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  X,
  Target,
  Sparkles,
  Calculator,
  Calendar,
  Layers,
  ArrowRight,
  Zap,
  Check,
  Cpu,
  Edit2,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

export const KPIsPage: React.FC = () => {
  const navigate = useNavigate();
  const { kpis, objectives, themes, addKPI, updateKPI, deleteKPI, setDemoJourneyStep, lang, t } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Edit KPI state
  const [editingKpi, setEditingKpi] = useState<KPI | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editNameAr, setEditNameAr] = useState('');
  const [editTarget, setEditTarget] = useState(100);
  const [editActual, setEditActual] = useState(0);
  const [editUnit, setEditUnit] = useState('%');
  const [editFrequency, setEditFrequency] = useState<'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual'>('Quarterly');
  const [editStatus, setEditStatus] = useState<'on-track' | 'warning' | 'critical' | 'achieved'>('on-track');
  const [editFormula, setEditFormula] = useState('');
  const [editBaseline, setEditBaseline] = useState('');
  const [editTarget2026, setEditTarget2026] = useState('');
  const [editTarget2027, setEditTarget2027] = useState('');

  const openEditModal = (k: KPI) => {
    setEditingKpi(k);
    setEditName(k.name);
    setEditNameAr(k.nameAr || '');
    setEditTarget(k.target);
    setEditActual(k.actual);
    setEditUnit(k.unit || '%');
    setEditFrequency(k.frequency);
    setEditStatus(k.status);
    setEditFormula(k.formula || '');
    setEditBaseline(String(k.baseline || ''));
    setEditTarget2026(String(k.target2026 || ''));
    setEditTarget2027(String(k.target2027 || ''));
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKpi) return;
    updateKPI(editingKpi.id, {
      name: editName.trim(),
      nameAr: editNameAr.trim() || undefined,
      target: Number(editTarget),
      actual: Number(editActual),
      unit: editUnit.trim() || '%',
      frequency: editFrequency,
      status: editStatus,
      formula: editFormula.trim() || undefined,
      baseline: editBaseline.trim() || undefined,
      target2026: editTarget2026.trim() || undefined,
      target2027: editTarget2027.trim() || undefined,
    });
    setIsEditModalOpen(false);
    setEditingKpi(null);
  };

  // AI Copilot state
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);
  const [aiObjectiveContext, setAiObjectiveContext] = useState(objectives[0]?.id || 'obj-1');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Form State for Create KPI
  const [formCode, setFormCode] = useState(`KPI-0${kpis.length + 1}`);
  const [formName, setFormName] = useState('');
  const [formNameAr, setFormNameAr] = useState('');
  const [formObjectiveId, setFormObjectiveId] = useState(objectives[0]?.id || 'obj-1');
  const [formFormula, setFormFormula] = useState('');
  const [formUnit, setFormUnit] = useState('%');
  const [formTarget, setFormTarget] = useState(100);
  const [formActual, setFormActual] = useState(0);
  const [formBaseline, setFormBaseline] = useState('0%');
  const [formTarget2026, setFormTarget2026] = useState('100%');
  const [formTarget2027, setFormTarget2027] = useState('100%');
  const [formFrequency, setFormFrequency] = useState<'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual'>('Quarterly');
  const [formStatus, setFormStatus] = useState<'on-track' | 'warning' | 'critical' | 'achieved'>('on-track');
  const [formType, setFormType] = useState<'Leading' | 'Lagging'>('Lagging');
  const [formWeight, setFormWeight] = useState(25);
  const [formStrategicInitiative, setFormStrategicInitiative] = useState('');
  const [formKeyProject, setFormKeyProject] = useState('');

  // Pre-configured AI suggestions based on AHDA Strategy
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
      rationale: 'Strategic metric tracking cultural oasis visitation volume and community participation.',
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
      rationale: 'Predictive leading indicator measuring online citizen sentiment and feedback loops.',
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
      rationale: 'Macro socio-economic metric evaluating community alignment with the 2030 development agenda.',
    },
  ];

  const handleApplyAiSuggestion = (suggestion: typeof AI_KPI_SUGGESTIONS[0]) => {
    setFormCode(suggestion.code);
    setFormName(suggestion.name);
    setFormNameAr(suggestion.nameAr);
    setFormFormula(suggestion.formula);
    setFormUnit(suggestion.unit);
    setFormTarget(suggestion.target);
    setFormActual(suggestion.actual);
    setFormBaseline(suggestion.baseline);
    setFormTarget2026(suggestion.target2026);
    setFormTarget2027(suggestion.target2027);
    setFormFrequency(suggestion.frequency);
    setFormType(suggestion.type);
    setFormWeight(suggestion.weight);
    setFormStrategicInitiative(suggestion.initiative);
    setFormKeyProject(suggestion.project);

    setIsAiCopilotOpen(false);
    toast.success(
      lang === 'ar' ? 'تم تطبيق مقترح الذكاء الاصطناعي بنجاح' : 'AI Copilot Recommendation Applied!',
      {
        description: `${suggestion.code}: ${suggestion.name}`,
      }
    );
  };

  // Metrics
  const totalCount = kpis.length;
  const achievedCount = kpis.filter((k) => k.achievementPct >= 100 || k.status === 'achieved').length;
  const onTrackCount = kpis.filter((k) => k.status === 'on-track').length;
  const warningCount = kpis.filter((k) => k.status === 'warning' || k.status === 'critical').length;
  const avgAchievement =
    totalCount > 0 ? Math.round(kpis.reduce((sum, k) => sum + k.achievementPct, 0) / totalCount) : 0;

  // Filtered KPIs
  const filteredKPIs = kpis.filter((kpi) => {
    const matchesSearch =
      kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (kpi.nameAr && kpi.nameAr.includes(searchTerm)) ||
      kpi.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (kpi.formula && kpi.formula.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (kpi.keyProject && kpi.keyProject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      kpi.owner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesObjective = selectedObjectiveId === 'all' || kpi.objectiveId === selectedObjectiveId;
    const matchesStatus = selectedStatus === 'all' || kpi.status === selectedStatus;
    const matchesFrequency = selectedFrequency === 'all' || kpi.frequency === selectedFrequency;

    return matchesSearch && matchesObjective && matchesStatus && matchesFrequency;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const matchedObj = objectives.find((o) => o.id === formObjectiveId);

    addKPI({
      code: formCode.trim() || `KPI-0${kpis.length + 1}`,
      name: formName.trim(),
      nameAr: formNameAr.trim() || undefined,
      objectiveId: formObjectiveId,
      objectiveTitle: matchedObj ? matchedObj.title : 'Strategic Objective',
      objectiveTitleAr: matchedObj ? matchedObj.titleAr : undefined,
      unit: formUnit.trim() || '%',
      target: Number(formTarget),
      actual: Number(formActual),
      achievementPct: formTarget > 0 ? Math.min(100, Math.round((Number(formActual) / Number(formTarget)) * 100)) : 0,
      frequency: formFrequency,
      status: formStatus,
      type: formType,
      weight: formWeight,
      owner: matchedObj?.owner || 'Strategic Officer',
      formula: formFormula.trim() || undefined,
      baseline: formBaseline || '-',
      target2026: formTarget2026 || `${formTarget}${formUnit}`,
      target2027: formTarget2027 || `${formTarget}${formUnit}`,
      strategicInitiative: formStrategicInitiative.trim() || undefined,
      keyProject: formKeyProject.trim() || undefined,
      pillarCode: matchedObj?.code?.split('-')[0] || '02',
      pillarTitle: matchedObj?.themeName || '02 People and Society',
    });

    setIsCreateModalOpen(false);
    toast.success(lang === 'ar' ? 'تم إنشاء مؤشر الأداء بنجاح' : 'KPI Created Successfully');

    // Reset Form
    setFormCode(`KPI-0${kpis.length + 2}`);
    setFormName('');
    setFormNameAr('');
    setFormFormula('');
  };

  const columns: Column<KPI>[] = [
    {
      header: t('KPI Code & Identity'),
      accessorKey: 'code',
      sortable: true,
      cell: (k) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {k.code}
            </span>
            {k.type && (
              <span
                className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold ${k.type === 'Leading'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
              >
                {k.type}
              </span>
            )}
            {k.weight && (
              <span className="text-[9px] font-mono text-slate-500 bg-slate-100 px-1 py-0.2 rounded">
                {k.weight}% wt
              </span>
            )}
          </div>
          <div className="font-semibold text-xs text-slate-900 mt-1">
            {lang === 'ar' ? k.nameAr || k.name : k.name}
          </div>
          {k.formula && (
            <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5 max-w-md truncate">
              <Calculator className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{k.formula}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: t('Strategic Objective'),
      accessorKey: 'objectiveTitle',
      sortable: true,
      cell: (k) => (
        <div className="max-w-xs">
          <span className="text-xs text-slate-800 line-clamp-1 font-medium">
            {lang === 'ar' ? k.objectiveTitleAr || k.objectiveTitle : k.objectiveTitle}
          </span>
          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
            {k.pillarTitle || 'Pillar 02'}
          </span>
        </div>
      ),
    },
    {
      header: t('Multi-Year Targets'),
      cell: (k) => (
        <div className="text-[11px] font-mono text-slate-600 space-y-0.5">
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[9px]">Base:</span>
            <span className="font-semibold">{k.baseline || '-'}</span>
          </div>
          <div className="flex items-center gap-1 text-blue-700">
            <span className="text-slate-400 text-[9px]">2026:</span>
            <span className="font-bold">{k.target2026 || `${k.target}${k.unit}`}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700">
            <span className="text-slate-400 text-[9px]">2027:</span>
            <span className="font-bold">{k.target2027 || `${k.target}${k.unit}`}</span>
          </div>
        </div>
      ),
    },
    {
      header: t('Actual vs Target'),
      accessorKey: 'actual',
      sortable: true,
      cell: (k) => (
        <div className="space-y-1 min-w-[120px]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-900">
              {k.actual} {k.unit}
            </span>
            <span className="text-slate-400">/ {k.target}</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${k.achievementPct >= 100
                  ? 'bg-emerald-500'
                  : k.achievementPct >= 70
                    ? 'bg-blue-600'
                    : 'bg-amber-500'
                }`}
              style={{ width: `${Math.min(100, k.achievementPct)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-500 block">
            {k.achievementPct}% {lang === 'ar' ? 'إنجاز' : 'Achieved'}
          </span>
        </div>
      ),
    },
    {
      header: t('Frequency & Polarity'),
      accessorKey: 'frequency',
      sortable: true,
      cell: (k) => (
        <div className="text-xs">
          <span className="font-mono text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {k.frequency}
          </span>
          <span className="text-[10px] text-slate-400 block font-mono mt-1">{k.owner}</span>
        </div>
      ),
    },
    {
      header: t('Status'),
      accessorKey: 'status',
      sortable: true,
      cell: (k) => <StatusBadge status={k.status} />,
    },
    {
      header: lang === 'ar' ? 'الإجراءات' : 'Actions',
      cell: (k) => (
        <div className="flex items-center gap-1.5 justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(k);
            }}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title={lang === 'ar' ? 'تعديل المؤشر' : 'Edit KPI'}
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(lang === 'ar' ? `هل أنت متأكد من حذف مؤشر الأداء "${k.name}"؟` : `Delete KPI "${k.name}"?`)) {
                deleteKPI(k.id);
              }
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title={lang === 'ar' ? 'حذف المؤشر' : 'Delete KPI'}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
            <span className="font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              {lang === 'ar' ? 'مؤشرات قياس الأداء المؤسسي' : 'PERFORMANCE TELEMETRY & DICTIONARY'}
            </span>
            <span className="text-slate-300">/</span>
            <span>{lang === 'ar' ? 'سجل المؤشرات والمعادلات الرياضية' : 'KPI Register & Mathematical Formulas'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'مؤشرات الأداء الرئيسية (KPIs)' : 'Key Performance Indicators (KPIs)'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {lang === 'ar'
              ? 'متابعة المؤشرات المعتمدة مع المعادلات الرياضية، والمستهدفات متعددة السنوات (2026/2027)، ودعم مدمج بالذكاء الاصطناعي لاقتراح وصياغة المؤشرات.'
              : 'Measurable telemetry metrics with mathematical calculation formulas, multi-year targets (2026/2027), and embedded AI Copilot capabilities.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Copilot Button */}
          <button
            type="button"
            onClick={() => {
              setIsAiCopilotOpen(true);
              setIsCreateModalOpen(true);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5 cursor-pointer animate-pulse"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{lang === 'ar' ? '✨ مساعد الذكاء الاصطناعي للمؤشرات' : '✨ AI KPI Copilot'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إضافة مؤشر أداء' : 'Create KPI'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">{t('Total KPIs')}</div>
            <div className="text-xl font-extrabold text-slate-900 font-mono">{totalCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">{t('On Track')}</div>
            <div className="text-xl font-extrabold text-emerald-700 font-mono">{onTrackCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">{t('Attention / Risk')}</div>
            <div className="text-xl font-extrabold text-amber-700 font-mono">{warningCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">{t('Avg Achievement')}</div>
            <div className="text-xl font-extrabold text-indigo-700 font-mono">{avgAchievement}%</div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'ar' ? 'بحث بالاسم أو الرمز أو المعادلة...' : 'Search by code, formula, title...'}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedObjectiveId}
            onChange={(e) => setSelectedObjectiveId(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">{lang === 'ar' ? 'جميع الأهداف' : 'All Objectives'}</option>
            {objectives.map((o) => (
              <option key={o.id} value={o.id}>
                {o.code} - {o.title}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">{lang === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="on-track">{lang === 'ar' ? 'على المسار' : 'On Track'}</option>
            <option value="warning">{lang === 'ar' ? 'تحذير' : 'Warning'}</option>
            <option value="critical">{lang === 'ar' ? 'حرج' : 'Critical'}</option>
            <option value="achieved">{lang === 'ar' ? 'محقق' : 'Achieved'}</option>
          </select>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        title={t('Official Strategic KPIs Register')}
        subtitle={t('Measurable telemetry metrics with mathematical equations and multi-year benchmarks')}
        data={filteredKPIs}
        columns={columns}
      />

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={11}
        stageTitle="KPI Dictionary, Technical Formulas & Target Benchmarks"
        stageTitleAr="قاموس المؤشرات والصيغ الحسابية والمستهدفات"
        prevStage={{
          stage: 10,
          title: "Strategy Map & Cards",
          titleAr: "خريطة الاستراتيجية",
          path: "/strategy-map",
        }}
        nextStage={{
          stage: 12,
          title: "Departmental Cascading",
          titleAr: "المواءمة الإدارية التنازلية",
          path: "/departmental-cascade",
        }}
        relatedLinks={[
          { title: "Strategic Initiatives", titleAr: "المبادرات الاستراتيجية", path: "/initiatives" },
          { title: "Performance Collection", titleAr: "جمع الأداء", path: "/performance/collection" },
          { title: "Strategy Matrix", titleAr: "مصفوفة الاستراتيجية", path: "/strategy" },
        ]}
      />

      {/* CREATE KPI MODAL WITH EMBEDDED AI COPILOT */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {lang === 'ar' ? 'إضافة مؤشر أداء جديد (KPI)' : 'Create New Performance Indicator (KPI)'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'تحديد صيغة الحساب والمستهدفات السنوية للمؤشر' : 'Define telemetry metric, calculation formula, and annual benchmarks'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsAiCopilotOpen(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI COPILOT BANNER & DRAWER */}
            <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-b border-indigo-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-purple-950">
                      {lang === 'ar' ? 'مساعد الذكاء الاصطناعي لاقتراح وصياغة المؤشرات' : 'Antigravity AI Strategy Copilot'}
                    </h4>
                    <span className="text-[10px] text-purple-700 font-mono">
                      {lang === 'ar' ? 'اقتراح معادلات رياضية ومستهدفات ذكية متوائمة مع الهدف' : 'Recommends official equations, targets, and leading/lagging classification'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAiCopilotOpen(!isAiCopilotOpen)}
                  className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-lg text-[11px] font-bold shadow-2xs transition-all cursor-pointer"
                >
                  {isAiCopilotOpen ? (lang === 'ar' ? 'إخفاء المقترحات' : 'Hide Suggestions') : (lang === 'ar' ? 'عرض مقترحات AI' : '✨ Show AI Options')}
                </button>
              </div>

              {/* Expanded AI Recommendations */}
              {isAiCopilotOpen && (
                <div className="mt-3 pt-3 border-t border-purple-200/60 space-y-2 animate-in fade-in slide-in-from-top-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-purple-900 block">
                    {lang === 'ar' ? '3 مقترحات معتمدة مستخلصة من وثائق الاستراتيجية:' : '3 Recommended KPIs Generated for Selected Objective:'}
                  </span>
                  <div className="space-y-1.5">
                    {AI_KPI_SUGGESTIONS.map((sug, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-white rounded-xl border border-purple-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-purple-400 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                              {sug.code}
                            </span>
                            <span className="font-bold text-xs text-slate-900">
                              {lang === 'ar' ? sug.nameAr : sug.name}
                            </span>
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                              {sug.type}
                            </span>
                          </div>
                          <p className="text-[10px] font-mono text-slate-500 mt-0.5 truncate max-w-md">
                            f(x): {sug.formula}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleApplyAiSuggestion(sug)}
                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-semibold shrink-0 cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'تطبيق المقترح' : 'Apply Suggestion'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main KPI Form */}
            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'رمز المؤشر' : 'KPI Code'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
                    placeholder="KPI-2.1.1"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الهدف الاستراتيجي المرتبط' : 'Linked Strategic Objective'} *
                  </label>
                  <select
                    value={formObjectiveId}
                    onChange={(e) => setFormObjectiveId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 truncate"
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
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  placeholder="e.g. Event Visitor Indicator"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم المؤشر بالعربية' : 'Indicator Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formNameAr}
                  onChange={(e) => setFormNameAr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-blue-600 text-right"
                  placeholder="مثال: مؤشر زوار الفعاليات"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'معادلة حساب المؤشر الرياضية' : 'Indicator Calculation Formula'}
                </label>
                <input
                  type="text"
                  value={formFormula}
                  onChange={(e) => setFormFormula(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  placeholder="(Total Actual Event Visitors - Total Targeted Visitors) * 100%"
                />
              </div>

              {/* KPI Attributes: Type (Leading / Lagging) and Weighting */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase font-mono">
                    {lang === 'ar' ? 'نوع المؤشر' : 'KPI Type'}
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-md font-semibold text-slate-800"
                  >
                    <option value="Lagging">{lang === 'ar' ? 'مؤشر أثر (Lagging)' : 'Lagging (Outcome)'}</option>
                    <option value="Leading">{lang === 'ar' ? 'مؤشر استباقي (Leading)' : 'Leading (Driver)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase font-mono">
                    {lang === 'ar' ? 'الوزن النسبي (%)' : 'Weight (%)'}
                  </label>
                  <input
                    type="number"
                    value={formWeight}
                    onChange={(e) => setFormWeight(Number(e.target.value))}
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase font-mono">
                    {lang === 'ar' ? 'وحدة القياس' : 'Unit'}
                  </label>
                  <input
                    type="text"
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-md font-mono text-slate-800"
                    placeholder="%, Score, Days"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase font-mono">
                    {lang === 'ar' ? 'دورية القياس' : 'Frequency'}
                  </label>
                  <select
                    value={formFrequency}
                    onChange={(e) => setFormFrequency(e.target.value as any)}
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800"
                  >
                    <option value="Annual">{lang === 'ar' ? 'سنوي' : 'Annual'}</option>
                    <option value="Quarterly">{lang === 'ar' ? 'ربع سنوي' : 'Quarterly'}</option>
                    <option value="Monthly">{lang === 'ar' ? 'شهري' : 'Monthly'}</option>
                  </select>
                </div>
              </div>

              {/* Multi-Year Targets */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'خط الأساس' : 'Baseline'}
                  </label>
                  <input
                    type="text"
                    value={formBaseline}
                    onChange={(e) => setFormBaseline(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    placeholder="e.g. 50%"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-blue-700 mb-1">
                    {lang === 'ar' ? 'مستهدف 2026' : 'Target 2026'}
                  </label>
                  <input
                    type="text"
                    value={formTarget2026}
                    onChange={(e) => setFormTarget2026(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-blue-200 rounded-lg text-blue-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-700 mb-1">
                    {lang === 'ar' ? 'مستهدف 2027' : 'Target 2027'}
                  </label>
                  <input
                    type="text"
                    value={formTarget2027}
                    onChange={(e) => setFormTarget2027(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-emerald-200 rounded-lg text-emerald-900 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Targets */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المستهدف الرقمي' : 'Numeric Target'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={formTarget}
                    onChange={(e) => setFormTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'القياس الفعلي الحالي' : 'Current Actual'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={formActual}
                    onChange={(e) => setFormActual(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ ونشر المؤشر' : 'Save & Publish KPI'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit KPI Modal */}
      {isEditModalOpen && editingKpi && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {lang === 'ar' ? `تعديل مؤشر الأداء (${editingKpi.code})` : `Edit KPI (${editingKpi.code})`}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {lang === 'ar' ? 'تحديث المستهدفات، والقياس الفعلي، والصيغة الرياضية' : 'Update telemetry target, current actual, and mathematical formula'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'اسم المؤشر بالإنجليزية' : 'KPI Name (EN)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'اسم المؤشر بالعربية' : 'KPI Name (AR)'}
                  </label>
                  <input
                    type="text"
                    value={editNameAr}
                    onChange={(e) => setEditNameAr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المستهدف الإجمالي' : 'Target Value'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={editTarget}
                    onChange={(e) => setEditTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'القياس الفعلي' : 'Current Actual'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={editActual}
                    onChange={(e) => setEditActual(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'وحدة القياس' : 'Unit'}
                  </label>
                  <input
                    type="text"
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'دورية القياس' : 'Frequency'}
                  </label>
                  <select
                    value={editFrequency}
                    onChange={(e) => setEditFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  >
                    <option value="Monthly">{lang === 'ar' ? 'شهري' : 'Monthly'}</option>
                    <option value="Quarterly">{lang === 'ar' ? 'ربعي' : 'Quarterly'}</option>
                    <option value="Bi-Annual">{lang === 'ar' ? 'نصف سنوي' : 'Bi-Annual'}</option>
                    <option value="Annual">{lang === 'ar' ? 'سنوي' : 'Annual'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'حالة الإنجاز' : 'Status'}
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  >
                    <option value="on-track">{lang === 'ar' ? 'على المسار' : 'On Track'}</option>
                    <option value="warning">{lang === 'ar' ? 'يحتاج متابعة' : 'Warning'}</option>
                    <option value="critical">{lang === 'ar' ? 'حرج / متأخر' : 'Critical'}</option>
                    <option value="achieved">{lang === 'ar' ? 'متحقق بالكامل' : 'Achieved'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'المعادلة الرياضية وطريقة الاحتساب' : 'Calculation Formula'}
                </label>
                <input
                  type="text"
                  value={editFormula}
                  onChange={(e) => setEditFormula(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
