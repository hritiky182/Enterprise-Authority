import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../data/mockData';
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
    name: '🤖 AI & Autonomous Digital Core',
    themeTitle: 'Artificial Intelligence & Intelligent Digital Core',
    themeDescription: 'Modernize enterprise IT backbone with agentic AI workflows, automated telemetry, and cognitive operations.',
    color: 'indigo',
    weight: 25,
    goalTitle: 'Accelerate Enterprise Automation and Cloud-Native Resilience',
    goalDescription: 'Transition critical enterprise pipelines to autonomous event-driven processing and cloud automation.',
    objTitle: 'Deploy Enterprise Generative AI Workflows across 12 Business Units',
    department: 'Strategic Development Office',
    targetYear: 2027,
    progress: 20,
    objStatus: 'on-track' as const,
    kpiName: 'Autonomous Workflow Adoption Rate',
    kpiTarget: 95,
    kpiActual: 38,
    kpiUnit: '%',
    kpiFrequency: 'Quarterly' as const,
    kpiStatus: 'on-track' as const,
    initTitle: 'Enterprise Cognitive Platform & Agentic Automation Rollout',
    initDescription: 'Deploy scalable multi-agent microservices and LLM-assisted knowledge management infrastructure.',
    budgetSAR: 18500000,
    spentSAR: 3200000,
    milestoneTitle: 'Cognitive Architecture Blueprint & Vendor Sign-off',
    milestoneDate: '2026-11-30',
  },
  {
    name: '🌿 ESG & Sustainable Clean Operations',
    themeTitle: 'Global ESG Excellence & Carbon Neutrality 2030',
    themeDescription: 'Incorporate sustainability metrics across procurement, solar-driven facilities, and circular waste management.',
    color: 'emerald',
    weight: 20,
    goalTitle: 'Transition Core Infrastructure to 100% Clean Energy & Net-Zero',
    goalDescription: 'Substantially reduce operational greenhouse emissions and deploy automated environmental telemetry.',
    objTitle: 'Reduce Scope 1 & 2 Corporate Carbon Emissions by 40%',
    department: 'Enterprise Risk & Resilience Directorate',
    targetYear: 2028,
    progress: 32,
    objStatus: 'on-track' as const,
    kpiName: 'Carbon Footprint Reduction Index',
    kpiTarget: 40,
    kpiActual: 18,
    kpiUnit: '%',
    kpiFrequency: 'Bi-Annual' as const,
    kpiStatus: 'on-track' as const,
    initTitle: 'Smart Facility Solar Microgrid & Energy Efficiency Retrofit',
    initDescription: 'Install high-efficiency solar arrays and smart IoT energy meters across corporate headquarters.',
    budgetSAR: 24000000,
    spentSAR: 7500000,
    milestoneTitle: 'Solar Microgrid Grid Interconnection Approval',
    milestoneDate: '2026-12-15',
  },
  {
    name: '🛡️ Advanced Zero-Trust Cyber Resilience',
    themeTitle: 'Next-Generation Zero-Trust Cyber Defense',
    themeDescription: 'Architect resilient defense-in-depth security perimeter, automated SOAR workflows, and cyber recovery posture.',
    color: 'blue',
    weight: 25,
    goalTitle: 'Fortify Mission-Critical Digital Assets against Advanced Threats',
    goalDescription: 'Establish micro-segmented access, quantum-ready encryption, and 24/7 autonomous threat hunting.',
    objTitle: 'Implement Zero-Trust Network Access Across 100% Enterprise Endpoints',
    department: 'Cybersecurity & IT Governance',
    targetYear: 2026,
    progress: 45,
    objStatus: 'on-track' as const,
    kpiName: 'Mean Time to Detect & Contain (MTTC)',
    kpiTarget: 15,
    kpiActual: 28,
    kpiUnit: 'Mins',
    kpiFrequency: 'Monthly' as const,
    kpiStatus: 'warning' as const,
    initTitle: 'Autonomous Threat Detection & Immutable Cloud Backup Network',
    initDescription: 'Roll out automated EDR/XDR with instant containment playbooks and air-gapped immutable recovery.',
    budgetSAR: 14500000,
    spentSAR: 5200000,
    milestoneTitle: 'Micro-segmentation policy verification across all subnets',
    milestoneDate: '2026-10-31',
  },
  {
    name: '⚡ Global Client Experience & Service Mesh',
    themeTitle: 'Omnichannel Client Engagement & Digital Ecosystem',
    themeDescription: 'Deliver personalized, frictionless client services through intelligent portal and unified CRM mesh.',
    color: 'purple',
    weight: 15,
    goalTitle: 'Elevate Enterprise Client Satisfaction to Industry Top Decile',
    goalDescription: 'Unify disparate stakeholder touchpoints into a unified, high-availability self-service ecosystem.',
    objTitle: 'Attain Global Client Satisfaction (CSAT) Rating of 95%',
    department: 'Strategic Development Office',
    targetYear: 2027,
    progress: 15,
    objStatus: 'on-track' as const,
    kpiName: 'Customer Lifetime Satisfaction (CSAT)',
    kpiTarget: 95,
    kpiActual: 82,
    kpiUnit: '%',
    kpiFrequency: 'Quarterly' as const,
    kpiStatus: 'on-track' as const,
    initTitle: 'Next-Gen Unified Enterprise Portal & API Hub',
    initDescription: 'Centralize enterprise self-service, real-time ticket escalation, and client SLA transparency.',
    budgetSAR: 9800000,
    spentSAR: 1900000,
    milestoneTitle: 'Beta Client Beta Group Pilot Onboarding',
    milestoneDate: '2026-11-15',
  },
];

