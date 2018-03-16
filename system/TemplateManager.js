'use strict';

module.exports = class TemplateManager {

  constructor(manager) {
    this._templates = {};
  }

  template(name) {
    if (this._templates[name] === undefined) {
      this._templates[name] = require('./../src/html/' + name);
    }
    return this._templates[name];
  }

  render(name, options) {
    return this.template(name)(options);
  }

}
