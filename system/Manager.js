'use strict';

module.exports = class Manager {

  constructor(settings) {
    this._window = null;
    this._storage = null;
    this._template = null;
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

  getStorage() {
    if (this._storage === null) {
      this._storage = new (require('./StorageManager'))(this);
    }
    return this._storage;
  }

  getTemplate() {
    if (this._template === null) {
      this._template = new (require('./TemplateManager'))(this);
    }
    return this._template;
  }

}
