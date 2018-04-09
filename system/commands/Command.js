'use strict';

module.exports = class Command {

  constructor(manager, commands, ui) {
    this._manager = manager;
    this._storage = this._manager.getManager('StorageManager');
    this._commands = commands;
    this._ui = ui;
  }

  init() { }

  execute() { }

  finish(...args) {
    this._commands.update(...args);
  }

  getStorage(name, func) {
    this.loading(true);
    this._storage.get(name, [this, func]);
  }



  loading(load = null) {
    return this._ui.loading(load);
  }

  uiSelect(options, func) {
    this._ui.openSelect(options, [this, func]);
  }

}
