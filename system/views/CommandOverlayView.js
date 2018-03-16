'use strict';

const View = require('./View');

module.exports = class CommandOverlayView extends View {

  get template() { return 'overlay.command-overlay'; }

  get render() {
    return {
      id: 'command-overlay',
    }
  }

  get data() {
    return {
      show: false,
      input: '',
    };
  }

}
