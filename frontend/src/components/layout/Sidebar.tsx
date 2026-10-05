import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Target,
  BarChart3,
  ShieldAlert,
  Lock,
  Landmark,
  CheckCircle2,
  Activity,
  ListTodo,
  CheckSquare,
  FileText,
  FileSpreadsheet,
  Settings,
  Shield,
  Building2,
  UserCheck,
} from 'lucide-react';

interface NavGroup {
  title: string;
  items: {
    name: string;
    path: string;
    icon: React.ReactNode;
    badge?: string | undefined;
    badgeColor?: string | undefined;
  }[];
}

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, risks, actions, permissions, currentUser, lang, t } = useApp();

  const criticalRisksCount = risks.filter(
    (r) => r.inherentScore >= 16 || r.likelihood * r.impact >= 16
  ).length;

  const criticalActionsCount = actions.filter((a) => a.priority === 'Critical').length;

  const allNavGroups: NavGroup[] = [
    {
      title: 'CORE COMMAND',
      items: [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
        { name: 'Strategy', path: '/strategy', icon: <Target className="w-4 h-4" /> },
        { name: 'Performance', path: '/performance', icon: <BarChart3 className="w-4 h-4" /> },
      ],
    },
    {
      title: 'RISK & COMPLIANCE (GRC)',
      items: [
        {
          name: 'Enterprise Risk',
          path: '/enterprise-risk',
          icon: <ShieldAlert className="w-4 h-4" />,
          badge: criticalRisksCount > 0 ? `${criticalRisksCount}` : undefined,
          badgeColor: 'bg-rose-500 text-white',
        },
        { name: 'Cybersecurity & IT Risk', path: '/cyber-risk', icon: <Lock className="w-4 h-4" /> },
        { name: 'Governance', path: '/governance', icon: <Landmark className="w-4 h-4" /> },
        { name: 'Compliance', path: '/compliance', icon: <CheckCircle2 className="w-4 h-4" /> },
        { name: 'Business Continuity', path: '/bcm', icon: <Activity className="w-4 h-4" /> },
      ],
    },
    {
      title: 'EXECUTION & KNOWLEDGE',
      items: [
        {
          name: 'Action Plans',
          path: '/actions',
          icon: <ListTodo className="w-4 h-4" />,
          badge: criticalActionsCount > 0 ? `${criticalActionsCount}` : undefined,
          badgeColor: 'bg-amber-500 text-slate-900',
        },
        { name: 'Tasks', path: '/tasks', icon: <CheckSquare className="w-4 h-4" /> },
        { name: 'Documents', path: '/documents', icon: <FileText className="w-4 h-4" /> },
        { name: 'Reports', path: '/reports', icon: <FileSpreadsheet className="w-4 h-4" /> },
      ],
    },
    {
      title: 'SYSTEM',
      items: [{ name: 'Administration', path: '/admin', icon: <Settings className="w-4 h-4" /> }],
    },
  ];

  // RBAC Filtering: Filter items based on permissions.allowedRoutes
  const filteredNavGroups = allNavGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => permissions.allowedRoutes.includes(item.path)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={`fixed top-0 bottom-0 z-40 bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out flex flex-col shadow-xl ${
        lang === 'ar' ? 'right-0 border-l border-slate-800' : 'left-0 border-r border-slate-800'
      } ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/10 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          {!sidebarCollapsed && (
            <div className="truncate">
              <h1 className="text-xs font-bold text-white tracking-wide uppercase leading-tight font-sans">
                {t('enterprise_authority')}
              </h1>
              <span className="text-[10px] text-blue-400 font-mono tracking-wider block uppercase">
                {t('grc_strategy_suite')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Active Role Persona Indicator */}
      {!sidebarCollapsed && (
        <div className="mx-3 mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
          <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <div className="truncate">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              {t('active_role_persona')}
            </div>
            <div className="text-xs font-bold text-white truncate">{t(currentUser.role)}</div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
        {filteredNavGroups.map((group, idx) => (
          <div key={idx}>
            {!sidebarCollapsed && (
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 tracking-wider font-mono">
                {t(group.title)}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? lang === 'ar'
                          ? 'bg-blue-900/80 text-white border-r-2 border-blue-400 shadow-xs'
                          : 'bg-blue-900/80 text-white border-l-2 border-blue-400 shadow-xs'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`
                  }
                  title={sidebarCollapsed ? t(item.name) : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">{item.icon}</span>
                    {!sidebarCollapsed && <span className="truncate">{t(item.name)}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      {!sidebarCollapsed && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[10px] text-slate-400 font-mono flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('ENTERPRISE GRC v3.4')}</span>
          </div>
          <span className="text-blue-400 font-bold">{t('ENTERPRISE')}</span>
        </div>
      )}
    </aside>
  );
};
