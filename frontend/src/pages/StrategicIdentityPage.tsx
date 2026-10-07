import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Target,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
  Shield,
  Eye,
  Heart,
  Award,
  Link2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const StrategicIdentityPage: React.FC = () => {
  const { lang, t, themes, organization } = useApp();
  const navigate = useNavigate();

  const [activeVision, setActiveVision] = useState(
    organization?.vision ||
      'To position Al-Ahsa as a global model of sustainable oasis living, UNESCO cultural heritage excellence, and economic vitality by 2030.'
  );
  const [activeVisionAr, setActiveVisionAr] = useState(
    organization?.visionAr ||
      'أن تكون الأحساء نموذجاً عالمياً للعيش المستدام في الواحات، والريادة في صون التراث الثقافي لليونسكو، والازدهار الاقتصادي بحلول 2030.'
  );

  const [activeMission, setActiveMission] = useState(
    organization?.mission ||
      'To lead coordinated spatial planning, unleash high-yield heritage and agricultural tourism, and elevate citizen quality of life in full alignment with Saudi Vision 2030.'
  );
  const [activeMissionAr, setActiveMissionAr] = useState(
    organization?.missionAr ||
      'قيادة التخطيط المكاني المنسق، وتحفيز السياحة التراثية والزراعية ذات العائد المرتفع، والارتقاء بجودة حياة المواطنين بمواءمة تامة مع رؤية السعودية 2030.'
  );

  const coreValues = [
    { title: 'Heritage Stewardship', titleAr: 'الأصالة وحماية التراث', desc: 'Safeguarding UNESCO living cultural landscape' },
    { title: 'Sustainable Prosperity', titleAr: 'الازدهار المستدام', desc: 'Balancing economic growth with eco-preservation' },
    { title: 'Institutional Agility', titleAr: 'المرونة والريادة المؤسسية', desc: 'Excellence in delivery and governance' },
    { title: 'Community-First', titleAr: 'المواطن أولاً وجودة الحياة', desc: 'Putting residents at the heart of transformation' },
  ];

  // Theme links to Vision 2030 & Priorities
  const themeAlignments = [
    {
      themeId: 'st-people',
      code: 'PILLAR 01',
      title: 'Economic Diversification & Tourism Growth',
      titleAr: 'النمو الاقتصادي وتطوير السياحة',
      vision2030Link: 'Vision 2030: Thriving Economy • 100M Visitors Objective',
      vision2030LinkAr: 'رؤية 2030: اقتصاد مزهر • استهداف 100 مليون زائر',
      selectedPriority: 'OPT-A: Eco-Luxury Agritourism & Hospitality Clusters',
      selectedPriorityAr: 'الأولوية (A): نزل الضيافة التراثية والسياحة الزراعية الفاخرة',
      color: 'blue',
    },
    {
      themeId: 'st-community',
      code: 'PILLAR 02',
      title: 'People, Community & Vibrant Society',
      titleAr: 'المجتمع والارتقاء بجودة الحياة',
      vision2030Link: 'Vision 2030: Vibrant Society • Quality of Life Program 2.1',
      vision2030LinkAr: 'رؤية 2030: مجتمع حيوي • برنامج جودة الحياة 2.1',
      selectedPriority: 'Residents Recreation & Cultural Identity Corridors',
      selectedPriorityAr: 'تطوير الممرات الترفيهية وصون الهوية المجتمعية',
      color: 'teal',
    },
    {
      themeId: 'st-oasis',
      code: 'PILLAR 03',
      title: 'UNESCO Heritage & Oasis Environmental Sustainability',
      titleAr: 'صون واحة اليونسكو والاستدامة البيئية',
      vision2030Link: 'Vision 2030: Ambitious Nation • Saudi Green Initiative',
      vision2030LinkAr: 'رؤية 2030: وطن طموح • مبادرة السعودية الخضراء',
      selectedPriority: 'OPT-C: Date Palm Value-Add & Creative Gastronomy City',
      selectedPriorityAr: 'الأولوية (C): صناعات التمور وشبكة المدن المبدعة لليونسكو',
      color: 'emerald',
    },
    {
      themeId: 'st-gov',
      code: 'PILLAR 04',
      title: 'Governance, Urban Harmonization & Institutional Excellence',
      titleAr: 'الحوكمة والمواءمة الحضرية والتميز المؤسسي',
      vision2030Link: 'Vision 2030: Effective Government & Municipal Harmonization',
      vision2030LinkAr: 'رؤية 2030: حكومة فاعلة والمواءمة بين الأجهزة الحكومية',
      selectedPriority: 'Unified Al-Ahsa Spatial Planning & Zoning Bylaws',
      selectedPriorityAr: 'الضوابط التخطيطية المكانية الموحدة لمحافظة الأحساء',
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 8 من 20 • مسار العرض' : 'STEP 8 OF 20 • DEMO JOURNEY'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'الهوية والركائز الاستراتيجية' : 'Strategic Identity & Themes'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'الهوية الاستراتيجية وربط الركائز بالأولويات الوطنية'
                : 'Strategic Identity, Themes & National Alignment Lineage'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'صياغة الرؤية والرسالة والقيم المؤسسية، وربط الركائز الاستراتيجية بالأولويات المفاضلة في الخطوة 7 وأهداف رؤية السعودية 2030 الوطنية.'
                : 'Define Vision, Mission, Core Values, and Strategic Themes, connecting each pillar directly to prioritized choices from Step 7 and national Saudi Vision 2030 objectives.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/bsc-config')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>{lang === 'ar' ? 'الانتقال إلى محاور بطاقة الأداء (Step 9) ➔' : 'Next: BSC Perspectives (Step 9) ➔'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vision */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Eye className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'الرؤية المؤسسية 2030' : 'Institutional Vision 2030'}
            </h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {lang === 'ar' ? activeVisionAr : activeVision}
          </p>
          <div className="pt-2 text-[11px] text-blue-600 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'معتمدة من مجلس إدارة الهيئة' : 'Ratified by Authority Board'}</span>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Target className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'الرسالة المؤسسية ووثيقة التكليف' : 'Institutional Mission & Mandate'}
            </h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {lang === 'ar' ? activeMissionAr : activeMission}
          </p>
          <div className="pt-2 text-[11px] text-emerald-600 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'متوافقة مع برنامج التحول الوطني' : 'Aligned with National Transformation Charter'}</span>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
          <Heart className="w-4 h-4 text-rose-600" />
          <h2 className="text-sm font-bold text-slate-900">
            {lang === 'ar' ? 'القيم الاستراتيجية الحاكمة' : 'Core Strategic Values'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {coreValues.map((val, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
              <span className="text-xs font-bold text-slate-900 block">
                {lang === 'ar' ? val.titleAr : val.title}
              </span>
              <span className="text-[11px] text-slate-500 leading-relaxed block">
                {val.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Themes Linked to Priorities & Vision 2030 (Client Requirement) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-blue-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {lang === 'ar'
                  ? 'الركائز الاستراتيجية وربطها بالأولويات ورؤية السعودية 2030'
                  : 'Strategic Themes: Lineage to Decision Priorities & Saudi Vision 2030'}
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {lang === 'ar'
                  ? 'تتبع واضح يربط كل ركيزة استراتيجية بالقرار المفاضل في الخطوة 7 وبالهدف الوطني المقابل'
                  : 'Rigorous traceability linking each strategic pillar to Step 7 choices and Vision 2030'}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 font-semibold">
            4 ALIGNED PILLARS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themeAlignments.map((theme) => (
            <div
              key={theme.themeId}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {theme.code}
                </span>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-bold">
                  ACTIVE PILLAR
                </span>
              </div>

              <div className="text-sm font-bold text-slate-900">
                {lang === 'ar' ? theme.titleAr : theme.title}
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                    {lang === 'ar' ? 'المواءمة مع رؤية المملكة 2030:' : 'Saudi Vision 2030 Goal Link:'}
                  </span>
                  <span className="text-slate-800 font-semibold mt-0.5 block">
                    {lang === 'ar' ? theme.vision2030LinkAr : theme.vision2030Link}
                  </span>
                </div>

                <div className="pt-1 border-t border-slate-200/60">
                  <span className="text-[10px] font-mono text-teal-700 uppercase block font-bold">
                    {lang === 'ar' ? 'الأولوية المفاضلة المشتقة (من الخطوة 7):' : 'Derived Prioritized Option (Step 7):'}
                  </span>
                  <span className="text-teal-900 font-medium mt-0.5 block">
                    {lang === 'ar' ? theme.selectedPriorityAr : theme.selectedPriority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
