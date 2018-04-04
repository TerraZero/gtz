'use strict';

module.exports = class Command {

  constructor(manager, commands, ui) {
    this._manager = manager;
    this._commands = commands;
    this._ui = ui;
  }

  init() { }

  execute() { }

  finish(...args) {
    this._commands.update(...args);
  }

  uiSelect(options, func) {
    this._ui.openSelect(options, [this, func]);
  }

}
