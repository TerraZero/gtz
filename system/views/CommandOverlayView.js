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
      item: {
        height: 22,
      },
      focus: -1,
      items: [],
    };
  }

  params(manager) {
    return {

      computed: {

        styles: function () {
          return {
            height: (this.show ? this.item.height * this.options.length + 'px' : '0px'),
          }
        },

        options: function () {
          const options = [];

          for (const index in options) {

          }
          return this.items;
        },

      },

      methods: {

        goFocus: function (delta = 0) {
          this.focus += delta;
          this.focus %= this.items.length;
          if (this.focus < 0) this.focus = this.items.length - 1;
        },

        getClasses: function (index = 0) {
          if (this.focus === index) return ['focus'];
          return [];
        },

      },

    };
  }

}
