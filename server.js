/**
 * Virtual G29 WebSocket Relay Server
 * Run: node server.js
 * Default port: 8765
 *
 * Relays messages between the virtual controller and game clients.
 * Works across different browsers and devices on the same network.
 */

const { WebSocketServer } = require('ws');

const PORT = 8765;
const wss  = new WebSocketServer({ port: PORT });

const clients = new Set();

// Get local IP for display
const os = require('os');
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

wss.on('listening', () => {
  const ip = getLocalIP();
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║    Virtual G29 Relay Server — READY   ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║  Local:   ws://localhost:${PORT}          ║`);
  console.log(`║  Network: ws://${ip}:${PORT}       ║`);
  console.log('╠════════════════════════════════════════╣');
  console.log('║  Open game + controller in any browser ║');
  console.log('║  Press Ctrl+C to stop                  ║');
  console.log('╚════════════════════════════════════════╝\n');
});

wss.on('connection', (ws, req) => {
  clients.add(ws);
  const addr = req.socket.remoteAddress;
  console.log(`[+] Client connected   — ${addr}  (total: ${clients.size})`);

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    // Relay to every OTHER connected client
    for (const client of clients) {
      if (client !== ws && client.readyState === 1) {
        client.send(JSON.stringify(msg));
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[-] Client disconnected — ${addr}  (total: ${clients.size})`);
  });

  ws.on('error', (err) => {
    console.error(`[!] Error from ${addr}:`, err.message);
  });
});
