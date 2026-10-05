import React, { useState } from 'react';
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
} from 'lucide-react';

export const KPIsPage: React.FC = () => {
  const { kpis, objectives, themes, addKPI, lang, t } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
  const [formStrategicInitiative, setFormStrategicInitiative] = useState('');
  const [formKeyProject, setFormKeyProject] = useState('');

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
      owner: matchedObj?.owner || 'Strategic Officer',
      formula: formFormula.trim() || undefined,
      baseline: formBaseline || '-',
      target2026: formTarget2026 || `${formTarget}${formUnit}`,
      target2027: formTarget2027 || `${formTarget}${formUnit}`,
      strategicInitiative: formStrategicInitiative.trim() || undefined,
      keyProject: formKeyProject.trim() || undefined,
      pillarCode: matchedObj?.code?.split('-')[0] || '01',
      pillarTitle: matchedObj?.themeName || 'Pillar',
      sectorId: matchedObj?.sectorId,
      sectorName: matchedObj?.sectorName,
    });

    setIsCreateModalOpen(false);
    setFormName('');
    setFormNameAr('');
    setFormCode(`KPI-0${kpis.length + 2}`);
  };

  const columns: Column<KPI>[] = [
    {
      header: t('KPI Code'),
      accessorKey: 'code',
      sortable: true,
      width: '110px',
      cell: (k) => (
        <div className="flex items-center space-x-1.5">
          <span className="font-mono font-bold text-slate-900">{k.code}</span>
          {k.isCustom && (
            <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
              {lang === 'ar' ? 'جديد' : 'NEW'}
            </span>
          )}
        </div>
      ),
    },
    {
      header: t('Indicator Name'),
      accessorKey: 'name',
      sortable: true,
      cell: (k) => (
        <div>
          <div className="font-semibold text-slate-900">{lang === 'ar' ? (k.nameAr || k.name) : k.name}</div>
          {lang !== 'ar' && k.nameAr && (
            <div className="text-[11px] text-slate-400 font-sans mt-0.5">{k.nameAr}</div>
          )}
          {k.formula && (
            <div className="text-[10px] font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded mt-1 max-w-sm truncate border border-slate-200/60">
              <span className="text-slate-400 font-bold">{lang === 'ar' ? 'المعادلة:' : 'Formula:'}</span> {k.formula}
            </div>
          )}
        </div>
      ),
    },
    {
      header: t('Target Objectives'),
      accessorKey: 'objectiveTitle',
      sortable: true,
      cell: (k) => (
        <div className="text-xs">
          <div className="font-medium text-slate-800 line-clamp-1">
            {lang === 'ar' ? (k.objectiveTitleAr || k.objectiveTitle) : k.objectiveTitle}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{k.pillarTitle || 'Strategic Pillar'}</div>
        </div>
      ),
    },
    {
      header: t('Baseline'),
      accessorKey: 'baseline',
      sortable: true,
      width: '90px',
      cell: (k) => <span className="font-mono text-xs text-slate-600">{String(k.baseline || '-')}</span>,
    },
    {
      header: t('Target 2026'),
      accessorKey: 'target2026',
      sortable: true,
      width: '100px',
      cell: (k) => <span className="font-mono text-xs font-semibold text-blue-700">{String(k.target2026 || '-')}</span>,
    },
    {
      header: t('Actual Measurement'),
      accessorKey: 'actual',
      sortable: true,
      width: '130px',
      cell: (k) => (
        <div className="font-mono text-xs">
          <span className="font-bold text-slate-900">{k.actual}</span>
          <span className="text-slate-400 mx-1">/</span>
          <span className="text-slate-500">{k.target} {k.unit}</span>
        </div>
      ),
    },
    {
      header: t('Achievement %'),
      accessorKey: 'achievementPct',
      sortable: true,
      width: '120px',
      cell: (k) => (
        <div className="flex items-center gap-2">
          <div className="w-14 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                k.achievementPct >= 100
                  ? 'bg-emerald-600'
                  : k.achievementPct >= 70
                  ? 'bg-blue-600'
                  : k.achievementPct >= 50
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, k.achievementPct)}%` }}
            />
          </div>
          <span className="font-mono font-bold text-xs text-slate-900">{k.achievementPct}%</span>
        </div>
      ),
    },
    {
      header: lang === 'ar' ? 'الدورية' : 'Frequency',
      accessorKey: 'frequency',
      sortable: true,
      width: '100px',
      cell: (k) => (
        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
          {t(k.frequency)}
        </span>
      ),
    },
    {
      header: t('Status'),
      accessorKey: 'status',
      sortable: true,
      width: '110px',
      cell: (k) => <StatusBadge status={k.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-600 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>{t('AL AHSA DEVELOPMENT AUTHORITY • PERFORMANCE TELEMETRY')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'مؤشرات قياس الأداء الرئيسية (KPIs)' : 'Key Performance Indicators (KPIs)'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'ar'
              ? 'متابعة القياسات الفعلية اللحظية مقارنة بالمستهدفات الاستراتيجية ومعادلات القياس للمشاريع والمبادرات.'
              : 'Live actual measurements vs strategic target metrics, indicator calculation formulas, and client sector deliverables.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>{lang === 'ar' ? 'إضافة مؤشر أداء' : 'Create KPI'}</span>
        </button>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
            {lang === 'ar' ? 'إجمالي المؤشرات' : 'Total KPIs'}
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">{totalCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'المؤشرات النشطة في المنظومة' : 'Active telemetry indicators'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-emerald-600 uppercase font-semibold">
            {lang === 'ar' ? 'محققة بالكامل' : 'Achieved (>=100%)'}
          </div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">{achievedCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'تم استيفاء المستهدف المحدد' : 'Exceeded target baseline'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-blue-600 uppercase font-semibold">
            {lang === 'ar' ? 'على المسار' : 'On Track'}
          </div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">{onTrackCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'ضمن الحدود الآمنة' : 'Pacing towards 2026/2027'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-amber-600 uppercase font-semibold">
            {lang === 'ar' ? 'تتطلب انتباهاً' : 'Needs Attention'}
          </div>
          <div className="text-xl font-bold font-mono text-amber-700 mt-1">{warningCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'تحذير أو فجوة قياس' : 'Warning & critical deviation'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-4 rounded-xl text-white shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-indigo-300 uppercase font-semibold">
              {lang === 'ar' ? 'متوسط التحقيق' : 'Avg Achievement'}
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">{avgAchievement}%</div>
          <div className="text-[10px] text-slate-400 font-mono">
            {lang === 'ar' ? 'مؤشر أداء المنظومة الكلي' : 'Overall telemetry score'}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className={`w-3.5 h-3.5 absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'ar' ? 'بحث بالرمز، المؤشر، المعادلة، أو المشروع...' : 'Search by code, indicator, formula, or project...'}
              className={`w-full ${lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600`}
            />
          </div>

          {/* Objective Filter */}
          <select
            value={selectedObjectiveId}
            onChange={(e) => setSelectedObjectiveId(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-600 max-w-[200px] truncate"
          >
            <option value="all">{lang === 'ar' ? 'جميع الأهداف' : 'All Objectives'}</option>
            {objectives.map((o) => (
              <option key={o.id} value={o.id}>
                {o.code} - {lang === 'ar' ? (o.titleAr || o.title) : o.title}
              </option>
            ))}
          </select>

          {/* Frequency Filter */}
          <select
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-600"
          >
            <option value="all">{lang === 'ar' ? 'جميع الدوريات' : 'All Frequencies'}</option>
            <option value="Monthly">{lang === 'ar' ? 'شهري' : 'Monthly'}</option>
            <option value="Quarterly">{lang === 'ar' ? 'ربع سنوي' : 'Quarterly'}</option>
            <option value="Bi-Annual">{lang === 'ar' ? 'نصف سنوي' : 'Bi-Annual'}</option>
            <option value="Annual">{lang === 'ar' ? 'سنوي' : 'Annual'}</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-600"
          >
            <option value="all">{lang === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="on-track">{lang === 'ar' ? 'على المسار' : 'On Track'}</option>
            <option value="warning">{lang === 'ar' ? 'تحذير' : 'Warning'}</option>
            <option value="critical">{lang === 'ar' ? 'حرج' : 'Critical'}</option>
            <option value="achieved">{lang === 'ar' ? 'محقق' : 'Achieved'}</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-500">
          {lang === 'ar' ? `العدد: ${filteredKPIs.length}` : `Count: ${filteredKPIs.length}`}
        </div>
      </div>

      {/* Main Table */}
      <DataTable
        title={t('Key Performance Indicator (KPI) Management')}
        subtitle={t('Real-time actual measurements vs strategic target metrics')}
        data={filteredKPIs}
        columns={columns}
      />

      {/* Create KPI Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
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
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                    placeholder="KPI-09"
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
                  placeholder="e.g. Visitor Growth Index in Historical Districts"
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-blue-600"
                  placeholder="مثال: مؤشر نمو الزوار في المناطق والواحات التاريخية"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'معادلة حساب المؤشر' : 'Indicator Calculation Formula'}
                </label>
                <input
                  type="text"
                  value={formFormula}
                  onChange={(e) => setFormFormula(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  placeholder="(Current Period Footfall / Baseline Footfall) * 100"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'وحدة القياس' : 'Unit'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                    placeholder="%, SAR, Count"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المستهدف' : 'Target'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={formTarget}
                    onChange={(e) => setFormTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'القياس الفعلي' : 'Actual'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={formActual}
                    onChange={(e) => setFormActual(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'خط الأساس' : 'Baseline'}
                  </label>
                  <input
                    type="text"
                    value={formBaseline}
                    onChange={(e) => setFormBaseline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                    placeholder="e.g. 50%"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'مستهدف 2026' : 'Target 2026'}
                  </label>
                  <input
                    type="text"
                    value={formTarget2026}
                    onChange={(e) => setFormTarget2026(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                    placeholder="e.g. 85%"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'مستهدف 2027' : 'Target 2027'}
                  </label>
                  <input
                    type="text"
                    value={formTarget2027}
                    onChange={(e) => setFormTarget2027(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                    placeholder="e.g. 95%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'دورية القياس' : 'Frequency'}
                  </label>
                  <select
                    value={formFrequency}
                    onChange={(e) => setFormFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Monthly">{lang === 'ar' ? 'شهري' : 'Monthly'}</option>
                    <option value="Quarterly">{lang === 'ar' ? 'ربع سنوي' : 'Quarterly'}</option>
                    <option value="Bi-Annual">{lang === 'ar' ? 'نصف سنوي' : 'Bi-Annual'}</option>
                    <option value="Annual">{lang === 'ar' ? 'سنوي' : 'Annual'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الحالة' : 'Status'}
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="on-track">{lang === 'ar' ? 'على المسار' : 'On Track'}</option>
                    <option value="warning">{lang === 'ar' ? 'تحذير' : 'Warning'}</option>
                    <option value="critical">{lang === 'ar' ? 'حرج' : 'Critical'}</option>
                    <option value="achieved">{lang === 'ar' ? 'محقق' : 'Achieved'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المبادرة المرتبطة' : 'Strategic Initiative'}
                  </label>
                  <input
                    type="text"
                    value={formStrategicInitiative}
                    onChange={(e) => setFormStrategicInitiative(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                    placeholder="e.g. Al-Ahsa Regional Tourism Expansion"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المشروع الرئيسي' : 'Key Project'}
                  </label>
                  <input
                    type="text"
                    value={formKeyProject}
                    onChange={(e) => setFormKeyProject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                    placeholder="e.g. Al-Qara Heritage Infrastructure"
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
    </div>
  );
};
