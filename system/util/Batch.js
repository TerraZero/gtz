'use strict';

module.exports = class Batch {

  constructor(manager) {
    this._manager = manager;
    this._callbacks = [];
  }

  add(callback, ...args) {
    this._callbacks.push({ callback, args });
    return this;
  }

  execute(data = {}) {
    const manager = this._manager;
    let batch = new Promise(function (next) {
      next(data);
    });

    for (const callback of this._callbacks) {
      batch = batch.then(function (data) {
        return new Promise(function (next) {
          manager.callback([callback.callback], next, data, ...callback.args);
        });
      });
    }
    return batch;
  }

}
