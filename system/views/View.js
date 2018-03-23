'use strict';

const Vue = require('./../../node_modules/vue/dist/vue.min.js');
const $ = require('jquery');

module.exports = class View {

  constructor(manager) {
    this._manager = manager;
    this._storage = manager.getManager('StorageManager');
    this._templates = manager.getManager('TemplateManager');
    this._data = null;
    this._vue = null;
    this._mount = null;
  }

  get template() { return null; }

  get render() { return {}; }

  get data() { return {}; }

  get storages() { return []; }

  params(manager) { return {}; }

  mount(selector) {
    this._mount = $(selector).append(this._templates.render(this.template, this.render));
    this._vue = this.create();
  }

  getData() {
    if (this._data === null) {
      this._data = this.data;
    }
    return this._data;
  }

  create() {
    const object = this.params(this._manager);

    object.el = '#' + this.render.id;
    object.data = this.getData();

    return new Vue(object);
  }

}
