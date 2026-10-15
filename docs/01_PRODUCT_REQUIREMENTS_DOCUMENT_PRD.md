# Modern Minds Consultants (MCSPK)
## Product Requirements Document (PRD)

---

### Document Control
- **Product Name:** Modern Minds Consultants Portal & Mobile Ecosystem (MCSPK)
- **Version:** 2.0.0 (Web & Mobile Android APK Unified Platform)
- **Author:** Senior Product Engineering & Architecture Team
- **Status:** Approved / Active Specification
- **Target Audience:** Overseas Job Seekers, International Study Applicants, Visit Visa Clients, Legal/Educational Counselors, System Administrators

---

## 1. Executive Summary & Vision

### 1.1 Vision Statement
Modern Minds Consultants (MCSPK) is a centralized, digital visa consultancy and immigration management platform. The platform bridges the gap between Pakistani applicants (students, skilled workers, and travelers) and global opportunities (Europe, UK, Canada, Australia, Gulf / Middle East) through end-to-end case transparency, digitized document vaults, real-time milestone tracking, and a unified multi-device portal.

### 1.2 Core Problem Statement
Traditional visa and education consultancies suffer from:
1. **Opaque Case Tracking:** Applicants have no visibility into embassy submissions, offer letters, or biometric dates, leading to continuous anxiety and phone inquiries.
2. **Disjointed Document Submissions:** Files sent via WhatsApp or physical photo copies frequently get misplaced or fail quality criteria (attestation, translation).
3. **Device Inconsistency:** Inquiries and applications submitted on mobile devices often fail to synchronize with administrative consoles on desktop.
4. **Manual Record Keeping:** Inquiries, leads, and job postings are kept in disparate spreadsheets, delaying responses and lead conversions.

### 1.3 Value Proposition
- **For Applicants:** Self-service mobile & web portal to browse verified overseas jobs and study programs, apply with single-tap forms, upload required documents, and track milestones in real time.
- **For Management & Counselors:** Centralized administrative control center to manage leads, vet documents, update case milestones, configure international listings, customize website disclaimers, and publish verified employment opportunities.

---

## 2. User Personas & Target Demographics

### Persona 1: Skilled Work Permit Applicant (Ahmad Khan, 28)
- **Background:** Welder / Electrician based in Gujranwala seeking employment in Romania / Saudi Arabia.
- **Device:** Android Smartphone (Entry-to-Mid range, 4G mobile data).
- **Needs:** Fast job brochure browsing, clear salary and accommodation breakdown, easy one-touch mobile application, step-by-step tracking of Labor Market Approval and Visa Issuance.

### Persona 2: Study Abroad Student (Ayesha Malik, 21)
- **Background:** F.Sc Pre-Engineering graduate in Lahore targeting Bachelor’s programs in Germany / UK.
- **Device:** Laptop for university research; Android phone for everyday alerts.
- **Needs:** Intake deadlines, university fee structures, document vault for degree attestation, SOP drafting guidance, and biometrics interview preparation.

### Persona 3: Visit / Tourist Visa Traveler (Zubair Siddiqui, 42)
- **Background:** Businessman in Karachi applying for Schengen business/visit visa.
- **Device:** iPhone & Office PC.
- **Needs:** Vetting of financial ties, hotel & flight reservation records, fast consultation booking, legal disclaimer clarity.

### Persona 4: Lead Counselor / Admin (Fatima Noor, Senior Advisor)
- **Background:** Consultancy administrator operating from Islamabad HQ.
- **Device:** Desktop multi-monitor workstation.
- **Needs:** Real-time synchronized inbox of leads, rapid document approval/rejection with remarks, milestone progression sliders, overseas job publisher, and CMS branding controls.

---

## 3. Product Scope: Web Application vs. Android APK

| Functional Area | Web Application (Public + Portal) | Android APK (Client-Centric) |
| :--- | :--- | :--- |
| **Public Landing Page** | Full responsive hero, interactive statistics, team bio, Google Maps office location, full marketing copy. | Lightweight Welcome splash, featured highlight carousels, instant consultation dialer. |
| **Job & Program Discovery** | Filterable multi-column grid, PDF brochure previews, detailed requirements modals. | Segmented horizontal category chips, card lists, bottom-sheet filters, direct "Apply Now" button. |
| **Lead / Contact Intake** | Multi-field comprehensive inquiry form with dynamic category toggles. | Progressive 3-step wizard with camera snapshot attachments and auto-filled phone/email. |
| **Applicant Portal** | Dashboard with side navigation: Documents, Milestones, Notifications, Profile, Payments. | Bottom navigation bar: [Home], [Explore], [My Applications], [Vault], [Profile]. |
| **Document Vault** | Drag-and-drop file uploader, multi-file batch upload, inline PDF previewer. | Native camera document capture with crop/rotate, PDF file picker, status chips (`Verified`, `Needs Revision`). |
| **Case Milestone Tracker** | Full 12-stage interactive stepper with counselor remarks, timestamps, and history log. | Vertical mobile milestone timeline with push notification alerts on stage changes. |
| **Admin Management Console** | Comprehensive multi-tab CRUD suite (Leads, Cases, Documents, Jobs, Team, Disclaimer, Security). | Secure read-only supervisor view + push notifications for urgent new leads and quick status toggles. |

