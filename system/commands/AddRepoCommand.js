'use strict';

const Command = require('./Command');

module.exports = class AddRepoCommand extends Command {

  execute() {
    const that = this;

    this._ui.select(['hallo', 'cool']).then(function (data) {
      log(data);
      that.finish(data);
    });
  }

}
