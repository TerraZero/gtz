const manager = new (require('./system/Manager'))({
  root: __dirname,
});
const windowManager = manager.getWindow();

const { app } = require('electron');

app.on('ready', () => {
  windowManager.getWindow('main', {
    width: 800,
    height: 600,
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  windowManager.getWindow('main', {
    width: 800,
    height: 600,
  });
});
