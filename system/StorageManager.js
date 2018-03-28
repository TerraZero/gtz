'use strict';

const fs = require('fs');

module.exports = class StorageManager {

  constructor(manager, config = {}) {
    this._manager = manager;
    this._request = manager.getManager('RequestManager');
    this._config = config;
    this._data = {
      solid: {},
      storage: {},
    };
    this._count = {
      solid: 0,
      storage: 0,
    };
    for (const name in config) {
      this._data[config[name].type][name] = null;
      this._count[config[name].type]++;
    }
    manager.addBatch('system:exit', [this, this.batchSystemExit]);
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
      setTimeout(function () {
        next(data);
      }, 3000);
    });
  }

}
