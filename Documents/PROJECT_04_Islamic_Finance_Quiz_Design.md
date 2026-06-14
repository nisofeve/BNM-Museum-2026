# PROJECT 04 — Kewangan Islam: Pilihan Bijak, Masa Depan Beretika (Islamic Finance Values Quiz)

**PIC:** Amru
**Format:** HTML5 Interactive Video-Game Style Cinematic Quiz
**Language:** Bahasa Malaysia
**Concept:** Dramatic, cinematic quiz experience with animated visual feedback, multi-select answer mechanics, and score-tier ending screens
**Display Context:** Museum kiosk (touchscreen), landscape orientation, unattended public use

---

## 1. Project Overview

### Purpose
This interactive quiz immerses museum visitors in the core values and principles of Islamic Finance through a video-game-inspired cinematic experience. Rather than a static information panel, visitors actively test their understanding through 6 thought-provoking questions covering ethics, risk-sharing, economic purpose, and institutional responsibility. The experience rewards curiosity, corrects misconceptions, and leaves visitors with a richer understanding of Islamic Finance as a principled, values-driven system.

### Target Audience
- General Malaysian public, ages 15–60+
- Students, working adults, professionals
- Muslim and non-Muslim visitors with varying familiarity with Islamic Finance concepts
- No prior financial literacy required — the quiz is self-teaching through its feedback mechanism

### PIC
Amru

### Format
Single-page HTML5 application. Full-screen cinematic presentation. Dramatic background scenes shift per question. Multi-select and single-select answer cards. Animated feedback reveals per question. Final score screen with tier-based outcome messaging.

### Language
Bahasa Malaysia throughout. All labels, questions, feedback, and copy in BM.

### Display Context
- Museum kiosk, unattended operation
- Touchscreen primary input
- Expected session duration: 4–8 minutes per visitor
- Idle attract screen after 60 seconds of inactivity
- Designed to be visually striking from a distance to attract passers-by

---

## 2. Technical Stack

### Core Technologies
- **HTML5** — semantic structure, full-screen canvas backdrop layer
- **CSS3** — custom properties, CSS Grid, Flexbox, keyframe animations, CSS filters (blur, brightness), backdrop-filter for frosted glass effects
- **Vanilla JavaScript (ES6+)** — no framework; modular pattern with clearly separated concerns

### Animation Libraries
- **GSAP 3 (GreenSock)** — primary engine for all cinematic transitions, answer card animations, feedback reveals, score countups, and dramatic entrance sequences
  - Key plugins: `gsap.timeline()`, `gsap.from()`, `gsap.to()`, `SplitText` (if licensed) or manual character-split for text animation
- **CSS Animations** — particle glow effects, idle screen pulse, answer card shimmer
- **Canvas API (native)** — lightweight particle system for correct-answer sparkle bursts and score-screen celebration

### Cinematic / Video Approach Options

**Option A (Recommended): CSS/Canvas Cinematic Backgrounds**
Each question has a unique full-bleed background composed of:
- A high-quality thematic illustration/photograph (blurred, darkened overlay)
- CSS-animated geometric patterns (Islamic geometric motifs, star polygons)
- Parallax depth: background layer moves subtly as user reads question

**Option B: Video Loop Backgrounds**
Short (4–6s) MP4 video loops per question (e.g., abstract architectural footage, flowing light, etc.). Higher visual impact but ~150MB additional assets and potential playback sync complexity on kiosk hardware.

**Option C: Procedural Canvas Animation**
Each question scene generated via Canvas API: animated geometric patterns (muqarnas-inspired grids, tessellating stars) with dynamic colour shifts. Zero additional asset dependency.

**Recommended: Option A** — balanced visual quality, manageable asset size, reliable kiosk performance.

### Audio
- Web Audio API for SFX (pre-loaded AudioBuffers for zero-latency playback)
- `<audio>` element for BGM with seamless loop
- Per-question music layer (intensity builds each question) — achieved by crossfading between BGM tracks rather than dynamic audio layering

### Recommended Resolution / Display Size
- **Primary target:** 1920×1080px (Full HD landscape)
- **Fallback:** 1366×768px
- Minimum touch target: 60×60px for all interactive elements
- Font baseline: 22px body, 36px+ headings — optimised for kiosk readability

### File Structure
```
project-04-islamic-finance-quiz/
├── index.html
├── assets/
│   ├── audio/
│   │   ├── bgm_cinematic_intro.mp3
│   │   ├── bgm_quiz_tension.mp3
│   │   ├── bgm_results_triumph.mp3
│   │   ├── sfx_question_enter.mp3
│   │   ├── sfx_answer_select.mp3
│   │   ├── sfx_answer_deselect.mp3
│   │   ├── sfx_submit_answer.mp3
│   │   ├── sfx_correct_reveal.mp3
│   │   ├── sfx_incorrect_reveal.mp3
│   │   ├── sfx_partial_correct.mp3
│   │   ├── sfx_feedback_appear.mp3
│   │   ├── sfx_score_countup.mp3
│   │   ├── sfx_score_tier_1.mp3
│   │   ├── sfx_score_tier_2.mp3
│   │   └── sfx_score_tier_3.mp3
│   ├── fonts/
│   │   ├── CinzelDecorative-Bold.woff2
│   │   ├── Tajawal-Regular.woff2
│   │   ├── Tajawal-Medium.woff2
│   │   └── Tajawal-Bold.woff2
│   └── images/
│       ├── bg_q1_community.jpg
│       ├── bg_q2_balance.jpg
│       ├── bg_q3_economy.jpg
│       ├── bg_q4_contract.jpg
│       ├── bg_q5_gambling.jpg
│       ├── bg_q6_institution.jpg
│       ├── bg_idle.jpg
│       ├── pattern_geometric_gold.svg
│       ├── pattern_stars_subtle.svg
│       ├── icon_star_gold.svg
│       └── logo_museum.svg
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   ├── screens.css
│   ├── animations.css
│   └── themes.css
├── js/
│   ├── main.js
│   ├── stateManager.js
│   ├── quizData.js
│   ├── quizEngine.js
│   ├── multiSelectLogic.js
│   ├── animator.js
│   ├── particleEngine.js
│   ├── audioManager.js
│   └── idleManager.js
└── vendor/
    └── gsap.min.js
```

---

## 3. Application Architecture

### Screen / State Flow

```
[IDLE / ATTRACT SCREEN]
        |
        | Touch anywhere
        v
[INTRO CINEMATIC SCREEN]
        | Logo reveal + title animation (3 seconds)
        | "Mulakan Cabaran" button appears
        | Tap "Mulakan Cabaran"
        v
[QUESTION SCREEN — Q1]  ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
        | User taps answer card(s)               |
        | [For multi-select: multiple cards       |
        |  can be selected; submit button         |
        |  appears after first selection]         |
        | Tap "Sahkan Jawapan"                    |
        v                                         |
[FEEDBACK SCREEN — Q1]                           |
        | Correct answers highlighted green       |
        | Wrong selections highlighted red        |
        | Missed correct answers pulse amber      |
        | Feedback text panel reveals             |
        | Tap "Soalan Seterusnya →"               |
        |                                         |
        | [Q1→Q2→Q3→Q4→Q5→Q6, repeat loop] ─ ─ ─┘
        v (after Q6 feedback)
[SCORE TALLY SCREEN]
        | Animated score countup (0 → X/6)
        | 3-second dramatic pause
        v
[SCORE RESULT SCREEN]
        | Tier-specific cinematic reveal
        | Tier message + extended copy
        | "Cuba Lagi" button → returns to INTRO
        | "Tamat" button → 10s countdown → IDLE
        v
[IDLE / ATTRACT SCREEN]
```

