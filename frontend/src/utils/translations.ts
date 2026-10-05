export type Language = 'en' | 'ar';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Navigation Groups
  'CORE COMMAND': {
    en: 'CORE COMMAND',
    ar: 'لوحة القيادة المركزية',
  },
  'RISK & COMPLIANCE (GRC)': {
    en: 'RISK & COMPLIANCE (GRC)',
    ar: 'المخاطر والالتزام (GRC)',
  },
  'EXECUTION & KNOWLEDGE': {
    en: 'EXECUTION & KNOWLEDGE',
    ar: 'التنفيذ والمعرفة',
  },
  'OVERVIEW': {
    en: 'OVERVIEW',
    ar: 'نظرة عامة',
  },
  'STRATEGY & PERFORMANCE': {
    en: 'STRATEGY & PERFORMANCE',
    ar: 'الاستراتيجية والأداء',
  },
  'ENTERPRISE GOVERNANCE': {
    en: 'ENTERPRISE GOVERNANCE',
    ar: 'الحوكمة المؤسسية والمخاطر',
  },
  'EXECUTION': {
    en: 'EXECUTION',
    ar: 'التنفيذ والمتابعة',
  },
  'SYSTEM': {
    en: 'SYSTEM',
    ar: 'إدارة النظام',
  },

  // Brand & Shell
  'enterprise_authority': {
    en: 'Al-Ahsa Development Authority',
    ar: 'هيئة تطوير الأحساء',
  },
  'grc_strategy_suite': {
    en: 'Strategy & GRC Suite',
    ar: 'منظومة الاستراتيجية والحوكمة',
  },
  'active_role_persona': {
    en: 'Active Role Persona',
    ar: 'الدور النشط بالمنظومة',
  },
  'ENTERPRISE GRC v3.4': {
    en: 'ENTERPRISE GRC v3.4',
    ar: 'منظومة الحوكمة المؤسسية v3.4',
  },
  'ENTERPRISE': {
    en: 'ENTERPRISE',
    ar: 'الهيئة',
  },

  // Navigation Items
  'Dashboard': {
    en: 'Dashboard',
    ar: 'لوحة المؤشرات العامة',
  },
  'Strategy': {
    en: 'Strategy',
    ar: 'الاستراتيجية المؤسسية',
  },
  'Performance': {
    en: 'Performance',
    ar: 'مؤشرات قياس الأداء (KPIs)',
  },
  'Enterprise Risk': {
    en: 'Enterprise Risk',
    ar: 'سجل المخاطر المؤسسية',
  },
  'Cybersecurity': {
    en: 'Cybersecurity',
    ar: 'الأمن السيبراني',
  },
  'Cybersecurity & IT Risk': {
    en: 'Cybersecurity & IT Risk',
    ar: 'الأمن السيبراني ومخاطر التقنية',
  },
  'Governance': {
    en: 'Governance',
    ar: 'الحوكمة والسياسات',
  },
  'Compliance': {
    en: 'Compliance',
    ar: 'الالتزام والرقابة',
  },
  'BCM': {
    en: 'BCM',
    ar: 'استمرارية الأعمال (BCM)',
  },
  'Business Continuity': {
    en: 'Business Continuity',
    ar: 'استمرارية الأعمال والمرونة',
  },
  'Action Plans': {
    en: 'Action Plans',
    ar: 'خطط العمل المركزية',
  },
  'Tasks': {
    en: 'Tasks',
    ar: 'المهام التشغيلية',
  },
  'Documents': {
    en: 'Documents',
    ar: 'مستودع الوثائق والأدلة',
  },
  'Reports': {
    en: 'Reports',
    ar: 'التقارير وسجلات التصدير',
  },
  'Administration': {
    en: 'Administration',
    ar: 'إعدادات النظام والأمن',
  },

  // Brand and Platform
  'search_enterprise': {
    en: 'Search enterprise...',
    ar: 'البحث في المنظومة المؤسسية...',
  },
  'read_only': {
    en: 'READ ONLY',
    ar: 'للقراءة فقط',
  },

  // Header & Roles
  'switch_role': {
    en: 'Switch Active Role Persona',
    ar: 'تغيير الدور الوظيفي النشط',
  },
  'notifications': {
    en: 'Notifications',
    ar: 'الإشعارات والتنبيهات',
  },
  'mark_all_read': {
    en: 'Mark all as read',
    ar: 'تحديد الكل كمقروء',
  },
  'no_notifications': {
    en: 'No notifications',
    ar: 'لا توجد إشعارات جديدة',
  },
  'sign_out': {
    en: 'Sign Out',
    ar: 'تسجيل الخروج',
  },
  'Authority Board & CEO': {
    en: 'Authority Board & CEO',
    ar: 'مجلس الهيئة والرئيس التنفيذي',
  },
  'Sector Director General': {
    en: 'Sector Director General',
    ar: 'مدير عام القطاع',
  },
  'Department Manager': {
    en: 'Department Manager',
    ar: 'مدير الإدارة',
  },
  'GRC & Enterprise Risk': {
    en: 'GRC & Enterprise Risk',
    ar: 'الحوكمة وإدارة المخاطر المؤسسية',
  },
  'Cybersecurity Officer': {
    en: 'Cybersecurity Officer',
    ar: 'مسؤول الأمن السيبراني',
  },
  'Internal Audit': {
    en: 'Internal Audit',
    ar: 'المراجعة الداخلية',
  },
  'Administrator': {
    en: 'Administrator',
    ar: 'مدير النظام',
  },
  'Viewer': {
    en: 'Viewer',
    ar: 'مستعرض',
  },

  // Breadcrumbs & Common Routes
  'Executive Command Center': {
    en: 'Executive Command Center',
    ar: 'مركز القيادة التنفيذي',
  },
  'Executive Dashboard': {
    en: 'Executive Dashboard',
    ar: 'لوحة التحكم التنفيذية',
  },
  'Enterprise Platform': {
    en: 'Enterprise Platform',
    ar: 'المنصة المؤسسية',
  },
  'Strategic Management & Initiatives': {
    en: 'Strategic Management & Initiatives',
    ar: 'الإدارة الاستراتيجية والمبادرات',
  },
  'Create New Strategy': {
    en: 'Create New Strategy',
    ar: 'إنشاء استراتيجية جديدة',
  },
  'Institutional & Dept Performance': {
    en: 'Institutional & Dept Performance',
    ar: 'الأداء المؤسسي والإداري',
  },
  'Enterprise Risk Management (ERM)': {
    en: 'Enterprise Risk Management (ERM)',
    ar: 'إدارة المخاطر المؤسسية',
  },
  'Cybersecurity & IT Governance': {
    en: 'Cybersecurity & IT Governance',
    ar: 'الأمن السيبراني وحوكمة التقنية',
  },
  'Corporate Governance & Policies': {
    en: 'Corporate Governance & Policies',
    ar: 'الحوكمة المؤسسية والسياسات',
  },
  'Regulatory & Framework Compliance': {
    en: 'Regulatory & Framework Compliance',
    ar: 'الالتزام الرقابي والتنظيمي',
  },
  'Business Continuity & Disaster Resilience': {
    en: 'Business Continuity & Disaster Resilience',
    ar: 'استمرارية الأعمال والمرونة',
  },
  'Central Action Plans': {
    en: 'Central Action Plans',
    ar: 'خطط العمل المركزية',
  },
  'Operational Task Board': {
    en: 'Operational Task Board',
    ar: 'لوحة المهام التشغيلية',
  },
  'Document & Evidence Repository': {
    en: 'Document & Evidence Repository',
    ar: 'مستودع الوثائق والأدلة',
  },
  'Executive Reporting & Analytics': {
    en: 'Executive Reporting & Analytics',
    ar: 'التقارير التنفيذية والتحليلات',
  },
  'System Administration & Security': {
    en: 'System Administration & Security',
    ar: 'إدارة النظام والأمن',
  },

  // Strategy & Matrix Terms
  'Strategic Pillars': {
    en: 'Strategic Pillars',
    ar: 'الركائز الاستراتيجية',
  },
  'Alignment Goals': {
    en: 'Alignment Goals',
    ar: 'الأهداف الاستراتيجية',
  },
  'Target Objectives': {
    en: 'Target Objectives',
    ar: 'الأهداف التفصيلية (OKRs)',
  },
  'Tracked KPIs': {
    en: 'Tracked KPIs',
    ar: 'مؤشرات الأداء المعتمدة',
  },
  'Allocated Budget': {
    en: 'Allocated Budget',
    ar: 'الميزانية المعتمدة',
  },
  'Create Strategy': {
    en: 'Create Strategy',
    ar: 'إنشاء استراتيجية',
  },
  'Client Strategy Matrix': {
    en: 'Client Strategy Matrix',
    ar: 'مصفوفة استراتيجية الهيئة',
  },
  'Strategy Tree': {
    en: 'Strategy Tree',
    ar: 'شجرة الاستراتيجية',
  },
  'Objectives Directory': {
    en: 'Objectives Directory',
    ar: 'دليل الأهداف',
  },
  'Org Structure': {
    en: 'Org Structure',
    ar: 'الهيكل التنظيمي',
  },
  'Export Spreadsheet': {
    en: 'Export Spreadsheet',
    ar: 'تصدير جدول البيانات',
  },
  'Filter:': {
    en: 'Filter:',
    ar: 'التصفية:',
  },
  'All Indicators': {
    en: 'All Indicators',
    ar: 'جميع المؤشرات',
  },
  'Search by indicator, formula, project...': {
    en: 'Search by indicator, formula, project...',
    ar: 'البحث بالمؤشر، المعادلة، المشروع...',
  },
  'Clear': {
    en: 'Clear',
    ar: 'مسح',
  },
  'Strategic Pillar': {
    en: 'Strategic Pillar',
    ar: 'الركيزة الاستراتيجية',
  },
  'Strategic Objectives': {
    en: 'Strategic Objectives',
    ar: 'الأهداف الاستراتيجية',
  },
  'Strategic Performance Indicators': {
    en: 'Strategic Performance Indicators',
    ar: 'مؤشرات قياس الأداء الاستراتيجي',
  },
  'Indicator Calculation Formula': {
    en: 'Indicator Calculation Formula',
    ar: 'معادلة قياس المؤشر',
  },
  'Baseline': {
    en: 'Baseline',
    ar: 'خط الأساس',
  },
  'Target 2026': {
    en: 'Target 2026',
    ar: 'المستهدف 2026',
  },
  'Target 2027': {
    en: 'Target 2027',
    ar: 'المستهدف 2027',
  },
  'Strategic Initiatives': {
    en: 'Strategic Initiatives',
    ar: 'المبادرات الاستراتيجية',
  },
  'Key Milestones': {
    en: 'Key Milestones',
    ar: 'المعالم الرئيسية',
  },
  'Key Projects': {
    en: 'Key Projects',
    ar: 'المشاريع الرئيسية',
  },
  'Actual Measurement': {
    en: 'Actual Measurement',
    ar: 'القياس الفعلي',
  },
  'Achievement %': {
    en: 'Achievement %',
    ar: 'نسبة الإنجاز %',
  },
  'Owner': {
    en: 'Owner',
    ar: 'المسؤول',
  },
  'Department': {
    en: 'Department',
    ar: 'الإدارة المعنية',
  },
  'Target Year': {
    en: 'Target Year',
    ar: 'سنة الاستهداف',
  },
  'Progress': {
    en: 'Progress',
    ar: 'نسبة التقدم',
  },
  'Status': {
    en: 'Status',
    ar: 'الحالة',
  },

  // Common Statuses
  'on-track': {
    en: 'On Track',
    ar: 'ضمن المسار',
  },
  'at-risk': {
    en: 'At Risk',
    ar: 'معرض للمخاطر',
  },
  'behind': {
    en: 'Behind',
    ar: 'متأخر',
  },
  'achieved': {
    en: 'Achieved',
    ar: 'مُحقق',
  },
  'In Progress': {
    en: 'In Progress',
    ar: 'قيد التنفيذ',
  },
  'Planning': {
    en: 'Planning',
    ar: 'قيد التخطيط',
  },
  'Completed': {
    en: 'Completed',
    ar: 'مكتمل',
  },

  // Matrix and Infographic Specifics
  'Strategic Performance Indicators (KPI)': {
    en: 'Strategic Performance Indicators (KPI)',
    ar: 'مؤشرات قياس الأداء الاستراتيجي',
  },
  'Baseline Value': {
    en: 'Baseline Value',
    ar: 'خط الأساس',
  },
  'Annual Target for 2026': {
    en: 'Annual Target for 2026',
    ar: 'المستهدف لعام 2026',
  },
  'Annual Target for 2027': {
    en: 'Annual Target for 2027',
    ar: 'المستهدف لعام 2027',
  },
  'Strategy Architecture & Cascading Matrix': {
    en: 'Strategy Architecture & Cascading Matrix',
    ar: 'هندسة الاستراتيجية ومصفوفة المواءمة',
  },
  'AL AHSA DEVELOPMENT AUTHORITY • STRATEGY & GOVERNANCE': {
    en: 'AL AHSA DEVELOPMENT AUTHORITY • STRATEGY & GOVERNANCE',
    ar: 'هيئة تطوير الأحساء • الاستراتيجية والحوكمة',
  },
  'Vision: A Leader in Sustainable Development in Al-Ahsa — Cascaded Objectives, KPIs & Projects': {
    en: 'Vision: A Leader in Sustainable Development in Al-Ahsa — Cascaded Objectives, KPIs & Projects',
    ar: 'الرؤية: ريادة في التنمية المستدامة في الأحساء — الأهداف والمؤشرات والمشاريع المعتمدة',
  },
  'Vision: A Leader in Sustainable Development in Al-Ahsa': {
    en: 'Vision: A Leader in Sustainable Development in Al-Ahsa',
    ar: 'الرؤية: ريادة في التنمية المستدامة في الأحساء',
  },
  'Official Strategic Framework': {
    en: 'Official Strategic Framework',
    ar: 'الإطار الاستراتيجي المعتمد',
  },
  'Quick Add KPI': {
    en: 'Quick Add KPI',
    ar: 'إضافة مؤشر سريع',
  },
  'Strategy Formulation': {
    en: 'Strategy Formulation',
    ar: 'صياغة الاستراتيجية',
  },
  'Milestone': {
    en: 'Milestone',
    ar: 'المعلم الرئيسي',
  },
  'Project': {
    en: 'Project',
    ar: 'المشروع',
  },
  'Initiative': {
    en: 'Initiative',
    ar: 'المبادرة',
  },
  'Eng. Fahad Al-Subaie': {
    en: 'Eng. Fahad Al-Subaie',
    ar: 'م. فهد السبيعي',
  },
  'Marketing & Public Relations': {
    en: 'Marketing & Public Relations',
    ar: 'التسويق والعلاقات العامة',
  },
  'Eng. Tariq Al-Mansoor': {
    en: 'Eng. Tariq Al-Mansoor',
    ar: 'م. طارق المنصور',
  },
  'Eng. Sultan Al-Dossary': {
    en: 'Eng. Sultan Al-Dossary',
    ar: 'م. سلطان الدوسري',
  },
  'Dr. Reem Al-Qahtani': {
    en: 'Dr. Reem Al-Qahtani',
    ar: 'د. ريم القحطاني',
  },
  'Haya Al-Mulhim': {
    en: 'Haya Al-Mulhim',
    ar: 'هيا الملحم',
  },
  'Abdullah Al-Ghamdi': {
    en: 'Abdullah Al-Ghamdi',
    ar: 'عبدالله الغامدي',
  },
  'Fahad Al-Subaie': {
    en: 'Fahad Al-Subaie',
    ar: 'فهد السبيعي',
  },
  'Urban Observatory': {
    en: 'Urban Observatory',
    ar: 'المرصد الحضري',
  },
  'Code': {
    en: 'Code',
    ar: 'الرمز',
  },
  'KPI Code': {
    en: 'KPI Code',
    ar: 'رمز المؤشر',
  },
  'Indicator Name': {
    en: 'Indicator Name',
    ar: 'اسم المؤشر',
  },
  'Actual': {
    en: 'Actual',
    ar: 'الفعلي',
  },
  'Frequency': {
    en: 'Frequency',
    ar: 'دورية القياس',
  },
  'Annual': {
    en: 'Annual',
    ar: 'سنوي',
  },
  'Quarterly': {
    en: 'Quarterly',
    ar: 'ربع سنوي',
  },
  'Monthly': {
    en: 'Monthly',
    ar: 'شهري',
  },
  'Strategic Objectives Performance Matrix': {
    en: 'Strategic Objectives Performance Matrix',
    ar: 'مصفوفة أداء الأهداف الاستراتيجية',
  },
  'Owner, Theme alignment, target deadlines and overall achievement progress': {
    en: 'Owner, Theme alignment, target deadlines and overall achievement progress',
    ar: 'المسؤول، المواءمة مع الركائز، المواعيد المستهدفة ونسبة الإنجاز الكلية',
  },
  'Key Performance Indicator (KPI) Management': {
    en: 'Key Performance Indicator (KPI) Management',
    ar: 'إدارة مؤشرات قياس الأداء (KPIs)',
  },
  'Real-time actual measurements vs strategic target metrics': {
    en: 'Real-time actual measurements vs strategic target metrics',
    ar: 'القياسات الفعلية اللحظية مقارنة بالمستهدفات الاستراتيجية',
  },
  'Key Deliverables & Milestones': {
    en: 'Key Deliverables & Milestones',
    ar: 'المخرجات والمعالم الرئيسية',
  },
  'Budget Allocation': {
    en: 'Budget Allocation',
    ar: 'الميزانية المعتمدة',
  },
  'Overall Completion': {
    en: 'Overall Completion',
    ar: 'نسبة الإنجاز الإجمالية',
  },

  // Dashboard & Command Center
  'ENTERPRISE EXECUTIVE COMMAND CENTER': {
    en: 'ENTERPRISE EXECUTIVE COMMAND CENTER',
    ar: 'مركز القيادة التنفيذي للمنظومة',
  },
  'Strategic & Risk Governance Dashboard': {
    en: 'Strategic & Risk Governance Dashboard',
    ar: 'لوحة قيادة الاستراتيجية والحوكمة والمخاطر',
  },
  'Integrated real-time oversight of Institutional Performance (88.4%), NCA ECC Compliance (96.5%), 5×5 Enterprise Risk Exposure & BCM Operational Readiness.': {
    en: 'Integrated real-time oversight of Institutional Performance (88.4%), NCA ECC Compliance (96.5%), 5×5 Enterprise Risk Exposure & BCM Operational Readiness.',
    ar: 'إشراف متكامل ولحظي على الأداء المؤسسي (88.4%)، والالتزام بضوابط الأمن السيبراني NCA ECC (96.5%)، ومصفوفة المخاطر 5×5، وجاهزية استمرارية الأعمال.',
  },
  'Log Risk': {
    en: 'Log Risk',
    ar: 'تسجيل خطر',
  },
  'New Action Plan': {
    en: 'New Action Plan',
    ar: 'خطة عمل جديدة',
  },
  'Overall Institutional Performance': {
    en: 'Overall Institutional Performance',
    ar: 'الأداء المؤسسي العام',
  },
  'Strategic Objectives On-Track': {
    en: 'Strategic Objectives On-Track',
    ar: 'الأهداف الاستراتيجية المنجزة/ضمن المسار',
  },
  'Active Enterprise Risks': {
    en: 'Active Enterprise Risks',
    ar: 'المخاطر المؤسسية النشطة',
  },
  'NCA ECC Cybersecurity Compliance': {
    en: 'NCA ECC Cybersecurity Compliance',
    ar: 'الالتزام بضوابط الأمن السيبراني (NCA ECC)',
  },
  'Active Strategic Initiatives': {
    en: 'Active Strategic Initiatives',
    ar: 'المبادرات الاستراتيجية النشطة',
  },
  'Pending Action Items': {
    en: 'Pending Action Items',
    ar: 'خطط العمل المعلقة',
  },
  'BCM Operational Readiness': {
    en: 'BCM Operational Readiness',
    ar: 'جاهزية استمرارية الأعمال (BCM)',
  },
  'Regulatory Audit Findings': {
    en: 'Regulatory Audit Findings',
    ar: 'ملاحظات التدقيق الرقابي',
  },
  'EXCEEDING TARGET': {
    en: 'EXCEEDING TARGET',
    ar: 'يتجاوز المستهدف',
  },
  'ON TRACK': {
    en: 'ON TRACK',
    ar: 'ضمن المسار',
  },
  'CRITICAL EXPOSURE': {
    en: 'CRITICAL EXPOSURE',
    ar: 'تعرض حرج',
  },
  'HIGH COMPLIANCE': {
    en: 'HIGH COMPLIANCE',
    ar: 'التزام مرتفع',
  },
  'IN EXECUTION': {
    en: 'IN EXECUTION',
    ar: 'قيد التنفيذ',
  },
  'ACTIVE EXECUTION': {
    en: 'ACTIVE EXECUTION',
    ar: 'تنفيذ نشط',
  },
  'ISO 22301 READY': {
    en: 'ISO 22301 READY',
    ar: 'جاهزية ISO 22301',
  },
  'AUDIT CLEAN': {
    en: 'AUDIT CLEAN',
    ar: 'سجل تدقيق نظيف',
  },
  'MODERATE': {
    en: 'MODERATE',
    ar: 'متوسط',
  },
  'Audit verified': {
    en: 'Audit verified',
    ar: 'تم التحقق بالتدقيق',
  },
  'vs last Qtr': {
    en: 'vs last Qtr',
    ar: 'مقارنة بالربع السابق',
  },
  'Completion index': {
    en: 'Completion index',
    ar: 'مؤشر الإنجاز',
  },
  'post-mitigation': {
    en: 'post-mitigation',
    ar: 'بعد المعالجة',
  },
  'this month': {
    en: 'this month',
    ar: 'هذا الشهر',
  },
  'remediated': {
    en: 'remediated',
    ar: 'تمت المعالجة',
  },
  'Q3 Tabletop': {
    en: 'Q3 Tabletop',
    ar: 'محاكاة الربع الثالث',
  },
  'SAR 277.2M': {
    en: 'SAR 277.2M',
    ar: '277.2 مليون ر.س',
  },

  // Heatmap terms
  '5×5 Enterprise Risk Matrix & Heatmap': {
    en: '5×5 Enterprise Risk Matrix & Heatmap',
    ar: 'مصفوفة وخريطة المخاطر المؤسسية 5×5',
  },
  'ISO 31000 Standard': {
    en: 'ISO 31000 Standard',
    ar: 'معيار ISO 31000',
  },
  'Real-time evaluation of likelihood vs consequence exposures across institutional domains.': {
    en: 'Real-time evaluation of likelihood vs consequence exposures across institutional domains.',
    ar: 'تقييم لحظي لاحتمالية وتأثير المخاطر عبر كافة القطاعات المؤسسية.',
  },
  'Matrix View': {
    en: 'Matrix View',
    ar: 'عرض المصفوفة',
  },
  'Severity Breakdown': {
    en: 'Severity Breakdown',
    ar: 'تحليل مستويات الخطورة',
  },
  'Risk Tier Legend:': {
    en: 'Risk Tier Legend:',
    ar: 'دليل تصنيف المخاطر:',
  },
  'Low (1-4)': {
    en: 'Low (1-4)',
    ar: 'منخفض (1-4)',
  },
  'Moderate (5-9)': {
    en: 'Moderate (5-9)',
    ar: 'متوسط (5-9)',
  },
  'High (10-15)': {
    en: 'High (10-15)',
    ar: 'مرتفع (10-15)',
  },
  'Critical (16-25)': {
    en: 'Critical (16-25)',
    ar: 'حرج (16-25)',
  },
  'Click any cell to filter the register': {
    en: 'Click any cell to filter the register',
    ar: 'انقر على أي خلية لتصفية سجل المخاطر',
  },
  'Impact (Consequence Level) →': {
    en: 'Impact (Consequence Level) →',
    ar: 'الأثر (مستوى العواقب) ←',
  },
  'Likelihood ↓': {
    en: 'Likelihood ↓',
    ar: 'الاحتمالية ↓',
  },
  '5 - Almost Certain': {
    en: '5 - Almost Certain',
    ar: '5 - مؤكد تقريباً',
  },
  '4 - Likely': {
    en: '4 - Likely',
    ar: '4 - محتمل جداً',
  },
  '3 - Possible': {
    en: '3 - Possible',
    ar: '3 - ممكن',
  },
  '2 - Unlikely': {
    en: '2 - Unlikely',
    ar: '2 - غير مرجح',
  },
  '1 - Rare': {
    en: '1 - Rare',
    ar: '1 - نادر',
  },
  '5 - Critical': {
    en: '5 - Critical',
    ar: '5 - حرج',
  },
  '4 - Major': {
    en: '4 - Major',
    ar: '4 - كبير',
  },
  '3 - Serious': {
    en: '3 - Serious',
    ar: '3 - ملحوظ',
  },
  '2 - Moderate': {
    en: '2 - Moderate',
    ar: '2 - متوسط',
  },
  '1 - Minor': {
    en: '1 - Minor',
    ar: '1 - طفيف',
  },
  'No risks': {
    en: 'No risks',
    ar: 'لا توجد مخاطر',
  },
  'Risk': {
    en: 'Risk',
    ar: 'خطر',
  },
  'Risks': {
    en: 'Risks',
    ar: 'مخاطر',
  },

  // Chart and Section Terms
  'Institutional OKR Trajectory': {
    en: 'Institutional OKR Trajectory',
    ar: 'مسار الأهداف المؤسسية (OKRs)',
  },
  '2026 Monthly Strategy Execution vs Target': {
    en: '2026 Monthly Strategy Execution vs Target',
    ar: 'التنفيذ الشهري للاستراتيجية لعام 2026 مقابل المستهدف',
  },
  'Analytics': {
    en: 'Analytics',
    ar: 'التحليلات',
  },
  'Strategy Progress %': {
    en: 'Strategy Progress %',
    ar: 'نسبة تقدم الاستراتيجية %',
  },
  'Target Index: 85.0%': {
    en: 'Target Index: 85.0%',
    ar: 'مؤشر المستهدف: 85.0%',
  },
  'Current Actual: 88.4%': {
    en: 'Current Actual: 88.4%',
    ar: 'الفعلي الحالي: 88.4%',
  },
  'Priority Enterprise Risks (Requires Leadership Attention)': {
    en: 'Priority Enterprise Risks (Requires Leadership Attention)',
    ar: 'المخاطر المؤسسية ذات الأولوية (تتطلب متابعة القيادة)',
  },
  'Top inherent score risks monitored by ERM Risk Management Committee': {
    en: 'Top inherent score risks monitored by ERM Risk Management Committee',
    ar: 'أعلى المخاطر في الدرجة المبدئية التي تتابعها لجنة إدارة المخاطر',
  },
  'Search priority risks...': {
    en: 'Search priority risks...',
    ar: 'البحث في المخاطر ذات الأولوية...',
  },
  'Register Risk': {
    en: 'Register Risk',
    ar: 'تسجيل خطر جديد',
  },
  'Strategic Objectives Portfolio': {
    en: 'Strategic Objectives Portfolio',
    ar: 'محفظة الأهداف الاستراتيجية',
  },
  'View Tree': {
    en: 'View Tree',
    ar: 'عرض الشجرة',
  },
  'Objectives': {
    en: 'Objectives',
    ar: 'الأهداف',
  },
  'Risk Code': {
    en: 'Risk Code',
    ar: 'رمز الخطر',
  },
  'Title & Narrative': {
    en: 'Title & Narrative',
    ar: 'عنوان الخطر وتفاصيله',
  },
  'Risk Title & Description': {
    en: 'Risk Title & Description',
    ar: 'عنوان الخطر ووصفه',
  },
  'Category': {
    en: 'Category',
    ar: 'الفئة',
  },
  'Inherent': {
    en: 'Inherent',
    ar: 'الخطر المبدئي',
  },
  'Residual': {
    en: 'Residual',
    ar: 'الخطر المتبقي',
  },
  'Treatment': {
    en: 'Treatment',
    ar: 'خطة المعالجة',
  },
  'Export': {
    en: 'Export',
    ar: 'تصدير',
  },
  'Search records...': {
    en: 'Search records...',
    ar: 'البحث في السجلات...',
  },
  'No records found': {
    en: 'No records found',
    ar: 'لم يتم العثور على سجلات',
  },
  'Try adjusting search keywords or active filters.': {
    en: 'Try adjusting search keywords or active filters.',
    ar: 'يرجى تعديل كلمات البحث أو خيارات التصفية.',
  },
  'Showing': {
    en: 'Showing',
    ar: 'عرض',
  },
  'to': {
    en: 'to',
    ar: 'إلى',
  },
  'of': {
    en: 'of',
    ar: 'من أصل',
  },
  'entries': {
    en: 'entries',
    ar: 'سجل',
  },
  'per page': {
    en: 'per page',
    ar: 'لكل صفحة',
  },

  // ERM & Risk
  'ENTERPRISE RISK MANAGEMENT (ISO 31000)': {
    en: 'ENTERPRISE RISK MANAGEMENT (ISO 31000)',
    ar: 'إدارة المخاطر المؤسسية (ISO 31000)',
  },
  'Enterprise Risk Register & Heatmap': {
    en: 'Enterprise Risk Register & Heatmap',
    ar: 'سجل المخاطر المؤسسية والمصفوفة الحرارية',
  },
  'Identify, assess, and treat strategic, operational, financial, and compliance risk exposures across all organizational departments.': {
    en: 'Identify, assess, and treat strategic, operational, financial, and compliance risk exposures across all organizational departments.',
    ar: 'تحديد وتقييم ومعالجة مخاطر الأعمال الاستراتيجية والتشغيلية والمالية والامتثال عبر كافة إدارات المنظومة.',
  },
  'Import Risk Register': {
    en: 'Import Risk Register',
    ar: 'استيراد سجل المخاطر',
  },
  'Register New Risk': {
    en: 'Register New Risk',
    ar: 'تسجيل خطر جديد',
  },
  'Total Registered Risks': {
    en: 'Total Registered Risks',
    ar: 'إجمالي المخاطر المسجلة',
  },
  'Active Enterprise Scope': {
    en: 'Active Enterprise Scope',
    ar: 'النطاق المؤسسي النشط',
  },
  'Critical Risks (Score ≥ 16)': {
    en: 'Critical Risks (Score ≥ 16)',
    ar: 'مخاطر حرجة (الدرجة ≥ 16)',
  },
  'Immediate Escalation': {
    en: 'Immediate Escalation',
    ar: 'تصعيد فوري',
  },
  'High Exposure Risks (10-15)': {
    en: 'High Exposure Risks (10-15)',
    ar: 'مخاطر عالية التعرض (10-15)',
  },
  'Mitigation in Progress': {
    en: 'Mitigation in Progress',
    ar: 'المعالجة قيد التنفيذ',
  },
  'Moderate / Low Risks (< 10)': {
    en: 'Moderate / Low Risks (< 10)',
    ar: 'مخاطر متوسطة / منخفضة (< 10)',
  },
  'Monitored Controls': {
    en: 'Monitored Controls',
    ar: 'ضوابط خاضعة للمراقبة',
  },
  'Enterprise Risk Register': {
    en: 'Enterprise Risk Register',
    ar: 'سجل المخاطر المؤسسية',
  },
  'Search risks by code, title, owner, category...': {
    en: 'Search risks by code, title, owner, category...',
    ar: 'البحث عن المخاطر بالرمز، العنوان، المالك، الفئة...',
  },
  'Operational': {
    en: 'Operational',
    ar: 'تشغيلي',
  },
  'Strategic': {
    en: 'Strategic',
    ar: 'استراتيجي',
  },
  'Financial': {
    en: 'Financial',
    ar: 'مالي',
  },
  'Cyber': {
    en: 'Cyber',
    ar: 'سيبراني',
  },
  'Reputational': {
    en: 'Reputational',
    ar: 'سمعة',
  },
  'Mitigating': {
    en: 'Mitigating',
    ar: 'قيد المعالجة',
  },
  'Accepted': {
    en: 'Accepted',
    ar: 'مقبول',
  },
  'Closed': {
    en: 'Closed',
    ar: 'مغلق',
  },
  'Open': {
    en: 'Open',
    ar: 'مفتوح',
  },
  'Clear Filter ✕': {
    en: 'Clear Filter ✕',
    ar: 'إلغاء التصفية ✕',
  },

  // Cyber Risk & IT
  'NATIONAL CYBERSECURITY AUTHORITY (NCA ECC) ALIGNMENT': {
    en: 'NATIONAL CYBERSECURITY AUTHORITY (NCA ECC) ALIGNMENT',
    ar: 'المواءمة مع الهيئة الوطنية للأمن السيبراني (NCA ECC)',
  },
  'Cybersecurity Risk & Critical IT Assets': {
    en: 'Cybersecurity Risk & Critical IT Assets',
    ar: 'مخاطر الأمن السيبراني والأصول التقنية الحساسة',
  },
  'Real-time threat landscape, vulnerability management (CVEs), and NCA ECC / ISO 27001 security controls.': {
    en: 'Real-time threat landscape, vulnerability management (CVEs), and NCA ECC / ISO 27001 security controls.',
    ar: 'مؤشرات التهديدات في الوقت الفعلي، إدارة الثغرات الأمنية (CVEs)، وضوابط الأمن السيبراني NCA ECC و ISO 27001.',
  },
  'Critical IT Assets': {
    en: 'Critical IT Assets',
    ar: 'الأصول التقنية الحساسة',
  },
  'Open Vulnerabilities': {
    en: 'Open Vulnerabilities',
    ar: 'الثغرات الأمنية المفتوحة',
  },
  'NCA ECC Control Score': {
    en: 'NCA ECC Control Score',
    ar: 'درجة ضوابط NCA ECC',
  },
  'Security Control Effectiveness': {
    en: 'Security Control Effectiveness',
    ar: 'فعالية الضوابط الأمنية',
  },
  'High-Risk Infrastructure Assets': {
    en: 'High-Risk Infrastructure Assets',
    ar: 'أصول البنية التحتية عالية الخطورة',
  },
  'Vulnerability Remediation Pipeline': {
    en: 'Vulnerability Remediation Pipeline',
    ar: 'مسار معالجة الثغرات الأمنية',
  },
  'Critical IT Asset Inventory': {
    en: 'Critical IT Asset Inventory',
    ar: 'حصر الأصول التقنية الحساسة',
  },
  'Vulnerability Management (CVE Register)': {
    en: 'Vulnerability Management (CVE Register)',
    ar: 'إدارة الثغرات الأمنية (سجل CVE)',
  },
  'Security Controls & NCA Framework': {
    en: 'Security Controls & NCA Framework',
    ar: 'الضوابط الأمنية وإطار الهيئة الوطنية للأمن السيبراني',
  },
  'Asset Code': {
    en: 'Asset Code',
    ar: 'رمز الأصل',
  },
  'Asset Name': {
    en: 'Asset Name',
    ar: 'اسم الأصل',
  },
  'IP Address': {
    en: 'IP Address',
    ar: 'عنوان IP',
  },
  'Criticality': {
    en: 'Criticality',
    ar: 'مستوى الأهمية',
  },
  'Vuln ID': {
    en: 'Vuln ID',
    ar: 'معرف الثغرة',
  },
  'CVE Identifier': {
    en: 'CVE Identifier',
    ar: 'معرف CVE',
  },
  'Target Asset': {
    en: 'Target Asset',
    ar: 'الأصل المستهدف',
  },
  'CVSS v3 Score': {
    en: 'CVSS v3 Score',
    ar: 'درجة CVSS v3',
  },
  'Remediation Due': {
    en: 'Remediation Due',
    ar: 'موعد المعالجة المستحق',
  },
  'Control Code': {
    en: 'Control Code',
    ar: 'رمز الضابط',
  },
  'Control Name': {
    en: 'Control Name',
    ar: 'اسم الضابط',
  },
  'Effectiveness': {
    en: 'Effectiveness',
    ar: 'الفعالية',
  },
  'Compliance Status': {
    en: 'Compliance Status',
    ar: 'حالة الالتزام',
  },
  'GIS & SCADA Infrastructure': {
    en: 'GIS & SCADA Infrastructure',
    ar: 'بنية نظم المعلومات الجغرافية وسكادا',
  },
  'Action Required': {
    en: 'Action Required',
    ar: 'مطلوب إجراء',
  },
  '1 Critical CVE-2024-21626': {
    en: '1 Critical CVE-2024-21626',
    ar: '1 ثغرة حرجة CVE-2024-21626',
  },
  '110 / 114 Controls Compliant': {
    en: '110 / 114 Controls Compliant',
    ar: '110 / 114 ضابط ممتثل',
  },
  'Average across 4 Frameworks': {
    en: 'Average across 4 Frameworks',
    ar: 'المتوسط عبر 4 أطر عمل',
  },
  'Grade A': {
    en: 'Grade A',
    ar: 'فئة أ (ممتاز)',
  },
  'Enterprise': {
    en: 'Enterprise',
    ar: 'مؤسسي',
  },
  'Assets': {
    en: 'Assets',
    ar: 'الأصول',
  },
  'CVE Vulnerabilities': {
    en: 'CVE Vulnerabilities',
    ar: 'ثغرات CVE',
  },
  'Controls': {
    en: 'Controls',
    ar: 'الضوابط',
  },

  // Corporate Governance
  'INSTITUTIONAL GOVERNANCE & CHARTERS': {
    en: 'INSTITUTIONAL GOVERNANCE & CHARTERS',
    ar: 'الحوكمة المؤسسية واللوائح التنظيمية',
  },
  'Corporate Governance, Committees & Policies': {
    en: 'Corporate Governance, Committees & Policies',
    ar: 'الحوكمة المؤسسية واللجان والسياسات',
  },
  'Executive steering committees, board meeting schedules, and institutional policy governance registers.': {
    en: 'Executive steering committees, board meeting schedules, and institutional policy governance registers.',
    ar: 'اللجان التوجيهية التنفيذية، جداول اجتماعات مجلس الهيئة، وسجلات حوكمة السياسات المؤسسية.',
  },
  'Active Policies': {
    en: 'Active Policies',
    ar: 'السياسات النشطة',
  },
  'Executive Committees': {
    en: 'Executive Committees',
    ar: 'اللجان التنفيذية',
  },
  'Upcoming Meetings': {
    en: 'Upcoming Meetings',
    ar: 'الاجتماعات القادمة',
  },
  'Policy Compliance Rate': {
    en: 'Policy Compliance Rate',
    ar: 'نسبة الالتزام بالسياسات',
  },
  'Institutional Policy Management Register': {
    en: 'Institutional Policy Management Register',
    ar: 'سجل إدارة السياسات المؤسسية',
  },
  'Executive Steering Committees & Councils': {
    en: 'Executive Steering Committees & Councils',
    ar: 'اللجان التوجيهية والمجالس التنفيذية',
  },
  'Policy Code': {
    en: 'Policy Code',
    ar: 'رمز السياسة',
  },
  'Policy Title': {
    en: 'Policy Title',
    ar: 'عنوان السياسة',
  },
  'Effective Date': {
    en: 'Effective Date',
    ar: 'تاريخ السريان',
  },
  'Next Review': {
    en: 'Next Review',
    ar: 'المراجعة القادمة',
  },
  'Committee ID': {
    en: 'Committee ID',
    ar: 'رمز اللجنة',
  },
  'Committee Name': {
    en: 'Committee Name',
    ar: 'اسم اللجنة',
  },
  'Chairperson': {
    en: 'Chairperson',
    ar: 'رئيس اللجنة',
  },
  'Secretary': {
    en: 'Secretary',
    ar: 'أمين السر',
  },
  'Members': {
    en: 'Members',
    ar: 'الأعضاء',
  },
  'Next Meeting': {
    en: 'Next Meeting',
    ar: 'الاجتماع القادم',
  },
  'Policies Register': {
    en: 'Policies Register',
    ar: 'سجل السياسات',
  },
  'Committees': {
    en: 'Committees',
    ar: 'اللجان',
  },

  // Compliance & Regulatory
  'REGULATORY & COMPLIANCE FRAMEWORKS': {
    en: 'REGULATORY & COMPLIANCE FRAMEWORKS',
    ar: 'أطر الالتزام والأنظمة الرقابية',
  },
  'Compliance Management & Audit Findings': {
    en: 'Compliance Management & Audit Findings',
    ar: 'إدارة الالتزام وملاحظات المراجعة الرقابية',
  },
  'ISO 27001, ISO 22301, ISO 31000, NCA ECC and NIST CSF regulatory control matrices.': {
    en: 'ISO 27001, ISO 22301, ISO 31000, NCA ECC and NIST CSF regulatory control matrices.',
    ar: 'مصفوفات الضوابط الرقابية لـ ISO 27001، و ISO 22301، و ISO 31000، و NCA ECC، و NIST CSF.',
  },
  'Total Frameworks': {
    en: 'Total Frameworks',
    ar: 'إجمالي أطر العمل',
  },
  'Average Compliance': {
    en: 'Average Compliance',
    ar: 'متوسط الالتزام',
  },
  'Open Audit Findings': {
    en: 'Open Audit Findings',
    ar: 'ملاحظات المراجعة المفتوحة',
  },
  'High Severity Findings': {
    en: 'High Severity Findings',
    ar: 'ملاحظات عالية الأهمية',
  },
  'Regulatory Compliance Frameworks': {
    en: 'Regulatory Compliance Frameworks',
    ar: 'أطر الالتزام واللوائح الرقابية',
  },
  'Central Regulatory Requirements & Controls': {
    en: 'Central Regulatory Requirements & Controls',
    ar: 'المتطلبات والضوابط الرقابية المركزية',
  },
  'Audit Findings & Remediation Tracker': {
    en: 'Audit Findings & Remediation Tracker',
    ar: 'ملاحظات المراجعة وتتبع المعالجات',
  },
  'Framework ID': {
    en: 'Framework ID',
    ar: 'رمز الإطار',
  },
  'Framework Standard Name': {
    en: 'Framework Standard Name',
    ar: 'اسم المعيار أو الإطار',
  },
  'Total Controls': {
    en: 'Total Controls',
    ar: 'إجمالي الضوابط',
  },
  'Compliant': {
    en: 'Compliant',
    ar: 'ممتثل',
  },
  'Partial': {
    en: 'Partial',
    ar: 'امتثال جزئي',
  },
  'Overall Score': {
    en: 'Overall Score',
    ar: 'الدرجة الكلية',
  },
  'Requirement ID': {
    en: 'Requirement ID',
    ar: 'رمز المتطلب',
  },
  'Finding Code': {
    en: 'Finding Code',
    ar: 'رمز الملاحظة',
  },
  'Audit Finding & Recommendation': {
    en: 'Audit Finding & Recommendation',
    ar: 'ملاحظة التدقيق والتوصية',
  },
  'Audit Date': {
    en: 'Audit Date',
    ar: 'تاريخ التدقيق',
  },
  'Severity': {
    en: 'Severity',
    ar: 'مستوى الخطورة',
  },
  'Frameworks': {
    en: 'Frameworks',
    ar: 'أطر العمل',
  },
  'Requirements': {
    en: 'Requirements',
    ar: 'المتطلبات',
  },
  'Audit Findings': {
    en: 'Audit Findings',
    ar: 'ملاحظات المراجعة',
  },

  // BCM & Resilience
  'BUSINESS CONTINUITY MANAGEMENT (ISO 22301)': {
    en: 'BUSINESS CONTINUITY MANAGEMENT (ISO 22301)',
    ar: 'إدارة استمرارية الأعمال (ISO 22301)',
  },
  'BCM & Emergency Operational Resilience': {
    en: 'BCM & Emergency Operational Resilience',
    ar: 'استمرارية الأعمال والمرونة التشغيلية في الطوارئ',
  },
  'Business Impact Analysis (BIA), Recovery Time Objectives (RTO/RPO), and Disaster Simulation Exercises.': {
    en: 'Business Impact Analysis (BIA), Recovery Time Objectives (RTO/RPO), and Disaster Simulation Exercises.',
    ar: 'تحليل الأثر على الأعمال (BIA)، أهداف وقت التعافي (RTO/RPO)، وتمارين محاكاة الكوارث.',
  },
  'Critical BIA Processes': {
    en: 'Critical BIA Processes',
    ar: 'العمليات الحساسة في تحليل الأثر',
  },
  'Active Continuity Plans': {
    en: 'Active Continuity Plans',
    ar: 'خطط الاستمرارية النشطة',
  },
  'Operational Resilience Index': {
    en: 'Operational Resilience Index',
    ar: 'مؤشر المرونة التشغيلية',
  },
  'Simulations Conducted': {
    en: 'Simulations Conducted',
    ar: 'تمارين المحاكاة المنفذة',
  },
  'Business Impact Analysis (BIA) Register': {
    en: 'Business Impact Analysis (BIA) Register',
    ar: 'سجل تحليل الأثر على الأعمال (BIA)',
  },
  'Business Continuity Plans (BCP)': {
    en: 'Business Continuity Plans (BCP)',
    ar: 'خطط استمرارية الأعمال (BCP)',
  },
  'Disaster Recovery Simulation Exercises': {
    en: 'Disaster Recovery Simulation Exercises',
    ar: 'تمارين محاكاة التعافي من الكوارث',
  },
  'Process ID': {
    en: 'Process ID',
    ar: 'رمز العملية',
  },
  'Business Process Name': {
    en: 'Business Process Name',
    ar: 'اسم العملية التشغيلية',
  },
  'MTD': {
    en: 'MTD',
    ar: 'أقصى فترة توقف (MTD)',
  },
  'RTO': {
    en: 'RTO',
    ar: 'وقت التعافي المستهدف (RTO)',
  },
  'RPO': {
    en: 'RPO',
    ar: 'نقطة التعافي المستهدفة (RPO)',
  },
  'Dependencies': {
    en: 'Dependencies',
    ar: 'الاعتماديات',
  },
  'Readiness': {
    en: 'Readiness',
    ar: 'الجاهزية',
  },
  'Plan ID': {
    en: 'Plan ID',
    ar: 'رمز الخطة',
  },
  'Continuity Plan Title': {
    en: 'Continuity Plan Title',
    ar: 'عنوان خطة الاستمرارية',
  },
  'Target Process': {
    en: 'Target Process',
    ar: 'العملية المستهدفة',
  },
  'Last Tested': {
    en: 'Last Tested',
    ar: 'آخر اختبار',
  },
  'Test Result': {
    en: 'Test Result',
    ar: 'نتيجة الاختبار',
  },
  'Exercise Code': {
    en: 'Exercise Code',
    ar: 'رمز التمرين',
  },
  'Exercise Title': {
    en: 'Exercise Title',
    ar: 'عنوان التمرين',
  },
  'Date Held': {
    en: 'Date Held',
    ar: 'تاريخ الإجراء',
  },
  'Participants': {
    en: 'Participants',
    ar: 'المشاركون',
  },
  'Result': {
    en: 'Result',
    ar: 'النتيجة',
  },
  'BIA Matrix': {
    en: 'BIA Matrix',
    ar: 'مصفوفة BIA',
  },
  'Continuity Plans': {
    en: 'Continuity Plans',
    ar: 'خطط الاستمرارية',
  },
  'Drill Exercises': {
    en: 'Drill Exercises',
    ar: 'تمارين المحاكاة',
  },

  // Central Actions
  'CENTRALIZED ACTION ITEM GOVERNANCE': {
    en: 'CENTRALIZED ACTION ITEM GOVERNANCE',
    ar: 'حوكمة خطط العمل المركزية',
  },
  'Cross-Domain Action Plans & Corrective Measures': {
    en: 'Cross-Domain Action Plans & Corrective Measures',
    ar: 'خطط العمل المشتركة والإجراءات التصحيحية',
  },
  'Single-pane-of-glass execution tracking across Strategy, ERM Risk, Cyber, Governance, Compliance & BCM.': {
    en: 'Single-pane-of-glass execution tracking across Strategy, ERM Risk, Cyber, Governance, Compliance & BCM.',
    ar: 'تتبع موحد لتنفيذ خطط العمل عبر الاستراتيجية، وإدارة المخاطر، والسيبراني، والحوكمة، والالتزام، واستمرارية الأعمال.',
  },
  'Action Code': {
    en: 'Action Code',
    ar: 'رمز الإجراء',
  },
  'Action Plan Title & Source': {
    en: 'Action Plan Title & Source',
    ar: 'عنوان خطة العمل والمصدر',
  },
  'Due Date': {
    en: 'Due Date',
    ar: 'تاريخ الاستحقاق',
  },
  'Not Started': {
    en: 'Not Started',
    ar: 'لم تبدأ',
  },
  'Under Review': {
    en: 'Under Review',
    ar: 'قيد المراجعة',
  },

  // Operational Tasks (Kanban)
  'OPERATIONAL TASK BOARD': {
    en: 'OPERATIONAL TASK BOARD',
    ar: 'لوحة المهام التشغيلية',
  },
  'Kanban Task Execution & Sprint Board': {
    en: 'Kanban Task Execution & Sprint Board',
    ar: 'لوحة كانبان لمتابعة وتنفيذ المهام التشغيلية',
  },
  'Operational workflow stage tracking across To Do, In Progress, Blocked & Completed.': {
    en: 'Operational workflow stage tracking across To Do, In Progress, Blocked & Completed.',
    ar: 'تتبع مراحل سير العمل التشغيلي عبر المهام المطلوبة، قيد التنفيذ، المتوقفة، والمكتملة.',
  },
  'Kanban View': {
    en: 'Kanban View',
    ar: 'عرض كانبان',
  },
  'List View': {
    en: 'List View',
    ar: 'عرض القائمة',
  },
  'To Do': {
    en: 'To Do',
    ar: 'قيد الانتظار',
  },
  'Blocked': {
    en: 'Blocked',
    ar: 'متوقفة',
  },
  'Quick Add Task...': {
    en: 'Quick Add Task...',
    ar: 'إضافة مهمة سريعة...',
  },
  'Add Task': {
    en: 'Add Task',
    ar: 'إضافة مهمة',
  },
  'Task ID': {
    en: 'Task ID',
    ar: 'رمز المهمة',
  },
  'Task Title': {
    en: 'Task Title',
    ar: 'عنوان المهمة',
  },
  'Assignee': {
    en: 'Assignee',
    ar: 'المكلف بالمهمة',
  },
  'Board Stage': {
    en: 'Board Stage',
    ar: 'المرحلة',
  },

  // Document Repository
  'ENTERPRISE KNOWLEDGE & EVIDENCE REPOSITORY': {
    en: 'ENTERPRISE KNOWLEDGE & EVIDENCE REPOSITORY',
    ar: 'مستودع المعرفة والأدلة المؤسسية',
  },
  'Document & Compliance Evidence Repository': {
    en: 'Document & Compliance Evidence Repository',
    ar: 'مستودع الوثائق وأدلة الامتثال المؤسسي',
  },
  'Centralized document management for Policies, BCM Plans, Risk Registers & ISO Evidence.': {
    en: 'Centralized document management for Policies, BCM Plans, Risk Registers & ISO Evidence.',
    ar: 'إدارة مركزية للوثائق والسياسات، وخطط الاستمرارية، وسجلات المخاطر، وأدلة الآيزو.',
  },
  'Upload & Import Documents': {
    en: 'Upload & Import Documents',
    ar: 'رفع واستيراد الوثائق',
  },
  'Document ID': {
    en: 'Document ID',
    ar: 'رمز الوثيقة',
  },
  'Title & Format': {
    en: 'Title & Format',
    ar: 'العنوان والصيغة',
  },
  'Uploaded By': {
    en: 'Uploaded By',
    ar: 'تم الرفع بواسطة',
  },
  'Upload Date': {
    en: 'Upload Date',
    ar: 'تاريخ الرفع',
  },
  'Preview': {
    en: 'Preview',
    ar: 'معاينة',
  },
  'Download': {
    en: 'Download',
    ar: 'تنزيل',
  },

  // Executive Reports
  'EXECUTIVE REPORTING & ANALYTICS CENTER': {
    en: 'EXECUTIVE REPORTING & ANALYTICS CENTER',
    ar: 'مركز التقارير والتحليلات التنفيذية',
  },
  'Executive Reports & Artifact Generator': {
    en: 'Executive Reports & Artifact Generator',
    ar: 'مولد التقارير والمخرجات التنفيذية',
  },
  'Generate, preview and export official PDF/Excel reports for enterprise leadership.': {
    en: 'Generate, preview and export official PDF/Excel reports for enterprise leadership.',
    ar: 'إنشاء ومعاينة وتصدير تقارير PDF وإكسل المعتمدة لقيادات المنظومة.',
  },
  'Pages': {
    en: 'Pages',
    ar: 'صفحة',
  },
  'Close Preview': {
    en: 'Close Preview',
    ar: 'إغلاق المعاينة',
  },
  'Enterprise Official Executive Report': {
    en: 'Enterprise Official Executive Report',
    ar: 'تقرير تنفيذي رسمي معتمد',
  },
  'Document generated with verified ISO 31000 & NCA ECC audit stamps.': {
    en: 'Document generated with verified ISO 31000 & NCA ECC audit stamps.',
    ar: 'تم إنشاء المستند مع أختام الاعتماد والتدقيق لمعايير ISO 31000 و NCA ECC.',
  },

  // Administration & RBAC
  'ENTERPRISE ACCESS CONTROL & RBAC': {
    en: 'ENTERPRISE ACCESS CONTROL & RBAC',
    ar: 'التحكم بالوصول وإدارة الصلاحيات المؤسسية (RBAC)',
  },
  'System Administration, Users & RBAC Simulator': {
    en: 'System Administration, Users & RBAC Simulator',
    ar: 'إدارة النظام، المستخدمين، ومحاكي الصلاحيات والأدوار',
  },
  'Manage organizational roles, inspect department allocations, and simulate stakeholder experiences.': {
    en: 'Manage organizational roles, inspect department allocations, and simulate stakeholder experiences.',
    ar: 'إدارة الأدوار الوظيفية، تفقد توزيع الإدارات، ومحاكاة تجربة القيادات والمستخدمين.',
  },
  'User Directory': {
    en: 'User Directory',
    ar: 'دليل المستخدمين',
  },
  'Roles & Permissions': {
    en: 'Roles & Permissions',
    ar: 'الأدوار والصلاحيات',
  },
  'Departments': {
    en: 'Departments',
    ar: 'الإدارات',
  },
  'Data Import': {
    en: 'Data Import',
    ar: 'استيراد البيانات',
  },
  'User Profile': {
    en: 'User Profile',
    ar: 'الملف الشخصي',
  },
  'Job Title': {
    en: 'Job Title',
    ar: 'المسمى الوظيفي',
  },
  'Active Role': {
    en: 'Active Role',
    ar: 'الدور النشط',
  },
  'Switch Simulation': {
    en: 'Switch Simulation',
    ar: 'محاكاة الصلاحية',
  },
  'Simulate User': {
    en: 'Simulate User',
    ar: 'محاكاة المستخدم',
  },

  'Reset Demo Strategies': {
    en: 'Reset Demo Strategies',
    ar: 'إعادة ضبط الاستراتيجيات التجريبية',
  },

  // Login & Executive Portal Authentication
  'ISO 31000 & 27001 COMPLIANT': {
    en: 'ISO 31000 & 27001 COMPLIANT',
    ar: 'متوافق مع معايير ISO 31000 و 27001',
  },
  'V3.4 ENTERPRISE': {
    en: 'V3.4 ENTERPRISE',
    ar: 'الإصدار المؤسسي V3.4',
  },
  'EXECUTIVE DEMONSTRATION PLATFORM': {
    en: 'EXECUTIVE DEMONSTRATION PLATFORM',
    ar: 'منصة العرض التجريبية التنفيذية',
  },
  'Institutional Strategy, Risk & Governance Suite': {
    en: 'Institutional Strategy, Risk & Governance Suite',
    ar: 'منظومة الاستراتيجية المؤسسية وإدارة المخاطر والحوكمة',
  },
  'Unified SaaS control center empowering leadership with real-time OKR progress, ISO 31000 risk matrices, and regulatory compliance audit oversight.': {
    en: 'Unified SaaS control center empowering leadership with real-time OKR progress, ISO 31000 risk matrices, and regulatory compliance audit oversight.',
    ar: 'مركز قيادة موحد يمكن القيادة التنفيذية من متابعة تقدم الأهداف (OKRs)، ومصفوفات مخاطر ISO 31000، والرقابة على الامتثال التنظيمي في الوقت الحقيقي.',
  },
  'Select Role Persona to Test RBAC Permissions:': {
    en: 'Select Role Persona to Test RBAC Permissions:',
    ar: 'اختر صفة الدور لاختبار صلاحيات الوصول والتحكم المبني على الأدوار (RBAC):',
  },
  'Enterprise Sign In': {
    en: 'Enterprise Sign In',
    ar: 'تسجيل الدخول للمنظومة',
  },
  'Active Persona:': {
    en: 'Active Persona:',
    ar: 'الدور النشط:',
  },
  'Enterprise Work Email': {
    en: 'Enterprise Work Email',
    ar: 'البريد الإلكتروني المؤسسي',
  },
  'Password': {
    en: 'Password',
    ar: 'كلمة المرور',
  },
  'Forgot Password?': {
    en: 'Forgot Password?',
    ar: 'نسيت كلمة المرور؟',
  },
  'Remember session credentials': {
    en: 'Remember session credentials',
    ar: 'تذكر بيانات الجلسة',
  },
  'Sign In as': {
    en: 'Sign In as',
    ar: 'تسجيل الدخول بصلاحية',
  },
  'Active RBAC Session Authorization': {
    en: 'Active RBAC Session Authorization',
    ar: 'تفويض جلسة نشط وفق الصلاحيات المؤسسية',
  },
  'Enterprise Strategy & Governance Suite • Interactive Enterprise Demonstration': {
    en: 'Enterprise Strategy & Governance Suite • Interactive Enterprise Demonstration',
    ar: 'منظومة الاستراتيجية والحوكمة المؤسسية • منصة العرض التفاعلية للهيئة',
  },
};

/**
 * Helper function to translate keys with fallback to key or provided default
 */
export function t(key: string, lang: Language = 'en', fallback?: string): string {
  if (!key) return '';
  const entry = TRANSLATIONS[key];
  if (entry && entry[lang]) {
    return entry[lang];
  }
  return fallback !== undefined ? fallback : key;
}

/**
 * Returns localized string for an entity property that has both standard and 'Ar' suffix
 */
export function getLocalizedField<T extends Record<string, any>>(
  item: T | null | undefined,
  field: string,
  lang: Language = 'en'
): string {
  if (!item) return '';
  if (lang === 'ar') {
    const arField = `${field}Ar`;
    if (item[arField]) {
      return String(item[arField]);
    }
  }
  return item[field] !== undefined ? String(item[field]) : '';
}
