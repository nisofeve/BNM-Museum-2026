# PROJECT 02 — Malaysia-Singapore Cross-Border QR Payment Experience

**PIC:** Atikah
**Format:** HTML5 Touchscreen Interactive (Kiosk/Exhibition)
**Language:** Bahasa Malaysia (primary) / English (secondary, labels only)
**Date:** June 2026

---

## 1. Project Overview

### Purpose
An immersive, multi-section educational experience that guides museum visitors through the history, mechanics, and benefits of cross-border QR payments between Malaysia and Singapore. The experience combines cinematic narrative, video segments, a hands-on QR payment simulation, explainer sequences, safety tips, and a short quiz — creating a complete journey from storytelling to practical knowledge.

### Target Audience
- General public, all age groups (primary: 18–55)
- Museum exhibition visitors at Festival Hari Museum Antarabangsa 2026
- Range from unbanked/low digital literacy to tech-savvy users
- International visitors (both Malaysian and Singaporean citizens)

### PIC
Atikah

### Display Context
- Large touchscreen display or interactive kiosk in a museum hall
- Unattended operation; visitors self-navigate through the experience
- Session duration: ~6–10 minutes for full journey; sections are skippable
- Must return to attract/opening loop after 60 seconds of inactivity
- No keyboard input; all interaction via touch
- Possible side-by-side dual kiosk (Malaysia side / Singapore side) — design should support a mirrored second instance

### Format
HTML5 single-page application — self-contained, no external API dependencies at runtime. Video files stored locally. Deployable as local static files served by a minimal HTTP server (e.g., `npx serve` or Python `http.server`).

---

## 2. Technical Stack

### Core Technologies
- **HTML5** — semantic sectioning, `<video>` for video segments, `<canvas>` for particle/light effects
- **CSS3** — CSS custom properties, flexbox/grid layout, CSS scroll snap (section navigation), keyframe animations, CSS `clip-path` for reveal effects
- **JavaScript (Vanilla ES6+)** — section controller, touch swipe detection, quiz logic, simulation state

### Animation Libraries
- **GSAP 3.x** with plugins:
  - `ScrollTrigger` (NOT for scroll — repurposed for timeline-driven entrance animations)
  - `MotionPathPlugin` — digital light stream animation (opening sequence)
  - `TextPlugin` — typewriter effect for narrative text
  - `DrawSVGPlugin` (Club GSAP or CSS stroke-dashoffset alternative) — animated connecting lines between Malaysia and Singapore
  - CDN: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`

### Visual Effects
- **Canvas 2D API** — light stream particles for opening JB-Singapore connection animation
- **CSS `backdrop-filter: blur()`** — frosted glass UI panels
- **CSS `clip-path` polygon transitions** — diagonal wipes between sections
- **SVG animations** — QR code "scan line" effect, payment flow arrows

### Video
- HTML5 `<video>` element, `playsinline` attribute for iOS compatibility
- Video files: MP4 (H.264), stored in `/assets/video/`
- Two video clips: `video-friend-transfer.mp4` and `video-transport-payment.mp4`
- Poster images provided for preload state

### Audio
- HTML5 Audio with Web Audio API for spatial panning effect in opening sequence
- BGM: ambient loop
- SFX: interaction sounds, payment success chime, notification sounds

### Recommended Resolution / Display
- **Primary target:** 1920×1080px (Full HD landscape) at 100% DPR
- **Alternatively:** 1080×1920px (portrait kiosk) — the layout system must support both orientations via CSS media queries / JS orientation detection
- All interactive elements: minimum **60×60px** touch target
- Text: minimum 20px body at 1920px width for comfortable museum viewing distances

### File Structure
```
project-02-crossborder-qr/
├── index.html
├── styles/
│   ├── main.css           # CSS variables, reset, typography
│   ├── layout.css         # Section container, scroll system
│   ├── sections.css       # Per-section styles (opening, video, sim, etc.)
│   ├── components.css     # Buttons, cards, quiz UI, modal, tips
│   ├── animations.css     # Keyframe definitions
│   └── simulation.css     # QR simulation step styles
├── scripts/
│   ├── main.js            # Entry point, section controller, idle timer
│   ├── state.js           # App state, section progress, quiz answers
│   ├── opening.js         # Opening canvas animation (light streams)
│   ├── simulation.js      # QR payment simulation step logic
│   ├── quiz.js            # Quiz logic, scoring, result display
│   ├── funfacts.js        # Fun fact pop-up timing and display
│   └── audio.js           # Audio manager
├── assets/
│   ├── images/
│   │   ├── map-my-sg.svg          # Stylised Malaysia-Singapore map
│   │   ├── jb-skyline.svg         # JB city silhouette
│   │   ├── sg-skyline.svg         # Singapore city silhouette
│   │   ├── causeway.svg           # Causeway/bridge illustration
│   │   ├── qr-code-sample.svg     # Sample QR code (non-functional, for demo)
│   │   ├── ewallet-tng.svg        # Touch 'n Go eWallet logo
│   │   ├── ewallet-boost.svg      # Boost logo
│   │   ├── bnm-logo.png           # Bank Negara Malaysia logo
│   │   ├── mas-logo.png           # Monetary Authority of Singapore logo
│   │   ├── phone-mockup.svg       # Phone frame (for QR simulation)
│   │   ├── merchant-icon.svg      # Merchant/shop icon
│   │   ├── shield-tip.svg         # Safety tip shield icon
│   │   └── confetti-sprite.svg    # Confetti for quiz completion
│   ├── video/
│   │   ├── video-friend-transfer.mp4
│   │   ├── video-friend-transfer-poster.jpg
│   │   ├── video-transport-payment.mp4
│   │   └── video-transport-payment-poster.jpg
│   └── audio/
│       ├── bgm-ambient.mp3
│       ├── sfx-tap.mp3
│       ├── sfx-qr-scan.mp3
│       ├── sfx-payment-success.mp3
│       ├── sfx-notification.mp3
│       ├── sfx-whoosh.mp3
│       ├── sfx-quiz-correct.mp3
│       ├── sfx-quiz-wrong.mp3
│       ├── sfx-quiz-complete.mp3
│       └── sfx-fun-fact.mp3
├── data/
│   ├── funfacts.js        # Fun fact content array
│   └── quiz.js            # Quiz questions content array
└── vendor/
    ├── gsap.min.js
    ├── MotionPathPlugin.min.js
    └── TextPlugin.min.js
```

---

## 3. Application Architecture

### Section / Screen Flow

```
[ATTRACT SCREEN] ←──────────────────────────────────────────────┐
  - Animated JB-Singapore connection                             |
  - Pulsing CTA                                                  |
       |                                                         |
       | (tap CTA)                                               |
       v                                                         |
[SECTION 1 — OPENING NARRATIVE]                                  |
  - Animated light streams                                       |
  - Narrative text typewriter                                    |
  - CTA: "Tekan untuk meneroka..."                               |
       |                                                         |
       | (tap CTA)                                               |
       v                                                         |
[SECTION 2 — VIDEO SEGMENT]                                      |
  - Two video players (side by side or sequential)               |
  - Video: friend transfer + transport payment                   |
       |                                                         |
       | (videos end or skip button)                             |
       v                                                         |
[SECTION 3 — QR PAYMENT SIMULATION]                              |
  - Step-by-step interactive walkthrough                         |
  - 5 steps (Imbas → Pilih → Lihat → Sahkan → Terima)           |
       |                                                         |
       | (all 5 steps completed)                                 |
       v                                                         |
[SECTION 4 — BEHIND THE SCENES]                                  |
  - 4 explainer cards (animated reveal on tap)                   |
       |                                                         |
       | (all 4 cards revealed or "Seterusnya")                  |
       v                                                         |
[SECTION 5 — SAFETY TIPS]                                        |
  - 4 safety tip cards                                           |
       |                                                         |
       | (tap "Seterusnya")                                      |
       v                                                         |
