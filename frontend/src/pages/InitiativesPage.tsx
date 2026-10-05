import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { DataTable, Column } from '../components/common/DataTable';
import { StrategicInitiative } from '../types';
import {
  Sparkles,
  Plus,
  Search,
  CheckCircle,
  DollarSign,
  Calendar,
  Layers,
  X,
  TrendingUp,
  LayoutGrid,
  List,
  Target,
  Clock,
} from 'lucide-react';

export const InitiativesPage: React.FC = () => {
  const { initiatives, objectives, addInitiative, toggleMilestone, lang, t } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form State for Create Initiative
  const [formCode, setFormCode] = useState(`INIT-0${initiatives.length + 1}`);
  const [formTitle, setFormTitle] = useState('');
  const [formTitleAr, setFormTitleAr] = useState('');
  const [formObjectiveId, setFormObjectiveId] = useState(objectives[0]?.id || 'obj-1');
  const [formDescription, setFormDescription] = useState('');
  const [formDescriptionAr, setFormDescriptionAr] = useState('');
  const [formOwner, setFormOwner] = useState('Eng. Fahad Al-Subaie');
  const [formDepartment, setFormDepartment] = useState('Regional Transformation & Urban Planning');
  const [formBudgetSAR, setFormBudgetSAR] = useState(15000000);
  const [formSpentSAR, setFormSpentSAR] = useState(2500000);
  const [formProgress, setFormProgress] = useState(20);
  const [formStartDate, setFormStartDate] = useState('2026-01-01');
  const [formEndDate, setFormEndDate] = useState('2027-12-31');
  const [formStatus, setFormStatus] = useState<'Planning' | 'In Progress' | 'At Risk' | 'Completed'>('In Progress');
  const [formMilestoneTitle, setFormMilestoneTitle] = useState('Phase 1 Detailed Master Plan Sign-off');
  const [formMilestoneDate, setFormMilestoneDate] = useState('2026-11-30');

  // Metrics
  const totalCount = initiatives.length;
  const totalBudget = initiatives.reduce((sum, i) => sum + (i.budgetSAR || 0), 0);
  const totalSpent = initiatives.reduce((sum, i) => sum + (i.spentSAR || 0), 0);
  const inProgressCount = initiatives.filter((i) => i.status === 'In Progress').length;
  const avgProgress =
    totalCount > 0 ? Math.round(initiatives.reduce((sum, i) => sum + i.progress, 0) / totalCount) : 0;

  // Filtered Initiatives
  const filteredInitiatives = initiatives.filter((init) => {
    const matchesSearch =
      init.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (init.titleAr && init.titleAr.includes(searchTerm)) ||
      init.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (init.owner && init.owner.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (init.department && init.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || init.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const matchedObj = objectives.find((o) => o.id === formObjectiveId);

    addInitiative({
      code: formCode.trim() || `INIT-0${initiatives.length + 1}`,
      title: formTitle.trim(),
      titleAr: formTitleAr.trim() || undefined,
      objectiveId: formObjectiveId,
      objectiveTitle: matchedObj ? matchedObj.title : 'Strategic Objective',
      description: formDescription.trim(),
      descriptionAr: formDescriptionAr.trim() || undefined,
      owner: formOwner,
      department: formDepartment,
      budgetSAR: Number(formBudgetSAR),
      spentSAR: Number(formSpentSAR),
      progress: Number(formProgress),
      startDate: formStartDate,
      endDate: formEndDate,
      status: formStatus,
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: formMilestoneTitle || 'Milestone Phase 1 Delivery',
          dueDate: formMilestoneDate || '2026-12-31',
          status: 'In Progress',
        },
      ],
      risksCount: 1,
      actionsCount: 1,
      keyProjects: ['Strategic Transformation Delivery'],
    });

    setIsCreateModalOpen(false);
    setFormTitle('');
    setFormTitleAr('');
    setFormDescription('');
    setFormCode(`INIT-0${initiatives.length + 2}`);
  };

  const columns: Column<StrategicInitiative>[] = [
    {
      header: t('Code'),
      accessorKey: 'code',
      sortable: true,
      width: '110px',
      cell: (i) => (
        <div className="flex items-center space-x-1.5">
          <span className="font-mono font-bold text-slate-900">{i.code}</span>
          {i.isCustom && (
            <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
              {lang === 'ar' ? 'جديد' : 'NEW'}
            </span>
          )}
        </div>
      ),
    },
    {
      header: t('Strategic Initiatives'),
      accessorKey: 'title',
      sortable: true,
      cell: (i) => (
        <div>
          <div className="font-semibold text-slate-900">{lang === 'ar' ? (i.titleAr || i.title) : i.title}</div>
          {lang !== 'ar' && i.titleAr && (
            <div className="text-[11px] text-slate-400 font-sans mt-0.5">{i.titleAr}</div>
          )}
          <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
            {lang === 'ar' ? (i.descriptionAr || i.description) : i.description}
          </div>
        </div>
      ),
    },
    {
      header: t('Budget Allocation'),
      accessorKey: 'budgetSAR',
      sortable: true,
      width: '140px',
      cell: (i) => (
        <div className="font-mono text-xs">
          <div className="font-bold text-slate-900">
            {lang === 'ar' ? `${(i.budgetSAR / 1000000).toFixed(1)} مليون ر.س` : `SAR ${(i.budgetSAR / 1000000).toFixed(1)}M`}
          </div>
          <div className="text-[10px] text-slate-400">
            {lang === 'ar' ? `المصروف: ${(i.spentSAR / 1000000).toFixed(1)} م` : `Spent: ${(i.spentSAR / 1000000).toFixed(1)}M`}
          </div>
        </div>
      ),
    },
    {
      header: t('Overall Completion'),
      accessorKey: 'progress',
      sortable: true,
      width: '130px',
      cell: (i) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full transition-all" style={{ width: `${i.progress}%` }} />
          </div>
          <span className="font-mono font-bold text-xs text-slate-900">{i.progress}%</span>
        </div>
      ),
    },
    {
      header: t('Owner'),
      accessorKey: 'owner',
      sortable: true,
      cell: (i) => (
        <div>
          <div className="font-medium text-slate-800 text-xs">{t(i.owner)}</div>
          <div className="text-[10px] text-slate-400">{t(i.department)}</div>
        </div>
      ),
    },
    {
      header: lang === 'ar' ? 'الجدول الزمني' : 'Timeline',
      accessorKey: 'endDate',
      sortable: true,
      width: '140px',
      cell: (i) => (
        <span className="font-mono text-[11px] text-slate-600">
          {i.startDate} → {i.endDate}
        </span>
      ),
    },
    {
      header: t('Status'),
      accessorKey: 'status',
      sortable: true,
      width: '110px',
      cell: (i) => <StatusBadge status={i.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-600 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{t('AL AHSA DEVELOPMENT AUTHORITY • STRATEGIC DELIVERY & TRANSFORMATION')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'المبادرات الاستراتيجية والمشاريع' : 'Strategic Initiatives & Projects'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'ar'
              ? 'حوكمة وتنفيذ برامج التحول والمبادرات الاستراتيجية، ومتابعة الميزانيات المعتمدة والمصروفات والمعالم الإنجازية.'
              : 'Executive roadmap, capital expenditure (CAPEX), delivery milestones, and operational project schedules.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>{lang === 'ar' ? 'إضافة مبادرة استراتيجية' : 'Create Initiative'}</span>
        </button>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
            {lang === 'ar' ? 'إجمالي المبادرات' : 'Total Initiatives'}
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">{totalCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'المبادرات المعتمدة' : 'Active strategic programs'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-emerald-600 uppercase font-semibold">
            {lang === 'ar' ? 'الميزانية المعتمدة' : 'Allocated Budget'}
          </div>
          <div className="text-lg font-bold font-mono text-emerald-700 mt-1">
            {lang === 'ar' ? `${(totalBudget / 1000000).toFixed(1)} مليون ر.س` : `SAR ${(totalBudget / 1000000).toFixed(1)}M`}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'إجمالي الاعتماد المالي' : 'Total approved budget'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-blue-600 uppercase font-semibold">
            {lang === 'ar' ? 'المصروف الفعلي' : 'Actual Spent'}
          </div>
          <div className="text-lg font-bold font-mono text-blue-700 mt-1">
            {lang === 'ar' ? `${(totalSpent / 1000000).toFixed(1)} مليون ر.س` : `SAR ${(totalSpent / 1000000).toFixed(1)}M`}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? `نسبة الصرف: ${totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}%` : `Burn: ${totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}%`}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-amber-600 uppercase font-semibold">
            {lang === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
          </div>
          <div className="text-xl font-bold font-mono text-amber-700 mt-1">{inProgressCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'مبادرات نشطة حالياً' : 'Active flight programs'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-amber-950 p-4 rounded-xl text-white shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-amber-300 uppercase font-semibold">
              {lang === 'ar' ? 'متوسط الإنجاز' : 'Avg Completion'}
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">{avgProgress}%</div>
          <div className="text-[10px] text-slate-400 font-mono">
            {lang === 'ar' ? 'معدل تسليم المعالم' : 'Milestones delivery index'}
          </div>
        </div>
      </div>

      {/* Filter Toolbar & View Toggle */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className={`w-3.5 h-3.5 absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'ar' ? 'بحث بالرمز، المبادرة، المالك، أو الإدارة...' : 'Search by code, title, owner, or department...'}
              className={`w-full ${lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600`}
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-600"
          >
            <option value="all">{lang === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="Planning">{lang === 'ar' ? 'تخطيط' : 'Planning'}</option>
            <option value="In Progress">{lang === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
            <option value="At Risk">{lang === 'ar' ? 'معرض للخطر' : 'At Risk'}</option>
            <option value="Completed">{lang === 'ar' ? 'مكتمل' : 'Completed'}</option>
          </select>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title={lang === 'ar' ? 'عرض البطاقات' : 'Grid View'}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title={lang === 'ar' ? 'عرض الجدول' : 'Table View'}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500">
            {lang === 'ar' ? `العدد: ${filteredInitiatives.length}` : `Count: ${filteredInitiatives.length}`}
          </div>
        </div>
      </div>

      {/* View Mode 1: Grid Cards View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInitiatives.map((init) => (
            <div
              key={init.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 hover:border-slate-300 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {init.code}
                    </span>
                    <StatusBadge status={init.status} />
                    {init.isCustom && (
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {lang === 'ar' ? 'مبادرة جديدة' : 'NEW INITIATIVE'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-2 group-hover:text-blue-700 transition-colors">
                    {lang === 'ar' ? (init.titleAr || init.title) : init.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {lang === 'ar' ? (init.descriptionAr || init.description) : init.description}
                  </p>
                </div>
              </div>

              {/* Budget & Progress stats */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="panel-label">{t('Budget Allocation')}</span>
                  <div className="font-mono font-bold text-sm text-slate-900 mt-0.5">
                    {lang === 'ar' ? `${(init.budgetSAR / 1000000).toFixed(1)} مليون ر.س` : `SAR ${(init.budgetSAR / 1000000).toFixed(1)}M`}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {lang === 'ar' ? `المصروف: ${(init.spentSAR / 1000000).toFixed(1)} مليون ر.س` : `Spent: SAR ${(init.spentSAR / 1000000).toFixed(1)}M`}
                  </div>
                </div>

                <div>
                  <span className="panel-label">{t('Overall Completion')}</span>
                  <div className="font-mono font-bold text-sm text-emerald-700 mt-0.5">
                    {init.progress}%
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-emerald-600 h-full transition-all" style={{ width: `${init.progress}%` }} />
                  </div>
                </div>
              </div>

              {/* Milestones list */}
              <div>
                <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-2">
                  {t('Key Deliverables & Milestones')}
                </h4>
                <div className="space-y-1.5">
                  {init.milestones?.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => toggleMilestone(init.id, m.id)}
                      className="p-2.5 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 flex items-center justify-between text-xs cursor-pointer transition-colors shadow-2xs"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={`w-3.5 h-3.5 ${m.status === 'Completed' ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <span className={`font-medium ${m.status === 'Completed' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                          {m.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 font-mono text-[10px]">
                        <span className="text-slate-400">{m.dueDate}</span>
                        <StatusBadge status={m.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 font-mono">
                <span>{lang === 'ar' ? `المالك: ${t(init.owner)}` : `Owner: ${init.owner}`}</span>
                <span>{init.startDate} → {init.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataTable
          title={t('Strategic Initiatives')}
          subtitle={t('Key Deliverables & Milestones')}
          data={filteredInitiatives}
          columns={columns}
        />
      )}

      {/* Create Initiative Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {lang === 'ar' ? 'إضافة مبادرة استراتيجية جديدة' : 'Create New Strategic Initiative'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'تخصيص الميزانية وجداول التسليم والمعالم الرئيسية' : 'Allocate CAPEX budget, deliverable milestones, and project owner'}
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
                    {lang === 'ar' ? 'رمز المبادرة' : 'Initiative Code'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                    placeholder="INIT-04"
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
                  {lang === 'ar' ? 'عنوان المبادرة بالإنجليزية' : 'Initiative Title (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  placeholder="e.g. Al-Ahsa Integrated Smart Mobility & Logistics Corridor"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان المبادرة بالعربية' : 'Initiative Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formTitleAr}
                  onChange={(e) => setFormTitleAr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-blue-600"
                  placeholder="مثال: ممر النقل الذكي والخدمات اللوجستية المتكاملة في الأحساء"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الوصف والنطاق' : 'Scope & Description'}
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  placeholder="Scope deliverables, expected economic outcomes, and partner entities..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الميزانية المعتمدة (ر.س)' : 'Approved Budget (SAR)'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={formBudgetSAR}
                    onChange={(e) => setFormBudgetSAR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المصروف الفعلي (ر.س)' : 'Spent to Date (SAR)'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={formSpentSAR}
                    onChange={(e) => setFormSpentSAR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  />
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
                    value={formOwner}
                    onChange={(e) => setFormOwner(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الإدارة المعنية' : 'Department'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formDepartment}
                    onChange={(e) => setFormDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'تاريخ البدء' : 'Start Date'}
                  </label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}
                  </label>
                  <input
                    type="date"
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  />
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
                    <option value="Planning">{lang === 'ar' ? 'تخطيط' : 'Planning'}</option>
                    <option value="In Progress">{lang === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
                    <option value="At Risk">{lang === 'ar' ? 'معرض للخطر' : 'At Risk'}</option>
                    <option value="Completed">{lang === 'ar' ? 'مكتمل' : 'Completed'}</option>
                  </select>
                </div>
              </div>

              {/* Milestone Sub-Form */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-semibold text-[11px] text-slate-800">
                  {lang === 'ar' ? 'المعلم الإنجازي الأولي' : 'Initial Deliverable Milestone'}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={formMilestoneTitle}
                      onChange={(e) => setFormMilestoneTitle(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                      placeholder="e.g. Master Scope Approval"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      value={formMilestoneDate}
                      onChange={(e) => setFormMilestoneDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                    />
                  </div>
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
