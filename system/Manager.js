'use strict';

module.exports = class Manager {

  constructor(settings) {
    this._window = null;
    this._template = null;
    this._storage = null;
    this._view = null;
    this._page = null;
    this._github = null;
    this._request = null;
    this._settings = settings;
  }

  getSetting(name) {
    return this._settings[name] || null;
  }

  getWindow() {
    if (this._window === null) {
      this._window = new (require('./WindowManager'))(this);
    }
    return this._window;
  }

  getStorage() {
    if (this._storage === null) {
      this._storage = new (require('./StorageManager'))(this);
    }
    return this._storage;
  }

  getTemplate() {
    if (this._template === null) {
      this._template = new (require('./TemplateManager'))(this);
    }
    return this._template;
  }

  getView() {
    if (this._view === null) {
      this._view = new (require('./ViewManager'))(this);
    }
    return this._view;
  }

  getPage() {
    if (this._page === null) {
      this._page = new (require('./PageManager'))(this);
    }
    return this._page;
  }

  getGithub() {
    if (this._github === null) {
      this._github = new (require('./GithubManager'))(this);
    }
    return this._github;
  }

  getRequest() {
    if (this._request === null) {
      this._request = new (require('./RequestManager'))(this);
    }
    return this._request;
  }

}
