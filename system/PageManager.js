'use strict';

module.exports = class PageManager {

  constructor(manager) {
    this._manager = manager;
    this._pages = {};
  }

  getPage(name) {
    if (this._pages[name] === undefined) {
      this._pages[name] = new (require('./pages/' + name))(this._manager);
    }
    return this._pages[name];
  }

}
