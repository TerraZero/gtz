'use strict';

function Logger() {

};

Logger.loading = function (message = false) {
  if (message) {
    console.log('LOADING:', message);
  }
};

Logger.setLoading = function (func) {
  this.loading = func;
};

module.exports = new Proxy(Logger, {

  apply(target, that, args) {
    this.get(target, 'log').apply(that, args);
  },

  get(target, property) {
    if (target[property] !== undefined) {
      if (typeof target[property] === 'function') return target[property].bind(target);
      return target[property];
    }

    switch (property) {
      case 'log':
      case 'warn':
      case 'error':
        return function (...args) {
          console[property].apply(console, args);
        };
      default:
        return function (...args) {
          console.log.call(console, property.toUpperCase() + ':', ...args);
        };
    }
  },

});
