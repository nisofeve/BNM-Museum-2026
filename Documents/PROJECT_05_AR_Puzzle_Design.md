# PROJECT 5 — AR Puzzle: Imbas & Hidup Bersama Lukisan

**PIC:** Melor / Amira
**Format:** HTML5 AR Mobile Web
**Language:** Bahasa Malaysia
**Technology:** MindAR.js / AR.js + A-Frame
**Date:** June 2026

---

## 1. Project Overview

Visitors to the museum exhibition physically assemble magnetic puzzle strips to reconstruct two artworks. Once assembled, they scan the completed puzzle using their mobile phone camera. The AR system recognises the reconstructed image and overlays a real-time animation layer that brings the artwork to life — fabric swaying, flag colours rippling, poem text fading in, and particle effects filling the canvas.

No app installation is required. The experience runs entirely in the mobile browser (Chrome on Android, Safari on iOS) via a QR code entry point.

**Artworks covered:**

| # | Artwork | Artist | Medium |
|---|---------|--------|--------|
| 1 | Rhythm of Nationality (2004) | Kong Kien Choong | Mixed media on canvas, 150 × 132 cm |
| 2 | Unity in Diversity Series 2 (2017) | ArtJamila / Wan Jamila Wan Shaiful Bahri | Ink, 39 × 56 cm |

**Deliverables:**
- 2 × AR experience pages (one per artwork)
- 2 × QR reference pages (puzzle assembly reference image)
- 1 × Landing/entry page
- Supporting assets: compiled `.mind` image targets, CSS animation layers, A-Frame scene configs

---

## 2. Technical Stack

### Core AR Framework

| Component | Library / Tool | Version |
|-----------|----------------|---------|
| Image tracking | MindAR.js | v1.2.x |
| 3D/2D scene | A-Frame | v1.4.x |
| Image target compiler | MindAR Image Target Compiler (CLI / Web) | Latest |
| CSS animation engine | Native CSS3 + Web Animations API | — |
| QR code generation | qrcode.js | v1.5.x |

### Why MindAR.js over AR.js

MindAR.js uses NFT (Natural Feature Tracking) based on TensorFlow.js — it tracks arbitrary image targets (photos, artworks, printed puzzle assemblies) without printed AR markers. This is critical because the "target" is the assembled puzzle itself, not a marker card.

AR.js NFT mode is an alternative but MindAR.js offers better performance on mobile and simpler A-Frame integration.

### Browser Compatibility

| Browser | Platform | Status |
|---------|----------|--------|
| Chrome 90+ | Android | Fully supported |
| Safari 15+ | iOS 15+ | Supported (requires HTTPS) |
| Firefox | Android | Partial (test required) |
| Samsung Internet | Android | Supported |

**Critical iOS requirement:** The page MUST be served over HTTPS. Camera permission prompt behaves differently on iOS Safari — do not attempt `getUserMedia` on HTTP. Use a self-signed cert with a local HTTPS reverse proxy (Caddy or nginx) for local exhibition deployment, or host on GitHub Pages / Netlify for cloud deployment.

### Mobile Web AR Stack Detail

```
User scans QR code
        ↓
Landing page (index.html) — BM language, artwork selector
        ↓
AR page loads (ar-artwork-1.html or ar-artwork-2.html)
        ↓
MindAR.js initialises webcam feed (rear camera)
        ↓
.mind image target file loaded (precompiled asset)
        ↓
Camera feed rendered full-screen as video element
        ↓
A-Frame scene overlaid (transparent canvas on top)
        ↓
Image target detected → A-Frame entities made visible
        ↓
CSS/JS animations begin on overlay elements
        ↓
User views animated artwork through phone screen
```

### Image Target Preparation Workflow

1. **Source image:** High-resolution scan of the assembled puzzle (or the original artwork reproduction at print resolution, minimum 300 DPI, saved as PNG or JPEG)
2. **MindAR compiler:** Upload image to https://hiukim.github.io/mind-ar-js-doc/tools/compile or use CLI:
   ```bash
   npx mind-ar-js-compiler --input artwork1.jpg --output artwork1.mind
   ```
3. **Quality check:** MindAR compiler outputs a feature point visualisation. Aim for 400+ feature points distributed across the image. Dense areas of colour variation (the fabric patterns in Artwork 1, the detailed ink work in Artwork 2) are ideal targets.
4. **Multiple scale versions:** Compile the target at the physical puzzle size, not just the digital reproduction. Feature density must match what the camera sees at 30–50 cm distance (typical phone-to-puzzle distance).
5. **Output:** `artwork1.mind` and `artwork2.mind` binary files, served as static assets.

**Image quality requirements for reliable tracking:**
- Minimum 800 × 600 px source image
- Rich texture variety (both artworks qualify — avoid plain/flat colour regions)
- High contrast between elements
- Avoid glare on physical puzzle surface — use matte lamination on puzzle strips

---

## 3. Application Architecture

