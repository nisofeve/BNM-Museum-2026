# PROJECT 01 — Perangkap Scam Di Hadapan! Pandu Bijak, Elak Scam!

**PIC:** Nadia
**Format:** HTML5 Interactive Game (Kiosk/Exhibition)
**Language:** Bahasa Malaysia
**Date:** June 2026

---

## 1. Project Overview

### Purpose
An interactive car-driving game that educates museum visitors about common financial scams in Malaysia. Players navigate a road-themed course, stopping at five checkpoints representing real-world scam scenarios. By answering correctly, visitors build awareness about SMS phishing, fake investment documents, QR code fraud, vishing calls, and OTP theft.

### Target Audience
- General public, all age groups (primary: 13–50)
- Museum exhibition visitors at Festival Hari Museum Antarabangsa 2026
- Assumed low-to-moderate digital literacy; interface must be self-explanatory

### PIC
Nadia

### Display Context
- Standalone kiosk or large touchscreen display in a museum hall
- Unattended: visitors approach, play, and leave without staff guidance
- Session duration: ~3–5 minutes per playthrough
- Must loop back to attract screen after 30 seconds of inactivity
- No physical keyboard; all interaction via touch

### Format
HTML5 — single-page application, self-contained (no external server required at runtime), deployable as a local file or lightweight static server

---

## 2. Technical Stack

### Core Technologies
- **HTML5** — semantic structure, Canvas element for road animation
- **CSS3** — flexbox/grid layout, CSS custom properties (variables), keyframe animations for UI transitions
- **JavaScript (Vanilla ES6+)** — no framework required; state machine pattern for screen management

### Animation Libraries
- **GSAP (GreenSock Animation Platform) 3.x** — primary animation engine for car movement, checkpoint popups, score counters, flying money particles
  - Load via CDN: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
  - Include `MotionPathPlugin` for road-following car animation
- **Canvas 2D API** — scrolling road background, particle effects (flying coins/money)
- **CSS Keyframes** — idle pulsing effects, button hover states, screen transitions

### Audio
- **HTML5 Audio API** with preloaded `<audio>` elements
- BGM: looping ambient track, muted by default with a visible toggle button (museum environment may be noisy)
- SFX: short clips triggered by JS events
- All audio files stored locally in `/assets/audio/`

### Recommended Resolution / Display
- **Primary target:** 1920×1080px (Full HD landscape)
- **Minimum supported:** 1280×720px
- Design in a 1920×1080 viewport; scale down using CSS `transform: scale()` on the root container if needed
- Touch target minimum: **60×60px** for all interactive elements (kiosk standard)

### File Structure
```
project-01-car-scam/
├── index.html
├── styles/
│   ├── main.css          # Global styles, CSS variables, typography
│   ├── screens.css       # Per-screen layout rules
│   ├── components.css    # Buttons, modals, cards, progress bar
│   └── animations.css    # Keyframe definitions
├── scripts/
│   ├── main.js           # Entry point, event listeners, idle timer
│   ├── state.js          # State machine, score management
│   ├── game.js           # Checkpoint logic, answer evaluation
│   ├── road.js           # Canvas road rendering and car animation
│   ├── particles.js      # Flying money / coin particle system
│   └── audio.js          # Audio manager, preload, play/pause
├── assets/
│   ├── images/
│   │   ├── car.svg            # Player car (top-down view)
│   │   ├── road-tile.svg      # Repeating road tile
│   │   ├── checkpoint-flag.svg
│   │   ├── coin.svg           # Flying coin sprite
│   │   ├── money-bill.svg     # Flying money sprite
│   │   ├── scammer-icon.svg   # Hazard icon on wrong answer
│   │   ├── shield-icon.svg    # Correct answer icon
│   │   └── bnm-logo.png       # BNM logo (for CP2 context)
│   └── audio/
│       ├── bgm-loop.mp3
│       ├── sfx-correct.mp3
│       ├── sfx-wrong.mp3
│       ├── sfx-checkpoint.mp3
│       ├── sfx-car-idle.mp3
│       ├── sfx-car-drive.mp3
│       ├── sfx-coin-collect.mp3
│       ├── sfx-money-fly.mp3
│       ├── sfx-finish.mp3
│       └── sfx-button-tap.mp3
├── data/
│   └── checkpoints.js    # Checkpoint content as a JS object/array
└── vendor/
    ├── gsap.min.js
    └── MotionPathPlugin.min.js
```

---

## 3. Application Architecture

### Screen / State Flow

```
[ATTRACT SCREEN]
       |
       | (tap anywhere / tap "Mula")
       v
[INTRO SCREEN]
  - Title, tagline, instructions
       |
       | (tap "Mula Permainan")
       v
[ROAD GAME SCREEN]  <─────────────────────────────┐
  - Scrolling road, car moving forward             |
  - Progress bar (CP 1 of 5)                       |
       |                                           |
       | (car reaches checkpoint)                  |
       v                                           |
[CHECKPOINT MODAL]                                 |
  - Scenario text                                  |
  - 3 answer options                               |
  - (select answer)                                |
       |                                           |
       v                                           |
[ANSWER FEEDBACK OVERLAY]                          |
  - Correct: green flash + coin animation (+20)    |
  - Wrong: red flash + money-fly animation (-10)   |
  - Feedback text                                  |
       |                                           |
       | (tap "Teruskan" / auto-advance 3s)        |
       └───────────────────────────────────────────┘
  (after CP5 answered)
       |
       v
[RESULT SCREEN]
  - Score display (animated counter)
  - Tier badge + message
  - "Cuba Lagi" / "Tamat" buttons
       |
       | (tap "Cuba Lagi")
       v
[INTRO SCREEN]  (reset state)
       |
       | (tap "Tamat" or 30s inactivity anywhere)
       v
[ATTRACT SCREEN]
```

### State Management
Single `GameState` object in `state.js`:

```javascript
const GameState = {
  screen: 'attract',          // 'attract'|'intro'|'game'|'checkpoint'|'feedback'|'result'
  currentCheckpoint: 0,       // 0–4 (index into checkpoints array)
  score: 0,                   // running total
  answers: [],                // array of {cp: 0, chosen: 'A', correct: true}
  idleTimer: null,            // setTimeout reference
  audioEnabled: true,
  animationInProgress: false  // guard to prevent double-taps
};
```

