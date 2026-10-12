import { 
  User, 
  Role,
  StudentApplication, 
  StudentDocument, 
  NotificationItem, 
  ContactInquiry, 
  MilestoneStage, 
  DocumentStatus,
  Milestone,
  SiteContent,
  BrandingSettings,
  TargetCountryInfo,
  WorkAndVisitCountryInfo,
  TeamMember,
  JobOpportunity,
  AdminCredentials,
  DisclaimerPopupSettings
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_APPLICATIONS, 
  INITIAL_DOCUMENTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_LEADS,
  DEFAULT_SITE_CONTENT,
  TARGET_COUNTRIES,
  WORK_AND_VISIT_COUNTRIES,
  TEAM_MEMBERS,
  INITIAL_JOB_OPPORTUNITIES,
  DEFAULT_ADMIN_CREDENTIALS,
  DEFAULT_DISCLAIMER_POPUP
} from '../data/mockData';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';

const STORAGE_KEYS = {
  USERS: 'mcs_users_v1',
  CURRENT_USER: 'mcs_current_user_v1',
  APPLICATIONS: 'mcs_applications_v1',
  DOCUMENTS: 'mcs_documents_v1',
  NOTIFICATIONS: 'mcs_notifications_v1',
  LEADS: 'mcs_leads_v1',
  SITE_CONTENT: 'mcs_site_content_v2',
  BRANDING: 'mcs_branding_v1',
  TARGET_COUNTRIES: 'mcs_target_countries_v3',
  WORK_AND_VISIT_COUNTRIES: 'mcs_work_visit_countries_v3',
  TEAM_MEMBERS: 'mcs_team_members_v3',
  JOB_OPPORTUNITIES: 'mcs_job_opportunities_v1',
  ADMIN_CREDENTIALS: 'mcs_admin_credentials_v1',
  DISCLAIMER_POPUP: 'mcs_disclaimer_popup_v1',
};

// Simple event-based reactive sync
const EVENT_NAME = 'mcs_storage_updated';

export const triggerStorageUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
};

export const onStorageUpdate = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    window.addEventListener(EVENT_NAME, callback);
    return () => window.removeEventListener(EVENT_NAME, callback);
  }
  return () => {};
};

// Sanitize object for Firestore (removes undefined properties)
function cleanForFirestore(obj: any): any {
  if (obj === undefined) return null;
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(cleanForFirestore);
  }
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      clean[key] = cleanForFirestore(val);
    }
  }
  return clean;
}

// Initialization helper
const getStored = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
};

const setStored = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    triggerStorageUpdate();
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
};

// ============ FIREBASE REAL-TIME CLOUD SYNCHRONIZATION ============
let hasInitializedFirebaseSync = false;

export const initFirestoreSync = () => {
  if (hasInitializedFirebaseSync || typeof window === 'undefined') return;
  hasInitializedFirebaseSync = true;

  try {
    // 1. Sync Leads (public inquiries and opportunity applications from all devices)
    onSnapshot(collection(db, 'leads'), (snapshot) => {
      if (!snapshot.empty) {
        const cloudLeads: ContactInquiry[] = [];
        snapshot.forEach((docSnap) => {
          cloudLeads.push(docSnap.data() as ContactInquiry);
        });
        cloudLeads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setStored(STORAGE_KEYS.LEADS, cloudLeads);
      }
    }, (error) => {
      console.warn('Leads live sync listener:', error.message);
    });

    // 2. Sync Applications
    onSnapshot(collection(db, 'applications'), (snapshot) => {
      if (!snapshot.empty) {
        const cloudApps: StudentApplication[] = [];
        snapshot.forEach((docSnap) => {
          cloudApps.push(docSnap.data() as StudentApplication);
        });
        cloudApps.sort((a, b) => new Date(b.lastUpdated || '').getTime() - new Date(a.lastUpdated || '').getTime());
        setStored(STORAGE_KEYS.APPLICATIONS, cloudApps);
      }
    }, (error) => {
      console.warn('Applications live sync listener:', error.message);
    });

    // 3. Sync Documents
    onSnapshot(collection(db, 'documents'), (snapshot) => {
      if (!snapshot.empty) {
        const cloudDocs: StudentDocument[] = [];
        snapshot.forEach((docSnap) => {
          cloudDocs.push(docSnap.data() as StudentDocument);
        });
        cloudDocs.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
        setStored(STORAGE_KEYS.DOCUMENTS, cloudDocs);
      }
    }, (error) => {
      console.warn('Documents live sync listener:', error.message);
    });

    // 4. Sync Job Opportunities
    onSnapshot(collection(db, 'job_opportunities'), (snapshot) => {
      if (!snapshot.empty) {
        const cloudJobs: JobOpportunity[] = [];
        snapshot.forEach((docSnap) => {
          cloudJobs.push(docSnap.data() as JobOpportunity);
        });
        setStored(STORAGE_KEYS.JOB_OPPORTUNITIES, cloudJobs);
      }
    }, (error) => {
      console.warn('Jobs live sync listener:', error.message);
    });

    // 5. Sync Disclaimer Popup Settings
    onSnapshot(doc(db, 'settings', 'disclaimer_popup'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as DisclaimerPopupSettings;
        setStored(STORAGE_KEYS.DISCLAIMER_POPUP, data);
      }
    }, (error) => {
      console.warn('Disclaimer live sync listener:', error.message);
    });

    // 6. Sync Admin Credentials
    onSnapshot(doc(db, 'settings', 'admin_credentials'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as AdminCredentials;
        setStored(STORAGE_KEYS.ADMIN_CREDENTIALS, data);
      }
    }, (error) => {
      console.warn('Credentials live sync listener:', error.message);
    });

    // 7. Sync Branding
    onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as BrandingSettings;
        setStored(STORAGE_KEYS.BRANDING, data);
        if (data.faviconUrl) {
          applyFavicon(data.faviconUrl);
        }
      }
    }, (error) => {
      console.warn('Branding live sync listener:', error.message);
    });

    // 8. Sync Site Content CMS
    onSnapshot(doc(db, 'settings', 'site_content'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as SiteContent;
        setStored(STORAGE_KEYS.SITE_CONTENT, data);
      }
    }, (error) => {
      console.warn('CMS live sync listener:', error.message);
    });

    // 9. Sync Global Destinations (target_countries)
    onSnapshot(doc(db, 'settings', 'target_countries'), (docSnap) => {
      if (docSnap.exists() && docSnap.data()?.list) {
        setStored(STORAGE_KEYS.TARGET_COUNTRIES, docSnap.data()?.list);
      }
    }, (error) => {
      console.warn('Destinations live sync listener:', error.message);
    });

    // 10. Sync Work & Visit Countries
    onSnapshot(doc(db, 'settings', 'work_visit_countries'), (docSnap) => {
      if (docSnap.exists() && docSnap.data()?.list) {
        setStored(STORAGE_KEYS.WORK_AND_VISIT_COUNTRIES, docSnap.data()?.list);
      }
    }, (error) => {
      console.warn('Work visit live sync listener:', error.message);
    });

    // 11. Sync Team Members
    onSnapshot(doc(db, 'settings', 'team_members'), (docSnap) => {
      if (docSnap.exists() && docSnap.data()?.list) {
        setStored(STORAGE_KEYS.TEAM_MEMBERS, docSnap.data()?.list);
      }
    }, (error) => {
      console.warn('Team live sync listener:', error.message);
    });

  } catch (err) {
    console.warn('Error setting up Firestore snapshot listeners:', err);
  }
};

