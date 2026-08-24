export type Role =
  | 'Administrator'
  | 'Strategy Manager'
  | 'Risk Manager'
  | 'Compliance Manager'
  | 'BCM Manager'
  | 'Executive'
  | 'Auditor'
  | 'Viewer';

export interface User {
  id: string;
  name: string;
  title: string;
  email: string;
  role: Role;
  department: string;
  avatar: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  head: string;
  employeeCount: number;
}

export interface StrategicTheme {
  id: string;
  code: string;
  title: string;
  titleAr?: string;
  description: string;
  color: string;
  weight: number;
}

export interface StrategicGoal {
  id: string;
  code: string;
  themeId: string;
  title: string;
  description: string;
}

export interface StrategicObjective {
  id: string;
  code: string;
  goalId: string;
  themeId: string;
  themeName: string;
  title: string;
  owner: string;
  department: string;
  kpiCount: number;
  status: 'on-track' | 'at-risk' | 'behind' | 'achieved';
  targetYear: number;
  progress: number;
}

export interface KPI {
  id: string;
  code: string;
  objectiveId: string;
  objectiveTitle: string;
  name: string;
  unit: string;
  owner: string;
  target: number;
  actual: number;
  achievementPct: number;
  frequency: 'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual';
  status: 'on-track' | 'warning' | 'critical' | 'achieved';
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

export interface StrategicInitiative {
  id: string;
  code: string;
  objectiveId: string;
  objectiveTitle: string;
  title: string;
  owner: string;
  department: string;
  budgetSAR: number;
  spentSAR: number;
  progress: number;
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Planning' | 'At Risk' | 'Completed';
  milestones: Milestone[];
  risksCount: number;
  actionsCount: number;
  description: string;
}

export interface RiskItem {
  id: string;
  code: string;
  title: string;
  category: 'Operational' | 'Strategic' | 'Financial' | 'Compliance' | 'Cyber' | 'Reputational';
  owner: string;
  department: string;
  likelihood: number; // 1-5
  impact: number; // 1-5
  inherentScore: number; // likelihood * impact
  residualLikelihood: number;
  residualImpact: number;
  residualScore: number;
  treatment: 'Mitigate' | 'Transfer' | 'Avoid' | 'Accept';
  status: 'Open' | 'Mitigating' | 'Accepted' | 'Closed';
  description: string;
  controlsCount: number;
  actionsCount: number;
  lastAssessedDate: string;
  treatmentDetails?: string;
  history?: { date: string; action: string; user: string }[];
}

export interface CyberAsset {
  id: string;
  code: string;
  name: string;
  category: 'Database' | 'Infrastructure' | 'Web Application' | 'Network' | 'ICS/IoT';
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  owner: string;
  ipAddress: string;
  status: 'Active' | 'Maintenance' | 'Decommissioned';
}

export interface Vulnerability {
  id: string;
  code: string;
  cveId: string;
  assetName: string;
  assetId: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cvssScore: number;
  status: 'Unpatched' | 'Remediating' | 'Patched';
  remediationDueDate: string;
  description: string;
}

export interface SecurityControl {
  id: string;
  code: string;
  framework: 'NCA ECC' | 'ISO 27001' | 'NIST CSF';
  name: string;
  effectivenessPct: number;
  status: 'Compliant' | 'Partially Compliant' | 'Non-Compliant';
  owner: string;
}

export interface GovernancePolicy {
  id: string;
  code: string;
  title: string;
  category: 'Strategic' | 'IT & Security' | 'Financial' | 'HR' | 'Operational';
  owner: string;
  department: string;
  version: string;
  effectiveDate: string;
  reviewDate: string;
  status: 'Approved' | 'Under Review' | 'Draft' | 'Deprecated';
}

export interface GovernanceCommittee {
  id: string;
  code: string;
  name: string;
  chair: string;
  secretary: string;
  membersCount: number;
  frequency: string;
  lastMeetingDate: string;
  nextMeetingDate: string;
}

export interface ComplianceFramework {
  id: string;
  code: string;
  name: string;
  version: string;
  category: 'Information Security' | 'Business Continuity' | 'Enterprise Risk' | 'Cybersecurity' | 'IT Governance';
  totalRequirements: number;
  compliantCount: number;
  partialCount: number;
  nonCompliantCount: number;
  scorePct: number;
}

export interface ComplianceRequirement {
  id: string;
  code: string;
  frameworkId: string;
  frameworkName: string;
  section: string;
  title: string;
  description: string;
  controlId: string;
  status: 'Compliant' | 'Partially Compliant' | 'Non-Compliant';
  owner: string;
}

export interface ComplianceFinding {
  id: string;
  code: string;
  requirementId: string;
  frameworkName: string;
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  owner: string;
  auditDate: string;
  status: 'Open' | 'In Progress' | 'Closed';
  recommendation: string;
}

export interface BCMProcess {
  id: string;
  code: string;
  processName: string;
  department: string;
  criticality: 'Tier 1 - Mission Critical' | 'Tier 2 - Essential' | 'Tier 3 - Non-Essential';
  mtdHours: number; // Maximum Tolerable Period of Disruption (hours)
  rtoHours: number; // Recovery Time Objective (hours)
  rpoHours: number; // Recovery Point Objective (hours)
  dependencies: string[];
  recoveryPriority: number;
  readinessPct: number;
  status: 'Ready' | 'Needs Review' | 'Critical Gap';
  owner: string;
}

export interface BCMPlan {
  id: string;
  code: string;
  title: string;
  processId: string;
  processName: string;
  department: string;
  owner: string;
  version: string;
  lastTestedDate: string;
  testResult: 'Passed' | 'Partial Pass' | 'Failed' | 'Untested';
  status: 'Active' | 'Under Revision';
}

export interface BCMExercise {
  id: string;
  code: string;
  title: string;
  type: 'Tabletop' | 'Full Simulation' | 'Drill';
  date: string;
  participantsCount: number;
  result: 'Successful' | 'Action Plan Required' | 'Incomplete';
  gapsCount: number;
}

export type ActionSource = 'Strategy' | 'ERM' | 'Cyber' | 'Governance' | 'Compliance' | 'BCM';

export interface ActionItem {
  id: string;
  code: string;
  title: string;
  source: ActionSource;
  sourceRefId: string;
  sourceRefTitle: string;
  owner: string;
  department: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  dueDate: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Under Review' | 'Completed';
  description: string;
}

export interface TaskItem {
  id: string;
  code: string;
  title: string;
  actionId?: string;
  assignee: string;
  dueDate: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  boardColumn: 'todo' | 'in_progress' | 'blocked' | 'completed';
  tags: string[];
  department: string;
}

export interface DocumentItem {
  id: string;
  code: string;
  title: string;
  category: 'Policy' | 'Procedure' | 'Risk Document' | 'Strategy Document' | 'BCM Plan' | 'Compliance Evidence' | 'Governance Document';
  fileType: 'pdf' | 'docx' | 'xlsx';
  fileSize: string;
  uploadedBy: string;
  uploadDate: string;
  version: string;
  tags: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'risk' | 'action' | 'compliance' | 'bcm';
  read: boolean;
  link?: string;
}
