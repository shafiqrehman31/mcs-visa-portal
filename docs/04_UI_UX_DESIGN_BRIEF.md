# Modern Minds Consultants (MCSPK)
## UI/UX Design Brief & Design System

---

### Document Control
- **Document Version:** 2.0.0
- **Scope:** Visual Identity, Design Tokens, Mobile Responsive Layouts, Component Library & UX Patterns
- **Brand Identity:** Premium Global Education & Immigration Advisory

---

## 1. Visual Identity & Brand Philosophy

### 1.1 Brand Personality & Tone
- **Authoritative & Trustworthy:** Clean corporate aesthetics, authoritative navy and slate tones reflecting diplomatic precision and legal expertise.
- **Approachable & Transparent:** High contrast, legible typography, straightforward pricing, and real-time step counters that demystify the visa process.
- **Modern & Fast:** Subtle micro-interactions, responsive touch targets, smooth slide-overs, and zero visual clutter.

### 1.2 Anti-"AI Slop" Guidelines
- **No Generic Overused Illustrations:** Use genuine, high-quality photography of destination cities (London, Berlin, Dubai, Tokyo, Rome) or crisp, contextual vector flags.
- **No Floating Meaningless Spheres or Purple Gradients:** Stick to a grounded, diplomatic corporate color palette.
- **Structured Density:** Maintain purposeful whitespace without vast empty expanses. Every screen element must serve applicant orientation or counselor workflow.

---

## 2. Design Tokens & Color Palette

### 2.1 Primary & Neutral Colors
```css
/* Core Brand Colors */
--color-brand-primary: #0284c7;    /* Sky-600: Energetic, international travel & aspiration */
--color-brand-primary-dark: #0369a1; /* Sky-700: Active states & primary button hovers */
--color-brand-accent: #f59e0b;     /* Amber-500: Highlighting visa deadlines & urgency */

/* Background & Surface Hierarchy */
--color-bg-canvas: #0f172a;        /* Slate-900: Deep navy for high-end dark sections */
--color-bg-card-dark: #1e293b;     /* Slate-800: Elevated card surfaces in dark mode */
--color-bg-surface-light: #ffffff; /* Clean white for high-density document reading */
--color-bg-subtle-light: #f8fafc;  /* Slate-50: Alternating section backgrounds */

/* Semantic Status Accents */
--color-status-success: #10b981;   /* Emerald-500: Document Verified / Visa Approved */
--color-status-warning: #f59e0b;   /* Amber-500: Needs Revision / Action Required */
--color-status-danger: #ef4444;    /* Rose-500: Rejected / Deadline Expired */
--color-status-info: #3b82f6;      /* Blue-500: In Progress / Biometrics Scheduled */
```

### 2.2 Typography Scale
- **Display / Headers:** `Plus Jakarta Sans` or system `Inter`, `sans-serif` (Weights: 600 SemiBold, 700 Bold, 800 ExtraBold).
- **Body & Data:** `Inter`, `system-ui`, `-apple-system`, `sans-serif` (Weights: 400 Regular, 500 Medium).
- **Tabular / Reference Numbers:** `font-mono` (`JetBrains Mono`, `Consolas`) for Case IDs, passport numbers, and tracking codes.

| Token | Desktop Size | Mobile Size | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `text-display` | 48px (3rem) | 32px (2rem) | 1.15 | Main Hero Value Proposition |
| `text-h1` | 36px (2.25rem) | 26px (1.625rem) | 1.25 | Section Headers (Countries, Jobs) |
| `text-h2` | 24px (1.5rem) | 20px (1.25rem) | 1.3 | Card Titles & Modal Headings |
| `text-h3` | 18px (1.125rem) | 16px (1rem) | 1.4 | Field Labels & Sub-sections |
| `text-body` | 15px (0.9375rem) | 14px (0.875rem) | 1.6 | Narrative copy, descriptions |
| `text-caption` | 13px (0.8125rem) | 12px (0.75rem) | 1.5 | Meta info, timestamps, file sizes |

---

## 3. Mobile vs. Desktop Responsive Layout Rules

