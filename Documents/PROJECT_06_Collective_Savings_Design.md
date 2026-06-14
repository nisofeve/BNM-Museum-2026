# PROJECT 6 — Collective Savings Visualisation: Bina Semula Simpanan Bersama

**PIC:** Atikah
**Format:** HTML5 Dual-Screen Interactive (Console + Wall LED Display)
**Language:** Bahasa Malaysia
**Hardware:** 27" All-in-One Touchscreen PC (console) + LED tile wall screen (display)
**Date:** June 2026

---

## 1. Project Overview

An interactive dual-screen installation where museum visitors answer 10 binary-choice financial literacy questions on a touchscreen console. Each correct answer (selecting the positive/smart financial behaviour option) activates a glowing node on the shared wall LED display and draws a connection line between nodes, building a cumulative network visualisation throughout the day.

The wall display is always visible to passing visitors, showing the growing network as a collective representation of the community's financial awareness. Nodes accumulate across all visitor sessions — the network grows throughout the museum day, reset only at end of day by staff.

**Experience flow:**
1. Visitor approaches touchscreen console
2. Console shows welcome screen
3. Visitor answers 10 questions (binary choice)
4. Each correct answer immediately activates a corresponding capsule/node on the wall display
5. Activated nodes connect with animated lines
6. Session ends with thank-you screen and summary
7. Network state persists — next visitor builds on top of previous answers

---

## 2. Technical Stack

### Frontend

| Component | Technology | Notes |
|-----------|------------|-------|
| Console UI | HTML5 + CSS3 + Vanilla JS | Single-page app, no framework required |
| Wall Display | HTML5 + CSS3 + SVG + Canvas | Optimised for large LED resolution |
| Animation | CSS keyframes + Web Animations API | Node glow, line draw, particles |
| WebSocket client | Native browser WebSocket API | Both pages connect to same server |

### Backend

| Component | Technology | Notes |
|-----------|------------|-------|
| WebSocket server | Node.js + `ws` library | Bi-directional real-time sync |
| HTTP static server | `express` + `serve-static` | Serve HTML/CSS/JS files |
| State persistence | JSON file (`state.json`) | Survives server restart, simple reset |
| Process manager | `pm2` | Keep server running across reboots |

### Hardware & Network

| Item | Spec | Role |
|------|------|------|
| Console PC | 27" All-in-One, Windows 10/11, touch | Visitor interaction |
| LED Wall controller | PC/media player connected to LED tiles | Wall display |
| Network | Local WiFi or wired LAN | Both devices on same network |
| Server host | Console PC (self-hosted) | Node.js server runs on console machine |

### Port Allocation

| Service | Port | Protocol |
|---------|------|----------|
| HTTP static server | 3000 | HTTP |
| WebSocket server | 3001 | WS |
| (Or combined) | 3000 | HTTP + WS upgrade |

**Recommended:** Use a single Express server that handles both HTTP and WebSocket on port 3000 (ws on `/ws` path).

---

## 3. Application Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Console PC (27" Touch)                    │
│                                                             │
│  ┌─────────────────┐     ┌──────────────────────────────┐  │
│  │  console.html   │     │    Node.js Server (port 3000) │  │
│  │  (browser,      │◄───►│    ├── Express (static files)│  │
│  │   fullscreen)   │ WS  │    ├── WebSocket server (/ws) │  │
│  └─────────────────┘     │    └── state.json persistence │  │
│                           └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
              │ Local Network (WiFi/LAN) │
              ▼
┌─────────────────────────────────────────────────────────────┐
│              LED Wall Display PC / Media Player             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  wall.html (browser, fullscreen, no touch required) │   │
│  │  WebSocket client → ws://[console-ip]:3000/ws       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
/project-06-savings/
├── server.js                  ← Node.js WebSocket + HTTP server
├── state.json                 ← Persistent state file
├── package.json
├── public/
│   ├── console.html           ← Touchscreen console page
│   ├── wall.html              ← Wall LED display page
│   ├── css/
│   │   ├── console.css        ← Console dark theme styles
│   │   ├── wall.css           ← Wall display styles
│   │   └── animations.css     ← Shared animation keyframes
│   ├── js/
│   │   ├── console.js         ← Console logic, question flow, WS client
│   │   ├── wall.js            ← Wall display, node network, WS client
│   │   ├── ws-client.js       ← Shared WebSocket client wrapper
│   │   └── node-network.js    ← SVG/Canvas node network rendering
│   └── assets/
│       ├── audio/
│       │   ├── ambient.mp3    ← Background ambient loop
│       │   ├── capsule-ping.mp3  ← Node activation SFX
│       │   ├── line-draw.mp3     ← Connection line SFX
│       │   └── fanfare.mp3       ← Session complete SFX
│       └── fonts/
│           └── noto-sans-bm/  ← Bahasa Malaysia font files
└── scripts/
    ├── reset-state.js         ← Staff reset script (run at day end)
    └── start.bat              ← Windows startup script
