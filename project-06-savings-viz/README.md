# IMD 2026 — Project 06: Bina Semula Simpanan Bersama

**International Museum Day 2026 — Bank Negara Malaysia Museum**

Dual-screen interactive installation. Visitors answer 10 financial literacy questions on a touchscreen console. Correct answers activate glowing nodes on the LED wall display. Nodes connect with animated light lines as the community network grows throughout the day.

---

## Requirements

- Node.js 18 or higher
- Two displays (or one display for testing)
- Both screens must be on the same network

---

## Installation

```bash
cd project-06-savings-viz
npm install
```

---

## Starting the Server

```bash
npm start
```

The server starts on port 3000. You will see:

```
IMD 2026 Project 06 running!
   Console: http://localhost:3000/console.html
   Wall:    http://localhost:3000/wall.html
   For LAN: http://<your-IP>:3000/console.html
```

---

## Display Setup

| Screen        | URL                                   | Purpose                          |
|---------------|---------------------------------------|----------------------------------|
| Console       | http://localhost:3000/console.html    | Visitor touchscreen (questions)  |
| Wall Display  | http://localhost:3000/wall.html       | Large LED wall (network viz)     |

Open each URL in a separate browser window, then move each window to its respective display and press F11 for fullscreen.

---

## LAN Setup (Two Separate Screens on Different Devices)

1. Find your PC's IP address:
   - Windows: open Command Prompt, run `ipconfig`, look for IPv4 Address
   - Example: `192.168.1.100`

2. Console touchscreen device: `http://192.168.1.100:3000/console.html`

3. Wall display device: `http://192.168.1.100:3000/wall.html`

4. Both devices must be on the same WiFi or wired network.

---

## How It Works

1. Visitor arrives at the console screen and taps "Mula / Start"
2. They answer 10 bilingual (BM/EN) questions about financial habits
3. Each "smart" answer (Option A) sends a WebSocket message to the server
4. The server activates the corresponding node and saves state to `state.json`
5. The wall display receives the update in real time and animates the node
6. Adjacent activated nodes automatically draw glowing connection lines
7. State persists across all visitors throughout the day — the network grows over time

---

## State Management

- State is saved automatically to `state.json` after every answer
- State persists across server restarts (nodes accumulate all day)
- The wall display will show the full network state on load (via REST fallback)

### Reset at End of Day

**Option 1 — API:**
```bash
curl -X POST http://localhost:3000/api/reset
```

**Option 2 — Wall display UI:**
Double-click the "Reset" button at bottom-right of the wall display.

**Option 3 — Keyboard shortcut on wall display:**
Press `Ctrl + Shift + R` while the wall display window is focused.

---

## Demo / Offline Mode

If the console cannot reach the WebSocket server within 5 seconds, it automatically enters **Demo Mode** (indicated by an orange dot). In demo mode:
- All questions still work
- Session counts are stored in browser localStorage
- The wall display will not update in real time

To exit demo mode, ensure the server is running and refresh the page.

---

## File Structure

```
project-06-savings-viz/
├── server.js       — Node.js/Express/WebSocket server
├── package.json    — Dependencies
├── state.json      — Persistent state (auto-updated)
├── console.html    — Visitor touchscreen interface
├── wall.html       — LED wall display
└── README.md       — This file
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Wall shows "Offline" | Ensure server is running; both devices on same network |
| Console shows Demo Mode orange dot | Check server is running; refresh the page |
| Port 3000 already in use | Change `PORT` in server.js or set `PORT=3001 npm start` |
| Nodes not animating on wall | Reload wall.html; check browser console for WebSocket errors |
| State not saving | Ensure the server has write permission to `state.json` in the project folder |

---

## Technical Notes

- WebSocket server broadcasts state changes to all connected clients simultaneously
- The wall display uses SVG for connection lines with animated stroke-dashoffset
- Node activation uses the Web Animations API for the bounce + ripple effect
- Google Fonts (Poppins + Nunito) are loaded from CDN — requires internet connection at startup. For offline use, download and serve the fonts locally.
- Tested on Chrome and Edge. Recommended browser: Chrome (fullscreen with `--kiosk` flag for production)

### Kiosk Mode (Production)

For the actual exhibition, launch Chrome in kiosk mode:

```bash
# Wall display (on display :0)
chrome --kiosk http://localhost:3000/wall.html

# Console (on display :1 or second monitor)
chrome --kiosk http://localhost:3000/console.html
```

Or on Windows:
```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk http://localhost:3000/wall.html
```
