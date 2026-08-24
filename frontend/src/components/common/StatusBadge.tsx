import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'status' | 'risk' | 'priority' | 'criticality';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'status' }) => {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (variant === 'risk' || normalized.includes('critical') || normalized.includes('high') || normalized.includes('behind')) {
    if (normalized === 'critical' || normalized.includes('critical') || normalized === 'high') {
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
    } else if (normalized === 'moderate' || normalized === 'medium' || normalized.includes('warning') || normalized === 'at-risk' || normalized === 'at risk') {
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-200 font-medium';
    } else if (normalized === 'low' || normalized === 'on-track' || normalized === 'compliant' || normalized === 'achieved') {
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200 font-medium';
    }
  } else {
    // Default status handling
    switch (normalized) {
      case 'on-track':
      case 'achieved':
      case 'compliant':
      case 'completed':
      case 'ready':
      case 'passed':
      case 'approved':
      case 'active':
        colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'at-risk':
      case 'warning':
      case 'partially compliant':
      case 'in progress':
      case 'under review':
      case 'mitigating':
      case 'needs review':
      case 'partial pass':
      case 'remediating':
        colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
        break;
      case 'behind':
      case 'critical':
      case 'non-compliant':
      case 'critical gap':
      case 'unpatched':
      case 'failed':
      case 'blocked':
      case 'open':
        colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
        break;
      case 'accepted':
      case 'draft':
      case 'planning':
      case 'to do':
      case 'not started':
        colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
        break;
      default:
        colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${colorClasses} font-mono tracking-tight capitalize whitespace-nowrap shadow-2xs`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75" />
      {status}
    </span>
  );
};
