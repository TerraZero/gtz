'use strict';

const $ = require('jquery');

module.exports = class Page {

  constructor(manager) {
    this._views = manager.getManager('ViewManager');
    this._pages = manager.getManager('PageManager');
    this._templates = manager.getManager('TemplateManager');
    this._mount = null;
  }

  get template() { return null; }

  get render() { return {}; }

  mount(selector = '.page-system--root') {
    this._mount = $(selector).append(this._templates.template(this.template)(this.render));
    this.create();
  }

  create() { }

  addView(view, mount = '') {
    this._views.getView(view).mount('#' + this.render.id + ' ' + mount);
  }

  addPage(page, mount = '.page-system--root') {
    this._pages.getPage(page).mount(mount);
  }

}