State transitions are handled by a `setState(newScreen, payload)` function that:
1. Cancels the idle timer
2. Runs exit animation on current screen
3. Updates `GameState`
4. Runs enter animation on new screen
5. Restarts idle timer (if applicable)

### Data Structure — Checkpoints

```javascript
// data/checkpoints.js
const CHECKPOINTS = [
  {
    id: 1,
    title: "CP1 — SMS Phishing",
    scenario: "Anda terima SMS: 'Akaun anda telah dibekukan. Klik link ini untuk aktifkan semula.'",
    options: [
      { key: "A", text: "Klik link segera", correct: false },
      { key: "B", text: "Abaikan sahaja", correct: false },
      { key: "C", text: "Semak dan hubungi bank melalui saluran rasmi", correct: true }
    ],
    feedback: "Bank tidak hantar link untuk minta maklumat anda.",
    icon: "sms-phishing"
  },
  // ... CP2–CP5
];
```

### Score Rules
```
Correct answer: +20 points
Wrong answer:   −10 points
Maximum score:  100 (5 checkpoints × 20)
Minimum score:  −50 (if all wrong — floor at 0 for display)
```

---

## 4. UI/UX Design Specification

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-primary` | `#0A0E1A` | Main background (night sky / road dark) |
| `--color-bg-secondary` | `#12192B` | Card/modal background |
| `--color-bg-tertiary` | `#1C2540` | Input/option background |
| `--color-road` | `#2C2C3A` | Road surface |
| `--color-road-line` | `#F5C842` | Road centre dashes (amber/yellow) |
| `--color-accent-primary` | `#00C9FF` | Cyan — primary CTA, highlights |
| `--color-accent-secondary` | `#FF6B35` | Orange — secondary highlights, wrong state |
| `--color-correct` | `#2ECC71` | Correct answer feedback (green) |
| `--color-wrong` | `#E74C3C` | Wrong answer feedback (red) |
| `--color-score` | `#F5C842` | Score counter, coin colour |
| `--color-text-primary` | `#FFFFFF` | Body text |
| `--color-text-secondary` | `#A8B2CC` | Subtitles, secondary labels |
| `--color-text-muted` | `#5A6580` | Placeholders, tertiary info |
| `--color-checkpoint-badge` | `#7B2FBE` | Checkpoint number badge background |
| `--gradient-road` | `linear-gradient(180deg, #0A0E1A 0%, #1A2040 50%, #0A0E1A 100%)` | Sky/road gradient |

**Rationale:** Dark palette evokes night driving, urgency, and digital environment. Cyan accent suggests technology and digital payments. Amber/yellow echoes road markings and creates thematic consistency.

### Typography

| Element | Font | Weight | Size (1080p) | Notes |
|---|---|---|---|---|
| Game title | `Bebas Neue` (Google Fonts) | 400 | 72px | Uppercase only |
| Screen headings (H1) | `Poppins` | 700 | 48px | |
| Checkpoint title | `Poppins` | 600 | 32px | |
| Scenario text | `Poppins` | 400 | 24px | Line-height 1.6 |
| Option buttons | `Poppins` | 500 | 22px | |
| Feedback text | `Poppins` | 500 | 26px | |
| Score counter | `Bebas Neue` | 400 | 64px | Tabular figures |
| Body/UI labels | `Poppins` | 400 | 18px | |
| Tagline / subtitle | `Poppins` | 300 italic | 20px | |

Load via: `<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">`
Bundle as WOFF2 files in `/assets/fonts/` for offline use.

### Layout Grid
- Base container: 1920×1080px, centred, `overflow: hidden`
- Game area: full 1920×1080
- Road canvas: 1920×1080 (full screen, z-index 0)
- HUD overlay: 1920×1080 (z-index 10), positioned with absolute/fixed
  - Score panel: top-right, 280×80px
  - Progress bar: top-centre, 600×16px
  - CP counter: top-left, 220×60px
  - Audio toggle: bottom-right, 60×60px
- Modal/overlay: centred, max-width 900px, max-height 680px, z-index 100

### Component Library

**PrimaryButton**
```
Background: --color-accent-primary (#00C9FF)
Text: #0A0E1A (dark), Poppins 600, 22px
Padding: 20px 48px
Border-radius: 12px
Min-height: 64px
Min-width: 200px
Active state: scale(0.96), brightness(0.9)
Hover state: brightness(1.1), box-shadow: 0 0 24px rgba(0,201,255,0.5)
Touch target: 64px height guaranteed
```

**OptionButton (A/B/C)**
```
Background: --color-bg-tertiary (#1C2540)
Border: 2px solid rgba(168,178,204,0.2)
Text: #FFFFFF, Poppins 500, 22px
Padding: 20px 32px
Border-radius: 12px
Width: 100% (full modal width)
Min-height: 72px
Selected-pending state: border-color #00C9FF, background #1A2D4A
Correct state: background #1A4A2A, border-color #2ECC71, icon ✓
Wrong state: background #4A1A1A, border-color #E74C3C, icon ✗
Transition: all 0.25s ease
```

**CheckpointModal**
```
Background: rgba(18,25,43,0.97)
Border: 1px solid rgba(0,201,255,0.3)
Border-radius: 24px
Box-shadow: 0 0 60px rgba(0,201,255,0.15), 0 24px 48px rgba(0,0,0,0.6)
Padding: 48px
Max-width: 900px
Backdrop: blur(8px) on road canvas beneath
Entry animation: scale(0.8)→1.0, opacity 0→1, 400ms easeOutBack
Exit animation: scale(1.0)→0.9, opacity 1→0, 250ms easeInCubic
```

**ScorePill (HUD)**
```
Background: rgba(18,25,43,0.85)
Border: 1px solid rgba(245,200,66,0.4)
Border-radius: 40px
Padding: 12px 24px
Coin icon (24px) + score number (Bebas Neue 48px, #F5C842)
Position: top:24px, right:32px
```

