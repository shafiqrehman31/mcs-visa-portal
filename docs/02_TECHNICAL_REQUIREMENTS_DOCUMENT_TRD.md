# Modern Minds Consultants (MCSPK)
## Technical Requirements Document (TRD)

---

### Document Control
- **Document Version:** 2.0.0
- **Architectural Scope:** Hybrid Multi-Platform Web (React 19 + Vite) & Native Android Container (Capacitor / Android Studio)
- **Database Engine:** Google Firebase Cloud Firestore (NoSQL Document Store)
- **Hosting / CDN:** Vercel Edge Network / Google Cloud Infrastructure
- **Security Profile:** Rule-based Firestore access controls + Client token authorization

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture Diagram
```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                                                                                   |
|   +------------------------------------+   +------------------------------------+ |
|   |         Web Browser Client         |   |         Android Mobile APK         | |
|   |   (Chrome, Safari, Edge, Firefox)  |   |    (Capacitor Webview / Android)   | |
|   |  - Responsive Desktop Viewport     |   |  - Native Device Hardware (Camera) | |
|   |  - Full Administrative Portal      |   |  - Push Notifications & Biometrics | |
|   |  - Multi-Column Grids & Tables     |   |  - Bottom Navigation & Safe Areas  | |
|   +-----------------+------------------+   +-----------------+------------------+ |
|                     |                                        |                    |
+---------------------|----------------------------------------|--------------------+
                      |                                        |
                      v                                        v
+-----------------------------------------------------------------------------------+
|                        APPLICATION LOGIC (TypeScript SPA)                         |
|                                                                                   |
|  [ React 19 Engine ] ---> [ Tailwind CSS Engine ] ---> [ Lucide Icons ]           |
|            |                                                                      |
|  [ Storage Service Facade (`storageService.ts`) ]                                 |
|            |                                                                      |
|  +---------+------------------------------+                                       |
|  | Local In-Memory / LocalStorage Cache   | (Fallback resilience)                 |
|  | Event Dispatcher (`CustomEvent`)       | (Reactive tab sync)                   |
|  +---------+------------------------------+                                       |
+------------|----------------------------------------------------------------------+
             |
             v  (WebSockets / Secure gRPC / TLS 1.3)
+-----------------------------------------------------------------------------------+
|                              BACKEND CLOUD SERVICES                               |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                     Google Firebase Cloud Firestore                         |  |
|  |                                                                             |  |
|  |   Database ID: `ai-studio-modernmindsconsu-6c8498f5-62f9-48e6-837d-...`    |  |
|  |   Collections:                                                              |  |
|  |   - `/leads/{leadId}`              (Cross-device inquiry intake)            |  |
|  |   - `/applications/{appId}`        (Applicant milestones & tracking)        |  |
|  |   - `/documents/{docId}`           (Document metadata & vault status)       |  |
|  |   - `/job_opportunities/{jobId}`   (Overseas employment catalog)            |  |
|  |   - `/settings/{settingId}`        (CMS content, branding, team, alerts)    |  |
|  +-----------------------------------------------------------------------------+  |
|  |                     Firebase Authentication & Storage                       |  |
|  |   - Secure user identity tokens                                             |  |
|  |   - Cloud file storage for passports, transcripts, and contracts            |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Technology Stack & Runtime Specifications

### 2.1 Frontend Framework & Bundling
- **Runtime Environment:** Node.js 20+ / Browser ECMAScript 2022.
- **Framework:** React 19.0.0 (Functional Components with Hooks).
- **Language:** TypeScript 5.7+ (Strict Mode enabled).
- **Build Tool:** Vite 6.x (Rollup / Rolldown fast bundler).
- **Styling Architecture:** Tailwind CSS 4.x via `@tailwindcss/vite` plugin.
- **Icons & UI Elements:** `lucide-react` (SVG tree-shakeable icons).

### 2.2 Mobile Native Runtime (Android APK)
- **Container Technology:** `@capacitor/core` 6.x & `@capacitor/android` 6.x.
- **Minimum Android SDK:** API Level 24 (Android 7.0 Nougat).
- **Target Android SDK:** API Level 34 (Android 14 / Upside Down Cake).
- **Hardware Integration:**
  - `@capacitor/camera`: Direct native camera capture for passport and educational degree scanning.
  - `@capacitor/push-notifications`: FCM (Firebase Cloud Messaging) integration for instant milestone progression alerts.
  - `@capacitor/splash-screen` & `@capacitor/status-bar`: Immersive styling matching the brand colors (`#0f172a` Slate-900 and `#0284c7` Sky-600).

