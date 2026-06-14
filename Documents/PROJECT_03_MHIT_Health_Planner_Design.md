# PROJECT 03 — Perancang Bajet Penjagaan Kesihatan (MHIT Health Budget Planner)

**PIC:** Nadia
**Format:** HTML5 Interactive Calculator / Gamified Educational Tool
**Language:** Bahasa Malaysia
**Reference:** https://calculator.fenetwork.my/
**Display Context:** Museum kiosk (touchscreen), landscape orientation, unattended public use

---

## 1. Project Overview

### Purpose
The MHIT Health Budget Planner is an interactive, gamified calculator that educates museum visitors about Medical and Health Insurance/Takaful (MHIT). By entering their age and current coverage status, visitors receive a personalised projection of future healthcare costs and a tailored financial advice summary. The tool translates abstract insurance concepts into concrete, emotionally resonant numbers that motivate action.

### Target Audience
- General public, ages 18–60+
- Financially literate and non-literate visitors
- Families, working adults, retirees
- Malaysian citizens with varying levels of insurance awareness

### PIC
Nadia

### Format
Single-page HTML5 application functioning as an interactive calculator with gamification elements (progress animations, personalised results, animated projections).

### Language
Bahasa Malaysia throughout. All labels, instructions, feedback, and copy in BM.

### Display Context
- Museum kiosk, unattended operation
- Touchscreen primary input (physical keyboard/mouse fallback)
- Expected session duration: 2–5 minutes per visitor
- Idle attract screen after 60 seconds of inactivity
- Adjacent to static wall panel content (see Section 6 for full wall panel copy)

---

## 2. Technical Stack

### Core Technologies
- **HTML5** — semantic structure, `<canvas>` for chart rendering
- **CSS3** — custom properties, CSS Grid, Flexbox, keyframe animations, CSS transitions
- **Vanilla JavaScript (ES6+)** — no framework dependency for kiosk performance; modular IIFE pattern

### Animation Libraries
- **GSAP 3 (GreenSock)** — primary animation engine for timeline-based sequences, bar fills, number countups, and screen transitions. Load from local vendor bundle (no CDN dependency for kiosk).
  - Key plugins: `gsap.to()`, `gsap.timeline()`, `TextPlugin` for number roll-up
- **CSS Animations** — idle/attract screen pulsing, micro-interactions, button hover states
- **Chart.js 4.x** — line chart for 30-year projection curve; canvas-based, responsive

### Calculator / Data Logic
- Pure JavaScript calculation module (`healthCalc.js`) — isolated from UI layer
- Input validation and sanitisation in a separate `validator.js` module
- All projection results computed client-side; no network calls required

### Audio
- Web Audio API (no external library) — for SFX triggers
- Background music via `<audio>` element with loop attribute
- All audio assets locally bundled

### Recommended Resolution / Display Size
- **Primary target:** 1920×1080px (Full HD landscape)
- **Fallback:** 1366×768px
- Minimum touch target: 60×60px for all interactive elements
- Font baseline: 20px body, 32px+ headings for kiosk readability at arm's length

### File Structure
```
project-03-mhit/
├── index.html
├── assets/
│   ├── audio/
│   │   ├── bgm_health_calm.mp3
│   │   ├── sfx_slider_tick.mp3
│   │   ├── sfx_button_click.mp3
│   │   ├── sfx_result_reveal.mp3
│   │   ├── sfx_number_countup.mp3
│   │   └── sfx_advice_appear.mp3
│   ├── fonts/
│   │   ├── Nunito-Regular.woff2
│   │   ├── Nunito-Bold.woff2
│   │   └── Nunito-ExtraBold.woff2
│   └── images/
│       ├── logo_fen.svg
│       ├── icon_hospital.svg
│       ├── icon_medicine.svg
│       ├── icon_shield.svg
│       ├── icon_chart.svg
│       └── bg_health_pattern.svg
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   ├── screens.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── stateManager.js
│   ├── healthCalc.js
│   ├── validator.js
│   ├── animator.js
│   ├── chartRenderer.js
│   ├── audioManager.js
│   └── idleManager.js
└── vendor/
    ├── gsap.min.js
    └── chart.min.js
```

---

## 3. Application Architecture

### Screen / State Flow

```
[IDLE / ATTRACT SCREEN]
        |
        | Touch anywhere / Tap "Mula"
        v
[SCREEN 1: WELCOME + DISCLAIMER]
        |
        | Tap "Saya Faham, Teruskan"
        v
[SCREEN 2: INPUT — AGE SELECTOR]
        |
        | Drag/tap age slider (18–80)
        | Tap "Seterusnya"
        v
[SCREEN 3: INPUT — EXISTING MHIT]
        | "Adakah anda mempunyai pelan MHIT?"
        | [Tiada] [Ya, Asas] [Ya, Komprehensif]
        | Tap selection → Tap "Kira Sekarang"
        v
[SCREEN 4: CALCULATING ANIMATION]
        | 2.5-second animated loading sequence
        v
[SCREEN 5: RESULTS — PROJECTION DASHBOARD]
        | - Animated number countup: projected annual cost
        | - Animated bar chart (10/20/30 year bands)
        | - Coverage gap indicator
        | - Personalised risk tier badge
        | Tap "Lihat Nasihat Kewangan"
        v
[SCREEN 6: FINANCIAL ADVICE + CALL TO ACTION]
        | - 3-card advice layout
        | - "Semak dengan perunding kewangan berlesen anda"
        | Tap "Cuba Semula" → returns to SCREEN 2
        | Tap "Tamat" → returns to IDLE (with 10s countdown)
        v
[IDLE / ATTRACT SCREEN]
```

### State Management Approach
Single global state object managed by `stateManager.js`:

```javascript
const AppState = {
  currentScreen: 'idle',     // string: screen identifier
  userAge: null,             // integer: 18–80
  mhitTier: null,            // string: 'none' | 'basic' | 'comprehensive'
  calcResults: null,         // object: computed projections
  idleTimer: null,           // reference to setTimeout
  audioEnabled: true         // boolean: mute toggle
};
```

State transitions fire through a single `setState(key, value)` function that also triggers the appropriate screen transition animation. No direct DOM mutation outside the designated render functions.