### State Management Approach

```javascript
const AppState = {
  currentScreen: 'idle',           // string: screen identifier
  currentQuestion: 0,              // integer: 0-indexed (0–5)
  answers: [],                     // Array[6] of Set objects (user selections per Q)
  results: [],                     // Array[6] of { correct: bool, partial: bool, score: 0|1 }
  totalScore: 0,                   // integer: 0–6
  scoreTier: null,                 // string: 'low' | 'mid' | 'high'
  idleTimer: null,
  audioEnabled: true
};
```

State transitions dispatched through `stateManager.transition(action, payload)`. No direct DOM mutation outside designated render functions.

### Data Structures

```javascript
// Question definition object (in quizData.js)
const Question = {
  id: Number,                    // 1–6
  text: String,                  // Question text in BM
  type: String,                  // 'single' | 'multi' — determines selection logic
  options: Array[Option],        // 4 answer options
  correctIds: Array[String],     // e.g., ['d'] or ['c', 'd']
  feedback: String,              // Feedback text in BM (shown after reveal)
  bgImage: String,               // Background image filename
  bgTheme: String                // CSS theme class name for this question
};

// Answer option object
const Option = {
  id: String,                    // 'a', 'b', 'c', 'd'
  text: String                   // Answer text in BM
};

// Per-question result object
const QuestionResult = {
  questionId: Number,
  userSelections: Set,           // Set of option ids the user selected
  correctIds: Array,             // From question definition
  isFullyCorrect: Boolean,       // All correct selected, no wrong selected
  isPartiallyCorrect: Boolean,   // Some correct selected (multi-select questions)
  score: Number                  // 0 or 1 (1 = fully correct only)
};
```

---

## 4. UI/UX Design Specification

### Colour Palette

Dark cinematic base with gold Islamic geometric accents — inspired by traditional Islamic architecture (deep navy/charcoal + gold leaf + emerald/teal).

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-deep` | `#0A0E1A` | Deep navy — primary background, darkest layer |
| `--color-bg-mid` | `#141927` | Mid-dark — card backgrounds, overlay panels |
| `--color-bg-panel` | `#1C2438` | Panel backgrounds, answer cards default |
| `--color-gold-primary` | `#D4AF37` | Gold — primary accent, headings, selected borders |
| `--color-gold-light` | `#F0D060` | Gold light — hover highlight, shimmer effect |
| `--color-gold-dim` | `#8B7220` | Gold dim — decorative geometric patterns |
| `--color-emerald` | `#10B981` | Correct answer state, positive feedback |
| `--color-emerald-glow` | `#34D399` | Correct glow effect, sparkle particles |
| `--color-crimson` | `#EF4444` | Incorrect answer state, wrong selection |
| `--color-crimson-glow` | `#F87171` | Wrong answer glow |
| `--color-amber-warn` | `#F59E0B` | Missed correct answer (was correct but not selected) |
| `--color-text-primary` | `#F9FAFB` | Primary text — near white |
| `--color-text-secondary` | `#D1D5DB` | Secondary text, sub-labels |
| `--color-text-muted` | `#6B7280` | Disabled states, fine print |
| `--color-overlay` | `rgba(10, 14, 26, 0.75)` | Background image dimming overlay |
| `--color-card-border` | `rgba(212, 175, 55, 0.20)` | Subtle gold border on answer cards (default) |
| `--color-card-selected-border` | `#D4AF37` | Full gold border when card selected |

### Typography

| Role | Font | Weight | Size (kiosk) |
|---|---|---|---|
| Cinematic Title | Cinzel Decorative | Bold | 64px |
| Section Title | Cinzel Decorative | Bold | 36px |
| Question Text | Tajawal | Bold (700) | 32px |
| Answer Option | Tajawal | Medium (500) | 24px |
| Feedback Body | Tajawal | Regular (400) | 22px |
| Label / Counter | Tajawal | Bold (700) | 20px |
| Score Display | Cinzel Decorative | Bold | 96px |
| Caption | Tajawal | Regular (400) | 16px |

Tajawal chosen for primary BM text: excellent Arabic-Latin bilingual support, clean at large sizes, and culturally resonant for Islamic Finance context.
Cinzel Decorative for hero/display use: classical gravitas, cinematic weight.

Line height: 1.5 for body, 1.3 for display titles.
Letter spacing: 0.05em for Cinzel (openness), 0.01em for Tajawal.

### Layout Grid
- **Base grid:** 12-column CSS Grid, 1920px canvas
- **Question screen:** Full-bleed background + centred content column (8 cols, max 1200px wide)
- **Answer cards:** 2×2 grid for 4 options, each card equal width, 24px gap
- **Feedback panel:** Full-width bottom drawer that slides up (height: 35vh)
- **Score screen:** Centred single column (6 cols)

### Component Library

**Answer Card**
```
Background: --color-bg-panel
Border: 2px solid --color-card-border
Border-radius: 16px
Padding: 28px 32px
Min-height: 100px
Touch target: full card surface
Letter prefix badge: A/B/C/D — circle 44px, --color-bg-mid background, --color-gold-primary text
Option text: Tajawal Medium 24px, --color-text-primary

States:
  Default:   border --color-card-border, bg --color-bg-panel
  Hover:     border rgba(212,175,55,0.50), bg rgba(28,36,56,0.9), shimmer overlay appears
  Selected:  border --color-card-selected-border 3px, bg rgba(212,175,55,0.12), gold left-border 6px, checkmark icon top-right
  Correct reveal:  bg rgba(16,185,129,0.15), border --color-emerald 3px, green checkmark, glow pulse
  Wrong reveal:    bg rgba(239,68,68,0.15), border --color-crimson 3px, X icon
  Missed correct:  bg rgba(245,158,11,0.15), border --color-amber-warn 3px, amber arrow icon
  Locked (after submit): pointer-events: none, no hover state
```

**Submit Button ("Sahkan Jawapan")**
```
Background: --color-gold-primary
Text: --color-bg-deep, Tajawal Bold 24px
Padding: 20px 60px
Border-radius: 12px
Min-height: 64px
Appears: opacity 0 → 1 (300ms) after user's first selection
Disabled: opacity 0.5, pointer-events: none
Active: scale(0.97), 100ms
Hover: --color-gold-light, scale(1.02)
```

**Question Counter**
```
Position: top-right of question area
Format: "Soalan 3 / 6"
Font: Tajawal Bold 20px, --color-gold-primary
Progress bar: thin 4px gold line filling left-to-right below counter
```

**Progress Dots (for question navigation)**
```
Row of 6 dots at top-centre
Default: 8px circle, --color-text-muted
Completed correct: 12px circle, --color-emerald, glow shadow
Completed wrong: 12px circle, --color-crimson
Current: 14px circle, --color-gold-primary, pulse animation
```

**Feedback Panel (bottom drawer)**
```
Background: rgba(10, 14, 26, 0.95), backdrop-filter: blur(12px)
Border-top: 2px solid --color-gold-dim
Height: 35vh when expanded
Padding: 32px 48px
Icon: checkmark/X circle (60px) left-aligned with result colour
Title: "Betul! / Kurang Tepat. / Tahniah!" in result colour
Body: Tajawal Regular 22px, --color-text-secondary, max 4 lines
Next button: right-aligned, "Soalan Seterusnya →" (or "Lihat Keputusan →" on Q6)
```

