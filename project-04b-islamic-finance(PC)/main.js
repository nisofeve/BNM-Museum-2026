const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    kiosk: true,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      gamepadEnabled: true
    }
  });

  win.loadFile('index.html');

  win.webContents.on('before-input-event', (event, input) => {
    if (
      input.key === 'F12' ||
      (input.control && input.shift && input.key === 'I') ||
      (input.control && input.shift && input.key === 'J') ||
      (input.control && input.key === 'r') ||
      (input.control && input.key === 'R')
    ) event.preventDefault();
  });

  globalShortcut.register('CommandOrControl+Alt+Q', () => app.quit());
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => app.quit());
app.on('will-quit', () => globalShortcut.unregisterAll());
