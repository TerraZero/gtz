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
    this._ui.select(options)
      .then(this.addCommand.bind(this));
  }

  addCommand(data) {
    const item = this._config.list[data.index];

    this.runCommand(item.command);
  }

  getCommand(name) {
    if (this._commands[name] === undefined) {
      this._commands[name] = new require('./commands/' + name);
    }
    return this._commands[name];
  }

  runCommand(name, ...args) {
    const Command = this.getCommand(name);
    const command = new Command(this._manager, this._ui);
    const item = {
      command: command,
      resolve: null,
      reject: null,
    };
    const promise = new Promise(function (resolve, reject) {
      item.resolve = resolve;
      item.reject = reject;
    });

    Promise.all([promise]).then(this.finish.bind(this));
    this._pipe.push(item);
    this.tick();
  }

  tick() {
    if (!this._running && this._pipe.length > 0) {
      const item = this._pipe[0];

      this._running = true;
      item.command.init(item.resolve, item.reject);
    }
  }

  finish() {
    this._pipe.shift();
    this._running = false;
    this.tick();
  }

}
