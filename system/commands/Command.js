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

}
