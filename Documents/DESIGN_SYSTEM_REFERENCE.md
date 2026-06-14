# IMD 2026 — Global Design System & Bilingual Implementation Reference

**Festival Hari Museum Antarabangsa 2026**
**Bank Negara Malaysia Museum & Art Gallery (MAG)**
**Document Type:** Master Design System Reference — All 6 Projects
**Last Updated:** June 2026

---

## Table of Contents

1. [Design Philosophy & Art Direction](#1-design-philosophy--art-direction)
2. [Visual Identity](#2-visual-identity)
   - [Colour System](#colour-system)
   - [Typography](#typography)
   - [Illustration Style Guide](#illustration-style-guide)
   - [Shape & Spacing Language](#shape--spacing-language)
3. [Component Library](#3-component-library)
4. [Animation System](#4-animation-system)
5. [Bilingual (BM/English) Implementation](#5-bilingual-bmenglish-implementation)
6. [Audio System](#6-audio-system)
7. [Kiosk & Accessibility](#7-kiosk--accessibility)
8. [File Structure Template](#8-file-structure-template)
9. [English Content Translation Reference](#9-english-content-translation-reference)

---

## 1. Design Philosophy & Art Direction

### Reference: BNM MAG Personality Quiz

The primary art direction reference for all 6 IMD 2026 projects is the BNM Museum's own interactive, "Ramalan Personaliti Kewangan" (Financial Personality Quiz), accessible at:

> https://museum.bnm.gov.my/v2/MAGpersonalityQuiz/MAGpersonalityquiz.html

**Key observations from this reference:**

- Built on the Genially education platform with illustration-heavy, animated card flows
- Rich flat-design illustrated characters representing diverse Malaysian archetypes
- Warm, inviting colour palette — this is a museum experience for families and students, not a gaming or night-club aesthetic
- Card-based question layouts with large illustrated visuals occupying prominent space per card
- Animated background with floating financial and thematic elements (coins, stars, charts)
- Rounded UI throughout — pill shapes, rounded-rectangle cards, soft drop shadows
- Large, touch-friendly CTA buttons with gradient fills appropriate for kiosk use
- Clean, minimal progress bar that does not clutter the content area
- Personality/result screens with illustrated character reveals
- Bilingual BM/EN language toggle always visible and accessible
- Smooth slide and fade transitions between questions
- Celebratory animations on results (confetti, sparkle effects)
- Suitable for visitors aged 8 and above — families, school groups, adult learners

### Target Audience

Museum visitors at Festival Hari Museum Antarabangsa 2026, Bank Negara Malaysia Museum & Art Gallery. This spans:

- **Families with children** (ages 8+) — must be engaging without being too complex
- **School groups** (ages 10–18) — educational framing, quiz mechanics work well
- **Working adults** (ages 20–55) — financial literacy focus, relatable scenarios
- **Senior visitors** (ages 55+) — large text, clear navigation, no time pressure
- **International visitors** — bilingual BM/EN is essential
- **Low to moderate digital literacy** — the interface must be entirely self-explanatory; no staff guidance assumed

**Unified design goal:** Every visitor who approaches a kiosk must be able to begin the experience within 5 seconds without reading any instruction text.

### Tone & Voice

| Quality | Description |
|---|---|
| Warm | Approachable, never clinical or corporate |
| Educational | Informative but never patronising |
| Celebratory | Rewards participation and correct answers with genuine delight |
| Approachable | No dark themes, urgency, or gaming aggression |
| Malaysian | Culturally specific characters, local contexts, familiar references |
| Bilingual | BM is primary; English always available via toggle |

### Malaysian Cultural Flavour

- Characters in illustrations represent the full diversity of Malaysian society: Malay, Chinese, Indian, Orang Asal, and mixed heritage
- Financial scenarios reference Malaysian contexts: ringgit, local merchants, e-wallets like Touch 'n Go and Boost, Bank Negara Malaysia as authority
- Cultural touchstones: Jalur Gemilang, batik patterns, traditional architecture, local foodscapes as illustration backgrounds
- Language register: warm, conversational Bahasa Malaysia — not overly formal or bureaucratic
- Avoid: Western-centric imagery, stereotypes, anything that excludes any community

---

## 2. Visual Identity

### Colour System

This is the master palette for the IMD 2026 exhibition. Individual projects may introduce supplementary accent colours (see per-project design docs), but all must respect the core palette and semantic tokens below.

#### Primary Palette

| Name | Hex | Usage |
|---|---|---|
| Primary Blue | `#0047AB` | BNM deep blue — primary actions, active states, branding |
| Primary Gold | `#F5A623` | Malaysian gold/warmth — progress fills, scores, highlights |
| Accent Teal | `#00B4A6` | Secondary accent — info states, success variants |
| Accent Coral | `#FF6B5B` | Tertiary accent — warmth, energy, attention |
| Accent Purple | `#7B5EA7` | Supplementary — badges, special states |
| Accent Green | `#4CAF50` | Positive states, correct answers (light theme) |

#### Neutral Palette

| Name | Hex | Usage |
|---|---|---|
| Background Warm White | `#FFF8F0` | Page background — warm off-white, not clinical |
| Card White | `#FFFFFF` | Card surfaces, modal backgrounds |
| Dark Text | `#1A1A2E` | Primary text on light backgrounds |
| Medium Text | `#4A4A6A` | Secondary text, labels |
| Light Text | `#8A8AAA` | Captions, placeholders, tertiary info |
| Neutral Gray | `#E8E8F0` | Borders, dividers, inactive states |

#### Semantic/State Colours

| Name | Hex | Usage |
|---|---|---|
| Success Green | `#27AE60` | Correct answers, positive feedback |
| Warning Amber | `#F39C12` | Caution states, partial correct, mid-tier results |
| Error Red | `#E74C3C` | Wrong answers, error states, danger alerts |

#### CSS Custom Properties (Semantic Tokens)

Every project should declare these tokens in its `variables.css` or `:root` block. Projects may override the hex values to match their specific theme while keeping the token names consistent.

```css
:root {
  /* Brand */
  --color-primary: #0047AB;
  --color-primary-light: #1A6AC9;
  --color-primary-dark: #00337A;
  --color-gold: #F5A623;
  --color-gold-light: #FFCB6B;

  /* Accents */
  --color-accent-teal: #00B4A6;
  --color-accent-coral: #FF6B5B;
  --color-accent-purple: #7B5EA7;
  --color-accent-green: #4CAF50;

  /* Backgrounds */
  --color-background: #FFF8F0;
  --color-card: #FFFFFF;
  --color-overlay: rgba(0, 0, 0, 0.5);

  /* Text */
  --color-text-primary: #1A1A2E;
  --color-text-secondary: #4A4A6A;
  --color-text-light: #8A8AAA;

  /* States */
  --color-success: #27AE60;
  --color-success-bg: rgba(39, 174, 96, 0.10);
  --color-warning: #F39C12;
  --color-warning-bg: rgba(243, 156, 18, 0.10);
  --color-error: #E74C3C;
  --color-error-bg: rgba(231, 76, 60, 0.10);

  /* Borders */
  --color-border: #E8E8F0;
  --color-border-focus: #0047AB;
}
```

#### Note on Per-Project Colour Overrides

Some projects in this exhibition use a darker, more thematic palette for contextual reasons:

- **Project 01** (Car Scam Game): Deep navy/dark road theme (`#0A0E1A` base) — appropriate for a night-driving game metaphor conveying urgency about scams
- **Project 02** (Cross-Border QR): Deep space blue (`#030B1A` base) — digital tech / borderless connectivity metaphor
- **Project 04** (Islamic Finance Quiz): Dark cinematic with gold (`#0A0E1A` + `#D4AF37`) — inspired by Islamic architecture, gravitas appropriate for values-based content
- **Project 06** (Collective Savings): Dark space (`#080B14` base) — network/constellation metaphor

These darker themes are deliberate artistic choices that fit their content. The warm palette above remains the default for Projects 03 and 05, and for any shared UI chrome (loading screens, language toggle, attract screens).

---

### Typography

#### Font Selection

All projects use Google Fonts for consistency, legibility at kiosk distances, and Malay language diacritic support.

**Display / Title Font: Poppins**

Used for: headlines, CTA buttons, question text, prominent labels
- Weights: Bold 700, ExtraBold 800
- Malay diacritics: fully supported
- Character: friendly, modern, confident — not aggressive or decorative

**Body / UI Font: Nunito**

Used for: body text, instructions, answer options, smaller labels
- Weights: Regular 400, SemiBold 600, Bold 700
- Malay diacritics: fully supported
- Character: rounded, approachable, highly legible at small sizes on screens

**Google Fonts Import (include in every project's `<head>`):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
```

**For offline kiosk deployment**, bundle WOFF2 files in `/assets/fonts/` and use `@font-face` declarations. This prevents font loading failures in air-gapped kiosk environments.

```css
@font-face {
  font-family: 'Poppins';
  src: url('../assets/fonts/Poppins-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
/* Repeat for each weight */
```

#### Type Scale

| Level | Size (Screen) | Size (Kiosk 1080p+) | Weight | Font | Line Height |
|---|---|---|---|---|---|
| h1 | 48px | 60px | 800 | Poppins | 1.2 |
| h2 | 36px | 45px | 700 | Poppins | 1.2 |
| h3 | 28px | 35px | 700 | Poppins | 1.3 |
| h4 | 22px | 28px | 600 | Poppins | 1.3 |
| body | 18px | 22px | 400 | Nunito | 1.5 |
| small | 14px | 18px | 400 | Nunito | 1.5 |
| caption | 12px | 15px | 400 | Nunito | 1.4 |

**Kiosk scaling rule:** For displays at 1920×1080 or larger, multiply all sizes by `1.25`. Apply this via a CSS class on the root container:

```css
/* In variables.css — kiosk scale multiplier */
@media (min-width: 1440px) {
  :root {
    --scale: 1.25;
    font-size: calc(16px * var(--scale));
  }
}
```

**Minimum legible size for kiosk:** 18px equivalent at arm's length (~80cm from screen). Never go below this for any visible text content.

---

### Illustration Style Guide

#### Core Style Principles

- **Flat vector illustration** — no photorealism, no 3D rendering
- **Solid fills with subtle gradient overlay** — gives depth without breaking the flat aesthetic
- **Clean outlines** — 2–3px consistent stroke weight; no overly detailed linework
- **Character expressions** — warm, approachable facial expressions; avoid neutral or stern looks
- **Optimistic framing** — even when depicting problems (scams, healthcare gaps), the resolution framing should be positive and empowering

#### Character Diversity Requirements

All character sets across the 6 projects must collectively represent:

| Archetype | Visual Representation |
|---|---|
| Malay adult | Hijab-wearing women, baju melayu men |
| Chinese Malaysian | Both genders, various ages |
| Indian Malaysian | Both genders, various ages |
| Orang Asal | Where contextually appropriate |
| Mixed/ambiguous | Characters not explicitly coded to one ethnicity |
| Age range | Children (8+), young adults (20s), working adults (30–50), elderly (60+) |
| Family unit | Parents with children; multi-generational groupings |

#### Recommended Free Asset Sources

| Source | URL | Best For |
|---|---|---|
| unDraw.co | https://undraw.co | Filter by hex colour to match palette; finance & education themed scenes |
| Humaaans.com | https://www.humaaans.com | Mix-and-match body parts; customisable skin tones and hair |
| OpenPeeps.com | https://www.openpeeps.com | Hand-drawn character library; diverse poses |
| Freepik | https://www.freepik.com | Search "flat Malaysian characters", "Malaysian people illustration" |
| Storyset by Freepik | https://storyset.com | Animated-ready scene illustrations |
| Phosphor Icons | https://phosphoricons.com | Open source icon set; consistent weight |
| Heroicons | https://heroicons.com | MIT licensed; works well with Tailwind/CSS |

#### Background Element Library

Floating background elements should evoke financial themes without being overwhelming. Use sparingly — 4 to 8 elements per screen maximum.

**Recommended elements:**
- Coins (RM coins, gold colour — `#F5A623`)
- Piggy banks (warm pink or gold)
- Bar/line chart fragments
- Stars and sparkles (celebration use)
- Shield icons (safety/protection)
- Leaf/growth icons (investment growth)
- Simple buildings/cityscape silhouettes (economic context)

**Do not use:**
- Banknotes with visible serial numbers or copying of real currency
- Logos of specific financial institutions (except BNM/MAG logos where explicitly approved)
- Images of actual people (use illustrations only)
- Stock photography

---

### Shape & Spacing Language

#### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 8px | Small elements: badges, tags, small buttons |
| `--radius-md` | 16px | Cards, inputs, option buttons |
| `--radius-lg` | 24px | Large cards, modals, panels |
| `--radius-pill` | 9999px | Language toggle, pill badges, CTA buttons |

#### Shadow Tokens

```css
:root {
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0 8px 32px rgba(0, 71, 171, 0.12);
  --shadow-card-active: 0 8px 32px rgba(0, 71, 171, 0.20);
  --shadow-modal: 0 16px 64px rgba(0, 0, 0, 0.24);
  --shadow-button: 0 4px 16px rgba(0, 71, 171, 0.30);
}
```

#### Spacing Scale

Base unit is 4px. All spacing values are multiples of this base.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Micro: icon gap, inline spacing |
| `--space-2` | 8px | Tight: label-to-content |
| `--space-3` | 12px | Small: between stacked items |
| `--space-4` | 16px | Default: card padding, button padding |
| `--space-6` | 24px | Medium: section gap |
| `--space-8` | 32px | Large: component spacing |
| `--space-12` | 48px | Extra-large: section breaks |
| `--space-16` | 64px | Screen sections |
| `--space-24` | 96px | Major layout gaps |

#### Touch Target Requirements

These are non-negotiable for kiosk deployment:

| Element Type | Minimum Size |
|---|---|
| Any interactive element | 60 × 60px |
| CTA / primary button | 64px height, 200px min-width |
| Answer option button | 72px height, full-width of container |
| Icon buttons (mute, close, etc.) | 52px circle with 80px hit area |
| Language toggle button | 100px width, 48px height |

---

## 3. Component Library

### Language Toggle

The language toggle is the most critical shared component. It must appear in every project and remain accessible at all times.

**Behaviour:**
- Persistent — always visible, always interactive, regardless of what screen is active
- Default language: BM (Bahasa Malaysia)
- State is persisted in `localStorage` under the key `'lang'` — if visitor switches to EN and taps away, EN persists if they return within the same session
- Position: top-right corner, `position: fixed`, `z-index: 9999`

**HTML:**

```html
<div class="lang-toggle" role="group" aria-label="Language selector / Pilih bahasa">
  <button class="lang-btn active" data-lang="bm" onclick="setLang('bm')" aria-pressed="true">BM</button>
  <button class="lang-btn" data-lang="en" onclick="setLang('en')" aria-pressed="false">EN</button>
</div>
```

**CSS:**

```css
.lang-toggle {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  display: flex;
  background: white;
  border-radius: 9999px;
  padding: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  gap: 4px;
}

.lang-btn {
  padding: 8px 20px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: var(--color-primary, #0047AB);
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 200ms ease;
  min-width: 60px;
  min-height: 40px;
}

.lang-btn.active {
  background: var(--color-primary, #0047AB);
  color: white;
}

.lang-btn:hover:not(.active) {
  background: rgba(0, 71, 171, 0.08);
}
```

---

### Progress Bar

**Usage:** Visible during any multi-step experience (quiz, simulation, game). Communicates progress without adding cognitive load.

```html
<div class="progress-bar-container" role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="5">
  <div class="progress-bar-fill" style="width: 40%"></div>
  <span class="progress-label">Soalan 2 daripada 5</span>
</div>
```

```css
.progress-bar-container {
  width: 100%;
  height: 8px;
  background: var(--color-border, #E8E8F0);
  border-radius: 9999px;
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary, #0047AB) 0%, var(--color-gold, #F5A623) 100%);
  border-radius: 9999px;
  transition: width 300ms ease;
}

.progress-label {
  position: absolute;
  right: 0;
  top: 16px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  color: var(--color-text-secondary, #4A4A6A);
}
```

---

### Question Card

**Usage:** Core interactive unit for quiz and checkpoint scenarios across Projects 01, 02, 04, and 06.

```html
<div class="question-card">
  <div class="question-card__illustration">
    <!-- Illustration image or SVG -->
    <img src="assets/images/characters/scenario-cp1.svg" alt="">
  </div>
  <div class="question-card__content">
    <p class="question-card__question" data-i18n="cp1_question">Apakah yang patut anda lakukan?</p>
    <div class="question-card__options">
      <button class="option-btn" data-option="A">
        <span class="option-btn__key">A</span>
        <span class="option-btn__text" data-i18n="cp1_option_a">Klik link segera</span>
      </button>
      <!-- Repeat for B, C -->
    </div>
  </div>
</div>
```

```css
.question-card {
  background: var(--color-card, #FFFFFF);
  border-radius: var(--radius-lg, 24px);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
}

.question-card__illustration {
  width: 100%;
  height: 40%;
  background: var(--color-background, #FFF8F0);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.question-card__content {
  padding: var(--space-8, 32px);
}

.question-card__question {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: var(--color-text-primary, #1A1A2E);
  margin-bottom: var(--space-6, 24px);
  line-height: 1.3;
}

/* Option button states */
.option-btn {
  display: flex;
  align-items: center;
  gap: var(--space-4, 16px);
  width: 100%;
  min-height: 64px;
  padding: var(--space-4, 16px) var(--space-6, 24px);
  background: var(--color-card, #FFFFFF);
  border: 2px solid var(--color-border, #E8E8F0);
  border-radius: var(--radius-md, 16px);
  cursor: pointer;
  transition: all 200ms ease;
  text-align: left;
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  color: var(--color-text-primary, #1A1A2E);
  touch-action: manipulation;
}

.option-btn:hover,
.option-btn:focus {
  border-color: var(--color-primary, #0047AB);
  background: rgba(0, 71, 171, 0.04);
}

/* Selected state */
.option-btn.selected {
  border-color: var(--color-primary, #0047AB);
  background: rgba(0, 71, 171, 0.08);
}

/* Correct state */
.option-btn.correct {
  border-color: var(--color-success, #27AE60);
  background: var(--color-success-bg, rgba(39, 174, 96, 0.10));
  animation: correctBounce 400ms ease-out;
}

/* Wrong state */
.option-btn.wrong {
  border-color: var(--color-error, #E74C3C);
  background: var(--color-error-bg, rgba(231, 76, 60, 0.10));
  animation: wrongShake 400ms ease-out;
}

.option-btn__key {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-background, #FFF8F0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: var(--color-primary, #0047AB);
  flex-shrink: 0;
}
```

---

### Feedback Panel / Toast

**Usage:** Slides up from the bottom after an answer is submitted. Provides explanation and the "continue" action.

```html
<div class="feedback-panel feedback-panel--correct" id="feedbackPanel">
  <div class="feedback-panel__icon">✓</div>
  <div class="feedback-panel__body">
    <p class="feedback-panel__text" data-i18n="cp1_feedback">
      Bank tidak hantar link untuk minta maklumat anda.
    </p>
  </div>
  <button class="feedback-panel__next btn-primary" data-i18n="btn_continue">Teruskan</button>
</div>
```

```css
.feedback-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-card, #FFFFFF);
  border-top: 3px solid var(--color-border, #E8E8F0);
  border-radius: var(--radius-lg, 24px) var(--radius-lg, 24px) 0 0;
  padding: var(--space-8, 32px) var(--space-12, 48px);
  display: flex;
  align-items: center;
  gap: var(--space-6, 24px);
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.12);
  transform: translateY(100%);
  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
  z-index: 1000;
}

.feedback-panel.is-visible {
  transform: translateY(0);
}

.feedback-panel--correct {
  border-top-color: var(--color-success, #27AE60);
}

.feedback-panel--wrong {
  border-top-color: var(--color-error, #E74C3C);
}

.feedback-panel__icon {
  font-size: 48px;
  flex-shrink: 0;
}

.feedback-panel__text {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  color: var(--color-text-secondary, #4A4A6A);
  flex: 1;
}
```

---

### Result / Score Card

**Usage:** Full-screen celebratory screen shown after completing a quiz or game session.

```html
<div class="result-screen">
  <div class="result-screen__character">
    <img src="assets/images/characters/result-high.svg" alt="">
  </div>
  <div class="result-screen__score">
    <span class="result-screen__number" id="scoreDisplay">0</span>
    <span class="result-screen__total">/100</span>
  </div>
  <div class="result-screen__tier-badge tier-badge--high">
    <span class="tier-badge__emoji">🏆</span>
    <span class="tier-badge__label" data-i18n="result_tier_high_label">Pemandu Selamat, Bijak & Peka.</span>
  </div>
  <p class="result-screen__message" data-i18n="result_tier_high_msg">Tahniah! Anda pemandu yang bijak...</p>
  <div class="result-screen__actions">
    <button class="btn-primary" data-i18n="btn_retry">Cuba Lagi</button>
    <button class="btn-secondary" data-i18n="btn_end">Tamat</button>
  </div>
</div>
```

---

### Modal / Pop-up

**Usage:** Checkpoint modals (Project 01), informational overlays, fun fact bubbles.

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.50);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: overlayFadeIn 250ms ease;
}

.modal {
  background: var(--color-card, #FFFFFF);
  border-radius: var(--radius-lg, 24px);
  box-shadow: var(--shadow-modal);
  padding: var(--space-12, 48px);
  max-width: 900px;
  width: 90%;
  position: relative;
  animation: modalEnter 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes modalEnter {
  from { transform: scale(0.85); opacity: 0; }
  to   { transform: scale(1.0);  opacity: 1; }
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: var(--color-background, #FFF8F0);
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

### Attract / Idle Screen

**Usage:** All 6 projects. Activates when no interaction is detected for the defined idle timeout (30–60 seconds, per-project).

```html
<div class="attract-screen" id="attractScreen">
  <div class="attract-screen__content">
    <img src="assets/images/characters/attract-character.svg" class="attract-screen__character" alt="">
    <h1 class="attract-screen__title" data-i18n="game_title">Perangkap Scam Di Hadapan!</h1>
    <p class="attract-screen__cta" data-i18n="attract_cta">Sentuh skrin untuk bermain</p>
  </div>
  <!-- Floating background elements -->
  <div class="floating-elements" aria-hidden="true">
    <div class="float-el float-el--coin"></div>
    <div class="float-el float-el--star"></div>
    <!-- etc -->
  </div>
</div>
```

```css
.attract-screen {
  position: fixed;
  inset: 0;
  background: var(--color-background, #FFF8F0);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9000;
}

.attract-screen__cta {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--color-primary, #0047AB);
  animation: ctaPulse 1.5s ease-in-out infinite;
}

@keyframes ctaPulse {
  0%, 100% { opacity: 0.5; transform: scale(1.0); }
  50%       { opacity: 1.0; transform: scale(1.02); }
}
```

**Idle timer implementation (shared across all projects):**

```javascript
// idleManager.js
let idleTimer = null;
const IDLE_TIMEOUT_MS = 60000; // 60 seconds — override per project

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    showAttractScreen();
  }, IDLE_TIMEOUT_MS);
}

function initIdleManager() {
  document.addEventListener('touchstart', resetIdleTimer, { passive: true });
  document.addEventListener('mousedown', resetIdleTimer);
  document.addEventListener('keydown', resetIdleTimer);
  resetIdleTimer(); // Start timer on init
}

function showAttractScreen() {
  // Reset all application state
  document.getElementById('attractScreen').classList.add('is-visible');
  // Reset game/quiz state as appropriate per project
}

export { initIdleManager, resetIdleTimer };
```

---

### Primary Button

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 40px;
  min-height: 64px;
  min-width: 200px;
  background: linear-gradient(135deg, var(--color-primary, #0047AB) 0%, var(--color-primary-light, #1A6AC9) 100%);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 18px;
  border: none;
  border-radius: var(--radius-pill, 9999px);
  cursor: pointer;
  box-shadow: var(--shadow-button);
  transition: all 150ms ease;
  touch-action: manipulation;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 71, 171, 0.40);
}

.btn-primary:active {
  transform: scale(0.97) translateY(0);
  transition-duration: 100ms;
}

.btn-secondary {
  /* Same sizing, but outlined style */
  background: transparent;
  color: var(--color-primary, #0047AB);
  border: 2px solid var(--color-primary, #0047AB);
  box-shadow: none;
}

.btn-secondary:hover {
  background: rgba(0, 71, 171, 0.06);
}
```

---

## 4. Animation System

### Timing Reference

| Category | Duration | Notes |
|---|---|---|
| Instant feedback (button press flash) | 100ms | Confirms touch; must feel immediate |
| Micro-interactions (button press, scale) | 150ms | Button down state, icon changes |
| UI state changes (border colour, bg tint) | 200ms | Option selection, toggle switches |
| Card transitions (slide in/out) | 300ms | Standard inter-card navigation |
| Screen transitions | 400ms | Between major screens |
| Modal enter/exit | 250ms | Overlays |
| Feedback panel slide | 300ms | Bottom panel reveal |
| Celebration / result reveal | 600–1200ms | Staggered; let the moment breathe |
| Idle animations (floating elements, pulse) | 2000–4000ms | Looping; must not be distracting |
| Score count-up | 1500ms | Satisfying, not too slow |
| Confetti burst | 2000ms | Particles spawn fast, then drift and fade |

### Easing Curves

```css
:root {
  /* Standard: general purpose transitions */
  --ease-standard:   cubic-bezier(0.4, 0, 0.2, 1);
  /* Enter: elements arriving from outside the viewport */
  --ease-enter:      cubic-bezier(0, 0, 0.2, 1);
  /* Exit: elements leaving */
  --ease-exit:       cubic-bezier(0.4, 0, 1, 1);
  /* Bounce/spring: celebration, correct answer, modal pop */
  --ease-bounce:     cubic-bezier(0.34, 1.56, 0.64, 1);
  /* Elastic: strong bounce with slight overshoot */
  --ease-elastic:    cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

### Core Animation Patterns

#### Page Slide-In (from right — entering a new screen)

```css
@keyframes slideInFromRight {
  from { transform: translateX(60px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

.screen-enter {
  animation: slideInFromRight 400ms var(--ease-enter) both;
}
```

#### Page Slide-Out (to left — leaving the current screen)

```css
@keyframes slideOutToLeft {
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(-60px); opacity: 0; }
}

.screen-exit {
  animation: slideOutToLeft 300ms var(--ease-exit) both;
}
```

#### Card Fade-Up Enter

```css
@keyframes fadeUp {
  from { transform: translateY(24px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.card-enter {
  animation: fadeUp 300ms var(--ease-enter) both;
}

/* Staggered card entrance — apply to children */
.card-list > * {
  animation: fadeUp 300ms var(--ease-enter) both;
}
.card-list > *:nth-child(1) { animation-delay: 0ms;   }
.card-list > *:nth-child(2) { animation-delay: 80ms;  }
.card-list > *:nth-child(3) { animation-delay: 160ms; }
.card-list > *:nth-child(4) { animation-delay: 240ms; }
```

#### Answer Button Press

```css
@keyframes btnPress {
  0%   { transform: scale(1.0);  }
  40%  { transform: scale(0.96); }
  100% { transform: scale(1.0);  }
}

.option-btn:active {
  animation: btnPress 150ms var(--ease-standard);
}
```

#### Correct Answer Burst

```css
@keyframes correctBounce {
  0%   { transform: scale(1.0);  }
  30%  { transform: scale(1.04); }
  60%  { transform: scale(0.98); }
  100% { transform: scale(1.0);  }
}

@keyframes correctFlash {
  0%   { box-shadow: inset 0 0 0 0 rgba(39, 174, 96, 0); }
  30%  { box-shadow: inset 0 0 0 6px rgba(39, 174, 96, 0.9); }
  100% { box-shadow: inset 0 0 0 6px rgba(39, 174, 96, 0); }
}
```

#### Wrong Answer Shake

```css
@keyframes wrongShake {
  0%   { transform: translateX(0);  }
  10%  { transform: translateX(-8px); }
  30%  { transform: translateX(8px); }
  50%  { transform: translateX(-6px); }
  70%  { transform: translateX(6px); }
  90%  { transform: translateX(-3px); }
  100% { transform: translateX(0);  }
}
```

#### Score Count-Up (JavaScript — requestAnimationFrame)

```javascript
// animations.js — reusable countUp
function countUp(element, targetValue, duration = 1500, suffix = '') {
  const startTime = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startValue + (targetValue - startValue) * eased);
    element.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Usage:
countUp(document.getElementById('scoreDisplay'), 80, 1500);
```

#### Confetti Burst — Reusable ConfettiCanvas Class

```javascript
// confetti.js
class ConfettiCanvas {
  constructor(container) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: fixed; inset: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 9998;
    `;
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x, y, count = 80) {
    const colours = ['#0047AB', '#F5A623', '#00B4A6', '#FF6B5B', '#7B5EA7', '#27AE60'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = 6 + Math.random() * 10;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        colour: colours[Math.floor(Math.random() * colours.length)],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.3,
        life: 1.0,
        decay: 0.012 + Math.random() * 0.008,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }
    if (!this._rafId) this._loop();
  }

  _loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles = this.particles.filter(p => p.life > 0);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.life -= p.decay;
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fillStyle = p.colour;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    });
    if (this.particles.length > 0) {
      this._rafId = requestAnimationFrame(() => this._loop());
    } else {
      this._rafId = null;
    }
  }
}

// Usage:
const confetti = new ConfettiCanvas(document.body);

// Trigger on correct answer or result screen:
confetti.burst(window.innerWidth / 2, window.innerHeight / 3);
```

#### Floating Background Elements

```css
@keyframes floatUpDown {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-18px) rotate(5deg); }
  66%       { transform: translateY(-8px) rotate(-3deg); }
}

.float-el {
  position: absolute;
  pointer-events: none;
  animation: floatUpDown linear infinite;
  opacity: 0.15;
}

/* Stagger each element */
.float-el:nth-child(1) { animation-duration: 3.5s; animation-delay: 0s;    }
.float-el:nth-child(2) { animation-duration: 4.2s; animation-delay: 0.7s;  }
.float-el:nth-child(3) { animation-duration: 3.8s; animation-delay: 1.4s;  }
.float-el:nth-child(4) { animation-duration: 4.6s; animation-delay: 0.3s;  }
.float-el:nth-child(5) { animation-duration: 3.2s; animation-delay: 1.8s;  }
```

#### Illustration Bounce-In on Screen Load

```css
@keyframes illustrationBounceIn {
  0%   { transform: scale(0.7) translateY(20px); opacity: 0; }
  60%  { transform: scale(1.05) translateY(-5px); opacity: 1; }
  80%  { transform: scale(0.97) translateY(2px); }
  100% { transform: scale(1.0) translateY(0); opacity: 1; }
}

.character-illustration {
  animation: illustrationBounceIn 600ms var(--ease-bounce) both;
}
```

---

## 5. Bilingual (BM/English) Implementation

### Architecture Pattern

All projects use a single shared i18n architecture. Content lives in a `js/i18n.js` file. The HTML uses `data-i18n` attributes as keys. JavaScript applies translations on language change and on initial load.

**`js/i18n.js` — complete structure:**

```javascript
// i18n.js — Bilingual content for the project
// Keys use snake_case. HTML content uses data-i18n-html.

const LANG = {
  bm: {
    // === COMMON UI ===
    btn_start:        "Mula",
    btn_continue:     "Teruskan",
    btn_next:         "Seterusnya",
    btn_retry:        "Cuba Lagi",
    btn_end:          "Tamat",
    btn_restart:      "Mula Semula",
    btn_skip:         "Langkau",
    btn_confirm:      "Sahkan",
    attract_cta:      "Sentuh skrin untuk bermain",
    loading:          "Memuatkan...",
    score_label:      "Skor Anda",
    question_of:      "Soalan {current} daripada {total}",

    // === Project-specific keys below ===
    // (see Section 9 for full per-project key lists)
  },
  en: {
    // === COMMON UI ===
    btn_start:        "Start",
    btn_continue:     "Continue",
    btn_next:         "Next",
    btn_retry:        "Try Again",
    btn_end:          "Finish",
    btn_restart:      "Start Over",
    btn_skip:         "Skip",
    btn_confirm:      "Confirm",
    attract_cta:      "Touch the screen to play",
    loading:          "Loading...",
    score_label:      "Your Score",
    question_of:      "Question {current} of {total}",

    // === Project-specific keys below ===
  }
};

// Current language state
let currentLang = localStorage.getItem('imd_lang') || 'bm';

/**
 * Set and apply a language across the entire document.
 * @param {string} lang - 'bm' or 'en'
 */
function setLang(lang) {
  if (!LANG[lang]) return;
  currentLang = lang;
  localStorage.setItem('imd_lang', lang);

  // Plain text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (LANG[lang][key] !== undefined) {
      el.textContent = LANG[lang][key];
    }
  });

  // HTML elements (for strings containing <br>, <strong>, etc.)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (LANG[lang][key] !== undefined) {
      el.innerHTML = LANG[lang][key];
    }
  });

  // Placeholder text (inputs)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (LANG[lang][key] !== undefined) {
      el.placeholder = LANG[lang][key];
    }
  });

  // ARIA labels
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (LANG[lang][key] !== undefined) {
      el.setAttribute('aria-label', LANG[lang][key]);
    }
  });

  // Update toggle button states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  // Update html lang attribute
  document.documentElement.lang = lang === 'bm' ? 'ms' : 'en';
}

/**
 * Get a translation string by key.
 * Supports template replacement: t('question_of', { current: 2, total: 5 })
 */
function t(key, replacements = {}) {
  const str = LANG[currentLang][key] || LANG['bm'][key] || key;
  return Object.entries(replacements).reduce(
    (result, [placeholder, value]) => result.replace(`{${placeholder}}`, value),
    str
  );
}

/**
 * Apply current language on page load.
 */
function initI18n() {
  setLang(currentLang);
}

export { setLang, t, initI18n, currentLang };
```

**HTML usage pattern:**

```html
<!-- Text content -->
<h1 data-i18n="game_title">Perangkap Scam Di Hadapan!</h1>

<!-- HTML content (with markup inside the string) -->
<p data-i18n-html="cp2_feedback_detail">Bank Negara <strong>TIDAK AKAN</strong> menawarkan...</p>

<!-- Placeholder -->
<input data-i18n-placeholder="input_search_placeholder" placeholder="Cari...">

<!-- ARIA label -->
<button data-i18n-aria="btn_close_aria" aria-label="Tutup">✕</button>

<!-- Dynamic string via JS -->
<span id="questionCounter"></span>
<script>
  document.getElementById('questionCounter').textContent = t('question_of', { current: 2, total: 5 });
</script>
```

### Translation Strategy

| Convention | Rule |
|---|---|
| Key format | `snake_case`, descriptive: `welcome_title`, `cp1_scenario`, `result_tier_high_msg` |
| HTML in strings | Use `data-i18n-html` for strings containing `<br>`, `<strong>`, `<em>` tags |
| Dynamic values | Use template literals: `t('score_result', { score: 80, max: 100 })` |
| Missing key fallback | Falls back to BM string, then to key itself — never silent failure |
| Namespacing | Prefix with project identifier for project-specific strings: `cp1_`, `s3_`, `q2_` etc. |
| Shared strings | Common UI strings (button labels, progress) use no prefix |

### English Content Standards

All English translations across the 6 projects must meet these standards:

- **Clear, natural museum English** — not a direct word-for-word translation of BM
- **Warm and approachable** — maintain the friendly, educational tone of the original
- **Financial accuracy** — use correct English financial terminology where applicable
- **Inclusive language** — gender-neutral where possible, no regional slang
- **Consistent person** — address the visitor as "you" throughout
- **Sentence case** for body text; Title Case for headings and CTAs
- **Malaysian context preserved** — do not replace RM with $ or references to local institutions

---

## 6. Audio System

### Global Audio Architecture

```javascript
// audio.js — Shared AudioManager class for all projects

class AudioManager {
  constructor() {
    this.ctx = null;       // Web Audio API AudioContext
    this.buffers = {};     // Pre-decoded SFX AudioBuffers
    this.bgm = null;       // HTML5 Audio element for BGM
    this.enabled = true;   // Global mute toggle
    this.bgmVolume = 0.3;
  }

  /**
   * Must be called from a user gesture (tap/click) to comply with autoplay policy.
   */
  async init() {
    if (this.ctx) return; // Already initialised
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  /**
   * Load and decode a SFX audio file into a reusable buffer.
   */
  async loadSFX(key, url) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.buffers[key] = await this.ctx.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.warn(`Audio: could not load SFX "${key}" from ${url}`);
    }
  }

  /**
   * Load all SFX from a manifest object { key: url }.
   */
  async preloadAll(manifest) {
    await this.init();
    const promises = Object.entries(manifest).map(([key, url]) => this.loadSFX(key, url));
    await Promise.allSettled(promises);
  }

  /**
   * Play a pre-loaded SFX buffer.
   */
  playSFX(key, volume = 1.0, pitch = 1.0) {
    if (!this.enabled || !this.buffers[key] || !this.ctx) return;
    const source = this.ctx.createBufferSource();
    const gainNode = this.ctx.createGain();
    source.buffer = this.buffers[key];
    source.playbackRate.value = pitch;
    gainNode.gain.value = volume;
    source.connect(gainNode).connect(this.ctx.destination);
    source.start(0);
  }

  /**
   * Start background music. Call after first user interaction.
   */
  loadBGM(url) {
    this.bgm = new Audio(url);
    this.bgm.loop = true;
    this.bgm.volume = this.bgmVolume;
  }

  playBGM() {
    if (!this.enabled || !this.bgm) return;
    this.bgm.play().catch(() => {});
  }

  stopBGM(fadeMs = 500) {
    if (!this.bgm) return;
    const step = this.bgm.volume / (fadeMs / 50);
    const fadeOut = setInterval(() => {
      if (this.bgm.volume > step) {
        this.bgm.volume -= step;
      } else {
        this.bgm.pause();
        this.bgm.volume = this.bgmVolume;
        clearInterval(fadeOut);
      }
    }, 50);
  }

  /**
   * Toggle all audio on/off.
   */
  toggle() {
    this.enabled = !this.enabled;
    if (this.bgm) {
      if (this.enabled) {
        this.bgm.play().catch(() => {});
      } else {
        this.bgm.pause();
      }
    }
    return this.enabled;
  }
}

const Audio = new AudioManager();
export default Audio;
```

### Volume Levels

| Audio Type | Volume | Notes |
|---|---|---|
| BGM | 0.25–0.35 | Background only; must not mask speech or dominate in a crowded museum hall |
| SFX — UI click | 0.5 | Subtle, non-intrusive |
| SFX — feedback (correct/wrong) | 0.7 | Should be heard clearly above ambient noise |
| SFX — celebration / fanfare | 0.8 | The emotional peak of the experience |
| SFX — wrong answer | 0.6 | Intentionally softer than correct — do not embarrass visitors |

**All projects must include a visible mute/unmute toggle** (minimum 52×52px button, persistent position, top-left or bottom-right corner).

### Recommended Free Audio Sources

| Source | URL | License | Best For |
|---|---|---|---|
| Incompetech (Kevin MacLeod) | https://incompetech.com | CC Attribution 3.0 | BGM loops in various moods |
| Freesound | https://freesound.org | CC0 / CC Attribution | All SFX; large searchable library |
| Kenney.nl | https://kenney.nl/assets | CC0 | UI sounds pack, casino audio pack |
| Free Music Archive | https://freemusicarchive.org | CC variants | Ambient / world music BGM |
| ZapSplat | https://www.zapsplat.com | Free account | UI notifications, button clicks |
| Pixabay Music | https://pixabay.com/music/ | Royalty-free | Ambient loops, quiz music |

**For Malaysian/cultural BGM flavour:** Search for "gamelan instrumental", "traditional Malaysian ambient", "pantun melody", "serunai ambient" on Freesound and Free Music Archive.

---

## 7. Kiosk & Accessibility

### Display Targets

| Format | Resolution | Projects |
|---|---|---|
| Landscape kiosk (primary) | 1920 × 1080px | Projects 01, 02, 03, 04, 06 |
| Portrait kiosk (alternate) | 1080 × 1920px | Projects 01, 02 (must support via media query) |
| Mobile web | 390 × 844px | Project 05 (AR) |
| Dual screen | 1920×1080 (console) + LED wall | Project 06 only |
| Minimum supported | 1280 × 720px | All projects |

**Root container approach for kiosk (1920×1080):**

```css
#app-root {
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  position: relative;
  /* Scale down on smaller displays */
  transform-origin: top left;
}

/* Apply via JS on load: */
```

```javascript
function scaleToViewport() {
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  const scale = Math.min(scaleX, scaleY);
  document.getElementById('app-root').style.transform = `scale(${scale})`;
}
window.addEventListener('resize', scaleToViewport);
scaleToViewport();
```

### Kiosk Hardening Checklist

Before any project is deployed to a kiosk, verify all items below are implemented:

```
Security
[ ] Right-click context menu disabled
    document.addEventListener('contextmenu', e => e.preventDefault());

[ ] Keyboard shortcut traps disabled (F5 reload, F11 fullscreen, Ctrl+W, Ctrl+R, Alt+F4)
    document.addEventListener('keydown', e => {
      const blocked = ['F5','F11','F12'];
      const ctrl = ['w','r','t','n','p'];
      if (blocked.includes(e.key)) e.preventDefault();
      if (e.ctrlKey && ctrl.includes(e.key.toLowerCase())) e.preventDefault();
    });

[ ] No external links that leave the application (or open in new tab with noopener)

Behaviour
[ ] Idle timer implemented and tested (60 seconds default, 30 seconds for Project 01)
[ ] Idle timer resets on ANY touchstart or mousedown
[ ] Attract screen restores experience to initial state (not mid-session)
[ ] Auto-return after result screen (30 seconds) implemented
[ ] All external API calls have offline fallback (no network dependency for core experience)

Visual
[ ] No scrollbars visible (overflow: hidden on body)
[ ] No browser UI visible (run in Chrome kiosk mode: --kiosk --fullscreen)
[ ] Touch highlight removed: -webkit-tap-highlight-color: transparent;
[ ] Cursor hidden: cursor: none; (or default if touchscreen)
[ ] Font sizes readable at 80cm arm's length (minimum 18px equivalent body text)
[ ] All interactive states visible without hover (kiosk = no hover state for touch)

Accessibility
[ ] WCAG AA colour contrast (minimum 4.5:1) on all text
[ ] No time-limited inputs (museum visitors need time to read, no countdown timers on questions)
[ ] Colour never the only indicator of state (always pair with icon or text)
[ ] Touch targets minimum 60×60px everywhere
[ ] Audio toggle always accessible (mute/unmute)

Performance
[ ] 60fps target on kiosk hardware (Intel NUC or mid-range all-in-one PC)
[ ] All assets preloaded before experience starts
[ ] Canvas loops cancel when screen is not visible
[ ] No memory leaks in animation loops (test 8-hour session)
```

### CSS Kiosk Reset

Apply this to every project:

```css
/* kiosk-reset.css — apply globally */

/* Disable text selection and touch callouts */
*, *::before, *::after {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  box-sizing: border-box;
}

/* Re-enable text selection where needed */
p, span, .selectable {
  user-select: text;
}

body {
  overflow: hidden;
  cursor: default;
  margin: 0;
  padding: 0;
}

/* Ensure touch targets feel immediate */
button, [role="button"] {
  touch-action: manipulation; /* eliminates 300ms click delay */
  cursor: pointer;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Chrome Kiosk Mode Launch Command

For Windows kiosk deployments:

```batch
"C:\Program Files\Google\Chrome\Application\chrome.exe" ^
  --kiosk ^
  --fullscreen ^
  --disable-infobars ^
  --disable-session-crashed-bubble ^
  --disable-restore-session-state ^
  --no-first-run ^
  --disable-pinch ^
  --overscroll-history-navigation=0 ^
  http://localhost:3000
```

---

## 8. File Structure Template

This is the standard file structure for all HTML5 projects. Adapt as needed per project complexity, but maintain naming conventions.

```
project-name/
├── index.html                  ← Single HTML file (SPA pattern)
├── css/
│   ├── variables.css           ← CSS custom properties (tokens)
│   ├── base.css                ← Reset, body, global typography
│   ├── components.css          ← Reusable UI components
│   ├── screens.css             ← Per-screen layout rules
│   └── animations.css          ← @keyframe definitions only
├── js/
│   ├── main.js                 ← Entry point, event listeners, screen controller
│   ├── state.js                ← State machine, global app state object
│   ├── i18n.js                 ← All BM/EN strings + setLang() + t()
│   ├── audio.js                ← AudioManager class
│   ├── animations.js           ← Reusable animation helpers (countUp, stagger, etc.)
│   ├── confetti.js             ← ConfettiCanvas class
│   └── idleManager.js          ← Idle timer + attract screen trigger
├── assets/
│   ├── images/
│   │   ├── characters/         ← Illustrated characters (SVG or PNG)
│   │   │   ├── attract.svg
│   │   │   ├── result-high.svg
│   │   │   └── result-low.svg
│   │   ├── bg/                 ← Background elements (coins, stars, etc.)
│   │   │   ├── coin.svg
│   │   │   ├── star.svg
│   │   │   └── piggy-bank.svg
│   │   └── icons/              ← UI icons (prefer SVG inline or sprite)
│   ├── audio/
│   │   ├── bgm/
│   │   │   └── bgm-main.mp3
│   │   └── sfx/
│   │       ├── btn-tap.mp3
│   │       ├── correct.mp3
│   │       ├── wrong.mp3
│   │       ├── celebration.mp3
│   │       └── ...
│   └── fonts/                  ← WOFF2 bundles for offline kiosk
│       ├── Poppins-Bold.woff2
│       ├── Poppins-SemiBold.woff2
│       ├── Nunito-Regular.woff2
│       └── Nunito-Bold.woff2
└── README.md                   ← Deployment instructions, idle timer config, staff reset
```

**For Project 06 (Node.js server required):**

```
project-06-savings/
├── server.js                   ← Node.js WebSocket + Express HTTP server
├── package.json
├── state.json                  ← Persisted state across sessions
├── public/                     ← Served statically by Express
│   ├── console.html
│   ├── wall.html
│   ├── css/  js/  assets/      ← Same structure as above
└── scripts/
    ├── reset-state.js          ← Staff daily reset
    └── start.bat               ← Windows startup script
```

---

## 9. English Content Translation Reference

This section provides complete English translations of all BM content strings for all 6 projects. These strings populate the `en` object of each project's `i18n.js`.

**Translation principle:** Natural museum English. Warm, accurate, and inclusive. Not word-for-word literal. Financial terminology is preserved.

---

### Project 01 — Perangkap Scam Di Hadapan! (Car Scam Game)

**UI & Navigation**

| Key | BM | English |
|---|---|---|
| `game_title` | Perangkap Scam Di Hadapan! Pandu Bijak, Elak Scam! | Scam Traps Ahead! Drive Smart, Avoid Scams! |
| `game_intro_text` | Uji kefahaman anda dalam mengenal pasti scam dan belajar cara lindungi diri. | Test your ability to spot financial scams and learn how to protect yourself. |
| `game_instructions` | Pandu dan harungi perangkap scam di hadapan. Kumpul mata untuk lihat tahap 'Scam Awareness' anda | Drive through scam traps ahead. Collect points to see your Scam Awareness level! |
| `attract_cta` | Sentuh skrin untuk bermain | Touch the screen to play |
| `btn_start` | Mula Permainan | Start Game |
| `btn_continue` | Teruskan | Continue |
| `btn_retry` | Cuba Lagi | Try Again |
| `btn_end` | Tamat | Finish |
| `score_label` | Skor Akhir Anda | Your Final Score |
| `question_label` | Apakah yang patut anda lakukan? | What should you do? |
| `cara_bermain_heading` | CARA BERMAIN | HOW TO PLAY |
| `score_correct_anim` | +20 MATA! | +20 POINTS! |
| `score_wrong_anim` | −10 MATA | −10 POINTS |

**Checkpoint 1 — SMS Phishing**

| Key | BM | English |
|---|---|---|
| `cp1_title` | SMS Phishing | SMS Phishing |
| `cp1_scenario` | Anda terima SMS: 'Akaun anda telah dibekukan. Klik link ini untuk aktifkan semula.' | You receive an SMS: 'Your account has been frozen. Click this link to reactivate it.' |
| `cp1_option_a` | Klik link segera | Click the link immediately |
| `cp1_option_b` | Abaikan sahaja | Ignore it |
| `cp1_option_c` | Semak dan hubungi bank melalui saluran rasmi | Verify and contact your bank through official channels |
| `cp1_feedback` | Bank tidak hantar link untuk minta maklumat anda. | Banks never send links asking for your personal information. |

**Checkpoint 2 — Fake BNM Document**

| Key | BM | English |
|---|---|---|
| `cp2_title` | Dokumen BNM Palsu | Fake BNM Document |
| `cp2_scenario` | BNM menawarkan pelaburan dijamin untung tinggi dan tiada risiko! Untung 30% dalam seminggu! | BNM is offering a guaranteed high-return investment with no risk! Earn 30% profit in one week! |
| `cp2_option_a` | Terus melabur | Invest immediately |
| `cp2_option_b` | Semak dengan BNM/SC alert | Check with BNM/SC scam alert |
| `cp2_option_c` | Tanya kawan dulu | Ask a friend first |
| `cp2_feedback` | Bank Negara TIDAK AKAN mengeluarkan surat rasmi kepada individu dan menawarkan pelaburan seperti ini. Pulangan tinggi & cepat biasanya juga tanda-tanda scam. | Bank Negara will NEVER send official letters to individuals offering investments like this. High, fast returns are a classic warning sign of a scam. |

**Checkpoint 3 — Unknown QR Merchant**

| Key | BM | English |
|---|---|---|
| `cp3_title` | QR Merchant Tidak Dikenali | Unknown QR Merchant |
| `cp3_scenario` | Anda scan QR di kedai kecil 'Bayaran kepada: Unknown Enterprise' | You scan a QR code at a small shop — 'Payment to: Unknown Enterprise' |
| `cp3_option_a` | Terus bayar | Pay immediately |
| `cp3_option_b` | Semak nama penerima sebelum bayar | Check the recipient name before paying |
| `cp3_option_c` | Abaikan dan pergi | Ignore it and leave |
| `cp3_feedback` | Sentiasa sahkan nama penerima sebelum transaksi | Always verify the recipient's name before completing any payment. |

**Checkpoint 4 — Vishing Call**

| Key | BM | English |
|---|---|---|
| `cp4_title` | Panggilan Penipuan (Vishing) | Scam Phone Call (Vishing) |
| `cp4_scenario` | Call masuk: 'Ini panggilan dari Bank Negara. Akaun anda terlibat dengan transaksi tidak sah.' | Incoming call: 'This is Bank Negara. Your account is involved in an unauthorised transaction.' |
| `cp4_option_a` | Beri maklumat peribadi | Give your personal details |
| `cp4_option_b` | Terus panik | Panic and comply |
| `cp4_option_c` | Tamatkan panggilan & lapor | End the call and report it |
| `cp4_feedback` | Bank Negara tidak akan hubungi individu untuk minta maklumat akaun. | Bank Negara will never call individuals to request account information. |

**Checkpoint 5 — OTP Request**

| Key | BM | English |
|---|---|---|
| `cp5_title` | Permintaan Kod OTP | OTP Code Request |
| `cp5_scenario` | Seseorang minta kod OTP untuk 'verify akaun'. | Someone asks you for your OTP code to 'verify your account'. |
| `cp5_option_a` | Beri OTP | Share the OTP |
| `cp5_option_b` | Abaikan dan jangan kongsi | Ignore it and never share |
| `cp5_option_c` | Tanya dulu | Ask questions first |
| `cp5_feedback` | OTP adalah sulit. Jangan kongsi dengan sesiapa pon termasuk ahli keluarga. | Your OTP is strictly confidential. Never share it with anyone — including family members. |

**Result Tiers**

| Key | BM | English |
|---|---|---|
| `result_tier_high_label` | Pemandu Selamat, Bijak & Peka. | Safe, Smart & Aware Driver. |
| `result_tier_high_msg` | Tahniah! Anda pemandu yang bijak, peka dan tahu cara lindungi diri. Teruskan amalan ini dan bantu orang lain juga. | Well done! You are a smart and alert driver who knows how to protect yourself. Keep it up — and help others stay safe too. |
| `result_tier_mid_label` | Hampir Selamat, Tapi Perlu Lebih Berhati-hati. | Almost Safe — But Stay More Alert. |
| `result_tier_mid_msg` | Anda tahu asas scam, tapi masih boleh tertipu. Ingat! Semak dulu sebelum percaya. | You know the basics about scams, but you could still be tricked. Remember — always verify before you trust. |
| `result_tier_low_label` | Zon Bahaya. Berisiko Tinggi | Danger Zone. High Risk. |
| `result_tier_low_msg` | Anda mudah terpedaya dengan scam. Tenangkan diri. JANGAN PANIK! | You are vulnerable to scams. Stay calm — and never act in a hurry. DON'T PANIC! |

---

### Project 02 — Malaysia-Singapore Cross-Border QR Payment Experience

**UI & Navigation**

| Key | BM | English |
|---|---|---|
| `attract_title` | PEMBAYARAN RENTAS SEMPADAN | CROSS-BORDER PAYMENTS |
| `attract_subtitle` | Malaysia ↔ Singapura | Malaysia ↔ Singapore |
| `attract_cta` | Tekan untuk meneroka pembayaran rentas sempadan antara Malaysia dan Singapura | Tap to explore cross-border QR payments between Malaysia and Singapore |
| `btn_next` | Seterusnya | Next |
| `btn_skip` | Langkau | Skip |
| `btn_restart` | Mula Semula | Start Over |
| `btn_confirm` | Sahkan | Confirm |
| `quiz_correct` | Betul! | Correct! |
| `quiz_wrong` | Cuba Lagi | Try Again |
| `quiz_wrong_reveal` | Jawapan betul: | Correct answer: |

**Section 1 — Opening Narrative**

| Key | BM | English |
|---|---|---|
| `s1_narrative_1` | Dunia yang semakin bersambung... Kini, semuanya terasa lebih dekat... | A world more connected than ever... Everything feels closer now... |
| `s1_narrative_2` | Dahulu, pembayaran rentas negara memerlukan wang tunai dan pertukaran mata wang. Hari ini, hanya perlu satu imbasan QR. | Once, cross-border payments required cash and currency exchange. Today, all it takes is a single QR scan. |
| `s1_narrative_3` | Pembayaran digital rentas sempadan menunjukkan bagaimana Malaysia dan Singapura berbeza dari segi negara, tetapi bersatu sebagai satu ekosistem digital. | Cross-border digital payments show how Malaysia and Singapore, though separate countries, are united as a single digital ecosystem. |
| `s1_cta` | Tekan untuk meneroka pembayaran rentas sempadan antara Malaysia dan Singapura | Tap to explore cross-border QR payments between Malaysia and Singapore |

**Section 2 — Video**

| Key | BM | English |
|---|---|---|
| `s2_heading` | Lihat Sendiri | See It in Action |
| `s2_subheading` | Dua situasi sebenar menggunakan pembayaran QR rentas sempadan | Two real-world scenarios using cross-border QR payments |
| `video_1_title` | Hantar Wang kepada Rakan | Send Money to a Friend |
| `video_1_desc` | Bayar balik rakan anda dalam saat — walaupun mereka berada di Singapura. | Pay your friend back in seconds — even if they are in Singapore. |
| `video_2_title` | Bayar Pengangkutan di Luar Negara | Pay for Transport Abroad |
| `video_2_desc` | Ambil MRT atau bas di Singapura — tanpa perlu tukar duit atau cari ATM. | Take the MRT or bus in Singapore — no cash exchange or ATM needed. |

**Section 3 — QR Payment Simulation**

| Key | BM | English |
|---|---|---|
| `s3_heading` | Cuba Sendiri: Simulasi Pembayaran QR | Try It Yourself: QR Payment Simulation |
| `sim_step_1_title` | Langkah 1: Imbas Kod QR | Step 1: Scan the QR Code |
| `sim_step_1_inst` | Buka aplikasi e-dompet anda dan imbas kod QR peniaga. | Open your e-wallet app and scan the merchant's QR code. |
| `sim_step_2_title` | Langkah 2: Pilih E-Dompet Malaysia | Step 2: Select Your Malaysian E-Wallet |
| `sim_step_2_inst` | Pilih e-dompet anda untuk meneruskan pembayaran. | Select your e-wallet to proceed with the payment. |
| `sim_step_3_title` | Langkah 3: Penukaran RM-SGD Serta-merta | Step 3: Instant RM-to-SGD Conversion |
| `sim_step_3_inst` | Lihat jumlah dalam Ringgit Malaysia dan nilai dalam Dolar Singapura — diira secara automatik. | See the amount in Malaysian Ringgit and the equivalent in Singapore Dollars — calculated automatically. |
| `sim_step_4_title` | Langkah 4: Sahkan Pembayaran | Step 4: Confirm Your Payment |
| `sim_step_4_inst` | Masukkan PIN atau gunakan biometrik untuk mengesahkan transaksi anda. | Enter your PIN or use biometrics to authorise the transaction. |
| `sim_step_5_title` | Langkah 5: Peniaga Menerima Bayaran | Step 5: Merchant Receives Payment |
| `sim_step_5_inst` | Peniaga menerima bayaran dalam saat — terus ke akaun bank mereka. | The merchant receives the payment instantly — directly into their bank account. |

**Section 4 — Behind the Scenes**

| Key | BM | English |
|---|---|---|
| `s4_heading` | Di Sebalik Tabir | Behind the Scenes |
| `card_1_title` | Sistem Penyelesaian Antara Bank | Interbank Settlement System |
| `card_1_body` | Setiap transaksi diproses melalui sistem penyelesaian antara bank yang selamat dan dikawal selia — memastikan wang sampai ke tangan yang betul dalam masa nyata. | Every transaction is processed through a secure, regulated interbank settlement system — ensuring money reaches the right hands in real time. |
| `card_2_title` | Kebolehgunaan QR Rentas Sempadan | Cross-Border QR Interoperability |
| `card_2_body` | Kod QR yang digunakan di Malaysia dan Singapura mengikut standard antarabangsa yang sama — membolehkan imbasan rentas sempadan tanpa aplikasi tambahan. | QR codes used in Malaysia and Singapore follow the same international standard — enabling cross-border scanning without any additional apps. |
| `card_3_title` | Enjin Penukaran Mata Wang | Currency Conversion Engine |
| `card_3_body` | Kadar pertukaran dikira secara serta-merta menggunakan kadar pasaran semasa. Tiada caj tersembunyi — apa yang anda lihat adalah apa yang anda bayar. | The exchange rate is calculated instantly using the current market rate. No hidden charges — what you see is what you pay. |
| `card_4_title` | Kerjasama Pengawalseliaan Antara Negara | Cross-Border Regulatory Cooperation |
| `card_4_body` | Bank Negara Malaysia (BNM) dan Monetary Authority of Singapore (MAS) bekerjasama untuk memastikan keselamatan, perlindungan pengguna, dan pematuhan peraturan dalam setiap transaksi. | Bank Negara Malaysia (BNM) and the Monetary Authority of Singapore (MAS) work together to ensure the safety, consumer protection, and regulatory compliance of every transaction. |

**Section 5 — Safety Tips**

| Key | BM | English |
|---|---|---|
| `s5_heading` | Tips Keselamatan | Safety Tips |
| `s5_intro` | Bayaran QR rentas sempadan sebenarnya mudah dan selamat. | Cross-border QR payments are straightforward and secure. |
| `tip_1` | Imbas QR daripada peniaga yang betul | Only scan QR codes from verified merchants |
| `tip_2` | Semak nama peniaga dan jumlah | Always check the merchant name and amount before confirming |
| `tip_3` | Lindungi telefon dengan PIN/biometric | Protect your phone with a PIN or biometric lock |
| `tip_4` | Jangan kongsi OTP | Never share your OTP with anyone |

**Section 6 — Fun Facts**

| Key | BM | English |
|---|---|---|
| `s6_heading` | Tahukah Anda? | Did You Know? |
| `fact_1` | Malaysia dan Singapura antara negara terawal di ASEAN yang melaksanakan hubungan pembayaran QR rentas sempadan. | Malaysia and Singapore are among the first countries in ASEAN to implement a cross-border QR payment linkage. |
| `fact_2` | Tak perlu tukar duit atau cari ATM. Hanya imbas kod QR menggunakan Touch 'n Go eWallet atau Boost. | No need to exchange cash or find an ATM. Simply scan a QR code using Touch 'n Go eWallet or Boost. |

**Quiz Questions**

| Key | BM | English |
|---|---|---|
| `q1_text` | Apakah yang membolehkan pembayaran rentas sempadan? | What makes cross-border payments possible? |
| `q1_a` | Pertukaran wang tunai sahaja | Cash exchange only |
| `q1_b` | Pembayaran serta-merta antara negara melalui sistem digital | Real-time digital payment systems between countries |
| `q2_text` | Mengapa Malaysia dan Singapura menghubungkan sistem pembayaran? | Why have Malaysia and Singapore linked their payment systems? |
| `q2_a` | Untuk memudahkan perjalanan dan perdagangan | To make travel and trade easier |
| `q2_b` | Untuk meningkatkan penggunaan tunai | To increase the use of cash |
| `q3_text` | Siapa yang bekerjasama untuk membolehkan pembayaran rentas sempadan? | Who works together to enable cross-border payments? |
| `q3_a` | Hanya peniaga | Merchants only |
| `q3_b` | Bank, pengawal selia dan rangkaian pembayaran | Banks, regulators, and payment networks |
| `q4_text` | Apakah manfaat jangka panjang sistem pembayaran rentas sempadan? | What is the long-term benefit of cross-border payment systems? |
| `q4_a` | Ekonomi serantau yang lebih bersambung | A more connected regional economy |
| `q4_b` | Kurang perdagangan antara negara | Less trade between countries |

**Section 8 — Closing**

| Key | BM | English |
|---|---|---|
| `closing_line_1` | Tahniah! Anda telah mengalami bagaimana kewangan digital menghubungkan manusia, perniagaan dan negara. | Congratulations! You have just experienced how digital finance connects people, businesses, and nations. |
| `closing_line_2` | Kewangan bukan sekadar transaksi — ia menyatukan kita! | Finance is more than transactions — it brings us together! |
| `closing_score` | Skor kuiz anda: | Your quiz score: |

---

### Project 03 — Perancang Bajet Penjagaan Kesihatan (MHIT Health Budget Planner)

**UI & Navigation**

| Key | BM | English |
|---|---|---|
| `welcome_title` | Perancang Bajet Penjagaan Kesihatan | Healthcare Budget Planner |
| `disclaimer_title` | Nota Penting | Important Note |
| `disclaimer_text` | Alat ini adalah untuk tujuan pendidikan sahaja. Angka yang dipaparkan adalah anggaran berdasarkan data awam. Sila berunding dengan perunding kewangan berlesen untuk nasihat peribadi. | This tool is for educational purposes only. Figures shown are estimates based on public data. Please consult a licensed financial adviser for personalised guidance. |
| `btn_disclaimer_agree` | Saya Faham, Teruskan | I Understand, Continue |
| `age_label` | Umur Anda | Your Age |
| `mhit_question` | Adakah anda mempunyai pelan MHIT? | Do you have an MHIT plan? |
| `mhit_none` | Tiada | None |
| `mhit_basic` | Ya, Asas | Yes, Basic |
| `mhit_comprehensive` | Ya, Komprehensif | Yes, Comprehensive |
| `btn_calculate` | Kira Sekarang | Calculate Now |
| `calculating_text` | Mengira unjuran anda... | Calculating your projections... |
| `results_heading` | Unjuran Kos Penjagaan Kesihatan Anda | Your Healthcare Cost Projections |
| `advice_heading` | Nasihat Kewangan Anda | Your Financial Advice |
| `coverage_gap_label` | Jurang Perlindungan | Coverage Gap |
| `coverage_sufficient` | Perlindungan mencukupi | Coverage is sufficient |
| `btn_view_advice` | Lihat Nasihat Kewangan | View Financial Advice |
| `btn_recalculate` | Cuba Semula | Try Again |
| `btn_end` | Tamat | Finish |

**Wall Panel Headings (Project 03 info panels)**

| Key | BM | English |
|---|---|---|
| `panel_what_is_mhit` | Apa itu MHIT? | What is MHIT? |
| `panel_why_important` | Mengapa MHIT penting? | Why does MHIT matter? |
| `panel_abc_before_buy` | ABC Sebelum Beli | The ABCs Before You Buy |
| `panel_abc_a` | ANGGAR nilai keperluan anda | ASSESS your coverage needs |
| `panel_abc_b` | BANDINGKAN pilihan yang ada | BROWSE and compare your options |
| `panel_abc_c` | CARI pilihan bersesuaian mengikut bajet dan keperluan | CHOOSE a plan that fits your budget and needs |
| `panel_key_questions` | Tanya Sebelum Buat Keputusan | Questions to Ask Before Deciding |
| `panel_q1` | Apa perlindungan pelan ini? | What does this plan cover? |
| `panel_q2` | Berapa bayaran caruman/premium saya? | How much is my premium/contribution? |
| `panel_q3` | Adakah caruman/premium saya akan meningkat? | Will my premium/contribution increase over time? |
| `panel_key_message` | MHIT bukan untuk untung tetapi untuk perlindungan. | MHIT is not about profit — it is about protection. |
| `panel_understand_first` | Faham dulu, baru beli. | Understand first, then buy. |

**Risk Tiers**

| Key | BM | English |
|---|---|---|
| `risk_rendah` | Risiko Rendah | Low Risk |
| `risk_sederhana` | Risiko Sederhana | Moderate Risk |
| `risk_tinggi` | Risiko Tinggi | High Risk |
| `risk_kritikal` | Risiko Kritikal | Critical Risk |

---

### Project 04 — Kewangan Islam: Pilihan Bijak, Masa Depan Beretika (Islamic Finance Quiz)

**UI & Navigation**

| Key | BM | English |
|---|---|---|
| `idle_title_1` | KEWANGAN ISLAM | ISLAMIC FINANCE |
| `idle_title_2` | Pilihan Bijak, Masa Depan Beretika | Smart Choices, An Ethical Future |
| `idle_teaser_1` | Adakah kewangan Islam hanya tentang mengelak riba? | Is Islamic finance only about avoiding interest? |
| `idle_teaser_2` | Siapa yang menanggung risiko dalam kewangan Islam? | Who bears risk in Islamic finance? |
| `idle_teaser_3` | Apakah tujuan sebenar institusi kewangan Islam? | What is the real purpose of Islamic financial institutions? |
| `idle_cta` | Sentuh untuk Memulakan Cabaran | Touch to Begin the Challenge |
| `intro_body` | Uji kefahaman anda tentang prinsip dan nilai kewangan Islam melalui 6 soalan cabaran. Pilihan anda mencerminkan pemahaman anda. | Test your understanding of Islamic finance principles and values through 6 challenge questions. Your choices reflect your understanding. |
| `btn_start_challenge` | Mulakan Cabaran | Begin the Challenge |
| `question_counter` | Soalan {n} / 6 | Question {n} / 6 |
| `multi_select_label` | (Boleh pilih lebih daripada satu jawapan) | (You may select more than one answer) |
| `btn_confirm_answer` | Sahkan Jawapan | Confirm Answer |
| `btn_next_question` | Soalan Seterusnya → | Next Question → |
| `btn_view_results` | Lihat Keputusan → | View Results → |
| `tally_heading` | Keputusan Anda | Your Result |
| `feedback_correct` | Tepat Sekali! | Spot On! |
| `feedback_partial` | Hampir! Tapi ada yang terlepas. | Almost! But you missed some. |
| `feedback_wrong` | Bukan Jawapan Yang Tepat. | That's Not Quite Right. |
| `btn_retry` | Cuba Lagi → | Try Again → |
| `btn_end` | Tamat | Finish |

**6 Quiz Questions**

| Key | BM | English |
|---|---|---|
| `q1_text` | Pada pandangan anda, apakah peranan sebenar kewangan Islam (pelaburan, simpanan, perbelanjaan)? | In your view, what is the true role of Islamic finance (investments, savings, spending)? |
| `q1_a` | Memaksimumkan keuntungan semata-mata | Maximising profit above all else |
| `q1_b` | Memberi manfaat kepada Masyarakat | Benefiting society |
| `q1_c` | Melindungi alam sekitar | Protecting the environment |
| `q1_d` | Memberi manfaat kepada masyarakat dan alam sekitar | Benefiting both society and the environment |
| `q1_feedback` | Kewangan Islam bukan sekadar menjana keuntungan. Lebih penting, ia perlu memberi kebaikan kepada manusia serta memelihara alam sekitar dengan mengutamakan pembiayaan projek mesra alam seperti tenaga hijau yang mengurangkan pencemaran. Inilah pendekatan yang seimbang dan lebih bermakna untuk jangka panjang. | Islamic finance is not just about generating profit. More importantly, it must bring benefit to people and preserve the environment — prioritising financing for eco-friendly projects such as green energy. This is a balanced, more meaningful approach for the long term. |
| `q2_text` | Dalam urusan kewangan Islam, apakah pendekatan paling adil untuk mengurus risiko? | In Islamic finance, what is the fairest approach to managing risk? |
| `q2_a` | Satu pihak menanggung semua risiko | One party bears all the risk |
| `q2_b` | Risiko disembunyikan atau tidak dijelaskan dengan telus | Risk is hidden or not disclosed transparently |
| `q2_c` | Risiko dikongsi secara adil antara semua pihak | Risk is shared fairly among all parties |
| `q2_d` | Risiko dielakkan sepenuhnya | Risk is avoided entirely |
| `q2_feedback` | Pendekatan kewangan yang adil bukan tentang memindahkan risiko kepada orang lain. Sebaliknya, ia menekankan tanggungjawab bersama, di mana setiap pihak berkongsi risiko secara telus dan saksama. Inilah asas kepada sistem kewangan Islam yang lebih seimbang dan beretika. | A fair financial approach is not about shifting risk onto others. Instead, it emphasises shared responsibility — where every party shares risk transparently and equitably. This is the foundation of a more balanced and ethical Islamic financial system. |
| `q3_text` | Apakah jenis aktiviti ekonomi yang paling wajar disokong? | What type of economic activity is most appropriate to support? |
| `q3_a` | Aktiviti spekulatif untuk keuntungan pantas | Speculative activities for quick gains |
| `q3_b` | Aktiviti yang boleh memudaratkan Masyarakat | Activities that may harm society |
| `q3_c` | Aktiviti yang memenuhi keperluan sebenar seperti perumahan, perniagaan dan perkhidmatan | Activities that meet real needs — housing, business, and essential services |
| `q3_d` | Apa sahaja aktiviti asalkan pulangannya tinggi | Any activity, as long as the return is high |
| `q3_feedback` | Kewangan Islam bukan sekadar mencari keuntungan, tetapi mementingkan keberkatan dan manfaat. Ia menyokong aktiviti yang memenuhi keperluan sebenar manusia dan memberi kebaikan kepada masyarakat — bukan spekulasi semata-mata. | Islamic finance is not just about seeking profit — it values blessing and genuine benefit. It supports activities that meet real human needs and contribute to the community's wellbeing, not mere speculation. |
| `q4_text` | Dalam kewangan Islam, apakah prinsip paling penting dalam sesuatu transaksi? | In Islamic finance, what is the most important principle in any transaction? |
| `q4_a` | Ketidakpastian tinggi (gharar) dibenarkan | High uncertainty (gharar) is permitted |
| `q4_b` | Riba (faedah) dibenarkan | Interest (riba) is permitted |
| `q4_c` | Ketelusan dan keadilan dalam kontrak | Transparency and fairness in contracts |
| `q4_d` | Keuntungan tanpa usaha | Profit without effort |
| `q4_feedback` | Dalam kewangan Islam, setiap transaksi perlu jelas, telus dan adil kepada semua pihak. Tiada unsur tersembunyi atau mengambil kesempatan. Inilah asas yang memastikan urusan kewangan lebih beretika dan diberkati. | In Islamic finance, every transaction must be clear, transparent, and fair to all parties. There is no room for hidden terms or exploitation. This is the foundation that makes financial dealings more ethical and blessed. |
| `q5_text` | Mengapakah aktiviti seperti perjudian dan spekulasi tidak dibenarkan dalam kewangan Islam? | Why are activities like gambling and speculation not permitted in Islamic finance? |
| `q5_a` | Kerana ia memberikan pulangan yang rendah | Because they produce low returns |
| `q5_b` | Kerana ia melibatkan ketidaktentuan dan bergantung kepada nasib | Because they involve uncertainty and depend on chance |
| `q5_c` | Kerana ia memerlukan modal yang besar | Because they require large capital |
| `q5_d` | Kerana ia sukar difahami | Because they are difficult to understand |
| `q5_feedback` | Aktiviti seperti perjudian dan spekulasi dilarang kerana bergantung kepada nasib semata-mata dan tidak berasaskan aktiviti ekonomi sebenar. Ini boleh membawa ketidakadilan serta risiko yang tidak seimbang kepada pihak terlibat. | Activities like gambling and speculation are prohibited because they depend purely on chance and are not grounded in real economic activity. They can lead to injustice and imbalanced risk for all parties involved. |
| `q6_text` | Apakah peranan sebenar institusi kewangan Islam dalam ekonomi? | What is the true role of Islamic financial institutions in the economy? |
| `q6_a` | Mengejar keuntungan semata-mata | Pursuing profit above all else |
| `q6_b` | Menyokong ekonomi sebenar secara beretika | Supporting the real economy in an ethical manner |
| `q6_c` | Menggalakkan aktiviti spekulasi | Encouraging speculative activities |
| `q6_d` | Tidak terlibat dalam pembangunan masyarakat | Not involved in community development |
| `q6_feedback` | Institusi kewangan Islam memainkan peranan membantu pertumbuhan ekonomi yang sihat — menyokong perniagaan, mencipta peluang pekerjaan, dan menyumbang kepada kesejahteraan masyarakat, dengan pendekatan yang beretika dan bertanggungjawab. | Islamic financial institutions play a vital role in promoting healthy economic growth — supporting businesses, creating employment, and contributing to community wellbeing through an ethical and responsible approach. |

**Score Tiers**

| Key | BM | English |
|---|---|---|
| `tier_low_headline` | Oh-oh! Masih banyak ruang boleh dibaiki — jom, cuba lagi! | Oh no! There is plenty of room to improve — give it another try! |
| `tier_low_body` | Masih banyak yang boleh diterokai tentang kewangan berasaskan nilai. Cuba lagi — setiap pilihan membawa anda lebih dekat kepada pemahaman yang lebih baik! | There is still much to discover about values-based finance. Try again — every choice brings you closer to a deeper understanding! |
| `tier_mid_headline` | Anda di landasan yang betul! | You're on the right track! |
| `tier_mid_body` | Anda sudah mula memahami konsep kewangan yang adil, tetapi masih ada ruang untuk diperkukuh. Teruskan bermain dan cabar diri untuk capai tahap seterusnya! | You're starting to grasp the concepts of fair finance, but there is still room to strengthen your knowledge. Keep exploring and challenge yourself to reach the next level! |
| `tier_high_headline` | Tahniah! Anda bakal jadi 'Game Changer' dalam dunia kewangan masa depan! | Congratulations! You could be a real Game Changer in the future of finance! |
| `tier_high_body` | Anda memahami prinsip kewangan Islam dan nilai keseimbangannya dengan baik. | You have a strong understanding of Islamic finance principles and their balanced values. |

---

### Project 05 — AR Puzzle: Imbas & Hidup Bersama Lukisan

**Landing Page & Instructions**

| Key | BM | English |
|---|---|---|
| `landing_heading` | Imbas & Hidup Bersama Lukisan | Scan & Bring the Artwork to Life |
| `landing_subheading` | Pilih lukisan yang anda susun: | Choose the artwork you have assembled: |
| `artwork_1_title` | Rhythm of Nationality | Rhythm of Nationality |
| `artwork_1_artist` | Kong Kien Choong | Kong Kien Choong |
| `artwork_2_title` | Unity in Diversity Series 2 | Unity in Diversity Series 2 |
| `artwork_2_artist` | ArtJamila / Wan Jamila Wan Shaiful Bahri | ArtJamila / Wan Jamila Wan Shaiful Bahri |

**Puzzle Station Instructions**

| Key | BM | English |
|---|---|---|
| `puzzle_step_1` | Susun semula jalur magnetik untuk membentuk gambar lukisan. | Rearrange the magnetic strips to form the complete artwork image. |
| `puzzle_step_2` | Apabila gambar lengkap, imbas menggunakan telefon bimbit anda. | Once complete, scan the image using your mobile phone. |
| `puzzle_step_3` | Lihat lukisan ini menjadi hidup melalui animasi! | Watch the artwork come to life through animation! |
| `puzzle_step_4` | Imbas kod QR untuk melihat rupa lukisan ini. | Scan the QR code to see what the complete artwork looks like. |
| `puzzle_station_title` | Mari Susun Bersama! | Let's Assemble Together! |

**AR Interface**

| Key | BM | English |
|---|---|---|
| `ar_loading` | Memuat... / Sila benarkan akses kamera | Loading... / Please allow camera access |
| `ar_scanning_prompt` | Imbas lukisan anda untuk melihat animasi! | Scan your artwork to see the animation! |
| `ar_target_found` | Lukisan ini hidup! ✨ | The artwork is alive! ✨ |
| `ar_target_lost` | Kamera terlepas — imbas semula | Camera lost — please scan again |
| `btn_info` | Maklumat | Info |
| `btn_reference` | Rujukan | Reference |
| `btn_close` | Tutup | Close |
| `ref_page_heading` | Rujukan Susunan Puzzle | Puzzle Assembly Reference |
| `ref_page_caption` | Susun jalur magnetik mengikut gambar di atas | Arrange the magnetic strips to match the image above |

**Artwork 1 — Rhythm of Nationality: Info Panel**

| Key | BM | English |
|---|---|---|
| `a1_title` | Rhythm of Nationality | Rhythm of Nationality |
| `a1_label` | Lukisan ini menonjolkan ampaian kain tradisional yang sering dilihat di halaman rumah di Malaysia. Disokong oleh dahan kayu yang dipacak kukuh ke tanah, setiap kain yang tergantung memaparkan corak yang mewakili pelbagai budaya dan tradisi di Malaysia. | This painting depicts the hanging of traditional fabrics — a common sight in Malaysian backyards. Supported by wooden poles firmly anchored in the ground, each piece of cloth displays patterns representing Malaysia's diverse cultures and traditions. |
| `a1_description` | Gabungan pelbagai kain bercorak dalam lukisan ini meraikan perpaduan dalam kekayaan dan keindahan budaya masyarakat majmuk di Malaysia. | The combination of patterned fabrics in this painting celebrates unity amidst the richness and beauty of Malaysia's multicultural society. |
| `a1_kids_q1` | Berapa warna yang kamu nampak pada kain-kain dalam lukisan ini? | How many colours can you spot on the fabrics in this painting? |
| `a1_kids_q2` | Pernahkah kamu tengok kain dijemur macam ni? Di mana? | Have you ever seen clothes hung up like this? Where? |
| `a1_kids_q3` | Kain mana yang paling kamu suka? Kenapa? | Which fabric is your favourite? Why? |
| `a1_kids_q4` | Apa yang berlaku kalau kita semua berkongsi sesuatu bersama-sama? | What happens when we all share something together? |
| `a1_activity` | Cuba lukis corak kain sendiri! Gunakan warna-warna kegemaran kamu. | Try drawing your own fabric pattern! Use your favourite colours. |

**Artwork 2 — Unity in Diversity Series 2: Info Panel**

| Key | BM | English |
|---|---|---|
| `a2_title` | Unity in Diversity Series 2 | Unity in Diversity Series 2 |
| `a2_label` | Diinspirasikan daripada Jalur Gemilang yang berkibar, lukisan ini menggabungkan elemen bendera dengan gambaran wanita yang rambutnya turut menunjukkan warna dan corak yang sama. Ia melambangkan identiti dan semangat rakyat Malaysia yang dikongsi bersama. | Inspired by the waving Jalur Gemilang, this painting combines elements of the flag with depictions of women whose hair mirrors the same colours and patterns. It symbolises the shared identity and spirit of the Malaysian people. |
| `a2_kids_q1` | Apa yang kamu nampak dalam lukisan ini? | What do you see in this painting? |
| `a2_kids_q2` | Kenapa rambut wanita-wanita ini mempunyai warna bendera Malaysia? | Why do the women's hair have the colours of the Malaysian flag? |
| `a2_kids_q3` | Apa perasaan kamu bila tengok lukisan ini? | How does this painting make you feel? |
| `a2_activity` | Kira berapa ramai wanita yang ada dalam lukisan ini! | Count how many women are in this painting! |

---

### Project 06 — Bina Semula Simpanan Bersama (Collective Savings Visualisation)

**Wall Display Text**

| Key | BM | English |
|---|---|---|
| `wall_title` | Bina Semula Simpanan Bersama | Rebuilding Our Savings Together |
| `wall_intro` | Pilih jawapan yang betul bagi setiap soalan. Setiap jawapan yang tepat akan mengaktifkan cahaya pada kapsul digital dan membentuk satu garisan yang menghubungkan antara dua titik. Semakin banyak jawapan yang betul, semakin lengkap sambungan yang terhasil. Lihat bagaimana pilihan kewangan yang bijak dapat menghubungkan individu, komuniti dan masa depan kita bersama. | Choose the correct answer for each question. Each right answer activates a light in a digital capsule and draws a connecting line between two points. The more correct answers, the more complete the network becomes. See how smart financial choices connect individuals, communities, and our shared future. |
| `wall_visitor_count` | {n} pengunjung hari ini | {n} visitors today |
| `wall_network_complete` | Komuniti kita bersatu! | Our community is united! |
| `wall_new_session` | SESI BAHARU | NEW SESSION |

**Console Welcome Screen**

| Key | BM | English |
|---|---|---|
| `console_title` | Bina Semula Simpanan Bersama | Rebuilding Our Savings Together |
| `console_subtitle` | Jawab 10 soalan mudah tentang pengurusan kewangan peribadi. | Answer 10 simple questions about personal financial management. |
| `console_cta_desc` | Setiap jawapan yang betul akan menyalakan satu titik pada paparan dinding. | Each correct answer lights up a node on the wall display. |
| `btn_start` | MULA / TAP TO BEGIN | START / TAP TO BEGIN |

**Console Question Feedback**

| Key | BM | English |
|---|---|---|
| `answer_correct_label` | Betul! | Correct! |
| `answer_continue_label` | Teruskan! | Keep Going! |
| `question_counter` | Soalan {n} daripada 10 | Question {n} of 10 |

**Console Thank You Screen**

| Key | BM | English |
|---|---|---|
| `thankyou_title` | Terima kasih! | Thank you! |
| `thankyou_score` | Anda menjawab {score} daripada 10 soalan dengan betul. | You answered {score} out of 10 questions correctly. |
| `closing_message` | Bersama kita membina komuniti yang lebih berdaya tahan melalui kesedaran kewangan. Setiap keputusan kewangan yang bijak, walaupun kecil, membantu mewujudkan masyarakat yang lebih stabil, bersedia menghadapi cabaran dan mampu berkembang ke arah masa depan yang lebih harmoni. | Together we build a more resilient community through financial awareness. Every smart financial decision — no matter how small — helps create a more stable society, ready to face challenges and grow toward a more harmonious future. |
| `btn_restart` | Mulakan semula | Start Again |

**10 Console Questions**

| Key | BM Question | English Question | BM Option A (Correct) | English Option A | BM Option B | English Option B |
|---|---|---|---|---|---|---|
| `q1` | Adakah anda mempunyai wang simpanan untuk digunakan disaat-saat kecemasan? | Do you have savings set aside for emergencies? | Ya, saya mempunyai simpanan kecemasan | Yes, I have emergency savings | Belum, tetapi saya ingin memulakannya | Not yet, but I want to start |
| `q2` | Bagaimana anda mengawal perbelanjaan harian? | How do you manage your daily spending? | Saya merancang perbelanjaan mengikut bajet | I plan my spending according to a budget | Saya masih berbelanja tanpa perancangan tetap | I still spend without a fixed plan |
| `q3` | Adakah anda merekod simpanan dan perbelanjaan? | Do you track your savings and expenses? | Ya, saya sentiasa memantau kewangan saya | Yes, I always monitor my finances | Tidak, saya jarang merekod perbelanjaan saya | No, I rarely track my spending |
| `q4` | Bagaimana anda mengurus simpanan kewangan? | How do you manage your savings? | Saya menetapkan jumlah simpanan tetap | I set aside a fixed savings amount regularly | Saya menyimpan jika ada lebihan wang | I save only if there is money left over |
| `q5` | Adakah anda menggunakan aplikasi digital untuk mengurus kewangan? | Do you use digital tools to manage your finances? | Ya, aplikasi membantu saya memantau kewangan | Yes, apps help me monitor my finances | Tidak, saya masih menggunakan cara biasa dengan mencatat di buku nota | No, I still use a notebook to record things |
| `q6` | Bagaimana anda membuat keputusan sebelum membeli sesuatu? | How do you decide before making a purchase? | Saya membeli mengikut keperluan dan kemampuan | I buy based on need and affordability | Saya membeli berdasarkan kehendak semasa | I buy based on what I feel like at the time |
| `q7` | Adakah anda mempunyai matlamat simpanan tertentu? | Do you have specific savings goals? | Ya, saya menyimpan untuk masa hadapan | Yes, I save for the future | Belum, saya belum menetapkan matlamat simpanan | Not yet — I haven't set any savings goals |
| `q8` | Jika berlaku kecemasan hari ini, adakah anda bersedia? | If an emergency happened today, would you be ready? | Ya, saya mempunyai persediaan kewangan | Yes, I have financial preparations in place | Tidak, saya perlu memperbaiki simpanan saya | No, I need to improve my savings |
| `q9` | Bagaimana anda melihat kepentingan simpanan? | How do you view the importance of saving? | Simpanan penting untuk kestabilan masa depan | Savings are essential for future stability | Saya masih sedang belajar menguruskan simpanan | I am still learning how to manage savings |
| `q10` | Bagaimana kewangan dapat menyatukan masyarakat? | How can financial behaviour bring a community together? | Pengurusan kewangan yang baik membantu kesejahteraan bersama | Good financial management supports collective wellbeing | Kesedaran kewangan perlu dipertingkatkan dalam masyarakat | Financial awareness still needs to be improved in our community |

---

*Document version 1.0 — Festival Hari Museum Antarabangsa 2026*
*Prepared for developer team via Claude Code*
*All 6 project PICs: Nadia (P1, P3), Atikah (P2, P6), Amru (P4), Melor/Amira (P5)*