// Run sync initialization on boot
if (typeof window !== 'undefined') {
  initFirestoreSync();
}

// ============ AUTHENTICATION & CREDENTIALS ============
export const getUsers = (): User[] => getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);

export const getCurrentUser = (): User | null => {
  return getStored<User | null>(STORAGE_KEYS.CURRENT_USER, null);
};

export const setCurrentUser = (user: User | null): void => {
  setStored(STORAGE_KEYS.CURRENT_USER, user);
};

export const logoutUser = (): void => {
  setCurrentUser(null);
};

export const getAdminCredentials = (): AdminCredentials => {
  return getStored<AdminCredentials>(STORAGE_KEYS.ADMIN_CREDENTIALS, DEFAULT_ADMIN_CREDENTIALS);
};

export const updateAdminCredentials = (
  newCreds: Partial<AdminCredentials> & { newPassword?: string; currentPassword?: string }
): { success: boolean; error?: string } => {
  const current = getAdminCredentials();
  
  if (newCreds.currentPassword && newCreds.currentPassword !== current.password) {
    return { success: false, error: 'Current password does not match.' };
  }

  const updated: AdminCredentials = {
    username: (newCreds.username || current.username).trim(),
    password: newCreds.newPassword ? newCreds.newPassword.trim() : (newCreds.password || current.password),
    displayName: (newCreds.displayName || current.displayName).trim(),
    email: (newCreds.email || current.email || current.username).trim(),
    updatedAt: new Date().toISOString()
  };

  setStored(STORAGE_KEYS.ADMIN_CREDENTIALS, updated);

  // Sync to Firestore
  try {
    setDoc(doc(db, 'settings', 'admin_credentials'), cleanForFirestore(updated)).catch(e => {
      console.warn('Firestore write admin_credentials error:', e);
    });
  } catch (e) {
    console.warn('Firestore write admin_credentials error:', e);
  }

  // Sync with users list
  const users = getUsers();
  const adminIdx = users.findIndex(u => u.role === 'admin');
  if (adminIdx >= 0) {
    users[adminIdx] = {
      ...users[adminIdx],
      name: updated.displayName,
      email: updated.email
    };
    setStored(STORAGE_KEYS.USERS, users);
  }

  // Update current user if logged in as admin
  const curr = getCurrentUser();
  if (curr && curr.role === 'admin') {
    setCurrentUser({
      ...curr,
      name: updated.displayName,
      email: updated.email
    });
  }

  return { success: true };
};

export const loginAdmin = (usernameOrEmail: string, passwordAttempt: string): { success: boolean; user?: User; error?: string } => {
  const creds = getAdminCredentials();
  const input = usernameOrEmail.trim().toLowerCase();
  const matchUsername = input === creds.username.toLowerCase() || input === creds.email.toLowerCase();
  
  if (matchUsername && passwordAttempt.trim() === creds.password) {
    const users = getUsers();
    let adminUser = users.find(u => u.role === 'admin');
    if (!adminUser) {
      adminUser = {
        id: 'user-admin-1',
        name: creds.displayName,
        email: creds.email,
        role: 'admin',
        city: 'Islamabad',
        createdAt: new Date().toISOString()
      };
      users.push(adminUser);
      setStored(STORAGE_KEYS.USERS, users);
    } else {
      adminUser.name = creds.displayName;
      adminUser.email = creds.email;
    }

    setCurrentUser(adminUser);
    return { success: true, user: adminUser };
  }

  return { success: false, error: 'Invalid admin username or password. Please verify and try again.' };
};