```

### State Schema

The canonical state is maintained in memory on the server and persisted to `state.json` on every mutation.

```json
{
  "schemaVersion": 1,
  "lastReset": "2026-06-11T08:00:00.000Z",
  "totalSessions": 47,
  "totalCorrectAnswers": 312,
  "nodes": [
    {
      "id": "node_1",
      "questionIndex": 0,
      "activatedCount": 42,
      "isActive": true,
      "firstActivatedAt": "2026-06-11T09:14:22.000Z",
      "lastActivatedAt": "2026-06-11T15:02:11.000Z"
    },
    {
      "id": "node_2",
      "questionIndex": 1,
      "activatedCount": 38,
      "isActive": true,
      "firstActivatedAt": "2026-06-11T09:14:25.000Z",
      "lastActivatedAt": "2026-06-11T15:02:14.000Z"
    }
    // ... nodes 3–10
  ],
  "connections": [
    {
      "id": "conn_1_2",
      "fromNodeId": "node_1",
      "toNodeId": "node_2",
      "activatedCount": 36,
      "isActive": true
    }
    // connections are created between adjacent activated nodes in sequence
  ],
  "currentSession": null,
  "visitorCount": 47
}
```

**Node activation logic:** A node becomes `isActive: true` on first visitor activation and stays active for all subsequent visitors. `activatedCount` increments each time a visitor answers that question correctly. Connections form between node N and node N+1 when both are active.

**Session schema (transient, not persisted):**
```json
{
  "sessionId": "sess_20260611_143022",
  "startedAt": "2026-06-11T14:30:22.000Z",
  "answers": [true, false, true, true, null, null, null, null, null, null],
  "currentQuestion": 4,
  "isComplete": false
}
```

### WebSocket Event Protocol

All messages are JSON strings with a `type` field.

#### Client → Server (console.js sends)

| Event type | Payload | Description |
|-----------|---------|-------------|
| `SESSION_START` | `{ sessionId }` | Visitor begins a new session |
| `ANSWER_SUBMITTED` | `{ sessionId, questionIndex, isCorrect }` | Visitor answers a question |
| `SESSION_COMPLETE` | `{ sessionId, answers, correctCount }` | All 10 questions answered |
| `REQUEST_STATE` | `{}` | Request full state sync (on page load) |

#### Server → All Clients (broadcast)

| Event type | Payload | Description |
|-----------|---------|-------------|
| `STATE_SYNC` | Full state object | Sent on connect and after any mutation |
| `NODE_ACTIVATED` | `{ nodeId, questionIndex, activatedCount }` | A node was just activated |
| `CONNECTION_DRAWN` | `{ connectionId, fromNodeId, toNodeId }` | A new connection formed |
| `SESSION_STARTED` | `{ sessionId, visitorCount }` | New session began (for idle → active transition on wall) |
| `SESSION_ENDED` | `{ sessionId, correctCount, visitorCount }` | Session complete |
| `STATE_RESET` | `{}` | Staff reset; wall should clear and re-enter idle |

#### Example WebSocket message flow (single visitor session)

```
console.js  →  server:  { type: "SESSION_START", sessionId: "sess_001" }
server      →  wall.js: { type: "SESSION_STARTED", sessionId: "sess_001", visitorCount: 48 }

console.js  →  server:  { type: "ANSWER_SUBMITTED", sessionId: "sess_001", questionIndex: 0, isCorrect: true }
server      →  all:     { type: "NODE_ACTIVATED", nodeId: "node_1", questionIndex: 0, activatedCount: 43 }
server      →  all:     { type: "STATE_SYNC", ...fullState }

console.js  →  server:  { type: "ANSWER_SUBMITTED", sessionId: "sess_001", questionIndex: 1, isCorrect: false }
// No NODE_ACTIVATED event — answer was wrong

console.js  →  server:  { type: "ANSWER_SUBMITTED", sessionId: "sess_001", questionIndex: 2, isCorrect: true }
server      →  all:     { type: "NODE_ACTIVATED", nodeId: "node_3", questionIndex: 2, activatedCount: 29 }
// No CONNECTION_DRAWN because node_2 is not active in this session (Q2 was wrong)
// But if both node_2 and node_3 are historically active, the connection already exists

// ... 7 more answers ...

console.js  →  server:  { type: "SESSION_COMPLETE", sessionId: "sess_001", answers: [...], correctCount: 7 }
server      →  all:     { type: "SESSION_ENDED", sessionId: "sess_001", correctCount: 7, visitorCount: 48 }
```

---

## 4. UI/UX Design Specification

### Colour Palette

| Role | Colour | Hex |
|------|--------|-----|
| Background (both screens) | Deep space black | `#080B14` |
| Node default (inactive) | Dark slate | `#1A2035` |
| Node active glow (outer) | Electric cyan | `#00C8FF` |
| Node active core | Bright white-blue | `#E8F8FF` |
| Node active (this session) | Vivid teal | `#00FFCC` |
| Connection line | Cyan-teal gradient | `#00C8FF` → `#00FFCC` |
| Light pulse traveling along line | Pure white | `#FFFFFF` |
| Correct answer highlight | Emerald green | `#00E57A` |
| Wrong answer (neutral) | Muted blue-grey | `#3A4A6B` |
| Question card background | Dark navy | `#0F1629` |
| Question card border | Subtle blue | `#1E3050` |
| Heading text | Bright white | `#F0F6FF` |
| Body text | Light grey-blue | `#B0C4DE` |
| Progress bar fill | Teal | `#00C8FF` |
| Particle ambient | Vary: cyan, teal, white | `#00C8FF`, `#00FFCC`, `#FFFFFF` |
| Wall intro text | Soft white | `#D8E8F8` |
| Visitor counter | Golden amber | `#F0B840` |

### Typography

| Role | Font | Size (Console) | Size (Wall) |
|------|------|----------------|-------------|
| Main heading | Noto Sans Bold | 28px | 64px |
| Subheading | Noto Sans SemiBold | 20px | 42px |
| Question text | Noto Sans | 22px | — |
| Answer option | Noto Sans | 18px | — |
| Body/label | Noto Sans | 15px | 28px |
| Counter display | Noto Sans Bold Mono | 36px | 80px |
| Closing message | Noto Serif | 16px | 38px |

### Console Design Principles

