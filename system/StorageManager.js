'use strict';

const fs = require('fs');

module.exports = class StorageManager {

  constructor(manager, config = {}) {
    this._manager = manager;
    this._config = config;
    this._data = {
      solid: {},
      storage: {},
    };
    for (const name in config) {
      this._data[config[name].type][name] = null;
    }
    manager.addBatch('system:exit', [this, this.batchSystemExit]);
  }

  getInfo(name) {
    return this._config[name];
  }

  get(name) {
    const info = this.getInfo(name);

    return this._data[info.type][name];
  }

  set(name, values) {
    const info = this.getInfo(name);

    this._data[info.type][name] = values;
    this._manager.trigger('storage.set.' + name, name, values, info);
    this._manager.trigger('storage.change.' + name, values, info);
  }

  add(name, value) {
    const info = this.getInfo(name);

    this._data[info.type][name].push(value);
    this._manager.trigger('storage.add.' + name, name, value, this._data[info.type][name], info);
    this._manager.trigger('storage.change.' + name, this._data[info.type][name], info);
  }

  batchSystemExit(batch) {
    const root = this._manager.getSetting('root') + '/data';

    batch.addGroup(this.constructor.name, 'Storage: Save solid user data into file system. File: ' + root);
    for (const name in this._data.solid) {
      batch.add([this, this.onSystemExit], root, name, this._data.solid[name]);
    }
  }

  onSystemExit(next, data, root, name, solid) {
    data.message.updateStatus('Save: ' + name + ' to "data/' + name + '.solid.json"');
    fs.writeFile(root + '/' + name + '.solid.json', JSON.stringify(solid), function () {
      next(data);
    });
  }

}
