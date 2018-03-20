'use strict';

const $ = require('jquery');

module.exports = class Page {

  constructor(manager) {
    this._views = manager.getManager('ViewManager');
    this._templates = manager.getManager('TemplateManager');
    this._mount = null;
  }

  get template() { return null; }

  get render() { return {}; }

  mount(selector = 'body') {
    this._mount = $(selector).append(this._templates.template(this.template)(this.render));
    this.create();
  }

  create() { }

  addView(view, mount = '') {
    this._views.getView(view).mount('#' + this.render.id + ' ' + mount);
  }

}