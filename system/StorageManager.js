'use strict';

module.exports = class StorageManager {

  constructor(manager, config = {}) {
    this._config = config;
    this._data = {
      solid: {},
      storage: {},
    };
    for (const name in config) {
      this._data[config[name].type][name] = {
        values: {},
        length: 0,
      };
    }
  }

  get(name) {
    const info = this._config[name];

    return this._data[info.type][name];
  }

  update(name, value) {
    const info = this._config[name];
    const storage = this._data[info.type][name];

    if (info.key === undefined) {
      const values = [];

      for (const index in value) {
        const item = this.clone(info.template);

        item.data = value[index];
        values.push(item);
      }
      storage.values = values;
      storage.length = values.length;
    } else {
      const values = {};
      let length = 0;

      for (const index in value) {
        const item = this.clone(info.template);

        item.data = value[index];
        item.key = item.data[info.key];
        storage.values[item.key] = item;
        length++;
      }
      storage.length = length;
    }
  }

  clone(object) {
    const clone = {};

    for (const index in object) {
      clone[index] = object[index];
    }
    return clone;
  }

}