### 3.1 The 48px Minimum Touch Target Rule
- On mobile devices, all tappable items (buttons, filter chips, accordion headers, form inputs) must have a minimum interactive tap boundary of **$48 \times 48\text{px}$** to eliminate mis-taps.

### 3.2 Handling Tables on Mobile: "Cardification"
Wide data tables with 8+ columns (e.g. Admin Applicants list) must never require horizontal panning on mobile:
- **Desktop ($\ge 1024\text{px}$):** Standard multi-column tabular grid with sorting headers.
- **Mobile ($< 768\text{px}$):** Convert each row into a structured **Summary Card**:
  - Top row: Applicant Avatar + Full Name + Status Badge (`Verified`).
  - Middle row: Country Flag + Program Title + Case ID (`MCS-PK-2026-8841`).
  - Bottom row: Action Buttons: [View Vault] [Update Stage].

### 3.3 Progressive Disclosure for Long Forms
Instead of rendering a 20-field form on a single screen:
- Split into a multi-step stepper with a persistent sticky header:
  `Step 2 of 4: Educational Credentials`
- Top progress bar indicates completion percentage (`50%`).
- Bottom sticky bar holds:
  - [$\leftarrow$ Back] (secondary button)
  - [Continue $\rightarrow$] (primary full-width button).

---

## 4. Key Component Specifications

### 4.1 Opportunity Card (Overseas Job & Study Program)
- **Container:** Rounded-2xl borders (`rounded-2xl`), slate border (`border border-slate-700/60`), subtle hover elevation (`hover:border-sky-500/50`).
- **Header:** Country Flag emoji/badge + Sector tag (e.g. `Construction`, `Software`, `Healthcare`).
- **Body:** Job Title (Bold), Company Name (Medium), Location, Salary Highlight (Pill with soft emerald tint `bg-emerald-500/10 text-emerald-400 font-semibold`).
- **Perks Badges:** Accommodation Provided, Medical Insurance, Ticket Included.
- **Footer:** Vacancy counter (`4 Vacancies Left`) + Primary CTA Button: `Apply Now`.

### 4.2 Milestone Stepper (Vertical Mobile / Horizontal Desktop)
- **Node Statuses:**
  - **Completed:** Sky-600 background circle with white checkmark icon; connecting line colored Sky-500.
  - **Active / Current:** Pulsing amber/blue ring (`animate-pulse`); stage description expanded with counselor remarks.
  - **Upcoming:** Muted slate circle with stage number; connecting line dashed.
- **Interactivity:** Tapping any completed node displays the historical timestamp and counselor notes.

### 4.3 Mobile Bottom Navigation Bar (APK View)
Fixed to the bottom viewport with safe-area padding (`pb-safe`):
- **Height:** 64px.
- **Tabs (4 items):**
  1. `Explore` (Compass icon)
  2. `Jobs & Study` (Briefcase icon)
  3. `My Case` (FileText icon with active milestone badge)
  4. `Help & Contact` (PhoneCall icon)
- **Active State:** Icon and label in `text-sky-500` with subtle dot indicator below.
- **Inactive State:** `text-slate-400 hover:text-slate-200`.

### 4.4 Document Vault Uploader & Status Pill
- **Upload Box:** Dashed border container (`border-2 border-dashed border-slate-700 hover:border-sky-500`) with cloud upload icon.
- **Status Pills:**
  - `Verified`: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/30`
  - `Under Review`: `bg-sky-500/10 text-sky-400 border border-sky-500/30`
  - `Needs Revision`: `bg-rose-500/10 text-rose-400 border border-rose-500/30`
  - `Pending`: `bg-slate-700/40 text-slate-400 border border-slate-600/30`

---

## 5. Accessibility & Ergonomics Standards

1. **Color Contrast:** All body text maintains a minimum contrast ratio of **4.5:1** against backgrounds (WCAG AA compliant).
2. **Input Fields:** Form controls feature visible labels above the field (never placeholders alone) to prevent cognitive loss during typing.
3. **Modal Focus Trap:** Modals (Portal, Disclaimer, Job Apply) trap keyboard navigation and close gracefully via both `Esc` key and top-right close `X`.
4. **Haptic Feedback (Mobile APK):** Trigger subtle device vibration when an application form is successfully submitted or a milestone stage is advanced.
