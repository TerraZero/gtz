'use strict';

const Batch = require('./util/Batch');

module.exports = class Manager {

  static get NORMAL() { return 'NORMAL'; }
  static get BOOT() { return 'BOOT'; }
  static get EXIT() { return 'EXIT'; }

  constructor(settings) {
    this._settings = settings;
    this._status = Manager.BOOT;
    this._managers = {};
    this._listeners = {};
    this._batches = {};
  }

  setStatus(status) {
    this._status = status;
  }

  getStatus() {
    return this._status;
  }

  getSetting(name) {
    return this._settings[name] || null;
  }

  getManager(name) {
    if (this._managers[name] === undefined) {
      let config = {};
      if (this._settings.managers[name] !== undefined) {
        config = this._settings.managers[name];
      }
      this._managers[name] = new (require('./' + name))(this, config);
    }
    return this._managers[name];
  }

  callback(definitions = [], ...args) {
    for (const definition of definitions) {
      if (definition === null) continue;
      if (typeof definition === 'function') {
        definition.apply(null, args);
        continue;
      } else if (Array.isArray(definition)) {
        if (definition.length === 1) {
          definition[0].apply(null, args);
        } else if (definition.length === 2) {
          definition[1].apply(definition[0], args);
        } else if (definition.length === 3) {
          const copy = args.slice(0, args.length);

          copy.unshift(definition[2]);
          definition[1].apply(definition[0], copy);
        }
        continue;
      }
      console.error('Callback is not valid.', definition);
    }
  }

  addListener(event, options, callback) {
    if (this._listeners[event] === undefined) this._listeners[event] = [];
    this._listeners[event].push({ options, callback });
    return this;
  }

  addBatch(event, callback) {
    if (this._batches[event] === undefined) this._batches[event] = [];
    this._batches[event].push(callback);
    return this;
  }

  trigger(event, ...args) {
    if (this._listeners[event] !== undefined) {
      for (const listener of this._listeners[event]) {
        this.callback([listener.callback], args);
      }
    }
  }

  batch(event, ...args) {
    if (this._batches[event] === undefined) return null;
    const batch = new Batch(this);

    args.unshift(batch);
    this.callback(this._batches[event], ...args);
    return batch;
  }

}
