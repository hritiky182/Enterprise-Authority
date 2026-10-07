import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { StrategicObjective } from '../types';
import {
  Target,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  X,
  Building,
  User,
  Calendar,
  Layers,
  Sparkles,
  BarChart3,
  Edit2,
  Trash2,
} from 'lucide-react';

export const ObjectivesPage: React.FC = () => {
  const navigate = useNavigate();
  const { objectives, themes, goals, sectors, addObjective, updateObjective, deleteObjective, openModal, setDemoJourneyStep, lang, t } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Edit Objective State
  const [editingObj, setEditingObj] = useState<StrategicObjective | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editTitleAr, setEditTitleAr] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editOwner, setEditOwner] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editTargetYear, setEditTargetYear] = useState(2026);
  const [editProgress, setEditProgress] = useState(0);
  const [editStatus, setEditStatus] = useState<'on-track' | 'at-risk' | 'behind' | 'achieved'>('on-track');

  const openEditModal = (o: StrategicObjective) => {
    setEditingObj(o);
    setEditTitle(o.title);
    setEditTitleAr(o.titleAr || '');
    setEditDescription(o.description || '');
    setEditOwner(o.owner);
    setEditDepartment(o.department);
    setEditTargetYear(o.targetYear);
    setEditProgress(o.progress);
    setEditStatus(o.status);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingObj) return;
    updateObjective(editingObj.id, {
      title: editTitle.trim(),
      titleAr: editTitleAr.trim() || undefined,
      description: editDescription.trim() || undefined,
      owner: editOwner.trim(),
      department: editDepartment.trim(),
      targetYear: Number(editTargetYear),
      progress: Number(editProgress),
      status: editStatus,
    });
    setIsEditModalOpen(false);
    setEditingObj(null);
  };

  // Form State for Create Objective
  const [formCode, setFormCode] = useState(`SO-0${objectives.length + 1}`);
  const [formTitle, setFormTitle] = useState('');
  const [formTitleAr, setFormTitleAr] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDescriptionAr, setFormDescriptionAr] = useState('');
  const [formThemeId, setFormThemeId] = useState(themes[0]?.id || 'theme-1');
  const [formGoalId, setFormGoalId] = useState(goals[0]?.id || 'goal-1');
  const [formOwner, setFormOwner] = useState('Eng. Fahad Al-Subaie');
  const [formDepartment, setFormDepartment] = useState('Strategic Planning & PMO');
  const [formSectorId, setFormSectorId] = useState(sectors[0]?.id || '');
  const [formTargetYear, setFormTargetYear] = useState(2026);
  const [formProgress, setFormProgress] = useState(0);
  const [formStatus, setFormStatus] = useState<'on-track' | 'at-risk' | 'behind' | 'achieved'>('on-track');

  // Metrics
  const totalCount = objectives.length;
  const onTrackCount = objectives.filter((o) => o.status === 'on-track').length;
  const atRiskCount = objectives.filter((o) => o.status === 'at-risk' || o.status === 'behind').length;
  const achievedCount = objectives.filter((o) => o.status === 'achieved').length;
  const avgProgress = totalCount > 0 ? Math.round(objectives.reduce((sum, o) => sum + o.progress, 0) / totalCount) : 0;

  // Filtered List
  const filteredObjectives = objectives.filter((obj) => {
    const matchesSearch =
      obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (obj.titleAr && obj.titleAr.includes(searchTerm)) ||
      (obj.description && obj.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (obj.descriptionAr && obj.descriptionAr.includes(searchTerm)) ||
      obj.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obj.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obj.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTheme = selectedThemeId === 'all' || obj.themeId === selectedThemeId;
    const matchesStatus = selectedStatus === 'all' || obj.status === selectedStatus;

    return matchesSearch && matchesTheme && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const matchedTheme = themes.find((t) => t.id === formThemeId);
    const matchedSector = sectors.find((s) => s.id === formSectorId);

    addObjective({
      code: formCode.trim() || `SO-0${objectives.length + 1}`,
      title: formTitle.trim(),
      titleAr: formTitleAr.trim() || undefined,
      description: formDescription.trim() || undefined,
      descriptionAr: formDescriptionAr.trim() || undefined,
      themeId: formThemeId,
      themeName: matchedTheme ? matchedTheme.title : 'Strategic Theme',
      goalId: formGoalId,
      owner: formOwner,
      department: formDepartment,
      sectorId: formSectorId || undefined,
      sectorName: matchedSector ? matchedSector.name : undefined,
      targetYear: Number(formTargetYear),
      progress: Number(formProgress),
      status: formStatus,
      kpiCount: 0,
    });

    setIsCreateModalOpen(false);
    setFormTitle('');
    setFormTitleAr('');
    setFormDescription('');
    setFormDescriptionAr('');
    setFormCode(`SO-0${objectives.length + 2}`);
  };

  const columns: Column<StrategicObjective>[] = [
    {
      header: t('Code'),
      accessorKey: 'code',
      sortable: true,
      width: '110px',
      cell: (o) => (
        <div className="flex items-center space-x-1.5">
          <span className="font-mono font-bold text-slate-900">{o.code}</span>
          {o.isCustom && (
            <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
              {lang === 'ar' ? 'جديد' : 'NEW'}
            </span>
          )}
        </div>
      ),
    },
    {
      header: t('Strategic Objectives'),
      accessorKey: 'title',
      sortable: true,
      cell: (o) => (
        <div className="space-y-1">
          <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
            {lang === 'ar' ? (o.titleAr || o.title) : o.title}
          </div>
          {lang !== 'ar' && o.titleAr && (
            <div className="text-[11px] text-slate-400 font-sans">{o.titleAr}</div>
          )}
          {(o.description || o.descriptionAr) && (
            <p className="text-[11px] text-slate-600 line-clamp-2 italic bg-slate-50/90 px-2 py-1 rounded border border-slate-200/60 leading-relaxed">
              {lang === 'ar' ? (o.descriptionAr || o.description) : (o.description || o.descriptionAr)}
            </p>
          )}
          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono pt-0.5">
            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
              {o.themeName}
            </span>
            {o.sectorName && (
              <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-100">
                {o.sectorName}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      header: t('Owner'),
      accessorKey: 'owner',
      sortable: true,
      cell: (o) => (
        <div>
          <div className="font-medium text-slate-800 text-xs">{t(o.owner)}</div>
          <div className="text-[10px] text-slate-400">{t(o.department)}</div>
        </div>
      ),
    },
    {
      header: t('Target Year'),
      accessorKey: 'targetYear',
      sortable: true,
      width: '100px',
      cell: (o) => <span className="font-mono text-xs font-semibold text-slate-700">{o.targetYear}</span>,
    },
    {
      header: t('Progress'),
      accessorKey: 'progress',
      sortable: true,
      width: '130px',
      cell: (o) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                o.progress >= 80 ? 'bg-emerald-600' : o.progress >= 50 ? 'bg-blue-600' : 'bg-amber-500'
              }`}
              style={{ width: `${o.progress}%` }}
            />
          </div>
          <span className="font-mono font-bold text-xs text-slate-900">{o.progress}%</span>
        </div>
      ),
    },
    {
      header: t('Tracked KPIs'),
      accessorKey: 'kpiCount',
      sortable: true,
      width: '100px',
      cell: (o) => (
        <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          <BarChart3 className="w-3 h-3 text-slate-400" />
          <span>{o.kpiCount || 0}</span>
        </span>
      ),
    },
    {
      header: t('Status'),
      accessorKey: 'status',
      sortable: true,
      width: '110px',
      cell: (o) => <StatusBadge status={o.status} />,
    },
    {
      header: lang === 'ar' ? 'الإجراءات' : 'Actions',
      width: '100px',
      cell: (o) => (
        <div className="flex items-center gap-1.5 justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(o);
            }}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title={lang === 'ar' ? 'تعديل الهدف' : 'Edit Objective'}
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(lang === 'ar' ? `هل أنت متأكد من حذف الهدف الاستراتيجي "${o.title}" والمؤشرات التابعة؟` : `Delete Strategic Objective "${o.title}" and linked metrics?`)) {
                deleteObjective(o.id);
              }
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title={lang === 'ar' ? 'حذف الهدف' : 'Delete Objective'}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
            <span className="font-bold uppercase">
              {lang === 'ar' ? 'المرحلة 4 • مسار الاستراتيجية' : 'STEP 4 • STRATEGY JOURNEY'}
            </span>
            <span className="text-slate-300">/</span>
            <span>{lang === 'ar' ? 'الأهداف الاستراتيجية (OKRs)' : 'Strategic Objectives'}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'الأهداف الاستراتيجية (OKRs)' : 'Strategic Objectives (OKRs)'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'ar'
              ? 'إدارة وحوكمة الأهداف المؤسسية التفصيلية، ومتابعة نسب الإنجاز والمواءمة مع الركائز ومؤشرات الأداء.'
              : 'Portfolio tracking of institutional strategic objectives, milestone targets, and operational department alignments.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>{lang === 'ar' ? 'إضافة هدف استراتيجي' : 'Create Objective'}</span>
        </button>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
            {lang === 'ar' ? 'إجمالي الأهداف' : 'Total Objectives'}
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">{totalCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'الأهداف المعتمدة في الخطة' : 'Active strategic goals'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-emerald-600 uppercase font-semibold">
            {lang === 'ar' ? 'على المسار' : 'On Track'}
          </div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">{onTrackCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'تسير وفق الجداول الزمنية' : 'Optimal pace performance'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-amber-600 uppercase font-semibold">
            {lang === 'ar' ? 'تحت المتابعة / متأخر' : 'At Risk / Behind'}
          </div>
          <div className="text-xl font-bold font-mono text-amber-700 mt-1">{atRiskCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'تتطلب تدخلاً ومعالجة' : 'Needs managerial action'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-blue-600 uppercase font-semibold">
            {lang === 'ar' ? 'مكتمل / محقق' : 'Achieved'}
          </div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">{achievedCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'تم استيفاء مستهدفاته' : 'Target milestones reached'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-4 rounded-xl text-white shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-blue-300 uppercase font-semibold">
              {lang === 'ar' ? 'متوسط الإنجاز' : 'Avg Progress'}
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">{avgProgress}%</div>
          <div className="text-[10px] text-slate-400 font-mono">
            {lang === 'ar' ? 'إجمالي نسبة إنجاز المحفظة' : 'Portfolio overall index'}
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
              placeholder={lang === 'ar' ? 'بحث بالرمز، الهدف، المسؤول، أو الإدارة...' : 'Search by code, title, owner, or department...'}
              className={`w-full ${lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600`}
            />
          </div>

          {/* Theme Filter */}
          <select
            value={selectedThemeId}
            onChange={(e) => setSelectedThemeId(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-600"
          >
            <option value="all">{lang === 'ar' ? 'جميع الركائز الاستراتيجية' : 'All Strategic Pillars'}</option>
            {themes.map((th) => (
              <option key={th.id} value={th.id}>
                {th.code} - {lang === 'ar' ? (th.titleAr || th.title) : th.title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-600"
          >
            <option value="all">{lang === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="on-track">{lang === 'ar' ? 'على المسار' : 'On Track'}</option>
            <option value="at-risk">{lang === 'ar' ? 'معرض للخطر' : 'At Risk'}</option>
            <option value="behind">{lang === 'ar' ? 'متأخر' : 'Behind'}</option>
            <option value="achieved">{lang === 'ar' ? 'مكتمل' : 'Achieved'}</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-500">
          {lang === 'ar' ? `العدد: ${filteredObjectives.length}` : `Count: ${filteredObjectives.length}`}
        </div>
      </div>

      {/* Main Table */}
      <DataTable
        title={t('Strategic Objectives Performance Matrix')}
        subtitle={t('Owner, Theme alignment, target deadlines and overall achievement progress')}
        data={filteredObjectives}
        columns={columns}
        onRowClick={(obj) => openModal('objective', obj)}
      />

      {/* Step Navigation Banner: Proceed to Step 5 */}
      <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            4/9
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">
              {lang === 'ar' ? 'المرحلة التالية في مسار الاستراتيجية' : 'NEXT STEP • STRATEGY JOURNEY'}
            </span>
            <h4 className="font-bold text-xs text-slate-900">
              {lang === 'ar' ? 'المرحلة 5: مؤشرات الأداء الرئيسية (KPIs Telemetry)' : 'Step 5: Key Performance Indicators (KPIs & Formulas)'}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setDemoJourneyStep(5);
            navigate('/kpis');
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>{lang === 'ar' ? 'الانتقال إلى المؤشرات' : 'Proceed to Step 5: KPIs ➔'}</span>
        </button>
      </div>

      {/* Create Objective Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {lang === 'ar' ? 'إضافة هدف استراتيجي جديد' : 'Create New Strategic Objective'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'ربط الهدف بالركيزة الاستراتيجية والمعالم الزمنية' : 'Align objective under organizational strategic pillars'}
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
                    {lang === 'ar' ? 'رمز الهدف' : 'Objective Code'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                    placeholder="SO-06"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'سنة الاستهداف' : 'Target Year'} *
                  </label>
                  <input
                    type="number"
                    min="2024"
                    max="2035"
                    required
                    value={formTargetYear}
                    onChange={(e) => setFormTargetYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
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
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  placeholder="e.g. Elevate Sustainable Heritage & Agri-Tourism Capacity"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'عنوان الهدف بالعربية' : 'Objective Title (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formTitleAr}
                  onChange={(e) => setFormTitleAr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-blue-600"
                  placeholder="مثال: رفع القدرة الاستيعابية للسياحة الزراعية والتراث المستدام"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الوصف والنطاق الاستراتيجي (بالإنجليزية)' : 'Strategic Description & Scope (English)'}
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  placeholder="Detailed strategic statement, scope, target audience, and expected outcome..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الوصف والنطاق الاستراتيجي (بالعربية)' : 'Strategic Description & Scope (Arabic)'}
                </label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={formDescriptionAr}
                  onChange={(e) => setFormDescriptionAr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-blue-600"
                  placeholder="النطاق الاستراتيجي للهدف، والجهات المستهدفة، والمخرجات المرجوة..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الركيزة الاستراتيجية' : 'Strategic Pillar'} *
                  </label>
                  <select
                    value={formThemeId}
                    onChange={(e) => setFormThemeId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
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
                    value={formSectorId}
                    onChange={(e) => setFormSectorId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
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
                    value={formOwner}
                    onChange={(e) => setFormOwner(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الإدارة' : 'Department'} *
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الحالة الأولية' : 'Initial Status'}
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
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
                    value={formProgress}
                    onChange={(e) => setFormProgress(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-blue-600"
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
                  {lang === 'ar' ? 'حفظ ونشر الهدف' : 'Save & Publish Objective'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Objective Modal */}
      {isEditModalOpen && editingObj && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {lang === 'ar' ? `تعديل الهدف الاستراتيجي (${editingObj.code})` : `Edit Strategic Objective (${editingObj.code})`}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {lang === 'ar' ? 'تحديث المستهدف، ونسبة الإنجاز، والجهة المالكة' : 'Update objective title, progress telemetry, and responsible department'}
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
                    {lang === 'ar' ? 'عنوان الهدف بالإنجليزية' : 'Objective Title (EN)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'عنوان الهدف بالعربية' : 'Objective Title (AR)'}
                  </label>
                  <input
                    type="text"
                    value={editTitleAr}
                    onChange={(e) => setEditTitleAr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الوصف والنطاق' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المسؤول' : 'Owner'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={editOwner}
                    onChange={(e) => setEditOwner(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الإدارة' : 'Department'}
                  </label>
                  <input
                    type="text"
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'سنة الاستهداف' : 'Target Year'}
                  </label>
                  <input
                    type="number"
                    value={editTargetYear}
                    onChange={(e) => setEditTargetYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'نسبة الإنجاز (%)' : 'Progress (%)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editProgress}
                    onChange={(e) => setEditProgress(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الحالة' : 'Status'}
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  >
                    <option value="on-track">{lang === 'ar' ? 'على المسار' : 'On Track'}</option>
                    <option value="at-risk">{lang === 'ar' ? 'معرض للخطر' : 'At Risk'}</option>
                    <option value="behind">{lang === 'ar' ? 'متأخر' : 'Behind'}</option>
                    <option value="achieved">{lang === 'ar' ? 'متحقق' : 'Achieved'}</option>
                  </select>
                </div>
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
