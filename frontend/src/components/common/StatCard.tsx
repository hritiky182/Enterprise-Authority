import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  icon?: ReactNode;
  badgeText?: string;
  badgeColor?: 'emerald' | 'amber' | 'rose' | 'blue' | 'indigo';
  onClick?: () => void;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  trend,
  icon,
  badgeText,
  badgeColor = 'blue',
  onClick,
  accentColor,
}) => {
  const { t, lang } = useApp();
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-slate-300 relative overflow-hidden group ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {accentColor && (
        <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`} />
      )}
      <div className="flex items-start justify-between">
        <div>
          <span className="panel-label block mb-1">{t(title)}</span>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
            {value}
          </div>
        </div>
        {icon && (
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-slate-100/80 transition-colors">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        {trend ? (
          <div className="flex items-center text-xs space-x-1">
            {trend.direction === 'up' && (
              <span className="flex items-center font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                {trend.value}
              </span>
            )}
            {trend.direction === 'down' && (
              <span className="flex items-center font-medium text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                {trend.value}
              </span>
            )}
            {trend.direction === 'neutral' && (
              <span className="flex items-center font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                <Minus className="w-3.5 h-3.5 mr-0.5" />
                {trend.value}
              </span>
            )}
            {trend.label && <span className="text-slate-500">{t(trend.label)}</span>}
          </div>
        ) : (
          <span className="text-xs text-slate-500">{subtext ? t(subtext) : '\u00A0'}</span>
        )}

        {badgeText && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
              badgeColor === 'emerald'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : badgeColor === 'rose'
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : badgeColor === 'amber'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}
          >
            {t(badgeText)}
          </span>
        )}
      </div>
    </div>
  );
};