export const loginUser = (email: string, role?: Role): { success: boolean; user?: User; error?: string } => {
  const adminCreds = getAdminCredentials();
  const isMatchAdminUsername = email.trim().toLowerCase() === adminCreds.username.toLowerCase() || email.trim().toLowerCase() === adminCreds.email.toLowerCase();
  
  if (isMatchAdminUsername) {
    return loginAdmin(email, adminCreds.password);
  }

  const users = getUsers();
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (found) {
    if (role && found.role !== role && !(role === 'client' && (found.role === 'student' || found.role === 'client'))) {
      return { success: false, error: `This account is registered as a ${found.role}.` };
    }
    setCurrentUser(found);
    return { success: true, user: found };
  }
  return { success: false, error: 'No account found with this email. Please check your credentials or register.' };
};

export const registerStudent = (
  name: string, 
  email: string, 
  phone: string, 
  targetCountry: string, 
  city: string,
  category: 'student' | 'work_permit' | 'visit_visa' = 'student'
): User => {
  const users = getUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    setCurrentUser(existing);
    return existing;
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    phone,
    role: category === 'student' ? 'student' : 'client',
    applicantCategory: category,
    targetCountry,
    city,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  setStored(STORAGE_KEYS.USERS, users);
  setCurrentUser(newUser);

  // Automatically create initial application skeleton for the new applicant
  createInitialApplicationForStudent(newUser);

  // Send welcome notification
  addNotification({
    userId: newUser.id,
    title: "Welcome to Modernminds Consulting Services!",
    message: `Dear ${name}, your ${category.replace('_', ' ')} file has been registered. You can now upload your verified documents to our secure vault for evaluation.`,
    type: "system"
  });

  return newUser;
};