### Data Structures

```javascript
// Calculation result object
const CalcResult = {
  currentAnnualCost: Number,       // RM estimate for user's age band
  projectedCosts: {
    year10: Number,
    year20: Number,
    year30: Number
  },
  coverageGap: Number,             // RM gap between projected cost and current coverage
  riskTier: String,                // 'rendah' | 'sederhana' | 'tinggi' | 'kritikal'
  adviceCards: Array[3],           // Array of advice string objects
  recommendedCoverage: Number      // RM recommended annual coverage limit
};

// Advice card object
const AdviceCard = {
  icon: String,     // SVG icon name
  title: String,    // Short BM title
  body: String      // BM advice paragraph
};
```

---

## 4. UI/UX Design Specification

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#1A6B5A` | Primary CTAs, active states, brand colour (teal-green / health) |
| `--color-primary-light` | `#2E9E82` | Button hover, chart line |
| `--color-primary-pale` | `#E8F5F1` | Card backgrounds, input fields |
| `--color-secondary` | `#F59E0B` | Accent, warnings, risk badges (amber) |
| `--color-secondary-light` | `#FDE68A` | Highlight backgrounds |
| `--color-danger` | `#DC2626` | High-risk indicators, critical gap alerts |
| `--color-danger-light` | `#FEE2E2` | Danger card backgrounds |
| `--color-neutral-900` | `#111827` | Primary text |
| `--color-neutral-700` | `#374151` | Secondary text, labels |
| `--color-neutral-400` | `#9CA3AF` | Placeholder text, disabled states |
| `--color-neutral-100` | `#F3F4F6` | Page background |
| `--color-white` | `#FFFFFF` | Card surfaces, modal backgrounds |
| `--color-chart-bar-10` | `#34D399` | 10-year projection bar |
| `--color-chart-bar-20` | `#F59E0B` | 20-year projection bar |
| `--color-chart-bar-30` | `#EF4444` | 30-year projection bar |

### Typography

| Role | Font | Weight | Size (kiosk) |
|---|---|---|---|
| Display / Hero | Nunito | ExtraBold (800) | 56px |
| Heading 1 | Nunito | Bold (700) | 40px |
| Heading 2 | Nunito | Bold (700) | 28px |
| Body Large | Nunito | Regular (400) | 22px |
| Body | Nunito | Regular (400) | 18px |
| Label / Caption | Nunito | Bold (700) | 16px |
| Number Display | Nunito | ExtraBold (800) | 72px (results screen) |

Line height: 1.5 for body, 1.2 for headings.
Letter spacing: 0.02em for headings, normal for body.

### Layout Grid
- **Base grid:** 12-column CSS Grid, 1920px max-width, 80px horizontal gutters
- **Input screens:** 2-column split — left panel (illustration/icon 5 cols) + right panel (inputs 7 cols)
- **Results screen:** Full-width header band + 3-column card row + full-width chart
- **Advice screen:** 3-equal-column card layout (4 cols each)

### Component Library

**Primary Button**
```
Background: --color-primary
Text: --color-white, Nunito Bold, 22px
Padding: 20px 48px
Border-radius: 12px
Min-height: 64px
Hover: background --color-primary-light, scale(1.03), transition 200ms ease
Active: scale(0.97)
```

**Secondary Button**
```
Background: transparent
Border: 2px solid --color-primary
Text: --color-primary, Nunito Bold, 22px
Padding: 18px 44px
Border-radius: 12px
Min-height: 64px
```

**Age Slider**
```
Track height: 12px
Track background: --color-neutral-100
Track fill: --color-primary (CSS gradient)
Thumb: 52px × 52px circle, --color-primary, white border 4px, shadow
Thumb active: scale(1.1), transition 150ms
Label bubble above thumb: current age, Nunito ExtraBold 24px
```

**Coverage Option Card (Radio)**
```
Width: ~340px
Height: 160px
Border-radius: 16px
Border: 2px solid --color-neutral-100
Background: --color-white
Selected: Border --color-primary 3px, background --color-primary-pale
Icon: 48×48px SVG centred top
Label: Nunito Bold 20px
Sub-label: Nunito Regular 16px, --color-neutral-700
```

**Result Badge (Risk Tier)**
```
Shape: Pill / Rounded rectangle
Padding: 12px 28px
Font: Nunito Bold 20px, uppercase
Tiers: Rendah → --color-chart-bar-10 bg / dark text
       Sederhana → --color-secondary bg / dark text
       Tinggi → --color-danger-light bg / --color-danger text
       Kritikal → --color-danger bg / white text
```

**Advice Card**
```
Background: --color-white
Border-radius: 20px
Padding: 32px
Shadow: 0 4px 24px rgba(0,0,0,0.08)
Icon container: 64×64px circle, --color-primary-pale
Title: Nunito Bold 22px
Body: Nunito Regular 18px, --color-neutral-700
```

**Mute Toggle Button**
```
Position: fixed top-right, 24px margin
Size: 52×52px circle
Background: rgba(255,255,255,0.9)
Icon: speaker SVG, 28px
Z-index: 9999
```

**Idle Screen CTA**
```
Pulsing ring animation around central touch target (200px diameter)
Text: "Sentuh untuk Mulakan" — Nunito ExtraBold 36px
Animation: CSS pulse keyframe, 2s ease-in-out infinite
```

### Touch / Interaction Targets
- Minimum touch target: **60×60px** for all interactive elements
- Slider thumb: **52px diameter** (visual) with **80px touch area** via padding/pseudo-element
- Card tap targets: full card surface is tappable
- Spacing between adjacent tap targets: minimum 12px

### Idle / Attract Screen
- Activates after **60 seconds** of inactivity (managed by `idleManager.js`)
- Full-screen animated loop: floating healthcare icons (shield, hospital cross, heartbeat line) with parallax drift
- Central hero text pulsing: "Tahukah Anda? Kos perubatan meningkat 10% setiap tahun."
- Sub-text rotating carousel (3 facts, 4s each): static MHIT facts from wall panel
- "Sentuh untuk Mulakan" button with pulsing ring
- On any touch event: fade-out attract, cross-fade to Welcome screen

---