**Score Display (Score Tally Screen)**
```
Central large number: Cinzel Decorative Bold 96px, --color-gold-primary
"/6" in smaller weight: 48px, --color-text-secondary
Star icons: animated row of 6 stars filling gold sequentially
Tier badge: large pill, tier colour, tier icon
```

**Mute Toggle / Exit Button**
```
Mute: Fixed top-right, 52px circle, semi-transparent dark bg
Exit: Fixed top-left, 52px circle, "←" icon — requires 3-second hold to confirm (prevents accidental exit)
```

**Idle Screen CTA**
```
Pulsing golden ring animation around central circle (180px diameter)
Geometric pattern: animated rotating Islamic star pattern (CSS)
Text: "Sentuh untuk Memulakan Cabaran" — Cinzel Decorative 36px, --color-gold-primary
```

### Touch / Interaction Targets
- Answer cards: minimum 100px height (full card is touch target)
- Submit button: 64px height, minimum 280px width
- "Seterusnya" button in feedback panel: 64px height
- Navigation buttons (exit, mute): 52px circle with 80px touch area
- Spacing between adjacent answer cards: 24px gap

### Idle / Attract Screen
- Activates after **60 seconds** of inactivity
- Full-screen: dark bg + rotating Islamic geometric gold star pattern (CSS animation)
- Animated gold particles drifting upward (Canvas particle engine, 20 particles)
- Pulsing gold ring around central tap target
- Title: "Kewangan Islam — Pilihan Bijak, Masa Depan Beretika" fading in/out
- Sub-text: "Uji Pengetahuan Anda" cycling with 3 teaser facts about Islamic Finance
- Any touch: cross-fade to Intro Cinematic screen

---

## 5. Screen-by-Screen Design

### IDLE / ATTRACT SCREEN

**Layout:** Full-bleed, centred
**Background:** `--color-bg-deep` + animated Islamic geometric gold star pattern (CSS `@keyframes rotate` on SVG pattern, very slow — 120s full rotation)
**Canvas layer:** 20 gold particles (`--color-gold-dim`) slowly drifting upward, random X positions, looping
**Content:**
- Museum/event logo: top-left, white, 100px wide
- Central content (no card background — text directly on dark):
  - Title line 1: "KEWANGAN ISLAM" — Cinzel Decorative 64px, `--color-gold-primary`
  - Title line 2: "Pilihan Bijak, Masa Depan Beretika" — Tajawal Bold 32px, `--color-text-secondary`
  - Separator line: thin gold horizontal rule, 300px wide, centred
  - Pulsing gold ring with inner touch target (180px)
  - "Sentuh untuk Memulakan" text below ring
- Bottom: cycling 3 teaser questions (Tajawal 22px, `--color-text-secondary`, 5s each, fade transition):
  1. "Adakah kewangan Islam hanya tentang mengelak riba?"
  2. "Siapa yang menanggung risiko dalam kewangan Islam?"
  3. "Apakah tujuan sebenar institusi kewangan Islam?"

---

### INTRO CINEMATIC SCREEN

**Duration:** ~4 seconds auto-advance, then "Mulakan Cabaran" button holds
**Background:** Slow-pan on a high-quality image of Islamic architecture (gold, geometric, atmospheric)
**Content (GSAP timeline):**
- 0.0s: Screen enters from black (fade)
- 0.5s: Geometric gold star appears at centre, expands outward (CSS/GSAP scale)
- 1.0s: Title "KEWANGAN ISLAM" letterpress reveals character by character (SplitText or manual span injection) — Cinzel Decorative 64px
- 2.0s: Sub-title "Pilihan Bijak, Masa Depan Beretika" fades up
- 2.8s: Horizontal gold rule draws left to right
- 3.2s: Body text fades in: "Uji kefahaman anda tentang prinsip dan nilai kewangan Islam melalui 6 soalan cabaran. Pilihan anda mencerminkan pemahaman anda."
- 3.8s: "Mulakan Cabaran →" button scales in with spring animation
- Button tap → transition to Q1

---

### QUESTION SCREENS (Q1–Q6)

Each question screen shares the same layout template but has a unique background image and theme class.

**Layout:**
```
[Full-bleed background image + dark overlay]
[Top bar: question counter "Soalan N / 6" + progress dots]
[Question text area — upper half, centred, max 1200px wide]
[Answer cards — 2×2 grid, lower half]
[Submit button — below cards, centred, hidden until first selection]
[Mute toggle — top-right fixed]
[Exit button — top-left fixed]
```

**Entrance animation per question:**
1. Background image cross-fades from previous (600ms)
2. Question number fades in top-right (300ms)
3. Question text: each word/phrase staggers in from opacity 0, Y+20px (GSAP stagger: 0.04s per word)
4. Answer cards: stagger in from opacity 0, Y+30px (GSAP stagger: 0.1s per card, starting after question text settles)
5. Total entrance: ~2.0 seconds from transition start

**Multi-select indicator (for Q2 which has two correct answers):**
- Small label below question text: "(Boleh pilih lebih daripada satu jawapan)" — Tajawal Regular 18px, `--color-amber-warn`
- Visible only when question type = 'multi'

**Note on Q2:** Per PIC note, Q2 has been flagged for client review regarding whether option D ("Risiko dielakkan sepenuhnya") should remain as a correct answer. The implementation should make this easy to change in `quizData.js` by simply removing `'d'` from `correctIds` array without code changes elsewhere.

**Submit button behaviour:**
- Hidden (opacity 0, pointer-events none) on question entrance
- After first card tap: button animates in (opacity 0 → 1, Y+10px → 0, 300ms)
- Label: "Sahkan Jawapan" (default) or "Sahkan [N] Jawapan" for multi-select where N = count of selected
- Tap: locks all cards, triggers feedback reveal animation

---

### FEEDBACK REVEAL (inline with question screen)

After "Sahkan Jawapan" is tapped, the feedback reveal plays on the same screen — the answer cards change state (green/red/amber) and the feedback panel slides up from the bottom.

**Answer card reveal sequence (GSAP timeline):**
1. Submit button fades out (200ms)
2. All cards simultaneously: brief flash (200ms) — then colour states applied based on result
3. Correct cards (user got right): GSAP scale 1.0 → 1.03 → 1.0, border goes gold → emerald, SFX correct
4. Wrong cards (user selected but wrong): shake animation (rapid X oscillation ±8px, 400ms), border → crimson
5. Missed correct cards (correct but user did not select): pulse amber border 3×, then holds amber
6. Sparkle burst: Canvas particle explosion from correct card positions (emerald particles, 30 particles, 800ms)

**Feedback panel (bottom drawer):**
- Slides up from bottom (translateY: 35vh → 0, 500ms, ease-out cubic)
- Background: dark frosted glass
- Content (fades in as panel arrives):
  - Result icon (60px): green checkmark (all correct), amber partial (partial), red X (all wrong)
  - Result title line: context-sensitive (see feedback content in Section 6)
  - Feedback body text: full paragraph from `quizData.js`
  - "Soalan Seterusnya →" button (or "Lihat Keputusan →" on Q6)

---

### SCORE TALLY SCREEN

