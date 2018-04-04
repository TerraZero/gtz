'use strict';

module.exports = class CommandManager {

  constructor(manager, config) {
    this._manager = manager;
    this._ui = manager.getManager('ViewManager').getView('CommandOverlayView');
    this._config = config;
    this._commands = {};
    this._pipe = [];
    this._running = false;
  }

  choseCommand() {
    const options = [];

    for (const define of this._config.list) {
      options.push(define.name);
    }
    this._ui.openSelect(options, [this, this.addCommand]);
  }

  addCommand(options, option, index) {
    const item = this._config.list[index];

    this.runCommand(item.command);
  }

  getCommand(name) {
    if (this._commands[name] === undefined) {
      this._commands[name] = new require('./commands/' + name);
    }
    return this._commands[name];
  }

  runCommand(name, callback = null, ...args) {
    const Command = this.getCommand(name);
    const command = new Command(this._manager, this, this._ui);

    command.init(...args);
    this._pipe.push({ command, callback });
    this.tick();
  }

  tick() {
    if (!this._running && this._pipe.length > 0) {
      this._running = true;
      this._pipe[0].command.execute();
    }
  }

  update(...args) {
    const command = this._pipe.shift();

    this._manager.callback([command.callback], ...args);
    this._running = false;
    this.tick();
  }

}
