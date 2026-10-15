# Modern Minds Consultants (MCSPK)
## Backend Schema & Security Document

---

### Document Control
- **Database Engine:** Google Cloud Firestore (NoSQL Document Store)
- **Database ID:** `ai-studio-modernmindsconsu-6c8498f5-62f9-48e6-837d-024d59c0509a`
- **Security Specification:** Role-Based Access Control (RBAC) + Document-Level Validation Rules
- **Document Version:** 2.0.0

---

## 1. Firestore Database Entity Model

The backend leverages a document-oriented structure tailored for high-speed read throughput and real-time synchronization across Web and Android APK clients.

```
Firestore Root
│
├── /leads/{leadId}
│     └── (Public inquiries, job applications, cross-device contact forms)
│
├── /applications/{applicationId}
│     └── (Official active cases, 12-stage milestone records, counselor assignments)
│
├── /documents/{documentId}
│     └── (Uploaded applicant records: passports, degrees, bank statements, attestation status)
│
├── /job_opportunities/{jobId}
│     └── (Overseas job postings: Romania, Poland, Gulf, salaries, requirements)
│
└── /settings/{settingId}
      ├── [settingId: 'disclaimer']    -> Regulatory disclaimer popup configuration
      ├── [settingId: 'branding']      -> Logo, brand name, tagline
      ├── [settingId: 'destinations']  -> Target study & work visa countries
      ├── [settingId: 'team']          -> Leadership bios and counselors
      └── [settingId: 'admin_security'] -> Hashed credentials & security settings
```

---

## 2. Detailed Collection Schemas

### 2.1 Collection: `/leads`
Captures initial inquiries and job applications submitted from website forms and the mobile APK.

| Field Name | Type | Required | Description | Example Value |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique lead identifier | `"lead_1728901234"` |
| `fullName` | `string` | Yes | Applicant's legal full name | `"Muhammad Tariq"` |
| `email` | `string` | No | Contact email address | `"tariq.welder@gmail.com"` |
| `phone` | `string` | Yes | Primary phone / WhatsApp number | `"+92 300 1234567"` |
| `city` | `string` | Yes | Residential city in Pakistan | `"Faisalabad"` |
| `targetCountry` | `string` | Yes | Desired destination country | `"Romania"` |
| `category` | `string` | Yes | Program stream (`student`, `work_permit`, `visit_visa`) | `"work_permit"` |
| `serviceRequired` | `string` | Yes | Specific role or course applied for | `"Industrial Welder (Pipe/MIG)"` |
| `qualification` | `string` | No | Educational background | `"Matric + DAE Mechanical"` |
| `experienceYears` | `string` | No | Relevant employment experience | `"5 Years"` |
| `message` | `string` | No | Applicant inquiry note or remarks | `"Urgent intake preferred"` |
| `status` | `string` | Yes | Processing status (`new`, `contacted`, `assessment_scheduled`, `closed`) | `"new"` |
| `notes` | `string` | No | Internal counselor evaluation notes | `"Called on WhatsApp; invited for test"` |
| `createdAt` | `string` | Yes | ISO-8601 creation timestamp | `"2026-10-15T08:30:00.000Z"` |

---

### 2.2 Collection: `/applications`
Represents official registered client cases tracked through the 12-stage milestone progression pipeline.

| Field Name | Type | Required | Description | Example Value |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique application document ID | `"app_884109"` |
| `studentId` | `string` | Yes | Associated user/client ID | `"usr_tariq_99"` |
| `studentName` | `string` | Yes | Full applicant name | `"Muhammad Tariq"` |
| `studentEmail` | `string` | Yes | Client login email | `"tariq@client.pk"` |
| `studentPhone` | `string` | Yes | Verified phone number | `"+92 300 1234567"` |
| `caseRef` | `string` | Yes | Official case reference number | `"MCS-PK-2026-8841"` |
| `targetCountry` | `string` | Yes | Destination country | `"Romania"` |
| `category` | `string` | Yes | `work_permit` \| `student` \| `visit_visa` | `"work_permit"` |
| `program` | `string` | Yes | Position or academic course | `"Skilled Pipe Welder"` |
| `university` | `string` | No | Employer or university institution | `"Construcții Generale S.R.L"` |
| `intake` | `string` | Yes | Cohort or departure target | `"Q1 2027"` |
| `serviceType` | `string` | Yes | Type of visa processing | `"Full-Service Work Permit"` |
| `currentStage` | `string` | Yes | Active milestone identifier (see 2.2.1) | `"labor_market_approval"` |
| `progressPercentage` | `number` | Yes | Calculated progress (0 - 100) | `45` |
| `assignedCounselor` | `string` | Yes | Case manager name | `"Fatima Noor"` |
| `milestones` | `array` | Yes | Embedded milestone history objects | `[ { stage, status, remarks, ... } ]` |
| `lastUpdated` | `string` | Yes | ISO-8601 last modification timestamp | `"2026-10-15T10:15:00.000Z"` |

#### 2.2.1 Milestone Stage Enumeration
`initial_assessment` $\rightarrow$ `document_attestation` $\rightarrow$ `university_admission` $\rightarrow$ `offer_letter` $\rightarrow$ `labor_market_approval` $\rightarrow$ `work_permit_issued` $\rightarrow$ `financial_ties_vetting` $\rightarrow$ `visa_file_prep` $\rightarrow$ `biometrics_scheduled` $\rightarrow$ `embassy_interview` $\rightarrow$ `visa_approved` $\rightarrow$ `pre_departure`.

---

### 2.3 Collection: `/documents`
Houses client document vault submissions, verification verdicts, and counselor feedback.

