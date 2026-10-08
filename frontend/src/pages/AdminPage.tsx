import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../data/mockData';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { User, Role } from '../types';
import { OperationalStructureView } from '../components/organization/OperationalStructureView';
import { RolesPermissionsMatrix } from '../components/organization/RolesPermissionsMatrix';
import { UserAvatar } from '../components/common/UserAvatar';
import {
  Settings,
  Users,
  Shield,
  Building,
  Key,
  CheckCircle,
  Lock,
  Upload,
  Download,
  Database,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Network,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';

const SAMPLE_USER_CSV = `FullName,Email,JobTitle,Department,Role
Eng. Zaid Al-Ghamdi,zaid.ghamdi@ahda.gov.sa,Lead Cloud Architect,Cybersecurity,Compliance Manager
Dr. Laila Al-Mansoor,laila.mansoor@ahda.gov.sa,Senior ERM Consultant,Governance, Risk & Compliance,Risk Manager
Majed Al-Mutairi,majed.mutairi@ahda.gov.sa,Strategic Performance Lead,Strategy Development,Strategy Manager
Noura Al-Hassan,noura.hassan@ahda.gov.sa,Chief Internal Auditor,Internal Audit,Auditor`;

export const AdminPage: React.FC = () => {
  const { currentUser, switchUserRole, users, importUsers, exportAllDataAsJson, resetAllDataToDefaults, lang, t } = useApp();
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'departments' | 'data_import'>('users');

  // User CSV upload state
  const [userFileName, setUserFileName] = useState<string | null>(null);
  const [parsedUsers, setParsedUsers] = useState<Partial<User>[]>([]);
  const [userParseError, setUserParseError] = useState<string | null>(null);
  const userFileInputRef = useRef<HTMLInputElement>(null);

  const rolesList: Role[] = [
    'Strategy Specialist',
    'Strategy Manager',
    'Authority Board & CEO',
    'Sector Director General',
    'Department Manager',
    'GRC & Enterprise Risk',
    'Cybersecurity Officer',
    'Internal Audit',
    'Administrator',
    'Viewer',
  ];

  const userColumns: Column<User>[] = [
    {
      header: t('User Profile'),
      accessorKey: 'name',
      sortable: true,
      cell: (u) => (
        <div className="flex items-center space-x-3">
          <UserAvatar name={u.name} nameAr={u.nameAr} gender={u.gender} role={u.role} size="sm" />
          <div>
            <div className="font-semibold text-slate-900">{lang === 'ar' ? u.nameAr || u.name : u.name}</div>
            <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
          </div>
        </div>
      ),
    },
    { header: t('Job Title'), accessorKey: 'title', sortable: true, cell: (u) => <span className="font-medium text-slate-800">{lang === 'ar' ? (u.titleAr || u.title) : u.title}</span> },
    { header: t('Department'), accessorKey: 'department', sortable: true, cell: (u) => <span className="text-slate-600">{t(u.department)}</span> },
    {
      header: t('Active Role'),
      accessorKey: 'role',
      sortable: true,
      cell: (u) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {t(u.role)}
        </span>
      ),
    },
    {
      header: t('Switch Simulation'),
      cell: (u) => (
        <button
          onClick={() => switchUserRole(u.role)}
          className="px-2.5 py-1 rounded bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 cursor-pointer"
        >
          {t('Simulate User')}
        </button>
      ),
    },
  ];

  const parseUserCSV = (csvText: string) => {
    const lines = csvText
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const headerLine = lines[0];
    if (!headerLine || lines.length < 2) {
      throw new Error('CSV must contain a header and at least one user record.');
    }

    const headers = headerLine.split(',').map((h) => h.trim().toLowerCase());
    const nameIdx = headers.findIndex((h) => h.includes('name') || h.includes('user'));
    const emailIdx = headers.findIndex((h) => h.includes('email'));
    const titleIdx = headers.findIndex((h) => h.includes('title') || h.includes('job'));
    const deptIdx = headers.findIndex((h) => h.includes('dept') || h.includes('department'));
    const roleIdx = headers.findIndex((h) => h.includes('role'));

    if (nameIdx === -1 || emailIdx === -1) {
      throw new Error('CSV must contain "FullName" and "Email" columns.');
    }

    const newUsers: Partial<User>[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const values = line.split(',').map((v) => v.replace(/^"|"$/g, '').trim());
      const name = values[nameIdx];
      const email = values[emailIdx];
      if (!name || !email) continue;

      const title = titleIdx !== -1 && values[titleIdx] ? values[titleIdx] : 'Enterprise Officer';
      const department = deptIdx !== -1 && values[deptIdx] ? values[deptIdx] : 'Strategic Development Office';
      const roleRaw = roleIdx !== -1 && values[roleIdx] ? values[roleIdx] : 'Viewer';
      const role = (rolesList.includes(roleRaw as Role) ? roleRaw : 'Viewer') as Role;

      newUsers.push({
        name,
        email,
        title,
        department,
        role,
      });
    }

    if (newUsers.length === 0) throw new Error('No valid user rows found.');
    return newUsers;
  };

  const handleUserFileUpload = (file: File) => {
    setUserFileName(file.name);
    setUserParseError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const usersList = parseUserCSV(text);
        setParsedUsers(usersList);
      } catch (err: any) {
        setUserParseError(err.message || 'Failed to parse user accounts CSV.');
        setParsedUsers([]);
      }
    };
    reader.readAsText(file);
  };

  const handleCommitUserImport = () => {
    if (parsedUsers.length === 0) return;
    importUsers(parsedUsers);
    setParsedUsers([]);
    setUserFileName(null);
    setActiveTab('users');
  };

  const downloadSampleUserCSV = () => {
    const blob = new Blob([SAMPLE_USER_CSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enterprise_users_import_template.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Sample User Roster CSV Template Downloaded');
  };

  const handleExportSystemSnapshot = () => {
    const snapshot = {
      timestamp: new Date().toISOString(),
      organization: 'Enterprise Strategy & Governance Suite',
      usersCount: users.length,
      users,
      departments: DEPARTMENTS,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enterprise_system_snapshot_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('System Snapshot Exported Successfully');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <Settings className="w-4 h-4" />
            <span>{t('ENTERPRISE ACCESS CONTROL & RBAC')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {t('System Administration, Users & RBAC Simulator')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('Manage organizational roles, inspect department allocations, and simulate stakeholder experiences.')}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'users' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'ar' ? 'المستخدمين' : 'Users'} ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'roles' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'ar' ? 'الأدوار والصلاحيات' : 'RBAC Roles'} ({rolesList.length})
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'departments' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'ar' ? 'الإدارات' : 'Departments'} ({DEPARTMENTS.length})
          </button>
          <button
            onClick={() => setActiveTab('data_import')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center space-x-1.5 transition-colors ${
              activeTab === 'data_import' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'ar' ? 'مركز استيراد البيانات' : 'Data Import Hub'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-xs font-bold text-slate-900">{lang === 'ar' ? 'إدارة حسابات المستخدمين' : 'User Account Management'}</h3>
              <p className="text-[11px] text-slate-500">{lang === 'ar' ? 'إضافة أو استيراد حسابات الموظفين لمنحهم صلاحيات الوصول.' : 'Add or import employee accounts to grant access to the suite.'}</p>
            </div>
            <button
              onClick={() => setActiveTab('data_import')}
              className="px-3.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 flex items-center space-x-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'استيراد مستخدمين مجمع' : 'Bulk Import Users'}</span>
            </button>
          </div>
          <DataTable
            title={lang === 'ar' ? 'المستخدمين المصرح لهم بالدخول إلى المنظومة' : 'Authorized Enterprise System Users'}
            subtitle={lang === 'ar' ? 'دليل المستخدمين النشط وتعيينات الأدوار' : 'Active directory and role assignments'}
            data={users}
            columns={userColumns}
          />
        </div>
      )}

      {activeTab === 'roles' && (
        <RolesPermissionsMatrix />
      )}

      {activeTab === 'departments' && <OperationalStructureView />}

      {/* Dedicated Enterprise Data Import Hub */}
      {activeTab === 'data_import' && (
        <div className="space-y-6">
          {/* Header Overview Card */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 mb-1">
                  <Database className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'مركز دمج ونقل البيانات المؤسسية' : 'DATA INTEGRATION & MIGRATION HUB'}</span>
                </div>
                <h2 className="text-xl font-bold">{lang === 'ar' ? 'إدارة البيانات المؤسسية والاستيراد المجمع' : 'Enterprise Data Management & Bulk Ingestion'}</h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {lang === 'ar'
                    ? 'استيراد قوائم الموظفين، والهيكل الإداري، وحزم الإعدادات من ملفات CSV وجداول البيانات.'
                    : 'Import employee account rosters, departmental hierarchies, and master configuration packages from CSV and JSON spreadsheets.'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={exportAllDataAsJson}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تصدير بيانات المنظومة (JSON)' : 'Export System Data (JSON)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من استعادة بيانات النظام الافتراضية؟ سيتم مسح أي تعديلات سابقة.' : 'Reset all data to system defaults? Any customized entries will be restored to initial mock data.')) {
                      resetAllDataToDefaults();
                    }
                  }}
                  className="px-4 py-2.5 bg-rose-600/30 hover:bg-rose-600/50 border border-rose-400/40 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'استعادة الافتراضي' : 'Reset Defaults'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Import Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Bulk User Accounts Import */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Bulk User Accounts Roster</h3>
                    <p className="text-xs text-slate-500">Ingest corporate personnel and assign initial RBAC roles</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={downloadSampleUserCSV}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV Template</span>
                </button>
              </div>

              <div
                onClick={() => userFileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-slate-50/50 rounded-xl p-6 text-center cursor-pointer transition-all"
              >
                <input
                  ref={userFileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUserFileUpload(file);
                  }}
                />
                <Upload className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-xs text-slate-800">
                  {userFileName ? userFileName : 'Upload Users CSV Spreadsheet'}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Required: FullName, Email, JobTitle, Department, Role
                </p>
              </div>

              {userParseError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{userParseError}</span>
                </div>
              )}

              {parsedUsers.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 font-mono">Parsed {parsedUsers.length} Users</span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Ready to Add
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden max-h-36 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-mono text-[10px]">
                        <tr>
                          <th className="p-2">Name</th>
                          <th className="p-2">Email</th>
                          <th className="p-2">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {parsedUsers.map((u, i) => (
                          <tr key={i}>
                            <td className="p-2 font-sans font-medium text-slate-800">{u.name}</td>
                            <td className="p-2 text-slate-500">{u.email}</td>
                            <td className="p-2 font-bold text-blue-700">{u.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    type="button"
                    onClick={handleCommitUserImport}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Add {parsedUsers.length} Users</span>
                  </button>
                </div>
              )}
            </div>

            {/* Card 2: Department Hierarchy & Master Structure */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Organizational Department Hierarchy</h3>
                  <p className="text-xs text-slate-500">Corporate divisions, directorates, and executive leads</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="font-semibold text-slate-800">Current Active Organizational Units:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  {DEPARTMENTS.slice(0, 4).map((d) => (
                    <div key={d.id} className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span className="font-bold text-slate-800">{d.code}</span>
                      <span className="text-slate-500">{d.employeeCount} Cadres</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.info('Departmental structures are synchronized with active Enterprise Active Directory.')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
              >
                <span>Synchronize with Active Directory</span>
              </button>
            </div>
          </div>

          {/* Recent Ingestion History Log */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Recent Enterprise Import & Sync Audits</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800">Performance KPI Quarterly Measurements Ingestion</span>
                    <span className="text-slate-400 font-mono ml-2 text-[11px]">• Automated Batch</span>
                  </div>
                </div>
                <span className="font-mono text-slate-400 text-[11px]">Today at 18:45</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800">ISO 31000 Enterprise Risk Register Migration</span>
                    <span className="text-slate-400 font-mono ml-2 text-[11px]">• CSV Import</span>
                  </div>
                </div>
                <span className="font-mono text-slate-400 text-[11px]">Yesterday at 14:10</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800">Corporate Compliance Evidence Repository Sync</span>
                    <span className="text-slate-400 font-mono ml-2 text-[11px]">• Document Catalog</span>
                  </div>
                </div>
                <span className="font-mono text-slate-400 text-[11px]">Sep 27, 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
