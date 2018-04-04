'use strict';

const Command = require('./Command');

module.exports = class AddRepoCommand extends Command {

  execute() {
    this.uiSelect(['hallo', 'cool'], this.selected);
  }

  selected(options, option, index) {
    this.finish(option.name);
  }

}
