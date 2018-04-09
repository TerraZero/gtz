'use strict';

const Command = require('./Command');

module.exports = class AddRepoCommand extends Command {

  execute() {
    this.loading(true);

    this.uiSelect(['hallo', 'cool'], this.selected);
  }

  selectRepo() {

  }

  selected(options, option, index) {
    this.finish(option.name);
  }

}
