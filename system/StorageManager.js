'use strict';

const Vue = require('./../node_modules/vue/dist/vue.min.js');

module.exports = class StorageManager {

  constructor(manager) {
    this._vues = {};
  }

  data(name) {
    return this._vues[name];
  }

  has(name) {
    return this._vues[name] !== undefined;
  }

  add(name, object) {
    new Vue(object);
    this._vues[name] = object.data;
  }

}
