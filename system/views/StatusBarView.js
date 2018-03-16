'use strict';

const View = require('./View');

module.exports = class StatusBarView extends View {

  get template() { return 'status.page-status'; }

  get render() {
    return {
      id: 'status-bar-message',
    }
  }

  get data() {
    return {
      status: '',
    };
  }

}
