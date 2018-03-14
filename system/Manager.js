'use strict';

module.exports = class Manager {

  constructor(settings) {
    this._window = null;
    this._settings = settings;
  }

  getSetting(name) {
    return this._settings[name] || null;
  }

  getWindow() {
    if (this._window === null) {
      this._window = new (require('./WindowManager'))(this);
    }
    return this._window;
  }

}
