import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  ArrowRight,
  Check,
  FolderGit2,
  Milestone,
  Edit2,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

export const InitiativesPage: React.FC = () => {
  const navigate = useNavigate();
  const { initiatives, objectives, addInitiative, updateInitiative, deleteInitiative, toggleMilestone, setDemoJourneyStep, lang, t } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Edit Initiative State
  const [editingInit, setEditingInit] = useState<StrategicInitiative | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editTitleAr, setEditTitleAr] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editOwner, setEditOwner] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editBudgetSAR, setEditBudgetSAR] = useState(0);
  const [editSpentSAR, setEditSpentSAR] = useState(0);
  const [editProgress, setEditProgress] = useState(0);
  const [editStatus, setEditStatus] = useState<'Planning' | 'In Progress' | 'At Risk' | 'Completed'>('In Progress');

  const openEditModal = (i: StrategicInitiative) => {
    setEditingInit(i);
    setEditTitle(i.title);
    setEditTitleAr(i.titleAr || '');
    setEditDescription(i.description || '');
    setEditOwner(i.owner);
    setEditDepartment(i.department);
    setEditBudgetSAR(i.budgetSAR);
    setEditSpentSAR(i.spentSAR);
    setEditProgress(i.progress);
    setEditStatus(i.status);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInit) return;
    updateInitiative(editingInit.id, {
      title: editTitle.trim(),
      titleAr: editTitleAr.trim() || undefined,
      description: editDescription.trim() || undefined,
      owner: editOwner.trim(),
      department: editDepartment.trim(),
      budgetSAR: Number(editBudgetSAR),
      spentSAR: Number(editSpentSAR),
      progress: Number(editProgress),
      status: editStatus,
    });
    setIsEditModalOpen(false);
    setEditingInit(null);
  };

  // AI Copilot state
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);

  // Form State for Create Initiative
  const [formCode, setFormCode] = useState(`INIT-0${initiatives.length + 1}`);
  const [formTitle, setFormTitle] = useState('');
  const [formTitleAr, setFormTitleAr] = useState('');
  const [formObjectiveId, setFormObjectiveId] = useState(objectives[0]?.id || 'obj-1');
  const [formDescription, setFormDescription] = useState('');
  const [formOwner, setFormOwner] = useState('Eng. Fahad Al-Subaie');
  const [formDepartment, setFormDepartment] = useState('Regional Transformation & Urban Planning');
  const [formBudgetSAR, setFormBudgetSAR] = useState(12000000);
  const [formSpentSAR, setFormSpentSAR] = useState(2500000);
  const [formProgress, setFormProgress] = useState(20);
  const [formStartDate, setFormStartDate] = useState('2026-01-01');
  const [formEndDate, setFormEndDate] = useState('2027-12-31');
  const [formStatus, setFormStatus] = useState<'Planning' | 'In Progress' | 'At Risk' | 'Completed'>('In Progress');
  const [formMilestoneTitle, setFormMilestoneTitle] = useState('Phase 1 Detailed Master Plan Sign-off');
  const [formMilestoneDate, setFormMilestoneDate] = useState('2026-11-30');

  // AI Initiative Recommendations
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
        { title: 'Develop community awareness framework & brand guide', dueDate: '2026-06-30', status: 'Completed' as const },
        { title: 'Launch multimedia digital engagement portal', dueDate: '2026-10-15', status: 'In Progress' as const },
        { title: 'Execute regional oasis festival campaigns', dueDate: '2027-02-28', status: 'Pending' as const },
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
        { title: 'Digital Platforms and Technical Integration Framework', dueDate: '2026-05-15', status: 'Completed' as const },
        { title: 'Unified digital civic voting & consultation portal', dueDate: '2026-12-15', status: 'In Progress' as const },
        { title: 'Local initiatives incubator & community impact dashboard', dueDate: '2027-03-31', status: 'Pending' as const },
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
        { title: 'Regional green corridor environmental baseline audit', dueDate: '2026-07-31', status: 'Completed' as const },
        { title: 'Municipal park revitalizations & community sports track', dueDate: '2026-12-31', status: 'In Progress' as const },
        { title: 'Comprehensive civic satisfaction measurement benchmark', dueDate: '2027-04-30', status: 'Pending' as const },
      ],
      keyProject: 'Quality of Life & Oasis Civic Satisfaction Project',
    },
  ];

  const handleApplyAiSuggestion = (sug: typeof AI_INITIATIVE_SUGGESTIONS[0]) => {
    setFormCode(sug.code);
    setFormTitle(sug.title);
    setFormTitleAr(sug.titleAr);
    setFormDescription(sug.description);
    setFormBudgetSAR(sug.budget);
    setFormSpentSAR(sug.spent);
    setFormOwner(sug.owner);
    setFormDepartment(sug.department);
    setFormMilestoneTitle(sug.milestones[0]?.title || 'Master Scope Sign-off');
    setFormMilestoneDate(sug.milestones[0]?.dueDate || '2026-11-30');

    setIsAiCopilotOpen(false);
    toast.success(
      lang === 'ar' ? 'تم تطبيق مقترح المبادرة بالذكاء الاصطناعي بنجاح' : 'AI Copilot Initiative Recommendation Applied!',
      {
        description: `${sug.code}: ${sug.title}`,
      }
    );
  };

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
      description: formDescription.trim() || undefined,
      owner: formOwner.trim(),
      department: formDepartment.trim(),
      budgetSAR: Number(formBudgetSAR),
      spentSAR: Number(formSpentSAR),
      progress: Number(formProgress),
      startDate: formStartDate,
      endDate: formEndDate,
      status: formStatus,
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: formMilestoneTitle.trim() || 'Core Deliverable Approval',
          dueDate: formMilestoneDate,
          status: 'In Progress',
        },
      ],
      risksCount: 1,
      actionsCount: 2,
    });

    setIsCreateModalOpen(false);
    toast.success(lang === 'ar' ? 'تم إنشاء المبادرة بنجاح' : 'Initiative Created Successfully');

    // Reset Form
    setFormCode(`INIT-0${initiatives.length + 2}`);
    setFormTitle('');
    setFormTitleAr('');
    setFormDescription('');
  };

  const columns: Column<StrategicInitiative>[] = [
    {
      header: t('Initiative Code & Title'),
      accessorKey: 'title',
      sortable: true,
      cell: (i) => (
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {i.code}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {i.milestones?.length || 0} {lang === 'ar' ? 'معالم' : 'Gates'}
            </span>
          </div>
          <div className="font-semibold text-xs text-slate-900 mt-1">
            {lang === 'ar' ? i.titleAr || i.title : i.title}
          </div>
          <div className="text-[11px] text-slate-500 line-clamp-1">{i.description}</div>
        </div>
      ),
    },
    {
      header: t('Lead Officer & Dept'),
      accessorKey: 'owner',
      sortable: true,
      cell: (i) => (
        <div className="text-xs">
          <div className="font-semibold text-slate-800">{i.owner}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{i.department}</div>
        </div>
      ),
    },
    {
      header: t('Budget Allocation'),
      accessorKey: 'budgetSAR',
      sortable: true,
      cell: (i) => {
        const burnPct = i.budgetSAR > 0 ? Math.round((i.spentSAR / i.budgetSAR) * 100) : 0;
        return (
          <div className="space-y-1 min-w-[130px]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-900">
                SAR {(i.budgetSAR / 1000000).toFixed(1)}M
              </span>
              <span className="text-amber-800 font-semibold">{burnPct}% burn</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full transition-all" style={{ width: `${Math.min(100, burnPct)}%` }} />
            </div>
            <span className="text-[10px] text-slate-400 font-mono block">
              Spent: SAR {(i.spentSAR / 1000000).toFixed(1)}M
            </span>
          </div>
        );
      },
    },
    {
      header: t('Progress & Milestones'),
      accessorKey: 'progress',
      sortable: true,
      cell: (i) => (
        <div className="space-y-1 min-w-[120px]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-indigo-700">{i.progress}%</span>
            <span className="text-slate-400">{i.endDate}</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full transition-all" style={{ width: `${i.progress}%` }} />
          </div>
        </div>
      ),
    },
    {
      header: t('Status'),
      accessorKey: 'status',
      sortable: true,
      cell: (i) => <StatusBadge status={i.status} />,
    },
    {
      header: lang === 'ar' ? 'الإجراءات' : 'Actions',
      cell: (i) => (
        <div className="flex items-center gap-1.5 justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(i);
            }}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title={lang === 'ar' ? 'تعديل المبادرة' : 'Edit Initiative'}
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(lang === 'ar' ? `هل أنت متأكد من حذف المبادرة "${i.title}"؟` : `Delete Initiative "${i.title}"?`)) {
                deleteInitiative(i.id);
              }
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title={lang === 'ar' ? 'حذف المبادرة' : 'Delete Initiative'}
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
            <span className="font-bold uppercase">
              {lang === 'ar' ? 'المرحلة 6 • مسار الاستراتيجية' : 'STEP 6 • STRATEGY JOURNEY'}
            </span>
            <span className="text-slate-300">/</span>
            <span>{lang === 'ar' ? 'المبادرات والمشاريع والذكاء الاصطناعي' : 'Strategic Programs & AI Copilot'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'المبادرات الاستراتيجية والمشاريع' : 'Strategic Initiatives & Projects'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {lang === 'ar'
              ? 'إدارة محافظ المبادرات الممولة، والميزانيات المعتمدة بالريال السعودي، ومحطات المعالم التنفيذية مع مساعد مدمج بالذكاء الاصطناعي لاقتراح المشاريع.'
              : 'Funded implementation initiatives, capital allocations (SAR), deliverables, milestone checklists, and embedded AI Project Recommender.'}
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
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5 cursor-pointer animate-pulse"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{lang === 'ar' ? '✨ مساعد الذكاء للمبادرات' : '✨ AI Initiative Copilot'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ar' ? '+ إضافة مبادرة' : '+ Create Initiative'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">{t('Total Initiatives')}</div>
            <div className="text-xl font-extrabold text-slate-900 font-mono">{totalCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">{t('Total Allocated Budget')}</div>
            <div className="text-lg font-extrabold text-emerald-700 font-mono">
              SAR {(totalBudget / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">{t('Active Execution')}</div>
            <div className="text-xl font-extrabold text-blue-700 font-mono">{inProgressCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">{t('Portfolio Delivery')}</div>
            <div className="text-xl font-extrabold text-indigo-700 font-mono">{avgProgress}%</div>
          </div>
        </div>
      </div>

      {/* View Switcher and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'ar' ? 'بحث بالمبادرة، الرمز، المسؤول...' : 'Search initiatives, owner...'}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">{lang === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="In Progress">{lang === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
            <option value="Planning">{lang === 'ar' ? 'تخطيط' : 'Planning'}</option>
            <option value="At Risk">{lang === 'ar' ? 'معرض للخطر' : 'At Risk'}</option>
            <option value="Completed">{lang === 'ar' ? 'مكتمل' : 'Completed'}</option>
          </select>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Table View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((init) => (
            <div
              key={init.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {init.code}
                  </span>
                  <StatusBadge status={init.status} />
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    {lang === 'ar' ? init.titleAr || init.title : init.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {init.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">{lang === 'ar' ? 'نسبة الإنجاز' : 'Delivery Progress'}</span>
                    <span className="font-bold text-indigo-700">{init.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full transition-all" style={{ width: `${init.progress}%` }} />
                  </div>
                </div>

                {/* Milestones Checklist */}
                {init.milestones && init.milestones.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                      <span>{lang === 'ar' ? 'محطات الإنجاز التنفيذية' : 'Key Milestone Gates'}</span>
                      <span className="font-mono text-slate-500 text-[10px]">
                        {init.milestones.filter((m) => m.status === 'Completed').length}/{init.milestones.length} Done
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {init.milestones.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => toggleMilestone(init.id, m.id)}
                          className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer hover:text-slate-900"
                        >
                          <input
                            type="checkbox"
                            checked={m.status === 'Completed'}
                            onChange={() => {}}
                            className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className={`flex-1 truncate ${m.status === 'Completed' ? 'line-through text-slate-400' : ''}`}>
                            {m.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">{m.dueDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Budget & Owner & Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'الميزانية' : 'Budget'}</span>
                  <span className="font-bold text-slate-900">
                    SAR {(init.budgetSAR / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(init);
                    }}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title={lang === 'ar' ? 'تعديل المبادرة' : 'Edit Initiative'}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(lang === 'ar' ? `هل أنت متأكد من حذف المبادرة "${init.title}"؟` : `Delete Initiative "${init.title}"?`)) {
                        deleteInitiative(init.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title={lang === 'ar' ? 'حذف المبادرة' : 'Delete Initiative'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'المسؤول' : 'Owner'}</span>
                  <span className="font-semibold text-slate-700 truncate max-w-[100px] block font-sans">
                    {init.owner}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataTable
          title={t('Official Strategic Initiatives Register')}
          subtitle={t('Capital expenditures, implementation roadmap gates and milestones')}
          data={filteredInitiatives}
          columns={columns}
        />
      )}

      {/* Bottom Step Guide Banner */}
      <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            6/9
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">
              {lang === 'ar' ? 'المرحلة التالية في مسار الاستراتيجية' : 'NEXT STEP • STRATEGY JOURNEY'}
            </span>
            <h4 className="font-bold text-xs text-slate-900">
              {lang === 'ar' ? 'المرحلة 7: مصفوفة المواءمة الاستراتيجية الشاملة' : 'Step 7: Cascading Strategy Matrix & PDF/Excel Export'}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setDemoJourneyStep(7);
            navigate('/strategy');
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>{lang === 'ar' ? 'المتابعة إلى المصفوفة' : 'Proceed to Step 7 ➔'}</span>
        </button>
      </div>

      {/* CREATE INITIATIVE MODAL WITH EMBEDDED AI COPILOT */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {lang === 'ar' ? 'إضافة مبادرة استراتيجية جديدة' : 'Create New Strategic Initiative'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'تخصيص الميزانية ومحطات الإنجاز ومسؤول التنفيذ' : 'Allocate budget, milestones, deliverables and project ownership'}
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
            <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-amber-50 border-b border-indigo-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-purple-950">
                      {lang === 'ar' ? 'مساعد الذكاء لاقتراح المبادرات وخارطة الطريق' : 'Antigravity AI Initiative Generator'}
                    </h4>
                    <span className="text-[10px] text-purple-700 font-mono">
                      {lang === 'ar' ? 'توليد مشاريع ممولة ومحطات معالم متوافقة مع الاستراتيجية' : 'Generates implementation packages, budget estimates, and milestone gates'}
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
                    {lang === 'ar' ? '3 محافظ مشاريع استراتيجية مقترحة بالذكاء الاصطناعي:' : '3 AI-Generated Initiative Packages with Deliverables:'}
                  </span>
                  <div className="space-y-2">
                    {AI_INITIATIVE_SUGGESTIONS.map((sug, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-xl border border-purple-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-400 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                              {sug.code}
                            </span>
                            <span className="font-bold text-xs text-slate-900">
                              {lang === 'ar' ? sug.titleAr : sug.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{sug.description}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-slate-400">
                            <span className="text-emerald-700 font-bold">SAR {(sug.budget / 1000000).toFixed(1)}M Budget</span>
                            <span>• {sug.milestones.length} Milestone Gates</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleApplyAiSuggestion(sug)}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-semibold shrink-0 cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'تطبيق المبادرة' : 'Apply Package'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Initiative Form */}
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
                    placeholder="INIT-06"
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
                  placeholder="e.g. Al-Ahsa Integrated Smart Mobility Corridor"
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-sans focus:outline-none focus:border-blue-600 text-right"
                  placeholder="مثال: ممر النقل والخدمات اللوجستية المتكاملة في الأحساء"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الوصف والنطاق الاستراتيجي' : 'Scope & Description'}
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  placeholder="Describe scope deliverables, milestones, and expected socio-economic impacts..."
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
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

              {/* Initial Milestone */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-semibold text-[11px] text-slate-800">
                  {lang === 'ar' ? 'المعلم الإنجازي الأولي' : 'Initial Deliverable Milestone Gate'}
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

      {/* Edit Initiative Modal */}
      {isEditModalOpen && editingInit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {lang === 'ar' ? `تعديل المبادرة الاستراتيجية (${editingInit.code})` : `Edit Strategic Initiative (${editingInit.code})`}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {lang === 'ar' ? 'تحديث الميزانية، والمسؤول، ونسبة الإنجاز' : 'Update capital budget, lead owner, and execution progress'}
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
                    {lang === 'ar' ? 'عنوان المبادرة بالإنجليزية' : 'Initiative Title (EN)'} *
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
                    {lang === 'ar' ? 'عنوان المبادرة بالعربية' : 'Initiative Title (AR)'}
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
                  {lang === 'ar' ? 'الوصف والنطاق التنفيذي' : 'Executive Description'}
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
                    {lang === 'ar' ? 'المسؤول التنفيذي' : 'Lead Officer / Owner'} *
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
                    {lang === 'ar' ? 'الإدارة المعنية' : 'Department'}
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
                    {lang === 'ar' ? 'الميزانية المعتمدة (SAR)' : 'Budget (SAR)'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={editBudgetSAR}
                    onChange={(e) => setEditBudgetSAR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المصروف الفعلي (SAR)' : 'Spent (SAR)'}
                  </label>
                  <input
                    type="number"
                    value={editSpentSAR}
                    onChange={(e) => setEditSpentSAR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold text-xs focus:outline-none focus:border-blue-600"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الحالة التنفيذية' : 'Status'}
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                >
                  <option value="Planning">{lang === 'ar' ? 'تخطيط' : 'Planning'}</option>
                  <option value="In Progress">{lang === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
                  <option value="At Risk">{lang === 'ar' ? 'معرض للخطر' : 'At Risk'}</option>
                  <option value="Completed">{lang === 'ar' ? 'مكتمل' : 'Completed'}</option>
                </select>
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
