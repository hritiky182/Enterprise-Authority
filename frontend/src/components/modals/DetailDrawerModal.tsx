import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldAlert,
  Target,
  ListTodo,
  Activity,
  CheckCircle,
  Clock,
  User,
  Calendar,
  AlertTriangle,
  Plus,
  FileText,
  Calculator,
  FolderGit2,
  Milestone,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { StrategyDetailView } from './StrategyDetailView';

export const DetailDrawerModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    updateRiskStatus,
    addRisk,
    addAction,
    objectives,
    initiatives,
    addKPI,
    addInitiative,
    currentUser,
    permissions,
  } = useApp();

  // State for Create Risk form
  const [newRiskTitle, setNewRiskTitle] = useState('');
  const [newRiskCategory, setNewRiskCategory] = useState<'Operational' | 'Strategic' | 'Financial' | 'Compliance' | 'Cyber' | 'Reputational'>('Operational');
  const [newRiskLikelihood, setNewRiskLikelihood] = useState(3);
  const [newRiskImpact, setNewRiskImpact] = useState(4);
  const [newRiskOwner, setNewRiskOwner] = useState(currentUser.name);
  const [newRiskDept, setNewRiskDept] = useState(currentUser.department);
  const [newRiskDesc, setNewRiskDesc] = useState('');

  // State for Create Action form
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionSource, setNewActionSource] = useState<'Strategy' | 'ERM' | 'Cyber' | 'Governance' | 'Compliance' | 'BCM'>('ERM');
  const [newActionPriority, setNewActionPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [newActionDueDate, setNewActionDueDate] = useState('2026-10-15');
  const [newActionOwner, setNewActionOwner] = useState(currentUser.name);
  const [newActionDesc, setNewActionDesc] = useState('');

  // State for Create KPI form
  const [kpiObjId, setKpiObjId] = useState('');
  const [kpiCode, setKpiCode] = useState('2.1.5');
  const [kpiName, setKpiName] = useState('');
  const [kpiNameAr, setKpiNameAr] = useState('');
  const [kpiFormula, setKpiFormula] = useState('');
  const [kpiBaseline, setKpiBaseline] = useState('-');
  const [kpiTarget2026, setKpiTarget2026] = useState('75%');
  const [kpiTarget2027, setKpiTarget2027] = useState('80%');
  const [kpiTarget, setKpiTarget] = useState(75);
  const [kpiActual, setKpiActual] = useState(0);
  const [kpiUnit, setKpiUnit] = useState('%');
  const [kpiFrequency, setKpiFrequency] = useState<'Annual' | 'Bi-Annual' | 'Quarterly' | 'Monthly'>('Annual');
  const [kpiStatus, setKpiStatus] = useState<'on-track' | 'warning' | 'critical' | 'achieved'>('on-track');
  const [kpiInitTitle, setKpiInitTitle] = useState('Initiative 6: Raise awareness of the Al-Ahsa Strategy and increase digital engagement');
  const [kpiMilestone, setKpiMilestone] = useState('');
  const [kpiProject, setKpiProject] = useState('');

  // State for Create Initiative form
  const [initObjId, setInitObjId] = useState('');
  const [initCode, setInitCode] = useState('INIT-09');
  const [initTitle, setInitTitle] = useState('');
  const [initDesc, setInitDesc] = useState('');
  const [initBudget, setInitBudget] = useState(8500000);
  const [initSpent, setInitSpent] = useState(1000000);
  const [initOwner, setInitOwner] = useState(currentUser.name);
  const [initDept, setInitDept] = useState(currentUser.department);
  const [initMilestoneTitle, setInitMilestoneTitle] = useState('Deliverable Blueprint & Scope Approval');
  const [initMilestoneDate, setInitMilestoneDate] = useState('2026-12-31');
  const [initProject, setInitProject] = useState('');

  if (!activeModal) return null;

  const { type, item } = activeModal;

  const handleCreateRiskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRiskTitle.trim()) return;
    addRisk({
      title: newRiskTitle,
      category: newRiskCategory,
      likelihood: Number(newRiskLikelihood),
      impact: Number(newRiskImpact),
      residualLikelihood: Math.max(1, newRiskLikelihood - 1),
      residualImpact: Math.max(1, newRiskImpact - 1),
      owner: newRiskOwner,
      department: newRiskDept,
      treatment: 'Mitigate',
      status: 'Open',
      description: newRiskDesc,
      controlsCount: 1,
      actionsCount: 1,
    });
  };

  const handleCreateActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTitle.trim()) return;
    addAction({
      title: newActionTitle,
      source: newActionSource,
      sourceRefId: 'REF-2026',
      sourceRefTitle: 'Strategic & Governance Initiative',
      owner: newActionOwner,
      department: currentUser.department,
      priority: newActionPriority,
      dueDate: newActionDueDate,
      progress: 0,
      status: 'Not Started',
      description: newActionDesc,
    });
  };

  const handleCreateKpiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiName.trim()) return;

    const targetObjectiveId = kpiObjId || item?.objectiveId || item?.id || objectives[0]?.id || 'so-2-1';
    const targetObj = objectives.find((o) => o.id === targetObjectiveId) || objectives[0];

    const achievementPct = kpiTarget > 0 ? Math.min(100, Math.round((kpiActual / kpiTarget) * 100)) : 0;

    addKPI({
      code: kpiCode.trim() || '2.1.5',
      name: kpiName.trim(),
      nameAr: kpiNameAr.trim() || undefined,
      objectiveId: targetObjectiveId,
      objectiveTitle: targetObj ? targetObj.title : 'Strategic Objective',
      owner: targetObj ? targetObj.owner : currentUser.name,
      target: Number(kpiTarget),
      actual: Number(kpiActual),
      achievementPct,
      unit: kpiUnit || '%',
      frequency: kpiFrequency,
      status: kpiStatus,
      formula: kpiFormula.trim(),
      baseline: kpiBaseline,
      target2026: kpiTarget2026,
      target2027: kpiTarget2027,
      strategicInitiative: kpiInitTitle.trim(),
      keyMilestone: kpiMilestone.trim(),
      keyProject: kpiProject.trim(),
      pillarCode: item?.pillarCode || (targetObj?.themeName?.includes('02') ? '02' : '01'),
      pillarTitle: item?.pillarTitle || targetObj?.themeName || '02 People and Society',
      sectorId: targetObj?.sectorId,
      sectorName: targetObj?.sectorName,
    });

    closeModal();
  };

  const handleCreateInitiativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initTitle.trim()) return;

    const targetObjectiveId = initObjId || item?.objectiveId || item?.id || objectives[0]?.id || 'so-2-1';
    const targetObj = objectives.find((o) => o.id === targetObjectiveId) || objectives[0];

    addInitiative({
      code: initCode.trim() || 'INIT-09',
      title: initTitle.trim(),
      objectiveId: targetObjectiveId,
      objectiveTitle: targetObj ? targetObj.title : 'Strategic Objective',
      owner: initOwner.trim() || currentUser.name,
      department: initDept || currentUser.department,
      description: initDesc.trim(),
      budgetSAR: Number(initBudget),
      spentSAR: Number(initSpent),
      progress: 10,
      startDate: '2026-01-01',
      endDate: '2027-12-31',
      status: 'In Progress',
      milestones: initMilestoneTitle.trim()
        ? [
            {
              id: `m-${Date.now()}-1`,
              title: initMilestoneTitle.trim(),
              dueDate: initMilestoneDate,
              status: 'In Progress',
            },
          ]
        : [],
      keyProjects: initProject.trim() ? [initProject.trim()] : ['Strategic Regional Project'],
      risksCount: 0,
      actionsCount: 0,
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div
        className={`w-full ${
          type === 'objective' ? 'max-w-3xl lg:max-w-4xl' : 'max-w-2xl'
        } bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-200`}
      >
        {/* Modal Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-3">
            {type === 'risk' && <ShieldAlert className="w-5 h-5 text-rose-600" />}
            {type === 'objective' && <Target className="w-5 h-5 text-blue-600" />}
            {type === 'action' && <ListTodo className="w-5 h-5 text-amber-600" />}
            {type === 'bcm' && <Activity className="w-5 h-5 text-blue-600" />}
            {type === 'create_risk' && <Plus className="w-5 h-5 text-rose-600" />}
            {type === 'create_action' && <Plus className="w-5 h-5 text-blue-600" />}
            {type === 'create_kpi' && <Target className="w-5 h-5 text-emerald-600" />}
            {type === 'create_initiative' && <Plus className="w-5 h-5 text-amber-600" />}
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {type === 'risk' && `Risk Record: ${item?.code}`}
                {type === 'objective' && `Objective: ${item?.code}`}
                {type === 'action' && `Action Plan: ${item?.code}`}
                {type === 'bcm' && `BCM Process: ${item?.code}`}
                {type === 'create_risk' && 'Register New Enterprise Risk (ISO 31000)'}
                {type === 'create_action' && 'Formulate Strategic Action Plan'}
                {type === 'create_kpi' && 'Cascade Strategic Performance Indicator (KPI)'}
                {type === 'create_initiative' && 'Formulate Strategic Initiative & Delivery Program'}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                AHDA Strategy Execution Architecture
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* TYPE: RISK DETAILS */}
          {type === 'risk' && item && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    Category: {item.category}
                  </span>
                  <StatusBadge status={item.status} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h2>
                <p className="text-slate-600 mt-2 leading-relaxed">{item.description}</p>
              </div>

              {/* 5x5 Matrix Score Metrics */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Inherent Risk Rating</div>
                  <div className="text-2xl font-bold font-mono text-rose-600 mt-1">
                    {item.inherentScore} <span className="text-xs font-normal text-slate-500">(L{item.likelihood} × I{item.impact})</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Pre-Control Assessment</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Residual Risk Rating</div>
                  <div className="text-2xl font-bold font-mono text-blue-700 mt-1">
                    {item.residualScore} <span className="text-xs font-normal text-slate-500">(L{item.residualLikelihood} × I{item.residualImpact})</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Post-Control Assessment</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                  <span className="text-slate-400 block text-[10px]">Risk Owner</span>
                  <span className="font-semibold text-slate-800">{item.owner}</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                  <span className="text-slate-400 block text-[10px]">Department</span>
                  <span className="font-semibold text-slate-800">{item.department}</span>
                </div>
              </div>

              {/* Status Update Actions */}
              {!permissions.isReadOnly && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <span className="font-semibold text-slate-800 block">Governance Workflow Action</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateRiskStatus(item.id, 'Closed', 'Mitigate')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Mark Mitigated (Closed)
                    </button>
                    <button
                      onClick={() => updateRiskStatus(item.id, 'Mitigating', 'Transfer')}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Assign Treatment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TYPE: OBJECTIVE DETAILS */}
          {type === 'objective' && item && (
            <StrategyDetailView item={item} onClose={closeModal} />
          )}

          {/* TYPE: CREATE RISK FORM */}
          {type === 'create_risk' && (
            <form onSubmit={handleCreateRiskSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Risk Title</label>
                <input
                  type="text"
                  required
                  value={newRiskTitle}
                  onChange={(e) => setNewRiskTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  placeholder="e.g. Delay in Environmental EIA Permitting"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newRiskCategory}
                    onChange={(e: any) => setNewRiskCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Operational">Operational</option>
                    <option value="Strategic">Strategic</option>
                    <option value="Financial">Financial</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Cyber">Cyber</option>
                    <option value="Reputational">Reputational</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={newRiskDept}
                    onChange={(e) => setNewRiskDept(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Likelihood (1–5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newRiskLikelihood}
                    onChange={(e) => setNewRiskLikelihood(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Impact (1–5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newRiskImpact}
                    onChange={(e) => setNewRiskImpact(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Risk Context</label>
                <textarea
                  rows={3}
                  value={newRiskDesc}
                  onChange={(e) => setNewRiskDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 cursor-pointer"
                >
                  Register Risk
                </button>
              </div>
            </form>
          )}

          {/* TYPE: CREATE ACTION FORM */}
          {type === 'create_action' && (
            <form onSubmit={handleCreateActionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Action Plan Title</label>
                <input
                  type="text"
                  required
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Source Domain</label>
                  <select
                    value={newActionSource}
                    onChange={(e: any) => setNewActionSource(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Strategy">Strategy</option>
                    <option value="ERM">ERM</option>
                    <option value="Cyber">Cyber</option>
                    <option value="Compliance">Compliance</option>
                    <option value="BCM">BCM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newActionPriority}
                    onChange={(e: any) => setNewActionPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Assignee</label>
                  <input
                    type="text"
                    value={newActionOwner}
                    onChange={(e) => setNewActionOwner(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newActionDueDate}
                    onChange={(e) => setNewActionDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Action Description</label>
                <textarea
                  rows={3}
                  value={newActionDesc}
                  onChange={(e) => setNewActionDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  Create Action Plan
                </button>
              </div>
            </form>
          )}

          {/* TYPE: CREATE KPI FORM (AHDA Cascading Model) */}
          {type === 'create_kpi' && (
            <form onSubmit={handleCreateKpiSubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-emerald-900 text-xs">
                <span className="font-bold block">Cascaded Strategic Performance Indicator Formulation</span>
                <span className="text-[11px] text-emerald-700">
                  Directly links mathematical calculation formula, baseline, and 2026/2027 targets under the objective.
                </span>
              </div>

              {/* Target Objective Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Strategic Objective
                </label>
                <select
                  value={kpiObjId || item?.objectiveId || item?.id || objectives[0]?.id}
                  onChange={(e) => setKpiObjId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium cursor-pointer"
                >
                  {objectives.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.code} — {o.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">KPI Code</label>
                  <input
                    type="text"
                    required
                    value={kpiCode}
                    onChange={(e) => setKpiCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    placeholder="e.g. 2.1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Indicator Name (English) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={kpiName}
                    onChange={(e) => setKpiName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium"
                    placeholder="e.g. Event Visitor Indicator"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Indicator Name in Arabic (الاسم بالعربية)
                </label>
                <input
                  type="text"
                  value={kpiNameAr}
                  onChange={(e) => setKpiNameAr(e.target.value)}
                  dir="rtl"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-right"
                  placeholder="مثال: مؤشر زوار الفعاليات"
                />
              </div>

              {/* Mathematical Formula */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-blue-600" />
                  <span>Calculation Formula</span>
                </label>
                <input
                  type="text"
                  value={kpiFormula}
                  onChange={(e) => setKpiFormula(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  placeholder="e.g. (Total Actual Event Visitors - Total Targeted Visitors) * 100%"
                />
              </div>

              {/* Multi-Year Cascading Targets Grid */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-800 block">Cascading Targets & Baseline</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Baseline</label>
                    <input
                      type="text"
                      value={kpiBaseline}
                      onChange={(e) => setKpiBaseline(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-blue-700 mb-1">Target 2026</label>
                    <input
                      type="text"
                      value={kpiTarget2026}
                      onChange={(e) => setKpiTarget2026(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-mono text-center font-bold text-blue-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-emerald-700 mb-1">Target 2027</label>
                    <input
                      type="text"
                      value={kpiTarget2027}
                      onChange={(e) => setKpiTarget2027(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-mono text-center font-bold text-emerald-800"
                    />
                  </div>
                </div>
              </div>

              {/* Measurement Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target</label>
                  <input
                    type="number"
                    step="any"
                    value={kpiTarget}
                    onChange={(e) => setKpiTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Actual</label>
                  <input
                    type="number"
                    step="any"
                    value={kpiActual}
                    onChange={(e) => setKpiActual(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={kpiUnit}
                    onChange={(e) => setKpiUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cadence</label>
                  <select
                    value={kpiFrequency}
                    onChange={(e: any) => setKpiFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Annual">Annual</option>
                    <option value="Bi-Annual">Bi-Annual</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>

              {/* Strategic Initiative Linkage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Key Project</span>
                  </label>
                  <input
                    type="text"
                    value={kpiProject}
                    onChange={(e) => setKpiProject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    placeholder="e.g. Al-Ahsa Strategy Awareness Project"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Milestone className="w-3.5 h-3.5 text-amber-600" />
                    <span>Key Milestone</span>
                  </label>
                  <input
                    type="text"
                    value={kpiMilestone}
                    onChange={(e) => setKpiMilestone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    placeholder="e.g. Develop community awareness framework"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enabling Strategic Initiative
                </label>
                <select
                  value={kpiInitTitle}
                  onChange={(e) => setKpiInitTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs cursor-pointer"
                >
                  {initiatives.map((i) => (
                    <option key={i.id} value={i.title}>
                      {i.code} — {i.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Cascade & Save KPI
                </button>
              </div>
            </form>
          )}

          {/* TYPE: CREATE INITIATIVE FORM */}
          {type === 'create_initiative' && (
            <form onSubmit={handleCreateInitiativeSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-900 text-xs">
                <span className="font-bold block">Strategic Initiative Formulation</span>
                <span className="text-[11px] text-amber-700">
                  Formulate a delivery initiative with budget allocation and milestone gates.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Strategic Objective</label>
                <select
                  value={initObjId || item?.objectiveId || item?.id || objectives[0]?.id}
                  onChange={(e) => setInitObjId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium cursor-pointer"
                >
                  {objectives.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.code} — {o.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Initiative Code</label>
                  <input
                    type="text"
                    required
                    value={initCode}
                    onChange={(e) => setInitCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    placeholder="e.g. INIT-09"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initiative Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={initTitle}
                    onChange={(e) => setInitTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium"
                    placeholder="e.g. Initiative 9: Cultural Heritage & Oasis Activation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={initDesc}
                  onChange={(e) => setInitDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Allocation (SAR)</label>
                  <input
                    type="number"
                    value={initBudget}
                    onChange={(e) => setInitBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Spent Capital (SAR)</label>
                  <input
                    type="number"
                    value={initSpent}
                    onChange={(e) => setInitSpent(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Key Deliverable Milestone</label>
                  <input
                    type="text"
                    value={initMilestoneTitle}
                    onChange={(e) => setInitMilestoneTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Milestone Due Date</label>
                  <input
                    type="date"
                    value={initMilestoneDate}
                    onChange={(e) => setInitMilestoneDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Flagship Project Name</label>
                <input
                  type="text"
                  value={initProject}
                  onChange={(e) => setInitProject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  placeholder="e.g. Al-Ahsa Cultural Activation Project"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Initiative
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