export const CreateStrategyPage: React.FC = () => {
  const navigate = useNavigate();
  const { themes, addStrategy, currentUser } = useApp();

  const nextThemeNum = themes.length + 1;
  const defaultThemeCode = `ST-${String(nextThemeNum).padStart(2, '0')}`;
  const defaultGoalCode = `SG-${nextThemeNum}.1`;
  const defaultObjCode = `OBJ-${nextThemeNum}01`;
  const defaultKpiCode = `KPI-${nextThemeNum}01`;
  const defaultInitCode = `INIT-${String(nextThemeNum).padStart(2, '0')}`;

  // Form states
  const [themeCode, setThemeCode] = useState(defaultThemeCode);
  const [themeTitle, setThemeTitle] = useState('AI-Powered Customer Excellence & Digital Core');
  const [themeDescription, setThemeDescription] = useState(
    'Transform enterprise operations through intelligent automation, automated telemetry, and cognitive customer experiences.'
  );
  const [themeColor, setThemeColor] = useState('blue');
  const [themeWeight, setThemeWeight] = useState(25);

  const [goalCode, setGoalCode] = useState(defaultGoalCode);
  const [goalTitle, setGoalTitle] = useState('Accelerate Enterprise Automation and Cloud-Native Agility');
  const [goalDescription, setGoalDescription] = useState('Build intelligent microservices to support modern corporate workflows.');

  const [objCode, setObjCode] = useState(defaultObjCode);
  const [objTitle, setObjTitle] = useState('Deploy Generative AI Agentic Workflows across 12 Business Units');
  const [objOwner, setObjOwner] = useState(currentUser.name);
  const [objDept, setObjDept] = useState(currentUser.department || 'Strategic Development Office');
  const [targetYear, setTargetYear] = useState(2027);
  const [objProgress, setObjProgress] = useState(20);
  const [objStatus, setObjStatus] = useState<'on-track' | 'at-risk' | 'behind' | 'achieved'>('on-track');

  const [kpiCode, setKpiCode] = useState(defaultKpiCode);
  const [kpiName, setKpiName] = useState('Autonomous Workflow Adoption Rate');
  const [kpiTarget, setKpiTarget] = useState(90);
  const [kpiActual, setKpiActual] = useState(35);
  const [kpiUnit, setKpiUnit] = useState('%');
  const [kpiFrequency, setKpiFrequency] = useState<'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual'>('Quarterly');
  const [kpiStatus, setKpiStatus] = useState<'on-track' | 'warning' | 'critical' | 'achieved'>('on-track');

  const [initCode, setInitCode] = useState(defaultInitCode);
  const [initTitle, setInitTitle] = useState('Enterprise Cognitive Platform Rollout');
  const [initDescription, setInitDescription] = useState('Enterprise-wide rollout of scalable cognitive microservices.');
  const [budgetSAR, setBudgetSAR] = useState(15000000);
  const [spentSAR, setSpentSAR] = useState(2500000);
  const [startDate, setStartDate] = useState('2026-03-01');
  const [endDate, setEndDate] = useState('2027-12-31');
  const [milestoneTitle, setMilestoneTitle] = useState('Core Architecture & Security Sign-off');
  const [milestoneDueDate, setMilestoneDueDate] = useState('2026-10-31');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setThemeTitle(preset.themeTitle);
    setThemeDescription(preset.themeDescription);
    setThemeColor(preset.color);
    setThemeWeight(preset.weight);
    setGoalTitle(preset.goalTitle);
    setGoalDescription(preset.goalDescription);
    setObjTitle(preset.objTitle);
    setObjDept(preset.department);
    setTargetYear(preset.targetYear);
    setObjProgress(preset.progress);
    setObjStatus(preset.objStatus);
    setKpiName(preset.kpiName);
    setKpiTarget(preset.kpiTarget);
    setKpiActual(preset.kpiActual);
    setKpiUnit(preset.kpiUnit);
    setKpiFrequency(preset.kpiFrequency);
    setKpiStatus(preset.kpiStatus);
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
                  onChange={(e) => setThemeCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. ST-05"
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
          </div>

          {/* Card 4: Key Performance Indicator (KPI) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Key Performance Indicator (KPI)</h3>
                  <p className="text-[11px] text-slate-500">Measurable metric tied directly to this objective</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Level 4: Metric
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
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Indicator Name</label>
                <input
                  type="text"
                  value={kpiName}
                  onChange={(e) => setKpiName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="e.g. Autonomous Workflow Adoption Rate"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Value</label>
                <input
                  type="number"
                  value={kpiTarget}
                  onChange={(e) => setKpiTarget(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Actual / Baseline</label>
                <input
                  type="number"
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
                  placeholder="%, SAR, Score, Days"
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

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                    <span>Target Year: {targetYear}</span>
                    <span>Dept: {objDept}</span>
                  </div>
                </div>
              </div>

              {/* KPI Snapshot Pill */}
              {kpiName && (
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                        {kpiCode}
                      </span>
                      <span className="font-semibold text-slate-800">{kpiName}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Frequency: {kpiFrequency} • Status: {kpiStatus}
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[10px] text-slate-400 block">Actual / Target</span>
                    <span className="font-bold text-slate-900">
                      {kpiActual} / {kpiTarget} {kpiUnit}
                    </span>
                  </div>
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