## 5. Screen-by-Screen Design

### IDLE / ATTRACT SCREEN

**Layout:** Full-bleed, centred content
**Background:** Gradient `linear-gradient(135deg, #1A6B5A 0%, #0D3D33 100%)` with subtle SVG pattern overlay (geometric hex pattern, 5% opacity white)
**Floating icons:** 6–8 healthcare SVG icons (hospital, shield, heart, medicine) drifting slowly with `gsap.to()` yoyo loops at varying speeds (20–40s per cycle)
**Content:**
- Logo: FEN Network / Museum branding, top-left, 120px wide
- Central card (rounded, semi-transparent white, 640px wide):
  - Headline: "Perancang Bajet Penjagaan Kesihatan" — Nunito ExtraBold 48px, `--color-white`
  - Sub-headline: "Ketahui kos kesihatan anda masa depan dalam masa 2 minit." — 22px
  - Animated touch target button: pulsing ring, "Sentuh untuk Mulakan"
- Bottom ticker: rotating MHIT facts (3 facts, 4s each, fade transition)
- Mute toggle: top-right

---

### SCREEN 1: WELCOME + DISCLAIMER

**Layout:** Full-screen, centred content, white background
**Content:**
- Back to idle: "×" button top-right (with 5s hold confirmation to prevent accidental exit)
- Icon: large shield with checkmark, `--color-primary`, 96px
- Heading: "Selamat Datang ke Perancang Bajet Kesihatan" — Heading 1
- Disclaimer paragraph (body text, `--color-neutral-700`):

> "Perancang bajet kesihatan ini adalah untuk tujuan pendidikan dan dibuat berdasarkan umur pengunjung, pelan MHIT sedia ada (jika ada) serta andaian mudah (contoh: berhubung dengan inflasi perubatan dan kadar pertambahan simpanan). Keputusan yang dipaparkan adalah anggaran sahaja dan bukan nasihat kewangan profesional. Sila berbincang dengan perunding kewangan berlesen untuk keputusan tepat."

- CTA Button: "Saya Faham, Teruskan →"
- Progress indicator: Step dots (1 of 4) at bottom

**Entrance animation:** Screen slides in from right (300ms, ease-out), disclaimer fades up from +20px (400ms, 150ms delay).

---

### SCREEN 2: AGE INPUT

**Layout:** 2-column split (5+7 columns)
**Left panel (illustration):**
- Animated SVG illustration: person silhouette with age-responsive appearance changes (young/middle/senior)
- The silhouette's appearance updates live as the slider moves (CSS class swap at age bands: 18–35, 36–50, 51–65, 66–80)
- Background: `--color-primary-pale`

**Right panel (input):**
- Step indicator: "Langkah 1 dari 2"
- Heading: "Berapakah umur anda?" — Heading 1
- Body text: "Umur mempengaruhi kos premium dan anggaran kos rawatan anda."
- **Age slider:**
  - Range: 18 → 80
  - Default position: 35
  - Large bubble label above thumb showing current age in real-time
  - Track labels below: "18", "30", "45", "60", "80"
  - Age band colour zones on track: green (18–35), amber (36–55), red (56–80)
- Age display: Large number display — selected age in `--color-primary`, Nunito ExtraBold 72px
- Age band label auto-updates: "Golongan Muda ✓" / "Golongan Pertengahan Umur" / "Golongan Senior"
- CTA Button: "Seterusnya →" (disabled until slider is interacted with, or user accepts default)

**Interactions:**
- Slider drag: thumb scales to 1.1, bubble floats up 8px, SFX tick plays every 5 age units
- Tap on track jumps to nearest major band midpoint with spring animation

---

### SCREEN 3: EXISTING MHIT COVERAGE INPUT

**Layout:** Centred, single column (max 900px wide)
**Content:**
- Step indicator: "Langkah 2 dari 2"
- Heading: "Adakah anda mempunyai pelan MHIT pada masa ini?" — Heading 1
- Sub-text: "Pilih yang paling hampir dengan situasi semasa anda."
- **3 option cards** (horizontal row):

  **Card 1 — Tiada**
  - Icon: shield with X, grey
  - Title: "Tiada Perlindungan"
  - Sub-label: "Saya belum ada sebarang pelan MHIT"

  **Card 2 — Ya, Asas**
  - Icon: shield half-filled, amber
  - Title: "Ada Pelan Asas"
  - Sub-label: "Pelan hospital sahaja, perlindungan terhad"

  **Card 3 — Ya, Komprehensif**
  - Icon: shield fully filled, green
  - Title: "Ada Pelan Komprehensif"
  - Sub-label: "Meliputi hospital, rawatan & penyakit kritikal"

- On card tap: border highlights, checkmark appears top-right corner of card
- CTA Button: "Kira Sekarang →" (disabled until selection made)
- Back button: "← Kembali" (secondary button, returns to Screen 2)

---

### SCREEN 4: CALCULATING ANIMATION

**Duration:** 2.5 seconds
**Layout:** Full-screen, centred
**Background:** Dark overlay on blurred previous screen (frosted glass effect)
**Content:**
- Animated icon: rotating medical cross / heartbeat line animation (CSS/GSAP)
- Loading text sequence (each line fades in sequentially):
  1. "Menganalisis profil kesihatan anda..." (0.3s delay)
  2. "Mengira unjuran kos 30 tahun..." (0.8s delay)
  3. "Menyediakan nasihat peribadi anda..." (1.4s delay)
- Progress bar filling from 0 to 100% over 2.2s (GSAP linear ease)
- No user interaction during this screen — pure animation

**Purpose:** Gives perceived value to calculation, builds anticipation, provides cognitive processing moment.

---

### SCREEN 5: RESULTS — PROJECTION DASHBOARD

**Layout:** Full-screen scrollable (if content overflows on smaller displays), structured in horizontal bands
**Background:** `--color-neutral-100`

**Band 1 — Summary Hero (full width, `--color-primary` background)**
- Left: "Unjuran Kos Rawatan Tahunan Anda"
- Centre: animated countup number (e.g., "RM 18,400 / tahun") — Nunito ExtraBold 72px, white
- Right: Risk tier badge (colour-coded pill)
- Sub-text: "Berdasarkan umur [X] tahun, inflasi perubatan ~10% setahun"