[SECTION 6 — FUN FACTS]                                          |
  - 2 fact pop-ups (auto-appear or tap to reveal)                |
       |                                                         |
       | (tap "Seterusnya")                                      |
       v                                                         |
[SECTION 7 — QUIZ]                                               |
  - 4 questions, one at a time                                   |
  - Immediate per-question feedback                              |
       |                                                         |
       | (Q4 answered)                                           |
       v                                                         |
[SECTION 8 — CLOSING]                                            |
  - Closing message                                              |
  - "Mula Semula" button → Attract screen                        |
  - Auto-return after 60s → Attract screen ──────────────────────┘
```

### Navigation System
- **Forward progress only** for guided experience (no back button except from Quiz to replay)
- Persistent "Langkau" (Skip) button at bottom-right for each section (60×60px minimum)
- Section progress indicator: 8 dots at bottom-centre, current section highlighted
- "Seterusnya" (Next) button becomes active only after section's primary interaction is complete
- Swipe-left gesture also advances to next section (min 80px swipe distance)

### State Management
```javascript
const AppState = {
  section: 0,              // 0=attract, 1=opening, ..., 8=closing
  simulationStep: 0,       // 0–4 (QR simulation current step)
  behindCardsRevealed: 0,  // 0–4
  quizAnswers: [],         // [{q:1, chosen:'A', correct:true}, ...]
  quizScore: 0,            // 0–4
  idleTimer: null,
  audioEnabled: true,
  videoPlaying: false,
  funFactsShown: [],       // track which facts have been shown
  hasInteracted: false     // first interaction flag (audio unlock)
};
```

### Data Structures

```javascript
// data/quiz.js
const QUIZ = [
  {
    id: 1,
    question: "Apakah yang membolehkan pembayaran rentas sempadan?",
    options: [
      { key: "A", text: "Pertukaran wang tunai sahaja", correct: false },
      { key: "B", text: "Pembayaran serta-merta antara negara melalui sistem digital", correct: true }
    ]
  },
  // ...Q2–Q4
];

// data/funfacts.js
const FUN_FACTS = [
  {
    id: 1,
    text: "Malaysia dan Singapura antara negara terawal di ASEAN yang melaksanakan hubungan pembayaran QR rentas sempadan.",
    icon: "flag-asean"
  },
  {
    id: 2,
    text: "Tak perlu tukar duit atau cari ATM. Hanya imbas kod QR menggunakan Touch 'n Go eWallet atau Boost.",
    icon: "qr-no-cash"
  }
];
```

---

## 4. UI/UX Design Specification

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-primary` | `#030B1A` | Deepest background (night sky, space feel) |
| `--color-bg-panel` | `#0D1B2E` | Panel and card backgrounds |
| `--color-bg-card` | `#132338` | Inner card surface |
| `--color-bg-frosted` | `rgba(13,27,46,0.85)` | Frosted glass panels (backdrop-filter: blur) |
| `--color-malaysia` | `#CC0001` | Malaysia accent (flag red) |
| `--color-singapore` | `#EF3340` | Singapore accent (flag red, slightly lighter) |
| `--color-digital-light` | `#00E5FF` | Primary digital/tech colour — light streams, QR highlight |
| `--color-accent-gold` | `#FFD700` | Gold — BNM, trust, official |
| `--color-accent-green` | `#00C896` | Success, connected, positive |
| `--color-text-primary` | `#F0F4FF` | Main body text (slightly warm white) |
| `--color-text-secondary` | `#8BA3C7` | Subtitles, secondary info |
| `--color-text-muted` | `#4A6080` | Tertiary, disabled |
| `--color-border-subtle` | `rgba(0,229,255,0.15)` | Card borders, subtle glow lines |
| `--color-correct` | `#2ECC71` | Quiz correct answer |
| `--color-wrong` | `#E74C3C` | Quiz wrong answer |
| `--gradient-sky` | `linear-gradient(160deg, #030B1A 0%, #0A1628 40%, #06142A 100%)` | Main background gradient |
| `--gradient-malaysia` | `linear-gradient(135deg, #CC0001 0%, #7B0001 100%)` | Malaysia elements |
| `--gradient-connection` | `linear-gradient(90deg, #CC0001 0%, #00E5FF 50%, #EF3340 100%)` | Bridge/connection element |
| `--gradient-digital` | `linear-gradient(135deg, #00E5FF 0%, #0080FF 100%)` | Digital tech highlights |

**Rationale:** Deep space blue evokes the digital, borderless world. Malaysia red and Singapore red differentiate the two countries while looking cohesive. Cyan/electric blue represents digital payment infrastructure and data flows.

### Typography

| Element | Font | Weight | Size (1080p) | Notes |
|---|---|---|---|---|
| Experience title | `Montserrat` | 800 | 64px | Uppercase, letter-spacing 4px |
| Section heading | `Montserrat` | 700 | 44px | |
| Narrative text | `Noto Sans` | 400 | 22px | Line-height 1.8 — supports Malay diacritics |
| Body text | `Noto Sans` | 400 | 20px | Line-height 1.7 |
| Card heading | `Montserrat` | 600 | 26px | |
| Card body | `Noto Sans` | 400 | 18px | Line-height 1.6 |
| Simulation step | `Montserrat` | 600 | 24px | |
| Quiz question | `Noto Sans` | 600 | 28px | |
| Quiz option | `Noto Sans` | 400 | 22px | |
| Facts headline | `Montserrat` | 700 | 32px | |
| Label/tag | `Noto Sans` | 500 | 14px | Uppercase, letter-spacing 2px |
| Score counter | `Montserrat` | 800 | 80px | |

Load via: `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap" rel="stylesheet">`
Bundle as WOFF2 in `/assets/fonts/` for offline use.

### Layout Grid
- Root container: 1920×1080px, `overflow: hidden`
- Section wrapper: full 1920×1080, stacked in DOM; only active section is visible (`display: none` or `opacity 0, pointer-events: none` for inactive)
- Content safe zone: 160px horizontal padding, 80px vertical padding (leaves 1600×920 usable area)
- Two-column sections (narrative, behind-the-scenes): `display: grid; grid-template-columns: 1fr 1fr; gap: 64px`
- Full-width sections (video, simulation): single column centred
- Navigation bar (persistent): bottom strip 80px height, z-index 200
- Section progress dots: `position: fixed; bottom: 24px; left: 50%`
- Skip button: `position: fixed; bottom: 24px; right: 48px`

### Component Library

**SectionCTA (Primary Action Button)**
```
Background: gradient(135deg, #00E5FF → #0080FF)
Text: #030B1A (dark), Montserrat 700, 20px, uppercase, letter-spacing 2px
Padding: 20px 56px
Border-radius: 40px (pill shape)
Min-height: 64px
Box-shadow: 0 0 32px rgba(0,229,255,0.4)
Hover/active: scale(0.97), brightness(1.05)
Animation: subtle glow pulse 2s infinite when idle (waiting for user action)
```

**SkipButton (Secondary)**
```
Background: rgba(13,27,46,0.8)
Border: 1px solid rgba(0,229,255,0.3)
Text: #8BA3C7, Noto Sans 500, 16px
Padding: 12px 28px
Border-radius: 24px
Size: 60px height minimum
```

**ExplainerCard (Behind the Scenes)**
```
Background: #132338
Border: 1px solid rgba(0,229,255,0.2)
Border-radius: 20px
Padding: 40px 36px
Width: 420px (in a 2×2 grid at 1920px)
Hover border glow: 0 0 24px rgba(0,229,255,0.3)
Unrevealed state: opacity 0.3, blur(4px), tap to reveal
Revealed state: full opacity, slide-up animation
Icon container: 72×72px circle, gradient background, icon centred
```

**SafetyTipCard**
```
Background: rgba(0,200,150,0.08)
Border: 1px solid rgba(0,200,150,0.25)
Border-radius: 16px
Left accent bar: 4px × full height, #00C896
Padding: 28px 32px 28px 44px
Shield icon: 48×48px, colour #00C896
Text: Noto Sans 400, 20px
Animation: slides in from left with 120ms stagger
```

