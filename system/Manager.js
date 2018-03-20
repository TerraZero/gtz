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
      let config = {};
      if (this._settings.managers[name] !== undefined) {
        config = this._settings.managers[name];
      }
      this._managers[name] = new (require('./' + name))(this, config);
    }
    return this._managers[name];
  }

}