**Band 2 — 30-Year Projection Bars (3 animated bars)**
- Section heading: "Unjuran Kos Kumulatif"
- Three large horizontal bars, each filling left to right:
  - "10 Tahun: RM [X]" — green bar
  - "20 Tahun: RM [X]" — amber bar
  - "30 Tahun: RM [X]" — red bar
- Bars animate sequentially (10yr first, then 20yr, then 30yr) with 400ms stagger
- RM labels on right of each bar animate as number countup

**Band 3 — Coverage Gap Card (if applicable)**
- Only shown if user has basic or no coverage
- Red-tinted card: "Jurang Perlindungan Anda: RM [X] / tahun"
- Sub-text: "Ini adalah perbezaan antara unjuran kos rawatan anda dan perlindungan semasa."
- Icon: warning triangle

**Band 4 — Line Chart (Chart.js)**
- Heading: "Trend Kos Rawatan (30 Tahun)"
- Smooth line chart showing year-by-year cost escalation
- Two lines: "Tanpa MHIT (kos poket anda)" vs "Dengan MHIT Komprehensif"
- X-axis: current age to current age + 30
- Y-axis: RM values
- Legend clearly labelled

**CTA Band:**
- Primary button: "Lihat Nasihat Kewangan →"
- Secondary: "Cuba Semula" (resets to Screen 2)

---

### SCREEN 6: FINANCIAL ADVICE + CALL TO ACTION

**Layout:** Full-screen, white, 3-column card grid (below full-width header)
**Header band (`--color-primary`):**
- Icon: lightbulb / star
- Heading: "Nasihat Kewangan Untuk Anda"
- Sub-text: personalised summary line (e.g., "Berdasarkan profil anda, berikut adalah langkah yang anda boleh ambil:")

**3 Advice Cards (dynamic based on user profile):**

*Card logic by profile:*

Age 18–35, No MHIT:
1. "Mulakan Awal, Bayar Lebih Rendah" — premium lebih murah bila muda
2. "Pilih Pelan dengan Had Tahunan Tinggi" — sekurang-kurangnya RM 150,000/tahun
3. "Semak Polisi Setiap Tahun" — keperluan berubah dengan usia

Age 36–55, Basic MHIT:
1. "Naik Taraf Perlindungan Anda" — pelan asas mungkin tidak mencukupi
2. "Pastikan Perlindungan Penyakit Kritikal" — risiko meningkat pada usia ini
3. "Buat Semakan Tahunan Dengan Perunding" — pastikan perlindungan masih relevan

Age 56+, No/Basic MHIT:
1. "Dapatkan Perlindungan Segera" — kos premium meningkat dengan usia
2. "Semak Pelan Takaful/Insurans Senior" — ada pelan khusus untuk golongan senior
3. "Bina Dana Kecemasan Kesihatan" — simpanan kecemasan RM 20,000–50,000

**Footer disclaimer:** "Nasihat di atas adalah umum dan untuk tujuan pendidikan. Sila berbincang dengan perunding kewangan berlesen anda untuk pelan yang sesuai."

**Action row:**
- Primary: "Semak Dengan Perunding FEN →" (links to QR code / brochure display)
- Secondary: "Cuba Semula" → Screen 2
- Tertiary: "Tamat" → 10-second countdown then return to Idle

---

## 6. Content Specification

### Wall Panel Copy (verbatim — for static display adjacent to kiosk)

**APA ITU MHIT?**
MHIT = Insurans/Takaful Perubatan & Kesihatan / "Medical And Health Insurance/Takaful"
Pelan perlindungan yang membantu bayar kos rawatan bila anda sakit atau masuk hospital.
Melindungi: Bil hospital | Kos rawatan | Ubat-ubatan | Pembedahan / penyakit serius
"Anda tidak perlu tanggung kos perubatan seorang diri."

**KENAPA MHIT PENTING?**
1. Kos perubatan semakin mahal — Satu kali rawatan boleh mencecah ribuan ringgit. MHIT bantu kurangkan beban kewangan anda.
2. Jaga duit simpanan anda — Tanpa perlindungan, duit simpanan boleh habis atau terpaksa berhutang. MHIT bantu lindungi wang anda.
3. Ketenangan fikiran — Tak perlu risau tentang bil hospital. Fokus untuk sembuh.

**BAGAIMANA MHIT BERFUNGSI?**
Konsep kongsi risiko:
1. Anda bayar caruman/premium yang telah ditetapkan
2. Duit dikumpul dalam satu tabung bersama pemegang polisi lain
3. Tabung digunakan untuk bayar tuntutan/claim anda
(Dipanggil perkongsian risiko / risk pooling)

**PERKARA PENTING:**
- Premium boleh meningkat (bergantung umur, tahap kesihatan, kos rawatan semasa)
- Perlindungan ada had (tahunan atau seumur hidup)
- INGAT: Tidak semua perkara dilindungi. Semak apa yang dilindungi dan tidak.

**ABC SEBELUM BELI:**
A — ANGGAR nilai keperluan anda (maklumkan masalah kesihatan untuk elak tuntutan ditolak)
B — BANDINGKAN pilihan yang ada
C — CARI pilihan bersesuaian mengikut bajet dan keperluan

**TANYA SEBELUM BUAT KEPUTUSAN:**
1. Apa perlindungan pelan ini?
2. Berapa bayaran caruman/premium saya?
3. Adakah caruman/premium saya akan meningkat?
"Faham dulu, baru beli."
MESEJ UTAMA: MHIT bukan untuk untung tetapi untuk perlindungan.

---

### Calculator Mathematical Formulas

All monetary values in Malaysian Ringgit (RM). Figures are illustrative approximations for educational purposes.

#### Base Annual Healthcare Cost by Age Band

```
Base cost lookup table (C_base):
  Age 18–25:  RM 1,200 / year
  Age 26–35:  RM 2,000 / year
  Age 36–45:  RM 4,500 / year
  Age 46–55:  RM 8,000 / year
  Age 56–65:  RM 14,000 / year
  Age 66–80:  RM 20,000 / year
```