| Field Name | Type | Required | Description | Example Value |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique document ID | `"doc_pass_991"` |
| `userId` | `string` | Yes | Owner user ID | `"usr_tariq_99"` |
| `studentName` | `string` | Yes | Applicant name | `"Muhammad Tariq"` |
| `title` | `string` | Yes | Readable title of document | `"Original Passport (First 4 Pages)"` |
| `type` | `string` | Yes | Standard document type (see below) | `"passport"` |
| `fileName` | `string` | Yes | Uploaded file name | `"passport_tariq_scan.pdf"` |
| `fileSize` | `string` | Yes | Human-readable size | `"2.4 MB"` |
| `uploadDate` | `string` | Yes | Date of upload | `"2026-10-12"` |
| `status` | `string` | Yes | `verified` \| `under_review` \| `needs_revision` \| `pending` | `"verified"` |
| `notes` | `string` | No | Counselor feedback or stamp notes | `"Checked valid until 2031"` |
| `fileUrl` | `string` | No | Cloud Storage download URL | `"https://storage.googleapis.com/..."` |

**Supported Document Types:**
`passport`, `academic_matric`, `academic_fsc_degree`, `bank_statement`, `police_clearance`, `medical_fitness`, `language_test`, `sop_essay`, `work_experience`, `employment_contract`, `tax_fbr_record`, `hotel_ticket_booking`, `travel_insurance`, `sponsorship_letter`, `other`.

---

### 2.4 Collection: `/job_opportunities`
Maintains verified international employment openings published by consultancy administrators.

| Field Name | Type | Required | Description | Example Value |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique job ID | `"job_ro_weld_01"` |
| `title` | `string` | Yes | Position title | `"Structural Mig/Mag Welder"` |
| `country` | `string` | Yes | Destination country | `"Romania"` |
| `countryFlag` | `string` | Yes | Flag icon / ISO code | `"🇷🇴"` |
| `sector` | `string` | Yes | Industry sector | `"Heavy Engineering / Construction"` |
| `companyName` | `string` | Yes | Sponsoring company | `"Transilvania Steel S.A."` |
| `location` | `string` | Yes | City & region | `"Brașov, Romania"` |
| `salary` | `string` | Yes | Monthly compensation package | `"€900 - €1,200 / Month"` |
| `vacanciesCount` | `string` | Yes | Available quota | `"15 Openings"` |
| `contractDuration` | `string` | Yes | Visa & contract tenure | `"2 Years Renewable"` |
| `accommodationBenefits` | `string` | Yes | Furnished room, transport, food | `"Free Housing + Utilities Paid"` |
| `deadline` | `string` | Yes | Application cut-off date | `"November 30, 2026"` |
| `postedAt` | `string` | Yes | Publishing date | `"2026-10-01"` |

---

### 2.5 Collection: `/settings`
Global system configuration and Content Management System (CMS) documents:
1. `settings/disclaimer`: `{ isEnabled: boolean, title: string, content: string, requireAcceptance: boolean, version: string }`
2. `settings/branding`: `{ logoUrl: string, faviconUrl: string, brandName: string, brandTagline: string }`
3. `settings/destinations`: Structured list of Study and Work visa countries with processing times and requirements.
4. `settings/team`: Leadership profiles, qualifications, and advisor contact details.
5. `settings/admin_security`: Hashed admin passwords, session timeout parameters, and authorized email rosters.

---

## 3. Firestore Security Rules (`firestore.rules`)

The following rules enforce strict multi-tier security, allowing public inquiries while locking down administrative controls:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to verify admin credentials via custom claims or token
    function isAdmin() {
      return request.auth != null && (
        request.auth.token.role == 'admin' || 
        request.auth.token.email.matches('.*@modernminds\\.pk$')
      );
    }
    
    // Helper function to verify student ownership
    function isOwner(userId) {
      return request.auth != null && request.auth.uid == userId;
    }

    // 1. Leads Collection: Any web/mobile visitor can create an inquiry
    match /leads/{leadId} {
      allow create: if request.resource.data.fullName is string &&
                       request.resource.data.phone is string &&
                       request.resource.data.targetCountry is string;
      allow read, update, delete: if isAdmin();
    }

    // 2. Applications Collection: Students read own case; Admins have full access
    match /applications/{applicationId} {
      allow read: if isAdmin() || (request.auth != null && resource.data.studentId == request.auth.uid);
      allow create, update, delete: if isAdmin();
    }

    // 3. Document Vault: Students can view and upload their own documents; Admins verify
    match /documents/{documentId} {
      allow read: if isAdmin() || (request.auth != null && resource.data.userId == request.auth.uid);
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if isAdmin() || (request.auth != null && resource.data.userId == request.auth.uid && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['fileUrl', 'fileName', 'fileSize', 'status']));
      allow delete: if isAdmin();
    }

    // 4. Job Opportunities: Publicly readable; Admin editable
    match /job_opportunities/{jobId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // 5. Global Settings: Publicly readable for dynamic site config; Admin editable
    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

---

## 4. Indexing & Query Optimization

To maintain sub-100ms response times on both desktop and mobile networks, the following **Firestore Composite Indexes** are established:

1. **Leads Inquiry Stream:**
   - Collection: `leads`
   - Fields: `status` (Ascending) + `createdAt` (Descending)
   - Usage: Admin inbox sorting new leads chronologically.

2. **Applications by Country & Stage:**
   - Collection: `applications`
   - Fields: `targetCountry` (Ascending) + `currentStage` (Ascending) + `lastUpdated` (Descending)
   - Usage: Filtering students awaiting biometrics for specific embassies (e.g. Romania / Germany).

3. **Active Job Vacancies:**
   - Collection: `job_opportunities`
   - Fields: `country` (Ascending) + `deadline` (Ascending)
   - Usage: Mobile job catalog filtering upcoming expirations.
