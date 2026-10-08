import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AUTHORITY_SECTORS } from '../../data/mockData';
import { Department, Sector, Role, User } from '../../types';
import {
  Building2,
  Users,
  Shield,
  Layers,
  ChevronRight,
  UserCheck,
  UserPlus,
  Trash2,
  Edit3,
  Mail,
  Search,
  ExternalLink,
  Crown,
  Briefcase,
  FileText,
  Lock,
  Landmark,
  Compass,
  TrendingUp,
  Cpu,
  Archive,
  BarChart3,
  Network,
  CheckCircle2,
  Plus,
  ArrowRight,
  Key,
  X,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { StrategicLifecycleProgression } from '../common/StrategicLifecycleProgression';

export const ALL_ASSIGNABLE_ROLES: Role[] = [
  'Strategy Specialist',
  'Strategy Manager',
  'Authority Board & CEO',
  'Sector Director General',
  'Department Manager',
  'GRC & Enterprise Risk',
  'Cybersecurity Officer',
  'Internal Audit',
  'Risk Manager',
  'Compliance Manager',
  'BCM Manager',
  'Executive',
  'Viewer',
  'Administrator',
];

export const OperationalStructureView: React.FC = () => {
  const navigate = useNavigate();
  const {
    departments,
    addDepartment,
    updateDepartment,
    users,
    addUser,
    updateUserRole,
    deleteUser,
    switchUserRole,
    setDemoJourneyStep,
    lang,
    t,
  } = useApp();

  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeViewMode, setActiveViewMode] = useState<'hierarchy' | 'grid' | 'personnel'>('hierarchy');

  // Selected Department for Details & Permissions Drawer/Modal
  const [selectedDeptForModal, setSelectedDeptForModal] = useState<Department | null>(null);
  const [activePermissions, setActivePermissions] = useState<string[]>([]);

  // Add Department Modal
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptNameAr, setNewDeptNameAr] = useState('');
  const [newDeptHead, setNewDeptHead] = useState('');
  const [newDeptSectorId, setNewDeptSectorId] = useState(AUTHORITY_SECTORS[0]?.id || 'sec-ssd');
  const [newDeptEmployeeCount, setNewDeptEmployeeCount] = useState(15);

  // Personnel & Role Management State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUserForRoleEdit, setSelectedUserForRoleEdit] = useState<User | null>(null);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');

  // Form State for Adding Personnel
  const [newUserName, setNewUserName] = useState('');
  const [newUserNameAr, setNewUserNameAr] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserTitle, setNewUserTitle] = useState('');
  const [newUserTitleAr, setNewUserTitleAr] = useState('');
  const [newUserDept, setNewUserDept] = useState(departments[0]?.name || 'Strategy & Sector Development');
  const [newUserRole, setNewUserRole] = useState<Role>('Strategy Specialist');

  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال الاسم والبريد الإلكتروني' : 'Please provide full name and work email');
      return;
    }

    addUser({
      name: newUserName.trim(),
      nameAr: newUserNameAr.trim() || undefined,
      title: newUserTitle.trim() || `${newUserRole} Officer`,
      titleAr: newUserTitleAr.trim() || undefined,
      email: newUserEmail.trim(),
      role: newUserRole,
      department: newUserDept,
      departmentAr: departments.find((d) => d.name === newUserDept)?.nameAr,
      avatar: '',
    });

    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserNameAr('');
    setNewUserEmail('');
    setNewUserTitle('');
    setNewUserTitleAr('');
  };

  const handleUpdateRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForRoleEdit) return;
    updateUserRole(selectedUserForRoleEdit.id, selectedUserForRoleEdit.role);
    setSelectedUserForRoleEdit(null);
  };

  const advisoryOffices = departments.filter((d) => d.category === 'Advisory & Oversight');

  const filteredDepartments = departments.filter((d) => {
    if (selectedSector && d.sectorId !== selectedSector) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = d.name.toLowerCase().includes(q);
      const matchNameAr = (d.nameAr || '').toLowerCase().includes(q);
      const matchCode = d.code.toLowerCase().includes(q);
      const matchHead = d.head.toLowerCase().includes(q);
      return matchName || matchNameAr || matchCode || matchHead;
    }
    return true;
  });

  const filteredPersonnel = users.filter((u) => {
    if (selectedRoleFilter !== 'all' && u.role !== selectedRoleFilter) return false;
    if (userSearchTerm.trim()) {
      const q = userSearchTerm.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchNameAr = (u.nameAr || '').toLowerCase().includes(q);
      const matchEmail = u.email.toLowerCase().includes(q);
      const matchTitle = u.title.toLowerCase().includes(q);
      const matchDept = u.department.toLowerCase().includes(q);
      return matchName || matchNameAr || matchEmail || matchTitle || matchDept;
    }
    return true;
  });

  const handleOpenDeptModal = (dept: Department) => {
    setSelectedDeptForModal(dept);
    setActivePermissions(
      dept.permissions || [
        'read_strategy',
        'manage_objectives',
        'approve_kpis',
        'approve_budget',
      ]
    );
  };

  const handleTogglePermission = (permKey: string) => {
    if (activePermissions.includes(permKey)) {
      setActivePermissions(activePermissions.filter((p) => p !== permKey));
    } else {
      setActivePermissions([...activePermissions, permKey]);
    }
  };

  const handleSavePermissions = () => {
    if (selectedDeptForModal) {
      updateDepartment(selectedDeptForModal.id, {
        permissions: activePermissions,
      });
      setSelectedDeptForModal(null);
    }
  };

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptCode.trim() || !newDeptName.trim() || !newDeptHead.trim()) {
      toast.error(lang === 'ar' ? 'الرجاء ملء كافة الحقول الإلزامية' : 'Please fill all required fields');
      return;
    }

    const parentSector = AUTHORITY_SECTORS.find((s) => s.id === newDeptSectorId);

    addDepartment({
      code: newDeptCode.trim(),
      name: newDeptName.trim(),
      nameAr: newDeptNameAr.trim() || undefined,
      head: newDeptHead.trim(),
      employeeCount: Number(newDeptEmployeeCount) || 10,
      sectorId: newDeptSectorId,
      sectorName: parentSector?.name || 'Operational Sector',
      category: 'Operational Sector',
      permissions: ['read_strategy', 'manage_objectives'],
    });

    setIsAddDeptModalOpen(false);
    setNewDeptCode('');
    setNewDeptName('');
    setNewDeptNameAr('');
    setNewDeptHead('');
  };

  const PERMISSION_OPTIONS = [
    {
      key: 'read_strategy',
      label: 'View Strategic Matrices & Cascades',
      labelAr: 'الاطلاع على مصفوفات المواءمة الاستراتيجية',
      description: 'Access executive strategy map and cascading models',
    },
    {
      key: 'manage_objectives',
      label: 'Create & Edit Department Objectives',
      labelAr: 'صياغة وتعديل المستهدفات التكتيكية للإدارة',
      description: 'Author department-level OKRs and update milestones',
    },
    {
      key: 'approve_kpis',
      label: 'Approve & Publish Quarterly KPIs',
      labelAr: 'اعتماد واعتماد قياسات المؤشرات الربعية',
      description: 'Sign-off on verified mathematical KPI achievements',
    },
    {
      key: 'approve_budget',
      label: 'Authorize Initiative Capital Spend',
      labelAr: 'اعتماد الميزانيات والصرف الرأسمالي للمبادرات',
      description: 'Sign-off on regional project expenditure and milestones',
    },
    {
      key: 'manage_risks',
      label: 'Maintain Sector Risk Register',
      labelAr: 'إدارة وتحديث سجل مخاطر القطاع (ISO 31000)',
      description: 'Assess threat likelihood, impacts, and mitigation plans',
    },
    {
      key: 'audit_access',
      label: 'Executive Board Audit & Oversight',
      labelAr: 'صلاحيات الرقابة وتدقيق الامتثال لمجلس الهيئة',
      description: 'View full system audit logs and compliance evidence',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Executive Structure Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 rounded-2xl text-white border border-slate-700 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-300">
              <Network className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الهيكل التنظيمي والتشغيلي المعتمد للهيئة' : "THE AUTHORITY'S OPERATIONAL STRUCTURE"}</span>
            </div>
            <h2 className="text-xl font-bold font-sans">
              {lang === 'ar' ? 'إطار الهيكل التنظيمي والصلاحيات المؤسسية' : 'Al Ahsa Development Authority Hierarchy & RBAC'}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'الهيكل الإداري التنفيذي الرسمي الذي يشمل مجلس الهيئة، ومكتب الرئيس التنفيذي، والإدارات الرقابية، و5 قطاعات تشغيلية متخصصة مع إدارة ديناميكية للصلاحيات والوحدات.'
                : 'Executive architecture encompassing the Authority Board, CEO Office, oversight directorates, and 5 specialized operational sectors with active unit and permission management.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? '+ إضافة موظف وتعيين الدور' : '+ Add Person & Assign Role'}</span>
            </button>

            <button
              onClick={() => setIsAddDeptModalOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? '+ إضافة وحدة تنظيمية' : '+ Add Operational Unit'}</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setActiveViewMode('hierarchy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeViewMode === 'hierarchy'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'ar' ? 'المخطط الهيكلي' : 'Org Tree'}
              </button>
              <button
                onClick={() => setActiveViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeViewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'ar' ? `الوحدات (${departments.length})` : `Units (${departments.length})`}
              </button>
              <button
                onClick={() => setActiveViewMode('personnel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeViewMode === 'personnel'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3 h-3" />
                <span>{lang === 'ar' ? `الموظفون والأدوار (${users.length})` : `Personnel & Roles (${users.length})`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Sector Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 mr-1">
            {lang === 'ar' ? 'تصفية حسب القطاع:' : 'Filter Sector:'}
          </span>
          <button
            onClick={() => setSelectedSector(null)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer ${
              selectedSector === null
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {lang === 'ar' ? `جميع القطاعات والوحدات (${departments.length})` : `All Sectors & Units (${departments.length})`}
          </button>
          {AUTHORITY_SECTORS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSector(sec.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                selectedSector === sec.id
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {lang === 'ar' ? sec.nameAr || sec.name : sec.name}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE HIERARCHY TREE */}
      {activeViewMode === 'hierarchy' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-8 overflow-x-auto">
          {/* Level 1: Authority Board & Secretariat */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Internal Audit (Independent Oversight Node) */}
              <div
                onClick={() => {
                  const iaDept = departments.find((d) => d.id === 'dept-ia');
                  if (iaDept) handleOpenDeptModal(iaDept);
                }}
                className="w-56 p-3.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center shadow-2xs hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">
                    {lang === 'ar' ? 'الرقابة المستقلة' : 'Independent Oversight'}
                  </span>
                  <Key className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </div>
                <div className="font-bold text-xs text-slate-900 mt-1">
                  {lang === 'ar' ? 'المراجعة الداخلية' : 'Internal Audit'}
                </div>
                <div className="text-[10px] text-blue-700 font-mono mt-1">
                  {lang === 'ar' ? 'المدير: عبد الله الغامدي' : 'Head: Abdullah Al-Ghamdi'}
                </div>
              </div>

              {/* Authority Board (Supreme Governance Node) */}
              <div className="w-72 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white text-center shadow-lg border-2 border-amber-400/40 relative">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-2 shadow-md">
                  <Crown className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm tracking-wide uppercase">
                  {lang === 'ar' ? 'مجلس الهيئة' : 'Authority Board'}
                </h3>
                <div className="text-[10px] text-slate-300 font-mono mt-1 border-t border-slate-800 pt-1.5">
                  {lang === 'ar' ? 'برئاسة سمو الأمير سعود بن طلال بن بدر آل سعود' : 'Chaired by H.R.H. Prince Saud bin Talal Al Saud'}
                </div>
              </div>

              {/* Board Secretariat Node */}
              <div
                onClick={() => {
                  const bdDept = departments.find((d) => d.id === 'dept-board');
                  if (bdDept) handleOpenDeptModal(bdDept);
                }}
                className="w-56 p-3.5 rounded-xl border border-slate-200 bg-white text-center shadow-2xs hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono font-bold uppercase text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    {lang === 'ar' ? 'أمانة المجلس' : 'Board Advisory'}
                  </span>
                  <Key className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </div>
                <div className="font-bold text-xs text-slate-900 mt-1">
                  {lang === 'ar' ? 'أمانة مجلس الهيئة' : 'Authority Board Secretariat'}
                </div>
                <div className="text-[10px] text-slate-600 font-mono mt-1">
                  {lang === 'ar' ? 'ماجد المطيري' : 'Majed Al-Mutairi'}
                </div>
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-0.5 h-8 bg-blue-600 my-1" />

            {/* Level 2: Chief Executive Officer (CEO) */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-68 p-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center shadow-md border border-blue-500 relative">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-200">
                  {lang === 'ar' ? 'القيادة التنفيذية العليا' : 'Chief Executive Officer'}
                </div>
                <h3 className="font-bold text-sm mt-0.5">
                  {lang === 'ar' ? 'م. عبد العزيز بن أحمد الحسن' : 'Eng. Abdulaziz Al-Hassan'}
                </h3>
                <div className="text-[10px] text-blue-200/90 font-mono mt-1 font-semibold flex items-center justify-center gap-1.5">
                  <span>CEO Office • Authority Oversight</span>
                </div>
              </div>

              {/* CEO Office */}
              <div
                onClick={() => {
                  const ceoDept = departments.find((d) => d.id === 'dept-ceo');
                  if (ceoDept) handleOpenDeptModal(ceoDept);
                }}
                className="w-48 p-3 rounded-xl border border-blue-200 bg-blue-50/60 text-center shadow-2xs hover:border-blue-400 transition-all cursor-pointer"
              >
                <div className="font-bold text-xs text-blue-950">
                  {lang === 'ar' ? 'مكتب الرئيس التنفيذي' : 'CEO Office'}
                </div>
                <div className="text-[10px] text-blue-700 font-mono mt-0.5">
                  {lang === 'ar' ? 'فهد الكلثم' : 'Fahad Al-Kaltham'}
                </div>
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-0.5 h-8 bg-blue-600 my-1" />

            {/* Level 3: Direct Advisory & Oversight Offices Grid */}
            <div className="w-full max-w-4xl p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-mono font-semibold text-slate-600">
                <span className="uppercase text-[10px] text-blue-700 font-bold">
                  {lang === 'ar' ? 'الإدارات الاستشارية والرقابية المباشرة (انقر لإدارة الصلاحيات)' : 'Direct Advisory & Oversight Directorates (Click for Permissions)'}
                </span>
                <span>{lang === 'ar' ? 'ترتبط بالرئيس التنفيذي' : 'Reports Directly to CEO'}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
                {advisoryOffices
                  .filter((d) => d.id !== 'dept-ia')
                  .map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => handleOpenDeptModal(dept)}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-center space-y-1 hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer group"
                    >
                      <div className="font-bold text-[11px] text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                        {lang === 'ar' ? dept.nameAr || dept.name : dept.name}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-100 truncate">
                        {dept.head}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-0.5 h-8 bg-blue-600 my-1" />
          </div>

          {/* Level 4: The 5 Core Operational Sectors */}
          <div className="pt-2">
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                {lang === 'ar' ? 'القطاعات التشغيلية الرئيسية الخمسة' : 'CORE OPERATIONAL SECTORS (5 DIVISIONS)'}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'ar' ? 'قطاعات التنمية والتنفيذ المؤسسي' : 'Specialized Executive Sectors & Operational Units'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {AUTHORITY_SECTORS.map((sector) => {
                const subDepts = departments.filter((d) => d.sectorId === sector.id);

                return (
                  <div
                    key={sector.id}
                    className={`rounded-2xl border transition-all ${
                      selectedSector === sector.id
                        ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                        : 'border-slate-200 shadow-xs hover:border-slate-300'
                    } flex flex-col justify-between overflow-hidden bg-white`}
                  >
                    {/* Sector Header */}
                    <div className="p-4 bg-slate-900 text-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-300 font-bold">
                          {sector.code}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">
                          {lang === 'ar' ? `${subDepts.length} إدارات` : `${subDepts.length} Units`}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-white leading-tight">
                        {lang === 'ar' ? sector.nameAr || sector.name : sector.name}
                      </h4>
                      <div className="text-[10px] text-blue-300 font-mono pt-1">
                        {lang === 'ar' ? `الرئيس: ${sector.head}` : `Lead: ${sector.head}`}
                      </div>
                    </div>

                    {/* Sub-departments List */}
                    <div className="p-3 space-y-2 flex-1 bg-slate-50/40 divide-y divide-slate-100">
                      {subDepts.map((sub) => (
                        <div
                          key={sub.id}
                          onClick={() => handleOpenDeptModal(sub)}
                          className="pt-2 first:pt-0 p-1.5 rounded-lg hover:bg-white hover:shadow-2xs transition-all cursor-pointer group"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-xs text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                              {lang === 'ar' ? sub.nameAr || sub.name : sub.name}
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 shrink-0 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                              {lang === 'ar' ? `${sub.employeeCount} كادر` : `${sub.employeeCount}p`}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate flex items-center justify-between">
                            <span>{sub.head}</span>
                            <Key className="w-2.5 h-2.5 text-slate-300 group-hover:text-blue-600" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Sector Footer Tag */}
                    <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center">
                      <button
                        onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                        className="text-[10px] font-mono font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                      >
                        {selectedSector === sector.id
                          ? (lang === 'ar' ? 'إلغاء التحديد' : 'Clear Focus')
                          : (lang === 'ar' ? 'تركيز القطاع ←' : 'Focus Sector →')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FULL DIRECTORY GRID VIEW */}
      {activeViewMode === 'grid' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'البحث في الإدارات والمدراء...' : 'Search departments, directors...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full ps-9 pe-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="text-xs text-slate-500 font-mono">
              {lang === 'ar'
                ? `عرض ${filteredDepartments.length} من أصل ${departments.length} وحدة تنظيمية`
                : `Showing ${filteredDepartments.length} of ${departments.length} Organizational Units`}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => handleOpenDeptModal(dept)}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {dept.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {lang === 'ar' ? `${dept.employeeCount} كادر` : `${dept.employeeCount} Cadres`}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                    {lang === 'ar' ? dept.nameAr || dept.name : dept.name}
                  </h3>
                  {dept.sectorName && (
                    <div className="text-[11px] font-semibold text-blue-600 mt-1 font-mono">
                      {lang === 'ar'
                        ? AUTHORITY_SECTORS.find((s) => s.id === dept.sectorId)?.nameAr || dept.sectorName
                        : dept.sectorName}
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-600 pt-2 border-t border-slate-100 font-mono flex items-center justify-between">
                  <span>{lang === 'ar' ? 'المدير المسؤول:' : 'Lead Officer:'}</span>
                  <span className="font-bold text-slate-900">{dept.head}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: PERSONNEL & ROLE ASSIGNMENTS DIRECTORY */}
      {activeViewMode === 'personnel' && (
        <div className="space-y-4">
          {/* Personnel Stat Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                {lang === 'ar' ? 'إجمالي الكوادر المسجلة' : 'Total Assigned Personnel'}
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">{users.length}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {lang === 'ar' ? 'مستخدمون نشطون بالمنظومة' : 'Active system users'}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-mono text-blue-600 uppercase font-semibold">
                {lang === 'ar' ? 'أخصائيو الاستراتيجية' : 'Strategy Specialists'}
              </div>
              <div className="text-xl font-bold font-mono text-blue-700 mt-1">
                {users.filter((u) => u.role === 'Strategy Specialist' || u.role === 'Strategy Manager').length}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {lang === 'ar' ? 'صلاحيات صياغة الخطة ومواءمتها' : 'Architecture & cascade authority'}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-mono text-emerald-600 uppercase font-semibold">
                {lang === 'ar' ? 'مديرو الإدارات والقطاعات' : 'Sector & Dept Managers'}
              </div>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-1">
                {users.filter((u) => u.role === 'Department Manager' || u.role === 'Sector Director General').length}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {lang === 'ar' ? 'مسؤولو الأهداف ومؤشرات الأداء' : 'OKR & KPI operational leads'}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-mono text-purple-600 uppercase font-semibold">
                {lang === 'ar' ? 'القيادة التنفيذية والمجلس' : 'Executive Leadership'}
              </div>
              <div className="text-xl font-bold font-mono text-purple-700 mt-1">
                {users.filter((u) => u.role === 'Authority Board & CEO' || u.role === 'Executive').length}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {lang === 'ar' ? 'مجلس الهيئة ومكتب الرئيس' : 'Board & CEO governance'}
              </div>
            </div>
          </div>

          {/* Personnel Filter & Search Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
              <div className="relative flex-1 min-w-[200px]">
                <Search className={`w-3.5 h-3.5 absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
                <input
                  type="text"
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  placeholder={lang === 'ar' ? 'بحث بالاسم، البريد الإلكتروني، المسمى، أو الإدارة...' : 'Search by name, email, title, or department...'}
                  className={`w-full ${lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600`}
                />
              </div>

              {/* Role Filter */}
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-600"
              >
                <option value="all">{lang === 'ar' ? 'جميع الأدوار المؤسسية' : 'All Assigned Roles'}</option>
                {ALL_ASSIGNABLE_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {t(r)}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? '+ إضافة موظف وتعيين دور' : '+ Add Person & Assign Role'}</span>
            </button>
          </div>

          {/* Personnel Data Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {lang === 'ar' ? 'دليل الكوادر وتوزيع الأدوار والصلاحيات' : 'Personnel Directory & Role Assignments'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {lang === 'ar'
                    ? 'إمكانية إضافة كوادر جديدة وتعيين أدوارهم المؤسسية، أو تعديل الصلاحيات الممنوحة.'
                    : 'Manage active personnel, assign system roles, and configure governance responsibilities.'}
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {lang === 'ar' ? `العدد: ${filteredPersonnel.length}` : `Count: ${filteredPersonnel.length}`}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4 text-start">{lang === 'ar' ? 'الموظف / البريد' : 'Person & Email'}</th>
                    <th className="py-3 px-4 text-start">{lang === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}</th>
                    <th className="py-3 px-4 text-start">{lang === 'ar' ? 'الإدارة / الوحدة' : 'Department'}</th>
                    <th className="py-3 px-4 text-start">{lang === 'ar' ? 'الدور المعتمد' : 'Assigned Role'}</th>
                    <th className="py-3 px-4 text-end">{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPersonnel.map((u) => {
                    const initials = u.name
                      .split(' ')
                      .map((w) => w[0])
                      .filter(Boolean)
                      .slice(0, 2)
                      .join('')
                      .toUpperCase();

                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold font-mono text-xs flex items-center justify-center shrink-0 border border-blue-200">
                              {initials || 'SS'}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">
                                {lang === 'ar' ? u.nameAr || u.name : u.name}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span>{u.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700">
                          {lang === 'ar' ? u.titleAr || u.title : u.title}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                          {lang === 'ar' ? u.departmentAr || u.department : u.department}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                              u.role === 'Strategy Specialist'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : u.role === 'Strategy Manager'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : u.role === 'Authority Board & CEO'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : u.role === 'Department Manager'
                                ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <Shield className="w-3 h-3" />
                            <span>{t(u.role)}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-end">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedUserForRoleEdit(u)}
                              className="px-2 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-slate-200"
                              title={lang === 'ar' ? 'تعديل الدور' : 'Change Role'}
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{lang === 'ar' ? 'تعديل الدور' : 'Assign Role'}</span>
                            </button>
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                              title={lang === 'ar' ? 'حذف' : 'Remove'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={3}
        stageTitle="Enterprise Organization Structure & Governance Ownership"
        stageTitleAr="الهيكل التنظيمي المؤسسي وتوزيع ملكية الحوكمة"
        prevStage={{
          stage: 2,
          title: "User Administration",
          titleAr: "إدارة المستخدمين والأدوار",
          path: "/users",
        }}
        nextStage={{
          stage: 4,
          title: "Roles & Permissions Matrix",
          titleAr: "مصفوفة الأدوار والصلاحيات",
          path: "/admin",
        }}
        relatedLinks={[
          { title: "Planning Cycle", titleAr: "دورة التخطيط السنوية", path: "/planning-cycle" },
          { title: "Departmental Cascade", titleAr: "المواءمة الإدارية", path: "/departmental-cascade" },
          { title: "Personal Workspace", titleAr: "مساحة العمل", path: "/workspace" },
        ]}
      />

      {/* MODAL 1: DEPARTMENT DETAILS & RBAC PERMISSIONS DRAWER */}
      {selectedDeptForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in slide-in-from-bottom-2">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold font-mono">
                  {selectedDeptForModal.code}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {lang === 'ar' ? selectedDeptForModal.nameAr || selectedDeptForModal.name : selectedDeptForModal.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {lang === 'ar' ? `مدير الوحدة: ${selectedDeptForModal.head}` : `Lead: ${selectedDeptForModal.head}`} • {selectedDeptForModal.employeeCount} Cadres
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDeptForModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: RBAC Permissions Matrix */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Key className="w-3.5 h-3.5 text-blue-600" />
                  <span>{lang === 'ar' ? 'مصفوفة صلاحيات الإدارة (RBAC Permissions Matrix)' : 'Assigned Role Permissions (RBAC Matrix)'}</span>
                </div>
                <span className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {activePermissions.length} Active
                </span>
              </div>

              <div className="space-y-2">
                {PERMISSION_OPTIONS.map((perm) => {
                  const isChecked = activePermissions.includes(perm.key);
                  return (
                    <div
                      key={perm.key}
                      onClick={() => handleTogglePermission(perm.key)}
                      className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'border-blue-400 bg-blue-50/50 text-slate-900'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="font-bold">
                          {lang === 'ar' ? perm.labelAr : perm.label}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {perm.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Personnel in this Department */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{lang === 'ar' ? 'الكوادر والمستخدمون المسجلون' : 'Assigned Cadres & Users'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {lang === 'ar' ? 'انقر لمحاكاة الدور مباشرة' : 'Click to simulate user role'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {users
                    .filter((u) => u.department.includes(selectedDeptForModal.name) || u.name.includes(selectedDeptForModal.head))
                    .slice(0, 3)
                    .map((user) => (
                      <div
                        key={user.id}
                        className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                          <div>
                            <div className="font-semibold text-slate-900">{user.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{user.role}</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            switchUserRole(user.role);
                            setSelectedDeptForModal(null);
                          }}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-semibold transition-colors cursor-pointer"
                        >
                          {lang === 'ar' ? 'محاكاة الدور' : 'Simulate Role'}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedDeptForModal(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleSavePermissions}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
              >
                {lang === 'ar' ? 'حفظ الصلاحيات' : 'Save Permissions'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD OPERATIONAL UNIT */}
      {isAddDeptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-2">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  {lang === 'ar' ? 'إضافة وحدة تنظيمية / إدارة جديدة' : 'Add New Operational Unit'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddDeptModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDepartment} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'رمز الوحدة' : 'Unit Code'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDeptCode}
                    onChange={(e) => setNewDeptCode(e.target.value)}
                    placeholder="e.g. SSD-TO"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'القطاع التابع له' : 'Parent Sector'} *
                  </label>
                  <select
                    value={newDeptSectorId}
                    onChange={(e) => setNewDeptSectorId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    {AUTHORITY_SECTORS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.code} — {lang === 'ar' ? s.nameAr || s.name : s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم الوحدة التنظيمية (بالإنجليزية)' : 'Unit Name (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  placeholder="e.g. Tourism Development Office"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم الوحدة التنظيمية (بالعربية)' : 'Unit Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={newDeptNameAr}
                  onChange={(e) => setNewDeptNameAr(e.target.value)}
                  dir="rtl"
                  placeholder="مثال: مكتب تطوير السياحة"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 text-right"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'مدير الوحدة المسند' : 'Lead Officer'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDeptHead}
                    onChange={(e) => setNewDeptHead(e.target.value)}
                    placeholder="e.g. Eng. Tariq Al-Dosari"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'عدد الكوادر' : 'Employee Count'}
                  </label>
                  <input
                    type="number"
                    value={newDeptEmployeeCount}
                    onChange={(e) => setNewDeptEmployeeCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDeptModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'إضافة الوحدة' : 'Create Unit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD PERSON & ASSIGN ROLE */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-2">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {lang === 'ar' ? 'إضافة شخص جديد وتعيين دوره المؤسسي' : 'Add Person & Assign Role'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {lang === 'ar' ? 'منح الصلاحيات ضمن الهيكل التنظيمي للهيئة' : 'Enroll authority staff and configure role-based access'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الاسم بالإنجليزية' : 'Full Name (English)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. Faisal Al-Otaibi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الاسم بالعربية' : 'Full Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={newUserNameAr}
                    onChange={(e) => setNewUserNameAr(e.target.value)}
                    dir="rtl"
                    placeholder="مثال: فيصل العتيبي"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'البريد الإلكتروني المهني' : 'Work Email Address'} *
                </label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="name@ahda.gov.sa"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المسمى الوظيفي (بالإنجليزية)' : 'Job Title (English)'}
                  </label>
                  <input
                    type="text"
                    value={newUserTitle}
                    onChange={(e) => setNewUserTitle(e.target.value)}
                    placeholder="e.g. Senior Strategy Analyst"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المسمى الوظيفي (بالعربية)' : 'Job Title (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={newUserTitleAr}
                    onChange={(e) => setNewUserTitleAr(e.target.value)}
                    dir="rtl"
                    placeholder="مثال: محلل استراتيجية أول"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الإدارة / القسم التابع له' : 'Department'} *
                  </label>
                  <select
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {lang === 'ar' ? d.nameAr || d.name : d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الدور المسند (Role Assignment)' : 'Assigned Role'} *
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as Role)}
                    className="w-full px-3 py-2 bg-blue-50/70 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    {ALL_ASSIGNABLE_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {t(r)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إضافة وتعيين الدور' : 'Add Person & Assign Role'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: EDIT / CHANGE ASSIGNED ROLE */}
      {selectedUserForRoleEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-2">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {lang === 'ar' ? 'تعديل الدور المؤسسي المسند' : 'Modify Role Assignment'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {selectedUserForRoleEdit.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUserForRoleEdit(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateRoleSubmit} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-slate-900">
                  {lang === 'ar' ? selectedUserForRoleEdit.nameAr || selectedUserForRoleEdit.name : selectedUserForRoleEdit.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  {selectedUserForRoleEdit.title} • {selectedUserForRoleEdit.department}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الدور الجديد المسند' : 'Select New Assigned Role'} *
                </label>
                <select
                  value={selectedUserForRoleEdit.role}
                  onChange={(e) =>
                    setSelectedUserForRoleEdit({
                      ...selectedUserForRoleEdit,
                      role: e.target.value as Role,
                    })
                  }
                  className="w-full px-3 py-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  {ALL_ASSIGNABLE_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {t(r)}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  {lang === 'ar'
                    ? 'سيتم منح هذا المستخدم كافة صلاحيات وأذونات هذا الدور فوراً.'
                    : 'This user will immediately inherit access permissions and strategic delegation granted to this role.'}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedUserForRoleEdit(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'حفظ التعديل' : 'Update Assigned Role'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