- **Dark theme throughout:** Matches wall display aesthetic, reduces eye strain in potentially dimly lit exhibition space.
- **Large touch targets:** All answer buttons minimum 80px height. Question cards full-width, generous padding.
- **No distraction:** Only the current question and two answer options visible at any time. No scrolling required.
- **Immediate feedback:** Correct/wrong feedback shown for 1.5 seconds before advancing to next question.
- **Progress clarity:** Persistent top progress bar. "Soalan X daripada 10" counter always visible.
- **Accessibility:** Minimum 4.5:1 contrast ratio on all text. Touch target spacing ≥ 8px between options.

### Wall Display Design Principles

- **Always active:** Wall display is the passive attractor even between sessions. Ambient idle animation keeps it visually engaging.
- **Spatial network metaphor:** 10 nodes arranged in a purposeful layout (not a simple line), representing community connection. The growing web of connections is the core visual metaphor.
- **Collective accumulation:** The network shows the collective choices of all visitors that day. The more people participate, the brighter and more complete the network becomes.
- **Real-time response:** When a visitor answers correctly, the corresponding node pulses visibly on the wall — visitors and bystanders see the network grow in real time.
- **Resolution consideration:** LED wall tiles may have lower pixel density (typically 2–4mm pitch = ~100–250 PPI equivalent). Avoid fine details < 3px at display resolution. Use thick strokes (≥ 4px), large node circles (radius ≥ 30px at 1920 width).

---

## 5. Screen-by-Screen Design

### Console Screen Flow

#### Screen C1: Welcome / Idle Attract

**Trigger:** Page load, or 30 seconds of inactivity after session complete.

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│   [Museum logo / Exhibition title]  │
│                                     │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   │    Bina Semula Simpanan     │   │
│   │         Bersama             │   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
│   Jawab 10 soalan mudah tentang     │
│   pengurusan kewangan peribadi.     │
│                                     │
│   Setiap jawapan yang betul akan    │
│   menyalakan satu titik pada        │
│   paparan dinding.                  │
│                                     │
│   ┌─────────────────────────────┐   │
│   │    MULA / TAP TO BEGIN      │   │  ← Large CTA button, pulsing
│   └─────────────────────────────┘   │
│                                     │
│   [Visitor count: 47 pengunjung hari ini]
│                                     │
└─────────────────────────────────────┘
```

**Behaviour:** Tapping "MULA" sends `SESSION_START` to server, navigates to Screen C2.

#### Screen C2: Question Card (repeated for Q1–Q10)

**Layout:**
```
┌─────────────────────────────────────┐
│  ●●●●●○○○○○  Soalan 5 daripada 10  │  ← Progress dots + counter
│  ─────────────────────────────────  │  ← Progress bar (50% filled)
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │  [Question text in BM,      │   │
│  │   large, centred, wrapped]  │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  A                          │   │  ← Answer option A (tall button)
│  │  [Option A text]            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  B                          │   │  ← Answer option B (tall button)
│  │  [Option B text]            │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Interaction states:**
1. **Default:** Both options shown, equal styling
2. **Tapped (A = correct):** Option A turns green (`#00E57A`), "Betul!" text appears, bounces. 1.5s pause. Wall activates node. Advance to next question.
3. **Tapped (B = incorrect for most):** Option B turns to a neutral muted colour. "Teruskan!" text appears. No node activation. 1.2s pause. Advance.
4. **Feedback:** Brief full-screen flash (correct = green tint, incorrect = no tint) lasting 200ms before 1.2s feedback delay.

**Note:** Option A is always the positive/correct behaviour in this experience (as designed in the content spec). This is known at build time — no randomisation needed, but consider shuffling option order for future versions.

#### Screen C3: Thank You / Session Summary

**Trigger:** After Q10 is answered.

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│      Terima kasih!                  │
│                                     │
│   Anda menjawab X daripada 10       │
│   soalan dengan betul.              │
│                                     │
│   [X node icons lit = correct]      │
│   [10-X node icons dim = incorrect] │
│                                     │
│   ─────────────────────────────── │
│                                     │
│   "Bersama kita membina komuniti    │
│   yang lebih berdaya tahan..."      │
│   [closing message, scrollable]     │
│                                     │
│   ─────────────────────────────── │
│                                     │
│   [Mulakan semula] [button]         │
│                                     │
└─────────────────────────────────────┘
```

**Auto-return:** After 30 seconds on this screen, auto-navigates back to Screen C1.

---

### Wall Display Screen Flow

#### Screen W1: Idle Attract

**Trigger:** Page load, or after `STATE_RESET` event, or when no active session for 60+ seconds.

**Layout:** Full black screen with 10 dim nodes in the network layout. Ambient glow pulse on all nodes. Intro text overlaid.

**Intro text (top third of screen):**
```
Bina Semula Simpanan Bersama
```

**Body text (middle):**
```
Pilih jawapan yang betul bagi setiap soalan. Setiap jawapan yang tepat akan
mengaktifkan cahaya pada kapsul digital dan membentuk satu garisan yang
menghubungkan antara dua titik. Semakin banyak jawapan yang betul, semakin
lengkap sambungan yang terhasil. Lihat bagaimana pilihan kewangan yang bijak
dapat menghubungkan individu, komuniti dan masa depan kita bersama.
```

**Bottom:** Visitor count display: "47 pengunjung hari ini"

**Animation:** Slow ambient glow pulse on all 10 nodes (active nodes glow cyan; inactive nodes glow dim blue-grey). Floating particle field (gentle, slow-moving).

#### Screen W2: Active Session

**Trigger:** `SESSION_STARTED` WebSocket event received.

**Transition:** Intro text fades out over 800ms. Node network becomes the dominant visual element, expanding to fill more of the screen. A subtle "SESI BAHARU" label appears briefly.

**During session:** 
- When `NODE_ACTIVATED` received: target node pulses brightly (scale bounce + glow burst), then settles to bright active state
- When `CONNECTION_DRAWN` received: line draws from node N to node N+1
- Visitor count remains at bottom
- No question content shown on wall — wall shows only the network response

#### Screen W3: Session Complete

**Trigger:** `SESSION_ENDED` WebSocket event.

**Animation:** 
- All nodes activated in this session pulse once in sequence (cascade from node 1 → 10)
- Full network light cascade if visitor got all correct
- Visitor count increments with animation
- After 3 seconds, transitions back to idle attract state but retains all accumulated node states

#### Screen W4: Full Network (End of Day Achievement)

This is not a distinct "screen" but a visual state — when all 10 nodes are active and all connections are drawn, the network enters a "fully connected" state:
- All connection lines pulse in a travelling light cascade, cycling continuously
- A subtle radial burst from the centre of the network
- Text: "Komuniti kita bersatu!" overlaid briefly

---

## 6. Content Specification

### Wall Display Intro Text

```
Bina Semula Simpanan Bersama

