import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { User, Role } from '../types';
import {
  Users,
  UserPlus,
  Shield,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  UserCheck,
  Building,
  Mail,
  Briefcase,
  X,
  Plus,
  Download,
  Upload,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';

export const ALL_ROLES: Role[] = [
  'Strategy Specialist',
  'Strategy Manager',
  'Authority Board & CEO',
  'Sector Director General',
  'Department Manager',
  'Administrator',
  'GRC & Enterprise Risk',
  'Cybersecurity Officer',
  'Internal Audit',
  'Risk Manager',
  'Compliance Manager',
  'BCM Manager',
  'Executive',
  'Auditor',
  'Viewer',
];

export const UsersPage: React.FC = () => {
  const {
    users,
    addUser,
    updateUser,
    updateUserRole,
    deleteUser,
    switchUserRole,
    currentUser,
    departments,
    lang,
    t,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserNameAr, setNewUserNameAr] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserTitle, setNewUserTitle] = useState('');
  const [newUserTitleAr, setNewUserTitleAr] = useState('');
  const [newUserDepartment, setNewUserDepartment] = useState(departments[0]?.name || 'Strategy Development');
  const [newUserRole, setNewUserRole] = useState<Role>('Strategy Specialist');

  // Edit User Form State
  const [editName, setEditName] = useState('');
  const [editNameAr, setEditNameAr] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editTitleAr, setEditTitleAr] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editRole, setEditRole] = useState<Role>('Strategy Specialist');

  const openEditModal = (u: User) => {
    setEditingUser(u);
    setEditName(u.name);
    setEditNameAr(u.nameAr || '');
    setEditEmail(u.email);
    setEditTitle(u.title);
    setEditTitleAr(u.titleAr || '');
    setEditDepartment(u.department);
    setEditRole(u.role);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال الاسم والبريد الإلكتروني' : 'Name and Email are required');
      return;
    }

    addUser({
      name: newUserName.trim(),
      nameAr: newUserNameAr.trim() || undefined,
      email: newUserEmail.trim(),
      title: newUserTitle.trim() || 'Officer',
      titleAr: newUserTitleAr.trim() || undefined,
      department: newUserDepartment,
      role: newUserRole,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
    });

    setIsAddModalOpen(false);
    setNewUserName('');
    setNewUserNameAr('');
    setNewUserEmail('');
    setNewUserTitle('');
    setNewUserTitleAr('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    updateUser(editingUser.id, {
      name: editName.trim(),
      nameAr: editNameAr.trim() || undefined,
      email: editEmail.trim(),
      title: editTitle.trim(),
      titleAr: editTitleAr.trim() || undefined,
      department: editDepartment,
      role: editRole,
    });

    // If current session user is being edited, update role in active session too
    if (currentUser.id === editingUser.id || currentUser.email === editingUser.email) {
      updateUserRole(editingUser.id, editRole);
      switchUserRole(editRole);
    }

    setEditingUser(null);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        u.name.toLowerCase().includes(term) ||
        (u.nameAr && u.nameAr.includes(term)) ||
        u.email.toLowerCase().includes(term) ||
        u.title.toLowerCase().includes(term) ||
        (u.titleAr && u.titleAr.includes(term)) ||
        u.department.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term);

      const matchesRole = selectedRoleFilter === 'all' || u.role === selectedRoleFilter;
      const matchesDept = selectedDeptFilter === 'all' || u.department === selectedDeptFilter;

      return matchesSearch && matchesRole && matchesDept;
    });
  }, [users, searchTerm, selectedRoleFilter, selectedDeptFilter]);

  const uniqueDepartments = useMemo(() => {
    const set = new Set(users.map((u) => u.department));
    return Array.from(set).filter(Boolean);
  }, [users]);

  const getRoleBadgeStyle = (role: Role) => {
    switch (role) {
      case 'Strategy Specialist':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Strategy Manager':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Authority Board & CEO':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Sector Director General':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Department Manager':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Administrator':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'GRC & Enterprise Risk':
      case 'Risk Manager':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cybersecurity Officer':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Internal Audit':
      case 'Auditor':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const handleExportUsers = () => {
    const headers = ['Name', 'NameAr', 'Email', 'JobTitle', 'Department', 'Role'];
    const rows = users.map((u) => [
      `"${u.name}"`,
      `"${u.nameAr || ''}"`,
      `"${u.email}"`,
      `"${u.title}"`,
      `"${u.department}"`,
      `"${u.role}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `authority_users_directory_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(lang === 'ar' ? 'تم تصدير دليل المستخدمين' : 'Users Directory Exported');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-600 mb-1">
            <Users className="w-4 h-4" />
            <span className="font-bold uppercase">
              {lang === 'ar' ? 'دليل الكوادر وإدارة الأدوار' : 'PERSONNEL & ROLES DIRECTORY'}
            </span>
            <span className="text-slate-300">/</span>
            <span>{lang === 'ar' ? 'المستخدمون والصلاحيات' : 'Users & Permissions'}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'المستخدمون والأدوار المؤسسية' : 'Users & Organizational Roles'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'ar'
              ? 'إدارة حسابات الكوادر وتعيين وتعديل الأدوار والصلاحيات المؤسسية عبر المنظومة.'
              : 'Manage authority personnel, view assigned roles, and modify role permissions across the suite.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportUsers}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'ar' ? 'تصدير الدليل' : 'Export CSV'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{lang === 'ar' ? 'إضافة مستخدم وتعيين دور' : 'Add User & Assign Role'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
            {lang === 'ar' ? 'إجمالي الكوادر' : 'Total Personnel'}
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{users.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'كوادر مسجلة بالنظام' : 'Active user accounts'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-purple-600 uppercase font-semibold">
            {lang === 'ar' ? 'الأدوار النشطة' : 'Distinct Roles'}
          </div>
          <div className="text-2xl font-bold font-mono text-purple-700 mt-1">
            {new Set(users.map((u) => u.role)).size}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'من أصل 15 دوراً مؤسسياً' : 'Out of 15 available roles'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-blue-600 uppercase font-semibold">
            {lang === 'ar' ? 'فريق الاستراتيجية' : 'Strategy Team'}
          </div>
          <div className="text-2xl font-bold font-mono text-blue-700 mt-1">
            {users.filter((u) => u.role.includes('Strategy')).length}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'أخصائيو ومدراء الاستراتيجية' : 'Specialists & Managers'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-emerald-600 uppercase font-semibold">
            {lang === 'ar' ? 'الإدارات والقطاعات' : 'Departments'}
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
            {uniqueDepartments.length}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'إدارات وقطاعات مغطاة' : 'Covered organizational units'}
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search
            className={`w-4 h-4 absolute ${lang === 'ar' ? 'right-3' : 'left-3'
              } top-1/2 -translate-y-1/2 text-slate-400`}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'البحث بالاسم، البريد الإلكتروني، المسمى الوظيفي، الإدارة أو الدور...'
                : 'Search by name, email, job title, department, or role...'
            }
            className={`w-full ${lang === 'ar' ? 'pr-9 pl-4' : 'pl-9 pr-4'
              } py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600`}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
            >
              <option value="all">{lang === 'ar' ? 'جميع الأدوار' : 'All Roles'}</option>
              {ALL_ROLES.map((r) => (
                <option key={r} value={r}>
                  {t(r)}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
          >
            <option value="all">{lang === 'ar' ? 'جميع الإدارات' : 'All Departments'}</option>
            {uniqueDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {t(dept)}
              </option>
            ))}
          </select>

          {(searchTerm || selectedRoleFilter !== 'all' || selectedDeptFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRoleFilter('all');
                setSelectedDeptFilter('all');
              }}
              className="px-2.5 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-medium transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'إعادة ضبط' : 'Reset'}
            </button>
          )}
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                <th className={`py-3.5 ${lang === 'ar' ? 'text-right pr-5 pl-3' : 'text-left pl-5 pr-3'}`}>
                  {lang === 'ar' ? 'المستخدم' : 'User'}
                </th>
                <th className={`py-3.5 px-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {lang === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                </th>
                <th className={`py-3.5 px-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {lang === 'ar' ? 'الإدارة / القطاع' : 'Department'}
                </th>
                <th className={`py-3.5 px-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {lang === 'ar' ? 'الدور المسند (قابل للتعديل)' : 'Assigned Role (Editable)'}
                </th>
                <th className={`py-3.5 ${lang === 'ar' ? 'text-left pl-5 pr-3' : 'text-right pr-5 pl-3'}`}>
                  {lang === 'ar' ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-medium">
                      {lang === 'ar' ? 'لا يوجد مستخدمون مطابقون لمعايير البحث' : 'No users match your criteria'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isCurrentPersona = currentUser.role === u.role;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/60 transition-colors group">
                      {/* User Info */}
                      <td className={`py-3.5 ${lang === 'ar' ? 'pr-5 pl-3' : 'pl-5 pr-3'}`}>
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                            onError={(e) => {
                              // fallback avatar if broken url
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80';
                            }}
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{lang === 'ar' ? u.nameAr || u.name : u.name}</span>
                              {isCurrentPersona && (
                                <span className="text-[9px] font-mono font-bold bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded border border-purple-200">
                                  {lang === 'ar' ? 'أنت الآن' : 'ACTIVE'}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="truncate">{u.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Job Title */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{lang === 'ar' ? u.titleAr || u.title : u.title}</span>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{t(u.department)}</span>
                        </div>
                      </td>

                      {/* Role with Editable Inline Dropdown */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={u.role}
                            onChange={(e) => {
                              const newRole = e.target.value as Role;
                              updateUserRole(u.id, newRole);
                              if (currentUser.id === u.id || currentUser.email === u.email) {
                                switchUserRole(newRole);
                              }
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600 ${getRoleBadgeStyle(
                              u.role
                            )}`}
                            title={lang === 'ar' ? 'انقر لتغيير الدور مباشرة' : 'Click to quickly change role'}
                          >
                            {ALL_ROLES.map((r) => (
                              <option key={r} value={r} className="bg-white text-slate-900 font-sans">
                                {t(r)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className={`py-3.5 ${lang === 'ar' ? 'pl-5 pr-3' : 'pr-5 pl-3'}`}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(u)}
                            className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                            title={lang === 'ar' ? 'تعديل البيانات والدور' : 'Edit User & Role'}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              switchUserRole(u.role);
                              toast.success(
                                lang === 'ar'
                                  ? `تم التبديل لتجربة دور: ${t(u.role)}`
                                  : `Switched active persona to: ${u.role}`
                              );
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-mono font-semibold transition-colors cursor-pointer"
                            title={lang === 'ar' ? 'محاكاة هذا الدور' : 'Simulate this role persona'}
                          >
                            {lang === 'ar' ? 'محاكاة الدور' : 'Simulate'}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (
                                window.confirm(
                                  lang === 'ar'
                                    ? `هل أنت متأكد من حذف ${u.nameAr || u.name}؟`
                                    : `Are you sure you want to remove ${u.name}?`
                                )
                              ) {
                                deleteUser(u.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title={lang === 'ar' ? 'حذف المستخدم' : 'Delete user'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Add New User & Assign Role */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'إضافة مستخدم جديد وتعيين الدور' : 'Add User & Assign Role'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'أدخل بيانات المستخدم وحدد الدور والصلاحيات المناسبة'
                      : 'Provide user profile details and select their organizational role'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الاسم بالإنجليزية *' : 'Full Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. Eng. Khalid Al-Otaibi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الاسم بالعربية' : 'Full Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={newUserNameAr}
                    onChange={(e) => setNewUserNameAr(e.target.value)}
                    placeholder="مثال: م. خالد العتيبي"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900 font-sans"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'البريد الإلكتروني المؤسسي *' : 'Official Email *'}
                </label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="khalid.otaibi@ahda.gov.sa"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المسمى الوظيفي (EN)' : 'Job Title (EN)'}
                  </label>
                  <input
                    type="text"
                    value={newUserTitle}
                    onChange={(e) => setNewUserTitle(e.target.value)}
                    placeholder="e.g. Senior Strategy Specialist"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المسمى الوظيفي (AR)' : 'Job Title (AR)'}
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={newUserTitleAr}
                    onChange={(e) => setNewUserTitleAr(e.target.value)}
                    placeholder="مثال: أخصائي استراتيجية أول"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الإدارة التابعة' : 'Department'}
                  </label>
                  <select
                    value={newUserDepartment}
                    onChange={(e) => setNewUserDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900 cursor-pointer"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                    <option value="Executive Management">Executive Management</option>
                    <option value="Strategy Development">Strategy Development</option>
                    <option value="Governance, Risk & Compliance">Governance, Risk & Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-purple-700 mb-1">
                    {lang === 'ar' ? 'الدور المسند (الصلاحيات) *' : 'Assigned Role *'}
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as Role)}
                    className="w-full px-3 py-2 bg-purple-50/70 border border-purple-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 text-purple-950 font-bold cursor-pointer"
                  >
                    {ALL_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {t(r)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ وإضافة المستخدم' : 'Save & Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit User & Change Role */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'ar' ? 'تعديل بيانات المستخدم والدور' : 'Edit User & Role Assignment'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? `تعديل الصلاحيات والدور لـ: ${editingUser.name}`
                      : `Update profile, department, and assigned organizational role for ${editingUser.name}`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الاسم بالإنجليزية *' : 'Full Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الاسم بالعربية' : 'Full Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editNameAr}
                    onChange={(e) => setEditNameAr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-sans"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Official Email'}
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المسمى الوظيفي (EN)' : 'Job Title (EN)'}
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المسمى الوظيفي (AR)' : 'Job Title (AR)'}
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editTitleAr}
                    onChange={(e) => setEditTitleAr(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الإدارة التابعة' : 'Department'}
                  </label>
                  <input
                    type="text"
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-blue-700 mb-1">
                    {lang === 'ar' ? 'الدور المسند (الصلاحيات) *' : 'Assigned Role *'}
                  </label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as Role)}
                    className="w-full px-3 py-2 bg-blue-50/80 border border-blue-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-blue-950 font-bold cursor-pointer"
                  >
                    {ALL_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {t(r)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
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
