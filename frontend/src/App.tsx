import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { DetailDrawerModal } from './components/modals/DetailDrawerModal';
import { Toaster } from 'sonner';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { StrategyPage } from './pages/StrategyPage';
import { CreateStrategyPage } from './pages/CreateStrategyPage';
import { PerformancePage } from './pages/PerformancePage';
import { EnterpriseRiskPage } from './pages/EnterpriseRiskPage';
import { CyberRiskPage } from './pages/CyberRiskPage';
import { GovernancePage } from './pages/GovernancePage';
import { CompliancePage } from './pages/CompliancePage';
import { BCMPage } from './pages/BCMPage';
import { ActionsPage } from './pages/ActionsPage';
import { TasksPage } from './pages/TasksPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AdminPage } from './pages/AdminPage';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

const AccessDeniedView: React.FC<{ path: string }> = ({ path }) => {
  const { currentUser, permissions } = useApp();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 max-w-md w-full text-center space-y-4 animate-in fade-in">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            RBAC RESTRICTION ENFORCED
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">Access Restricted</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            The active role persona <strong className="text-slate-900">{currentUser.role}</strong> does not have authorization to view module <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">{path}</code>.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs font-mono space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Role Scope Summary:</div>
          <div className="text-slate-700 font-semibold">{permissions.roleDescription}</div>
        </div>

        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Executive Dashboard</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ path: string; element: React.ReactNode }> = ({ path, element }) => {
  const { isAuthenticated, permissions } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAllowed = permissions.allowedRoutes.includes(path);
  if (!isAllowed) {
    return <AccessDeniedView path={path} />;
  }

  return <>{element}</>;
};

const AppLayout: React.FC = () => {
  const { sidebarCollapsed, isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated || location.pathname === '/login') {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<ProtectedRoute path="/" element={<DashboardPage />} />} />
            <Route path="/strategy" element={<ProtectedRoute path="/strategy" element={<StrategyPage />} />} />
            <Route path="/strategy/create" element={<ProtectedRoute path="/strategy" element={<CreateStrategyPage />} />} />
            <Route path="/performance" element={<ProtectedRoute path="/performance" element={<PerformancePage />} />} />
            <Route path="/enterprise-risk" element={<ProtectedRoute path="/enterprise-risk" element={<EnterpriseRiskPage />} />} />
            <Route path="/cyber-risk" element={<ProtectedRoute path="/cyber-risk" element={<CyberRiskPage />} />} />
            <Route path="/governance" element={<ProtectedRoute path="/governance" element={<GovernancePage />} />} />
            <Route path="/compliance" element={<ProtectedRoute path="/compliance" element={<CompliancePage />} />} />
            <Route path="/bcm" element={<ProtectedRoute path="/bcm" element={<BCMPage />} />} />
            <Route path="/actions" element={<ProtectedRoute path="/actions" element={<ActionsPage />} />} />
            <Route path="/tasks" element={<ProtectedRoute path="/tasks" element={<TasksPage />} />} />
            <Route path="/documents" element={<ProtectedRoute path="/documents" element={<DocumentsPage />} />} />
            <Route path="/reports" element={<ProtectedRoute path="/reports" element={<ReportsPage />} />} />
            <Route path="/admin" element={<ProtectedRoute path="/admin" element={<AdminPage />} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <DetailDrawerModal />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
