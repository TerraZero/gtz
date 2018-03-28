'use strict';

module.exports = class Logger {

  log() {
    console.log.apply(console, arguments);
  }

  warn() {
    console.warn.apply(console, arguments);
  }

  error() {
    console.error.apply(console, arguments);
  }

}
