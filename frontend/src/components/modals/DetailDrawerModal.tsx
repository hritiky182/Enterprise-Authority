import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, Target, ListTodo, Activity, CheckCircle, Clock, User, Calendar, AlertTriangle, Plus, FileText } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const DetailDrawerModal: React.FC = () => {
  const { activeModal, closeModal, updateRiskStatus, addRisk, addAction, currentUser, permissions } = useApp();

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Modal Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-3">
            {type === 'risk' && <ShieldAlert className="w-5 h-5 text-rose-600" />}
            {type === 'objective' && <Target className="w-5 h-5 text-blue-600" />}
            {type === 'action' && <ListTodo className="w-5 h-5 text-amber-600" />}
            {type === 'bcm' && <Activity className="w-5 h-5 text-blue-600" />}
            {type === 'create_risk' && <Plus className="w-5 h-5 text-rose-600" />}
            {type === 'create_action' && <Plus className="w-5 h-5 text-blue-600" />}
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {type === 'risk' && `Risk Record: ${item?.code}`}
                {type === 'objective' && `Objective: ${item?.code}`}
                {type === 'action' && `Action Plan: ${item?.code}`}
                {type === 'bcm' && `BCM Process: ${item?.code}`}
                {type === 'create_risk' && 'Register New Enterprise Risk (ISO 31000)'}
                {type === 'create_action' && 'Formulate Strategic Action Plan'}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Institutional GRC Platform Detail Drawer
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

              {/* Risk Audit History */}
              {item.history && (
                <div>
                  <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-2">
                    Assessment Audit Log
                  </h4>
                  <div className="space-y-2">
                    {item.history.map((h: any, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-slate-800">{h.action}</div>
                          <div className="text-[10px] text-slate-400">{h.user}</div>
                        </div>
                        <span className="font-mono text-[10px] text-slate-500">{h.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {!permissions.isReadOnly && (
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => updateRiskStatus(item.id, 'Mitigating')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Set Status: Mitigating
                  </button>
                  <button
                    onClick={() => updateRiskStatus(item.id, 'Closed')}
                    className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    Close Risk
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TYPE: OBJECTIVE DETAILS */}
          {type === 'objective' && item && (
            <div className="space-y-6">
              <div>
                <StatusBadge status={item.status} />
                <h2 className="text-lg font-bold text-slate-900 leading-snug mt-2">{item.title}</h2>
                <div className="text-xs text-blue-700 font-medium mt-1">{item.themeName}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Target Year</span>
                  <div className="text-lg font-bold text-slate-900">{item.targetYear}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Progress Index</span>
                  <div className="text-xl font-bold font-mono text-blue-700 mt-1">{item.progress}%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Owner</span>
                  <span className="font-semibold text-slate-800">{item.owner}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Department</span>
                  <span className="font-semibold text-slate-800">{item.department}</span>
                </div>
              </div>
            </div>
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
                  placeholder="e.g. Critical IT Infrastructure Outage"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Likelihood (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={newRiskLikelihood}
                    onChange={(e) => setNewRiskLikelihood(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Impact (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={newRiskImpact}
                    onChange={(e) => setNewRiskImpact(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Risk Owner</label>
                <input
                  type="text"
                  value={newRiskOwner}
                  onChange={(e) => setNewRiskOwner(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={newRiskDesc}
                  onChange={(e) => setNewRiskDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  placeholder="Describe root causes and implications..."
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Action Title</label>
                <input
                  type="text"
                  required
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  placeholder="e.g. Implement Multi-Factor Auth for Cloud Infrastructure"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Source Module</label>
                  <select
                    value={newActionSource}
                    onChange={(e: any) => setNewActionSource(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="ERM">Enterprise Risk (ERM)</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Cyber">Cybersecurity</option>
                    <option value="Governance">Governance</option>
                    <option value="Compliance">Compliance</option>
                    <option value="BCM">Business Continuity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority Level</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Owner</label>
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
                  placeholder="Steps required to execute..."
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
        </div>
      </div>
    </div>
  );
};
