import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  '': 'Executive Command Center',
  strategy: 'Strategic Management & Initiatives',
  create: 'Create New Strategy',
  performance: 'Institutional & Dept Performance',
  'enterprise-risk': 'Enterprise Risk Management (ERM)',
  'cyber-risk': 'Cybersecurity & IT Governance',
  governance: 'Corporate Governance & Policies',
  compliance: 'Regulatory & Framework Compliance',
  bcm: 'Business Continuity & Disaster Resilience',
  actions: 'Central Action Plans',
  tasks: 'Operational Task Board',
  documents: 'Document & Evidence Repository',
  reports: 'Executive Reporting & Analytics',
  admin: 'System Administration & Security',
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center text-xs text-slate-500 font-medium">
      <Link
        to="/"
        className="flex items-center hover:text-emerald-700 transition-colors text-slate-600"
      >
        <Home className="w-3.5 h-3.5 mr-1 text-slate-400" />
        <span className="hidden sm:inline">Enterprise Platform</span>
      </Link>

      {pathnames.length === 0 ? (
        <>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Executive Dashboard</span>
        </>
      ) : (
        pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = routeLabels[name] || name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <React.Fragment key={name}>
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400" />
              {isLast ? (
                <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
                  {label}
                </span>
              ) : (
                <Link to={routeTo} className="hover:text-emerald-700 transition-colors">
                  {label}
                </Link>
              )}
            </React.Fragment>
          );
        })
      )}
    </nav>
  );
};
