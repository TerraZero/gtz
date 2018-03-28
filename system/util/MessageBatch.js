'use strict';

const Batch = require('./Batch');

module.exports = class MessageBatch extends Batch {

  constructor(manager) {
    super(manager);
    this._groups = [];
    this._callbacks = {};
    this._current = '';
  }

  add(callback, ...args) {
    this._callbacks[this._current].push({ callback, args });
    return this;
  }

  addGroup(group, message = '...') {
    this._groups.push({ group, message });
    this._callbacks[group] = [];
    this._current = group;
    return this;
  }

  execute(message, title, data = {}) {
    const that = this;
    data.message = message;
    let batch = new Promise(function (next) {
      next(data);
    });

    for (const group of this._groups) {
      batch = batch.then(function (data) {
        return new Promise(function (next) {
          data.message.setMessage(group.message);
          data.message.openSub(that._callbacks[group.group].length);
          next(data);
        });
      });
      for (const callback of this._callbacks[group.group]) {
        batch = batch.then(function (data) {
          return new Promise(function (next) {
            that._manager.callback([callback.callback], next, data, ...callback.args);
          });
        });
      }
    }
    data.message.open(title, '', this._groups.length);
    return batch;
  }

}
