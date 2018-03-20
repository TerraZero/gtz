'use strict';

module.exports = class StorageManager {

  constructor(manager) {
    this._solid = {};
    this._storage = {};
  }

  addStorage(name, data = {}) {
    this._storage[name] = {
      data: data,
    };
  }

  addSolid(name, data = {}) {
    this._solid[name] = {
      data: data,
    };
  }

  getStorage(name) {
    return this._storage[name];
  }

  update(name, value = {}) {
    this._storage[name].data = value;
  }

}
