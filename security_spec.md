# Security Specification & Test Payloads

## Core Objectives
1. Allow public visitors from any device to submit inquiries and job opportunity applications to `/leads/{leadId}`.
2. Allow anyone to read and write `/leads`, `/applications`, `/documents`, `/job_opportunities`, and `/settings` during this operational stage to synchronize cross-device state seamlessly between users, visitors, and admin consoles.
3. Validate schema constraints: IDs must be bounded, strings constrained, timestamps provided.

## Test Payloads
- **Valid Lead Submission**:
  ```json
  {
    "id": "lead-1718000000000",
    "fullName": "Muhammad Tariq",
    "email": "tariq@gmail.com",
    "phone": "0300-1234567",
    "city": "Rawalpindi",
    "targetCountry": "Poland",
    "serviceRequired": "Work Permit & Job: Warehouse Logistics Specialist",
    "category": "work_permit",
    "qualification": "Diploma in Supply Chain",
    "message": "Applying for Poland Warehouse opening",
    "createdAt": "2026-10-09T09:00:00Z",
    "status": "new"
  }
  ```
- **Valid Disclaimer Settings Update**:
  ```json
  {
    "id": "disclaimer_popup",
    "isEnabled": true,
    "warningLevel": "critical",
    "badgeText": "OFFICIAL FRAUD ALERT",
    "title": "Public Caution & Legal Notice",
    "subtitle": "Impersonation & Unauthorized Dealings Warning",
    "personName": "Imposter Name",
    "personRoleOrAlias": "Unauthorized Agent",
    "warningMessage": "Warning message...",
    "updatedAt": "2026-10-09T09:00:00Z"
  }
  ```
