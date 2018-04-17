'use strict';

const Command = require('./Command');

module.exports = class OpenSettingsCommand extends Command {

  execute() {
    return this._manager.getManager('ViewManager').getView('SettingsOverlayView').open();
  }

}
