'use strict';

module.exports = class StorageManager {

  constructor(manager) {
    this._solid = {};
    this._storage = {};
  }

  addStorage(name, manager, data = {}) {
    this._storage[name] = {
      manager: manager.constructor.name,
      data: data,
    };
  }

  addSolid(name, manager, data = {}) {
    this._solid[name] = {
      manager: manager.constructor.name,
      data: data,
    };
  }

}
