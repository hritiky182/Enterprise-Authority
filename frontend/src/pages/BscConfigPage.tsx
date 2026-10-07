import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Users,
  Settings,
  Shield,
  RotateCcw,
  Sparkles,
  Award,
  Link2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface BscPerspective {
  id: string;
  order: number;
  name: string;
  nameAr: string;
  weight: number;
  owner: string;
  color: string;
  objectivesCount: number;
  objectives: { code: string; title: string; titleAr: string; themeCode: string }[];
}

export const BscConfigPage: React.FC = () => {
  const { lang, t, objectives } = useApp();
  const navigate = useNavigate();

  const [perspectives, setPerspectives] = useState<BscPerspective[]>([
    {
      id: 'bsc-financial',
      order: 1,
      name: 'Financial & Economic Impact',
      nameAr: 'المحور المالي والأثر الاقتصادي',
      weight: 25,
      owner: 'VP Finance & Investments',
      color: 'blue',
      objectivesCount: 4,
      objectives: [
        { code: 'OBJ-01', title: 'Maximize High-Yield Tourism Revenue', titleAr: 'تعظيم عوائد السياحة ذات القيمة المضافة', themeCode: 'PILLAR 01' },
        { code: 'OBJ-02', title: 'Attract Private Eco-Resort Capital Investments', titleAr: 'جذب الاستثمارات الخاصة للمنتجعات البيئية', themeCode: 'PILLAR 01' },
      ],
    },
    {
      id: 'bsc-customer',
      order: 2,
      name: 'Customer & Community Beneficiaries',
      nameAr: 'محور العملاء والمستفيدين والمجتمع',
      weight: 30,
      owner: 'VP Community & Tourism Development',
      color: 'emerald',
      objectivesCount: 5,
      objectives: [
        { code: 'OBJ-03', title: 'Elevate Oasis Resident Quality of Life Score', titleAr: 'رفع مؤشر جودة حياة سكان الواحة', themeCode: 'PILLAR 02' },
        { code: 'OBJ-04', title: 'Enrich Heritage Visitor Cultural Experience', titleAr: 'إثراء تجربة زوار المعالم التراثية', themeCode: 'PILLAR 02' },
      ],
    },
    {
      id: 'bsc-internal',
      order: 3,
      name: 'Internal Operations & Spatial Excellence',
      nameAr: 'محور العمليات الداخلية والتميز المكاني',
      weight: 25,
      owner: 'VP Spatial Planning & Operational Excellence',
      color: 'teal',
      objectivesCount: 5,
      objectives: [
        { code: 'OBJ-05', title: 'Implement Unified Spatial Planning Zoning Framework', titleAr: 'تطبيق ضوابط التخطيط المكاني الموحد', themeCode: 'PILLAR 03' },
        { code: 'OBJ-06', title: 'Preserve UNESCO World Heritage Living Canal Network', titleAr: 'صون شبكات قنوات الري للتراث العالمي', themeCode: 'PILLAR 03' },
      ],
    },
    {
      id: 'bsc-learning',
      order: 4,
      name: 'Organizational Capacity, People & Digital Tech',
      nameAr: 'محور القدرات المؤسسية والموارد البشرية والتقنية',
      weight: 20,
      owner: 'VP Human Capital & Digital Innovation',
      color: 'purple',
      objectivesCount: 4,
      objectives: [
        { code: 'OBJ-07', title: 'Foster National Heritage Expertise & Digital Capabilities', titleAr: 'بناء الكفاءات الوطنية والقدرات الرقمية', themeCode: 'PILLAR 04' },
        { code: 'OBJ-08', title: 'Deploy Enterprise Real-Time Strategy Monitoring Platform', titleAr: 'تدشين منصة المتابعة الاستراتيجية اللحظية', themeCode: 'PILLAR 04' },
      ],
    },
  ]);

  const totalWeight = perspectives.reduce((acc, p) => acc + p.weight, 0);
  const isWeightValid = totalWeight === 100;

  const handleWeightChange = (id: string, newWeight: number) => {
    setPerspectives((prev) =>
      prev.map((p) => (p.id === id ? { ...p, weight: newWeight } : p))
    );
  };

  const handleOrderMove = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === perspectives.length - 1)) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newItems = [...perspectives];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved!);
    // Reassign order
    const updated = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    setPerspectives(updated);
    toast.success(lang === 'ar' ? 'تم تحديث ترتيب المحاور' : 'Perspective order updated');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 9 من 20 • مسار العرض' : 'STEP 9 OF 20 • DEMO JOURNEY'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'تهيئة بطاقة الأداء المتوازن (BSC)' : 'Balanced Scorecard (BSC) Configuration'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'تهيئة محاور بطاقة الأداء المتوازن والتحقق من الأوزان (100%)'
                : 'Balanced Scorecard Perspectives, Ownership & 100% Weight Calibration'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'تحديد المحاور الأربعة لبطاقة الأداء المتوازن، وترتيب عرضها، وملاكها التنفيذيين، وتوزيع الأهداف وربطها بالركائز مع التحقق الصارم من اكتمال مجموع الأوزان 100%.'
                : 'Configure the four BSC perspectives, display order, executive owners, placed objectives, and validate strict completeness ensuring total weight equals exactly 100%.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/strategy-map')}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>{lang === 'ar' ? 'الانتقال إلى خريطة الاستراتيجية (Step 10) ➔' : 'Next: Strategy Map (Step 10) ➔'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Completeness & Weight Validation Bar (Client Requirement) */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">
              {lang === 'ar' ? 'فحص اكتمال الأوزان (Weight Validation):' : 'Total BSC Perspective Weight Validation:'}
            </span>
            <span
              className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                isWeightValid
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse'
              }`}
            >
              {isWeightValid ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% WEIGHT COMPLIANT (VALIDATED)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>INVALID WEIGHT TOTAL: {totalWeight}% (MUST EQUAL EXACTLY 100%)</span>
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => {
              setPerspectives([
                { ...perspectives[0]!, weight: 25 },
                { ...perspectives[1]!, weight: 30 },
                { ...perspectives[2]!, weight: 25 },
                { ...perspectives[3]!, weight: 20 },
              ]);
              toast.success('Weights recalibrated to valid 100% standard');
            }}
            className="text-[11px] font-mono text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'ar' ? 'إعادة التوازن إلى 100%' : 'Calibrate to 100% Standard'}</span>
          </button>
        </div>
      </div>

      {/* Perspectives Configuration Cards */}
      <div className="space-y-4">
        {perspectives.map((pers, index) => {
          return (
            <div
              key={pers.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    P{pers.order}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900">
                        {lang === 'ar' ? pers.nameAr : pers.name}
                      </h2>
                      <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold border border-indigo-200">
                        Weight: {pers.weight}%
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {lang === 'ar' ? 'المالك المسؤول:' : 'Executive Owner:'} <strong>{pers.owner}</strong>
                    </span>
                  </div>
                </div>

                {/* Controls: Weight Input & Order */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-slate-500">{lang === 'ar' ? 'الوزن %:' : 'Weight %:'}</span>
                    <input
                      type="number"
                      min="5"
                      max="60"
                      value={pers.weight}
                      onChange={(e) => handleWeightChange(pers.id, Number(e.target.value))}
                      className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold text-slate-800"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOrderMove(index, 'up')}
                      disabled={index === 0}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded text-xs font-bold cursor-pointer"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleOrderMove(index, 'down')}
                      disabled={index === perspectives.length - 1}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded text-xs font-bold cursor-pointer"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>

              {/* Objectives Placed Within Perspective (Client Requirement) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{lang === 'ar' ? 'المستهدفات الاستراتيجية المندرجة تحت هذا المحور:' : 'Objectives Assigned to Perspective:'}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {pers.objectives.length} Objectives Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {pers.objectives.map((obj) => (
                    <div
                      key={obj.code}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/80 flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                            {obj.code}
                          </span>
                          <span className="text-[10px] font-mono bg-white text-slate-600 px-1.5 py-0.2 rounded border border-slate-200 font-bold">
                            {obj.themeCode}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-800 pt-0.5">
                          {lang === 'ar' ? obj.titleAr : obj.title}
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
