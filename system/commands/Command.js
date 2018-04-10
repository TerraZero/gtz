'use strict';

module.exports = class Command {

  constructor(manager, ui) {
    this._manager = manager;
    this._storage = this._manager.getManager('StorageManager');
    this._ui = ui;
  }

  init(resolve, reject) {
    this._resolve = resolve;
    this._reject = reject;
    this.execute();
  }

  execute() { }

  finish(values) {
    this._resolve(values);
  }

  /**
   * @param {string} name
   * @return {Promise}
   */
  getStorage(name) {
    this.loading(true);
    return this._storage.get(name).then(this.loadend.bind(this));
  }

  /**
   * @param {string} name
   * @param {any} value
   * @return {Promise}
   */
  addStorage(name, value) {
    this.loading(true);
    return this._storage.add(name, value).then(this.loadend.bind(this));
  }

  loading(load = true) {
    this._ui.loading(load);
  }

  /**
   * @param {string[]} options
   * @return {Promise}
   */
  select(options) {
    return this._ui.select(options);
  }

  loadend(data) {
    this.loading(false);
    return data;
  }

}