---

## 4. Key Functional Requirements (FR)

### FR-01: Multi-Category Opportunity Catalog
- The system must showcase verified opportunities across three core streams:
  1. **Higher Education (Study Abroad):** UK, Germany, Canada, Australia, Ireland, Italy, Turkey, Cyprus, Malaysia.
  2. **Skilled Work Permits:** Romania, Poland, Hungary, Saudi Arabia, UAE, Qatar, Japan.
  3. **Work & Visit Visas:** Schengen, UK Standard Visitor, US B1/B2, Canada Tourist, Dubai Express.
- Each listing must specify: Country, Sector/Course, Salary/Tuition, Vacancy/Intake count, Accommodation benefits, and Deadline.

### FR-02: Universal Lead & Application Intake
- Visitors must be able to submit inquiries from any device without requiring prior registration.
- Submissions must instantly persist to centralized Firebase Firestore (`/leads` collection) and trigger real-time reactive sync on the Admin Console.
- Duplicate prevention: Throttling duplicate submissions from identical phone/email combinations within 60 seconds.

### FR-03: Client Case Tracking & Milestone Progression
- Every active applicant receives a unique Case Reference (e.g., `MCS-PK-2026-8841`).
- Milestones span 12 standardized stages:
  1. `initial_assessment`
  2. `document_attestation`
  3. `university_admission`
  4. `offer_letter`
  5. `labor_market_approval`
  6. `work_permit_issued`
  7. `financial_ties_vetting`
  8. `visa_file_prep`
  9. `biometrics_scheduled`
  10. `embassy_interview`
  11. `visa_approved`
  12. `pre_departure`
- Progress must calculate dynamically as a percentage (0% to 100%) based on completed milestones.

### FR-04: Digital Document Vault
- Support 14 document categories including Passport, Matric/Inter Certificates, Degree, Bank Statement, Police Clearance, Medical Fitness, Language Test (IELTS/PTE), and Travel Insurance.
- Document statuses: `verified` (Green), `under_review` (Amber), `needs_revision` (Red), `pending` (Slate).
- When a document is marked `needs_revision`, the admin must be able to attach mandatory explanatory remarks, alerting the applicant.

### FR-05: Real-Time Notification Center
- Broadcast alerts for all users (e.g. "Embassy intake open for September") or targeted alerts for individual students (e.g. "Your Work Permit has been approved!").
- Notification types: `milestone`, `document`, `system`, `alert`.
- Unread notification badges visible on header and mobile bottom tab.

### FR-06: Administrative CMS & Content Customization
- Dynamic content updates without redeploying code:
  - Add, edit, archive overseas job openings.
  - Modify country eligibility criteria and minimum visa requirements.
  - Update consultancy leadership profiles and counselor bios.
  - Manage mandatory Legal Disclaimer popups with toggleable active dates and acknowledgment logs.
  - Change administrator credentials and security passcodes.

---

## 5. Non-Functional Requirements (NFR)

### 5.1 Performance & Responsiveness
- **Initial Contentful Paint (FCP):** < 1.2s on 4G networks.
- **Real-Time Latency:** Changes in Firestore synced across open browser tabs and mobile devices within < 800ms.
- **Offline Resilience:** Local caching enables offline inspection of active milestones and cached documents.

### 5.2 Security & Compliance
- **Data Encryption:** TLS 1.3 in transit; AES-256 at rest in Firebase Firestore.
- **Access Control (RBAC):** Strict Firestore security rules separating public lead submissions, student private documents, and administrative modifications.
- **Credential Hygiene:** Hashed admin passcodes; zero API secrets leaked to client-side bundles.
- **Privacy:** Strict applicant document isolation ensuring Student A cannot view Student B’s records.

### 5.3 Scalability & Reliability
- Zero-downtime serverless architecture hosted on globally distributed CDNs (Vercel edge for Web; Google Play APK for Mobile).
- Scalable database capable of supporting 50,000+ monthly active applicants without degradation.

---

## 6. Success Metrics & Key Performance Indicators (KPIs)
- **Lead Capture Conversion:** $\ge 12\%$ of visitors submitting an eligibility inquiry or job application.
- **Drop-off Reduction:** Less than 5% drop-off on mobile 3-step application forms.
- **Support Inquiries Reduction:** 45% decrease in phone status calls through self-service milestone tracking.
- **Admin Turnaround:** Average time to review and update applicant stage reduced from 48 hours to under 4 hours.