**Duration:** ~4 seconds before result screen
**Background:** `--color-bg-deep` + slow gold particle drift (Canvas)
**Content (GSAP timeline):**
- 0.0s: Fade in from last question screen
- 0.4s: "Keputusan Anda" — Cinzel Decorative 48px fades in
- 0.8s: Score display: "0 / 6" appears, then counts up to actual score (1.5s countup, GSAP tween on number object)
- 2.2s: Row of 6 stars fills from left — each star that counts as "correct" turns gold sequentially (300ms per star, stagger 250ms)
- 3.5s: Dramatic pause. Screen dims slightly.
- 4.0s: Transition to Score Result Screen

---

### SCORE RESULT SCREEN

Three distinct visual themes based on score tier.

**Tier 1 — Score 1–2/6 ("low")**
- Background: desaturated, slightly blurred architecture image
- Colour accent: `--color-amber-warn`
- Emoji graphic: large 😅 (128px CSS rendered or SVG equivalent)
- Headline: "Oh-oh! Masih banyak ruang boleh dibaiki — jom, cuba lagi!"
- Body: "Masih banyak yang boleh diterokai tentang kewangan berasaskan nilai. Cuba lagi — setiap pilihan membawa anda lebih dekat kepada pemahaman yang lebih baik!"
- Animation: gentle bounce on emoji, ambient amber glow pulses

**Tier 2 — Score 3–4/6 ("mid")**
- Background: warmer architecture image, medium brightness
- Colour accent: `--color-gold-primary`
- Emoji graphic: large 🤔 (or equivalent SVG)
- Headline: "Anda di landasan yang betul!"
- Body: "Anda sudah mula memahami konsep kewangan yang adil, tetapi masih ada ruang untuk diperkukuh. Teruskan bermain dan cabar diri untuk capai tahap seterusnya!"
- Animation: gold shimmer sweep across headline, gentle star sparkle

**Tier 3 — Score 5–6/6 ("high")**
- Background: brightest, most vibrant architecture image + golden vignette
- Colour accent: `--color-gold-light`
- Full celebration: Canvas confetti burst (100 particles, mix of gold and emerald, 2s)
- Headline: "Tahniah! Anda bakal jadi 'Game Changer' dalam dunia kewangan masa depan!"
- Body: "Anda memahami prinsip kewangan Islam dan nilai keseimbangannya dengan baik."
- Animation: multiple sparkle bursts from screen edges, star icons orbit around score display

**All tiers — bottom action row:**
- Primary: "Cuba Lagi →" → transitions back to Intro Cinematic
- Secondary: "Tamat" → 10-second countdown then return to Idle

---

## 6. Content Specification

### Full Quiz Data (verbatim, for `quizData.js`)

---

#### Question 1

```
id: 1
type: 'single'
bgImage: 'bg_q1_community.jpg'
bgTheme: 'theme-community'

text: "Pada pandangan anda, apakah peranan sebenar kewangan Islam (pelaburan, simpanan, perbelanjaan)?"

options: [
  { id: 'a', text: "Memaksimumkan keuntungan semata-mata" },
  { id: 'b', text: "Memberi manfaat kepada Masyarakat" },
  { id: 'c', text: "Melindungi alam sekitar" },
  { id: 'd', text: "Memberi manfaat kepada masyarakat dan alam sekitar" }
]

correctIds: ['d']

feedback: "Kewangan Islam bukan sekadar menjana keuntungan. Lebih penting, ia perlu memberi kebaikan kepada manusia serta memelihara alam sekitar dengan mengutamakan pembiayaan projek mesra alam seperti tenaga hijau yang mengurangkan pencemaran. Inilah pendekatan yang seimbang dan lebih bermakna untuk jangka panjang."
```

---

#### Question 2

```
id: 2
type: 'multi'
bgImage: 'bg_q2_balance.jpg'
bgTheme: 'theme-balance'

multiSelectLabel: "(Boleh pilih lebih daripada satu jawapan)"

text: "Dalam urusan kewangan Islam, apakah pendekatan paling adil untuk mengurus risiko?"

options: [
  { id: 'a', text: "Satu pihak menanggung semua risiko" },
  { id: 'b', text: "Risiko disembunyikan atau tidak dijelaskan dengan telus" },
  { id: 'c', text: "Risiko dikongsi secara adil antara semua pihak" },
  { id: 'd', text: "Risiko dielakkan sepenuhnya" }
]

correctIds: ['c', 'd']
// NOTE: PIC Amru flagged option D for client review — may be removed from correctIds
// To change: remove 'd' from correctIds array only. No code changes needed.

feedback: "Pendekatan kewangan yang adil bukan tentang memindahkan risiko kepada orang lain. Sebaliknya, ia menekankan tanggungjawab bersama, di mana setiap pihak berkongsi risiko secara telus dan saksama. Inilah asas kepada sistem kewangan Islam yang lebih seimbang dan beretika."
// NOTE: Client wants simpler explanation of "risk transfer" — review final copy for plain language.
```

---

#### Question 3

```
id: 3
type: 'single'
bgImage: 'bg_q3_economy.jpg'
bgTheme: 'theme-economy'

text: "Apakah jenis aktiviti ekonomi yang paling wajar disokong?"

options: [
  { id: 'a', text: "Aktiviti spekulatif untuk keuntungan pantas" },
  { id: 'b', text: "Aktiviti yang boleh memudaratkan Masyarakat" },
  { id: 'c', text: "Aktiviti yang memenuhi keperluan sebenar seperti perumahan, perniagaan dan perkhidmatan" },
  { id: 'd', text: "Apa sahaja aktiviti asalkan pulangannya tinggi" }
]

correctIds: ['c']

feedback: "Kewangan Islam bukan sekadar mencari keuntungan, tetapi mementingkan keberkatan dan manfaat. Ia menyokong aktiviti yang memenuhi keperluan sebenar manusia dan memberi kebaikan kepada masyarakat — bukan spekulasi semata-mata."
```

---

#### Question 4

```
id: 4
type: 'single'
bgImage: 'bg_q4_contract.jpg'
bgTheme: 'theme-contract'

text: "Dalam kewangan Islam, apakah prinsip paling penting dalam sesuatu transaksi?"

options: [
  { id: 'a', text: "Ketidakpastian tinggi (gharar) dibenarkan" },
  { id: 'b', text: "Riba (faedah) dibenarkan" },
  { id: 'c', text: "Ketelusan dan keadilan dalam kontrak" },
  { id: 'd', text: "Keuntungan tanpa usaha" }
]

correctIds: ['c']

feedback: "Dalam kewangan Islam, setiap transaksi perlu jelas, telus dan adil kepada semua pihak. Tiada unsur tersembunyi atau mengambil kesempatan. Inilah asas yang memastikan urusan kewangan lebih beretika dan diberkati."
```

---

#### Question 5

```
id: 5
type: 'single'
bgImage: 'bg_q5_gambling.jpg'
bgTheme: 'theme-prohibition'

text: "Mengapakah aktiviti seperti perjudian dan spekulasi tidak dibenarkan dalam kewangan Islam?"

options: [
  { id: 'a', text: "Kerana ia memberikan pulangan yang rendah" },
  { id: 'b', text: "Kerana ia melibatkan ketidaktentuan dan bergantung kepada nasib" },
  { id: 'c', text: "Kerana ia memerlukan modal yang besar" },
  { id: 'd', text: "Kerana ia sukar difahami" }
]

correctIds: ['b']

feedback: "Aktiviti seperti perjudian dan spekulasi dilarang kerana bergantung kepada nasib semata-mata dan tidak berasaskan aktiviti ekonomi sebenar. Ini boleh membawa ketidakadilan serta risiko yang tidak seimbang kepada pihak terlibat."
```

---

#### Question 6

