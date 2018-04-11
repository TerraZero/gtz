'use strict';

const View = require('./View');

module.exports = class StatusBarView extends View {

  get template() { return 'status.bar'; }

  get render() {
    return {
      id: 'system-status-bar',
    }
  }

  get data() {
    return {
      items: [],
    };
  }

  params(manager) {
    return {
      computed: {

        message() {
          if (this.items.length === 0) return false;
          return this.items[this.items.length - 1];
        },

      },
    };
  }

  loading(message = false) {
    const data = this.getData();

    if (message) {
      data.items.push(message);
    } else {
      data.items.pop();
    }
  }

}