// ============ APPLICATIONS & MILESTONES ============
export const getApplications = (): StudentApplication[] => {
  return getStored<StudentApplication[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
};

export const getStudentApplication = (studentId: string): StudentApplication | undefined => {
  const apps = getApplications();
  return apps.find(a => a.studentId === studentId);
};

export const createInitialApplicationForStudent = (user: User): StudentApplication => {
  const apps = getApplications();
  const cat = user.applicantCategory || (user.role === 'client' ? 'work_permit' : 'student');
  
  let programTitle = 'Undergraduate / Master Admission';
  let institution = 'Selected European University';
  let sType = 'Student Admission & Visa Processing';
  let defaultStage: MilestoneStage = 'initial_assessment';
  let milestonesList: Milestone[] = [];

  if (cat === 'work_permit') {
    programTitle = 'Type-D National Work Permit & Employment Visa';
    institution = 'European Employer Sponsorship & Logistics S.A.';
    sType = 'European Work Permit & Employment Visa';
    milestonesList = [
      {
        id: "m1",
        stage: "initial_assessment",
        title: "Trade Skills & Occupational Assessment",
        description: "Review of work experience certificates, trade qualifications, and passport.",
        status: "in_progress",
        actionRequired: "Upload prior employment verification and passport copy."
      },
      {
        id: "m2",
        stage: "labor_market_approval",
        title: "Labor Market Clearance & Employer Contract",
        description: "Employer lodgment with local labor office for work authorization approval.",
        status: "upcoming"
      },
      {
        id: "m3",
        stage: "work_permit_issued",
        title: "Official Government Work Permit Issuance",
        description: "Formal provincial or ministry work permit issued by foreign government authorities.",
        status: "upcoming"
      },
      {
        id: "m4",
        stage: "visa_file_prep",
        title: "Consular Visa File Preparation",
        description: "Medical clearance, police character certificate, travel insurance, and bank proof assembly.",
        status: "upcoming"
      },
      {
        id: "m5",
        stage: "embassy_interview",
        title: "Embassy Visa Appointment & Biometrics",
        description: "Consular submission at the foreign embassy in Islamabad.",
        status: "upcoming"
      },
      {
        id: "m6",
        stage: "visa_approved",
        title: "Work Visa Grant & Relocation Briefing",
        description: "Passport collection with endorsed work visa sticker and flight departure support.",
        status: "upcoming"
      }
    ];
  } else if (cat === 'visit_visa') {
    programTitle = 'Worldwide Visitor Visa (Multiple Entry)';
    institution = 'Tourism & Business Visitor Delegation';
    sType = 'Worldwide Visit & Tourist Visas';
    milestonesList = [
      {
        id: "m1",
        stage: "initial_assessment",
        title: "Travel Profile Assessment & Intent Vetting",
        description: "Detailed evaluation of travel history, family ties, and declared trip purpose.",
        status: "in_progress",
        actionRequired: "Provide tentative travel dates and host/tourism itinerary."
      },
      {
        id: "m2",
        stage: "financial_ties_vetting",
        title: "Financial Capacity & FBR Tax Audit",
        description: "Audit of 6-month bank statements, business tax returns, and property assets in Pakistan.",
        status: "upcoming"
      },
      {
        id: "m3",
        stage: "document_attestation",
        title: "NADRA FRC & Sponsor Invitation Verification",
        description: "Legalizing family links and cross-verifying host invitation or hotel bookings.",
        status: "upcoming"
      },
      {
        id: "m4",
        stage: "visa_file_prep",
        title: "Legal Cover Letter & Embassy File Assembly",
        description: "Drafting comprehensive submission letter and completing consular application forms.",
        status: "upcoming"
      },
      {
        id: "m5",
        stage: "biometrics_scheduled",
        title: "Biometrics Submission (Gerry's / VFS Global)",
        description: "Fingerprint and photo capture at visa application center in Islamabad.",
        status: "upcoming"
      },
      {
        id: "m6",
        stage: "visa_approved",
        title: "Visitor Visa Decision & Collection",
        description: "Receiving valid tourist/visit visa vignette from consular services.",
        status: "upcoming"
      }
    ];
  } else {
    milestonesList = [
      {
        id: "m1",
        stage: "initial_assessment",
        title: "Initial Profile & Eligibility Assessment",
        description: "Evaluating academic background, transcripts, and destination eligibility.",
        status: "in_progress",
        actionRequired: "Upload clear scans of your Matric/O-Level and F.Sc/A-Level transcripts."
      },
      {
        id: "m2",
        stage: "document_attestation",
        title: "IBCC, HEC & MOFA Attestation",
        description: "Legalization and attestation of certificates by Ministry of Foreign Affairs Islamabad.",
        status: "upcoming"
      },
      {
        id: "m3",
        stage: "university_admission",
        title: "University Admission Submission",
        description: "Official lodgment to faculty board and international admissions office.",
        status: "upcoming"
      },
      {
        id: "m4",
        stage: "offer_letter",
        title: "Offer & Ministry Invitation Letter",
        description: "Issuance of official invitation letter or unconditional university offer.",
        status: "upcoming"
      },
      {
        id: "m5",
        stage: "visa_file_prep",
        title: "Embassy Visa File Compilation",
        description: "Financial proof, health insurance, and embassy cover letter assembly.",
        status: "upcoming"
      },
      {
        id: "m6",
        stage: "embassy_interview",
        title: "Embassy Submission & Interview",
        description: "Appearance at the diplomatic mission in Islamabad.",
        status: "upcoming"
      },
      {
        id: "m7",
        stage: "visa_approved",
        title: "Visa Grant & Endorsement",
        description: "Endorsed passport collection from consular section.",
        status: "upcoming"
      },
      {
        id: "m8",
        stage: "pre_departure",
        title: "Pre-Departure Orientation & Transit",
        description: "Briefing at Islamabad office, accommodation placement, and airport welcome.",
        status: "upcoming"
      }
    ];
  }

  const newApp: StudentApplication = {
    id: `app-${Date.now()}`,
    studentId: user.id,
    studentName: user.name,
    studentEmail: user.email,
    studentPhone: user.phone || '0300-0000000',
    targetCountry: user.targetCountry || (cat === 'work_permit' ? 'Poland' : cat === 'visit_visa' ? 'United Kingdom' : 'Belarus'),
    category: cat,
    program: programTitle,
    university: institution,
    intake: 'Upcoming Intake 2026',
    serviceType: sType,
    currentStage: defaultStage,
    progressPercentage: 15,
    assignedCounselor: 'Sher Muhammad Khan',
    lastUpdated: new Date().toISOString(),
    caseRef: `MCS-${(user.targetCountry || 'PK').substring(0, 2).toUpperCase()}-${cat === 'work_permit' ? 'WP' : cat === 'visit_visa' ? 'VV' : 'ST'}-2026-${Math.floor(100 + Math.random() * 900)}`,
    milestones: milestonesList
  };

  apps.unshift(newApp);
  setStored(STORAGE_KEYS.APPLICATIONS, apps);

  // Sync to Firestore
  try {
    setDoc(doc(db, 'applications', newApp.id), cleanForFirestore(newApp)).catch(e => {
      console.warn('Firestore write application error:', e);
    });
  } catch (e) {
    console.warn('Firestore write application error:', e);
  }

  return newApp;
};

// Stage advancement by Admin
const STAGE_ORDER: MilestoneStage[] = [
  'initial_assessment',
  'document_attestation',
  'university_admission',
  'offer_letter',
  'visa_file_prep',
  'embassy_interview',
  'visa_approved',
  'pre_departure'
];

export const advanceApplicationMilestone = (
  appId: string, 
  stageToComplete: MilestoneStage, 
  remarks?: string
): StudentApplication | null => {
  const apps = getApplications();
  const appIndex = apps.findIndex(a => a.id === appId);
  if (appIndex === -1) return null;

  const app = { ...apps[appIndex] };
  const stageIdx = STAGE_ORDER.indexOf(stageToComplete);

  // Mark this milestone as completed
  app.milestones = app.milestones.map((m) => {
    if (m.stage === stageToComplete) {
      return {
        ...m,
        status: 'completed' as const,
        completedDate: new Date().toISOString().split('T')[0],
        remarks: remarks || m.remarks || 'Stage approved by Modernminds consulting team.'
      };
    }
    return m;
  });

  // Activate next stage if exists
  if (stageIdx < STAGE_ORDER.length - 1) {
    const nextStage = STAGE_ORDER[stageIdx + 1];
    app.currentStage = nextStage;
    app.milestones = app.milestones.map((m) => {
      if (m.stage === nextStage && m.status === 'upcoming') {
        return {
          ...m,
          status: 'in_progress' as const,
        };
      }
      return m;
    });
  } else {
    app.currentStage = 'pre_departure';
  }

  // Calculate percentage
  const completedCount = app.milestones.filter(m => m.status === 'completed').length;
  app.progressPercentage = Math.round((completedCount / app.milestones.length) * 100);
  app.lastUpdated = new Date().toISOString();

  apps[appIndex] = app;
  setStored(STORAGE_KEYS.APPLICATIONS, apps);

  // Sync to Firestore
  try {
    setDoc(doc(db, 'applications', app.id), cleanForFirestore(app)).catch(e => {
      console.warn('Firestore update application error:', e);
    });
  } catch (e) {
    console.warn('Firestore update application error:', e);
  }

  // Automated notification dispatched to student
  const completedMilestoneObj = app.milestones.find(m => m.stage === stageToComplete);
  addNotification({
    userId: app.studentId,
    title: `🚨 Milestone Update: ${completedMilestoneObj?.title || stageToComplete}`,
    message: remarks 
      ? `Update on case ${app.caseRef}: ${remarks}`
      : `Your application has progressed to stage: ${app.currentStage.replace(/_/g, ' ').toUpperCase()}. Check your dashboard for next action items.`,
    type: 'milestone'
  });

  return app;
};

// ============ DOCUMENTS ============
export const getDocuments = (): StudentDocument[] => {
  return getStored<StudentDocument[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
};

export const getStudentDocuments = (userId: string): StudentDocument[] => {
  const docs = getDocuments();
  return docs.filter(d => d.userId === userId);
};

export const uploadDocument = (
  userId: string,
  studentName: string,
  title: string,
  type: StudentDocument['type'],
  fileName: string,
  fileSize: string
): StudentDocument => {
  const docs = getDocuments();
  const newDoc: StudentDocument = {
    id: `doc-${Date.now()}`,
    userId,
    studentName,
    title,
    type,
    fileName,
    fileSize,
    uploadDate: new Date().toISOString().split('T')[0],
    status: 'under_review',
    notes: 'Submitted for verification by MCS legal & admission team.'
  };

  docs.unshift(newDoc);
  setStored(STORAGE_KEYS.DOCUMENTS, docs);

  // Sync to Firestore
  try {
    setDoc(doc(db, 'documents', newDoc.id), cleanForFirestore(newDoc)).catch(e => {
      console.warn('Firestore upload document error:', e);
    });
  } catch (e) {
    console.warn('Firestore upload document error:', e);
  }

  // Notify student
  addNotification({
    userId,
    title: "Document Uploaded Successfully",
    message: `"${title}" has been placed in the secure vault. Our case officer in Islamabad will verify it within 24 hours.`,
    type: "document"
  });

  return newDoc;
};

export const updateDocumentStatus = (
  docId: string, 
  status: DocumentStatus, 
  notes?: string
): StudentDocument | null => {
  const docs = getDocuments();
  const idx = docs.findIndex(d => d.id === docId);
  if (idx === -1) return null;

  const updatedDoc = { ...docs[idx], status, notes: notes || docs[idx].notes };
  docs[idx] = updatedDoc;
  setStored(STORAGE_KEYS.DOCUMENTS, docs);

  // Sync to Firestore
  try {
    setDoc(doc(db, 'documents', updatedDoc.id), cleanForFirestore(updatedDoc)).catch(e => {
      console.warn('Firestore update document error:', e);
    });
  } catch (e) {
    console.warn('Firestore update document error:', e);
  }

  // Automated notification to student
  const statusLabels: Record<DocumentStatus, string> = {
    verified: "✅ Verified & Approved",
    needs_revision: "⚠️ Needs Revision",
    under_review: "🔍 Under Review",
    pending: "⏳ Pending"
  };

  addNotification({
    userId: updatedDoc.userId,
    title: `Document Status: ${updatedDoc.title}`,
    message: `${statusLabels[status]}. ${notes ? `Officer note: "${notes}"` : ''}`,
    type: "document"
  });

  return updatedDoc;
};

// ============ NOTIFICATIONS ============
export const getNotifications = (userId?: string): NotificationItem[] => {
  const allNotifs = getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  if (!userId) return allNotifs;
  return allNotifs.filter(n => n.userId === 'all' || n.userId === userId);
};

export const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>): NotificationItem => {
  const notifs = getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  const newNotif: NotificationItem = {
    ...item,
    id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    isRead: false
  };

  notifs.unshift(newNotif);
  setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
  return newNotif;
};

export const markNotificationAsRead = (notifId: string): void => {
  const notifs = getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  const updated = notifs.map(n => n.id === notifId ? { ...n, isRead: true } : n);
  setStored(STORAGE_KEYS.NOTIFICATIONS, updated);
};

export const markAllNotificationsAsRead = (userId: string): void => {
  const notifs = getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  const updated = notifs.map(n => (n.userId === 'all' || n.userId === userId) ? { ...n, isRead: true } : n);
  setStored(STORAGE_KEYS.NOTIFICATIONS, updated);
};

// ============ CONTACT LEADS & APPLICATIONS (CROSS-DEVICE PERSISTENT) ============
export const getLeads = (): ContactInquiry[] => {
  return getStored<ContactInquiry[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
};

export const submitContactInquiry = (data: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry => {
  const leads = getLeads();
  const newLead: ContactInquiry = {
    ...data,
    id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  leads.unshift(newLead);
  setStored(STORAGE_KEYS.LEADS, leads);

  // 1. Immediately persist to Firebase Firestore collection 'leads'
  // This allows applications submitted from ANY device to show instantly on the Admin console!
  try {
    setDoc(doc(db, 'leads', newLead.id), cleanForFirestore(newLead)).catch(e => {
      console.warn('Firestore write lead error:', e);
    });
  } catch (e) {
    console.warn('Firestore write lead error:', e);
  }

  // 2. Also register a matching case in applications list so admin sees it in Cases tab as well!
  try {
    const isWorkPermit = (data.category === 'work_permit') || 
      data.serviceRequired.toLowerCase().includes('job') || 
      data.serviceRequired.toLowerCase().includes('work');
    const isVisitVisa = (data.category === 'visit_visa') || 
      data.serviceRequired.toLowerCase().includes('visit') || 
      data.serviceRequired.toLowerCase().includes('tourist');

    const appCategory = isWorkPermit ? 'work_permit' : isVisitVisa ? 'visit_visa' : 'student';

    const linkedApp: StudentApplication = {
      id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      studentId: `applicant-${Date.now()}`,
      studentName: data.fullName,
      studentEmail: data.email || `${data.phone.replace(/[^0-9]/g, '')}@applicant.modernminds.pk`,
      studentPhone: data.phone,
      targetCountry: data.targetCountry,
      category: appCategory,
      program: data.serviceRequired,
      university: data.city ? `${data.city} Applicant Lodgment` : 'Islamabad Lodgment Desk',
      intake: 'Active Application 2026',
      serviceType: data.serviceRequired,
      occupationOrField: data.qualification,
      currentStage: 'initial_assessment',
      progressPercentage: 15,
      assignedCounselor: 'Sher Muhammad Khan',
      lastUpdated: new Date().toISOString(),
      caseRef: `MCS-${(data.targetCountry || 'PK').substring(0, 2).toUpperCase()}-${appCategory === 'work_permit' ? 'WP' : appCategory === 'visit_visa' ? 'VV' : 'ST'}-2026-${Math.floor(100 + Math.random() * 900)}`,
      milestones: [
        {
          id: "m1",
          stage: "initial_assessment",
          title: "Initial Profile & Opportunity Assessment",
          description: `Applicant details: ${data.fullName}, City: ${data.city}. Requirement: ${data.serviceRequired}. Note: ${data.message || 'New applicant'}`,
          status: "in_progress",
          actionRequired: "Case officer verification and consular review."
        },
        {
          id: "m2",
          stage: appCategory === 'work_permit' ? "labor_market_approval" : "document_attestation",
          title: appCategory === 'work_permit' ? "Labor Clearance & Employer Filing" : "Document Attestation & Verification",
          description: "Preparation of official employer or admission submission.",
          status: "upcoming"
        },
        {
          id: "m3",
          stage: "visa_file_prep",
          title: "Embassy File Preparation",
          description: "Legal drafting, financial evaluation, and visa appointment.",
          status: "upcoming"
        },
        {
          id: "m4",
          stage: "visa_approved",
          title: "Visa Grant & Relocation",
          description: "Final visa sticker endorsement and departure coordination.",
          status: "upcoming"
        }
      ]
    };

    const currentApps = getApplications();
    currentApps.unshift(linkedApp);
    setStored(STORAGE_KEYS.APPLICATIONS, currentApps);

    setDoc(doc(db, 'applications', linkedApp.id), cleanForFirestore(linkedApp)).catch(e => {
      console.warn('Firestore write case app error:', e);
    });
  } catch (err) {
    console.warn('Case app auto-creation notice:', err);
  }

  // Notify admin
  addNotification({
    userId: 'all',
    title: `📩 New Opportunity Application: ${data.fullName} (${data.targetCountry})`,
    message: `Application submitted from ${data.city}. Phone: ${data.phone}. Service/Job: ${data.serviceRequired}.`,
    type: 'alert'
  });

  return newLead;
};

export const updateLeadStatus = (
  leadId: string, 
  status: ContactInquiry['status'], 
  notes?: string
): ContactInquiry | null => {
  const leads = getLeads();
  const idx = leads.findIndex(l => l.id === leadId);
  if (idx === -1) return null;

  const lead = { ...leads[idx], status, notes: notes || leads[idx].notes };
  leads[idx] = lead;
  setStored(STORAGE_KEYS.LEADS, leads);

  // Sync to Firestore
  try {
    setDoc(doc(db, 'leads', lead.id), cleanForFirestore(lead)).catch(e => {
      console.warn('Firestore update lead error:', e);
    });
  } catch (e) {
    console.warn('Firestore update lead error:', e);
  }

  return lead;
};

// ============ SITE CONTENT CMS ============
export const getSiteContent = (): SiteContent => {
  return getStored<SiteContent>(STORAGE_KEYS.SITE_CONTENT, DEFAULT_SITE_CONTENT);
};

export const updateSiteContent = (newContent: SiteContent): SiteContent => {
  setStored(STORAGE_KEYS.SITE_CONTENT, newContent);
  triggerStorageUpdate();

  // Sync to Firestore
  try {
    setDoc(doc(db, 'settings', 'site_content'), cleanForFirestore(newContent)).catch(e => {
      console.warn('Firestore write site_content error:', e);
    });
  } catch (e) {
    console.warn('Firestore write site_content error:', e);
  }

  return newContent;
};

export const resetSiteContent = (): SiteContent => {
  setStored(STORAGE_KEYS.SITE_CONTENT, DEFAULT_SITE_CONTENT);
  triggerStorageUpdate();

  try {
    setDoc(doc(db, 'settings', 'site_content'), cleanForFirestore(DEFAULT_SITE_CONTENT)).catch(e => {
      console.warn('Firestore reset site_content error:', e);
    });
  } catch (e) {
    console.warn('Firestore reset site_content error:', e);
  }

  return DEFAULT_SITE_CONTENT;
};

// ============ BRANDING: LOGO & FAVICON ============
export const applyFavicon = (faviconUrl?: string) => {
  if (typeof document === 'undefined') return;
  const targetHref = faviconUrl || '/logo.svg';
  let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = targetHref;
};

export const getBranding = (): BrandingSettings => {
  const branding = getStored<BrandingSettings>(STORAGE_KEYS.BRANDING, {
    brandName: 'Modernminds',
    brandTagline: 'Consulting Services Pvt.Ltd',
    logoUrl: undefined,
    faviconUrl: undefined
  });
  if (branding.faviconUrl) {
    applyFavicon(branding.faviconUrl);
  }
  return branding;
};

export const updateBranding = (newBranding: Partial<BrandingSettings>): BrandingSettings => {
  const current = getBranding();
  const merged: BrandingSettings = {
    ...current,
    ...newBranding
  };
  setStored(STORAGE_KEYS.BRANDING, merged);
  if (merged.faviconUrl) {
    applyFavicon(merged.faviconUrl);
  }
  triggerStorageUpdate();

  // Sync to Firestore
  try {
    setDoc(doc(db, 'settings', 'branding'), cleanForFirestore(merged)).catch(e => {
      console.warn('Firestore write branding error:', e);
    });
  } catch (e) {
    console.warn('Firestore write branding error:', e);
  }

  return merged;
};

export const resetBranding = (): BrandingSettings => {
  const defaultBranding: BrandingSettings = {
    brandName: 'Modernminds',
    brandTagline: 'Consulting Services Pvt.Ltd',
    logoUrl: undefined,
    faviconUrl: undefined
  };
  setStored(STORAGE_KEYS.BRANDING, defaultBranding);
  applyFavicon('/logo.svg');
  triggerStorageUpdate();

  try {
    setDoc(doc(db, 'settings', 'branding'), cleanForFirestore(defaultBranding)).catch(e => {
      console.warn('Firestore reset branding error:', e);
    });
  } catch (e) {
    console.warn('Firestore reset branding error:', e);
  }

  return defaultBranding;
};

// ============ GLOBAL DESTINATIONS (STUDY ABROAD COUNTRIES) ============
export const getTargetCountries = (): TargetCountryInfo[] => {
  return getStored<TargetCountryInfo[]>(STORAGE_KEYS.TARGET_COUNTRIES, TARGET_COUNTRIES);
};

export const saveTargetCountry = (country: TargetCountryInfo): TargetCountryInfo => {
  const list = getTargetCountries();
  const idx = list.findIndex(c => c.id === country.id);
  if (idx >= 0) {
    list[idx] = country;
  } else {
    list.push(country);
  }
  setStored(STORAGE_KEYS.TARGET_COUNTRIES, list);
  triggerStorageUpdate();

  // Sync to Firestore
  try {
    setDoc(doc(db, 'settings', 'target_countries'), { list: cleanForFirestore(list) }).catch(e => {
      console.warn('Firestore write target_countries error:', e);
    });
  } catch (e) {
    console.warn('Firestore write target_countries error:', e);
  }

  return country;
};

export const deleteTargetCountry = (id: string): void => {
  const list = getTargetCountries().filter(c => c.id !== id);
  setStored(STORAGE_KEYS.TARGET_COUNTRIES, list);
  triggerStorageUpdate();

  try {
    setDoc(doc(db, 'settings', 'target_countries'), { list: cleanForFirestore(list) }).catch(e => {
      console.warn('Firestore delete target_country error:', e);
    });
  } catch (e) {
    console.warn('Firestore delete target_country error:', e);
  }
};

export const resetTargetCountries = (): TargetCountryInfo[] => {
  setStored(STORAGE_KEYS.TARGET_COUNTRIES, TARGET_COUNTRIES);
  triggerStorageUpdate();

  try {
    setDoc(doc(db, 'settings', 'target_countries'), { list: cleanForFirestore(TARGET_COUNTRIES) }).catch(e => {
      console.warn('Firestore reset target_countries error:', e);
    });
  } catch (e) {
    console.warn('Firestore reset target_countries error:', e);
  }

  return TARGET_COUNTRIES;
};

// ============ GLOBAL EMPLOYMENT & TRAVEL DESTINATIONS ============
export const getWorkAndVisitCountries = (): WorkAndVisitCountryInfo[] => {
  return getStored<WorkAndVisitCountryInfo[]>(STORAGE_KEYS.WORK_AND_VISIT_COUNTRIES, WORK_AND_VISIT_COUNTRIES);
};

export const saveWorkAndVisitCountry = (country: WorkAndVisitCountryInfo): WorkAndVisitCountryInfo => {
  const list = getWorkAndVisitCountries();
  const idx = list.findIndex(c => c.id === country.id);
  if (idx >= 0) {
    list[idx] = country;
  } else {
    list.push(country);
  }
  setStored(STORAGE_KEYS.WORK_AND_VISIT_COUNTRIES, list);
  triggerStorageUpdate();

  // Sync to Firestore
  try {
    setDoc(doc(db, 'settings', 'work_visit_countries'), { list: cleanForFirestore(list) }).catch(e => {
      console.warn('Firestore write work_visit_countries error:', e);
    });
  } catch (e) {
    console.warn('Firestore write work_visit_countries error:', e);
  }

  return country;
};

export const deleteWorkAndVisitCountry = (id: string): void => {
  const list = getWorkAndVisitCountries().filter(c => c.id !== id);
  setStored(STORAGE_KEYS.WORK_AND_VISIT_COUNTRIES, list);
  triggerStorageUpdate();

  try {
    setDoc(doc(db, 'settings', 'work_visit_countries'), { list: cleanForFirestore(list) }).catch(e => {
      console.warn('Firestore delete work_visit_country error:', e);
    });
  } catch (e) {
    console.warn('Firestore delete work_visit_country error:', e);
  }
};

export const resetWorkAndVisitCountries = (): WorkAndVisitCountryInfo[] => {
  setStored(STORAGE_KEYS.WORK_AND_VISIT_COUNTRIES, WORK_AND_VISIT_COUNTRIES);
  triggerStorageUpdate();

  try {
    setDoc(doc(db, 'settings', 'work_visit_countries'), { list: cleanForFirestore(WORK_AND_VISIT_COUNTRIES) }).catch(e => {
      console.warn('Firestore reset work_visit_countries error:', e);
    });
  } catch (e) {
    console.warn('Firestore reset work_visit_countries error:', e);
  }

  return WORK_AND_VISIT_COUNTRIES;
};

// ============ EXECUTIVE LEADERSHIP & ADVISORS ============
export const getTeamMembers = (): TeamMember[] => {
  return getStored<TeamMember[]>(STORAGE_KEYS.TEAM_MEMBERS, TEAM_MEMBERS);
};

export const saveTeamMember = (member: TeamMember): TeamMember => {
  const list = getTeamMembers();
  const idx = list.findIndex(m => m.id === member.id);
  if (idx >= 0) {
    list[idx] = member;
  } else {
    list.push(member);
  }
  setStored(STORAGE_KEYS.TEAM_MEMBERS, list);
  triggerStorageUpdate();

  // Sync to Firestore
  try {
    setDoc(doc(db, 'settings', 'team_members'), { list: cleanForFirestore(list) }).catch(e => {
      console.warn('Firestore write team_members error:', e);
    });
  } catch (e) {
    console.warn('Firestore write team_members error:', e);
  }

  return member;
};

export const deleteTeamMember = (id: string): void => {
  const list = getTeamMembers().filter(m => m.id !== id);
  setStored(STORAGE_KEYS.TEAM_MEMBERS, list);
  triggerStorageUpdate();

  try {
    setDoc(doc(db, 'settings', 'team_members'), { list: cleanForFirestore(list) }).catch(e => {
      console.warn('Firestore delete team_member error:', e);
    });
  } catch (e) {
    console.warn('Firestore delete team_member error:', e);
  }
};

export const resetTeamMembers = (): TeamMember[] => {
  setStored(STORAGE_KEYS.TEAM_MEMBERS, TEAM_MEMBERS);
  triggerStorageUpdate();

  try {
    setDoc(doc(db, 'settings', 'team_members'), { list: cleanForFirestore(TEAM_MEMBERS) }).catch(e => {
      console.warn('Firestore reset team_members error:', e);
    });
  } catch (e) {
    console.warn('Firestore reset team_members error:', e);
  }

  return TEAM_MEMBERS;
};

// ============ JOB OPPORTUNITIES & DESIGN BROCHURES ============
export const getJobOpportunities = (): JobOpportunity[] => {
  return getStored<JobOpportunity[]>(STORAGE_KEYS.JOB_OPPORTUNITIES, INITIAL_JOB_OPPORTUNITIES);
};

export const saveJobOpportunity = (job: JobOpportunity): JobOpportunity => {
  const list = getJobOpportunities();
  const idx = list.findIndex(j => j.id === job.id);
  if (idx >= 0) {
    list[idx] = job;
  } else {
    list.unshift(job);
  }
  setStored(STORAGE_KEYS.JOB_OPPORTUNITIES, list);
  triggerStorageUpdate();

  // Sync to Firestore
  try {
    setDoc(doc(db, 'job_opportunities', job.id), cleanForFirestore(job)).catch(e => {
      console.warn('Firestore write job_opportunity error:', e);
    });
  } catch (e) {
    console.warn('Firestore write job_opportunity error:', e);
  }

  return job;
};

export const deleteJobOpportunity = (id: string): void => {
  const list = getJobOpportunities().filter(j => j.id !== id);
  setStored(STORAGE_KEYS.JOB_OPPORTUNITIES, list);
  triggerStorageUpdate();

  try {
    deleteDoc(doc(db, 'job_opportunities', id)).catch(e => {
      console.warn('Firestore delete job_opportunity error:', e);
    });
  } catch (e) {
    console.warn('Firestore delete job_opportunity error:', e);
  }
};

export const resetJobOpportunities = (): JobOpportunity[] => {
  setStored(STORAGE_KEYS.JOB_OPPORTUNITIES, INITIAL_JOB_OPPORTUNITIES);
  triggerStorageUpdate();

  try {
    INITIAL_JOB_OPPORTUNITIES.forEach(job => {
      setDoc(doc(db, 'job_opportunities', job.id), cleanForFirestore(job)).catch(() => {});
    });
  } catch (e) {
    console.warn('Firestore reset job_opportunities error:', e);
  }

  return INITIAL_JOB_OPPORTUNITIES;
};

// ============ PUBLIC DISCLAIMER POPUP (FRAUD & WARNING NOTICES) ============
export const getDisclaimerPopup = (): DisclaimerPopupSettings => {
  return getStored<DisclaimerPopupSettings>(STORAGE_KEYS.DISCLAIMER_POPUP, DEFAULT_DISCLAIMER_POPUP);
};

export const saveDisclaimerPopup = (settings: DisclaimerPopupSettings): DisclaimerPopupSettings => {
  const updated: DisclaimerPopupSettings = {
    ...settings,
    updatedAt: new Date().toISOString()
  };
  setStored(STORAGE_KEYS.DISCLAIMER_POPUP, updated);
  triggerStorageUpdate();

  // Sync to Firestore so it shows immediately across all devices!
  try {
    setDoc(doc(db, 'settings', 'disclaimer_popup'), cleanForFirestore(updated)).catch(e => {
      console.warn('Firestore write disclaimer_popup error:', e);
    });
  } catch (e) {
    console.warn('Firestore write disclaimer_popup error:', e);
  }

  return updated;
};

export const resetDisclaimerPopup = (): DisclaimerPopupSettings => {
  setStored(STORAGE_KEYS.DISCLAIMER_POPUP, DEFAULT_DISCLAIMER_POPUP);
  triggerStorageUpdate();

  try {
    setDoc(doc(db, 'settings', 'disclaimer_popup'), cleanForFirestore(DEFAULT_DISCLAIMER_POPUP)).catch(e => {
      console.warn('Firestore reset disclaimer_popup error:', e);
    });
  } catch (e) {
    console.warn('Firestore reset disclaimer_popup error:', e);
  }

  return DEFAULT_DISCLAIMER_POPUP;
};
