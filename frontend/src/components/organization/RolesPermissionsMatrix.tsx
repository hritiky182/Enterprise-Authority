import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { ALL_ROLES } from '../../pages/UsersPage';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Eye,
  Edit3,
  FileCheck2,
  Send,
  Award,
  Share2,
  Download,
  Lock,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

export interface PermissionRight {
  id: 'view' | 'edit' | 'review' | 'submit' | 'approve' | 'publish' | 'export';
  label: string;
  labelAr: string;
  icon: any;
  color: string;
}

export const PERMISSION_RIGHTS: PermissionRight[] = [
  { id: 'view', label: 'View / Read', labelAr: 'قراءة واستعراض', icon: Eye, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { id: 'edit', label: 'Amend / Edit', labelAr: 'تعديل وتحرير', icon: Edit3, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'review', label: 'Review', labelAr: 'مراجعة وتدقيق', icon: FileCheck2, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { id: 'submit', label: 'Submit', labelAr: 'تقديم ورفع', icon: Send, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { id: 'approve', label: 'Approve', labelAr: 'اعتماد وموافقة', icon: Award, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { id: 'publish', label: 'Publish', labelAr: 'نشر رسمي', icon: Share2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'export', label: 'Export', labelAr: 'تصدير التقارير', icon: Download, color: 'text-slate-600 bg-slate-100 border-slate-200' },
];

export interface ModulePermissionConfig {
  moduleId: string;
  name: string;
  nameAr: string;
  category: 'Strategy' | 'Performance' | 'Governance' | 'Administration';
  permissionsByRole: Partial<Record<Role, ('view' | 'edit' | 'review' | 'submit' | 'approve' | 'publish' | 'export')[]>>;
}

export const MODULE_PERMISSIONS: ModulePermissionConfig[] = [
  {
    moduleId: 'identity',
    name: 'Strategic Identity & Pillars',
    nameAr: 'الهوية المؤسسية والركائز الاستراتيجية',
    category: 'Strategy',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'review', 'approve', 'publish', 'export'],
      'Strategy Manager': ['view', 'edit', 'review', 'submit', 'export'],
      'Strategy Specialist': ['view', 'edit', 'submit', 'export'],
      'Sector Director General': ['view', 'review', 'export'],
      'Department Manager': ['view', 'export'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view', 'export'],
      'BCM Manager': ['view', 'export'],
      'Internal Audit': ['view', 'export'],
      'Viewer': ['view'],
    },
  },
  {
    moduleId: 'diagnosis',
    name: 'Strategic Diagnosis (SWOT / PESTEL)',
    nameAr: 'التشخيص الاستراتيجي (SWOT و PESTEL)',
    category: 'Strategy',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'review', 'approve', 'export'],
      'Strategy Manager': ['view', 'edit', 'review', 'submit', 'publish', 'export'],
      'Strategy Specialist': ['view', 'edit', 'submit', 'export'],
      'Sector Director General': ['view', 'edit', 'submit', 'export'],
      'Department Manager': ['view', 'edit', 'submit', 'export'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view', 'edit', 'submit', 'export'],
      'BCM Manager': ['view', 'edit', 'submit', 'export'],
      'Internal Audit': ['view', 'export'],
      'Viewer': ['view'],
    },
  },
  {
    moduleId: 'bsc_objectives',
    name: 'BSC Perspectives & Strategic Objectives',
    nameAr: 'بطاقة الأداء المتوازن (BSC) والأهداف الاستراتيجية',
    category: 'Strategy',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'review', 'approve', 'publish', 'export'],
      'Strategy Manager': ['view', 'edit', 'review', 'submit', 'export'],
      'Strategy Specialist': ['view', 'edit', 'submit', 'export'],
      'Sector Director General': ['view', 'review', 'export'],
      'Department Manager': ['view', 'export'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view', 'export'],
      'BCM Manager': ['view', 'export'],
      'Internal Audit': ['view', 'export'],
      'Viewer': ['view'],
    },
  },
  {
    moduleId: 'kpis',
    name: 'KPIs, Baselines & Target Calibration',
    nameAr: 'مؤشرات الأداء الرئيسية والمستهدفات السنوية',
    category: 'Performance',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'approve', 'publish', 'export'],
      'Strategy Manager': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'Strategy Specialist': ['view', 'edit', 'submit', 'export'],
      'Sector Director General': ['view', 'review', 'submit', 'export'],
      'Department Manager': ['view', 'edit', 'submit', 'export'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view', 'export'],
      'BCM Manager': ['view', 'export'],
      'Internal Audit': ['view', 'export'],
      'Viewer': ['view'],
    },
  },
  {
    moduleId: 'initiatives',
    name: 'Strategic Initiatives & Execution Budgets',
    nameAr: 'المبادرات الاستراتيجية والمشاريع والموازنات',
    category: 'Performance',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'approve', 'publish', 'export'],
      'Strategy Manager': ['view', 'edit', 'review', 'submit', 'approve', 'export'],
      'Strategy Specialist': ['view', 'edit', 'submit', 'export'],
      'Sector Director General': ['view', 'edit', 'review', 'submit', 'export'],
      'Department Manager': ['view', 'edit', 'submit', 'export'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view', 'export'],
      'BCM Manager': ['view', 'export'],
      'Internal Audit': ['view', 'export'],
      'Viewer': ['view'],
    },
  },
  {
    moduleId: 'actuals_evidence',
    name: 'Performance Actuals & Evidence Submission',
    nameAr: 'القيم الفعلية للأداء واعتماد الشواهد والوثائق',
    category: 'Performance',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'export'],
      'Strategy Manager': ['view', 'review', 'approve', 'publish', 'export'],
      'Strategy Specialist': ['view', 'review', 'export'],
      'Sector Director General': ['view', 'review', 'approve', 'export'],
      'Department Manager': ['view', 'edit', 'submit', 'export'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view', 'export'],
      'BCM Manager': ['view', 'export'],
      'Internal Audit': ['view', 'export'],
      'Viewer': ['view'],
    },
  },
  {
    moduleId: 'erm_grc',
    name: 'Enterprise Risk (ERM) & Compliance Governance',
    nameAr: 'إدارة المخاطر المؤسسية والحوكمة والالتزام (GRC)',
    category: 'Governance',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'approve', 'export'],
      'Strategy Manager': ['view', 'export'],
      'Strategy Specialist': ['view'],
      'Sector Director General': ['view', 'export'],
      'Department Manager': ['view'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'BCM Manager': ['view', 'export'],
      'Internal Audit': ['view', 'review', 'export'],
      'Viewer': ['view'],
    },
  },
  {
    moduleId: 'bcm_resilience',
    name: 'Business Continuity (BCM) & Disaster Drills',
    nameAr: 'استمرارية الأعمال (BCM) والجاهزية التشغيلية للطوارئ',
    category: 'Governance',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'approve', 'export'],
      'Strategy Manager': ['view', 'export'],
      'Strategy Specialist': ['view'],
      'Sector Director General': ['view', 'export'],
      'Department Manager': ['view'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view', 'export'],
      'BCM Manager': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'Internal Audit': ['view', 'export'],
      'Viewer': ['view'],
    },
  },
  {
    moduleId: 'actions_governance',
    name: 'Central Action Plans & Corrective Tracking',
    nameAr: 'الخطط التصحيحية المركزية وإجراءات المعالجة',
    category: 'Governance',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'approve', 'export'],
      'Strategy Manager': ['view', 'edit', 'review', 'submit', 'approve', 'export'],
      'Strategy Specialist': ['view', 'edit', 'submit', 'export'],
      'Sector Director General': ['view', 'edit', 'review', 'submit', 'export'],
      'Department Manager': ['view', 'edit', 'submit', 'export'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view', 'edit', 'submit', 'export'],
      'BCM Manager': ['view', 'edit', 'submit', 'export'],
      'Internal Audit': ['view', 'review', 'export'],
      'Viewer': ['view'],
    },
  },
  {
    moduleId: 'system_admin',
    name: 'User Administration, Roles & Master Config',
    nameAr: 'إدارة المستخدمين والصلاحيات والتهيئة العامة',
    category: 'Administration',
    permissionsByRole: {
      'Authority Board & CEO': ['view', 'export'],
      'Strategy Manager': ['view'],
      'Strategy Specialist': ['view'],
      'Sector Director General': ['view'],
      'Department Manager': ['view'],
      'Administrator': ['view', 'edit', 'review', 'submit', 'approve', 'publish', 'export'],
      'GRC & Enterprise Risk': ['view'],
      'BCM Manager': ['view'],
      'Internal Audit': ['view', 'export'],
      'Viewer': ['view'],
    },
  },
];

