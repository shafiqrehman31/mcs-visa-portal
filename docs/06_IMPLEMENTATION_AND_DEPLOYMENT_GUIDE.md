# Modern Minds Consultants (MCSPK)
## Implementation & Deployment Guide

---

### Document Control
- **Document Version:** 2.0.0
- **Scope:** Technical Implementation Roadmap, Capacitor Android APK Packaging, Firebase Configuration & Production Deployment Runbook
- **Platforms:** Web (Vercel Edge) + Mobile (Android APK / AAB)

---

## 1. Project Setup & Prerequisites

### 1.1 Local Development Environment
Ensure your local machine has the following installed:
- **Node.js:** `v20.x` or `v22.x LTS` (Run `node -v` to verify).
- **Package Manager:** `npm` (v10+) or `bun`.
- **Git:** Latest version.
- **Android Studio (For APK Generation):** Hedgehog (2023.1.1) or Ladybug with Android SDK Platform 34 and Build-Tools installed.
- **Java Development Kit (JDK):** JDK 17 or JDK 21 configured in `JAVA_HOME`.

### 1.2 Repository Clone & Initial Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/mcspk.git
cd mcspk

# Install all npm dependencies
npm install
```

---

## 2. Environment Variables & Firebase Configuration

### 2.1 Configuration File (`firebase-applet-config.json`)
The application is pre-configured to communicate with the dedicated Firebase project. The configuration file in the project root must contain:

```json
{
  "apiKey": "AIzaSy...",
  "authDomain": "ai-studio-modernmindsconsu.firebaseapp.com",
  "projectId": "ai-studio-modernmindsconsu",
  "storageBucket": "ai-studio-modernmindsconsu.appspot.com",
  "messagingSenderId": "6627115166",
  "appId": "1:6627115166:web:6c8498f562f948e6837d02",
  "firestoreDatabaseId": "ai-studio-modernmindsconsu-6c8498f5-62f9-48e6-837d-024d59c0509a"
}
```

### 2.2 Local Verification (`npm run build`)
Test the web compilation locally before proceeding:
```bash
# Run production build
npm run build
```
Verify that the `/dist` directory is populated with bundled `index.html`, JavaScript, and CSS assets.

---

## 3. Step-by-Step Android APK Development & Build (Capacitor)

Capacitor bridges your existing high-performance React application directly into a native Android APK without rewriting any business logic.

### Step 3.1: Install Capacitor Dependencies
Run in your project root:
```bash
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli
```

### Step 3.2: Initialize Capacitor Configuration
Run the initialization command:
```bash
npx cap init "Modern Minds Consultants" "com.modernminds.consultants" --web-dir dist
```
This generates `capacitor.config.ts`. Ensure it looks like:
```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.modernminds.consultants',
  appName: 'Modern Minds Consultants',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0f172a"
    }
  }
};

export default config;
```

### Step 3.3: Add Android Native Platform
```bash
# Build the latest web assets
npm run build

# Add the Android platform folder
npx cap add android
```
This creates an `/android` directory containing a complete, native Android Studio project.

### Step 3.4: Configure Android Permissions
Open `android/app/src/main/AndroidManifest.xml` and ensure standard mobile permissions are declared inside the `<manifest>` tag:
```xml
<!-- Internet & Network State for Firebase Sync -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Camera & Storage for Document Vault Scanning -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
```

### Step 3.5: Build the APK
Open the project in Android Studio:
```bash
npx cap open android
```
Alternatively, build the release APK directly from your command line:
```bash
cd android
./gradlew assembleRelease
```
The compiled Android APK will be generated at:
`android/app/build/outputs/apk/release/app-release-unsigned.apk`

---

## 4. Production Web Deployment (Vercel)

### 4.1 Git Push to GitHub
```bash
git add .
git commit -m "feat: complete unified web & mobile production build with documentation"
git push origin main
```

### 4.2 Connect Vercel Project
1. Log into your **Vercel Dashboard** (https://vercel.com).
2. Click **"Add New Project"** $\rightarrow$ Select your `mcspk` repository.
3. Configure Project Settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**. Vercel will provision edge routing and provide your live production URL (e.g., `https://mcspk.vercel.app`).

---

## 5. Testing & Verification Checklist

Before public release, execute the following validation tests:

| Test ID | Scenario | Expected Behavior | Status |
| :--- | :--- | :--- | :--- |
| **TC-01** | Submit Job Application from Android Device | Form submits, status toast appears, record appears in Firestore `/leads`. | [ PASS ] |
| **TC-02** | Real-time Admin Sync | Desktop Admin dashboard shows the new lead within 1 second without page refresh. | [ PASS ] |
| **TC-03** | Convert Lead to Active Case | Clicking "Convert" generates `MCS-PK-2026-xxxx` and moves lead into `/applications`. | [ PASS ] |
| **TC-04** | Document Vault Upload | Uploading a PDF / camera photo updates the vault and reflects `Under Review`. | [ PASS ] |
| **TC-05** | Milestone Slider Progression | Changing stage from "Assessment" to "Offer Letter" updates the progress bar to 35%. | [ PASS ] |
| **TC-06** | Disclaimer Popup Toggle | Disabling the disclaimer in Admin CMS hides it from website visitors immediately. | [ PASS ] |
| **TC-07** | Network Disconnection Test | Application remains responsive with cached data when device is switched to Airplane Mode. | [ PASS ] |

---

## 6. Maintenance & Operational Runbook

### 6.1 Adding a New Overseas Destination Country
1. Access Admin Portal $\rightarrow$ Navigate to **Target Countries** or **Work & Visit Destinations**.
2. Click **"Add Country Destination"**.
3. Fill in Flag, Visa Type, Processing Duration, and Tuition/Salary expectations.
4. Save: Firestore automatically updates all client views.

### 6.2 Managing Database Backups
- In the Google Cloud / Firebase Console, navigate to Firestore $\rightarrow$ **Data**.
- Schedule automated daily exports to a Google Cloud Storage bucket (`gs://mcspk-firestore-backups`) for disaster recovery compliance.

### 6.3 APK Version Updates
When adding features to the mobile app:
1. Increment `versionCode` and `versionName` in `android/app/build.gradle`.
2. Run `npm run build && npx cap sync android`.
3. Re-run `./gradlew assembleRelease` or generate an `.aab` for the Google Play Console.
