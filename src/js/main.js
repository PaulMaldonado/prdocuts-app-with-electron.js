const electron = require('electron');
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 1200,

    webPreferences: {
      nodeIntegration: true
    }

  });

  win.loadFile('src/index.html');

}

app.on('window-all-closed', () => {
  if(process.plataform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow);