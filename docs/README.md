# Modern Minds Consultants (MCSPK)
## Complete Technical & Product Documentation Suite

Welcome to the official technical and architectural documentation suite for **Modern Minds Consultants (MCSPK)**. This repository houses the unified Web and Mobile Android APK platform, backed by Google Cloud Firebase Firestore.

---

### Documentation Index

| # | Document | File Path | Focus & Purpose |
| :-: | :--- | :--- | :--- |
| **01** | **Product Requirements Document (PRD)** | [`/docs/01_PRODUCT_REQUIREMENTS_DOCUMENT_PRD.md`](./01_PRODUCT_REQUIREMENTS_DOCUMENT_PRD.md) | Vision, user personas, Web vs. APK scope, functional & non-functional requirements, and business KPIs. |
| **02** | **Technical Requirements Document (TRD)** | [`/docs/02_TECHNICAL_REQUIREMENTS_DOCUMENT_TRD.md`](./02_TECHNICAL_REQUIREMENTS_DOCUMENT_TRD.md) | High-level system architecture, dual-tier caching, state synchronization, Capacitor runtime, and build pipelines. |
| **03** | **App Flow & User Journeys** | [`/docs/03_APP_FLOW_AND_USER_JOURNEYS.md`](./03_APP_FLOW_AND_USER_JOURNEYS.md) | Step-by-step journeys for Students, Job Seekers, and Administrators, 12-stage milestone state machine, and error recovery. |
| **04** | **UI/UX Design Brief** | [`/docs/04_UI_UX_DESIGN_BRIEF.md`](./04_UI_UX_DESIGN_BRIEF.md) | Design tokens, color palette, responsive typography scale, mobile "cardification" of tables, and component specs. |
| **05** | **Backend Schema & Security** | [`/docs/05_BACKEND_SCHEMA_AND_SECURITY.md`](./05_BACKEND_SCHEMA_AND_SECURITY.md) | Firestore collections (`leads`, `applications`, `documents`, `job_opportunities`, `settings`), security rules, and composite indexes. |
| **06** | **Implementation & Deployment Guide** | [`/docs/06_IMPLEMENTATION_AND_DEPLOYMENT_GUIDE.md`](./06_IMPLEMENTATION_AND_DEPLOYMENT_GUIDE.md) | Step-by-step local setup, Capacitor Android APK packaging, Vercel web deployment, and testing checklist. |

---

### Quick Architecture Summary
- **Frontend:** React 19 + TypeScript + Vite 6 + Tailwind CSS 4
- **Mobile Container:** Capacitor 6 (Targeting Android 14, min SDK 24)
- **Cloud Database:** Google Firebase Cloud Firestore (`ai-studio-modernmindsconsu-...`)
- **Hosting:** Vercel Edge Network
- **Repository:** Unified single codebase for Web and Android APK builds
