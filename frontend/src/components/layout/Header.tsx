import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumbs } from './Breadcrumbs';
import {
  Search,
  Bell,
  Globe,
  ChevronDown,
  Menu,
  CheckCircle2,
  Shield,
  LogOut,
  UserCheck,
} from 'lucide-react';
import { Role } from '../../types';
import { ROLE_PERMISSIONS_MAP } from '../../utils/permissions';

export const Header: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    permissions,
    logout,
    lang,
    toggleLanguage,
    sidebarCollapsed,
    setSidebarCollapsed,
    setIsSearchOpen,
    notifications,
    markNotificationRead,
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 shadow-2xs">
      {/* Left section: Collapse Toggle + Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>

        <Breadcrumbs />
      </div>

      {/* Right section: Search + Notifications + Lang + User Role */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Active Role Indicator Badge */}
        <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium font-mono">
          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>{currentUser.role}</span>
          {permissions.isReadOnly && <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">READ ONLY</span>}
        </div>

        {/* Global Search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all shadow-2xs cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline font-medium">Search enterprise...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400 shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Language selector */}
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          title="Switch Language"
        >
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-mono">{lang === 'en' ? 'EN | AR' : 'AR | EN'}</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider">
                    Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <span className="bg-rose-50 text-rose-700 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    notifications.forEach((n) => markNotificationRead(n.id));
                  }}
                  className="text-[11px] text-blue-600 hover:underline font-medium cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-3 rounded-lg border text-xs transition-colors cursor-pointer ${
                      n.read
                        ? 'bg-slate-50/50 border-slate-100 text-slate-600'
                        : 'bg-blue-50/40 border-blue-100 text-slate-900 font-medium'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-semibold text-slate-900">{n.title}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-1">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center space-x-2 pl-2 pr-1.5 py-1 rounded-lg border border-slate-200/80 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-blue-500/50"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-900 leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-blue-700 font-medium leading-tight">
                {currentUser.role}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-2.5 border-b border-slate-100 mb-2 bg-slate-50/70 rounded-lg">
                <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                <div className="mt-1.5 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono font-medium border border-blue-200/60">
                    <Shield className="w-3 h-3 mr-1" />
                    {currentUser.department}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono font-semibold">
                    {permissions.allowedRoutes.length} Modules
                  </span>
                </div>
              </div>

              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                Simulate Active Role (RBAC Gating)
              </div>
              <div className="space-y-1 max-h-56 overflow-y-auto">
                {rolesList.map((r) => {
                  const rolePerm = ROLE_PERMISSIONS_MAP[r];
                  const isActive = currentUser.role === r;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        switchUserRole(r);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white font-medium'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{r}</div>
                        <div className={`text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-400'} font-mono`}>
                          {rolePerm?.allowedRoutes.length} Allowed Modules {rolePerm?.isReadOnly ? '(Read Only)' : ''}
                        </div>
                      </div>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Sign Out Action */}
              <div className="pt-2 mt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setShowRoleDropdown(false);
                    logout();
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out to Login Screen</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
