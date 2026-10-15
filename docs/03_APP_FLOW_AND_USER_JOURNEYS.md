# Modern Minds Consultants (MCSPK)
## App Flow & User Journeys Document

---

### Document Control
- **Document Version:** 2.0.0
- **Scope:** Complete Interaction Flow, Page Navigation, State Machines & Modal Architecture
- **Platforms Covered:** Desktop Web, Mobile Web, and Android APK

---

## 1. High-Level Sitemap & Navigation Architecture

```
                                [ APPLICATION ENTRY ]
                                          |
                +-------------------------+-------------------------+
                |                                                   |
        [ PUBLIC WEBSITE ]                                  [ MOBILE APK / APP ]
                |                                                   |
    +-----------+-----------+                               +-------+-------+
    |           |           |                               |       |       |
[Home Hero] [About Us] [Why Choose]                 [Splash / Welcome Screen]
    |           |           |                               |
[Target Countries (Study)]                                  v
[Work & Visit Visas]                                [Bottom Tab Navigation]
[Overseas Job Catalog]                                  |
[Team & Leadership]                 +-----------+-----------+-----------+
[Contact / Consultation Form]       |           |           |           |
[Footer & Legal Disclaimers]   [Home Tab]  [Explore]  [Applications] [Profile]
                |                   |           |           |           |
                +-------------------+-----------+-----------+-----------+
                                    |
                            [ PORTAL MODAL ]
                                    |
            +-----------------------+-----------------------+
            |                                               |
     [ STUDENT / CLIENT ]                            [ ADMIN CONSOLE ]
            |                                               |
    +-------+-------+                       +---------------+---------------+
    |       |       |                       |       |       |       |       |
[Case]  [Vault] [Alerts]                 [Leads] [Cases] [Vault] [Jobs] [CMS]
```

---

## 2. Core User Journeys

### User Journey 1: Overseas Job Seeker (From Discovery to Submission)

```
[ Step 1: Browse Jobs ]
Visitor lands on Website or opens APK -> Scrolls to "Job Opportunities" section.
Filters by Country (e.g. Romania) or Sector (Construction / Hospitality).
Reads vacancy count, salary package (e.g. €850 - €1,200/mo), and accommodation perks.
       |
       v
[ Step 2: Initiate Application ]
Clicks "Apply for Job" or "Inquire Now" on the job card.
Modal / Bottom Sheet opens with pre-filled Job Title & Country.
       |
       v
[ Step 3: Complete Mobile-Friendly Form ]
Enters:
- Full Name
- WhatsApp Phone Number (with Pakistan +92 flag picker)
- City of Residence
- Relevant Experience (e.g., "4 Years Pipe Welder")
- Optional: Uploads resume / passport photo directly from phone camera.
       |
       v
[ Step 4: Submission & Instant Cloud Sync ]
Clicks "Submit Application".
- Payload sanitized and saved to Firestore `/leads/{leadId}`.
- Generates instant client confirmation: "Application Submitted! Ref: MCS-LD-xxxx".
- Counselor receives real-time notification on Admin Dashboard.
       |
       v
[ Step 5: Follow-Up & Client Portal Login ]
Counselor calls applicant on WhatsApp, approves initial eligibility, and creates Case File.
Applicant receives credentials via SMS/Email to log in and track labor permit milestones.
```

---

### User Journey 2: Study Abroad Applicant (Milestone & Vault Progression)

```
[ Step 1: Student Login ]
Student opens Portal Modal on Web or APK -> Selects "Applicant / Student Login".
Enters Case ID or Email + Password.
       |
       v
[ Step 2: Dashboard Overview ]
Displays:
- Active University & Degree (e.g. "B.Sc Software Engineering - Berlin Technical University")
- Intake: "Winter Intake (October)"
- Overall Case Progress Ring: "58% Complete"
- Current Stage: "Visa File Preparation"
       |
       v
[ Step 3: Document Vault Check ]
Student navigates to "Document Vault":
- Passport: [VERIFIED - Green Checkmark]
- Matric / Inter Certificates: [VERIFIED - Green Checkmark]
- Bank Statement: [NEEDS REVISION - Amber Warning]
  -> Admin Remark: "Please provide last 6 months statement with bank branch stamp."
       |
       v
[ Step 4: Re-uploading Document ]
Student taps "Re-upload" -> Snaps new stamped bank statement using phone camera.
Status changes to [UNDER REVIEW].
       |
       v
[ Step 5: Milestone Stage Update Notification ]
Admin approves document and advances stage from "Visa File Prep" to "Biometrics Scheduled".
Student receives immediate in-app notification:
"Your embassy biometrics appointment is confirmed for Nov 14 at Gerry's Islamabad."
```

