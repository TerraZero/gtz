'use strict';

module.exports = new Proxy(function () { }, {

  apply(target, that, args) {
    this.get(target, 'log').apply(that, args);
  },

  get(target, property) {
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
