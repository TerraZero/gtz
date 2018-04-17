'use strict';

module.exports = class SettingsManager {

  constructor(manager) {
    this._definition = require(manager.getSetting('root') + '/settings.json');
  }

  getDefinition() {
    return this._definition;
  }

}