**CheckpointBadge**
```
Background: --color-checkpoint-badge (#7B2FBE)
Shape: hexagon or rounded square, 80×80px
Number: Bebas Neue 48px, white
Label: "CP" above number, Poppins 12px, #A8B2CC
```

**FeedbackOverlay**
```
Full-screen semi-transparent layer
Correct: rgba(46,204,113,0.15) tint + green border flash
Wrong: rgba(231,76,60,0.15) tint + red border flash
Feedback card: centred, 700px wide, contains icon + feedback text + "Teruskan" button
Duration: stays visible until tapped, or 4 seconds auto-advance
```

**ProgressBar (road-themed)**
```
Container: 600×16px, background rgba(255,255,255,0.1), border-radius 8px
Fill: gradient from #00C9FF to #7B2FBE
Width: animates from 0% to (currentCP/5)*100%
Above bar: small car icon that slides along the track
```

### Touch / Interaction Targets
- All tappable elements: minimum **60×60px** hit area (use CSS padding or pseudo-element expansion)
- Option buttons: 72px height, full modal width
- CTA buttons: 64px height, 200px min-width
- Audio toggle: 60×60px circle, bottom-right, 24px margin

### Idle / Attract Behaviour
- Idle timeout: **30 seconds** of no touch input triggers transition to attract screen
- Idle timer resets on any `touchstart` or `mousedown` event
- Attract screen auto-plays a looping animation (car driving, checkpoint flags waving)
- Attract screen text pulses every 3 seconds: "Sentuh skrin untuk bermain"

---

## 5. Screen-by-Screen Design

### SCREEN 0: Attract Screen

**Purpose:** Passive loop to draw visitors' attention when kiosk is idle.