These base figures represent average out-of-pocket medical costs in Malaysia at the time of tool development, calibrated to private hospital pricing.

#### Medical Inflation Projection

Annual projected cost at year N from current age:

```
C(N) = C_base × (1 + r)^N

Where:
  C(N)   = projected annual healthcare cost at year N
  C_base = base annual cost from age band lookup
  r      = medical inflation rate = 0.10 (10% per year)
  N      = number of years into the future (1, 10, 20, 30)
```

#### Cumulative Cost Projection (for bar chart bands)

```
CumulativeCost(Y) = C_base × [ ((1+r)^Y - 1) / r ]

Where:
  Y = projection horizon in years (10, 20, or 30)
  r = 0.10
```

Example at Age 35 (C_base = RM 2,000):
- 10-year cumulative: 2,000 × [(1.10^10 - 1) / 0.10] = 2,000 × 15.937 = RM 31,875
- 20-year cumulative: 2,000 × [(1.10^20 - 1) / 0.10] = 2,000 × 57.275 = RM 114,550
- 30-year cumulative: 2,000 × [(1.10^30 - 1) / 0.10] = 2,000 × 164.494 = RM 328,988

#### Premium Coverage Assumptions by MHIT Tier

```
Coverage tiers (annual benefit limit):
  'none':          RM 0 / year
  'basic':         RM 50,000 / year  (hospital room & board only)
  'comprehensive': RM 150,000 / year (hospital + critical illness + specialist)
```

#### Coverage Gap Calculation

```
CoverageGap = C(N) - Coverage_annual_limit

If CoverageGap ≤ 0: "Perlindungan mencukupi"
If CoverageGap > 0: display gap in RM
```

The gap shown on the results screen uses N = 10 (10-year projection) as the near-term reference.

#### Risk Tier Classification

```
RiskScore = (Age_factor × 0.6) + (Coverage_factor × 0.4)

Age_factor:
  18–35 → 1
  36–50 → 2
  51–65 → 3
  66–80 → 4

Coverage_factor:
  'comprehensive' → 1
  'basic'         → 2
  'none'          → 3

RiskScore bands:
  1.0 – 1.8  → 'rendah'     (green)
  1.8 – 2.6  → 'sederhana'  (amber)
  2.6 – 3.4  → 'tinggi'     (orange-red)
  3.4 – 4.0  → 'kritikal'   (red)
```

#### Recommended Annual Coverage

```
RecommendedCoverage = C(10) × 1.25

(10-year projected cost × 25% buffer)
```

Capped display at RM 200,000 / year for practical readability.

#### Year-by-Year Chart Data Generation

```javascript
function generateChartData(age, C_base, r = 0.10) {
  const years = Array.from({ length: 31 }, (_, i) => i); // 0 to 30
  return years.map(n => ({
    year: age + n,
    cost: C_base * Math.pow(1 + r, n)
  }));
}
```

---

## 7. Animation & VFX Specification

