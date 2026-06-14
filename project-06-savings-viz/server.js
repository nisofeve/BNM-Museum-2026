const express = require('express');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const STATE_FILE = path.join(__dirname, 'state.json');

app.use(express.static(__dirname));
app.use(express.json());

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return createInitialState();
  }
}

function createInitialState() {
  return {
    nodes: Array.from({length: 10}, (_, i) => ({
      id: i,
      activated: false,
      activatedCount: 0,
      color: ['#00E5FF','#F5A623','#7B5EA7','#27AE60','#FF6B5B','#00B4A6','#F5A623','#0047AB','#27AE60','#00E5FF'][i]
    })),
    connections: [],
    totalSessions: 0,
    totalPositive: 0
  };
}

function saveState(s) {
  try { fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2)); } catch(e) { console.error('Save error:', e); }
}

let state = loadState();

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ type: 'STATE_SYNC', state }));

  ws.on('message', (raw) => {
    try {
      const data = JSON.parse(raw);

      if (data.type === 'SESSION_START') {
        state.totalSessions++;
        broadcast({ type: 'SESSION_START', total: state.totalSessions });
        saveState(state);
      }

      if (data.type === 'ANSWER_SUBMITTED') {
        const { questionIndex, isPositive } = data;
        if (isPositive && questionIndex >= 0 && questionIndex < 10) {
          state.totalPositive++;
          const node = state.nodes[questionIndex];
          node.activated = true;
          node.activatedCount++;

          // Check for new connections
          [questionIndex - 1, questionIndex + 1].forEach(adj => {
            if (adj >= 0 && adj < 10 && state.nodes[adj].activated) {
              const [from, to] = [Math.min(questionIndex, adj), Math.max(questionIndex, adj)];
              if (!state.connections.find(c => c.from === from && c.to === to)) {
                state.connections.push({ from, to });
                broadcast({ type: 'CONNECTION_DRAWN', connection: { from, to } });
              }
            }
          });

          broadcast({ type: 'NODE_ACTIVATED', nodeId: questionIndex, node });
          saveState(state);
        }
      }

      if (data.type === 'RESET_STATE') {
        state = createInitialState();
        saveState(state);
        broadcast({ type: 'STATE_SYNC', state });
      }
    } catch(e) { console.error('Message error:', e); }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

app.get('/api/state', (req, res) => res.json(state));
app.post('/api/reset', (req, res) => {
  state = createInitialState();
  saveState(state);
  broadcast({ type: 'STATE_SYNC', state });
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n IMD 2026 Project 06 running!`);
  console.log(`   Console: http://localhost:${PORT}/console.html`);
  console.log(`   Wall:    http://localhost:${PORT}/wall.html`);
  console.log(`   For LAN: http://<your-IP>:${PORT}/console.html\n`);
});
