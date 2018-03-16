'use strict';

module.exports = class ViewManager {

  constructor(manager) {
    this._manager = manager;
    this._views = {};
  }

  getView(name) {
    if (this._views[name] === undefined) {
      this._views[name] = new (require('./views/' + name))(this._manager);
    }
    return this._views[name];
  }

}