---

### User Journey 3: Administrator Daily Operations Flow

```
[ Step 1: Admin Authentication ]
Admin accesses `/portal` -> Switches to "Admin Access".
Enters username (e.g., `admin@modernminds.pk`) and encrypted password.
Passes local/cloud authentication check.
       |
       v
[ Step 2: Leads Management Tab ]
Admin reviews newly arrived leads submitted from any device:
- Badges show [NEW], [CONTACTED], [ASSESSMENT SCHEDULED].
- Search & filter by target country, date, or phone number.
- One-click "Convert Lead to Active Case" button:
  -> Automatically transfers lead data into `/applications/{applicationId}`
  -> Auto-generates Case Reference number (e.g., `MCS-PK-2026-9104`).
       |
       v
[ Step 3: Active Cases & Milestone Slider ]
Admin selects an active student:
- Drags stage slider through the 12 stages.
- Adds counselor notes: "NOC obtained from MOFA, awaiting Embassy dispatch."
- Percentage recalculates automatically.
       |
       v
[ Step 4: Content Management & Global Settings ]
Admin uses sub-tabs to customize public website content:
- "Job Opportunities": Publishes new seasonal vacancies in Poland.
- "Work & Visit Destinations": Updates visa processing fees or processing times.
- "Disclaimer Settings": Enables the "Government Regulatory Disclaimer" popup banner.
Changes instantly propagate to all web and mobile visitors via Firestore.
```

---

## 3. State Machines & Progression Logic

### 3.1 Lead Lifecycle State Machine
```
   [ NEW ] 
      |
      |--> (Counselor initiates call)
      v
 [ CONTACTED ]
      |
      +---> [ UNQUALIFIED / CLOSED ] (Does not meet minimum requirements)
      |
      +---> [ ASSESSMENT SCHEDULED ] (Invited to office / Zoom consultation)
                  |
                  |--> (Agreement signed & retainer paid)
                  v
             [ CONVERTED ] (Transferred to Active Application)
```

### 3.2 Document Vault State Machine
```
   [ PENDING ] (Awaiting applicant upload)
        |
        |--> (User uploads file)
        v
 [ UNDER REVIEW ]
        |
        +---> [ NEEDS REVISION ] (Blurry photo, missing stamp)
        |           |
        |           +--> (User re-uploads file) ---> [ UNDER REVIEW ]
        |
        +---> [ VERIFIED ] (Accepted by counselor)
```

### 3.3 Case Milestone 12-Stage State Machine
```
Stage 01: Initial Assessment
    v
Stage 02: Document Attestation (IBCC / HEC / MOFA)
    v
Stage 03: University Admission Application
    v
Stage 04: Offer Letter / Admission Notice Issued
    v
Stage 05: Labor Market / Ministry Approval (for Work Permits)
    v
Stage 06: Work Permit / Visa Sponsor Authorization
    v
Stage 07: Financial Ties & Bank Statement Vetting
    v
Stage 08: Visa File Preparation & Cover Letter
    v
Stage 09: Biometrics & Appointment Scheduled
    v
Stage 10: Embassy Interview & Document Submission
    v
Stage 11: Visa Approved & Stamped
    v
Stage 12: Pre-Departure Briefing & Flight Arrival
```

---

## 4. Error Handling & Edge Case Flows

### 4.1 Offline Network Connectivity Flow
1. User attempts to submit a form while in an area with poor connectivity.
2. System detects `navigator.onLine === false` or Firestore write failure.
3. Form payload is saved to local device indexed storage / LocalStorage queue.
4. User receives friendly banner: *"Saved offline! Your application will automatically sync once your connection returns."*
5. Background service worker / listener flushes queue upon network reconnection.

### 4.2 Large File Upload Protection
1. User selects a 50MB video or unsupported file type (.exe, .zip).
2. Client-side validator rejects file immediately before network upload.
3. Allowed formats: `.pdf`, `.jpg`, `.jpeg`, `.png`. Max file size: 10MB per document.
4. User receives clear error toast: *"File exceeds 10MB limit. Please compress your document."*
