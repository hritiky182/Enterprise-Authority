import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';

export interface StageNavInfo {
  stage: number;
  title: string;
  titleAr: string;
  path: string;
}

export interface RelatedLinkInfo {
  title: string;
  titleAr: string;
  path: string;
}

interface StrategicLifecycleProgressionProps {
  currentStage: number;
  stageTitle: string;
  stageTitleAr: string;
  prevStage?: StageNavInfo;
  nextStage?: StageNavInfo;
  relatedLinks?: RelatedLinkInfo[];
}

export const StrategicLifecycleProgression: React.FC<StrategicLifecycleProgressionProps> = ({
  currentStage,
  stageTitle,
  stageTitleAr,
  prevStage,
  nextStage,
  relatedLinks = [],
}) => {
  const navigate = useNavigate();
  const { lang, setDemoJourneyStep } = useApp();

  const handleNavigate = (stageInfo: StageNavInfo) => {
    setDemoJourneyStep(stageInfo.stage);
    navigate(stageInfo.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const percentProgress = Math.round((currentStage / 20) * 100);

  return (
    <div className="mt-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-5 text-white shadow-xl animate-in fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Stage Identity & Progress */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center font-mono font-bold text-blue-300 text-sm shrink-0">
            {currentStage}/20
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-full">
                {lang === 'ar'
                  ? `دورة إدارة الاستراتيجية والأداء • المرحلة ${currentStage}`
                  : `STRATEGIC LIFECYCLE MANAGEMENT • STAGE ${currentStage} OF 20`}
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-slate-300">
                {lang === 'ar' ? `اكتمال الدورة: ${percentProgress}%` : `Lifecycle Progress: ${percentProgress}%`}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1">
              {lang === 'ar' ? stageTitleAr : stageTitle}
            </h4>
          </div>
        </div>

        {/* Action Controls: Previous & Next Stage */}
        <div className="flex flex-wrap items-center gap-2.5 justify-start lg:justify-end">
          {prevStage && (
            <button
              type="button"
              onClick={() => handleNavigate(prevStage)}
              className="px-3.5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer shadow-xs group"
              title={lang === 'ar' ? prevStage.titleAr : prevStage.title}
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-0.5 transition-transform" />
              <div className="text-start">
                <span className="text-[10px] text-slate-400 block font-mono">
                  {lang === 'ar' ? `السابق: مرحلة ${prevStage.stage}` : `Prev: Stage ${prevStage.stage}`}
                </span>
                <span className="text-xs truncate max-w-[130px] sm:max-w-[160px] block font-medium">
                  {lang === 'ar' ? prevStage.titleAr : prevStage.title}
                </span>
              </div>
            </button>
          )}

          {nextStage && (
            <button
              type="button"
              onClick={() => handleNavigate(nextStage)}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer group"
              title={lang === 'ar' ? nextStage.titleAr : nextStage.title}
            >
              <div className="text-start">
                <span className="text-[10px] text-blue-200 block font-mono">
                  {lang === 'ar' ? `المتابعة: مرحلة ${nextStage.stage}` : `Proceed: Stage ${nextStage.stage}`}
                </span>
                <span className="text-xs truncate max-w-[140px] sm:max-w-[180px] block font-bold">
                  {lang === 'ar' ? nextStage.titleAr : nextStage.title}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Related Modules Quick Links */}
      {relatedLinks.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'ar' ? 'الوحدات المرتبطة:' : 'Related Modules:'}</span>
          </span>
          {relatedLinks.map((link, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                navigate(link.path);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{lang === 'ar' ? link.titleAr : link.title}</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
