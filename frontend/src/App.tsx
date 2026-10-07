import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DemoJourneyBar } from './components/layout/DemoJourneyBar';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { DetailDrawerModal } from './components/modals/DetailDrawerModal';
import { Toaster } from 'sonner';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EntitySetupPage } from './pages/EntitySetupPage';
import { StrategyPage } from './pages/StrategyPage';
import { CreateStrategyPage } from './pages/CreateStrategyPage';
import { HierarchyTreePage } from './pages/HierarchyTreePage';
import { ObjectivesPage } from './pages/ObjectivesPage';
import { KPIsPage } from './pages/KPIsPage';
import { InitiativesPage } from './pages/InitiativesPage';
import { OrgStructurePage } from './pages/OrgStructurePage';
import { UsersPage } from './pages/UsersPage';
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
import { PersonalWorkspacePage } from './pages/PersonalWorkspacePage';
import { PlanningCyclePage } from './pages/PlanningCyclePage';
import { StrategicDiagnosisPage } from './pages/StrategicDiagnosisPage';
import { StrategicPrioritizationPage } from './pages/StrategicPrioritizationPage';
import { StrategicIdentityPage } from './pages/StrategicIdentityPage';
import { BscConfigPage } from './pages/BscConfigPage';
import { StrategyMapPage } from './pages/StrategyMapPage';
import { DepartmentalCascadePage } from './pages/DepartmentalCascadePage';
import { StrategyApprovalPage } from './pages/StrategyApprovalPage';
import { PerformanceCollectionPage } from './pages/PerformanceCollectionPage';
import { ActualsEvidenceValidationPage } from './pages/ActualsEvidenceValidationPage';
import { StrategyReviewRevisionPage } from './pages/StrategyReviewRevisionPage';
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

const DEMO_JOURNEY_ROUTES = [
  '/workspace',
  '/planning-cycle',
  '/strategic-diagnosis',
  '/strategic-prioritization',
  '/strategy/identity',
  '/bsc-config',
  '/strategy-map',
  '/departmental-cascade',
  '/strategy/approval',
  '/performance/collection',
  '/performance/actuals',
  '/strategy/review',
];

const ProtectedRoute: React.FC<{ path: string; element: React.ReactNode }> = ({ path, element }) => {
  const { isAuthenticated, permissions } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAllowed = permissions.allowedRoutes.includes(path) || DEMO_JOURNEY_ROUTES.includes(path);
  if (!isAllowed) {
    return <AccessDeniedView path={path} />;
  }

  return <>{element}</>;
};

const AppLayout: React.FC = () => {
  const { sidebarCollapsed, isAuthenticated, lang } = useApp();
  const location = useLocation();

  if (!isAuthenticated || location.pathname === '/login') {
    return <LoginPage />;
  }

  const isRtl = lang === 'ar';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isRtl
            ? sidebarCollapsed ? 'mr-16 ml-0' : 'mr-64 ml-0'
            : sidebarCollapsed ? 'ml-16 mr-0' : 'ml-64 mr-0'
        }`}
      >
        <Header />
        <DemoJourneyBar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<ProtectedRoute path="/" element={<DashboardPage />} />} />
            <Route path="/workspace" element={<ProtectedRoute path="/workspace" element={<PersonalWorkspacePage />} />} />
            <Route path="/organization/setup" element={<ProtectedRoute path="/organization/setup" element={<EntitySetupPage />} />} />
            <Route path="/strategy" element={<ProtectedRoute path="/strategy" element={<StrategyPage />} />} />
            <Route path="/strategy/create" element={<ProtectedRoute path="/strategy/create" element={<CreateStrategyPage />} />} />
            <Route path="/strategy/identity" element={<ProtectedRoute path="/strategy/identity" element={<StrategicIdentityPage />} />} />
            <Route path="/planning-cycle" element={<ProtectedRoute path="/planning-cycle" element={<PlanningCyclePage />} />} />
            <Route path="/strategic-diagnosis" element={<ProtectedRoute path="/strategic-diagnosis" element={<StrategicDiagnosisPage />} />} />
            <Route path="/strategic-prioritization" element={<ProtectedRoute path="/strategic-prioritization" element={<StrategicPrioritizationPage />} />} />
            <Route path="/bsc-config" element={<ProtectedRoute path="/bsc-config" element={<BscConfigPage />} />} />
            <Route path="/strategy-map" element={<ProtectedRoute path="/strategy-map" element={<StrategyMapPage />} />} />
            <Route path="/hierarchy-tree" element={<ProtectedRoute path="/hierarchy-tree" element={<HierarchyTreePage />} />} />
            <Route path="/objectives" element={<ProtectedRoute path="/objectives" element={<ObjectivesPage />} />} />
            <Route path="/departmental-cascade" element={<ProtectedRoute path="/departmental-cascade" element={<DepartmentalCascadePage />} />} />
            <Route path="/kpis" element={<ProtectedRoute path="/kpis" element={<KPIsPage />} />} />
            <Route path="/initiatives" element={<ProtectedRoute path="/initiatives" element={<InitiativesPage />} />} />
            <Route path="/strategy/approval" element={<ProtectedRoute path="/strategy/approval" element={<StrategyApprovalPage />} />} />
            <Route path="/performance/collection" element={<ProtectedRoute path="/performance/collection" element={<PerformanceCollectionPage />} />} />
            <Route path="/performance/actuals" element={<ProtectedRoute path="/performance/actuals" element={<ActualsEvidenceValidationPage />} />} />
            <Route path="/performance" element={<ProtectedRoute path="/performance" element={<PerformancePage />} />} />
            <Route path="/strategy/review" element={<ProtectedRoute path="/strategy/review" element={<StrategyReviewRevisionPage />} />} />
            <Route path="/org-structure" element={<ProtectedRoute path="/org-structure" element={<OrgStructurePage />} />} />
            <Route path="/users" element={<ProtectedRoute path="/users" element={<UsersPage />} />} />
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