```
id: 6
type: 'single'
bgImage: 'bg_q6_institution.jpg'
bgTheme: 'theme-institution'

text: "Apakah peranan sebenar institusi kewangan Islam dalam ekonomi?"

options: [
  { id: 'a', text: "Mengejar keuntungan semata-mata" },
  { id: 'b', text: "Menyokong ekonomi sebenar secara beretika" },
  { id: 'c', text: "Menggalakkan aktiviti spekulasi" },
  { id: 'd', text: "Tidak terlibat dalam pembangunan masyarakat" }
]

correctIds: ['b']

feedback: "Institusi kewangan Islam memainkan peranan membantu pertumbuhan ekonomi yang sihat — menyokong perniagaan, mencipta peluang pekerjaan, dan menyumbang kepada kesejahteraan masyarakat, dengan pendekatan yang beretika dan bertanggungjawab."
```

---

### Score Tier Thresholds and Messages (verbatim)

| Tier | Score Range | Emoji | Headline | Body |
|---|---|---|---|---|
| low | 1–2 / 6 | 😅 | "Oh-oh! Masih banyak ruang boleh dibaiki — jom, cuba lagi!" | "Masih banyak yang boleh diterokai tentang kewangan berasaskan nilai. Cuba lagi — setiap pilihan membawa anda lebih dekat kepada pemahaman yang lebih baik!" |
| mid | 3–4 / 6 | 🤔 | "Anda di landasan yang betul!" | "Anda sudah mula memahami konsep kewangan yang adil, tetapi masih ada ruang untuk diperkukuh. Teruskan bermain dan cabar diri untuk capai tahap seterusnya!" |
| high | 5–6 / 6 | 🌟 | "Tahniah! Anda bakal jadi 'Game Changer' dalam dunia kewangan masa depan!" | "Anda memahami prinsip kewangan Islam dan nilai keseimbangannya dengan baik." |

**Edge case — Score 0/6:** Assign to "low" tier (score 0 is displayed but uses the same tier messaging as 1–2).

---

### Feedback Panel Result Titles (contextual)

| Condition | Result Title Text | Colour |
|---|---|---|
| All correct (fully correct) | "Tepat Sekali!" | `--color-emerald` |
| Partial (multi-select, some correct) | "Hampir! Tapi ada yang terlepas." | `--color-amber-warn` |
| All wrong | "Bukan Jawapan Yang Tepat." | `--color-crimson` |
| Single-select, wrong answer | "Bukan Jawapan Yang Tepat." | `--color-crimson` |

---

## 7. Animation & VFX Specification

### Global Animation Principles
- All entrance: elements travel from Y+20–40px offset, opacity 0 → natural position, opacity 1
- Exits: fade out (opacity → 0) or slide out left (X −100px)
- Easing: `power2.out` for most entrances, `power2.in` for exits, `back.out(1.7)` for spring/bounce effects
- Respect `prefers-reduced-motion`: disable GSAP tweens, use instant state changes
- Cinematic principle: every screen change is a *moment* — never abrupt, never slow

### Screen Transitions

| Transition | Trigger | Duration | Easing | Description |
|---|---|---|---|---|
| Idle → Intro | Touch idle | 800ms | ease-out | Black fade in, then intro content builds |
| Intro → Q1 | Tap "Mulakan" | 600ms | ease-in-out | Cross-dissolve with brief black flash |
| Q(N) → Q(N+1) | Tap "Seterusnya" | 600ms | ease-in-out | Background cross-dissolves; answer cards slide out left as new ones slide in right |
| Q6 Feedback → Tally | Tap "Lihat Keputusan" | 500ms | ease-in | Feedback panel slides down, screen fades to black then tally fades in |
| Tally → Result | Auto after 4s | 600ms | ease-out | Tally screen fades out, result screen fades in with tier-specific entrance |
| Result → Intro | "Cuba Lagi" | 500ms | ease-in-out | Fade to black, Intro fades in |
| Result → Idle | "Tamat" / timeout | 800ms | ease-in | Slow fade to black then to idle |
| Any → Idle (timeout) | 60s | 1000ms | ease-in | Screen fades to black, idle fades in |

### Intro Screen Cinematic Sequence

| Element | Trigger | Duration | Delay | Easing | Description |
|---|---|---|---|---|---|
| Black overlay | Screen enter | 600ms | 0ms | ease-out | Fades out revealing background image |
| Geometric star | Overlay 50% gone | 800ms | 0ms | ease-out | Scale 0 → 1.0 at centre, rotate 0 → 45deg |
| Star glow | Star visible | 1000ms | 0ms | ease-in-out, yoyo | Gold radial glow pulses once |
| Title char-by-char | Star settled | 800ms | 0ms | stagger 0.05s | Each character appears from scale(0.5) opacity(0) |
| Sub-title | Title complete | 400ms | 0ms | ease-out | Fade up from Y+15px |
| Gold rule | Sub-title settled | 500ms | 0ms | ease-out | Width: 0 → 300px (draw from centre) |
| Body text | Rule drawn | 400ms | 0ms | ease-out | Fade up from Y+10px |
| CTA button | Body settled | 350ms | 0ms | back.out(1.7) | Scale 0 → 1.1 → 1.0 |
| SFX | At star appear | — | — | — | `sfx_question_enter.mp3` |

### Question Screen Entrance (per question)

| Element | Duration | Delay | Easing | Description |
|---|---|---|---|---|
| Background crossfade | 600ms | 0ms | ease-in-out | Previous bg fades, new bg fades in |
| Question counter | 300ms | 200ms | ease-out | Fade in from Y−10px |
| Progress dot (current) | 300ms | 300ms | ease-out | Scale up to active state |
| Question text words | stagger 0.04s/word | 400ms base | ease-out | Each word from Y+20px, opacity 0 → 1 |
| Multi-select label | 300ms | (after last word) | ease-out | Fade in, amber colour |
| Answer card 1 | 350ms | (after Q text) + 0ms | power2.out | Y+30px → 0, opacity 0→1 |
| Answer card 2 | 350ms | +100ms | power2.out | Y+30px → 0, opacity 0→1 |
| Answer card 3 | 350ms | +200ms | power2.out | Y+30px → 0, opacity 0→1 |
| Answer card 4 | 350ms | +300ms | power2.out | Y+30px → 0, opacity 0→1 |
| SFX | At cards start | — | — | — | `sfx_question_enter.mp3` (softly) |

### Answer Card Interaction Animations

| Interaction | Duration | Easing | Description |
|---|---|---|---|
| Hover (touch enter) | 150ms | ease-out | Border opacity increase, subtle gold shimmer sweep (CSS pseudo-element) |
| Select tap | 200ms | back.out(1.7) | Card scales 0.97 → 1.02 → 1.0; border turns full gold; checkmark scales in (scale 0→1, 150ms) |
| Deselect tap (multi-select) | 150ms | ease-out | Reverse: scale 1.0 → 0.98 → 1.0; border dims back; checkmark fades out |
| Submit button appear (first select) | 300ms | ease-out | Button translates Y+10px → 0, opacity 0 → 1 |

### Feedback Reveal Animation (Post-Submit)

