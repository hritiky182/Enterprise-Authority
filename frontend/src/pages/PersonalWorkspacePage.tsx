import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers,
  Flag,
  Sparkles,
  BarChart3,
  Building2,
  Globe,
  Bell,
  CheckSquare,
  FileText,
  User,
  Users,
  Calendar,
  Send,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';
import { UserAvatar } from '../components/common/UserAvatar';
import { useNavigate } from 'react-router-dom';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

interface WorkspaceTask {
  id: string;
  title: string;
  titleAr: string;
  type: 'kpi_update' | 'milestone_review' | 'action_plan' | 'document_signoff';
  entityCode: string;
  dueDate: string;
  isOverdue: boolean;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
}

interface PendingApproval {
  id: string;
  title: string;
  titleAr: string;
  submittedBy: string;
  department: string;
  submittedAt: string;
  type: 'Strategy Baseline' | 'KPI Actual' | 'Budget Variance' | 'Action Closure';
  status: 'Pending' | 'Approved' | 'Returned';
}

export const PersonalWorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    users,
    switchUserRole,
    organization,
    lang,
    toggleLanguage,
    t,
    setDemoJourneyStep,
  } = useApp();

  const [tasks, setTasks] = useState<WorkspaceTask[]>([
    {
      id: 'task-1',
      title: 'Submit Q1 Actual Value for KPI-01 (Heritage Visitors)',
      titleAr: 'إدخال القيمة الفعلية للربع الأول للمؤشر KPI-01 (زوار التراث)',
      type: 'kpi_update',
      entityCode: 'KPI-01',
      dueDate: '2026-04-10',
      isOverdue: false,
      priority: 'High',
      status: 'Pending',
    },
    {
      id: 'task-2',
      title: 'Upload Evidence Dossier for Oasis Agri-Tourism Milestone 2.1',
      titleAr: 'رفع ملف الأدلة الإثباتية لمعلم مشروع السياحة الزراعية 2.1',
      type: 'document_signoff',
      entityCode: 'INIT-02',
      dueDate: '2026-03-28',
      isOverdue: true,
      priority: 'High',
      status: 'Pending',
    },
    {
      id: 'task-3',
      title: 'Perform Monthly Risk Variance Assessment for Project Delivery',
      titleAr: 'تقييم تباين المخاطر الشهري لمشاريع تسليم المبادرات',
      type: 'action_plan',
      entityCode: 'RSK-04',
      dueDate: '2026-04-15',
      isOverdue: false,
      priority: 'Medium',
      status: 'In Progress',
    },
    {
      id: 'task-4',
      title: 'Review Q1 Budget Execution Expenditure Report with PMO',
      titleAr: 'مراجعة تقرير الصرف المالي الفعلي للربع الأول مع مكتب إدارة المشاريع',
      type: 'milestone_review',
      entityCode: 'FIN-Q1',
      dueDate: '2026-03-25',
      isOverdue: true,
      priority: 'High',
      status: 'In Progress',
    },
  ]);

  const [approvals, setApprovals] = useState<PendingApproval[]>([
    {
      id: 'app-1',
      title: 'Objective Cascade Sign-off: Sector 2 Tourism Expansion',
      titleAr: 'اعتماد مواءمة المستهدفات: قطاع 2 التوسع السياحي',
      submittedBy: 'Eng. Faisal Al-Otaibi',
      department: 'Tourism Development',
      submittedAt: '2026-04-02',
      type: 'Strategy Baseline',
      status: 'Pending',
    },
    {
      id: 'app-2',
      title: 'KPI Actual Verification: Resident Quality of Life Index (84.2%)',
      titleAr: 'التحقق من القيمة الفعلية: مؤشر جودة حياة السكان (84.2%)',
      submittedBy: 'Huda Al-Ghamdi',
      department: 'Community Engagement',
      submittedAt: '2026-04-03',
      type: 'KPI Actual',
      status: 'Pending',
    },
    {
      id: 'app-3',
      title: 'Initiative Capital Expenditure Reallocation (SAR 1.8M)',
      titleAr: 'إعادة تخصيص ميزانية رأسمالية للمبادرة (1.8 مليون ريال)',
      submittedBy: 'Sultan Al-Harbi',
      department: 'Infrastructure & Projects',
      submittedAt: '2026-04-04',
      type: 'Budget Variance',
      status: 'Pending',
    },
  ]);

  const handleCompleteTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Completed' } : t))
    );
    toast.success(lang === 'ar' ? 'تم إكمال المهمة وتحديث السجل' : 'Task marked as completed');
  };

  const handleApprove = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Approved' } : a))
    );
    toast.success(lang === 'ar' ? 'تم اعتماد المعاملة بنجاح' : 'Item successfully approved & signed off');
  };

  const handleReturn = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Returned' } : a))
    );
    toast.info(lang === 'ar' ? 'تمت إعادة المعاملة للتصحيح مع الملاحظات' : 'Returned to submitter with revision notes');
  };

  const overdueCount = tasks.filter((t) => t.isOverdue && t.status !== 'Completed').length;
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'Pending').length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 1 من 20 • دورة حياة الاستراتيجية' : 'STAGE 1 OF 20 • STRATEGIC LIFECYCLE'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'مساحة العمل الشخصية' : 'Personal Workspace'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? `مرحباً بك، ${currentUser.nameAr || currentUser.name}`
                : `Welcome, ${currentUser.name}`}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'استعرض مهامك المكلفة، والاعتمادات المعلقة، والتحديثات المتأخرة وفق دورك التنظيمي وصلاحياتك المعتمدة.'
                : 'Review your personalized task queue, pending governance approvals, and overdue compliance updates based on your organizational role.'}
            </p>
          </div>

          {/* Quick Language & Account Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span>{lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}</span>
            </button>

            <button
              onClick={() => {
                setDemoJourneyStep(2);
                navigate('/users');
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer group"
            >
              <span>{lang === 'ar' ? 'المتابعة: إدارة المستخدمين' : 'Next: User Administration'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Identity & Context Badges */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'المنظومة' : 'Organization'}
            </span>
            <span className="font-bold text-white truncate block">
              {organization?.name || 'Al-Ahsa Development Authority'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'الدور التنظيمي' : 'Active Role'}
            </span>
            <span className="font-bold text-blue-300 truncate block">
              {t(currentUser.role)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'الاعتمادات المعلقة' : 'Pending Approvals'}
            </span>
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {pendingApprovalsCount} {lang === 'ar' ? 'معاملات' : 'Actions'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'تحديثات متأخرة' : 'Overdue Updates'}
            </span>
            <span className={`font-bold flex items-center gap-1.5 ${overdueCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              <AlertTriangle className="w-3.5 h-3.5" />
              {overdueCount} {lang === 'ar' ? 'تنبيهات' : 'Overdue'}
            </span>
          </div>
        </div>
      </div>

      {/* Switch Account Simulator (Client Req: "Later switch accounts to demonstrate a different experience") */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              {lang === 'ar' ? 'محاكي تبديل الحسابات وتجربة الأدوار' : 'Account Persona Switcher (Live Role Experience Simulator)'}
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {lang === 'ar' ? 'انقر لتجربة مساحة عمل حساب آخر' : 'Click any user to switch account perspective'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {users.slice(0, 4).map((u) => {
            const isCurrent = u.id === currentUser.id;
            return (
              <button
                key={u.id}
                onClick={() => {
                  switchUserRole(u.role);
                  toast.success(
                    lang === 'ar'
                      ? `تم التبديل إلى حساب: ${u.nameAr || u.name} (${u.role})`
                      : `Switched account to: ${u.name} (${u.role})`
                  );
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isCurrent
                    ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-400/20 shadow-xs'
                    : 'bg-slate-50/80 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <UserAvatar
                  name={lang === 'ar' ? u.nameAr || u.name : u.name}
                  gender={u.gender}
                  role={u.role}
                  size="sm"
                />
                <div className="truncate flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {lang === 'ar' ? u.nameAr || u.name : u.name}
                  </div>
                  <div className="text-[10px] text-blue-600 font-mono truncate">{u.role}</div>
                  <div className="text-[9px] text-slate-400 truncate">{u.department}</div>
                </div>
                {isCurrent && (
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Assigned Tasks & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Assigned Tasks */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'ar' ? 'المهام والتحديثات المكلفة' : 'My Assigned Operational Tasks'}
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                {tasks.filter((t) => t.status !== 'Completed').length} {lang === 'ar' ? 'نشطة' : 'Active'}
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              {tasks.map((task) => {
                const isDone = task.status === 'Completed';
                return (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      isDone
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : task.isOverdue
                        ? 'bg-rose-50/50 border-rose-200 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                          {task.entityCode}
                        </span>
                        {task.isOverdue && !isDone && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {lang === 'ar' ? 'متأخر' : 'OVERDUE'}
                          </span>
                        )}
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          task.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      <div className={`text-xs font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {lang === 'ar' ? task.titleAr : task.title}
                      </div>

                      <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{lang === 'ar' ? 'تاريخ الاستحقاق:' : 'Due:'} {task.dueDate}</span>
                      </div>
                    </div>

                    {!isDone ? (
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold transition-colors shrink-0 cursor-pointer shadow-2xs"
                      >
                        {lang === 'ar' ? 'إنجاز' : 'Mark Done'}
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {lang === 'ar' ? 'مكتمل' : 'Done'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{lang === 'ar' ? 'تتم مزامنة المهام مع دورة التقرير الربع سنوية' : 'Tasks auto-sync with active reporting cycle'}</span>
            <span className="font-mono text-emerald-600 font-bold">Q1 2026 ACTIVE</span>
          </div>
        </div>

        {/* 2. Pending Approvals & Sign-offs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'ar' ? 'الاعتمادات وموافقات الحوكمة المعلقة' : 'Governance Approvals & Sign-off Gate'}
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                {pendingApprovalsCount} {lang === 'ar' ? 'بانتظار القرار' : 'Awaiting Sign-off'}
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              {approvals.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          {app.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {app.submittedAt}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-1">
                        {lang === 'ar' ? app.titleAr : app.title}
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      app.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'Returned'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                    <span>
                      {lang === 'ar' ? 'مقدم المعاملة:' : 'Submitter:'} <strong>{app.submittedBy}</strong> ({app.department})
                    </span>
                  </div>

                  {app.status === 'Pending' && (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleReturn(app.id)}
                        className="px-2.5 py-1 text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        {lang === 'ar' ? 'إعادة مع ملاحظات' : 'Return for Revision'}
                      </button>
                      <button
                        onClick={() => handleApprove(app.id)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        {lang === 'ar' ? 'اعتماد المعاملة' : 'Approve & Sign Off'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{lang === 'ar' ? 'مبدأ الرقابة الثنائية (Four-Eyes Principle) ساري ومفعل' : 'Four-Eyes Principle enforced across all approvals'}</span>
            <span className="font-mono text-blue-600 font-bold">GRC POLICY 3.1</span>
          </div>
        </div>
      </div>

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={1}
        stageTitle="Personal Workspace & Operational Governance Queue"
        stageTitleAr="مساحة العمل الشخصية وطابور حوكمة العمليات"
        nextStage={{
          stage: 2,
          title: "User Administration & RBAC",
          titleAr: "إدارة المستخدمين والأدوار",
          path: "/users",
        }}
        relatedLinks={[
          { title: "Organization Hierarchy", titleAr: "الهيكل التنظيمي", path: "/org-structure" },
          { title: "Roles & Permissions", titleAr: "مصفوفة الصلاحيات", path: "/admin" },
          { title: "Planning Cycle", titleAr: "دورة التخطيط السنوية", path: "/planning-cycle" },
        ]}
      />
    </div>
  );
};