### Global Animation Principles
- All entrance animations: elements travel from offset position (20–40px) to natural position
- Easing standard: `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for continuous
- Reduced motion: respect `prefers-reduced-motion` media query — disable GSAP tweens, keep instant state changes

### Screen Transitions

| Transition | Trigger | Duration | Easing | Description |
|---|---|---|---|---|
| Idle → Screen 1 | Touch attract screen | 400ms | ease-out | Full-screen cross-fade |
| Screen 1 → 2 | Tap CTA | 350ms | ease-out | Slide left (new screen enters from right) |
| Screen 2 → 3 | Tap "Seterusnya" | 350ms | ease-out | Slide left |
| Screen 3 → 4 | Tap "Kira Sekarang" | 250ms | ease-in | Fade to dark |
| Screen 4 → 5 | Auto after 2.5s | 500ms | ease-out | Dark lifts, results slide up |
| Screen 5 → 6 | Tap CTA | 400ms | ease-out | Slide left |
| Screen 6 → Idle | Tap "Tamat" | 600ms | ease-in-out | Full-screen fade to idle |
| Any → Idle (timeout) | 60s inactivity | 800ms | ease-in | Fade out current screen |

### Age Slider Animations

| Element | Trigger | Duration | Easing | Description |
|---|---|---|---|---|
| Thumb | Drag start | 150ms | ease-out | Scale to 1.1× |
| Thumb | Drag end | 200ms | spring(1, 80, 10) | Snap back to 1.0× |
| Bubble label | Value change | 80ms | ease-out | Y offset −8px, opacity 1 |
| Track fill | Drag | 0ms (live) | linear | CSS width update with hardware acceleration |
| Age band label | Band change | 250ms | ease-out | Fade out old, fade in new with slight Y shift |
| Silhouette illustration | Band change | 400ms | ease-in-out | Crossfade to new age-group illustration |
| SFX tick | Every 5 age units | — | — | `sfx_slider_tick.mp3` plays |

### Calculating Screen Animations (Screen 4)

| Element | Trigger | Duration | Delay | Easing | Description |
|---|---|---|---|---|---|
| Overlay | Screen enter | 300ms | 0ms | ease-in | Black overlay fades in |
| Loading icon | Overlay visible | 800ms | 100ms | ease-in-out | Rotate + pulse, infinite |
| Text line 1 | Screen enter | 400ms | 300ms | ease-out | Fade up from +15px |
| Text line 2 | After line 1 | 400ms | 800ms | ease-out | Fade up from +15px |
| Text line 3 | After line 2 | 400ms | 1400ms | ease-out | Fade up from +15px |
| Progress bar | Screen enter | 2200ms | 0ms | linear | Width: 0 → 100% |

### Results Screen Animations (Screen 5)

| Element | Trigger | Duration | Delay | Easing | Description |
|---|---|---|---|---|---|
| Hero band | Screen enter | 500ms | 0ms | ease-out | Slide down from −40px |
| Annual cost number | Hero visible | 1500ms | 200ms | ease-out | GSAP TextPlugin countup from 0 |
| Risk badge | Cost countup end | 300ms | 0ms | ease-out | Scale 0 → 1 with bounce: scale(1.1) → scale(1.0) |
| Bar 1 (10yr) | Hero settled | 800ms | 0ms | ease-out | Width: 0 → final value, RM label counts up |
| Bar 2 (20yr) | Bar 1 complete | 800ms | 200ms | ease-out | Width: 0 → final value |
| Bar 3 (30yr) | Bar 2 complete | 800ms | 200ms | ease-out | Width: 0 → final value |
| Coverage gap card | After bars | 400ms | 100ms | ease-out | Fade up from +20px, shake once if critical |
| Line chart | All above settled | 1000ms | 0ms | ease-out | Chart.js animation: line draws from left to right |
| CTA button | Chart visible | 300ms | 200ms | ease-out | Fade in |

### Advice Screen Animations (Screen 6)

| Element | Trigger | Duration | Delay per card | Easing | Description |
|---|---|---|---|---|---|
| Header band | Screen enter | 400ms | 0ms | ease-out | Slide down |
| Card 1 | Header settled | 400ms | 100ms | ease-out | Scale 0.9 → 1.0, opacity 0 → 1 |
| Card 2 | After card 1 | 400ms | 200ms | ease-out | Scale 0.9 → 1.0, opacity 0 → 1 |
| Card 3 | After card 2 | 400ms | 300ms | ease-out | Scale 0.9 → 1.0, opacity 0 → 1 |
| Card icon | Card visible | 300ms | 50ms (per card) | spring | Scale 0 → 1.2 → 1.0 |
| CTA buttons | All cards visible | 300ms | 100ms | ease-out | Fade in from below |

### Idle / Attract Screen Animations

| Element | Duration | Easing | Description |
|---|---|---|---|
| Floating icon 1 | 22s | ease-in-out, yoyo | Drifts from (120, 200) to (180, 160), infinite |
| Floating icon 2 | 28s | ease-in-out, yoyo | Drifts from (800, 400) to (750, 360), infinite |
| Floating icon 3 | 35s | ease-in-out, yoyo | Drifts from (1400, 100) to (1500, 150), infinite |
| Floating icon 4–8 | 20–40s | ease-in-out, yoyo | Similar drift, varied positions |
| Pulse ring | 2000ms | ease-in-out, infinite | CSS keyframe: scale(1.0) → scale(1.4) → opacity 0 |
| Fact ticker | 4000ms per item | ease (cross-fade) | Opacity 1 → 0 on current, next fades in |

### Particles / Effects
- No heavy particle system on this project (educational tool, not entertainment-first)
- On risk tier "kritikal" result: subtle red vignette pulse animation (CSS radial gradient, 3 pulses then stops)
- On "Nasihat" cards appearing: faint confetti burst from top-centre if risk tier is "rendah" (5 small CSS-animated circles, 600ms, then removed from DOM)

---

## 8. Audio Specification

### Background Music (BGM)

| Property | Specification |
|---|---|
| Genre | Soft ambient / light corporate acoustic |
| BPM | 72–80 BPM |
| Mood | Calm, reassuring, trustworthy — similar to a friendly financial advisor meeting |
| Instruments | Acoustic guitar (light picking), subtle pad synth, occasional soft piano notes |
| Loop | Seamless loop, 60–90 second loop length |
| Volume | 25% of master (background-level) |
| Filename | `bgm_health_calm.mp3` |
| Suggested reference | Royalty-free tracks tagged "corporate calm", "health wellness background" on Pixabay Audio or Freesound |
| Format | MP3 128kbps, 44.1kHz stereo |

BGM begins at idle screen with 2-second fade-in. Continues through all screens. Fades to 15% volume on results/advice screens to avoid competing with SFX.

### Sound Effects (SFX)

| SFX Name | Filename | Trigger | Description | Duration |
|---|---|---|---|---|
| Button click | `sfx_button_click.mp3` | Any primary/secondary button tap | Soft, clean click — like a satisfying card tap | 80ms |
| Slider tick | `sfx_slider_tick.mp3` | Every 5 age units on slider | Subtle tick sound, like a gentle mechanical click | 60ms |
| Card select | `sfx_card_select.mp3` | Coverage option card tap | Slightly warmer click with mild resonance | 100ms |
| Calculating | `sfx_calculating.mp3` | Screen 4 enters | Brief 2.5s sequence: soft digital processing hum | 2500ms |
| Number countup | `sfx_number_countup.mp3` | Annual cost number counting up | Rapid ticking/counting sound, fades out as number settles | 1500ms |
| Result reveal | `sfx_result_reveal.mp3` | Risk badge appears | Bright, positive tone (even for high risk — not alarming) | 400ms |
| Bar fill | `sfx_bar_fill.mp3` | Each projection bar fills | Smooth ascending tone proportional to bar length | 800ms |
| Chart draw | `sfx_chart_draw.mp3` | Line chart draws | Light pen-on-paper scratch sound | 1000ms |
| Advice appear | `sfx_advice_appear.mp3` | Each advice card enters | Gentle "pop" — soft, educational | 200ms |
| Return to idle | `sfx_return_idle.mp3` | Idle timeout or "Tamat" | Soft wind-down tone | 600ms |

### Implementation Approach
- `audioManager.js` exposes `playBGM()`, `stopBGM()`, `playSFX(name)`, `setMute(bool)` functions
- SFX pre-loaded at app init using Web Audio API `AudioBuffer` — eliminates playback latency
- BGM uses `<audio>` element with `loop` attribute for simplest reliable looping
- Mute toggle button (top-right, fixed) sets `audioManager.muted = true` and mutes both BGM and all SFX
- Mute state stored in `sessionStorage` so returning visitors in same session keep preference
- All audio gracefully degrades if browser blocks autoplay — no functionality is lost; SFX simply do not play
- Test autoplay policy on target kiosk browser (Chrome kiosk mode typically allows autoplay in kiosk context)

---

## 9. Development Milestones

### Milestone 1 — Foundation & Static Screens (Week 1)
**Deliverables:**
- Project scaffolding: file structure, HTML base, CSS variable system
- All screen HTML/CSS layouts rendered statically (no logic)
- Typography, colour system, component library fully implemented
- Idle/attract screen with CSS animations
- Responsive grid verified at 1920×1080 and 1366×768
- **Review gate:** Visual design sign-off with PIC Nadia

### Milestone 2 — Input Screens & Calculator Logic (Week 2)
**Deliverables:**
- Age slider: full interaction, bubble label, SFX, GSAP thumb animation
- Coverage option cards: tap selection, state management
- `healthCalc.js`: all formulas implemented and unit-tested (manual console tests)
- `validator.js`: input edge cases (age = 18, age = 80, no selection)
- `stateManager.js`: state object and `setState()` transitions
- Calculating animation screen
- **Review gate:** All calculations verified against reference examples in Section 6

### Milestone 3 — Results & Charts (Week 2–3)
**Deliverables:**
- Results dashboard: animated countup, risk badge, coverage gap card
- GSAP timeline for results screen sequenced animations
- Chart.js line chart with year-by-year projection data
- Animated projection bars with staggered GSAP fill
- Dynamic advice card generation based on user profile
- Advice screen with card entrance animations
- **Review gate:** Full run-through from idle to advice with representative age/coverage inputs

### Milestone 4 — Audio, Idle & Polish (Week 3)
**Deliverables:**
- `audioManager.js`: BGM + all SFX integrated
- `idleManager.js`: 60-second inactivity detection, attract screen return
- Mute toggle button (persistent across session)
- All micro-animations: button hover, card hover, slider states
- `prefers-reduced-motion` implementation
- Cross-browser test: Chrome (kiosk), Edge
- **Review gate:** Full user journey testing with audio, timing verification

### Milestone 5 — QA, Kiosk Hardening & Delivery (Week 4)
**Deliverables:**
- Kiosk-mode testing: touch targets verified at physical kiosk display
- Performance profiling: frame rate check for all animations (target 60fps)
- Memory leak audit: idle timer cleanup, GSAP kill on screen transitions
- Text content final review in Bahasa Malaysia
- All assets optimised: SVG minified, MP3 files compressed
- Final delivery package: zipped with README for deployment
- **Review gate:** Sign-off from PIC Nadia + museum technical team

---

## 10. Claude Code Implementation Notes

### Key Implementation Challenges

**1. GSAP + Chart.js Animation Sequencing**
The results screen requires tight sequencing: hero → countup → badge → bars → chart. Use a single `gsap.timeline()` with `addLabel()` markers so that if a future change requires adjusting one delay, the rest of the sequence adjusts relative to it. Avoid hard-coded `delay` values scattered in separate `gsap.to()` calls.

```javascript
// Recommended pattern
const resultsTimeline = gsap.timeline({ paused: true });
resultsTimeline
  .addLabel('start')
  .from('#hero-band', { y: -40, opacity: 0, duration: 0.5, ease: 'power2.out' })
  .addLabel('countup', '+=0.1')
  .to('#annual-cost-display', { /* TextPlugin countup */ duration: 1.5 }, 'countup')
  .addLabel('badge', '+=0.1')
  .from('#risk-badge', { scale: 0, duration: 0.3, ease: 'back.out(1.7)' }, 'badge');