Pilih jawapan yang betul bagi setiap soalan. Setiap jawapan yang tepat akan
mengaktifkan cahaya pada kapsul digital dan membentuk satu garisan yang
menghubungkan antara dua titik. Semakin banyak jawapan yang betul, semakin
lengkap sambungan yang terhasil. Lihat bagaimana pilihan kewangan yang bijak
dapat menghubungkan individu, komuniti dan masa depan kita bersama.
```

### 10 Questions (Console)

**Question 1**
> Adakah anda mempunyai wang simpanan untuk digunakan disaat-saat kecemasan?
- A (correct): Ya, saya mempunyai simpanan kecemasan
- B: Belum, tetapi saya ingin memulakannya

**Question 2**
> Bagaimana anda mengawal perbelanjaan harian?
- A (correct): Saya merancang perbelanjaan mengikut bajet
- B: Saya masih berbelanja tanpa perancangan tetap

**Question 3**
> Adakah anda merekod simpanan dan perbelanjaan?
- A (correct): Ya, saya sentiasa memantau kewangan saya
- B: Tidak, saya jarang merekod perbelanjaan saya

**Question 4**
> Bagaimana anda mengurus simpanan kewangan?
- A (correct): Saya menetapkan jumlah simpanan tetap
- B: Saya menyimpan jika ada lebihan wang

**Question 5**
> Adakah anda menggunakan aplikasi digital untuk mengurus kewangan?
- A (correct): Ya, aplikasi membantu saya memantau kewangan
- B: Tidak, saya masih menggunakan cara biasa dengan mencatat di buku nota

**Question 6**
> Bagaimana anda membuat keputusan sebelum membeli sesuatu?
- A (correct): Saya membeli mengikut keperluan dan kemampuan
- B: Saya membeli berdasarkan kehendak semasa

**Question 7**
> Adakah anda mempunyai matlamat simpanan tertentu?
- A (correct): Ya, saya menyimpan untuk masa hadapan
- B: Belum, saya belum menetapkan matlamat simpanan

**Question 8**
> Jika berlaku kecemasan hari ini, adakah anda bersedia?
- A (correct): Ya, saya mempunyai persediaan kewangan
- B: Tidak, saya perlu memperbaiki simpanan saya

**Question 9**
> Bagaimana anda melihat kepentingan simpanan?
- A (correct): Simpanan penting untuk kestabilan masa depan
- B: Saya masih sedang belajar menguruskan simpanan

**Question 10**
> Bagaimana kewangan dapat menyatukan masyarakat?
- A (correct): Pengurusan kewangan yang baik membantu kesejahteraan bersama
- B: Kesedaran kewangan perlu dipertingkatkan dalam masyarakat

### Closing Wall Message

```
Bersama kita membina komuniti yang lebih berdaya tahan melalui kesedaran
kewangan. Setiap keputusan kewangan yang bijak, walaupun kecil, membantu
mewujudkan masyarakat yang lebih stabil, bersedia menghadapi cabaran dan
mampu berkembang ke arah masa depan yang lebih harmoni.
```

---

## 7. Animation & VFX Specification

### Node Network Layout

10 nodes arranged in a visually meaningful spatial layout — not a straight line, but a flowing arc or organic cluster that suggests community and connection. Recommended: an asymmetric arc or two-row arrangement.

**Suggested node positions (percentage of canvas, 1920×1080):**
```javascript
const NODE_POSITIONS = [
  { id: 'node_1',  x: 0.12, y: 0.45 },  // Q1
  { id: 'node_2',  x: 0.23, y: 0.30 },  // Q2
  { id: 'node_3',  x: 0.35, y: 0.22 },  // Q3
  { id: 'node_4',  x: 0.48, y: 0.18 },  // Q4
  { id: 'node_5',  x: 0.60, y: 0.25 },  // Q5
  { id: 'node_6',  x: 0.70, y: 0.38 },  // Q6
  { id: 'node_7',  x: 0.78, y: 0.52 },  // Q7
  { id: 'node_8',  x: 0.82, y: 0.66 },  // Q8
  { id: 'node_9',  x: 0.75, y: 0.78 },  // Q9
  { id: 'node_10', x: 0.60, y: 0.82 },  // Q10
];
```

Adjust during visual testing — the exact layout should be agreed with Atikah.

### Capsule/Node Animations

#### Idle State (node is inactive, historical)
```css
@keyframes nodeIdleGlow {
  0%   { box-shadow: 0 0 8px 2px rgba(30, 50, 100, 0.4); opacity: 0.35; }
  50%  { box-shadow: 0 0 16px 4px rgba(30, 80, 150, 0.6); opacity: 0.55; }
  100% { box-shadow: 0 0 8px 2px rgba(30, 50, 100, 0.4); opacity: 0.35; }
}