```
/project-05-ar/
├── index.html                    ← Landing page (artwork selector)
├── ar-artwork-1.html             ← AR experience: Rhythm of Nationality
├── ar-artwork-2.html             ← AR experience: Unity in Diversity Series 2
├── ref-artwork-1.html            ← QR reference page: puzzle assembly guide (Artwork 1)
├── ref-artwork-2.html            ← QR reference page: puzzle assembly guide (Artwork 2)
├── assets/
│   ├── targets/
│   │   ├── artwork1.mind         ← Compiled MindAR image target
│   │   └── artwork2.mind         ← Compiled MindAR image target
│   ├── images/
│   │   ├── artwork1-reference.jpg  ← Full artwork reference image
│   │   ├── artwork2-reference.jpg
│   │   ├── artwork1-overlay-*.png  ← Animation layer PNGs (fabric, kain motifs)
│   │   └── artwork2-overlay-*.png  ← Animation layer PNGs (flag elements, figures)
│   ├── audio/
│   │   ├── artwork1-ambient.mp3  ← Gentle ambient music (Artwork 1)
│   │   └── artwork2-ambient.mp3  ← National/flag theme ambient (Artwork 2)
│   ├── css/
│   │   ├── ar-overlay.css        ← AR UI chrome, info panels
│   │   └── animations.css        ← All CSS keyframe animations
│   └── js/
│       ├── ar-controller.js      ← MindAR initialisation, target found/lost handlers
│       ├── animation-artwork1.js ← Fabric/cloth animation logic
│       └── animation-artwork2.js ← Flag/wave animation logic
└── qr/
    ├── qr-ar1.png               ← QR code linking to ar-artwork-1.html
    ├── qr-ar2.png               ← QR code linking to ar-artwork-2.html
    ├── qr-ref1.png              ← QR code linking to ref-artwork-1.html
    └── qr-ref2.png              ← QR code linking to ref-artwork-2.html
```

### Page Relationships

```
Physical QR code (at puzzle station)
    │
    ├── ar-artwork-1.html ←→ assets/targets/artwork1.mind
    │       └── ref-artwork-1.html (link from info panel)
    │
    └── ar-artwork-2.html ←→ assets/targets/artwork2.mind
            └── ref-artwork-2.html (link from info panel)
```

### MindAR.js + A-Frame Initialisation Pattern

```html
<!-- ar-artwork-1.html skeleton -->
<a-scene
  mindar-image="imageTargetSrc: ./assets/targets/artwork1.mind;
                autoStart: false;
                uiLoading: no;
                uiError: no;
                uiScanning: no"
  color-space="sRGB"
  renderer="colorManagement: true; physicallyCorrectLights: true"
  vr-mode-ui="enabled: false"
  device-orientation-permission-ui="enabled: false"
>
  <a-camera position="0 0 0" look-controls="enabled: false" cursor="fuse: false; rayOrigin: mouse;"></a-camera>

  <a-entity mindar-image-target="targetIndex: 0">
    <!-- All AR overlay elements parented here -->
    <!-- They become visible when target is found -->
    <a-plane id="fabricLayer1" ...</a-plane>
    <a-plane id="poemOverlay" ...</a-plane>
    <a-entity id="lightPulse" ...</a-entity>
  </a-entity>
</a-scene>
```

---

## 4. UI/UX Design Specification

### Design Principles

- **Mobile-first, full-screen:** The camera feed occupies 100% of the viewport. All UI overlaid on top.
- **Minimal chrome:** No visible browser UI (use `meta name="viewport"` with `user-scalable=no`). Encourage full-screen mode.
- **Cultural warmth:** UI palette draws from the artworks — earthy reds, batik golds, and flag blues. Nothing clinical or tech-heavy.
- **Single-handed use:** All interactive touch targets ≥ 44 × 44 px. Designed for user holding phone with one hand while viewing puzzle with the other.
- **Graceful degradation:** If image target is lost, overlay dims but does not vanish abruptly.

### Colour Palette

| Role | Colour | Hex |
|------|--------|-----|
| Background (landing) | Deep charcoal | `#1A1208` |
| Accent / highlight | Batik gold | `#C8960C` |
| Secondary accent | Warm terracotta | `#C05530` |
| Text primary | Off-white | `#F5EFE0` |
| Text secondary | Muted sand | `#B8A88A` |
| AR scan ring | Golden amber | `#E8B84B` |
| Flag red (Artwork 2) | Jalur Gemilang red | `#CC0001` |
| Flag blue (Artwork 2) | Jalur Gemilang blue | `#003893` |
| Flag yellow (Artwork 2) | Jalur Gemilang yellow | `#FFCC00` |
| Overlay dark | Semi-transparent black | `rgba(0,0,0,0.65)` |

### Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Heading (BM) | Georgia / Noto Serif | 22px | 700 |
| Body (BM) | Noto Sans | 15px | 400 |
| Poem text | Noto Serif Italic | 14px | 400 |
| Label/UI | Noto Sans | 12px | 500 |
| Puzzle instructions | Noto Sans | 16px | 600 |