```

**2. Age Slider Touch Handling**
Standard HTML `<input type="range">` has inconsistent touch behaviour across browsers in kiosk mode. Implement a **custom slider** using `<div>` elements with `pointermove`, `pointerdown`, `pointerup` events. This gives full control over thumb position, bubble label, and SFX tick firing. Calculate value from `event.clientX` relative to track bounding rect.

**3. Idle Timer Cleanup**
The idle timer must be cancelled and reset on every user interaction. Attach a single `pointermove`/`pointerdown` listener to `document` in `idleManager.js`. On triggered idle, call `gsap.killAll()` to prevent orphaned animations from the previous user session interfering with the attract screen. Clear all GSAP instances between user sessions.

**4. Chart.js Integration with GSAP Timeline**
Chart.js has its own animation system. To make the chart draw synchronised with the GSAP timeline, disable Chart.js animations (`animation: false`) and instead trigger the chart's `update()` call from within a GSAP `onStart` callback at the appropriate timeline label. Then use a custom GSAP tween on a proxy object to reveal the chart via a CSS clip-path animation (left to right reveal).

**5. Number Countup for Large RM Values**
GSAP's `TextPlugin` can count up numbers but formats poorly for Malaysian RM (e.g., `RM 328,988`). Instead, use a custom tween on a plain number value with `onUpdate` callback to format with `Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' })`.

**6. Kiosk Context-Specific Issues**
- Disable browser context menu: `document.addEventListener('contextmenu', e => e.preventDefault())`
- Disable text selection: `user-select: none` on all UI elements
- Prevent scroll bounce (iOS Safari): `overscroll-behavior: none` on `body`
- Test with mouse disabled — all interactions must work with touch only
- Set `touch-action: none` on the custom slider track to prevent browser swipe navigation interfering

### Performance Notes
- Target: **60fps** throughout. Profile in Chrome DevTools Performance panel.
- Use `will-change: transform` on elements that GSAP will animate. Remove after animation completes via `onComplete` callback to free GPU memory.
- Chart.js canvas should be fixed-size (not CSS-responsive within this screen) to avoid canvas resizing triggering layout reflow.
- All SVG icons inline in HTML or loaded once via `<use>` from a `<symbol>` sprite — avoids per-icon HTTP requests.
- Pre-compute all calculator results at the moment "Kira Sekarang" is tapped, not during the animation. Store in `AppState.calcResults`. The calculating animation screen is presentational only.
- GSAP free tier (no plugins requiring Club GreenSock) is sufficient. TextPlugin is available on GSAP free tier.
- Estimated initial load: < 800KB total (excluding audio). Audio loads async. App should be interactive within 2 seconds on kiosk hardware.

---

## AMENDMENT A — Design Style Update (BNM MAG Reference)

