export type Role = 'student' | 'client' | 'admin';

export type ApplicantCategory = 'student' | 'work_permit' | 'visit_visa';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  applicantCategory?: ApplicantCategory;
  avatar?: string;
  targetCountry?: string;
  city?: string;
  createdAt: string;
}

export type DocumentType = 
  | 'passport' 
  | 'academic_matric' 
  | 'academic_fsc_degree' 
  | 'bank_statement' 
  | 'police_clearance' 
  | 'medical_fitness' 
  | 'language_test' 
  | 'sop_essay'
  | 'work_experience'
  | 'employment_contract'
  | 'tax_fbr_record'
  | 'hotel_ticket_booking'
  | 'travel_insurance'
  | 'sponsorship_letter'
  | 'other';

export type DocumentStatus = 'verified' | 'under_review' | 'needs_revision' | 'pending';

export interface StudentDocument {
  id: string;
  userId: string;
  studentName: string;
  title: string;
  type: DocumentType;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: DocumentStatus;
  notes?: string;
  fileUrl?: string;
}

export type MilestoneStage = 
  | 'initial_assessment'
  | 'document_attestation'
  | 'university_admission'
  | 'offer_letter'
  | 'labor_market_approval'
  | 'work_permit_issued'
  | 'financial_ties_vetting'
  | 'visa_file_prep'
  | 'biometrics_scheduled'
  | 'embassy_interview'
  | 'visa_approved'
  | 'pre_departure';

export interface Milestone {
  id: string;
  stage: MilestoneStage;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  completedDate?: string;
  remarks?: string;
  actionRequired?: string;
}

export interface StudentApplication {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  targetCountry: string;
  category?: ApplicantCategory;
  program: string;
  university: string;
  intake: string;
  serviceType: string;
  occupationOrField?: string;
  permitType?: string;
  travelDateOrIntake?: string;
  currentStage: MilestoneStage;
  progressPercentage: number;
  milestones: Milestone[];
  assignedCounselor: string;
  lastUpdated: string;
  caseRef: string;
}

export interface NotificationItem {
  id: string;
  userId: string; // 'all' or specific studentId
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'milestone' | 'document' | 'system' | 'alert';
  actionLink?: string;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  targetCountry: string;
  category?: ApplicantCategory;
  serviceRequired: string;
  qualification: string;
  experienceYears?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'assessment_scheduled' | 'closed';
  notes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  bio: string;
  expertise: string[];
  contactEmail: string;
  phone?: string;
  avatar: string;
  featuredQuote: string;
}

export interface BrandingSettings {
  logoUrl?: string; // base64 dataUrl or image url
  faviconUrl?: string; // base64 dataUrl or favicon url
  brandName?: string;
  brandTagline?: string;
}

export interface AdminCredentials {
  username: string; // e.g. "admin" or "admin@modernminds.pk"
  password: string; // e.g. "admin123"
  displayName: string;
  email: string;
  updatedAt: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  country: string;
  countryFlag: string;
  sector: string;
  companyName: string;
  location: string;
  salary: string;
  vacanciesCount: string;
  contractDuration: string;
  accommodationBenefits: string;
  deadline: string;
  requirements: string[];
  brochureUrl?: string; // Image or generated brochure data-url
  brochureTheme?: 'navy' | 'emerald' | 'amber' | 'crimson';
  isFeatured?: boolean;
  postedAt: string;
}

export interface DisclaimerPopupSettings {
  isEnabled: boolean; // whether disclaimer displays on website load
  warningLevel: 'critical' | 'alert' | 'notice';
  badgeText: string;
  title: string;
  subtitle: string;
  personName: string;
  personRoleOrAlias: string;
  personImage?: string; // base64 or URL
  personCnicOrDetails?: string;
  warningMessage: string;
  bulletPoints: string[];
  officialNotice: string;
  showOnEveryVisit: boolean;
  updatedAt?: string;
}

export type SiteBranding = BrandingSettings;

export interface WorkAndVisitCountryInfo {
  id: string;
  name: string;
  flag: string;
  category: 'work_permit' | 'visit_visa' | 'both';
  tagline: string;
  image: string;
  visaSuccessRate: string;
  processingTime: string;
  validity: string;
  salaryOrProof: string; // e.g. "€900 – €1,800/month" or "PKR 1.5M - 2.5M Bank Statement"
  permitTypeOrPurpose: string; // e.g. "Type-D Work Permit / Voivodeship" or "Tourist / Business 90-Day Entry"
  topSectorsOrDestinations: string[];
  requirements: string[];
  keyHighlights: string[];
}

export interface TargetCountryInfo {
  id: string;
  name: string;
  flag: string;
  tagline: string;
  image: string;
  popularPrograms: string[];
  tuitionRange: string;
  livingCost: string;
  visaSuccessRate: string;
  processingTime: string;
  workRights: string;
  highlights: string[];
  intakes: string;
  requirements: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  details: string[];
  benefits: string[];
  popularFor: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'admissions' | 'visas' | 'countries' | 'finance';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  options?: string[];
}

export interface SiteContent {
  branding?: BrandingSettings;
  hero: {
    badgeText: string;
    headline: string;
    headlineHighlight: string;
    subtitle: string;
    phoneButtonText: string;
    phoneButtonNumber: string;
    primaryCtaText: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  about: {
    badgeText: string;
    headline: string;
    cardTag: string;
    cardTitle: string;
    cardSubtitle: string;
    manifestoStatement: string;
    paragraph1: string;
    paragraph2: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
  };
  countries: {
    badgeText: string;
    headline: string;
    subtitle: string;
  };
  workAndVisit?: {
    badgeText: string;
    headline: string;
    subtitle: string;
  };
  services: {
    badgeText: string;
    headline: string;
    subtitle: string;
  };
  whyUs: {
    badgeText: string;
    headline: string;
    subtitle: string;
  };
  team: {
    badgeText: string;
    headline: string;
    subtitle: string;
  };
  faqs: {
    badgeText: string;
    headline: string;
    subtitle: string;
  };
  contact: {
    badgeText: string;
    headline: string;
    subtitle: string;
    address: string;
    phonePrimary: string;
    phoneMobile: string;
    email: string;
    hours: string;
  };
}