**QuizCard**
```
Background: #0D1B2E
Border: 1px solid rgba(0,229,255,0.2)
Border-radius: 24px
Padding: 48px
Max-width: 880px, centred
Question text: Noto Sans 600, 28px
Options: two OptionPills stacked vertically
```

**OptionPill (Quiz)**
```
Background: #132338
Border: 2px solid rgba(139,163,199,0.2)
Border-radius: 16px
Padding: 24px 32px
Text: Noto Sans 400, 22px
Min-height: 72px
Width: 100% of card
Selected-correct: background #0A2A1A, border-color #2ECC71, left icon ✓
Selected-wrong: background #2A0A0A, border-color #E74C3C, left icon ✗
Correct-reveal (when wrong chosen): background #0A2A1A, border-color #2ECC71, dim opacity 0.7
```

**SimulationPhoneMockup**
```
Frame: phone-mockup.svg, 320×600px (visible screen 260×520px)
Shadow: 0 40px 80px rgba(0,0,0,0.7)
Screen content: changes per step (Canvas 2D or layered DOM)
Animation: subtle floating — translateY(0)↔(-12px), 3s ease-in-out infinite
```

**ProgressDot (Section Indicator)**
```
Default: 10×10px circle, background rgba(139,163,199,0.3)
Active: 28×10px pill, background #00E5FF, box-shadow 0 0 12px rgba(0,229,255,0.6)
Completed: 10×10px circle, background #00C896
Transition: width 300ms easeOutCubic
Spacing: 12px gap
```

**FunFactBubble**
```
Shape: rounded speech bubble, 600×auto
Background: rgba(0,229,255,0.06)
Border: 1px solid rgba(0,229,255,0.3)
Border-radius: 24px (with CSS tail if needed)
Icon: 60×60px, themed per fact
Text: Noto Sans 400, 20px
Entry animation: scale(0.6)→1.0, opacity 0→1, 500ms easeOutBack
```

### Touch / Interaction Targets
- All tappable elements: minimum **60×60px** (enforced via padding and `min-height/min-width`)
- Quiz option pills: 72px height, full card width
- CTA buttons: 64px height, 280px min-width
- Skip button: 60px height
- Simulation step indicators (dots): 48×48px
- Fun fact pop-up dismiss: entire bubble tappable (no small X button)
- `touch-action: manipulation` on all interactive elements

### Idle / Attract Behaviour
- Idle timeout: **60 seconds** (longer than PROJECT 01, as sections require reading time)
- Timer resets on any `touchstart`
- On idle: smooth crossfade (1s) to attract screen
- Attract screen: continuous opening animation loop (light streams between JB and Singapore)
- Attract CTA: "Tekan untuk meneroka pembayaran rentas sempadan antara Malaysia dan Singapura" — pulsing

---

## 5. Screen-by-Screen Design

### SCREEN 0: Attract Screen

**Purpose:** Passive loop, draws visitor attention.