> **Client instruction:** Use the BNM MAG Personality Quiz (https://museum.bnm.gov.my/v2/MAGpersonalityQuiz/MAGpersonalityquiz.html) as the reference for design style and art style.

### Design Style Overrides

The original design spec in this document is superseded by the Global Design System Reference (`DESIGN_SYSTEM_REFERENCE.md`). The following specific overrides apply to **this project**:

#### Colour Palette — REPLACE project-specific palette with:
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#0047AB` | BNM blue, primary actions |
| `--color-gold` | `#F5A623` | Highlights, progress, rewards |
| `--color-accent-teal` | `#00B4A6` | Secondary actions, info panels |
| `--color-accent-coral` | `#FF6B5B` | Warnings, wrong-answer feedback |
| `--color-accent-purple` | `#7B5EA7` | Special/result screens |
| `--color-background` | `#FFF8F0` | Page background |
| `--color-card` | `#FFFFFF` | Card surfaces |
| `--color-text-primary` | `#1A1A2E` | Main text |
| `--color-text-secondary` | `#4A4A6A` | Supporting text |
| `--color-success` | `#27AE60` | Correct answer |
| `--color-error` | `#E74C3C` | Wrong answer |

#### Art Style — REPLACE dark/gaming aesthetic with:
- **Background**: warm white/cream `#FFF8F0`, NOT dark navy/black
- **Illustration style**: flat vector characters, diverse Malaysian representation, warm and friendly
- **Card design**: white rounded-rectangle cards (border-radius 24px) with soft shadow `0 4px 20px rgba(0,0,0,0.08)`
- **Buttons**: rounded pill/rectangle, min 64px height, gradient fills using primary blue or gold
- **Overall mood**: educational, family-friendly, celebratory — same warmth as the BNM MAG reference quiz
- **Floating background decorations**: soft animated icons relevant to each project's theme (coins, shields, charts, etc.) at 10–15% opacity, slow float animation (4–6s infinite)

#### Typography — REPLACE with:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Nunito:wght@400;600;700&display=swap');

:root {
  --font-display: 'Poppins', sans-serif;
  --font-body: 'Nunito', sans-serif;
}
h1 { font-family: var(--font-display); font-size: clamp(32px, 4vw, 48px); font-weight: 800; }
h2 { font-family: var(--font-display); font-size: clamp(24px, 3vw, 36px); font-weight: 700; }
h3 { font-family: var(--font-display); font-size: clamp(20px, 2.5vw, 28px); font-weight: 700; }
body { font-family: var(--font-body); font-size: clamp(16px, 1.8vw, 20px); }
```

---

## AMENDMENT B — Bilingual (BM / English) Implementation

> **Client instruction:** All projects must have options for Bahasa Melayu and English language.

### Language Toggle Component

Add this to EVERY screen/page, fixed position top-right:

```html
<!-- Language Toggle — include in every HTML file -->
<div class="lang-toggle" role="group" aria-label="Language selector">
  <button class="lang-btn active" data-lang="bm" onclick="setLang('bm')">BM</button>
  <button class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
</div>

<style>
.lang-toggle {
  position: fixed; top: 16px; right: 16px; z-index: 9999;
  display: flex; background: white; border-radius: 9999px;
  padding: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.12); gap: 4px;
}
.lang-btn {
  padding: 8px 20px; border-radius: 9999px; border: none;
  background: transparent; color: #0047AB;
  font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 16px;
  cursor: pointer; transition: all 200ms ease; min-width: 60px;
}
.lang-btn.active { background: #0047AB; color: white; }
</style>
```

### i18n Architecture

Create a `js/i18n.js` file for this project:

```javascript
// js/i18n.js
const LANG = {
  bm: { /* all BM strings — see Content Specification section */ },
  en: { /* all EN strings — see English translations in DESIGN_SYSTEM_REFERENCE.md */ }
};

let currentLang = localStorage.getItem('imd_lang') || 'bm';

function t(key, replacements = {}) {
  let str = LANG[currentLang][key] || LANG['bm'][key] || key;
  Object.entries(replacements).forEach(([k, v]) => {
    str = str.replace(new RegExp(`{${k}}`, 'g'), v);
  });
  return str;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('imd_lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Re-render any dynamic content
  if (typeof onLangChange === 'function') onLangChange(lang);
}

// Apply on load
document.addEventListener('DOMContentLoaded', () => setLang(currentLang));
```

### HTML Usage Pattern

Mark ALL text-bearing elements with `data-i18n`:

```html
<!-- Static text -->
<h1 data-i18n="panel_mhit_title">Apa itu MHIT?</h1>
<p data-i18n="panel_mhit_definition">Insurans/Takaful Perubatan dan Kesihatan...</p>
<button data-i18n="btn_start">Mula</button>

<!-- Dynamic / programmatic text (in JS) -->
resultTitleEl.textContent = t('result_projection_title');
adviceEl.innerHTML = t('result_advice_body');
```

### String Key Conventions for This Project

Keys for Project 3 (MHIT Health Budget Planner):

- `panel_mhit_title`, `panel_mhit_definition`, `panel_mhit_protects`
- `panel_why_title`, `panel_why_1`, `panel_why_2`, `panel_why_3`
- `panel_how_title`, `panel_how_steps`
- `panel_abc_title`, `panel_abc_a`, `panel_abc_b`, `panel_abc_c`
- `game_title`, `game_subtitle`
- `input_age_label`, `input_age_placeholder`
- `input_plan_label`, `input_plan_none`, `input_plan_basic`, `input_plan_comprehensive`
- `btn_calculate`
- `result_projection_title`, `result_gap_label`, `result_advice_title`, `result_advice_body`
- `btn_start`, `btn_recalculate`

### Language Persistence
- `localStorage` key: `imd_lang`
- Default: `'bm'`
- Persists across page reloads and between projects (visitor may switch once and all 6 projects remember)
- Reset on idle/attract screen return: optionally reset to `'bm'` for museum context

### Milestone Impact
Add to the FIRST milestone of this project:
- Set up `i18n.js` with all BM strings from Content Specification
- Add English translations for all strings (reference `DESIGN_SYSTEM_REFERENCE.md` Section 9)
- Wire language toggle to all static elements
- Test language switch on every screen

---

## AMENDMENT C — Project-Specific Style Notes

**PROJECT 3 (MHIT Health Planner):** Health-teal palette (primary `#00B4A6`) accent alongside BNM blue. Background: warm cream. ABC buying guide uses illustrated icon cards (A=calculator icon, B=balance scale, C=shopping bag). Calculator/planner game screen: friendly illustrated doctor or family character. Projection chart: Chart.js with warm palette (teal for savings, coral for projected costs). Result advice panel: illustrated character with speech bubble.