### Layout Zones (AR View)

```
┌─────────────────────────────────────┐
│  [Status bar: hidden / fullscreen]  │
│                                     │
│   CAMERA FEED (full screen)         │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  AR OVERLAY (A-Frame scene) │    │
│  │  (visible when target found)│    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌───────┐              ┌────────┐  │
│  │ [i]   │              │  [?]   │  │
│  │ Info  │              │  Ref   │  │
│  └───────┘              └────────┘  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  Scanning indicator /       │    │
│  │  "Imbas lukisan anda..."    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Info Panel (slides up from bottom on [i] tap)

```
┌─────────────────────────────────────┐
│ ╳ Tutup                             │
│                                     │
│ [Artwork title in BM]               │
│ [Artist name] | [Year] | [Medium]   │
│ ─────────────────────────────────   │
│ [Interpretive label text]           │
│ ─────────────────────────────────   │
│ [Poem in BM — formatted]            │
│ ─────────────────────────────────   │
│ [Poem in English — formatted]       │
│ ─────────────────────────────────   │
│ [Kids' label questions]             │
│                                     │
└─────────────────────────────────────┘
```

---

## 5. Screen-by-Screen Design

### Screen 1: Landing Page (index.html)

**Purpose:** Entry point after visitor scans the general station QR code. Visitor selects which artwork they are working on.

**Layout:**
- Full-screen dark background (`#1A1208`)
- Museum logo / exhibition title top centre
- Heading: "Imbas & Hidup Bersama Lukisan"
- Subheading: "Pilih lukisan yang anda susun:"
- Two large artwork thumbnail cards:
  - Card 1: "Rhythm of Nationality" — Kong Kien Choong
  - Card 2: "Unity in Diversity Series 2" — ArtJamila
- Each card: thumbnail image (cropped), title, artist name, arrow icon
- Footer: Museum branding, language toggle (not critical for v1)

**Interaction:** Tapping a card navigates to the respective AR page.

### Screen 2: AR View — Artwork 1 (ar-artwork-1.html)

**Loading state:**
- Camera permission prompt (browser native)
- Custom loading screen: dark background, animated MindAR scan ring, text "Memuat... / Sila benarkan akses kamera"
- Progress: `mindar-image` fires `arReady` event → hide loading screen, show camera feed

**Scanning state (target not yet found):**
- Full camera feed
- Animated scanning frame (4-corner golden brackets, pulsing)
- Bottom banner: "Imbas lukisan anda untuk melihat animasi!"
- [i] button (bottom-left): opens Info Panel
- [?] button (bottom-right): links to ref-artwork-1.html

**AR Active state (target found):**
- Camera feed continues
- A-Frame overlay renders on top of detected puzzle:
  - Fabric layer animations (see Section 7)
  - Poem text overlay (see Section 7)
  - Warm light pulse effect
- Bottom banner fades to: "Lukisan ini hidup! ✨"
- Scanning frame hides
- Audio autoplay attempt (muted first, then unmute prompt if autoplay blocked)

**Info Panel (slide-up sheet):**
Full interpretive label content:

> "Lukisan ini menonjolkan ampaian kain tradisional yang sering dilihat di halaman rumah di Malaysia. Disokong oleh dahan kayu yang dipacak kukuh ke tanah, setiap kain yang tergantung memaparkan corak yang mewakili pelbagai budaya dan tradisi di Malaysia."

Then poem (BM), poem (English), Kids' label section (see Section 6).

**Target Lost state:**
- Overlay fades to 30% opacity
- Banner: "Kamera terlepas — imbas semula"
- Overlay restores immediately when target re-detected

### Screen 3: AR View — Artwork 2 (ar-artwork-2.html)

Identical structure to Screen 2, with Artwork 2 content, animation layer, and `artwork2.mind` target.

Unique elements:
- Flag-wave animation overlay instead of fabric sway
- Crescent/star sparkle elements
- Colour wave particle effect in flag colours
- Kids' label: count-the-figures activity

### Screen 4: QR Reference Page — Artwork 1 (ref-artwork-1.html)

**Purpose:** Visitors scan a second QR code (at the puzzle station) to see the complete reference image of the artwork, helping them assemble the puzzle strips correctly.

**Layout:**
- Dark background
- Header: "Rujukan Susunan Puzzle"
- Large reference image (artwork1-reference.jpg) — fills most of screen
- Zoom/pinch enabled
- Caption: "Susun jalur magnetik mengikut gambar di atas"
- Back button: returns to ar-artwork-1.html
- Second QR code displayed: "Imbas untuk melihat animasi" → links to AR page

### Screen 5: QR Reference Page — Artwork 2 (ref-artwork-2.html)

Same structure as Screen 4 with Artwork 2 content.

---

## 6. Content Specification

### Puzzle Station Label Text (both artworks)

**Bahasa Malaysia:**
```
Mari Susun Bersama!

1. Susun semula jalur magnetik untuk membentuk gambar lukisan.
2. Apabila gambar lengkap, imbas menggunakan telefon bimbit anda.
3. Lihat lukisan ini menjadi hidup melalui animasi!
4. Imbas kod QR untuk melihat rupa lukisan ini.
```

---

### Artwork 1: Rhythm of Nationality

**Artwork metadata:**
- Tajuk: Rhythm of Nationality
- Tahun: 2004
- Medium: Mixed media on canvas
- Saiz: 150 × 132 cm
- Artis: Kong Kien Choong (b. 1982, Kuala Lumpur)

**Interpretive Label:**
```
Lukisan ini menonjolkan ampaian kain tradisional yang sering dilihat di halaman
rumah di Malaysia. Disokong oleh dahan kayu yang dipacak kukuh ke tanah, setiap
kain yang tergantung memaparkan corak yang mewakili pelbagai budaya dan tradisi
di Malaysia.
```

**Description:**
```
Gabungan pelbagai kain bercorak dalam lukisan ini meraikan perpaduan dalam
kekayaan dan keindahan budaya masyarakat majmuk di Malaysia.
```

**Poem (Bahasa Malaysia):**
```
Tiada jurang antara kaum yang berbeza,
Kita hidup dalam keharmonian sempurna,
Hati kita saling terikat erat,
Seperti kain-kain di ampaian,
Dengan inspirasi yang teguh dipegang,
Segala-galanya berkembang,
Irama memimpin kita,
Merentas setiap insan,
Meresap ke setiap ruang,
Ia menari, ia hidup,
Kita bayangkan tempat yang indah,
Semoga Malaysia terus kekal indah dalam keharmonian yang sempurna
```

**Poem (English):**
```
There is no gap between different race,
We exist in perfect harmony,
Our heart link closely,
Like the clothes on the string,
Within our strong held inspiration,
Everything arise,
Rhythm lead us,
Shuttle through everyone,
Shuttle into every single space,
Its dancing, its active,
We foresee a beautiful place,
Hope, Malaysia continue its beauty in perfect harmony
```

**Kids' Label — 4 Reflection Questions + Activity:**
```
Soalan untuk anak-anak:

1. Berapa warna yang kamu nampak pada kain-kain dalam lukisan ini?
2. Pernahkah kamu tengok kain dijemur macam ni? Di mana?
3. Kain mana yang paling kamu suka? Kenapa?
4. Apa yang berlaku kalau kita semua berkongsi sesuatu bersama-sama?

Aktiviti:
Cuba lukis corak kain sendiri! Gunakan warna-warna kegemaran kamu.
```

---

### Artwork 2: Unity in Diversity Series 2

**Artwork metadata:**
- Tajuk: Unity in Diversity (Series 2)
- Tahun: 2017
- Medium: Ink
- Saiz: 39 × 56 cm
- Artis: ArtJamila / Wan Jamila Wan Shaiful Bahri (b. 2002, Kuala Lumpur) — artis autistik berbakat

**Interpretive Label:**
```
Diinspirasikan daripada Jalur Gemilang yang berkibar, lukisan ini menggabungkan
elemen bendera dengan gambaran wanita yang rambutnya turut menunjukkan warna dan
corak yang sama. Ia melambangkan identiti dan semangat rakyat Malaysia yang
dikongsi bersama. Lukisan ini juga menggambarkan kepelbagaian masyarakat Malaysia
serta semangat kemerdekaan, perpaduan, keharmonian, dan kekuatan sebagai satu
bangsa.
```

**Kids' Label — 3 Reflection Questions + Count Activity:**
```
Soalan untuk anak-anak:

1. Apa yang kamu nampak dalam lukisan ini?
2. Kenapa rambut wanita-wanita ini mempunyai warna bendera Malaysia?
3. Apa perasaan kamu bila tengok lukisan ini?

Aktiviti:
Kira berapa ramai wanita yang ada dalam lukisan ini!
```

---

## 7. Animation & VFX Specification

### Artwork 1 — Rhythm of Nationality: Animation Layers

#### Layer 1: Fabric Sway (CSS + A-Frame)

Each hanging cloth/fabric piece in the composition gets an independent A-Frame plane entity. The planes are positioned to align with the visible fabric strips in the artwork.

**CSS keyframe animation — fabric sway:**
```css
@keyframes fabricSway {
  0%   { transform: perspective(400px) rotateY(0deg) rotateX(0deg); }
  20%  { transform: perspective(400px) rotateY(3deg) rotateX(1deg); }
  40%  { transform: perspective(400px) rotateY(-2deg) rotateX(-0.5deg); }
  60%  { transform: perspective(400px) rotateY(4deg) rotateX(1.5deg); }
  80%  { transform: perspective(400px) rotateY(-1deg) rotateX(0deg); }
  100% { transform: perspective(400px) rotateY(0deg) rotateX(0deg); }
}
```

Each fabric element gets a slightly offset `animation-delay` (0s, 0.3s, 0.6s, 0.9s, 1.2s) so they do not sway in unison — gives organic wind-blown effect.

**A-Frame animation component alternative:**
```html
<a-plane
  id="fabric-strip-1"
  position="0 0.2 0"
  width="0.15" height="0.4"
  src="#fabric-texture-1"
  animation="property: rotation;
              from: 0 -3 0;
              to: 0 3 0;
              dur: 2500;
              easing: easeInOutSine;
              loop: true;
              dir: alternate"
  animation__sway2="property: rotation;
              from: -1 -3 0;
              to: 1 3 0;
              dur: 3200;
              easing: easeInOutSine;
              loop: true;
              dir: alternate"
></a-plane>
```

**Sine-wave oscillation via JavaScript (for smoother compound motion):**
```javascript
// In AFRAME.registerComponent tick handler
tick(time, timeDelta) {
  const t = time / 1000;
  const swayX = Math.sin(t * 0.8 + this.phase) * 3;  // degrees
  const swayZ = Math.sin(t * 1.1 + this.phase) * 1;
  this.el.object3D.rotation.x = THREE.MathUtils.degToRad(swayX);
  this.el.object3D.rotation.z = THREE.MathUtils.degToRad(swayZ);
}
```

#### Layer 2: Warm Light Pulse (Radial Gradient Overlay)

An A-Frame plane covering the full target area with a semi-transparent warm orange/amber radial gradient material. Opacity pulses between 0.05 and 0.25.

```css
@keyframes warmPulse {
  0%   { opacity: 0.05; }
  50%  { opacity: 0.22; }
  100% { opacity: 0.05; }
}

.warm-light-overlay {
  background: radial-gradient(ellipse at 50% 40%,
    rgba(230, 160, 50, 0.6) 0%,
    rgba(200, 120, 30, 0.3) 40%,
    transparent 70%);
  animation: warmPulse 3.5s ease-in-out infinite;
}
```

#### Layer 3: Poem Text Typewriter Fade-In

Poem appears as a 2D HTML overlay (not A-Frame — positioned as a fixed CSS overlay aligned to the AR area). Lines appear one by one with fade-in transition.

```javascript
const poemLines = [
  "Tiada jurang antara kaum yang berbeza,",
  "Kita hidup dalam keharmonian sempurna,",
  "Hati kita saling terikat erat,",
  // ... all 12 lines
];

let lineIndex = 0;
function showNextLine() {
  if (lineIndex >= poemLines.length) return;
  const line = document.createElement('p');
  line.textContent = poemLines[lineIndex];
  line.style.opacity = '0';
  line.style.transition = 'opacity 1.2s ease-in';
  poemContainer.appendChild(line);
  requestAnimationFrame(() => {
    line.style.opacity = '1';
  });
  lineIndex++;
  if (lineIndex < poemLines.length) {
    setTimeout(showNextLine, 2800);  // 2.8 seconds between lines
  }
}

// Trigger when AR target found
document.querySelector('a-scene').addEventListener('targetFound', () => {
  poemContainer.style.display = 'block';
  setTimeout(showNextLine, 2000);  // Start poem 2s after activation
});
```

**Poem overlay CSS:**
```css
#poem-overlay {
  position: fixed;
  bottom: 80px;
  left: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.6);
  border-left: 3px solid #C8960C;
  padding: 12px 16px;
  border-radius: 4px;
  display: none;
  max-height: 200px;
  overflow-y: auto;
}

#poem-overlay p {
  color: #F5EFE0;
  font-family: 'Noto Serif', serif;
  font-style: italic;
  font-size: 13px;
  line-height: 1.6;
  margin: 2px 0;
}
```

---

### Artwork 2 — Unity in Diversity Series 2: Animation Layers

#### Layer 1: Flag Wave / Hair-as-Flag Animation

CSS skew + translate animation simulating horizontal flag ripple. Applied to an A-Frame plane using the artwork as texture.

```css
@keyframes flagWave {
  0%   { transform: skewY(0deg) translateX(0px); }
  15%  { transform: skewY(1.5deg) translateX(2px); }
  30%  { transform: skewY(-0.5deg) translateX(-1px); }
  50%  { transform: skewY(2deg) translateX(3px); }
  70%  { transform: skewY(-1deg) translateX(-2px); }
  85%  { transform: skewY(1deg) translateX(1px); }
  100% { transform: skewY(0deg) translateX(0px); }
}

.flag-element {
  animation: flagWave 2.2s ease-in-out infinite;
  transform-origin: left center;
}
```

For the hair-as-flag motion, separate overlay planes positioned to align with each figure's hair are animated with a slight phase offset:
```javascript
const figures = document.querySelectorAll('.figure-hair-plane');
figures.forEach((el, i) => {
  el.style.animationDelay = `${i * 0.18}s`;
  el.style.animationDuration = `${2.0 + i * 0.15}s`;
});
```

#### Layer 2: Crescent & Star Sparkle

Two small A-Frame plane entities with crescent and star PNG textures (transparent background). Sparkle animation using scale and opacity keyframes:

```css
@keyframes starSparkle {
  0%   { transform: scale(1) rotate(0deg);   opacity: 0.8; }
  25%  { transform: scale(1.2) rotate(5deg); opacity: 1.0; }
  50%  { transform: scale(0.9) rotate(-3deg);opacity: 0.6; }
  75%  { transform: scale(1.15) rotate(8deg);opacity: 1.0; }
  100% { transform: scale(1) rotate(0deg);   opacity: 0.8; }
}

.crescent-star {
  animation: starSparkle 1.8s ease-in-out infinite;
}
```

#### Layer 3: "Malaysia" Text Pulse

A-Frame text entity rendering "Malaysia" in bold, positioned above the composition. Pulses in scale and opacity with a patriotic beat feel:

```html
<a-text
  id="malaysia-text"
  value="MALAYSIA"
  color="#FFCC00"
  align="center"
  position="0 0.6 0"
  scale="0.3 0.3 0.3"
  animation="property: scale;
              from: 0.28 0.28 0.28;
              to: 0.35 0.35 0.35;
              dur: 1500;
              easing: easeInOutSine;
              loop: true;
              dir: alternate"
  animation__opacity="property: components.material.material.opacity;
              from: 0.7;
              to: 1.0;
              dur: 1500;
              easing: easeInOutSine;
              loop: true;
              dir: alternate"
></a-text>
```

#### Layer 4: Colour Wave Particle Effect (Flag Colours)

JavaScript particle system using Canvas 2D API overlaid on the AR view. Particles spawn from the bottom, rise upward with slight horizontal drift, in flag colours.

```javascript
const FLAG_COLOURS = ['#CC0001', '#FFFFFF', '#FFCC00', '#003893'];

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = this.canvas.height + 10;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = -(Math.random() * 1.5 + 0.8);
    this.alpha = Math.random() * 0.6 + 0.3;
    this.size = Math.random() * 4 + 2;
    this.colour = FLAG_COLOURS[Math.floor(Math.random() * FLAG_COLOURS.length)];
    this.life = 0;
    this.maxLife = Math.random() * 180 + 120;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life > this.maxLife * 0.7) {
      this.alpha -= 0.012;
    }
    if (this.life > this.maxLife || this.alpha <= 0) this.reset();
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Initialise 60 particles, run RAF loop when target found
const particles = Array.from({ length: 60 }, () => new Particle(overlayCanvas));
let particlesActive = false;

function animateParticles() {
  if (!particlesActive) return;
  ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  particles.forEach(p => { p.update(); p.draw(ctx); });
  requestAnimationFrame(animateParticles);
}
```

### Image Tracking Confidence Handling

MindAR.js fires `targetFound` and `targetLost` events. Implement a confidence-based fade:

```javascript
const scene = document.querySelector('a-scene');
const overlayEntities = document.querySelectorAll('.ar-overlay-entity');

scene.addEventListener('targetFound', () => {
  overlayEntities.forEach(el => {
    el.setAttribute('visible', true);
    el.setAttribute('animation__appear',
      'property: components.material.material.opacity; from: 0; to: 1; dur: 600');
  });
  particlesActive = true;
  animateParticles();
  startPoemSequence();
});

scene.addEventListener('targetLost', () => {
  overlayEntities.forEach(el => {
    el.setAttribute('animation__disappear',
      'property: components.material.material.opacity; from: 1; to: 0.15; dur: 800');
  });
  particlesActive = false;
});
```

---

## 8. Audio Specification

### Artwork 1 — Ambient Audio

- **Concept:** Gentle ambient music evoking a breezy Malaysian kampung courtyard — soft angklung or gamelan texture, light wind ambience, occasional bird chirp.
- **Duration:** 90 seconds, looping seamlessly.
- **Format:** MP3, 128kbps, stereo. Mono acceptable for bandwidth.
- **File:** `assets/audio/artwork1-ambient.mp3`
- **Trigger:** Autoplay on page load (muted). On first user interaction (tap anywhere), unmute. Some browsers (especially iOS Safari) require a user gesture before audio plays — handle gracefully with a "tap to hear audio" prompt that disappears after first tap.

### Artwork 2 — Ambient Audio

- **Concept:** National pride theme — soft orchestral swell with Negaraku-adjacent melodic fragments (ensure copyright clearance; use original composition). Flag-waving energy, uplifting but not overwhelming.
- **Duration:** 90 seconds, looping.
- **File:** `assets/audio/artwork2-ambient.mp3`

### AR Trigger Sound Effect

- **Concept:** A soft "shimmer" sound — like pages of a book being blown, or a gentle magical activation chime. Not sci-fi, not too digital.
- **Duration:** 1.5 seconds, no loop.
- **File:** `assets/audio/ar-activate.mp3`
- **Trigger:** Plays once when `targetFound` event fires (with a 300ms debounce to avoid re-triggering rapidly).

### Poem Narration (Placeholder)

- **Requirement for future version:** Professional voice narration of both poems in Bahasa Malaysia, recorded by a native speaker.
- **File placeholders:** `assets/audio/poem1-narration.mp3`, `assets/audio/poem2-narration.mp3`
- **Trigger:** Narration plays after all poem lines are displayed, or as lines appear (synchronised).
- **For v1:** Audio is ambient music only; poem narration is text only.

---

## 9. Development Milestones

### Milestone 1: Image Target Preparation (Week 1)
**Goal:** Compile verified `.mind` files for both artworks.

- Obtain high-resolution reproductions of both artworks from museum/artist
- Test image quality in MindAR compiler (web tool first, then CLI)
- Verify feature point count ≥ 400 for each
- Print puzzle strips at actual scale on matte paper, re-test scanning at 30cm distance
- Verify tracking stability when puzzle is partially assembled (partial target tracking)
- **Deliverable:** `artwork1.mind`, `artwork2.mind`, sample tracking demo video

### Milestone 2: AR Framework Setup + Basic Overlay (Week 2)
**Goal:** Working AR page that detects target and shows a placeholder overlay.

- Set up project file structure
- Integrate MindAR.js + A-Frame via CDN or npm bundle
- Create `ar-artwork-1.html` with camera feed, target tracking, and a coloured placeholder A-Frame plane on target
- Implement `targetFound` / `targetLost` event handlers
- Test on Android Chrome and iOS Safari (HTTPS required)
- Set up local HTTPS dev server (e.g., `mkcert` + `http-server --ssl`)
- **Deliverable:** Scannable prototype, 2 test devices confirmed working

### Milestone 3: Animation Layer Implementation (Weeks 3–4)
**Goal:** All animation layers live and polished for both artworks.

- Artwork 1: Fabric sway animation, warm light pulse, poem text sequence
- Artwork 2: Flag wave animation, hair overlay planes, sparkle effect, particle system, Malaysia text pulse
- Audio integration (ambient + trigger sound)
- Test animation performance on mid-range Android devices (target 30fps minimum)
- **Deliverable:** Full AR experience for both artworks

### Milestone 4: UI Polish + Content Integration (Week 5)
**Goal:** All copy, labels, info panels, and reference pages complete.

- Landing page with artwork selector
- Info panel slide-up sheets with full interpretive labels and poems
- Kids' label sections formatted
- Reference pages (ref-artwork-1.html, ref-artwork-2.html)
- QR code generation for all 4 entry points
- Scanning state UI (animated scan brackets, status messages)
- **Deliverable:** All pages complete with final content

### Milestone 5: Device Testing + Exhibition Hardening (Week 6)
**Goal:** Stable, reliable experience for exhibition conditions.

- Test on minimum 5 device types (varied Android, iPhone SE, iPhone 15, Samsung mid-range)
- Test under exhibition lighting conditions (may differ from natural light)
- Implement graceful handling of: camera permission denied, low-light, partial puzzle assembly
- Add loading screen with progress indicator
- Verify audio autoplay handling on all platforms
- Test full visitor flow (scan QR → AR active → info panel → reference page)
- Performance profiling: ensure no frame drops on A-Frame scene with all layers active
- **Deliverable:** Exhibition-ready build, deployed to hosting URL, QR codes printed

---

## 10. Claude Code Implementation Notes

### MindAR.js Image Target Compilation

The `.mind` file is a binary format produced by the MindAR compiler. It must be compiled from the actual reference image that will be physically present in the environment (the assembled puzzle surface).

**CLI compilation:**
```bash
# Install
npm install mind-ar

# Compile single target
npx mind-ar-js compile --input ./source-images/artwork1.jpg --output ./assets/targets/artwork1.mind

# Verify output
# The compiler prints feature point statistics — confirm "Points: XXX" is > 400
```

**Web compiler:** https://hiukim.github.io/mind-ar-js-doc/tools/compile

**Important:** If the puzzle strips have a matte laminate finish, compile the target from a photo of the *actual physical assembled puzzle* rather than the digital source image. The physical surface texture and laminate affect feature point detection.

### A-Frame Entity Setup Pattern

```javascript
// Register custom MindAR + A-Frame component for animation control
AFRAME.registerComponent('ar-animation-controller', {
  schema: {
    artworkId: { type: 'string', default: '1' }
  },
  init() {
    this.isTracking = false;
    const scene = this.el.sceneEl;
    
    // MindAR target found/lost events bubble up to the scene
    scene.addEventListener('targetFound', this.onTargetFound.bind(this));
    scene.addEventListener('targetLost', this.onTargetLost.bind(this));
  },
  onTargetFound() {
    this.isTracking = true;
    this.el.setAttribute('visible', true);
    // Trigger artwork-specific animations
    if (this.data.artworkId === '1') {
      window.startArtwork1Animations();
    } else {
      window.startArtwork2Animations();
    }
  },
  onTargetLost() {
    this.isTracking = false;
    // Do NOT hide immediately — fade out over 800ms
    this.el.setAttribute('animation__fade',
      'property: object3D.children[0].material.opacity; to: 0.1; dur: 800');
  }
});
```

### CSS Overlay Positioning in AR

MindAR.js renders the camera feed and A-Frame canvas as stacked elements. To overlay HTML elements (poem text, UI buttons) correctly:

```css
/* Ensure AR scene is base layer */
a-scene {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
}

/* HTML overlays on top */
#ui-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 10;
  pointer-events: none;  /* Allow taps to pass through to AR */
}

/* Interactive elements need pointer-events re-enabled */
#info-button, #ref-button, #info-panel {
  pointer-events: all;
}
```

### Mobile Browser Compatibility

**iOS Safari known issues:**
1. `getUserMedia` requires HTTPS — no exceptions
2. Audio requires user gesture — implement muted autoplay + tap-to-unmute pattern
3. A-Frame `vr-mode-ui` must be disabled (already shown above)
4. Memory pressure on older iPhones — keep texture sizes under 2048×2048
5. `requestAnimationFrame` throttles in background tabs — acceptable behaviour

**Android Chrome known issues:**
1. Camera permission must be explicitly requested — handle denial gracefully
2. WebGL performance varies widely — test on mid-range devices
3. Some devices default to front camera — MindAR uses rear camera by default (correct)

**Implementation for camera constraints:**
```javascript
// MindAR respects these video constraints
const constraints = {
  video: {
    facingMode: 'environment',  // Rear camera
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
};
```

### Image Target Quality Requirements

For reliable exhibition tracking:
- Physical puzzle must be assembled on a flat, stable surface (not held in hand)
- Ambient light should be ≥ 300 lux (typical museum exhibition lighting)
- Puzzle surface: matte laminate preferred over glossy (reduces glare which disrupts feature detection)
- Target size: minimum 20cm × 20cm when assembled (larger = more feature points visible at comfortable phone distance)
- Background colour under puzzle station: avoid white or mirrors — use dark, non-reflective surface

### Recommended Node.js Dev Server Setup

```bash
# Install mkcert for local HTTPS (required for camera on mobile)
# macOS: brew install mkcert
# Windows: choco install mkcert

mkcert -install
mkcert localhost 192.168.1.XXX  # Replace with your local IP

# Serve with certificate
npx serve -l 443 --ssl-cert localhost+1.pem --ssl-key localhost+1-key.pem
```

Then on mobile, navigate to `https://192.168.1.XXX` (same WiFi network). Accept the self-signed cert warning once.

### A-Frame Version Compatibility Note

MindAR.js v1.2.x is tested with A-Frame v1.4.x. Do not use A-Frame v1.5+ without verifying MindAR compatibility. Pin specific CDN versions in the HTML:

```html
<script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"></script>
```

---

*Document version: 1.0 | Project: Festival Hari Museum Antarabangsa | Project 05*

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
<h1 data-i18n="ar1_title">Rhythm of Nationality</h1>
<p data-i18n="ar1_artist">Kong Kien Choong</p>
<button data-i18n="btn_scan">Imbas Puzzle</button>

<!-- Dynamic / programmatic text (in JS) -->
poemEl.innerHTML = t('ar1_poem_bm');
infoEl.textContent = t('ar1_interpretive');
```

### String Key Conventions for This Project

Keys for Project 5 (AR Puzzle):

Artwork 1 — Rhythm of Nationality:
- `ar1_title`, `ar1_artist`, `ar1_year`, `ar1_medium`, `ar1_interpretive`
- `ar1_poem_bm`, `ar1_poem_en`
- `ar1_kids_question1`, `ar1_kids_question2`, `ar1_kids_question3`, `ar1_kids_question4`
- `ar1_activity`

Artwork 2 — Unity in Diversity Series 2:
- `ar2_title`, `ar2_artist`, `ar2_year`, `ar2_medium`, `ar2_interpretive`
- `ar2_kids_question1`, `ar2_kids_question2`, `ar2_kids_question3`
- `ar2_activity`

Shared / UI:
- `puzzle_instructions_1`, `puzzle_instructions_2`, `puzzle_instructions_3`, `puzzle_instructions_4`
- `puzzle_help_prompt`
- `btn_scan`, `btn_close`, `btn_info`

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

**PROJECT 5 (AR Puzzle):** Landing/reference pages use warm BNM style with BM/EN toggle. The AR overlay itself is minimal (dark overlay with semi-transparent poem text panel, close button). Info cards about each artwork use the card component style. Loading screen: animated puzzle pieces assembling with BNM warmth.
