'use strict';

module.exports = class Manager {

  constructor(settings) {
    this._settings = settings;
    this._managers = {};
    this._listeners = {};
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

  trigger(event, ...args) {
    if (this._listeners[event] !== undefined) {
      for (const listener of this._listeners[event]) {
        this.callback([listener.callback], args);
      }
    }
  }

  triggerMessage(event, header, ...args) {
    if (this._listeners[event] === undefined) return;
    const message = this.getManager('ViewManager').getView('MessageOverlayView');

    message.open(header, '', this._listeners[event].length, true);
    args.unshift(message);
    for (const listener of this._listeners[event]) {
      const process = listener.options && listener.options.message || '';

      message.setMessage(process);
      this.callback([listener.callback], ...args);
    }
  }

}