**Layout:**
- Full 1920×1080 canvas background showing animated road (infinite scroll, slower than game speed ~30px/frame → ~60px/frame in game)
- Centred overlay card (1000×600px, semi-transparent dark):
  - Top: Game title "PERANGKAP SCAM DI HADAPAN!" in Bebas Neue 96px, cyan (#00C9FF), with neon glow `text-shadow: 0 0 40px rgba(0,201,255,0.8)`
  - Subtitle: "Pandu Bijak, Elak Scam!" — Poppins 300 italic, 28px, #A8B2CC
  - Animated car sprite driving left-to-right across the lower third of the card
  - Pulsing CTA: "SENTUH SKRIN UNTUK BERMAIN" — Poppins 600, 24px, white, opacity animates 0.5↔1.0 on a 1.5s loop
  - Five checkpoint flag icons in a row below CTA
- BNM/financial institution logos in bottom strip (40px height)

**Interactions:**
- Tap anywhere → setState('intro')

**Animations:**
- Road scrolls continuously at 1px/frame (slow drift)
- Car bounces on a `translateY(-8px)` oscillation, 2s ease-in-out infinite
- Title glows pulse: `text-shadow` intensity oscillates 3s ease-in-out infinite
- Flag icons wave with staggered `rotate(-10deg)↔(10deg)`, 1s delay between each

---

### SCREEN 1: Intro Screen

**Purpose:** Brief game overview before play begins.

**Layout (centred card, 900×700px):**
- Top: Game logo (smaller), 48px title
- Intro text (Poppins 400, 22px):
  > "Uji kefahaman anda dalam mengenal pasti scam dan belajar cara lindungi diri."
- Divider line (1px, gradient cyan-to-purple)
- Cara Bermain heading (Poppins 600, 28px, cyan):
  > "CARA BERMAIN"
- Instructions text:
  > "Pandu dan harungi perangkap scam di hadapan. Kumpul mata untuk lihat tahap 'Scam Awareness' anda"
- Icon row: 5 checkpoint icons with labels "CP1" through "CP5"
- Scoring legend:
  - Green chip: "+20 mata — Jawapan betul"
  - Red chip: "-10 mata — Jawapan salah"
- Large CTA: "MULA PERMAINAN" (PrimaryButton, full-width of card)

**Interactions:**
- "MULA PERMAINAN" → setState('game'), reset score to 0, reset checkpoint to 0

**Animations:**
- Card slides up from `translateY(60px)` opacity 0 → final position opacity 1, 500ms easeOutCubic
- Icon row items stagger in with 80ms delay each, from `translateY(20px)` opacity 0

---

### SCREEN 2: Road Game Screen (Between Checkpoints)

**Purpose:** Transition animation showing the car driving toward the next checkpoint.

**Layout:**
- Full-screen Canvas: scrolling road (two-lane, dashed centre line)
- Scenery: simple silhouetted trees/buildings along road edges (CSS-animated, parallax scroll at 0.5× road speed)
- Car: top-down SVG, centred horizontally, positioned at 65% from top
- Car drives in-place (road scrolls under it)
- HUD elements visible:
  - Score pill (top-right)
  - Progress bar with car icon (top-centre)
  - CP counter "Checkpoint 1 daripada 5" (top-left)
- Approaching checkpoint: checkpoint flag/sign appears at road's vanishing point, scales up as road scrolls, car "approaches"
- Duration: 2–3 seconds of driving, then checkpoint modal appears

**Animations:**
- Road tiles: Canvas `clearRect` + `drawImage` each frame (requestAnimationFrame loop at 60fps)
- Car: subtle `translateY(-4px)↔(4px)` bounce, 0.4s ease-in-out infinite (simulates driving vibration)
- Checkpoint sign: starts at 20% scale at y=20%, grows to 150% scale at y=80% over 2s
- HUD slides in from top on screen enter: 400ms easeOutBack

---

### SCREEN 3: Checkpoint Modal (per CP)

Each checkpoint follows the same modal template. Content varies per CP.

#### CP1 — SMS Phishing

**Modal content:**
- Badge: hexagon "CP 1" (#7B2FBE background)
- Title: "SMS Phishing" (Poppins 600, 32px)
- Icon: SMS/phone icon with caution triangle overlay
- Scenario box (background #1C2540, border-left 4px solid #F5C842, border-radius 8px, padding 24px):
  > "Anda terima SMS: 'Akaun anda telah dibekukan. Klik link ini untuk aktifkan semula.'"
  - Simulated SMS bubble styling (grey bubble, left-aligned, monospace font for the SMS text)
- Question label: "Apakah yang patut anda lakukan?" (Poppins 500, 20px, #A8B2CC)
- Three OptionButtons stacked vertically with 12px gap:
  - A: "Klik link segera"
  - B: "Abaikan sahaja"
  - C: "Semak dan hubungi bank melalui saluran rasmi"

#### CP2 — Fake BNM Document

**Modal content:**
- Badge: "CP 2"
- Title: "Dokumen BNM Palsu"
- Icon: document/certificate icon with danger overlay
- Scenario box:
  > "BNM menawarkan pelaburan dijamin untung tinggi dan tiada risiko! Untung 30% dalam seminggu!"
  - Visual: fake document header with BNM logo (watermarked/blurred to indicate fake), red "PALSU" stamp overlay
- Question: "Apakah yang patut anda lakukan?"
- Options:
  - A: "Terus melabur"
  - B: "Semak dengan BNM/SC alert"
  - C: "Tanya kawan dulu"

#### CP3 — Unknown QR Merchant

**Modal content:**
- Badge: "CP 3"
- Title: "QR Merchant Tidak Dikenali"
- Icon: QR code icon with question mark
- Scenario box:
  > "Anda scan QR di kedai kecil 'Bayaran kepada: Unknown Enterprise'"
  - Visual: simulated e-wallet payment confirmation screen showing "Unknown Enterprise" as recipient name, with the name highlighted in amber warning colour
- Question: "Apakah yang patut anda lakukan?"
- Options:
  - A: "Terus bayar"
  - B: "Semak nama penerima sebelum bayar"
  - C: "Abaikan dan pergi"

#### CP4 — Vishing Call

**Modal content:**
- Badge: "CP 4"
- Title: "Panggilan Penipuan (Vishing)"
- Icon: phone icon with alert waves
- Scenario box:
  > "Call masuk: 'Ini panggilan dari Bank Negara. Akaun anda terlibat dengan transaksi tidak sah.'"
  - Visual: simulated incoming call screen, number shown as "UNKNOWN / +60-XXXXXXXX", call duration ticking
- Question: "Apakah yang patut anda lakukan?"
- Options:
  - A: "Beri maklumat peribadi"
  - B: "Terus panik"
  - C: "Tamatkan panggilan & lapor"

#### CP5 — OTP Request

**Modal content:**
- Badge: "CP 5"
- Title: "Permintaan Kod OTP"
- Icon: lock/OTP icon with danger overlay
- Scenario box:
  > "Seseorang minta kod OTP untuk 'verify akaun'."
  - Visual: simulated chat/SMS showing "Tolong hantar kod OTP anda..." with an OTP code partially revealed (censored)
- Question: "Apakah yang patut anda lakukan?"
- Options:
  - A: "Beri OTP"
  - B: "Abaikan dan jangan kongsi"
  - C: "Tanya dulu"

---

### SCREEN 4: Feedback Overlay (per answer)

**Correct Answer State:**
- Full-screen green tint overlay: `rgba(46,204,113,0.12)`
- Screen border flash: 6px solid `#2ECC71`, animates opacity 1→0 over 0.6s
- Correct option button: turns green, shows ✓ icon on right
- Central feedback card (700×auto, dark bg):
  - Top: large ✓ icon (80px, #2ECC71) with circular green glow
  - "+20 MATA!" text (Bebas Neue 64px, #F5C842) — animates scale 0.5→1.2→1.0, 500ms
  - Coins flying upward from score pill (particle system, 8–12 coin sprites)
  - Feedback text (verbatim per CP, Poppins 400, 22px, #A8B2CC)
  - "TERUSKAN" button (primary, cyan)

**Wrong Answer State:**
- Full-screen red tint overlay: `rgba(231,76,60,0.12)`
- Screen border flash: 6px solid `#E74C3C`, shake animation (translateX ±8px, 3 cycles, 400ms)
- Chosen (wrong) option: turns red with ✗ icon; correct option revealed in muted green
- Central feedback card:
  - Top: ✗ icon (80px, #E74C3C) with red glow
  - "−10 MATA" text (Bebas Neue 64px, #E74C3C) — animates scale 0.5→1.2→1.0
  - Money/cash emoji sprites flying away from score pill (particle system, 6–8 sprites, drift up and fade)
  - Feedback text (verbatim per CP, Poppins 400, 22px, #A8B2CC)
  - Correct answer label: "Jawapan betul: [Option key]" (small, green)
  - "TERUSKAN" button (primary, cyan)

**Feedback text per CP (verbatim):**
- CP1: "Bank tidak hantar link untuk minta maklumat anda."
- CP2: "Bank Negara TIDAK AKAN mengeluarkan surat rasmi kepada individu dan menawarkan pelaburan seperti ini. Pulangan tinggi & cepat biasanya juga tanda-tanda scam."
- CP3: "Sentiasa sahkan nama penerima sebelum transaksi"
- CP4: "Bank Negara tidak akan hubungi individu untuk minta maklumat akaun."
- CP5: "OTP adalah sulit. Jangan kongsi dengan sesiapa pon termasuk ahli keluarga."

---

### SCREEN 5: Result Screen

**Layout (full-screen with road background, centred result card 900×680px):**

**Score display area:**
- "SKOR AKHIR ANDA" label (Poppins 600, 28px, #A8B2CC)
- Animated score counter (counts up from 0 to final score over 1.5s, Bebas Neue 120px, #F5C842)
- "/100" in smaller text (Bebas Neue 60px, #5A6580)
- Score bar: horizontal bar, fills left-to-right proportional to score, colour matches tier

**Tier badges:**
Score 80–100:
- Badge colour: `#2ECC71` (green)
- Badge icon: shield with checkmark, 80px
- Tier label: "🟢 Pemandu Selamat, Bijak & Peka."
- Message: "Tahniah! Anda pemandu yang bijak, peka dan tahu cara lindungi diri. Teruskan amalan ini dan bantu orang lain juga."

Score 50–70:
- Badge colour: `#F5C842` (amber)
- Badge icon: warning shield, 80px
- Tier label: "🟡 Hampir Selamat, Tapi Perlu Lebih Berhati-hati."
- Message: "Anda tahu asas scam, tapi masih boleh tertipu. Ingat! Semak dulu sebelum percaya."

Score 0–40:
- Badge colour: `#E74C3C` (red)
- Badge icon: danger shield, 80px
- Tier label: "🔴 Zon Bahaya. Berisiko Tinggi"
- Message: "Anda mudah terpedaya dengan scam. Tenangkan diri. JANGAN PANIK!"

**Answer review strip:**
- 5 small circles in a row, CP1–CP5
- Green circle = correct, Red circle = wrong
- Tap each circle to see a tooltip with the correct answer (optional enhancement)

**Buttons:**
- "CUBA LAGI" (PrimaryButton, cyan) — resets state, goes to intro
- "TAMAT" (SecondaryButton, outlined) — goes to attract screen

---

## 6. Content Specification

### All Copy Strings (Verbatim)

```
GAME_TITLE = "Perangkap Scam Di Hadapan! Pandu Bijak, Elak Scam!"
GAME_INTRO_TEXT = "Uji kefahaman anda dalam mengenal pasti scam dan belajar cara lindungi diri."
GAME_CARA_BERMAIN = "Pandu dan harungi perangkap scam di hadapan. Kumpul mata untuk lihat tahap 'Scam Awareness' anda"
ATTRACT_CTA = "Sentuh skrin untuk bermain"
BTN_START = "Mula Permainan"
BTN_CONTINUE = "Teruskan"
BTN_RETRY = "Cuba Lagi"
BTN_END = "Tamat"
SCORE_LABEL = "Skor Akhir Anda"
QUESTION_LABEL = "Apakah yang patut anda lakukan?"

CP1_TITLE = "SMS Phishing"
CP1_SCENARIO = "Anda terima SMS: 'Akaun anda telah dibekukan. Klik link ini untuk aktifkan semula.'"
CP1_A = "Klik link segera"
CP1_B = "Abaikan sahaja"
CP1_C = "Semak dan hubungi bank melalui saluran rasmi"
CP1_CORRECT = "C"
CP1_FEEDBACK = "Bank tidak hantar link untuk minta maklumat anda."

CP2_TITLE = "Dokumen BNM Palsu"
CP2_SCENARIO = "BNM menawarkan pelaburan dijamin untung tinggi dan tiada risiko! Untung 30% dalam seminggu!"
CP2_A = "Terus melabur"
CP2_B = "Semak dengan BNM/SC alert"
CP2_C = "Tanya kawan dulu"
CP2_CORRECT = "B"
CP2_FEEDBACK = "Bank Negara TIDAK AKAN mengeluarkan surat rasmi kepada individu dan menawarkan pelaburan seperti ini. Pulangan tinggi & cepat biasanya juga tanda-tanda scam."

CP3_TITLE = "QR Merchant Tidak Dikenali"
CP3_SCENARIO = "Anda scan QR di kedai kecil 'Bayaran kepada: Unknown Enterprise'"
CP3_A = "Terus bayar"
CP3_B = "Semak nama penerima sebelum bayar"
CP3_C = "Abaikan dan pergi"
CP3_CORRECT = "B"
CP3_FEEDBACK = "Sentiasa sahkan nama penerima sebelum transaksi"

CP4_TITLE = "Panggilan Penipuan (Vishing)"
CP4_SCENARIO = "Call masuk: 'Ini panggilan dari Bank Negara. Akaun anda terlibat dengan transaksi tidak sah.'"
CP4_A = "Beri maklumat peribadi"
CP4_B = "Terus panik"
CP4_C = "Tamatkan panggilan & lapor"
CP4_CORRECT = "C"
CP4_FEEDBACK = "Bank Negara tidak akan hubungi individu untuk minta maklumat akaun."

CP5_TITLE = "Permintaan Kod OTP"
CP5_SCENARIO = "Seseorang minta kod OTP untuk 'verify akaun'."
CP5_A = "Beri OTP"
CP5_B = "Abaikan dan jangan kongsi"
CP5_C = "Tanya dulu"
CP5_CORRECT = "B"
CP5_FEEDBACK = "OTP adalah sulit. Jangan kongsi dengan sesiapa pon termasuk ahli keluarga."

RESULT_TIER_HIGH_LABEL = "Pemandu Selamat, Bijak & Peka."
RESULT_TIER_HIGH_MSG = "Tahniah! Anda pemandu yang bijak, peka dan tahu cara lindungi diri. Teruskan amalan ini dan bantu orang lain juga."
RESULT_TIER_MID_LABEL = "Hampir Selamat, Tapi Perlu Lebih Berhati-hati."
RESULT_TIER_MID_MSG = "Anda tahu asas scam, tapi masih boleh tertipu. Ingat! Semak dulu sebelum percaya."
RESULT_TIER_LOW_LABEL = "Zon Bahaya. Berisiko Tinggi"
RESULT_TIER_LOW_MSG = "Anda mudah terpedaya dengan scam. Tenangkan diri. JANGAN PANIK!"

SCORE_CORRECT_ANIM = "+20 MATA!"
SCORE_WRONG_ANIM = "−10 MATA"
CARA_BERMAIN_HEADING = "CARA BERMAIN"
```

---

## 7. Animation & VFX Specification

### Global Transitions (Screen Changes)

| Transition | Type | Duration | Easing | Details |
|---|---|---|---|---|
| Any → any | Crossfade + scale | 400ms | `easeInOutCubic` | Outgoing: opacity 1→0, scale 1→0.95; Incoming: opacity 0→1, scale 1.05→1 |
| Game → Checkpoint | Modal slide-up | 400ms | `easeOutBack(1.2)` | Road blurs behind (CSS filter blur 4px), modal scales from 0.8→1 |
| Checkpoint → Feedback | Flash overlay | 100ms | linear | Instant colour tint, then score animation begins |
| Feedback → Game | Modal dismiss | 250ms | `easeInCubic` | Modal shrinks to 0.9, opacity 0; road unblurs |
| Game → Result | Celebration burst | 800ms | custom | Car drives off-screen right, confetti burst, result card rises |

### Road Canvas Animation

```
- Road scrolls at 4px/frame (60fps = ~240px/sec) during driving
- Road slows to 1px/frame during checkpoint approach (ease-in deceleration over 1s)
- Road stops when checkpoint modal is open
- Centre dashes: drawn as rectangles, scroll downward at road speed
- Dash pattern: 60px drawn, 40px gap, width 8px, colour #F5C842
- Scenery elements (trees, buildings): drawn as layered silhouettes
  - Far layer: 0.3× road speed, opacity 0.3, dark navy (#12192B)
  - Mid layer: 0.6× road speed, opacity 0.5, #1C2540
  - Near layer: 1.0× road speed, opacity 1.0, #2C2C3A with slight texture
```

### Car Animation

```javascript
// GSAP — car idle bounce
gsap.to("#car-sprite", {
  y: -6,
  duration: 0.4,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});

// GSAP — car approach to checkpoint (road slows, car nudges forward)
gsap.to("#car-sprite", {
  y: -30,
  duration: 1.0,
  ease: "power2.out",
  onComplete: showCheckpointModal
});

// GSAP — car exit on game over (result transition)
gsap.to("#car-sprite", {
  x: "+=1200",
  duration: 0.8,
  ease: "power3.in"
});
```

### Flying Coin Particles (Correct Answer)

```javascript
// Particle system — 10 coins burst from score pill
// Each coin: random angle in upper semicircle (π to 2π)
// Initial velocity: 4–8 px/frame
// Gravity: +0.3 px/frame² downward
// Fade out over 1.2 seconds
// Rotation: +10 degrees/frame random
// Sprite: coin.svg, 24×24px
// GSAP timeline per coin:
gsap.to(coinEl, {
  x: Math.cos(angle) * distance,
  y: Math.sin(angle) * distance - arcHeight,
  opacity: 0,
  rotation: randomRotation,
  duration: 1.2,
  ease: "power2.out"
});
```

### Flying Money Particles (Wrong Answer)

```javascript
// 8 money bill sprites fly outward from score area
// Direction: random, but biased upward and outward
// Bills rotate slowly: 2–5 degrees/frame
// Fade out with slight scale down
// Duration: 1.0 seconds
// Uses money-bill.svg, 36×18px
```

### Score Counter Animation

```javascript
// GSAP — count up from 0 to finalScore in 1.5s
let obj = { val: 0 };
gsap.to(obj, {
  val: finalScore,
  duration: 1.5,
  ease: "power2.out",
  onUpdate: () => {
    document.getElementById('score-display').textContent = Math.round(obj.val);
  }
});
```

### "+20 MATA!" / "−10 MATA" Pop Animation

```javascript
// Score delta badge appears at score pill location
// Then floats upward 80px and fades out
gsap.fromTo("#score-delta", {
  scale: 0.3,
  opacity: 0,
  y: 0
}, {
  scale: 1.2,
  opacity: 1,
  duration: 0.25,
  ease: "back.out(2)",
  onComplete: () => gsap.to("#score-delta", { y: -80, opacity: 0, duration: 0.8, ease: "power1.out" })
});
```

### Screen Border Flash (Correct/Wrong)

```css
/* correct-flash keyframe */
@keyframes correct-flash {
  0%   { box-shadow: inset 0 0 0 0 rgba(46,204,113,0); }
  30%  { box-shadow: inset 0 0 0 8px rgba(46,204,113,0.9); }
  100% { box-shadow: inset 0 0 0 8px rgba(46,204,113,0); }
}

/* wrong-shake + flash keyframe */
@keyframes wrong-shake {
  0%   { transform: translateX(0); box-shadow: inset 0 0 0 0 rgba(231,76,60,0); }
  10%  { transform: translateX(-8px); box-shadow: inset 0 0 0 8px rgba(231,76,60,0.9); }
  30%  { transform: translateX(8px); }
  50%  { transform: translateX(-6px); }
  70%  { transform: translateX(6px); }
  90%  { transform: translateX(-3px); }
  100% { transform: translateX(0); box-shadow: inset 0 0 0 8px rgba(231,76,60,0); }
}
/* Duration: 0.5s; applied to #game-root */
```

### Checkpoint Flag Wave

```css
@keyframes flag-wave {
  0%, 100% { transform: rotate(-8deg) skewX(-2deg); }
  50%       { transform: rotate(8deg) skewX(2deg); }
}
/* Duration: 0.8s; ease: ease-in-out; applied to .checkpoint-flag path */
```

### Attract Screen Pulse

```css
@keyframes cta-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1.0); }
  50%       { opacity: 1.0; transform: scale(1.02); }
}
/* Duration: 1.5s; ease: ease-in-out; infinite */
```

### Confetti Burst (Result Screen Enter — high score only)

```javascript
// 40–60 confetti rectangles (4×12px each)
// Random colours from palette: #00C9FF, #2ECC71, #F5C842, #7B2FBE, #FF6B35
// Burst from screen centre
// Random angle 0–360, velocity 8–16px/frame
// Gravity 0.5, fade out over 2.0s
// GSAP stagger: 0.01s between each
```

---

## 8. Audio Specification

### Background Music (BGM)

| Property | Value |
|---|---|
| Genre | Upbeat synthwave / lo-fi driving |
| Tempo | 100–110 BPM |
| Mood | Energetic but not stressful; fun, arcade-like |
| Instrumentation | Synth bass, arpeggiated synth lead, punchy drum kit, subtle reverb |
| Loop | Seamless loop, 30–60 second loop point |
| Volume | Default 0.3 (30%) — museum environment; user-toggleable |
| File | `bgm-loop.mp3`, stereo, 128kbps |
| Behaviour | Plays from attract screen onward; pauses when audio toggle is off |

**Suggested free source:** freesound.org — search "synthwave loop driving 110bpm" — license: Creative Commons 0 or Attribution 3.0

### Sound Effects

| ID | Trigger Event | Sound Description | Duration | Notes |
|---|---|---|---|---|
| `sfx-button-tap` | Any button tap | Short soft click, 800Hz tone, slight reverb | 80ms | All UI buttons |
| `sfx-checkpoint` | Car arrives at checkpoint | Jingle bell ding, ascending 3-note chime | 600ms | Checkpoint modal opens |
| `sfx-correct` | Correct answer selected | Bright positive chime, C-major arpeggio (C-E-G), punchy | 700ms | |
| `sfx-wrong` | Wrong answer selected | Descending "wah-wah" buzzer, minor chord | 500ms | |
| `sfx-coin-collect` | Coin particle spawn | High-pitched metallic "ting", 1200Hz | 150ms | Per coin, slight pitch variation ±5% |
| `sfx-money-fly` | Money particle spawn | Paper flutter / rustling sound | 400ms | |
| `sfx-car-idle` | While car is stationary | Subtle engine idle rumble, low frequency 80–120Hz | Loop | Very low volume 0.1, loop |
| `sfx-car-drive` | Road scrolling active | Engine acceleration, moderate RPM | Loop | Volume 0.2 during driving |
| `sfx-finish` | Result screen enters | Fanfare — brass/synth stab, 4 notes ascending | 1.5s | Played once |
| `sfx-result-high` | Score 80–100 result | Victory fanfare, upbeat | 2.0s | Replaces sfx-finish |
| `sfx-result-low` | Score 0–40 result | Short sad trombone "wah" descending | 1.5s | Replaces sfx-finish |

**Suggested free sources:**
- freesound.org — search: "coin collect 8bit", "wrong answer buzzer", "car engine idle loop", "victory fanfare short"
- OpenGameArt.org — retro/arcade SFX packs (CC0 license)
- Kenney.nl — "Interface Sounds" pack (CC0, free)
- ZapSplat.com — "button click UI" category

### Audio Implementation

```javascript
// audio.js — Audio Manager
const AudioManager = {
  sounds: {},
  bgm: null,
  enabled: true,

  preload(manifest) {
    // Create Audio elements for each SFX
    // Use Promise.all to track loading
    // Implement timeout fallback (skip if not loaded in 5s)
  },

  play(id, options = {}) {
    if (!this.enabled) return;
    const audio = this.sounds[id].cloneNode(); // cloneNode for overlapping sounds
    audio.volume = options.volume || 1.0;
    audio.playbackRate = options.pitch || 1.0;
    audio.play().catch(() => {}); // catch autoplay policy rejection
  },

  startBGM() {
    this.bgm.loop = true;
    this.bgm.volume = 0.3;
    this.bgm.play().catch(() => {});
  },

  toggle() {
    this.enabled = !this.enabled;
    this.bgm[this.enabled ? 'play' : 'pause']();
  }
};
```

**Preloading strategy:**
- Preload all audio on `DOMContentLoaded` using `<link rel="preload" as="audio">` hints
- Start BGM only on first user interaction (browser autoplay policy)
- SFX use `audio.cloneNode()` to allow concurrent playback of same sound

---

## 9. Development Milestones

### Milestone 1 — Foundation & Static Layouts (Complexity: Low)
**Deliverables:**
- `index.html` with all screen containers (hidden by default)
- `main.css` with CSS variables, typography, global reset
- `screens.css` with layout for all 7 screens
- `components.css` with all component styles (buttons, modals, cards)
- All screens visible in static form with placeholder content
- `state.js` with state machine structure (no logic yet)

**Estimated effort:** 2 days

---

### Milestone 2 — Road Game Canvas & Car Animation (Complexity: Medium-High)
**Deliverables:**
- `road.js` — scrolling road Canvas with parallax scenery
- Car SVG integrated, idle bounce animation (GSAP)
- Checkpoint approach animation (car nudges, road slows)
- HUD elements (score pill, progress bar with car icon, CP counter)
- GSAP loaded and working

**Estimated effort:** 3 days

---

### Milestone 3 — Checkpoint Logic & Answer System (Complexity: Medium)
**Deliverables:**
- `data/checkpoints.js` with all 5 checkpoint objects
- `game.js` — checkpoint modal rendering from data
- Answer selection logic (correct/wrong evaluation)
- Score update with `state.js` integration
- `particles.js` — coin and money particle systems
- All feedback overlays (correct green, wrong red)
- Screen border flash and shake animations

**Estimated effort:** 3 days

---

### Milestone 4 — Result Screen, Attract Screen & Idle Timer (Complexity: Low-Medium)
**Deliverables:**
- Result screen with animated score counter
- Tier badge and message display logic
- Confetti burst animation (high score)
- Attract screen with road loop and pulsing CTA
- Idle timer (30-second reset to attract)
- "Cuba Lagi" and "Tamat" flow

**Estimated effort:** 2 days

---

### Milestone 5 — Audio Integration, Polish & Testing (Complexity: Medium)
**Deliverables:**
- `audio.js` fully implemented, all SFX wired to events
- BGM with toggle button
- Cross-browser testing (Chrome kiosk mode primary target)
- Touch event testing on actual kiosk display
- Performance profiling (target: stable 60fps on Canvas)
- Fallback for no-audio environments
- Final content review against verbatim copy spec
- Attract screen idle loop stress test (8+ hours)

**Estimated effort:** 2 days

---

## 10. Claude Code Implementation Notes

### Key Implementation Challenges

#### 1. Canvas Road Rendering Performance
**Challenge:** Scrolling road with parallax layers at 60fps while DOM overlays are animating can cause jank.
**Approach:**
- Use a single `<canvas>` element for road (no DOM road tiles)
- Pre-render road tile to an `OffscreenCanvas` or `createImageBitmap()` at load time, then `drawImage` the cached bitmap each frame
- Use `requestAnimationFrame` with a delta-time accumulator to maintain consistent scroll speed regardless of frame rate dips
- Only run road animation loop when screen is 'game'; cancel with `cancelAnimationFrame` when modal is open

```javascript
let lastTime = 0;
let scrollY = 0;
const ROAD_SPEED = 4; // px per 16ms (60fps baseline)

function roadLoop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;
  scrollY += ROAD_SPEED * (delta / 16.67);
  if (scrollY > TILE_HEIGHT) scrollY -= TILE_HEIGHT;
  drawRoad(ctx, scrollY);
  rafId = requestAnimationFrame(roadLoop);
}
```

#### 2. GSAP MotionPath for Car on Road
**Challenge:** Making the car follow a subtle winding path instead of straight-line movement.
**Approach:**
- Define a simple SVG path in a hidden `<svg>` element representing a gentle S-curve on the road
- Use `gsap.to(car, { motionPath: { path: '#road-path', autoRotate: true }, duration: 2 })`
- For kiosk simplicity, a straight `translateY` approach is acceptable if MotionPath adds complexity

#### 3. Particle System Without a Library
**Challenge:** 8–12 simultaneous particles each frame for coin/money effects.
**Approach:**
- Use a lightweight custom class `Particle` with `x, y, vx, vy, life, rotation` properties
- Maintain a `particles[]` array; update and draw each frame using Canvas 2D
- Remove particles when `life <= 0`
- Alternatively, use GSAP to animate DOM `<img>` elements as particles (simpler, acceptable for ≤15 particles)

#### 4. Touch Event Handling on Kiosk
**Challenge:** Touch events vs click events; preventing double-taps; 300ms click delay.
**Approach:**
- Add `touch-action: manipulation` CSS on all interactive elements (eliminates 300ms delay)
- Add `fastclick`-style logic: listen to `touchend` rather than `click` for option buttons
- Use `GameState.animationInProgress` flag to prevent duplicate submissions
- Disable option buttons immediately on first tap with `pointer-events: none`

```javascript
optionBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  if (GameState.animationInProgress) return;
  GameState.animationInProgress = true;
  evaluateAnswer(optionKey);
}, { passive: false });
```

#### 5. Audio Autoplay Policy
**Challenge:** Browsers block audio autoplay until user interaction.
**Approach:**
- Register a one-time `touchstart`/`click` handler on `document` that calls `AudioManager.startBGM()` — fires on first tap (Intro screen "Mula" button usually the first interaction)
- Wrap all `audio.play()` calls in `.catch(() => {})` to silently handle policy rejections

#### 6. Idle Timer Accuracy
**Challenge:** `setTimeout` can drift; idle timer must reliably trigger attract screen after 30 seconds.
**Approach:**
```javascript
function resetIdleTimer() {
  clearTimeout(GameState.idleTimer);
  GameState.idleTimer = setTimeout(() => {
    if (GameState.screen !== 'attract') setState('attract');
  }, 30000);
}
document.addEventListener('touchstart', resetIdleTimer, { passive: true });
document.addEventListener('mousedown', resetIdleTimer);
```
- Do NOT reset idle timer during animations (only on genuine user input)

### Performance Considerations
- Target: **60fps** on a mid-range Intel NUC or mini-PC running Chrome kiosk mode
- Canvas road loop: aim for < 3ms per frame (simple tile blit operation)
- DOM overlay animations (GSAP): generally < 1ms per frame
- Avoid `box-shadow` changes inside animation loops (expensive repaint) — pre-define them and toggle CSS classes instead
- Use `will-change: transform, opacity` on animated elements
- Preload all images as `Image` objects at startup; do not `drawImage` with unloaded sources

### Accessibility Notes
- **High contrast:** All text meets WCAG AA (4.5:1 minimum) against backgrounds. White (#FFFFFF) on dark (#0A0E1A) = 19.1:1 (passes AAA)
- **Font size:** Minimum 18px body text for readability at kiosk viewing distances (1–1.5m)
- **Touch targets:** All targets minimum 60×60px (exceeds WCAG 2.5.5 of 44×44px)
- **No time pressure:** Checkpoints have no timer — visitors can read at their own pace (important for accessibility and language comprehension)
- **Audio toggle:** Visible, persistent audio on/off button — respects visitors who need quiet environments
- **Colour + text:** Never rely on colour alone to convey meaning (correct/wrong states use both colour AND icon ✓/✗ AND text label)
- **Language:** Bahasa Malaysia throughout; no English-only UI elements

---

*Document version 1.0 — Festival Hari Museum Antarabangsa 2026*
*PIC: Nadia | Prepared for developer handoff via Claude Code*

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
<h1 data-i18n="welcome_title">Perangkap Scam Di Hadapan!</h1>
<p data-i18n="welcome_subtitle">Uji kefahaman anda...</p>
<button data-i18n="btn_start">Mula</button>

<!-- Dynamic / programmatic text (in JS) -->
questionEl.textContent = t('cp1_question');
feedbackEl.innerHTML = t('cp1_feedback');
```

### String Key Conventions for This Project

Keys for Project 1 (Car Scam Game):

- `welcome_title`, `welcome_subtitle`, `welcome_how_to_play`, `welcome_cta`
- `cp1_scenario`, `cp1_opt_a`, `cp1_opt_b`, `cp1_opt_c`, `cp1_feedback`
- `cp2_scenario`, `cp2_opt_a`, `cp2_opt_b`, `cp2_opt_c`, `cp2_feedback`
- `cp3_scenario`, `cp3_opt_a`, `cp3_opt_b`, `cp3_opt_c`, `cp3_feedback`
- `cp4_scenario`, `cp4_opt_a`, `cp4_opt_b`, `cp4_opt_c`, `cp4_feedback`
- `cp5_scenario`, `cp5_opt_a`, `cp5_opt_b`, `cp5_opt_c`, `cp5_feedback`
- `score_correct_points`, `score_wrong_points`
- `result_high_title`, `result_high_msg`
- `result_mid_title`, `result_mid_msg`
- `result_low_title`, `result_low_msg`
- `btn_start`, `btn_next`, `btn_retry`, `btn_home`

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

**PROJECT 1 (Car Scam Game):** The road/driving game canvas can keep a night-road aesthetic for the GAME VIEW only (it's thematically appropriate — driving at night past scam checkpoints), but the START SCREEN, CHECKPOINT MODALS, and RESULT SCREEN must use the BNM MAG warm style (white cards, illustrated characters, warm background). The car character should be a friendly illustrated cartoon car. Checkpoint pop-ups should be card-modal style with an illustrated character (shocked face for scam scenarios). Score screen uses the result card pattern with illustrated character.
