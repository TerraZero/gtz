'use strict';

module.exports = class Manager {

  constructor(settings) {
    this._settings = settings;
    this._managers = {};
  }

  getSetting(name) {
    return this._settings[name] || null;
  }

  getManager(name) {
    if (this._managers[name] === undefined) {
      this._managers[name] = new (require('./' + name))(this);
    }
    return this._managers[name];
  }

}
