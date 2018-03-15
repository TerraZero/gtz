'use strict';

const fs = require('fs');
const path = require('path');

module.exports = class TemplateManager {

  constructor(manager) {
    this._manager = manager;
  }

  get(name) {
    return fs.readFileSync(path.join(this._manager.getSetting('root'), 'src/html', name + '.html')).toString();
  }

}