.node-inactive {
  background: #1A2035;
  border: 2px solid #1E3050;
  animation: nodeIdleGlow 4s ease-in-out infinite;
  animation-delay: calc(var(--node-index) * 0.4s);  /* Stagger per node */
}
```

#### Active State (node is historically activated by any visitor)
```css
@keyframes nodeActiveGlow {
  0%   { box-shadow: 0 0 20px 8px rgba(0, 200, 255, 0.5); }
  50%  { box-shadow: 0 0 35px 15px rgba(0, 200, 255, 0.8); }
  100% { box-shadow: 0 0 20px 8px rgba(0, 200, 255, 0.5); }
}

.node-active {
  background: radial-gradient(circle at 40% 35%, #E8F8FF 0%, #00C8FF 40%, #003050 100%);
  border: 2px solid #00C8FF;
  animation: nodeActiveGlow 2.5s ease-in-out infinite;
  animation-delay: calc(var(--node-index) * 0.3s);
}
```

#### Activation Burst (triggered on NODE_ACTIVATED event)
```css
@keyframes nodeActivationBurst {
  0%   { transform: scale(1);    box-shadow: 0 0 20px 8px rgba(0, 200, 255, 0.5); }
  20%  { transform: scale(1.4);  box-shadow: 0 0 60px 30px rgba(0, 255, 200, 1.0); }
  40%  { transform: scale(0.95); box-shadow: 0 0 30px 12px rgba(0, 200, 255, 0.7); }
  60%  { transform: scale(1.1);  box-shadow: 0 0 40px 18px rgba(0, 200, 255, 0.6); }
  80%  { transform: scale(1.02); box-shadow: 0 0 25px 10px rgba(0, 200, 255, 0.55); }
  100% { transform: scale(1);    box-shadow: 0 0 20px 8px rgba(0, 200, 255, 0.5); }
}

.node-activating {
  animation: nodeActivationBurst 1.2s ease-out forwards,
             nodeActiveGlow 2.5s ease-in-out infinite 1.2s;
}
```

#### JavaScript activation trigger
```javascript
function activateNode(nodeId) {
  const nodeEl = document.getElementById(nodeId);
  nodeEl.classList.remove('node-inactive', 'node-active');
  nodeEl.classList.add('node-active', 'node-activating');
  
  // Remove animation class after burst completes, re-add permanent active state
  setTimeout(() => {
    nodeEl.classList.remove('node-activating');
  }, 1300);
  
  // Play activation sound
  playSound('capsule-ping');
}
```

### Connection Line Animations

#### SVG-based connection lines

Lines are drawn as SVG `<path>` or `<line>` elements in a full-screen SVG overlay.

```javascript
function drawConnection(fromNodeId, toNodeId, animate = true) {
  const from = getNodeCenter(fromNodeId);
  const to = getNodeCenter(toNodeId);
  
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', from.x);
  line.setAttribute('y1', from.y);
  line.setAttribute('x2', to.x);
  line.setAttribute('y2', to.y);
  line.setAttribute('stroke', 'url(#connectionGradient)');
  line.setAttribute('stroke-width', '3');
  line.setAttribute('stroke-linecap', 'round');
  line.classList.add('connection-line');
  
  if (animate) {
    const length = Math.hypot(to.x - from.x, to.y - from.y);
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
    line.style.animation = `lineDrawIn 0.8s ease-out forwards`;
  }
  
  svgOverlay.appendChild(line);
  playSound('line-draw');
}
```

#### CSS stroke-dashoffset draw animation
```css
@keyframes lineDrawIn {
  from { stroke-dashoffset: var(--line-length); }
  to   { stroke-dashoffset: 0; }
}

.connection-line {
  stroke-dasharray: var(--line-length);
  stroke-dashoffset: 0;
  filter: drop-shadow(0 0 4px #00C8FF);
}
```

#### Traveling light pulse along line

After a line is fully drawn, a bright "light pulse" travels along it repeatedly:

```javascript
function startTravelingLight(lineEl) {
  const length = lineEl.getTotalLength();
  
  // Create a short glowing dash that travels along the line
  const pulseEl = lineEl.cloneNode();
  pulseEl.setAttribute('stroke', '#FFFFFF');
  pulseEl.setAttribute('stroke-width', '5');
  pulseEl.style.strokeDasharray = `${length * 0.08} ${length * 0.92}`;
  pulseEl.style.strokeDashoffset = length;
  pulseEl.style.animation = `travelingLight 3s linear infinite`;
  pulseEl.style.filter = 'drop-shadow(0 0 8px #FFFFFF)';
  svgOverlay.insertBefore(pulseEl, lineEl.nextSibling);
}

// CSS:
@keyframes travelingLight {
  from { stroke-dashoffset: var(--line-length); }
  to   { stroke-dashoffset: calc(var(--line-length) * -1); }
}
```

### Idle Ambient Particle Effect (Wall Display)

Slow-moving floating particles in the background to keep the wall display alive during idle periods.

```javascript
class AmbientParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true);
  }
  reset(randomY = false) {
    this.x = Math.random() * this.canvas.width;
    this.y = randomY ? Math.random() * this.canvas.height : this.canvas.height + 5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -(Math.random() * 0.4 + 0.1);
    this.alpha = Math.random() * 0.4 + 0.1;
    this.size = Math.random() * 3 + 1;
    // Vary colour between node inactive and node active tones
    const colours = ['#00C8FF', '#00FFCC', '#FFFFFF', '#1E3050'];
    this.colour = colours[Math.floor(Math.random() * colours.length)];
    this.life = 0;
    this.maxLife = Math.random() * 400 + 200;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life > this.maxLife * 0.8) {
      this.alpha -= 0.003;
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

// 80 particles for wall display
const wallParticles = Array.from({ length: 80 }, () => new AmbientParticle(wallCanvas));
```

### Session Complete: Full Network Cascade

When `SESSION_ENDED` is received after a high-score session, play a cascade:

```javascript
async function playNetworkCascade(activatedNodeIds) {
  // Pulse each activated node in sequence with 150ms gap
  for (const nodeId of activatedNodeIds) {
    triggerNodePulseBurst(nodeId);
    await delay(150);
  }
  
  // Then pulse all connection lines simultaneously
  await delay(300);
  document.querySelectorAll('.connection-line').forEach(line => {
    line.style.filter = 'drop-shadow(0 0 12px #FFFFFF)';
    line.style.stroke = '#FFFFFF';
    setTimeout(() => {
      line.style.filter = 'drop-shadow(0 0 4px #00C8FF)';
      line.style.stroke = 'url(#connectionGradient)';
    }, 600);
  });
}

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
```

### Visitor Counter Animation

When visitor count increments:
```javascript
function animateCounterIncrement(fromValue, toValue) {
  const counterEl = document.getElementById('visitor-count');
  const duration = 800;
  const startTime = performance.now();
  
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);  // ease-out-cubic
    const current = Math.round(fromValue + (toValue - fromValue) * easedProgress);
    counterEl.textContent = current;
    
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

---

## 8. Audio Specification

### Ambient Background (Wall Display + Console)

- **Concept:** Ambient electronic/light orchestral underscore. Calm, forward-looking, slightly hopeful. Not too energetic (museum context). Think: soft piano + gentle electronic pad, low-pass filtered.
- **Duration:** 3 minutes, seamless loop.
- **File:** `assets/audio/ambient.mp3`
- **Volume:** 30% on console, 60% on wall display (wall sets the room tone).
- **Note:** Console and wall display run independent audio — no need to sync them.

### Capsule/Node Activation Ping

- **Concept:** A clean, bright single-note chime — like a notification ping but warmer. Suggests "something good happened." Duration 0.8 seconds, attack fast, decay medium.
- **Pitch variation:** 10 different pitches (one per node) ascending from low to high C-D-E-F-G-A-B-C-D-E range. Each node always plays the same pitch — gives a musical quality as nodes activate in sequence.
- **Files:** `assets/audio/ping-1.mp3` through `assets/audio/ping-10.mp3`
- **Trigger:** Played on both console (at answer feedback) and wall display (at node activation) simultaneously.

### Connection Line Draw SFX

- **Concept:** A soft whoosh/swish sound as the line draws across the screen. 0.4 seconds, low-key.
- **File:** `assets/audio/line-draw.mp3`
- **Trigger:** Wall display only, when `CONNECTION_DRAWN` event received.

### Session Complete Fanfare

- **Concept:** Short positive resolution flourish. 2–3 seconds. Ascending arpeggio or chord swell. Celebratory but not excessive (library context).
- **File:** `assets/audio/fanfare.mp3`
- **Trigger:** Wall display only, after SESSION_ENDED and cascade animation.
- **Condition:** Only play if visitor answered ≥ 7/10 correctly. Otherwise play a softer, neutral close sound (`assets/audio/session-close.mp3`).

---

## 9. Development Milestones

### Milestone 1: Server Setup + State Foundation (Week 1)
**Goal:** Working Node.js server with WebSocket, state management, and persistence.

- Initialise Node.js project (`npm init`, install `ws`, `express`)
- Implement `server.js` with Express static server + WebSocket upgrade handler
- Implement `STATE_SYNC`, `SESSION_START`, `ANSWER_SUBMITTED`, `SESSION_COMPLETE` message handlers
- Implement state mutations (node activation, connection detection, session tracking)
- Implement `state.json` read/write with atomic write pattern (write to temp file, rename)
- Implement `reset-state.js` script
- Test WebSocket connection from two browser tabs simultaneously
- **Deliverable:** Server running, tested with wscat or browser console WebSocket calls

### Milestone 2: Console UI — Question Flow (Weeks 2–3)
**Goal:** Fully functional console page, all 10 questions, correct feedback, and server integration.

- Build `console.html` and `console.css` (dark theme, question card layout)
- Implement question carousel — display one question at a time, advance on tap
- Style answer buttons (A and B), large touch targets
- Implement correct/incorrect visual feedback (green flash, "Betul!", neutral dismiss)
- Connect to WebSocket server, send `SESSION_START` and `ANSWER_SUBMITTED` events
- Build welcome/attract screen and thank-you screen
- Implement auto-return to attract after 30 seconds idle
- Test full 10-question flow on touchscreen device
- **Deliverable:** Complete console flow, all content live, WebSocket events firing

### Milestone 3: Wall Display — Node Network (Week 3)
**Goal:** Wall display shows node network, responds to WebSocket events in real time.

- Build `wall.html` and `wall.css` (dark background, full-screen SVG + Canvas)
- Define 10 node positions, render as styled circle elements
- Implement SVG overlay for connection lines
- Implement `STATE_SYNC` handling — render current state on page load
- Implement `NODE_ACTIVATED` handler → trigger activation animation
- Implement `CONNECTION_DRAWN` handler → stroke-dashoffset line draw animation
- Test with simulated WebSocket events (script sending test events to server)
- Verify display looks correct at 1920×1080 (and at LED wall resolution if different)
- **Deliverable:** Wall display rendering, real-time node activations visible

### Milestone 4: Animation Polish + Audio (Week 4)
**Goal:** All animations and audio complete, experience feels polished.

- Implement traveling light pulse on connection lines
- Implement session complete cascade animation
- Implement visitor counter increment animation
- Integrate ambient particle system on wall display
- Integrate ambient audio (loop) on both screens
- Integrate capsule ping sounds (pitched per node) on wall display
- Integrate line draw SFX and session complete fanfare
- Implement idle attract state transitions on wall display
- Implement full-network "fully connected" achievement state
- **Deliverable:** Full experience with audio and polished animations

### Milestone 5: State Persistence + End-to-End Testing + Exhibition Hardening (Week 5)
**Goal:** Rock-solid, exhibition-ready system.

- Test `state.json` persistence across server restarts
- Test multi-visitor flow: 5 back-to-back sessions, verify node counts accumulate
- Implement `start.bat` script (starts Node.js server + opens both browser windows in fullscreen)
- Set up `pm2` for auto-restart on crash
- Test local network connection from wall display PC to console PC server
- Test screen resolution handling: console 1920×1080 27" and LED wall (verify resolution)
- Staff reset procedure: test `reset-state.js` clears state correctly, wall display responds to `STATE_RESET` event
- Handle edge cases: WebSocket disconnect/reconnect (implement reconnect with exponential backoff in `ws-client.js`), server down on load
- Final content review: all BM text proofread, all 10 questions and options correct
- **Deliverable:** Exhibition-ready build, documented start/reset procedures for staff

---

## 10. Claude Code Implementation Notes

### WebSocket Implementation Details

**server.js — combined HTTP + WebSocket server:**
```javascript
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });

app.use(express.static(path.join(__dirname, 'public')));

// Broadcast to all connected clients
function broadcast(message) {
  const data = JSON.stringify(message);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Atomic state persistence
function saveState(state) {
  const tmpPath = './state.json.tmp';
  const statePath = './state.json';
  fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2));
  fs.renameSync(tmpPath, statePath);
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync('./state.json', 'utf8'));
  } catch {
    return createInitialState();
  }
}

let state = loadState();

wss.on('connection', (ws) => {
  // Send full state on connect
  ws.send(JSON.stringify({ type: 'STATE_SYNC', state }));

  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    handleMessage(msg, ws);
  });
});

function handleMessage(msg, senderWs) {
  switch (msg.type) {
    case 'SESSION_START': {
      state.totalSessions++;
      state.visitorCount++;
      saveState(state);
      broadcast({ type: 'SESSION_STARTED', sessionId: msg.sessionId, visitorCount: state.visitorCount });
      break;
    }
    case 'ANSWER_SUBMITTED': {
      if (!msg.isCorrect) break;  // No state change for wrong answers
      const node = state.nodes[msg.questionIndex];
      node.activatedCount++;
      if (!node.isActive) {
        node.isActive = true;
        node.firstActivatedAt = new Date().toISOString();
      }
      node.lastActivatedAt = new Date().toISOString();
      state.totalCorrectAnswers++;

      // Check if a new connection should be formed
      checkAndCreateConnection(msg.questionIndex);
      saveState(state);
      broadcast({ type: 'NODE_ACTIVATED', nodeId: node.id, questionIndex: msg.questionIndex, activatedCount: node.activatedCount });
      broadcast({ type: 'STATE_SYNC', state });
      break;
    }
    case 'SESSION_COMPLETE': {
      broadcast({ type: 'SESSION_ENDED', sessionId: msg.sessionId, correctCount: msg.correctCount, visitorCount: state.visitorCount });
      break;
    }
    case 'REQUEST_STATE': {
      senderWs.send(JSON.stringify({ type: 'STATE_SYNC', state }));
      break;
    }
  }
}

function checkAndCreateConnection(questionIndex) {
  // Create connection between adjacent activated nodes
  if (questionIndex > 0) {
    const prevNode = state.nodes[questionIndex - 1];
    const currNode = state.nodes[questionIndex];
    if (prevNode.isActive && currNode.isActive) {
      const connId = `conn_${questionIndex}_${questionIndex + 1}`;
      const existingConn = state.connections.find(c => c.id === connId);
      if (!existingConn) {
        state.connections.push({ id: connId, fromNodeId: prevNode.id, toNodeId: currNode.id, activatedCount: 1, isActive: true });
        broadcast({ type: 'CONNECTION_DRAWN', connectionId: connId, fromNodeId: prevNode.id, toNodeId: currNode.id });
      } else {
        existingConn.activatedCount++;
      }
    }
  }
}

server.listen(3000, () => console.log('Server running on port 3000'));
```

### WebSocket Client with Auto-Reconnect (ws-client.js)

```javascript
class WSClient {
  constructor(url, onMessage) {
    this.url = url;
    this.onMessage = onMessage;
    this.reconnectDelay = 1000;
    this.maxReconnectDelay = 30000;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectDelay = 1000;
      this.ws.send(JSON.stringify({ type: 'REQUEST_STATE' }));
    };
    this.ws.onmessage = (event) => {
      this.onMessage(JSON.parse(event.data));
    };
    this.ws.onclose = () => {
      console.log(`WS closed. Reconnecting in ${this.reconnectDelay}ms...`);
      setTimeout(() => this.connect(), this.reconnectDelay);
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay);
    };
    this.ws.onerror = (err) => console.error('WS error:', err);
  }

  send(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
}

// Usage:
const wsUrl = `ws://${window.location.hostname}:3000/ws`;
const ws = new WSClient(wsUrl, handleServerMessage);
```

### Initial State Factory Function

```javascript
function createInitialState() {
  return {
    schemaVersion: 1,
    lastReset: new Date().toISOString(),
    totalSessions: 0,
    totalCorrectAnswers: 0,
    visitorCount: 0,
    nodes: Array.from({ length: 10 }, (_, i) => ({
      id: `node_${i + 1}`,
      questionIndex: i,
      activatedCount: 0,
      isActive: false,
      firstActivatedAt: null,
      lastActivatedAt: null
    })),
    connections: [],
    currentSession: null
  };
}
```

### Local Network Deployment

Both the console PC and the wall display PC must be on the same local network (same WiFi network or wired switch).

**Setup steps:**
1. On the console PC, find the local IP: `ipconfig` → look for IPv4 address (e.g., `192.168.1.50`)
2. Start the Node.js server on the console PC: `node server.js` (or `pm2 start server.js`)
3. On the console PC, open Chrome to `http://localhost:3000/console.html`
4. On the wall display PC, open Chrome to `http://192.168.1.50:3000/wall.html`
5. Both browsers should connect to the WebSocket at `ws://192.168.1.50:3000/ws`

**Windows Firewall:** Ensure port 3000 is open for inbound connections on the console PC. Add a Windows Firewall inbound rule if needed.

**start.bat (for console PC):**
```batch
@echo off
cd /d C:\Projects\project-06-savings
start node server.js
timeout /t 2
start chrome --start-fullscreen http://localhost:3000/console.html
echo Server and console started.
```

**Separate wall.bat (run on wall display PC):**
```batch
@echo off
start chrome --start-fullscreen http://192.168.1.50:3000/wall.html
```

### Screen Resolution Handling for LED Wall

LED tile walls have variable pixel pitch and total resolution. Confirm with the venue team:
- Typical LED wall resolutions: 1920×1080, 2560×720 (ultra-wide), 3840×1080
- The `wall.html` should use relative positioning (percentages, `vw`/`vh` units) rather than fixed pixel values
- SVG overlay should match `viewBox` to the screen's aspect ratio
- Test node positions and line drawing at the actual LED wall resolution before exhibition day

If the LED wall aspect ratio differs from 16:9, adjust `NODE_POSITIONS` percentages accordingly. The coordinate system is always percentage-based so it adapts to any resolution.

### Day Reset Procedure (Staff Instructions)

**reset-state.js:**
```javascript
const fs = require('fs');

function createInitialState() {
  return {
    schemaVersion: 1,
    lastReset: new Date().toISOString(),
    totalSessions: 0,
    totalCorrectAnswers: 0,
    visitorCount: 0,
    nodes: Array.from({ length: 10 }, (_, i) => ({
      id: `node_${i + 1}`,
      questionIndex: i,
      activatedCount: 0,
      isActive: false,
      firstActivatedAt: null,
      lastActivatedAt: null
    })),
    connections: [],
    currentSession: null
  };
}

fs.writeFileSync('./state.json', JSON.stringify(createInitialState(), null, 2));
console.log('State reset successfully at', new Date().toISOString());
```

**Staff reset procedure:**
1. At end of day (or beginning of day): open Terminal/CMD on console PC
2. Run: `cd C:\Projects\project-06-savings && node scripts/reset-state.js`
3. The server (if running via pm2) automatically picks up the new state.json on next WebSocket connect
4. Alternatively: implement a password-protected `/admin/reset` HTTP endpoint on the server that triggers the reset without stopping the server, and include a hidden admin page accessible only from localhost

### pm2 Setup for Production

```bash
npm install -g pm2

# Start server with pm2
pm2 start server.js --name "savings-server"

# Auto-start on Windows boot
pm2 startup
pm2 save

# Monitor
pm2 logs savings-server
pm2 status

# Restart after code changes
pm2 restart savings-server
```

### Node.js Package Requirements

```json
{
  "name": "project-06-savings",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "reset": "node scripts/reset-state.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ws": "^8.14.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### SVG Gradient Definitions for Wall Display

Include these in the SVG overlay element in `wall.html`:
```html
<svg id="wall-svg-overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
  <defs>
    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#00C8FF" stop-opacity="0.8"/>
      <stop offset="50%"  stop-color="#00FFCC" stop-opacity="1.0"/>
      <stop offset="100%" stop-color="#00C8FF" stop-opacity="0.8"/>
    </linearGradient>
    <filter id="nodeGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Connection lines injected here by wall.js -->
</svg>
```

---

*Document version: 1.0 | Project: Festival Hari Museum Antarabangsa | Project 06*

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
<h1 data-i18n="wall_title">Bina Semula Simpanan Bersama</h1>
<p data-i18n="console_welcome_cta">Tekan untuk bermula...</p>
<button data-i18n="btn_start">Mula</button>

<!-- Dynamic / programmatic text (in JS) -->
questionEl.textContent = t('q1_question');
optionAEl.textContent = t('q1_opt_a');
```

### String Key Conventions for This Project

Keys for Project 6 (Collective Savings Visualisation):

Wall display:
- `wall_title`, `wall_instructions`, `wall_closing`

Console:
- `console_welcome_title`, `console_welcome_cta`
- `q1_question`, `q1_opt_a`, `q1_opt_b`
- `q2_question`, `q2_opt_a`, `q2_opt_b`
- `q3_question`, `q3_opt_a`, `q3_opt_b`
- `q4_question`, `q4_opt_a`, `q4_opt_b`
- `q5_question`, `q5_opt_a`, `q5_opt_b`
- `q6_question`, `q6_opt_a`, `q6_opt_b`
- `q7_question`, `q7_opt_a`, `q7_opt_b`
- `q8_question`, `q8_opt_a`, `q8_opt_b`
- `q9_question`, `q9_opt_a`, `q9_opt_b`
- `q10_question`, `q10_opt_a`, `q10_opt_b`
- `result_title`, `result_subtitle`
- `btn_start`, `btn_next`, `btn_finish`, `progress_label`

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

**PROJECT 6 (Collective Savings):** Console screen uses warm style with large question cards, friendly illustrated icons per question (emergency fund = shield/umbrella, budgeting = clipboard, digital app = phone icon, etc.). Wall display KEEPS the dark background with glowing nodes (this is appropriate for the LED wall visual spectacle), but the console is warm and inviting. Node colours match the project palette (teal/gold/blue glow on dark).