### 2.3 Backend & Database Services
- **Cloud Database:** Firebase Cloud Firestore (Provisioned on GCP Asia/Global Region).
- **Client SDK:** Official modular `firebase` package (version `11.x` / `13.x`).
- **Connection Mode:** Long-polling & gRPC multiplexed WebSockets with automated reconnection and local snapshot cache.

---

## 3. Data Synchronization & Persistence Engine

### 3.1 Dual-Tier Storage Layer (`storageService.ts`)
The application implements an offline-resilient, hybrid storage pattern:

```
[UI Component Request]
         |
         v
+-------------------------------+
|  Read/Write Facade Method     |
+---------------+---------------+
                |
       +--------+--------+
       |                 |
       v                 v
[LocalStorage Cache]   [Firebase Firestore]
 (Instant synchronous   (Asynchronous cloud sync
  UI rendering)          via `onSnapshot` / `setDoc`)
```

1. **Optimistic UI Updates:** User actions immediately update the local in-memory/LocalStorage state, allowing zero UI delay.
2. **Cloud Write-Through:** Updates are dispatched asynchronously to Firestore using sanitized payloads (`cleanForFirestore()` removes invalid `undefined` keys).
3. **Cross-Client Reactive Listener:** `onSnapshot` listeners continuously monitor Firestore changes. When another client (e.g. an Android phone submitting a form) creates a record, all desktop admin screens auto-refresh without manual page reloading.

### 3.2 Sanitize & Serialization Pipeline
Firestore strictly forbids `undefined` values. The storage service passes all data models through a recursive sanitization pipeline before network transmission:
```typescript
function cleanForFirestore(obj: any): any {
  if (obj === undefined) return null;
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(cleanForFirestore);
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) clean[key] = cleanForFirestore(val);
  }
  return clean;
}
```

---

## 4. Security & Network Protocols

### 4.1 Transport Layer Security (TLS)
- All network communications between Web, APK, and Firebase are encrypted using TLS 1.3.
- No insecure plain HTTP traffic allowed.

### 4.2 Firestore Security Rules Architecture
Security enforcement is delegated to server-side Firestore rules:
- **Public Write (`/leads`):** Allows unauthenticated website and mobile visitors to create leads, but forbids public reads, updates, or deletes.
- **Applicant Isolation (`/applications`, `/documents`):** Applicants can only read and mutate documents tagged with their own `userId`.
- **Public Read (`/job_opportunities`, `/settings`):** Publicly readable by all clients for real-time browsing, but write-restricted to authenticated administrators.

### 4.3 Content Security Policy (CSP) & CORS
- Embedded `index.html` headers restrict script execution to local bundles and authorized Google Firebase domains.
- Assets are bundled locally; external image dependencies (e.g. Unsplash placeholders) use secure HTTPS URLs with fallback image placeholders.

---

## 5. Performance Optimization Strategy

### 5.1 Code Splitting & Lazy Loading
- Admin components (`AdminJobOpportunities`, `AdminTargetCountries`, `AdminWorkVisitDestinations`, etc.) are chunked separately to keep the initial client bundle lightweight (< 300 kB gzipped).
- Heavy modals (PortalModal, DisclaimerModal) load on-demand.

### 5.2 Mobile Memory Management
- Mobile views enforce pagination (`limit(15)`) for job and lead lists to prevent heap memory exhaustion on budget Android devices.
- Heavy document previews are loaded as compressed thumbnails before downloading full-resolution source files.

---

## 6. Build & CI/CD Pipelines

### 6.1 Web Build (Vercel / GitHub Actions)
1. **Lint & Typecheck:** `tsc --noEmit` and `npm run lint`.
2. **Bundle Compilation:** `npm run build` generates static assets in `/dist`.
3. **Edge Deployment:** Static assets deployed to edge nodes with automated cache invalidation.

### 6.2 Mobile APK Build Pipeline (Capacitor)
```bash
# 1. Compile web bundle
npm run build

# 2. Sync web bundle to Android project
npx cap sync android

# 3. Open in Android Studio or compile via CLI
cd android && ./gradlew assembleRelease
```
- Outputs unsigned or keystore-signed `.apk` and `.aab` (Android App Bundle for Google Play Store).