**Layout:**
- Full-screen Canvas: animated digital light streams flowing between two city silhouettes (JB left, Singapore right)
- City silhouettes: SVG, dark navy (#0D1B2E) against background
- Bridge/causeway line at bottom connecting cities: animated dashes flowing left↔right
- Floating particles: small dots drifting between cities, colour `#00E5FF`, opacity 0.3–0.8
- Centred overlay title: "PEMBAYARAN RENTAS SEMPADAN" (Montserrat 800, 72px, white)
- Sub-headline: "Malaysia ↔ Singapura" (Montserrat 600, 36px, gradient text)
- Pulsing CTA: "TEKAN UNTUK MENEROKA" (SectionCTA button)
- Bottom strip: BNM logo (left) | MAS logo (right) | "Festival Hari Museum Antarabangsa 2026" (centre)

**Interactions:** Tap anywhere → setState(section: 1), begin opening sequence

---

### SECTION 1: Opening Narrative

**Layout:** Full-screen immersive (no side panels)

**Top area (40% height):**
- Animated SVG: JB skyline silhouette (left, 40% width) and Singapore skyline (right, 40% width)
- Digital light streams (Canvas) flow between the cities, pulsing along invisible connection paths
- Causeway bridge graphic at bottom, dashes animating from MY → SG and SG → MY simultaneously

**Centre (30% height):**
- Narrative text 1 (appears with typewriter effect):
  > "Dunia yang semakin bersambung... Kini, semuanya terasa lebih dekat..."
  (Montserrat 700, 36px, #F0F4FF, centred, letter-spacing 1px)
- Text 2 (appears after text 1, slide-up, 800ms delay):
  > "Dahulu, pembayaran rentas negara memerlukan wang tunai dan pertukaran mata wang. Hari ini, hanya perlu satu imbasan QR."
  (Noto Sans 400, 22px, #8BA3C7, max-width 900px, centred)
- Text 3 (appears after text 2, 600ms delay):
  > "Pembayaran digital rentas sempadan menunjukkan bagaimana Malaysia dan Singapura berbeza dari segi negara, tetapi bersatu sebagai satu ekosistem digital."
  (Noto Sans 400, 20px, #8BA3C7, max-width 900px, centred)

**Bottom (30% height):**
- CTA button (pulsing SectionCTA):
  > "Tekan untuk meneroka pembayaran rentas sempadan antara Malaysia dan Singapura"
  (button text, Noto Sans 500, 18px, max-width 700px, centred)

**Interactions:**
- Tap CTA → advance to Section 2

---

### SECTION 2: Video Segment

**Purpose:** Two real-world scenario videos showing cross-border payment use cases.

**Layout:**
- Section heading (top-left): "Lihat Sendiri" (Montserrat 700, 44px)
- Sub-heading: "Dua situasi sebenar menggunakan pembayaran QR rentas sempadan"
- Two video cards side by side (each 800×500px at 1920px wide):

**Video Card 1: Friend Money Transfer**
```
Title: "Hantar Wang kepada Rakan"
Description: "Bayar balik rakan anda dalam saat — walaupun mereka berada di Singapura."
Thumbnail / Poster: friend-transfer-poster.jpg
Duration badge: top-right corner
Play button: 80×80px circle, centred on poster, semi-transparent dark bg
Captions/subtitles option: subtitle toggle button (CC icon)
```

**Video Card 2: Transport Payment Abroad**
```
Title: "Bayar Pengangkutan di Luar Negara"
Description: "Ambil MRT atau bas di Singapura — tanpa perlu tukar duit atau cari ATM."
Thumbnail / Poster: transport-payment-poster.jpg
Play button: same as card 1
```

**Video controls:**
- Each video plays inline within the card (no fullscreen takeover)
- On play: other video pauses automatically
- Progress bar at card bottom
- Skip/mute button on each card
- "Seterusnya" button activates after both videos have been played, OR after 15 seconds (skip allowed)

**Interactions:**
- Tap video card → play/pause
- Tap "Seterusnya" → Section 3

---

### SECTION 3: Interactive QR Payment Simulation

**Purpose:** Hands-on walkthrough of the 5-step cross-border QR payment flow.

**Layout:**
- Left panel (45% width): Phone mockup displaying current step's UI
- Right panel (55% width): Step description, instruction text, and tap-to-advance interaction
- Top: Step progress dots (1–5, connected by a line)

**Step display system:**
- Current step: full opacity, step title in `--color-digital-light`
- Completed steps: smaller, green checkmark icon replaces number
- Future steps: muted opacity 0.4

**Step 1 — Imbas Kod QR**
```
Phone screen shows: QR code scanner viewfinder with scanning animation (green line sweeping)
Right panel heading: "Langkah 1: Imbas Kod QR"
Instruction: "Buka aplikasi e-dompet anda dan imbas kod QR peniaga."
Tap target: "QR code" on phone screen (large 120×120px area)
On tap: scan line flashes, success bleep, phone screen transitions to next step
Animation: QR scan beam sweeps bottom-to-top over 1.2s
```

**Step 2 — Pilih E-Dompet Malaysia**
```
Phone screen shows: wallet selection screen with Touch 'n Go and Boost logos (list items, 80px each)
Right panel heading: "Langkah 2: Pilih E-Dompet Malaysia"
Instruction: "Pilih e-dompet anda untuk meneruskan pembayaran."
Tap target: Either e-wallet logo button
On tap: selected item highlights, phone transitions
```

**Step 3 — Lihat Penukaran RM-SGD Secara Serta-merta**
```
Phone screen shows: payment confirmation screen
  - Merchant name: "Merchant SG Pte Ltd"
  - Amount MYR: "RM 15.00"
  - Real-time FX rate: "Kadar: 1 SGD = RM 3.42"
  - Amount SGD: "SGD 4.39"
  - Animated: FX rate appears with a number-spin animation (0.00 → 3.42 in 0.8s)
Right panel heading: "Langkah 3: Penukaran RM-SGD Serta-merta"
Instruction: "Lihat jumlah dalam Ringgit Malaysia dan nilai dalam Dolar Singapura — diira secara automatik."
Tap target: "Sahkan" (Confirm) button on phone
On tap: phone transitions to next step
```

**Step 4 — Sahkan Pembayaran**
```
Phone screen shows: PIN entry screen (6-dot PIN pad, blurred/dummy input)
  - Biometric alternative: fingerprint icon
Right panel heading: "Langkah 4: Sahkan Pembayaran"
Instruction: "Masukkan PIN atau gunakan biometrik untuk mengesahkan transaksi anda."
Tap target: Fingerprint icon or PIN pad
On tap: fingerprint pulse animation, processing spinner, then success
```

**Step 5 — Peniaga Menerima Bayaran**
```
Phone screen shows: Split-screen animation
  - Left (user phone): Green tick, "Berjaya!" payment receipt
  - Right (merchant terminal): Ding notification, receipt shows "SGD 4.39 diterima"
  - Digital line flows from user phone to merchant terminal
Right panel heading: "Langkah 5: Peniaga Menerima Bayaran"
Instruction: "Peniaga menerima bayaran dalam saat — terus ke akaun bank mereka."
Tap target: None (auto-advance after 2s, or tap "Seterusnya")
Animation: success confetti micro-burst, payment success chime
```

---

### SECTION 4: Behind the Scenes

**Purpose:** Explains the technical and regulatory infrastructure that enables cross-border payments.

**Layout:** 2×2 grid of ExplainerCards, each revealed by tap

**Card 1 — Sistem Penyelesaian Antara Bank**
```
Icon: bank building with network lines (72×72px, gradient fill)
Title: "Sistem Penyelesaian Antara Bank"
Body: "Setiap transaksi diproses melalui sistem penyelesaian antara bank yang selamat dan dikawal selia — memastikan wang sampai ke tangan yang betul dalam masa nyata."
Unrevealed state: icon visible, title visible, body blurred/hidden
Tap to reveal: body slides up, background brightens
```

**Card 2 — Kebolehgunaan QR Rentas Sempadan**
```
Icon: QR code with globe/earth element
Title: "Kebolehgunaan QR Rentas Sempadan"
Body: "Kod QR yang digunakan di Malaysia dan Singapura mengikut standard antarabangsa yang sama — membolehkan imbasan rentas sempadan tanpa aplikasi tambahan."
```

**Card 3 — Enjin Penukaran Mata Wang**
```
Icon: currency exchange arrows (RM ↔ SGD)
Title: "Enjin Penukaran Mata Wang"
Body: "Kadar pertukaran dikira secara serta-merta menggunakan kadar pasaran semasa. Tiada caj tersembunyi — apa yang anda lihat adalah apa yang anda bayar."
```

**Card 4 — Kerjasama Pengawalseliaan Antara Negara**
```
Icon: handshake with BNM + MAS logos
Title: "Kerjasama Pengawalseliaan Antara Negara"
Body: "Bank Negara Malaysia (BNM) dan Monetary Authority of Singapore (MAS) bekerjasama untuk memastikan keselamatan, perlindungan pengguna, dan pematuhan peraturan dalam setiap transaksi."
```

**Interaction:** Tap any unrevealed card → reveal animation. "Seterusnya" button activates after all 4 cards are revealed (or after 20 seconds).

---

### SECTION 5: Safety Tips

**Purpose:** Practical safety advice for using cross-border QR payments.

**Layout:**
- Section intro text (Noto Sans 400, 22px, #8BA3C7):
  > "Bayaran QR rentas sempadan sebenarnya mudah dan selamat."
  > "Tip:"
- 4 SafetyTipCards stacked vertically, staggered slide-in animation (120ms between each)

**Card 1:**
```
Icon: QR shield (shield with QR pattern)
Text: "Imbas QR daripada peniaga yang betul"
```

**Card 2:**
```
Icon: magnifying glass with merchant icon
Text: "Semak nama peniaga dan jumlah"
```

**Card 3:**
```
Icon: phone lock with fingerprint
Text: "Lindungi telefon dengan PIN/biometric"
```

**Card 4:**
```
Icon: padlock with prohibited OTP
Text: "Jangan kongsi OTP"
```

**Interaction:** Cards appear on entry; "Seterusnya" available immediately (no interaction gate)

---

### SECTION 6: Fun Facts

**Purpose:** Engaging trivia pop-ups.

**Layout:**
- Dark background, centred content area
- Section heading: "Tahukah Anda?" (Montserrat 700, 48px)
- Fun facts appear as FunFactBubble components, centre-screen

**Fact 1 (appears on enter, 500ms delay):**
```
Icon: ASEAN map with highlighted MY+SG
Text: "Malaysia dan Singapura antara negara terawal di ASEAN yang melaksanakan hubungan pembayaran QR rentas sempadan."
```

**Fact 2 (appears after Fact 1 is tapped, or 4s delay):**
```
Icon: QR code with no-cash symbol
Text: "Tak perlu tukar duit atau cari ATM. Hanya imbas kod QR menggunakan Touch 'n Go eWallet atau Boost."
e-wallet logos shown below text: TNG and Boost logos, 40×40px each
```

**Interaction:**
- Tap Fact 1 bubble → Fact 2 appears (scale bounce)
- Tap Fact 2 bubble (or "Seterusnya" button) → advance to Section 7

---

### SECTION 7: Quiz

**Purpose:** Test comprehension, reinforce key learnings.

**Layout:**
- Section heading: "Uji Pengetahuan Anda" (Montserrat 700, 44px)
- Question progress: "Soalan 1 daripada 4" (Noto Sans 500, 18px, #8BA3C7)
- Single QuizCard visible at a time, centred
- Progress indicator: 4 dots at top of card

**Q1:**
```
Question: "Apakah yang membolehkan pembayaran rentas sempadan?"
Option A: "Pertukaran wang tunai sahaja"
Option B: "Pembayaran serta-merta antara negara melalui sistem digital"
Correct: B
```

**Q2:**
```
Question: "Mengapa Malaysia dan Singapura menghubungkan sistem pembayaran?"
Option A: "Untuk memudahkan perjalanan dan perdagangan"
Option B: "Untuk meningkatkan penggunaan tunai"
Correct: A
```

**Q3:**
```
Question: "Siapa yang bekerjasama untuk membolehkan pembayaran rentas sempadan?"
Option A: "Hanya peniaga"
Option B: "Bank, pengawal selia dan rangkaian pembayaran"
Correct: B
```

**Q4:**
```
Question: "Apakah manfaat jangka panjang sistem pembayaran rentas sempadan?"
Option A: "Ekonomi serantau yang lebih bersambung"
Option B: "Kurang perdagangan antara negara"
Correct: A
```

**Per-question feedback (inline, below options):**
- Correct: green banner slides down from card top — "Betul! ✓" (Montserrat 700, 24px, #2ECC71), then "Teruskan" appears
- Wrong: red banner — "Cuba Lagi — Jawapan betul: [option text]" (Noto Sans 500, 20px, #E74C3C), correct option highlighted green, then "Teruskan" appears

**Scoring:** 1 point per correct answer. No negative scoring (quiz is educational, not punitive).

---

### SECTION 8: Closing

**Layout:**
- Centred, full-screen overlay of digital light streams (same as opening, but more celebratory — faster particles, warmer colour mix)
- Closing message (centred, fade in over 1.2s):
  > "Tahniah! Anda telah mengalami bagaimana kewangan digital menghubungkan manusia, perniagaan dan negara."
  (Montserrat 700, 36px, #F0F4FF, max-width 900px)
- Second line (appears 800ms after first):
  > "Kewangan bukan sekadar transaksi -- ia menyatukan kita!"
  (Montserrat 800, 44px, gradient text: `--gradient-connection`, max-width 800px)
- Quiz score summary:
  > "Skor kuiz anda: X/4" (Montserrat 700, 48px, #FFD700)
  - 4 small quiz result dots below (green = correct, red = wrong)
- "MULA SEMULA" button (SectionCTA, prominent)
- Small footer: BNM / MAS logos, "Festival Hari Museum Antarabangsa 2026"
- Auto-returns to attract screen after 60 seconds

---

## 6. Content Specification

### All Copy Strings (Verbatim)

```
EXPERIENCE_TITLE = "Malaysia-Singapore Cross-Border QR Payment Experience"
ATTRACT_TITLE = "PEMBAYARAN RENTAS SEMPADAN"
ATTRACT_SUBTITLE = "Malaysia ↔ Singapura"
ATTRACT_CTA = "Tekan untuk meneroka pembayaran rentas sempadan antara Malaysia dan Singapura"

S1_NARRATIVE_1 = "Dunia yang semakin bersambung... Kini, semuanya terasa lebih dekat..."
S1_NARRATIVE_2 = "Dahulu, pembayaran rentas negara memerlukan wang tunai dan pertukaran mata wang. Hari ini, hanya perlu satu imbasan QR."
S1_NARRATIVE_3 = "Pembayaran digital rentas sempadan menunjukkan bagaimana Malaysia dan Singapura berbeza dari segi negara, tetapi bersatu sebagai satu ekosistem digital."
S1_CTA = "Tekan untuk meneroka pembayaran rentas sempadan antara Malaysia dan Singapura"

S2_HEADING = "Lihat Sendiri"
S2_SUBHEADING = "Dua situasi sebenar menggunakan pembayaran QR rentas sempadan"
VIDEO_1_TITLE = "Hantar Wang kepada Rakan"
VIDEO_1_DESC = "Bayar balik rakan anda dalam saat — walaupun mereka berada di Singapura."
VIDEO_2_TITLE = "Bayar Pengangkutan di Luar Negara"
VIDEO_2_DESC = "Ambil MRT atau bas di Singapura — tanpa perlu tukar duit atau cari ATM."

S3_HEADING = "Cuba Sendiri: Simulasi Pembayaran QR"
SIM_STEP_1_TITLE = "Langkah 1: Imbas Kod QR"
SIM_STEP_1_INST = "Buka aplikasi e-dompet anda dan imbas kod QR peniaga."
SIM_STEP_2_TITLE = "Langkah 2: Pilih E-Dompet Malaysia"
SIM_STEP_2_INST = "Pilih e-dompet anda untuk meneruskan pembayaran."
SIM_STEP_3_TITLE = "Langkah 3: Penukaran RM-SGD Serta-merta"
SIM_STEP_3_INST = "Lihat jumlah dalam Ringgit Malaysia dan nilai dalam Dolar Singapura — diira secara automatik."
SIM_STEP_4_TITLE = "Langkah 4: Sahkan Pembayaran"
SIM_STEP_4_INST = "Masukkan PIN atau gunakan biometrik untuk mengesahkan transaksi anda."
SIM_STEP_5_TITLE = "Langkah 5: Peniaga Menerima Bayaran"
SIM_STEP_5_INST = "Peniaga menerima bayaran dalam saat — terus ke akaun bank mereka."

S4_HEADING = "Di Sebalik Tabir"
CARD_1_TITLE = "Sistem Penyelesaian Antara Bank"
CARD_1_BODY = "Setiap transaksi diproses melalui sistem penyelesaian antara bank yang selamat dan dikawal selia — memastikan wang sampai ke tangan yang betul dalam masa nyata."
CARD_2_TITLE = "Kebolehgunaan QR Rentas Sempadan"
CARD_2_BODY = "Kod QR yang digunakan di Malaysia dan Singapura mengikut standard antarabangsa yang sama — membolehkan imbasan rentas sempadan tanpa aplikasi tambahan."
CARD_3_TITLE = "Enjin Penukaran Mata Wang"
CARD_3_BODY = "Kadar pertukaran dikira secara serta-merta menggunakan kadar pasaran semasa. Tiada caj tersembunyi — apa yang anda lihat adalah apa yang anda bayar."
CARD_4_TITLE = "Kerjasama Pengawalseliaan Antara Negara"
CARD_4_BODY = "Bank Negara Malaysia (BNM) dan Monetary Authority of Singapore (MAS) bekerjasama untuk memastikan keselamatan, perlindungan pengguna, dan pematuhan peraturan dalam setiap transaksi."

S5_HEADING = "Tips Keselamatan"
S5_INTRO = "Bayaran QR rentas sempadan sebenarnya mudah dan selamat."
TIP_1 = "Imbas QR daripada peniaga yang betul"
TIP_2 = "Semak nama peniaga dan jumlah"
TIP_3 = "Lindungi telefon dengan PIN/biometric"
TIP_4 = "Jangan kongsi OTP"

S6_HEADING = "Tahukah Anda?"
FACT_1 = "Malaysia dan Singapura antara negara terawal di ASEAN yang melaksanakan hubungan pembayaran QR rentas sempadan."
FACT_2 = "Tak perlu tukar duit atau cari ATM. Hanya imbas kod QR menggunakan Touch 'n Go eWallet atau Boost."

Q1_TEXT = "Apakah yang membolehkan pembayaran rentas sempadan?"
Q1_A = "Pertukaran wang tunai sahaja"
Q1_B = "Pembayaran serta-merta antara negara melalui sistem digital"
Q1_CORRECT = "B"

Q2_TEXT = "Mengapa Malaysia dan Singapura menghubungkan sistem pembayaran?"
Q2_A = "Untuk memudahkan perjalanan dan perdagangan"
Q2_B = "Untuk meningkatkan penggunaan tunai"
Q2_CORRECT = "A"

Q3_TEXT = "Siapa yang bekerjasama untuk membolehkan pembayaran rentas sempadan?"
Q3_A = "Hanya peniaga"
Q3_B = "Bank, pengawal selia dan rangkaian pembayaran"
Q3_CORRECT = "B"

Q4_TEXT = "Apakah manfaat jangka panjang sistem pembayaran rentas sempadan?"
Q4_A = "Ekonomi serantau yang lebih bersambung"
Q4_B = "Kurang perdagangan antara negara"
Q4_CORRECT = "A"

QUIZ_CORRECT_LABEL = "Betul!"
QUIZ_WRONG_LABEL = "Cuba Lagi"
QUIZ_WRONG_REVEAL = "Jawapan betul:"

CLOSING_LINE_1 = "Tahniah! Anda telah mengalami bagaimana kewangan digital menghubungkan manusia, perniagaan dan negara."
CLOSING_LINE_2 = "Kewangan bukan sekadar transaksi -- ia menyatukan kita!"
CLOSING_SCORE = "Skor kuiz anda:"

BTN_NEXT = "Seterusnya"
BTN_SKIP = "Langkau"
BTN_RESTART = "Mula Semula"
BTN_CONFIRM = "Sahkan"
```

---

## 7. Animation & VFX Specification

### Opening Light Stream (Canvas Animation)

```javascript
// opening.js — Canvas-based light stream particle system
// Canvas covers full 1920×1080

class LightParticle {
  constructor() {
    // Start at random point along left 40% of screen (JB side)
    this.x = Math.random() * 800;
    this.y = 200 + Math.random() * 400;
    // Target: right 40% (Singapore side)
    this.targetX = 1120 + Math.random() * 800;
    this.targetY = 200 + Math.random() * 400;
    this.progress = 0;           // 0 → 1 along path
    this.speed = 0.003 + Math.random() * 0.005;
    this.size = 2 + Math.random() * 3;
    this.alpha = 0;
    this.colour = ['#00E5FF', '#0080FF', '#CC0001', '#EF3340'][Math.floor(Math.random()*4)];
    this.trail = [];             // last 12 positions for trail effect
  }
  update() {
    this.progress += this.speed;
    if (this.progress >= 1) this.reset();
    // Cubic bezier path with mid-point slightly above centre (arc effect)
    // P0: start, P1: (960, 150), P2: (960, 150), P3: target
    const t = this.progress;
    const bx = (3*(1-t)*(1-t)*t * 960) + (3*(1-t)*t*t * 960) + (t*t*t * this.targetX);
    const by = ((1-t)**3 * this.y) + (3*(1-t)*(1-t)*t * 150) + (3*(1-t)*t*t * 150) + (t*t*t * this.targetY);
    this.trail.push({x: bx, y: by});
    if (this.trail.length > 12) this.trail.shift();
    this.alpha = Math.sin(this.progress * Math.PI) * 0.9;
  }
  draw(ctx) {
    // Draw trail as fading line
    ctx.save();
    ctx.strokeStyle = this.colour;
    ctx.lineWidth = this.size;
    ctx.lineCap = 'round';
    this.trail.forEach((pt, i) => {
      ctx.globalAlpha = (i / this.trail.length) * this.alpha;
      ctx.beginPath();
      if (i > 0) {
        ctx.moveTo(this.trail[i-1].x, this.trail[i-1].y);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
      }
    });
    ctx.restore();
  }
}

// Maintain pool of 80 particles for attract screen, 50 for opening section
```

### Global Section Transitions

| Transition | Type | Duration | Easing | Details |
|---|---|---|---|---|
| Any section → next | Diagonal wipe right | 600ms | `easeInOutCubic` | CSS `clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%)` → `polygon(0 0, 100% 0, 100% 100%, 0 100%)` |
| Attract → Section 1 | Fade + scale | 800ms | `easeOutQuart` | Attract fades, Section 1 scales from 1.05→1.0 |
| Any → Attract (idle) | Full fade | 1000ms | `easeInOutSine` | Graceful, 1s crossfade |
| Section 7 quiz Q advance | Slide left | 400ms | `easeInOutCubic` | Current card slides off left, next card slides in from right |

### Opening Narrative Text Animation

```javascript
// GSAP TextPlugin typewriter for narrative lines
gsap.to("#narrative-1", {
  duration: 2.0,
  text: { value: S1_NARRATIVE_1, delimiter: "" },
  ease: "none",
  onComplete: () => {
    gsap.to("#narrative-2", { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
  }
});
// narrative-2 and narrative-3 are pre-set (opacity:0, y:20px), revealed after typewriter
```

### QR Scan Animation (Simulation Step 1)

```css
@keyframes scan-line {
  0%   { top: 10%; opacity: 1; }
  50%  { top: 85%; opacity: 0.8; }
  100% { top: 10%; opacity: 1; }
}
.qr-scan-line {
  position: absolute;
  width: 90%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #00E5FF, transparent);
  box-shadow: 0 0 12px rgba(0,229,255,0.8);
  animation: scan-line 1.5s ease-in-out infinite;
}
```

### FX Rate Number Spin (Simulation Step 3)

```javascript
// Animate rate from 0.00 to 3.42 using GSAP
gsap.fromTo("#fx-rate", 
  { innerHTML: "0.00" },
  { 
    innerHTML: "3.42",
    duration: 0.8,
    ease: "power2.out",
    snap: { innerHTML: 0.01 },
    onUpdate: function() {
      this.targets()[0].innerHTML = parseFloat(this.targets()[0].innerHTML).toFixed(2);
    }
  }
);
```

### Fingerprint Pulse (Simulation Step 4)

```css
@keyframes fingerprint-pulse {
  0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,229,255,0.6); }
  50%  { transform: scale(1.1); box-shadow: 0 0 0 24px rgba(0,229,255,0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,229,255,0); }
}
/* Duration: 1.0s; ease: ease-out; plays once on tap */
```

### Payment Success Digital Flow (Simulation Step 5)

```javascript
// SVG animated line from phone-user to phone-merchant
// Draw SVG path with stroke-dasharray animation
gsap.fromTo("#payment-flow-path",
  { strokeDashoffset: 600 },
  { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut",
    onComplete: () => {
      // Trigger merchant receipt reveal
      gsap.to("#merchant-receipt", { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" });
    }
  }
);
```

### Explainer Card Reveal (Section 4)

```javascript
// GSAP — individual card reveal on tap
gsap.fromTo(card, 
  { filter: "blur(6px)", opacity: 0.3, y: 20 },
  { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
);
```

### Fun Fact Bubble Entry

```javascript
gsap.fromTo("#fact-bubble",
  { scale: 0.5, opacity: 0, rotation: -5 },
  { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" }
);
```

### Quiz Correct / Wrong Feedback

```javascript
// Correct: green banner slides down from top of card
gsap.fromTo("#quiz-feedback-banner",
  { y: -60, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.4, ease: "easeOutCubic" }
);

// Wrong: card shake
gsap.to("#quiz-card",
  { x: -8, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }
);
```

### Section Progress Dot Transition

```css
.progress-dot {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
              background-color 0.3s ease;
}
.progress-dot.active {
  width: 28px;
  background-color: var(--color-digital-light);
}
.progress-dot.completed {
  background-color: var(--color-accent-green);
}
```

### Closing Celebration Light Burst

```javascript
// On closing section enter: 60 fast particles burst from centre
// Speed 2× opening animation speed
// More red particles mixed in (MY+SG flag colour celebration)
// Duration: 3s, then settles to slower ambient loop
gsap.to('.light-particle', {
  speed: 'fast-mode',
  colorMix: 'celebration',
  duration: 3,
  onComplete: () => switchToAmbientMode()
});
```

---

## 8. Audio Specification

### Background Music (BGM)

| Property | Value |
|---|---|
| Genre | Ambient electronic / world fusion with Southeast Asian undertones |
| Tempo | 85–95 BPM |
| Mood | Contemplative, optimistic, connected — not aggressive or too energetic |
| Instrumentation | Soft pad synths, subtle gamelan/sitar tonality (optional), gentle beat, atmospheric textures |
| Loop | Seamless 60–90 second loop |
| Volume | Default 0.25 (25%) — museum/public space level |
| File | `bgm-ambient.mp3`, stereo, 128kbps, ~3MB |
| Behaviour | Starts on first user interaction; persists across all sections; user-toggleable |

**Suggested free sources:**
- freesound.org — search: "ambient electronic Southeast Asia 90bpm loop", "world music ambient pad loop"
- Incompetech.com (Kevin MacLeod) — "Ambient" or "World" category (CC Attribution)
- Free Music Archive (freemusicarchive.org) — "Ambient" genre, Creative Commons

### Sound Effects

| ID | Trigger Event | Sound Description | Duration | Notes |
|---|---|---|---|---|
| `sfx-tap` | Any UI button tap | Soft glass tap, 600–800Hz, slight reverb tail | 80ms | Light, non-intrusive |
| `sfx-whoosh` | Section transition (forward) | Subtle air whoosh, directional (left→right panning) | 300ms | Web Audio panning: left→right |
| `sfx-qr-scan` | QR scanner viewfinder active | Soft electronic beep-boop sequence (2 tones) | 400ms | Loop while scanner open |
| `sfx-notification` | Phone "ping" sound (simulation) | Short notification chime, 1000Hz, soft | 200ms | Sim steps 1, 2 |
| `sfx-payment-success` | Simulation step 5 complete | Uplifting 3-note chime (ascending), bell-like | 800ms | Key moment — slightly louder |
| `sfx-card-reveal` | Explainer card revealed | Soft "pop" with subtle shimmer | 300ms | Section 4 card taps |
| `sfx-fun-fact` | Fun fact bubble appears | Playful discovery sound — "ting" + sparkle | 400ms | Whimsical, not jarring |
| `sfx-quiz-correct` | Quiz correct answer | Warm positive chime, 2-note ascending | 500ms | Similar to payment-success but softer |
| `sfx-quiz-wrong` | Quiz wrong answer | Gentle descending tone (not harsh buzzer) | 400ms | Educational tone; avoid embarrassing |
| `sfx-quiz-complete` | All 4 quiz questions done | 4-note ascending fanfare, bright | 1.2s | Celebratory but brief |
| `sfx-closing-fanfare` | Closing section enter | Warm orchestral swell, 3 seconds | 3.0s | Play once; fades into BGM |
| `sfx-swipe` | Swipe gesture detected | Subtle whoosh, shorter than transition | 150ms | |

**Design notes for SFX selection:**
- All SFX should be **non-harsh** — this is a museum with other visitors and families nearby
- Avoid buzzer-style wrong answers; maintain educational, encouraging tone throughout
- Payment success chime is the most emotionally significant SFX — invest in a quality sound here

**Suggested free sources:**
- Kenney.nl — "Interface Sounds" and "Casino Audio" packs (CC0)
- freesound.org — search: "ui chime soft", "payment success bell", "notification gentle"
- ZapSplat.com — "UI, Notification & Alerts" category (free account)
- OpenGameArt.org — "Sound Effects" → "Menu, UI" category (CC0)

### Audio Implementation

```javascript
// audio.js — Audio Manager for Project 02
const AudioManager = {
  ctx: null,         // Web Audio API AudioContext
  sounds: {},
  bgm: null,
  enabled: true,

  async init() {
    // Create AudioContext on first user interaction
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Load and decode all SFX as AudioBuffers for precise playback
    await this.preloadAll();
  },

  async preloadAll() {
    const manifest = [
      { id: 'sfx-tap', url: 'assets/audio/sfx-tap.mp3' },
      { id: 'sfx-whoosh', url: 'assets/audio/sfx-whoosh.mp3' },
      // ... all SFX entries
    ];
    const promises = manifest.map(item =>
      fetch(item.url)
        .then(r => r.arrayBuffer())
        .then(ab => this.ctx.decodeAudioData(ab))
        .then(buf => { this.sounds[item.id] = buf; })
        .catch(() => {}) // graceful fallback
    );
    await Promise.all(promises);
  },

  play(id, options = {}) {
    if (!this.enabled || !this.sounds[id]) return;
    const source = this.ctx.createBufferSource();
    source.buffer = this.sounds[id];
    // Optional: panning for whoosh effects
    if (options.pan !== undefined) {
      const panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime(options.pan, this.ctx.currentTime);
      source.connect(panner).connect(this.ctx.destination);
    } else {
      source.connect(this.ctx.destination);
    }
    source.start(0);
  },

  playWhoosh() {
    // Pan from -1 (left) to 1 (right) over 300ms for section transition
    const source = this.ctx.createBufferSource();
    const panner = this.ctx.createStereoPanner();
    source.buffer = this.sounds['sfx-whoosh'];
    panner.pan.setValueAtTime(-1, this.ctx.currentTime);
    panner.pan.linearRampToValueAtTime(1, this.ctx.currentTime + 0.3);
    source.connect(panner).connect(this.ctx.destination);
    source.start(0);
  },

  startBGM() {
    this.bgm = new Audio('assets/audio/bgm-ambient.mp3');
    this.bgm.loop = true;
    this.bgm.volume = 0.25;
    this.bgm.play().catch(() => {});
  }
};
```

**Note:** Use `Web Audio API AudioContext` + `AudioBuffer` for SFX (precise playback control) and `HTML5 <audio>` for BGM (simpler loop management). Resume `AudioContext` on each user interaction if it enters `suspended` state.

---

## 9. Development Milestones

### Milestone 1 — Foundation, Navigation System & Static Layouts (Complexity: Low-Medium)
**Deliverables:**
- `index.html` with all 8 section containers (only active one shown)
- CSS variables, typography, global reset (`main.css`)
- Section layout styles (all 8 sections, static/placeholder content)
- Section controller in `main.js` (show/hide sections, animate transitions)
- Idle timer (60 seconds → attract screen)
- Navigation: progress dots, skip button, next button
- Touch swipe detection for section advance
- All component styles: buttons, cards, pills, bubbles

**Estimated effort:** 2–3 days

---

### Milestone 2 — Opening Canvas & Video Section (Complexity: Medium-High)
**Deliverables:**
- `opening.js` — Canvas light stream particle system (80 particles, trail rendering)
- JB + Singapore skyline SVGs, causeway bridge SVG, animated bridge dashes
- Attract screen (passive loop version of opening canvas)
- Narrative text with GSAP TypePlugin typewriter effect
- Section 2: video cards, play/pause controls, dual-video logic (auto-pause one when other plays)
- GSAP loaded with TextPlugin

**Estimated effort:** 3–4 days

---

### Milestone 3 — QR Payment Simulation (Complexity: High)
**Deliverables:**
- `simulation.js` — step controller, step state management
- Phone mockup SVG integrated as frame
- 5 simulation screens as swappable DOM layers inside phone frame:
  - Step 1: QR scanner with CSS scan-line animation
  - Step 2: E-wallet selection list (TNG + Boost)
  - Step 3: Confirmation screen with GSAP FX rate spin
  - Step 4: PIN/biometric screen with fingerprint pulse animation
  - Step 5: Split-screen success with SVG animated payment flow line
- Step progress indicators (5 dots with connecting line)
- Audio triggers for each step

**Estimated effort:** 4 days

---

### Milestone 4 — Behind the Scenes, Safety Tips, Fun Facts & Quiz (Complexity: Medium)
**Deliverables:**
- Section 4: 4 ExplainerCards with tap-to-reveal animation; "Seterusnya" unlock logic
- Section 5: 4 SafetyTipCards with staggered entrance animation
- Section 6: `funfacts.js`, 2 FunFactBubble components with pop-in animation, tap-to-advance
- `quiz.js`: 4-question quiz engine with per-question feedback
- All data in `data/quiz.js` and `data/funfacts.js`
- Section 8: closing screen with score display, celebration canvas layer, "Mula Semula" flow

**Estimated effort:** 3 days

---

### Milestone 5 — Audio, Polish, Performance & Testing (Complexity: Medium)
**Deliverables:**
- `audio.js` fully implemented with Web Audio API
- All SFX wired to correct trigger events
- BGM with audio toggle button (persistent, bottom-left)
- Spatial panning for whoosh transitions
- Cross-browser testing (Chrome kiosk primary; Safari fallback for iOS kiosk units)
- Touch testing on actual hardware (at least 1 kiosk unit)
- Portrait orientation fallback (media queries, stacked layout)
- Performance: Canvas particle system profiled, target < 5ms/frame
- Idle timer stress test (8+ hour loop)
- Final content review against verbatim copy spec
- Graceful degradation: if video fails to load, show static poster with description text

**Estimated effort:** 3 days

---

## 10. Claude Code Implementation Notes

### Key Implementation Challenges

#### 1. Canvas Light Stream Particle System Performance
**Challenge:** 80 simultaneous particles with trail rendering at 60fps is the most performance-intensive element.
**Approach:**
- Each frame: `ctx.clearRect(0, 0, width, height)` then `ctx.fillRect` with semi-transparent dark colour (`rgba(3,11,26,0.15)`) instead of full clear — this creates a natural motion blur/trail decay effect without storing `trail` arrays per particle
- Reduce to 50 particles on mid-range hardware; detect via `performance.now()` frame timing after first 30 frames and reduce count if average > 8ms
- Use `OffscreenCanvas` if available for the particle computation (Web Worker transfer)
- Pause canvas animation when section is not visible (`IntersectionObserver` or section visibility state)

```javascript
function renderLoop(timestamp) {
  // Motion-blur background (cheaper than per-particle trails)
  ctx.fillStyle = 'rgba(3, 11, 26, 0.12)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(ctx); });
  rafId = requestAnimationFrame(renderLoop);
}
```

#### 2. Multi-Step Simulation — Phone Screen DOM Layers
**Challenge:** 5 different "phone screens" must swap smoothly inside the phone mockup frame.
**Approach:**
- Each step screen is a positioned `<div>` inside the phone frame container, `position: absolute; inset: 0`
- Active step: `opacity: 1; pointer-events: all`
- Inactive steps: `opacity: 0; pointer-events: none`
- Transition between steps: GSAP crossfade — outgoing `opacity 1→0` + `translateX(-20px)`, incoming `opacity 0→1` + `translateX(20px → 0)`
- Do NOT use CSS `display: none` for inactive steps — use opacity so transitions work

#### 3. Video Autoplay and Inline Playback
**Challenge:** Kiosk browsers may have autoplay restrictions or fullscreen behaviour.
**Approach:**
- Add `playsinline muted loop` attributes initially; remove `muted` after first user gesture if audio is desired
- Use `video.play().catch(() => { showPlayButton(); })` — if autoplay blocked, reveal a large play button overlay
- Test specifically in Chrome kiosk mode (`--kiosk` flag) on the target hardware
- Pre-download/cache videos: serve from `localhost` static server, not `file://` protocol

#### 4. Section Navigation — Preventing Skip Mid-Animation
**Challenge:** Rapid taps during transitions can corrupt section state.
**Approach:**
```javascript
let isTransitioning = false;

function navigateToSection(targetSection) {
  if (isTransitioning) return;
  isTransitioning = true;
  AudioManager.play('sfx-whoosh');
  // Run exit + enter GSAP timeline
  const tl = gsap.timeline({
    onComplete: () => { isTransitioning = false; }
  });
  tl.to(currentSectionEl, { opacity: 0, x: -40, duration: 0.4 })
    .set(currentSectionEl, { display: 'none' })
    .set(targetSectionEl, { display: 'flex', opacity: 0, x: 40 })
    .to(targetSectionEl, { opacity: 1, x: 0, duration: 0.4 });
}
```

#### 5. Web Audio API AudioContext Resume (Autoplay Policy)
**Challenge:** `AudioContext` created programmatically enters `suspended` state on page load; must be resumed inside a user gesture handler.
**Approach:**
```javascript
document.addEventListener('touchstart', async function unlockAudio() {
  if (AudioManager.ctx && AudioManager.ctx.state === 'suspended') {
    await AudioManager.ctx.resume();
  }
  if (!AudioManager.bgm) AudioManager.startBGM();
  document.removeEventListener('touchstart', unlockAudio);
}, { once: true });
```

#### 6. Responsive Portrait Layout
**Challenge:** If display is a portrait kiosk (1080×1920), the landscape 2-column layouts break.
**Approach:**
```css
/* In layout.css */
@media (orientation: portrait), (max-aspect-ratio: 4/3) {
  .two-column-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
  .simulation-layout {
    flex-direction: column;
  }
  /* Scale down phone mockup */
  .phone-mockup {
    transform: scale(0.8);
  }
}
```
- Test both orientations early in Milestone 1

#### 7. Quiz Engine — No Back Navigation
**Challenge:** Visitors may want to change answers; design must make it clear answers are final after selection.
**Approach:**
- After any option is tapped, immediately set `pointer-events: none` on all options to prevent re-selection
- Show a brief 0.3s animation on the tapped option before revealing correct/wrong state (provides haptic-like visual feedback)
- "Teruskan" only appears after feedback is shown (minimum 1.5s, then button fades in)

### Performance Considerations
- **Canvas:** Target < 5ms/frame on kiosk hardware. Profile using `performance.mark()` / `performance.measure()` and log average over first 100 frames. Reduce particle count if needed.
- **GSAP tweens:** Use `gsap.killTweensOf(el)` before starting new tweens on the same element to prevent memory buildup during rapid navigation
- **Video:** Use `<video preload="none">` and only call `video.load()` / `video.play()` when section 2 is entered. Destroy video on section exit with `video.src = ''` if memory is constrained.
- **DOM:** All section containers exist in DOM at all time (no dynamic creation/deletion) — `display: none` / `opacity: 0` toggling is cheaper than DOM insertion
- **Images:** All SVG assets inline where possible (avoids HTTP requests in file:// mode); PNG assets ≤ 200KB

### Accessibility Notes
- **Contrast:** All text passes WCAG AA (4.5:1). `#F0F4FF` on `#0D1B2E` = 13.4:1 (AAA). `#8BA3C7` on `#0D1B2E` = 5.1:1 (AA)
- **Font size minimum:** 18px for all visible body text at 1920px display
- **Touch targets:** Minimum 60×60px enforced throughout; 72px for quiz options
- **No timed sections:** All sections can be read at the visitor's own pace; "Skip" is always available
- **Audio toggle:** Persistent, visible button (bottom-left, 60×60px icon button)
- **Video captions:** Provide `.vtt` subtitle files for both video clips; caption toggle button on each video card
- **Quiz:** Educational approach — wrong answers reveal correct answer immediately (no repeated failure loops); tone of feedback text is encouraging, not punitive
- **Colour independence:** All interactive states (correct/wrong, selected/unselected) use both colour AND iconography AND text — never colour alone
- **Reduce motion:** Respect `prefers-reduced-motion: reduce` media query — if set, disable particle systems and use simple fade transitions instead of slides/scales

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  #opening-canvas { display: none; }
}
```

---

*Document version 1.0 — Festival Hari Museum Antarabangsa 2026*
*PIC: Atikah | Prepared for developer handoff via Claude Code*

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
<h1 data-i18n="opening_title">Pembayaran QR Rentas Sempadan</h1>
<p data-i18n="opening_subtitle">Jelajahi cara bayaran digital merentas negara...</p>
<button data-i18n="btn_start">Mula</button>

<!-- Dynamic / programmatic text (in JS) -->
stepEl.textContent = t('sim_step1');
feedbackEl.innerHTML = t('q1_feedback');
```

### String Key Conventions for This Project

Keys for Project 2 (Cross-Border QR Payment):

- `opening_title`, `opening_subtitle`, `opening_body`, `opening_cta`
- `sim_step1`, `sim_step2`, `sim_step3`, `sim_step4`, `sim_step5`
- `tips_title`, `tips_body`, `tips_1`, `tips_2`, `tips_3`, `tips_4`
- `funfact_1`, `funfact_2`
- `q1_question`, `q1_opt_a`, `q1_opt_b`, `q1_opt_c`, `q1_opt_d`, `q1_feedback`
- `q2_question`, `q2_opt_a`, `q2_opt_b`, `q2_opt_c`, `q2_opt_d`, `q2_feedback`
- `q3_question`, `q3_opt_a`, `q3_opt_b`, `q3_opt_c`, `q3_opt_d`, `q3_feedback`
- `q4_question`, `q4_opt_a`, `q4_opt_b`, `q4_opt_c`, `q4_opt_d`, `q4_feedback`
- `closing_title`, `closing_body`
- `btn_start`, `btn_next`, `btn_continue`, `btn_retry_quiz`

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

**PROJECT 2 (QR Simulation):** Replace dark space aesthetic with a light, modern fintech style. Background: warm white with subtle geometric pattern (light blue/teal grid or wave). The JB-Singapore connection visual uses teal/blue animated flowing lines on white background. Phone mock-up for QR simulation: clean white device frame. Behind-the-scenes cards: teal-accented info cards. Quiz uses standard question card component.