| Element | Duration | Delay | Easing | Description |
|---|---|---|---|---|
| Submit button exit | 200ms | 0ms | ease-in | Scale down to 0, fade out |
| Card state apply (all) | Instant | 100ms | — | CSS class applied simultaneously |
| Correct card pulse | 300ms | 150ms | back.out(1.7) | Scale 1.0 → 1.04 → 1.0 |
| Wrong card shake | 400ms | 150ms | — | X: 0→+8→−8→+6→−6→+4→−4→0 (classic shake) |
| Missed correct pulse | 600ms × 3 | 150ms | ease-in-out | Border pulses amber 3 times |
| Sparkle burst (correct cards) | 800ms | 200ms | ease-out | 30 emerald particles explode from card centre, scatter outward, fade |
| Feedback panel slide up | 500ms | 300ms | cubic-bezier(0.22, 1, 0.36, 1) | TranslateY: 35vh → 0 |
| Panel result title | 350ms | 700ms | ease-out | Fade up from Y+10px |
| Panel body text | 400ms | 950ms | ease-out | Fade up, stagger 0.03s per word |
| "Seterusnya" button | 300ms | 1200ms | ease-out | Fade in |

### Score Tally Screen Animations

| Element | Duration | Delay | Easing | Description |
|---|---|---|---|---|
| Screen fade in | 500ms | 0ms | ease-out | From black |
| "Keputusan Anda" heading | 400ms | 300ms | ease-out | Fade up from Y+15px |
| Score display "0 / 6" | 300ms | 700ms | ease-out | Scale 0.8 → 1.0, opacity 0→1 |
| Score countup | 1500ms | 800ms | ease-out | GSAP tween on number object from 0 to final, SFX plays |
| Star 1 turns gold | 300ms | (after countup) + 0ms | back.out(1.7) | Scale 0.8→1.2→1.0, colour fill |
| Star 2 turns gold | 300ms | +250ms | back.out(1.7) | Same |
| Stars 3–6 | 300ms each | +250ms each | back.out(1.7) | Sequential per correct answer count |
| SFX per star | — | Per star | — | `sfx_correct_reveal.mp3` per gold star |
| Tier fade in (pre-transition) | 300ms | After last star | ease-in | Tier-coloured text briefly flashes before transition |

### Score Result Screen — Tier-Specific Animations

**Tier 1 (low) — gentle, encouraging**

| Element | Duration | Easing | Description |
|---|---|---|---|
| Screen enter | 600ms | ease-out | Fade in from black |
| Emoji (😅) | 500ms | back.out(2) | Scale 0 → 1.15 → 1.0 |
| Emoji bounce | 2000ms | ease-in-out, yoyo, 3× | Subtle bounce Y ±8px |
| Headline | 400ms | ease-out | Fade up from Y+15px |
| Body | 350ms | ease-out | Fade up, delayed 200ms |
| Amber glow pulse | 1500ms, 2× | ease-in-out | Radial gradient amber vignette pulses |

**Tier 2 (mid) — warm, motivating**

| Element | Duration | Easing | Description |
|---|---|---|---|
| Screen enter | 600ms | ease-out | Fade in |
| Emoji (🤔) | 500ms | back.out(2) | Scale 0 → 1.2 → 1.0 |
| Headline | 400ms | ease-out | Fade up |
| Gold shimmer sweep | 800ms | ease-in-out | Pseudo-element gradient sweeps L→R across headline |
| 6 small stars orbit | 1500ms | ease-in-out | CSS animation: 6 tiny star SVGs orbit around score number once |
| Body | 350ms | ease-out | Fade up |

**Tier 3 (high) — celebratory, dramatic**

| Element | Duration | Easing | Description |
|---|---|---|---|
| Screen enter | 400ms | ease-out | Fast reveal — building excitement |
| Flash | 150ms | ease-out | Brief white flash at enter (cinematic) |
| Confetti burst | 2000ms | ease-out | Canvas: 100 particles from top-centre, mix gold + emerald, scatter and fade |
| Emoji (🌟) | 600ms | back.out(3) | Scale 0 → 1.3 → 1.0, dramatic entrance |
| Emoji continuous | infinite | ease-in-out | Slow rotation + subtle scale pulse |
| Headline | 500ms | ease-out | Fade up with slight scale (0.95 → 1.0) |
| Gold shimmer (2×) | 1000ms | ease-in-out | Two shimmer sweeps across headline |
| Corner sparkle bursts | 800ms, stagger 300ms | ease-out | 4 corner sparkle Canvas bursts |
| Body | 400ms | ease-out | Fade up |
| SFX | At screen enter | — | — | `sfx_score_tier_3.mp3` (triumphant sting) |

### Particle Engine Specification (`particleEngine.js`)

```javascript
// Sparkle burst (on correct card reveal)
SparkleConfig = {
  count: 30,
  originX: cardCentreX,
  originY: cardCentreY,
  colours: ['#34D399', '#10B981', '#D4AF37', '#F0D060'],
  velocityRange: { min: 80, max: 220 },  // px/s
  angleRange: { min: 0, max: 360 },       // degrees
  sizeRange: { min: 4, max: 10 },         // px
  lifespan: 800,                           // ms
  gravity: 60,                             // px/s^2 downward
  fadeOut: true
};

// Confetti burst (tier 3 score screen)
ConfettiConfig = {
  count: 100,
  originX: canvasWidth / 2,
  originY: -10,
  colours: ['#D4AF37', '#F0D060', '#10B981', '#34D399', '#FFFFFF'],
  velocityRange: { min: 200, max: 600 },
  angleRange: { min: 60, max: 120 },      // Downward spread
  sizeRange: { min: 6, max: 16 },
  lifespan: 2000,
  gravity: 200,
  spin: true,                              // Particles rotate as they fall
  fadeOut: true
};

// Idle gold particles (continuous)
IdleParticleConfig = {
  count: 20,
  colour: '#8B7220',
  velocityY: { min: -20, max: -60 },      // Upward drift
  velocityX: { min: -15, max: 15 },
  sizeRange: { min: 2, max: 5 },
  lifespan: 4000,
  spawnRate: 500,                          // ms between spawns
  opacity: 0.6,
  fadeIn: true,
  fadeOut: true
};
```

---

## 8. Audio Specification

### Background Music (BGM)

Three BGM tracks used across the quiz, crossfading as tension builds:

| Track | File | Screen Usage | Genre | BPM | Mood | Duration |
|---|---|---|---|---|---|---|
| Intro BGM | `bgm_cinematic_intro.mp3` | Idle + Intro screens | Orchestral ambient, sparse | 60 BPM | Contemplative, mysterious, inviting — like a cultural documentary opening | 90s loop |
| Quiz BGM | `bgm_quiz_tension.mp3` | Q1–Q6 question + feedback screens | Cinematic tension — light strings, subtle percussion | 88 BPM | Growing focus, mild tension, intellectually stimulating | 120s loop |
| Results BGM | `bgm_results_triumph.mp3` | Score tally + result screen | Orchestral swell | 80 BPM | Triumphant for high tier, warm/resolved for mid, gentle/encouraging for low | 60s loop |

Crossfade duration between tracks: 1500ms.
Volume levels: BGM at 30% of master, fades to 15% during feedback text reads.

**BGM Suggested References (royalty-free):**
- Intro: Tags "Islamic architecture ambient", "Middle East documentary underscore" — Pixabay Audio, Freesound
- Quiz: Tags "quiz show tension", "cinematic thinking music" — Pixabay Audio, Bensound
- Results: Tags "triumphant sting orchestral", "achievement fanfare short" — Freesound

### Sound Effects (SFX) — Full List