interface RolesPermissionsMatrixProps {
  initialRole?: Role;
  onSelectRole?: (role: Role) => void;
  compact?: boolean;
}

export const RolesPermissionsMatrix: React.FC<RolesPermissionsMatrixProps> = ({
  initialRole,
  onSelectRole,
  compact = false,
}) => {
  const { currentUser, switchUserRole, lang, t } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole || currentUser.role);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredModules = MODULE_PERMISSIONS.filter((m) => {
    if (selectedCategory === 'all') return true;
    return m.category === selectedCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Controller Bar */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-600 mb-1">
            <Shield className="w-4 h-4" />
            <span>{lang === 'ar' ? 'مصفوفة التحكم بالصلاحيات المؤسسية' : 'ROLE-BASED ACCESS CONTROL (RBAC) MATRIX'}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            {lang === 'ar' ? 'مصفوفة تفويض الصلاحيات حسب الدور المؤسسي' : 'Authority Governance & Permission Matrix'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'ar'
              ? 'تحديد وضبط حقوق القراءة، والتعديل، والمراجعة، والتقديم، والاعتماد، والنشر، والتصدير عبر كافة وحدات المنظومة.'
              : 'Calibrate Read, Edit, Review, Submit, Approve, Publish, and Export rights per functional role.'}
          </p>
        </div>

        {/* Role Selector Tabs / Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs">
          {[
            'Authority Board & CEO',
            'Strategy Manager',
            'Strategy Specialist',
            'Sector Director General',
            'Department Manager',
            'GRC & Enterprise Risk',
            'BCM Manager',
            'Internal Audit',
            'Administrator',
          ].map((r) => {
            const isSelected = selectedRole === r;
            const isUserRole = currentUser.role === r;
            return (
              <button
                key={r}
                onClick={() => {
                  setSelectedRole(r as Role);
                  if (onSelectRole) onSelectRole(r as Role);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{t(r)}</span>
                {isUserRole && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isSelected ? 'bg-purple-700 text-purple-100' : 'bg-purple-100 text-purple-700'}`}>
                    {lang === 'ar' ? 'أنت' : 'YOU'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Profile Info Card */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm border border-purple-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
            {lang === 'ar' ? 'ملف الصلاحيات المختار حالياً' : 'ACTIVE INSPECTED ROLE PROFILE'}
          </div>
          <div className="text-xl font-bold mt-0.5 flex items-center gap-2">
            <span>{t(selectedRole)}</span>
            {currentUser.role === selectedRole && (
              <span className="text-xs font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full">
                {lang === 'ar' ? 'جلستك الحالية' : 'Active Session'}
              </span>
            )}
          </div>
          <p className="text-xs text-purple-200 mt-1 max-w-2xl leading-relaxed">
            {selectedRole === 'Strategy Specialist'
              ? (lang === 'ar'
                ? 'مختص بإعداد وتحديث المؤشرات وصياغة المبادرات ومتابعة المستهدفات وربط الخطط التصحيحية دون الوصول لبيانات GRC أو BCM غير الاستراتيجية.'
                : 'Dedicated to calibrating strategic indicators, drafting initiatives, updating targets, and linking action plans with strict isolation from non-strategic GRC/BCM data.')
              : selectedRole === 'GRC & Enterprise Risk'
              ? (lang === 'ar'
                ? 'صلاحيات كاملة في سجل المخاطر وسجل الالتزام ومصفوفة 5×5 وتدقيق الامتثال مع حصر الوصول لمؤشرات الاستراتيجية التشغيلية.'
                : 'Full authority across Enterprise Risk register, compliance controls, 5x5 heatmap, and audit governance with isolated focus on risk management.')
              : selectedRole === 'BCM Manager'
              ? (lang === 'ar'
                ? 'مسؤول عن تحليل الأثر على الأعمال (BIA)، وخطط التعافي من الكوارث، واختبارات الجاهزية التشغيلية للطوارئ وفق معايير ISO 22301.'
                : 'Owner of Business Impact Analysis (BIA), disaster recovery plans, operational continuity drills, and ISO 22301 compliance.')
              : selectedRole === 'Authority Board & CEO'
              ? (lang === 'ar'
                ? 'مركز القيادة التنفيذي الشامل: استعراض جميع مؤشرات الأداء والبطاقات، واعتماد الاستراتيجية، ونشر القرارات الرسمية، وتصدير التقارير القيادية.'
                : 'Executive command authority: complete cross-domain oversight, strategy approvals, publishing authority, and executive reporting.')
              : (lang === 'ar'
                ? `صلاحيات محددة وفق المسمى الوظيفي والوحدة التنظيمية لدور ${t(selectedRole)}.`
                : `Configured functional governance rights for ${selectedRole}.`)}
          </p>
        </div>

        {currentUser.role !== selectedRole && (
          <button
            onClick={() => switchUserRole(selectedRole)}
            className="px-4 py-2 bg-white text-purple-950 font-bold text-xs rounded-xl hover:bg-purple-50 transition-colors shadow-sm shrink-0 cursor-pointer flex items-center gap-1.5 self-start md:self-auto"
          >
            <Shield className="w-4 h-4 text-purple-700" />
            <span>{lang === 'ar' ? `محاكاة دور ${t(selectedRole)}` : `Simulate ${t(selectedRole)}`}</span>
          </button>
        )}
      </div>

      {/* Permission Rights Legend */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-xs">
        <span className="font-bold text-slate-700 flex items-center gap-1 mr-2">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>{lang === 'ar' ? 'مفتاح الصلاحيات:' : 'Rights Legend:'}</span>
        </span>
        {PERMISSION_RIGHTS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-medium text-[11px] ${p.color}`}>
              <Icon className="w-3 h-3" />
              <span>{lang === 'ar' ? p.labelAr : p.label}</span>
            </div>
          );
        })}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">{lang === 'ar' ? 'تصفية الوحدات:' : 'Filter Modules:'}</span>
        {['all', 'Strategy', 'Performance', 'Governance', 'Administration'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat === 'all'
              ? (lang === 'ar' ? 'كافة الوحدات (10)' : 'All Modules (10)')
              : cat === 'Strategy'
              ? (lang === 'ar' ? 'الاستراتيجية والتخطيط' : 'Strategy & Planning')
              : cat === 'Performance'
              ? (lang === 'ar' ? 'الأداء والتنفيذ' : 'Performance & Execution')
              : cat === 'Governance'
              ? (lang === 'ar' ? 'الحوكمة والمخاطر' : 'Governance & Risk')
              : (lang === 'ar' ? 'إدارة النظام' : 'Administration')}
          </button>
        ))}
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className={`py-3.5 ${lang === 'ar' ? 'pr-5 pl-4' : 'pl-5 pr-4'} w-72`}>
                  {lang === 'ar' ? 'الوحدة المؤسسية / الكيان' : 'Module / System Area'}
                </th>
                {PERMISSION_RIGHTS.map((r) => {
                  const Icon = r.icon;
                  return (
                    <th key={r.id} className="py-3.5 px-3 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <Icon className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lang === 'ar' ? r.labelAr : r.label}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredModules.map((mod) => {
                const roleRights = mod.permissionsByRole[selectedRole] || [];
                return (
                  <tr key={mod.moduleId} className="hover:bg-slate-50/70 transition-colors">
                    {/* Module Title */}
                    <td className={`py-3.5 ${lang === 'ar' ? 'pr-5 pl-4' : 'pl-5 pr-4'}`}>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">
                          {lang === 'ar' ? mod.nameAr : mod.name}
                        </div>
                        <div className="text-[10px] text-purple-700 font-mono mt-0.5">
                          {mod.category}
                        </div>
                      </div>
                    </td>

                    {/* Rights Checkmark Columns */}
                    {PERMISSION_RIGHTS.map((r) => {
                      const hasRight = roleRights.includes(r.id);
                      return (
                        <td key={r.id} className="py-3.5 px-3 text-center">
                          {hasRight ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs">
                              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-50 text-slate-300">
                              <span className="text-slate-300 font-bold text-sm">—</span>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
