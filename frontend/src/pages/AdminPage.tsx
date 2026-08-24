import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_USERS, DEPARTMENTS } from '../data/mockData';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { User, Role } from '../types';
import { Settings, Users, Shield, Building, Key, CheckCircle, Lock } from 'lucide-react';
import { toast } from 'sonner';

export const AdminPage: React.FC = () => {
  const { currentUser, switchUserRole } = useApp();
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'departments' | 'settings'>('users');

  const rolesList: Role[] = [
    'Administrator',
    'Strategy Manager',
    'Risk Manager',
    'Compliance Manager',
    'BCM Manager',
    'Executive',
    'Auditor',
    'Viewer',
  ];

  const userColumns: Column<User>[] = [
    {
      header: 'User Profile',
      accessorKey: 'name',
      sortable: true,
      cell: (u) => (
        <div className="flex items-center space-x-3">
          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
          <div>
            <div className="font-semibold text-slate-900">{u.name}</div>
            <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
          </div>
        </div>
      ),
    },
    { header: 'Job Title', accessorKey: 'title', sortable: true, cell: (u) => <span className="font-medium text-slate-800">{u.title}</span> },
    { header: 'Department', accessorKey: 'department', sortable: true, cell: (u) => <span className="text-slate-600">{u.department}</span> },
    {
      header: 'Active Role',
      accessorKey: 'role',
      sortable: true,
      cell: (u) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {u.role}
        </span>
      ),
    },
    {
      header: 'Switch Simulation',
      cell: (u) => (
        <button
          onClick={() => switchUserRole(u.role)}
          className="px-2.5 py-1 rounded bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800"
        >
          Simulate User
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <Settings className="w-4 h-4" />
            <span>SYSTEM ADMINISTRATION & GOVERNANCE CONFIGURATION</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            User Accounts, RBAC Roles & System Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Role-based access control (RBAC), department structures, and security settings.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'users' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            Users ({MOCK_USERS.length})
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'roles' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            RBAC Roles ({rolesList.length})
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'departments' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            Departments ({DEPARTMENTS.length})
          </button>
        </div>
      </div>

      {activeTab === 'users' && <DataTable title="Authorized Enterprise System Users" subtitle="Active directory and role assignments" data={MOCK_USERS} columns={userColumns} />}

      {activeTab === 'roles' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="panel-title text-slate-900">Role Permissions Matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rolesList.map((r) => (
              <div key={r} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{r}</span>
                  {currentUser.role === r && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">Current</span>}
                </div>
                <div className="text-[11px] text-slate-500">
                  Full permissions configured for {r.toLowerCase()} access control.
                </div>
                <button
                  onClick={() => switchUserRole(r)}
                  className="w-full mt-2 py-1.5 rounded bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                >
                  Switch Role Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {dept.code}
                </span>
                <span className="font-mono text-xs text-slate-500">{dept.employeeCount} Cadres</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{dept.name}</h3>
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
                Director: <span className="font-semibold text-slate-800">{dept.head}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
