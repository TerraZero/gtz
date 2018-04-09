'use strict';

const fs = require('fs');

module.exports = class StorageManager {

  constructor(manager, config = {}) {
    this._manager = manager;
    this._github = manager.getManager('GithubManager');
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

  get(name) {
    const that = this;
    const info = that.getInfo(name);

    return new Promise(function (resolve, reject) {
      if (info === undefined) reject('The storage "' + name + '" is not defined.');
      if (that._data[info.type][name]) {
        resolve(that._data[info.type][name]);
      } else {
        that._github.repos()
          .then(function (values) {
            that.set(name, values);
            resolve(values);
          });
      }
    }).catch(log.error);
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
      next(data);
    });
  }

}
