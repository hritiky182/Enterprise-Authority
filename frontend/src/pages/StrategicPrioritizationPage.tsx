import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sliders,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Layers,
  FileText,
  RotateCcw,
  BadgeCheck,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface StrategicOption {
  id: string;
  code: string;
  title: string;
  titleAr: string;
  category: string;
  scores: {
    fit: number; // 0-100
    economic: number; // 0-100
    heritage: number; // 0-100
    feasibility: number; // 0-100
  };
  status: 'Selected Priority' | 'Deferred to Phase 2' | 'Rejected / Incompatible';
  statusAr: 'أولوية معتمدة' | 'مؤجل للمرحلة الثانية' | 'مرفوض / غير ملائم';
  rationale: string;
  rationaleAr: string;
}

export const StrategicPrioritizationPage: React.FC = () => {
  const { lang, t } = useApp();
  const navigate = useNavigate();

  // Criteria Weights (Sum should ideally be 100%)
  const [weights, setWeights] = useState({
    fit: 35, // Vision 2030 Fit (35%)
    economic: 25, // Economic & Job Creation (25%)
    heritage: 25, // Heritage & UNESCO Oasis Protection (25%)
    feasibility: 15, // Delivery Feasibility & Speed (15%)
  });

  const [options, setOptions] = useState<StrategicOption[]>([
    {
      id: 'opt-1',
      code: 'OPT-A',
      title: 'Eco-Luxury Agritourism & Heritage Oasis Hospitality Clusters',
      titleAr: 'تطوير نزل الضيافة التراثية والسياحة الزراعية البيئية الفاخرة بالواحة',
      category: 'Hospitality & Culture',
      scores: {
        fit: 95,
        economic: 90,
        heritage: 92,
        feasibility: 85,
      },
      status: 'Selected Priority',
      statusAr: 'أولوية معتمدة',
      rationale: 'Maximal alignment with UNESCO living heritage guidelines while unlocking high-yield tourism spending.',
      rationaleAr: 'توافق كامل مع متطلبات الحفاظ على تراث اليونسكو مع تعظيم العوائد السياحية الاقتصادية ذات القيمة العالية.',
    },
    {
      id: 'opt-2',
      code: 'OPT-B',
      title: 'Heavy Logistics Dry Port & Industrial Freight Hub Near Oasis Rim',
      titleAr: 'إنشاء ميناء جاف ومجمع لوجستي ثقيل للشحن بالقرب من حافة الواحة',
      category: 'Industrial Logistics',
      scores: {
        fit: 45,
        economic: 80,
        heritage: 20,
        feasibility: 65,
      },
      status: 'Rejected / Incompatible',
      statusAr: 'مرفوض / غير ملائم',
      rationale: 'Rejected due to severe environmental threat to UNESCO oasis aquifers and heavy vehicle vibration near mudbrick structures.',
      rationaleAr: 'تم الرفض لتعارضه الجذري مع حماية المياه الجوفية والأثر السلبي لحركة الشاحنات الثقيلة على المباني الطينية التاريخية.',
    },
    {
      id: 'opt-3',
      code: 'OPT-C',
      title: 'Date Palm Value-Add Agritech & UNESCO Culinary Creative City',
      titleAr: 'صناعات التمور التحويلية المتقدمة وتفعيل مدينة الإبداع في فنون الطهي لليونسكو',
      category: 'Agri-Business & Gastronomy',
      scores: {
        fit: 90,
        economic: 85,
        heritage: 95,
        feasibility: 80,
      },
      status: 'Selected Priority',
      statusAr: 'أولوية معتمدة',
      rationale: 'Directly supports local farm economies, leverages UNESCO Creative Cities designation, and creates sustainable SME jobs.',
      rationaleAr: 'يدعم بشكل مباشر اقتصاد المزارعين المحليين ويعزز مكانة الأحساء في شبكة المدن المبدعة لليونسكو.',
    },
    {
      id: 'opt-4',
      code: 'OPT-D',
      title: 'High-Density Commercial Skyscraper Corridor on Regional Highway',
      titleAr: 'تطوير محور تجاري عالي الكثافة (أبراج متعددة الاستخدامات) على الشريان الإقليمي',
      category: 'Urban Real Estate',
      scores: {
        fit: 60,
        economic: 75,
        heritage: 50,
        feasibility: 50,
      },
      status: 'Deferred to Phase 2',
      statusAr: 'مؤجل للمرحلة الثانية',
      rationale: 'Deferred pending completion of the Al-Ahsa Comprehensive Spatial Masterplan and utility capacity upgrades in 2028.',
      rationaleAr: 'تم التأجيل إلى المرحلة الثانية لحين استكمال المخطط الهيكلي الإقليمي وتحديث شبكات البنية التحتية عام 2028.',
    },
  ]);

  // Calculate live weighted score
  const calculateScore = (opt: StrategicOption) => {
    const totalWeight = weights.fit + weights.economic + weights.heritage + weights.feasibility;
    if (totalWeight === 0) return 0;
    const raw =
      (opt.scores.fit * weights.fit +
        opt.scores.economic * weights.economic +
        opt.scores.heritage * weights.heritage +
        opt.scores.feasibility * weights.feasibility) /
      totalWeight;
    return Math.round(raw * 10) / 10;
  };

  // Sort live by score descending
  const sortedOptions = [...options].sort((a, b) => calculateScore(b) - calculateScore(a));

  const totalWeights = weights.fit + weights.economic + weights.heritage + weights.feasibility;

  const handleStatusChange = (
    id: string,
    newStatus: StrategicOption['status']
  ) => {
    setOptions((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: newStatus,
              statusAr:
                newStatus === 'Selected Priority'
                  ? 'أولوية معتمدة'
                  : newStatus === 'Deferred to Phase 2'
                  ? 'مؤجل للمرحلة الثانية'
                  : 'مرفوض / غير ملائم',
            }
          : o
      )
    );
    toast.success(lang === 'ar' ? 'تم تحديث قرار الأولوية' : 'Prioritization status updated');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 7 من 20 • مسار العرض' : 'STEP 7 OF 20 • DEMO JOURNEY'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'المفاضلة وتحديد الأولويات' : 'Strategic Choices & Prioritization'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'مصفوفة المفاضلة متعددة المعايير (MCDA) وإعادة الترتيب التفاعلي'
                : 'Multi-Criteria Decision Analysis (MCDA) & Live Ranking Engine'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'قارن بين البدائل الاستراتيجية باستخدام أوزان المعايير المعتمدة، وأعد حساب الترتيب مباشرة مع توثيق أسباب قبول الأولويات أو تأجيلها أو رفضها.'
                : 'Compare strategic response options using agreed criteria weights, recalculate rankings live, select approved priorities, and document why options were deferred or rejected.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/strategy/identity')}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>{lang === 'ar' ? 'الانتقال إلى الهوية والركائز (Step 8) ➔' : 'Next: Identity & Themes (Step 8) ➔'}</span>
            </button>
          </div>
        </div>

        {/* Weights & Formula Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>
              {lang === 'ar'
                ? 'محرك التقييم الموزون النشط: يتغير الترتيب تلقائياً فور تعديل أي مؤشر وزن أدناه'
                : 'Live Weighted Scoring Active: Rankings recalculate in real-time as sliders adjust'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">{lang === 'ar' ? 'إجمالي الأوزان:' : 'Total Weight:'}</span>
            <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
              totalWeights === 100 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
            }`}>
              {totalWeights}% {totalWeights === 100 ? '✅ (Balanced)' : '⚠️ (Adjust to 100%)'}
            </span>
          </div>
        </div>
      </div>

      {/* Sliders Control Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'تعديل أوزان معايير المفاضلة (Agreed Weight Criteria)' : 'Agreed Strategic Decision Criteria & Weights'}
            </h2>
          </div>
          <button
            onClick={() => setWeights({ fit: 35, economic: 25, heritage: 25, feasibility: 15 })}
            className="text-[11px] font-mono text-slate-500 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'ar' ? 'إعادة ضبط الأوزان' : 'Reset Defaults'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Fit */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-800">{lang === 'ar' ? 'المواءمة مع رؤية 2030' : 'Vision 2030 Fit'}</span>
              <span className="font-mono text-teal-700 font-bold">{weights.fit}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={weights.fit}
              onChange={(e) => setWeights({ ...weights, fit: Number(e.target.value) })}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Weight: {weights.fit}%</span>
          </div>

          {/* Economic */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-800">{lang === 'ar' ? 'الأثر الاقتصادي والوظائف' : 'Economic & Job Impact'}</span>
              <span className="font-mono text-teal-700 font-bold">{weights.economic}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={weights.economic}
              onChange={(e) => setWeights({ ...weights, economic: Number(e.target.value) })}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Weight: {weights.economic}%</span>
          </div>

          {/* Heritage */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-800">{lang === 'ar' ? 'حماية تراث واحة اليونسكو' : 'UNESCO Oasis Protection'}</span>
              <span className="font-mono text-teal-700 font-bold">{weights.heritage}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={weights.heritage}
              onChange={(e) => setWeights({ ...weights, heritage: Number(e.target.value) })}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Weight: {weights.heritage}%</span>
          </div>

          {/* Feasibility */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-800">{lang === 'ar' ? 'الجدوى وسرعة التنفيذ' : 'Feasibility & Delivery Speed'}</span>
              <span className="font-mono text-teal-700 font-bold">{weights.feasibility}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              value={weights.feasibility}
              onChange={(e) => setWeights({ ...weights, feasibility: Number(e.target.value) })}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Weight: {weights.feasibility}%</span>
          </div>
        </div>
      </div>

      {/* Live Ranked Options List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'جدول المفاضلة وترتيب الخيارات المباشر' : 'Live Re-Calculated Strategic Options Ranking'}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'مرتب تلقائياً بناءً على الدرجة الموزونة الإجمالية مع توثيق مسوغات القبول أو الرفض أو التأجيل'
                : 'Ranked live by weighted composite score with documented justification for deferral/rejection'}
            </p>
          </div>
          <span className="text-[11px] font-mono bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200 font-semibold">
            {options.length} EVALUATED OPTIONS
          </span>
        </div>

        <div className="space-y-3">
          {sortedOptions.map((opt, rankIdx) => {
            const finalScore = calculateScore(opt);
            const isApproved = opt.status === 'Selected Priority';
            const isRejected = opt.status === 'Rejected / Incompatible';
            const isDeferred = opt.status === 'Deferred to Phase 2';

            return (
              <div
                key={opt.id}
                className={`p-4 rounded-xl border transition-all ${
                  isApproved
                    ? 'bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-200'
                    : isRejected
                    ? 'bg-rose-50/30 border-rose-200 opacity-80'
                    : 'bg-amber-50/30 border-amber-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      #{rankIdx + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                          {opt.code}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                          {opt.category}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-800'
                            : isRejected
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {lang === 'ar' ? opt.statusAr : opt.status}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-slate-900">
                        {lang === 'ar' ? opt.titleAr : opt.title}
                      </div>

                      <div className="text-[11px] text-slate-600 leading-relaxed pt-1">
                        <strong>{lang === 'ar' ? 'المسوغ والتوثيق المؤسسي:' : 'Documented Rationale:'}</strong>{' '}
                        {lang === 'ar' ? opt.rationaleAr : opt.rationale}
                      </div>
                    </div>
                  </div>

                  {/* Score & Decision Actions */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Weighted Score</span>
                      <span className={`text-lg font-mono font-bold ${
                        finalScore >= 80 ? 'text-emerald-600' : finalScore >= 60 ? 'text-blue-600' : 'text-slate-600'
                      }`}>
                        {finalScore} / 100
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStatusChange(opt.id, 'Selected Priority')}
                        title="Select as Priority"
                        className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                          isApproved ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
                        }`}
                      >
                        {lang === 'ar' ? 'اعتماد' : 'Prioritize'}
                      </button>
                      <button
                        onClick={() => handleStatusChange(opt.id, 'Deferred to Phase 2')}
                        title="Defer to Phase 2"
                        className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                          isDeferred ? 'bg-amber-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                        }`}
                      >
                        {lang === 'ar' ? 'تأجيل' : 'Defer'}
                      </button>
                      <button
                        onClick={() => handleStatusChange(opt.id, 'Rejected / Incompatible')}
                        title="Reject Option"
                        className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                          isRejected ? 'bg-rose-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                        }`}
                      >
                        {lang === 'ar' ? 'رفض' : 'Reject'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
