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
    this.execute()
      .then(this.finish.bind(this));
  }

  execute() { }

  finish(values) {
    this._resolve(values);
  }

  get(storage, promise = true) {
    const value = this._storage.get(storage);

    if (value === null) return null;
    if (promise) {
      return Promise.resolve(value);
    } else {
      return value;
    }
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