| SFX Name | Filename | Trigger | Description | Duration |
|---|---|---|---|---|
| Question enter | `sfx_question_enter.mp3` | Every new question screen | Cinematic whoosh + low resonant tone | 600ms |
| Answer select | `sfx_answer_select.mp3` | Card tap → selected | Satisfying mechanical click with brief warm tone | 120ms |
| Answer deselect | `sfx_answer_deselect.mp3` | Card tap → deselected (multi-select) | Softer reverse-click | 100ms |
| Submit tap | `sfx_submit_answer.mp3` | "Sahkan Jawapan" button tap | Decisive click with brief cinematic sting | 250ms |
| Correct reveal | `sfx_correct_reveal.mp3` | Correct card highlights green | Bright ascending chime — positive, rewarding | 400ms |
| Wrong reveal | `sfx_incorrect_reveal.mp3` | Wrong card highlights red | Low descending tone — clear but not harsh | 300ms |
| Partial correct | `sfx_partial_correct.mp3` | Partially correct result (multi-select) | Mixed tone — mid-range, neither triumphant nor discouraging | 350ms |
| Feedback appear | `sfx_feedback_appear.mp3` | Feedback panel slides up | Paper unfurl / page turn sound | 300ms |
| Score countup | `sfx_score_countup.mp3` | Score number ticks up on tally screen | Rapid ticking, rising pitch, stops at final score | 1500ms |
| Score tier 1 | `sfx_score_tier_1.mp3` | Tier 1 result screen enter | Gentle encouraging tone | 800ms |
| Score tier 2 | `sfx_score_tier_2.mp3` | Tier 2 result screen enter | Warm positive resolution chord | 800ms |
| Score tier 3 | `sfx_score_tier_3.mp3` | Tier 3 result screen enter | Triumphant fanfare sting (3–5 seconds) | 3000ms |
| Sparkle burst | `sfx_sparkle.mp3` | Canvas sparkle burst on correct card | Sparkling shimmer effect | 600ms |
| Button generic | `sfx_button_click.mp3` | "Seterusnya", "Cuba Lagi", "Tamat" | Clean soft click | 80ms |
| Return to idle | `sfx_return_idle.mp3` | Idle timeout or "Tamat" → fade to idle | Wind-down ambient fade | 800ms |

### Implementation Approach
- `audioManager.js` pattern identical to Project 3: `playBGM(track)`, `crossfadeBGM(newTrack)`, `playSFX(name)`, `setMute(bool)`
- All SFX pre-loaded as `AudioBuffer` via Web Audio API at app init
- BGM crossfade: simultaneously fade out current track (1.5s linear) and fade in new track (1.5s linear), both via `GainNode` automation
- `crossfadeBGM()` accepts track name, handles internal state to avoid double-crossfade collisions
- Score tier SFX overlaid on top of BGM (BGM duck to 10% for 3s during tier 3 fanfare, then return)
- Mute toggle: top-right fixed button; mutes all audio; state persisted in `sessionStorage`
- Graceful autoplay degradation: UI fully functional without audio

---

## 9. Development Milestones

### Milestone 1 — Foundation & Static Cinematic Screens (Week 1)
**Deliverables:**
- Project scaffolding: file structure, HTML base, CSS variable system with full dark-cinematic theme
- All screen HTML/CSS layouts rendered statically (no logic): idle, intro, question template, feedback template, tally, result ×3
- Typography scale implemented (Cinzel Decorative + Tajawal)
- Full colour system and component library (answer cards in all states, feedback panel, score display)
- Background images sourced, optimised, placed
- Islamic geometric pattern SVGs created/sourced
- Idle attract screen with CSS animations and CSS particle drift
- **Review gate:** Visual design sign-off with PIC Amru — dark/gold aesthetic, background images, layout confirmed

### Milestone 2 — Quiz Logic & Multi-Select Engine (Week 2)
**Deliverables:**
- `quizData.js`: all 6 questions, options, correctIds, feedback text loaded
- `quizEngine.js`: question progression, state tracking, `QuestionResult` computation
- `multiSelectLogic.js`: multi-select handling — `toggleSelection(questionId, optionId)`, `getSelections(questionId)`, `evaluateAnswer(questionId)`, `isFullyCorrect()`, `isPartiallyCorrect()` — fully unit-testable in isolation
- `stateManager.js`: `AppState`, `transition()` function
- Score tally calculation: `totalScore`, `scoreTier` determination
- All 6 question screens render correctly with accurate correct/wrong/missed state logic
- **Review gate:** All 6 questions tested with all possible selection combinations. Q2 multi-select logic verified.

### Milestone 3 — GSAP Animations & Cinematic Sequences (Week 2–3)
**Deliverables:**
- Intro cinematic sequence: full GSAP timeline
- Question entrance animations: background crossfade, text stagger, card stagger
- Answer card interaction animations: select/deselect tap feedback
- Feedback reveal sequence: card state apply, shake, sparkle burst, panel slide
- Score tally: countup, sequential star fills
- Score result: tier-specific animations (tier 1 bounce, tier 2 shimmer, tier 3 confetti)
- `particleEngine.js`: sparkle burst + confetti burst + idle particles
- `idleManager.js`: 60s timeout, idle return
- **Review gate:** Full dramatic run-through Q1–Q6 → all tiers, timing review with PIC Amru

### Milestone 4 — Audio Integration & Polish (Week 3)
**Deliverables:**
- `audioManager.js`: BGM crossfade system + all SFX pre-load
- All SFX triggers mapped to animation events
- BGM duck on tier 3 fanfare
- Mute toggle with `sessionStorage` persistence
- All micro-interactions polished: hover states, button feedback, progress dots
- `prefers-reduced-motion` implementation
- Background parallax (subtle mouse/touch position offset on background layer)
- Cross-browser test: Chrome kiosk, Edge
- **Review gate:** Audio mix approval, full user journey with correct/incorrect answer scenarios

### Milestone 5 — QA, Kiosk Hardening & Content Finalisation (Week 4)
**Deliverables:**
- Q2 option D correct/incorrect status confirmed by client — `quizData.js` updated
- Q2 "risk transfer" copy simplified per client note
- All BM text content final review and proofreading
- Touch targets verified at physical kiosk display (minimum 60px enforced)
- Performance profiling: 60fps target across all animations, Canvas particle engine profiled
- Memory leak audit: GSAP kill on screen transitions, Canvas context cleared, timer cleanup
- Kiosk hardening: context menu disabled, text selection disabled, scroll bounce disabled
- Asset optimisation: images WebP where supported, MP3 128kbps, SVG minified
- Final delivery package: zipped with deployment README
- **Review gate:** Sign-off from PIC Amru + museum technical team + client content approval

---

## 10. Claude Code Implementation Notes

### Key Implementation Challenges

**1. Multi-Select Answer Logic (`multiSelectLogic.js`)**

The core of multi-select evaluation. The logic must clearly distinguish three card states after submission:

```javascript
function evaluateSelections(userSelections, correctIds) {
  const selected = new Set(userSelections);
  const correct  = new Set(correctIds);

  const truePositives  = [...selected].filter(id => correct.has(id));  // selected AND correct
  const falsePositives = [...selected].filter(id => !correct.has(id)); // selected but WRONG
  const falseNegatives = [...correct].filter(id => !selected.has(id)); // correct but NOT selected

  return {
    cardStates: buildCardStates(truePositives, falsePositives, falseNegatives),
    isFullyCorrect: falsePositives.length === 0 && falseNegatives.length === 0,
    isPartiallyCorrect: truePositives.length > 0 && (falsePositives.length > 0 || falseNegatives.length > 0),
    score: (falsePositives.length === 0 && falseNegatives.length === 0) ? 1 : 0
  };
}

// Card state definitions:
// truePositive  → CSS class 'state-correct'   (green border, checkmark)
// falsePositive → CSS class 'state-wrong'     (red border, X icon, shake anim)
// falseNegative → CSS class 'state-missed'    (amber border, pulse anim, correct answer indicator)
// neutral       → CSS class 'state-neutral'   (no change — unselected, not correct)
```

