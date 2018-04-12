'use strict';

module.exports = class Command {

  constructor(manager, ui) {
    this._manager = manager;
    this._ui = ui;
    this._api = manager.getManager('GithubManager');
    this._storage = manager.getManager('StorageManager');
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

  get(storage) {
    return this._storage.get(storage);
  }

  set(storage, values) {
    return this._storage.set(storage, values);
  }

  /**
   * @param {string[]} options
   * @return {Promise}
   */
  select(options) {
    return this._ui.select(options);
  }

}
