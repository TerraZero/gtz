'use strict';

module.exports = class StorageManager {

  constructor(manager, config = {}) {
    this._manager = manager;
    this._request = manager.getManager('RequestManager');
    this._config = config;
    this._data = {
      solid: {},
      storage: {},
    };
    for (const name in config) {
      this._data[config[name].type][name] = null;
    }
  }

  getInfo(name) {
    return this._config[name];
  }

  get(name, callback) {
    const info = this.getInfo(name);

    if (this._data[info.type][name]) {
      this._manager.callback([callback], this._data[info.type][name]);
    } else {
      this._request.add(info.command, [this, this.update, { name, callback }]);
    }
  }

  update(param, request, values) {
    this.set(param.name, values);
    this._manager.callback([param.callback], values);
  }

  set(name, values) {
    const info = this.getInfo(name);

    this._data[info.type][name] = values;
  }

}