**Scoring rule:** A question scores 1 only if `isFullyCorrect === true`. Partial credit is not awarded to the score total — partial is a feedback state only, not a score state. This keeps the 0–6 scale clean.

**Q2 easy-edit design:** The `quizData.js` entry for Q2 has `correctIds: ['c', 'd']`. Removing `'d'` from this array is the only change needed to update the correct answer — the evaluation function reads `correctIds` dynamically. No other code changes required.

**2. GSAP Kill on Screen Transitions**

Orphaned GSAP tweens are the most likely source of animation glitches between users on a kiosk. Every screen transition must:

```javascript
function transitionToScreen(newScreenId) {
  gsap.killTweensOf('*');         // Kill all active tweens
  gsap.globalTimeline.clear();    // Clear global timeline
  particleEngine.clearAll();      // Stop and remove all active particles
  // Then: render new screen, then start new screen entrance timeline
}
```

Store all screen-specific GSAP timelines in a `currentTimeline` variable and call `.kill()` on it before transitioning.

**3. Background Image Crossfade**

The background layer must crossfade smoothly between questions without flashing. Use two `<div>` layers stacked with `z-index` and absolute positioning:

```html
<div id="bg-layer-a" class="bg-layer"></div>
<div id="bg-layer-b" class="bg-layer"></div>
```

Alternate which layer is "active" and "next" on each question. Fade `next` from opacity 0 → 1, then swap their z-index, then reset `active` (now back-layer) to opacity 0 for next use. This prevents flash-to-white or flash-to-black between backgrounds.

**4. Text Character-by-Character Animation Without SplitText Plugin**

GSAP SplitText requires Club GreenSock. For the intro title character animation, implement a lightweight manual alternative:

```javascript
function splitTextToSpans(element) {
  const text = element.textContent;
  element.innerHTML = text
    .split('')
    .map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');
  return element.querySelectorAll('.char');
}

// Then animate:
const chars = splitTextToSpans(titleEl);
gsap.from(chars, {
  opacity: 0, scale: 0.5, duration: 0.3,
  stagger: 0.05, ease: 'back.out(1.7)'
});
```

For question text (word-by-word stagger), split on spaces instead of characters — more readable on large kiosk screens.

**5. Canvas Particle Engine — Performance**

Run all Canvas animations on a single full-screen `<canvas>` element positioned as fixed overlay (pointer-events: none). Use a single `requestAnimationFrame` loop in `particleEngine.js`. Multiple separate Canvas elements add compositor overhead.

```javascript
// Single RAF loop pattern
function particleLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  activeEmitters.forEach(emitter => emitter.update(timestamp));
  activeEmitters.forEach(emitter => emitter.draw(ctx));
  // Remove dead emitters
  activeEmitters = activeEmitters.filter(e => !e.isDead);
  if (activeEmitters.length > 0 || isIdleParticlesActive) {
    requestAnimationFrame(particleLoop);
  } else {
    isLoopRunning = false;
  }
}
```

Restart the loop only when a new emitter is added. Do not run an empty RAF loop.

**6. Kiosk-Specific Hardening (same as Project 3)**
- `document.addEventListener('contextmenu', e => e.preventDefault())`
- `user-select: none` on all UI elements
- `overscroll-behavior: none` on `body`
- `touch-action: manipulation` on interactive elements (prevents 300ms tap delay)
- Exit button requires 3-second hold to prevent accidental session restart

**7. Question Type Handling in Render Function**

The question render function must inspect `question.type` and apply different behaviours:

```javascript
function renderQuestion(question) {
  const isMulti = question.type === 'multi';
  // Show multi-select label only if isMulti
  multiSelectLabel.style.display = isMulti ? 'block' : 'none';
  // Answer cards: tap toggles selection if isMulti; deselects others if 'single'
  answerCards.forEach(card => {
    card.onclick = () => isMulti
      ? handleMultiSelect(card)
      : handleSingleSelect(card);
  });
}
```

This keeps the rendering logic clean and allows `quizData.js` type field changes to propagate without UI code changes.

### Performance Notes
- Target: **60fps** throughout. Most demanding moments: feedback card reveal (GSAP + Canvas simultaneously) and tier 3 confetti (100 Canvas particles).
- Profile in Chrome DevTools: check for layout thrashing during GSAP animations. Use `transform` and `opacity` only — never animate `width`, `height`, `top`, `left` with GSAP on kiosk.
- Background images: compress to WebP at 85% quality, 1920×1080 resolution. Target < 300KB per image.
- Pre-load all 6 background images at app start: inject `<link rel="preload">` for each in `<head>`, then also explicitly `new Image().src = url` in `init()` to ensure they are in browser cache before Q1 renders.
- Total estimated asset budget: images ~2MB, audio ~5MB, JS ~400KB (GSAP + app). Total < 8MB. Well within kiosk storage.
- Test on representative kiosk hardware (typically i5/i7 with integrated GPU). Do not test only on developer workstation.

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
<h1 data-i18n="intro_title">Kewangan Islam: Pilihan Bijak</h1>
<p data-i18n="intro_subtitle">Uji pengetahuan anda tentang kewangan Islam...</p>
<button data-i18n="btn_start">Mula</button>

<!-- Dynamic / programmatic text (in JS) -->
questionEl.textContent = t('q1_question');
feedbackEl.innerHTML = t('q1_feedback');
```

### String Key Conventions for This Project

Keys for Project 4 (Islamic Finance Quiz):

- `intro_title`, `intro_subtitle`, `intro_cta`
- `q1_question`, `q1_opt_a`, `q1_opt_b`, `q1_opt_c`, `q1_opt_d`, `q1_feedback`
- `q2_question`, `q2_opt_a`, `q2_opt_b`, `q2_opt_c`, `q2_opt_d`, `q2_feedback`
- `q3_question`, `q3_opt_a`, `q3_opt_b`, `q3_opt_c`, `q3_opt_d`, `q3_feedback`
- `q4_question`, `q4_opt_a`, `q4_opt_b`, `q4_opt_c`, `q4_opt_d`, `q4_feedback`
- `q5_question`, `q5_opt_a`, `q5_opt_b`, `q5_opt_c`, `q5_opt_d`, `q5_feedback`
- `q6_question`, `q6_opt_a`, `q6_opt_b`, `q6_opt_c`, `q6_opt_d`, `q6_feedback`
- `score_low_title`, `score_low_subtitle`, `score_low_body`
- `score_mid_title`, `score_mid_subtitle`, `score_mid_body`
- `score_high_title`, `score_high_subtitle`, `score_high_body`
- `btn_start`, `btn_next`, `btn_retry`, `progress_label`

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

**PROJECT 4 (Islamic Finance Quiz):** Replace dark cinematic with warm illustrated style. Background: warm cream with subtle geometric Islamic pattern overlay (stars and octagons at 5% opacity using primary blue). Question cards: white rounded cards with illustrated scenes per question (e.g., Q1 shows illustrated globe+tree for environment concept). Gold (`#F5A623`) used for Islamic finance highlights. Remove the dark/moody aesthetic entirely. Keep the sense of journey/progression but with warm, bright visuals.
