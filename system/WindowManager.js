'use strict';

const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

module.exports = class WindowManager {

  constructor(manager) {
    this._manager = manager;
    this._windows = {};
  }

  getWindow(name, config = {}) {
    if (this._windows[name] === undefined) {
      this._windows[name] = this.createWindow(config);
    }
  }

  createWindow(name, config) {
    const win = new BrowserWindow(config);

    win.loadURL(url.format({
      pathname: path.join(this._manager.getSetting('root'), 'index.html'),
      protocol: 'file:',
      slashes: true,
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
      this.closeWindow(name);
    });
    return win;
  }

  closeWindow(name) {
    if (this._windows[name] !== undefined) {
      this._windows[name] = undefined;
    }
  }

}
