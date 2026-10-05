import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS, AUTHORITY_SECTORS } from '../data/mockData';
import {
  Target,
  ArrowLeft,
  Sparkles,
  Layers,
  BarChart3,
  Calendar,
  DollarSign,
  User,
  Building,
  CheckCircle2,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Leaf,
  Globe,
  Plus,
  RefreshCw,
  Calculator,
  Compass,
  FolderGit2,
  Milestone,
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

const COLOR_OPTIONS = [
  { id: 'blue', name: 'Executive Blue', bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-700', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'indigo', name: 'Royal Indigo', bg: 'bg-indigo-600', border: 'border-indigo-500', text: 'text-indigo-700', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'emerald', name: 'Emerald Green', bg: 'bg-emerald-600', border: 'border-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'teal', name: 'Coastal Teal', bg: 'bg-teal-600', border: 'border-teal-500', text: 'text-teal-700', badge: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'purple', name: 'Deep Purple', bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-purple-700', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'amber', name: 'Warm Amber', bg: 'bg-amber-600', border: 'border-amber-500', text: 'text-amber-700', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'rose', name: 'Ruby Rose', bg: 'bg-rose-600', border: 'border-rose-500', text: 'text-rose-700', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
];

const PRESETS = [
  {
    name: '🌴 Al-Ahsa 2.1.1: Event Visitors Growth',
    badge: 'Client Matrix Benchmark',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Enhance community participation, civic awareness of the development strategy, and improve quality of life and oasis services.',
    color: 'emerald',
    weight: 35,
    goalCode: 'SG-2.1',
    goalTitle: 'Community Participation & Development Strategy Awareness',
    goalDescription: 'Foster active civic participation, digital dialogue, and widespread community alignment with the Al-Ahsa Development Strategy.',
    objCode: '2.1',
    objTitle: '2.1 Enhance Community Participation and Awareness of the Development Strategy',
    sectorId: 'sec-strategy',
    sectorName: 'Strategy & Sector Development Sector',
    department: 'Strategy Development',
    targetYear: 2027,
    progress: 78,
    objStatus: 'on-track' as const,
    kpiCode: '2.1.1',
    kpiName: 'Percentage Increase in the Number of Event Visitors',
    kpiFormula: '(Total Actual Event Visitors - Total Targeted Visitors) * 100%',
    kpiBaseline: '-',
    kpiTarget2026: '75%',
    kpiTarget2027: '85%',
    kpiTarget: 75,
    kpiActual: 72,
    kpiUnit: '%',
    kpiFrequency: 'Annual' as const,
    kpiStatus: 'on-track' as const,
    keyProject: 'Al-Ahsa Strategy Awareness Project',
    keyMilestone: 'Develop the General Framework for Community Awareness of the Al-Ahsa Strategy',
    initCode: 'INIT-AHA-01',
    initTitle: 'Raise Awareness of the Al-Ahsa Strategy and the Level of Digital Engagement with the Authority',
    initDescription: 'Comprehensive public awareness campaign, multimedia storytelling of the Al-Ahsa Development Strategy, and active digital engagement channels.',
    budgetSAR: 8500000,
    spentSAR: 5200000,
    milestoneTitle: 'Develop the General Framework for Community Awareness of the Al-Ahsa Strategy',
    milestoneDate: '2026-06-30',
  },
  {
    name: '📱 Al-Ahsa 2.1.2: Digital Engagement Index',
    badge: 'Social Analytics',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Foster digital dialogue and community engagement across all official Al Ahsa Authority social media and service portals.',
    color: 'blue',
    weight: 30,
    goalCode: 'SG-2.1',
    goalTitle: 'Digital Dialogue & Stakeholder Interactivity',
    goalDescription: 'Expand omnichannel digital reach and community feedback mechanisms.',
    objCode: '2.1',
    objTitle: '2.1 Enhance Community Participation and Awareness of the Development Strategy',
    sectorId: 'sec-strategy',
    sectorName: 'Strategy & Sector Development Sector',
    department: 'Marketing & Public Relations',
    targetYear: 2027,
    progress: 65,
    objStatus: 'on-track' as const,
    kpiCode: '2.1.2',
    kpiName: 'Digital Engagement Index with the Authority',
    kpiFormula: "Average Results of Engagement Analysis Reports for the Authority's Social Media Platforms",
    kpiBaseline: '2.00%',
    kpiTarget2026: '3.50%',
    kpiTarget2027: '4.00%',
    kpiTarget: 3.5,
    kpiActual: 2.8,
    kpiUnit: '%',
    kpiFrequency: 'Quarterly' as const,
    kpiStatus: 'on-track' as const,
    keyProject: 'Digital Engagement with the Authority Project',
    keyMilestone: "Develop the Authority's Digital Content Strategy",
    initCode: 'INIT-AHA-01',
    initTitle: 'Raise Awareness of the Al-Ahsa Strategy and the Level of Digital Engagement with the Authority',
    initDescription: 'Digital outreach campaigns, social analytics integration, and community feedback surveys.',
    budgetSAR: 4200000,
    spentSAR: 2100000,
    milestoneTitle: "Develop the Authority's Digital Content Strategy",
    milestoneDate: '2026-09-30',
  },
  {
    name: '🗳️ Al-Ahsa 2.1.3: Strategy Awareness Rate',
    badge: 'Civic Surveys',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Measure and grow population-wide comprehension of the Al-Ahsa vision and strategic developmental milestones.',
    color: 'teal',
    weight: 25,
    goalCode: 'SG-2.1',
    goalTitle: 'Public Understanding of Regional Vision',
    goalDescription: 'Implement continuous public surveys and community dashboard reporting.',
    objCode: '2.1',
    objTitle: '2.1 Enhance Community Participation and Awareness of the Development Strategy',
    sectorId: 'sec-ppm',
    sectorName: 'Programs & Projects Management Sector',
    department: 'Regional Programs & Projects',
    targetYear: 2027,
    progress: 40,
    objStatus: 'on-track' as const,
    kpiCode: '2.1.3',
    kpiName: 'Awareness Rate of the Development Strategy in Al-Ahsa',
    kpiFormula: 'Average Survey Results',
    kpiBaseline: '-',
    kpiTarget2026: '-',
    kpiTarget2027: '40%',
    kpiTarget: 40,
    kpiActual: 28,
    kpiUnit: '%',
    kpiFrequency: 'Annual' as const,
    kpiStatus: 'on-track' as const,
    keyProject: 'Digital Platform and Technical Integration for Community Engagement',
    keyMilestone: 'Build the Unified Digital Platform for Community Engagement Reporting - Surveys - Voting - Dashboards',
    initCode: 'INIT-AHA-02',
    initTitle: '7. Enhance Community Participation and Involvement in Preparing Development Plans',
    initDescription: 'Unified civic engagement digital portal with voting, public consultations, and regional dashboards.',
    budgetSAR: 12000000,
    spentSAR: 4800000,
    milestoneTitle: 'Build the Unified Digital Platform for Community Engagement',
    milestoneDate: '2026-12-31',
  },
  {
    name: '🌴 Al-Ahsa 2.2.2: Oasis Palm Trees Preservation',
    badge: 'Heritage & Ecology',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Sustain and protect the UNESCO-listed Al-Ahsa agricultural heritage, palm oasis density, and municipal services.',
    color: 'emerald',
    weight: 35,
    goalCode: 'SG-2.2',
    goalTitle: 'Oasis Ecological Heritage & Quality of Life',
    goalDescription: 'Sustain oasis palm tree population and expand urban environmental services across Al-Ahsa.',
    objCode: '2.2',
    objTitle: '2.2 Support Entities in Improving Quality of Life and Enhancing Services Provided to the Community',
    sectorId: 'sec-sud',
    sectorName: 'Spatial & Urban Development Sector',
    department: 'Urban & Rural Planning',
    targetYear: 2027,
    progress: 90,
    objStatus: 'on-track' as const,
    kpiCode: '2.2.2',
    kpiName: 'Number of Palm Trees within the Oasis',
    kpiFormula: 'Total Number of Palm Trees (in Millions)',
    kpiBaseline: '2.5',
    kpiTarget2026: '2.5',
    kpiTarget2027: '2.5',
    kpiTarget: 2.5,
    kpiActual: 2.5,
    kpiUnit: 'M Trees',
    kpiFrequency: 'Annual' as const,
    kpiStatus: 'achieved' as const,
    keyProject: 'Quality of Life Improvement Project',
    keyMilestone: 'Develop a Quality of Life Indicators Framework for Al-Ahsa, Aligned with the Quality of Life Program',
    initCode: 'INIT-AHA-03',
    initTitle: '8. Enhance and Improve Quality of Life in Al-Ahsa',
    initDescription: 'Ecosystem protection, municipal park expansions, and agricultural irrigation support for the historic oasis.',
    budgetSAR: 22000000,
    spentSAR: 14500000,
    milestoneTitle: 'Quality of Life Indicators Framework Delivery',
    milestoneDate: '2026-11-30',
  },
  {
    name: '🎪 Al-Ahsa 2.1.4: Festivals & Shows Count',
    badge: 'Events & Culture',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Promote cultural vitality, civic gatherings, and tourism experiences across Al-Ahsa regional venues.',
    color: 'amber',
    weight: 25,
    goalCode: 'SG-2.1',
    goalTitle: 'Cultural Vibrancy & Event Staging',
    goalDescription: 'Organize high-impact cultural festivals and community events in the oasis.',
    objCode: '2.1',
    objTitle: '2.1 Enhance Community Participation and Awareness of the Development Strategy',
    sectorId: 'sec-strategy',
    sectorName: 'Strategy & Sector Development Sector',
    department: 'Tourism Destination Management Office',
    targetYear: 2027,
    progress: 82,
    objStatus: 'on-track' as const,
    kpiCode: '2.1.4',
    kpiName: 'Number of Days Festivals and Shows Are Held',
    kpiFormula: 'Total Number of Days Festivals and Shows Are Held',
    kpiBaseline: '70',
    kpiTarget2026: '73',
    kpiTarget2027: '75',
    kpiTarget: 75,
    kpiActual: 72,
    kpiUnit: 'Days',
    kpiFrequency: 'Annual' as const,
    kpiStatus: 'on-track' as const,
    keyProject: 'Community Empowerment, Events and Impact Project',
    keyMilestone: 'Support Local Initiatives and the Community Economy',
    initCode: 'INIT-AHA-02',
    initTitle: '7. Enhance Community Participation and Involvement in Preparing Development Plans',
    initDescription: 'Staging festivals, cultural showcases, and heritage activation across historic districts.',
    budgetSAR: 9500000,
    spentSAR: 6200000,
    milestoneTitle: 'Annual Festivals & Cultural Calendar Launch',
    milestoneDate: '2026-10-15',
  },
  {
    name: '🤖 AI & Autonomous Digital Core',
    badge: 'Smart Governance',
    themeCode: 'ST-05',
    themeTitle: 'Artificial Intelligence & Intelligent Digital Core',
    themeDescription: 'Modernize enterprise IT backbone with agentic AI workflows, automated telemetry, and cognitive operations.',
    color: 'indigo',
    weight: 25,
    goalCode: 'SG-5.1',
    goalTitle: 'Accelerate Enterprise Automation and Cloud-Native Resilience',
    goalDescription: 'Transition critical enterprise pipelines to autonomous event-driven processing and cloud automation.',
    objCode: 'OBJ-501',
    objTitle: 'Deploy Enterprise Generative AI Workflows across 12 Business Units',
    sectorId: 'sec-ss',
    sectorName: 'Support Services Sector',
    department: 'Information Technology',
    targetYear: 2027,
    progress: 20,
    objStatus: 'on-track' as const,
    kpiCode: 'KPI-501',
    kpiName: 'Autonomous Workflow Adoption Rate',
    kpiFormula: '(Automated Workflows / Total Workflows) * 100%',
    kpiBaseline: '15%',
    kpiTarget2026: '60%',
    kpiTarget2027: '95%',
    kpiTarget: 95,
    kpiActual: 38,
    kpiUnit: '%',
    kpiFrequency: 'Quarterly' as const,
    kpiStatus: 'on-track' as const,
    keyProject: 'AI Core Infrastructure Project',
    keyMilestone: 'Deploy Multi-Agent Telemetry Across 12 Units',
    initCode: 'INIT-05',
    initTitle: 'Enterprise Cognitive Platform & Agentic Automation Rollout',
    initDescription: 'Deploy scalable multi-agent microservices and LLM-assisted knowledge management infrastructure.',
    budgetSAR: 18500000,
    spentSAR: 3200000,
    milestoneTitle: 'Cognitive Architecture Blueprint & Vendor Sign-off',
    milestoneDate: '2026-11-30',
  },
];

export const CreateStrategyPage: React.FC = () => {
  const navigate = useNavigate();
  const { themes, addStrategy, currentUser } = useApp();

  const nextThemeNum = themes.length + 1;
  const defaultThemeCode = `02`;
  const defaultGoalCode = `SG-${nextThemeNum}.1`;
  const defaultObjCode = `2.1`;
  const defaultKpiCode = `2.1.1`;
  const defaultInitCode = `INIT-AHA-01`;

  // Form states - Core Theme & Goal
  const [themeCode, setThemeCode] = useState(defaultThemeCode);
  const [themeTitle, setThemeTitle] = useState('02 People and Society');
  const [themeDescription, setThemeDescription] = useState(
    'Enhance community participation, civic awareness of the development strategy, and improve quality of life and oasis services.'
  );
  const [themeColor, setThemeColor] = useState('emerald');
  const [themeWeight, setThemeWeight] = useState(35);

  const [goalCode, setGoalCode] = useState('SG-2.1');
  const [goalTitle, setGoalTitle] = useState('Community Participation & Development Strategy Awareness');
  const [goalDescription, setGoalDescription] = useState('Foster active civic participation and widespread community alignment.');

  // Objective & Sector Cascading
  const [objCode, setObjCode] = useState('2.1');
  const [objTitle, setObjTitle] = useState('2.1 Enhance Community Participation and Awareness of the Development Strategy');
  const [objOwner, setObjOwner] = useState(currentUser.name);
  const [sectorId, setSectorId] = useState('sec-strategy');
  const [sectorName, setSectorName] = useState('Strategy & Sector Development Sector');
  const [objDept, setObjDept] = useState('Strategy Development');
  const [targetYear, setTargetYear] = useState(2027);
  const [objProgress, setObjProgress] = useState(75);
  const [objStatus, setObjStatus] = useState<'on-track' | 'at-risk' | 'behind' | 'achieved'>('on-track');

  // KPI & Matrix Mathematical Specification
  const [kpiCode, setKpiCode] = useState('2.1.1');
  const [kpiName, setKpiName] = useState('Percentage Increase in the Number of Event Visitors');
  const [kpiFormula, setKpiFormula] = useState('(Total Actual Event Visitors - Total Targeted Visitors) * 100%');
  const [kpiBaseline, setKpiBaseline] = useState<string | number>('-');
  const [kpiTarget2026, setKpiTarget2026] = useState<string | number>('75%');
  const [kpiTarget2027, setKpiTarget2027] = useState<string | number>('85%');
  const [kpiTarget, setKpiTarget] = useState(75);
  const [kpiActual, setKpiActual] = useState(72);
  const [kpiUnit, setKpiUnit] = useState('%');
  const [kpiFrequency, setKpiFrequency] = useState<'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual'>('Annual');
  const [kpiStatus, setKpiStatus] = useState<'on-track' | 'warning' | 'critical' | 'achieved'>('on-track');
  const [keyProject, setKeyProject] = useState('Al-Ahsa Strategy Awareness Project');
  const [keyMilestone, setKeyMilestone] = useState('Develop the General Framework for Community Awareness of the Al-Ahsa Strategy');
  const [pillarCode, setPillarCode] = useState('02');

  // Initiative & Budget
  const [initCode, setInitCode] = useState(defaultInitCode);
  const [initTitle, setInitTitle] = useState('Raise Awareness of the Al-Ahsa Strategy and the Level of Digital Engagement with the Authority');
  const [initDescription, setInitDescription] = useState('Comprehensive public awareness campaign and active digital engagement channels.');
  const [budgetSAR, setBudgetSAR] = useState(8500000);
  const [spentSAR, setSpentSAR] = useState(5200000);
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2027-12-31');
  const [milestoneTitle, setMilestoneTitle] = useState('Develop the General Framework for Community Awareness of the Al-Ahsa Strategy');
  const [milestoneDueDate, setMilestoneDueDate] = useState('2026-06-30');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setThemeCode(preset.themeCode || defaultThemeCode);
    setThemeTitle(preset.themeTitle);
    setThemeDescription(preset.themeDescription);
    setThemeColor(preset.color);
    setThemeWeight(preset.weight);
    setGoalCode(preset.goalCode || defaultGoalCode);
    setGoalTitle(preset.goalTitle);
    setGoalDescription(preset.goalDescription);
    setObjCode(preset.objCode || defaultObjCode);
    setObjTitle(preset.objTitle);
    setSectorId(preset.sectorId || 'sec-strategy');
    setSectorName(preset.sectorName || 'Strategy & Sector Development Sector');
    setObjDept(preset.department);
    setTargetYear(preset.targetYear);
    setObjProgress(preset.progress);
    setObjStatus(preset.objStatus);
    setKpiCode(preset.kpiCode || defaultKpiCode);
    setKpiName(preset.kpiName);
    setKpiFormula(preset.kpiFormula || '');
    setKpiBaseline(preset.kpiBaseline !== undefined ? preset.kpiBaseline : '-');
    setKpiTarget2026(preset.kpiTarget2026 !== undefined ? preset.kpiTarget2026 : `${preset.kpiTarget}${preset.kpiUnit}`);
    setKpiTarget2027(preset.kpiTarget2027 !== undefined ? preset.kpiTarget2027 : `${preset.kpiTarget}${preset.kpiUnit}`);
    setKeyProject(preset.keyProject || '');
    setKeyMilestone(preset.keyMilestone || '');
    setPillarCode(preset.themeCode || '02');
    setKpiTarget(preset.kpiTarget);
    setKpiActual(preset.kpiActual);
    setKpiUnit(preset.kpiUnit);
    setKpiFrequency(preset.kpiFrequency);
    setKpiStatus(preset.kpiStatus);
    setInitCode(preset.initCode || defaultInitCode);
    setInitTitle(preset.initTitle);
    setInitDescription(preset.initDescription);
    setBudgetSAR(preset.budgetSAR);
    setSpentSAR(preset.spentSAR);
    setMilestoneTitle(preset.milestoneTitle);
    setMilestoneDueDate(preset.milestoneDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeTitle.trim() || !goalTitle.trim() || !objTitle.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addStrategy({
        theme: {
          code: themeCode.trim() || defaultThemeCode,
          title: themeTitle.trim(),
          description: themeDescription.trim(),
          color: themeColor,
          weight: Number(themeWeight),
        },
        goal: {
          code: goalCode.trim() || defaultGoalCode,
          title: goalTitle.trim(),
          description: goalDescription.trim(),
        },
        objective: {
          code: objCode.trim() || defaultObjCode,
          title: objTitle.trim(),
          owner: objOwner.trim() || currentUser.name,
          department: objDept,
          sectorId,
          sectorName,
          targetYear: Number(targetYear),
          progress: Number(objProgress),
          status: objStatus,
        },
        kpi: kpiName.trim()
          ? {
              code: kpiCode.trim() || defaultKpiCode,
              name: kpiName.trim(),
              unit: kpiUnit.trim() || '%',
              target: Number(kpiTarget),
              actual: Number(kpiActual),
              frequency: kpiFrequency,
              status: kpiStatus,
              formula: kpiFormula.trim(),
              baseline: kpiBaseline,
              target2026: kpiTarget2026,
              target2027: kpiTarget2027,
              strategicInitiative: initTitle.trim(),
              keyMilestone: keyMilestone.trim() || milestoneTitle.trim(),
              keyProject: keyProject.trim(),
              pillarCode: pillarCode || '02',
              pillarTitle: themeTitle || '02 People and Society',
            }
          : undefined,
        initiative: initTitle.trim()
          ? {
              code: initCode.trim() || defaultInitCode,
              title: initTitle.trim(),
              description: initDescription.trim(),
              owner: objOwner,
              department: objDept,
              budgetSAR: Number(budgetSAR),
              spentSAR: Number(spentSAR),
              progress: Number(objProgress),
              startDate,
              endDate,
              status: 'Planning',
              milestones: [
                {
                  title: milestoneTitle.trim() || 'Core Deliverable Approval',
                  dueDate: milestoneDueDate,
                  status: 'In Progress',
                },
              ],
            }
          : undefined,
      });

      // Redirect back to Strategy screen
      navigate('/strategy');
    } catch (err) {
      console.error('Error creating strategy:', err);
      setIsSubmitting(false);
    }
  };

  const selectedColorObj = COLOR_OPTIONS.find((c) => c.id === themeColor) || COLOR_OPTIONS[0];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
            <Link
              to="/strategy"
              className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-0.5" />
              <span>Strategy Architecture</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-bold uppercase">Dynamic Strategy Formulation</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create New Strategic Pillar & Objectives
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Configure an institutional strategy pillar, nested alignment goal, actionable target objective, measurable KPI indicator, and tactical initiative.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/strategy"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>{isSubmitting ? 'Creating Strategy...' : 'Save & Deploy Strategy'}</span>
          </button>
        </div>
      </div>

      {/* Preset Strategy Templates Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 p-4 rounded-2xl border border-blue-100 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Instant Demo Presets: Auto-Populate Strategic Templates</span>
          </div>
          <span className="text-[11px] font-mono text-blue-600">Click to instantly populate full hierarchy</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="p-2.5 bg-white/90 hover:bg-white border border-blue-200/70 hover:border-blue-400 rounded-xl text-left text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
            >
              <div className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors flex items-center justify-between">
                <span>{p.name}</span>
                <Sparkles className="w-3 h-3 text-slate-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{p.goalTitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form (2 Cols on left) + Live Preview (1 Col on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Area */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Card 1: Strategic Pillar / Theme */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Strategic Pillar (Theme)</h3>
                  <p className="text-[11px] text-slate-500">Core organizational vision pillar & executive priority</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Level 1: Pillar
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pillar Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={themeCode}
                  onChange={(e) => {
                    setThemeCode(e.target.value);
                    setPillarCode(e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. 02"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pillar Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={themeTitle}
                  onChange={(e) => setThemeTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. Artificial Intelligence & Cognitive Transformation"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Executive Pillar Description & Strategic Scope <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={themeDescription}
                onChange={(e) => setThemeDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Describe the long-term impact and organizational intent..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Theme Accent Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setThemeColor(c.id)}
                      className={`w-7 h-7 rounded-lg ${c.bg} transition-all cursor-pointer flex items-center justify-center text-white ${
                        themeColor === c.id ? 'ring-2 ring-offset-2 ring-slate-900 scale-110 shadow-xs' : 'opacity-80 hover:opacity-100'
                      }`}
                      title={c.name}
                    >
                      {themeColor === c.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Strategic Weight: {themeWeight}%</label>
                  <span className="text-[10px] text-slate-400 font-mono">Relative Priority</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={themeWeight}
                  onChange={(e) => setThemeWeight(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer mt-1"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Strategic Goal */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Strategic Goal</h3>
                  <p className="text-[11px] text-slate-500">Milestone objective nested under the strategic pillar</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Level 2: Goal
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Goal Code</label>
                <input
                  type="text"
                  required
                  value={goalCode}
                  onChange={(e) => setGoalCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. SG-5.1"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Goal Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. Modernize Enterprise Telemetry and Incident Routing"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Goal Alignment Summary</label>
              <input
                type="text"
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Brief description of desired institutional outcome..."
              />
            </div>
          </div>

          {/* Card 3: Strategic Objective (Execution Target) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Strategic Objective (OKR Target)</h3>
                  <p className="text-[11px] text-slate-500">Actionable department target with progress tracking</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Level 3: Objective
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Objective Code</label>
                <input
                  type="text"
                  required
                  value={objCode}
                  onChange={(e) => setObjCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. OBJ-501"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Objective Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={objTitle}
                  onChange={(e) => setObjTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. Deploy Enterprise Generative AI Workflows"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Operational Sector (Client Governance Tier)
                </label>
                <select
                  value={sectorId}
                  onChange={(e) => {
                    const selId = e.target.value;
                    setSectorId(selId);
                    const foundSec = AUTHORITY_SECTORS.find((s) => s.id === selId);
                    if (foundSec) {
                      setSectorName(foundSec.name);
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  {AUTHORITY_SECTORS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Directorate</label>
                <select
                  value={objDept}
                  onChange={(e) => setObjDept(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                  <option value="Enterprise Digital Transformation">Enterprise Digital Transformation</option>
                  <option value="Corporate Operations & Logistics">Corporate Operations & Logistics</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Owner / Lead Officer</label>
                <input
                  type="text"
                  required
                  value={objOwner}
                  onChange={(e) => setObjOwner(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Year</label>
                <select
                  value={targetYear}
                  onChange={(e) => setTargetYear(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                  <option value={2028}>2028</option>
                  <option value={2029}>2029</option>
                  <option value={2030}>2030</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={objStatus}
                  onChange={(e: any) => setObjStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="on-track">On Track</option>
                  <option value="at-risk">At Risk</option>
                  <option value="behind">Behind</option>
                  <option value="achieved">Achieved</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Initial Progress</label>
                <span className="text-xs font-mono font-bold text-blue-700">{objProgress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={objProgress}
                onChange={(e) => setObjProgress(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* Card 4: Key Performance Indicator (KPI & Cascading Matrix Specification) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Key Performance Indicator (KPI)</h3>
                  <p className="text-[11px] text-slate-500">Measurable metric with formula & multi-year cascading targets</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Level 4: Metric & Formula
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">KPI Code</label>
                <input
                  type="text"
                  value={kpiCode}
                  onChange={(e) => setKpiCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. 2.1.1"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Indicator Name</label>
                <input
                  type="text"
                  value={kpiName}
                  onChange={(e) => setKpiName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. Percentage Increase in the Number of Event Visitors"
                />
              </div>
            </div>

            {/* Mathematical Calculation Formula */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-blue-600" />
                  <span>Mathematical Calculation Formula</span>
                </label>
                <span className="text-[10px] font-mono text-slate-400">Exact formula from strategy matrix</span>
              </div>
              <input
                type="text"
                value={kpiFormula}
                onChange={(e) => setKpiFormula(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="e.g. (Total Actual Event Visitors - Total Targeted Visitors) * 100%"
              />
              {kpiFormula && (
                <div className="mt-1.5 p-2 bg-slate-900 text-blue-300 rounded-lg text-[11px] font-mono flex items-center gap-2 border border-slate-800">
                  <span className="text-slate-400 font-bold">f(x) =</span>
                  <span className="truncate">{kpiFormula}</span>
                </div>
              )}
            </div>

            {/* Multi-Year Cascading Targets & Baseline Grid */}
            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Cascading Multi-Year Targets (Client Matrix)</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Baseline Value</label>
                  <input
                    type="text"
                    value={kpiBaseline}
                    onChange={(e) => setKpiBaseline(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="e.g. 2.00% or 70 or -"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-700 mb-1">2026 Target</label>
                  <input
                    type="text"
                    value={kpiTarget2026}
                    onChange={(e) => setKpiTarget2026(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-mono font-bold text-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="e.g. 75%"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-700 mb-1">2027 Target</label>
                  <input
                    type="text"
                    value={kpiTarget2027}
                    onChange={(e) => setKpiTarget2027(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-mono font-bold text-emerald-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="e.g. 85%"
                  />
                </div>
              </div>
            </div>

            {/* Execution Measurement Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Numeric Target</label>
                <input
                  type="number"
                  step="any"
                  value={kpiTarget}
                  onChange={(e) => setKpiTarget(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Actual / Current</label>
                <input
                  type="number"
                  step="any"
                  value={kpiActual}
                  onChange={(e) => setKpiActual(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Metric Unit</label>
                <input
                  type="text"
                  value={kpiUnit}
                  onChange={(e) => setKpiUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="%, M Trees, Days, SAR"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Frequency</label>
                <select
                  value={kpiFrequency}
                  onChange={(e: any) => setKpiFrequency(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Bi-Annual">Bi-Annual</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
            </div>

            {/* Key Project & Milestone Linkage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Key Project Name</span>
                </label>
                <input
                  type="text"
                  value={keyProject}
                  onChange={(e) => setKeyProject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. Al-Ahsa Strategy Awareness Project"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Milestone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Key Project Milestone</span>
                </label>
                <input
                  type="text"
                  value={keyMilestone}
                  onChange={(e) => setKeyMilestone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. Develop the General Framework for Community Awareness..."
                />
              </div>
            </div>
          </div>

          {/* Card 5: Strategic Initiative & Budget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                  5
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Strategic Initiative & Budget</h3>
                  <p className="text-[11px] text-slate-500">Funded implementation project delivering this objective</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Level 5: Initiative
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Initiative Code</label>
                <input
                  type="text"
                  value={initCode}
                  onChange={(e) => setInitCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Initiative Title</label>
                <input
                  type="text"
                  value={initTitle}
                  onChange={(e) => setInitTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. Enterprise Cognitive Platform Rollout"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Allocation (SAR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">SAR</span>
                  <input
                    type="number"
                    value={budgetSAR}
                    onChange={(e) => setBudgetSAR(Number(e.target.value))}
                    className="w-full pl-12 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Spent Capital (SAR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">SAR</span>
                  <input
                    type="number"
                    value={spentSAR}
                    onChange={(e) => setSpentSAR(Number(e.target.value))}
                    className="w-full pl-12 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Key Deliverable Milestone</label>
                <input
                  type="text"
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. Core Security & Architecture Review"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Milestone Target Date</label>
                <input
                  type="date"
                  value={milestoneDueDate}
                  onChange={(e) => setMilestoneDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <Link
              to="/strategy"
              className="px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'Creating Strategy...' : 'Create & Deploy Strategy'}</span>
            </button>
          </div>
        </form>

        {/* Live Interactive Preview (Right Column) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Live Hierarchy Tree Preview
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Real-Time
              </span>
            </div>

            {/* Simulated Strategic Theme Box */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200/70 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded">
                      {themeCode || 'ST-XX'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {themeTitle || 'Untitled Strategic Pillar'}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {themeDescription || 'Pillar description will appear here...'}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200 shrink-0">
                  Weight: {themeWeight}%
                </span>
              </div>

              {/* Nested Goal */}
              <div className="pl-3 border-l-2 border-slate-300 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                  <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {goalCode || 'SG-X.1'}
                  </span>
                  <span>{goalTitle || 'Primary Strategic Goal'}</span>
                </div>

                {/* Nested Objective Card */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-slate-900">
                      {objCode || 'OBJ-X01'}
                    </span>
                    <StatusBadge status={objStatus} />
                  </div>
                  <h5 className="font-semibold text-xs text-slate-900">
                    {objTitle || 'Strategic Objective Target'}
                  </h5>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-mono">
                    <span className="truncate max-w-[140px]">Lead: {objOwner || currentUser.name}</span>
                    <span className="font-bold text-emerald-700">{objProgress}% Progress</span>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full transition-all" style={{ width: `${objProgress}%` }} />
                  </div>

                  <div className="flex flex-col gap-0.5 text-[10px] text-slate-500 font-mono pt-0.5">
                    <div className="flex items-center justify-between">
                      <span>Target Year: {targetYear}</span>
                      <span>Dept: {objDept}</span>
                    </div>
                    {sectorName && (
                      <div className="text-slate-400 truncate">
                        Sector: {sectorName}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* KPI Snapshot Pill */}
              {kpiName && (
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        {kpiCode}
                      </span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{kpiName}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {kpiActual} / {kpiTarget} {kpiUnit}
                    </span>
                  </div>

                  {kpiFormula && (
                    <div className="p-1.5 bg-slate-900 text-blue-300 rounded text-[10px] font-mono flex items-center gap-1.5 overflow-hidden">
                      <Calculator className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="truncate">{kpiFormula}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2 rounded-lg text-center font-mono text-[10px] border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[9px]">Baseline</span>
                      <span className="font-bold text-slate-700">{kpiBaseline || '-'}</span>
                    </div>
                    <div>
                      <span className="text-blue-500 block text-[9px]">2026 Target</span>
                      <span className="font-bold text-blue-700">{kpiTarget2026 || '-'}</span>
                    </div>
                    <div>
                      <span className="text-emerald-600 block text-[9px]">2027 Target</span>
                      <span className="font-bold text-emerald-700">{kpiTarget2027 || '-'}</span>
                    </div>
                  </div>

                  {keyProject && (
                    <div className="text-[10px] text-slate-600 flex items-center gap-1.5 pt-0.5">
                      <FolderGit2 className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span className="font-semibold truncate">Project: {keyProject}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Initiative Snapshot Pill */}
              {initTitle && (
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 truncate">{initTitle}</span>
                    <span className="font-mono text-[10px] font-bold text-slate-700">
                      SAR {(budgetSAR / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Milestone: {milestoneTitle}</span>
                    <span>{milestoneDueDate}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button in preview */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center space-x-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Deploy Strategy into Hierarchy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
