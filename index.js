const manager = new (require('./system/Manager'))({
  mode: 'render',
  execute: __filename,
  root: __dirname,
  user: require('./user.json'),
  managers: {},
});
const windowManager = manager.getManager('WindowManager');

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
