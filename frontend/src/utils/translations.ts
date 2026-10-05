export type Language = 'en' | 'ar';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Navigation Groups
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
  'enterprise_authority': {
    en: 'Enterprise Authority',
    ar: 'هيئة تطوير الأحساء',
  },
  'grc_strategy_suite': {
    en: 'GRC & Strategy Suite',
    ar: 'منظومة الاستراتيجية والحوكمة',
  },
  'active_role_persona': {
    en: 'Active Role Persona',
    ar: 'الدور النشط',
  },
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
