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
      status: {
        input: true,
        classes: {
          modal: false,
        }
      },
      input: '',
      item: {
        height: 22,
      },
      focus: -1,
      options: [],
    };
  }

  params(manager) {
    return {

      computed: {

        styles: function () {
          return {
            height: (this.show ? this.item.height * this.filtered.length + 'px' : '0px'),
          }
        },

        filtered() {
          const filtered = [];

          for (const index in this.options) {
            if (this.options[index].show) {
              filtered.push(this.options[index]);
            }
          }
          return filtered;
        },

      },

      methods: {

        keyup(event) {
          switch (event.keyCode) {
            // Down
            case 40:
            // Tab
            case 9:
              this.goFocus(1);
              event.preventDefault();
              break;
            // Up
            case 38:
              this.goFocus(-1);
              event.preventDefault();
              break;
            // Enter
            case 13:
              this.action();
              event.preventDefault();
              break;
            default:
              this.filter();
              break;
          }
        },

        filter: function () {
          if (this.focus !== -1) {
            this.filtered[this.focus].classes.focus = false;
            this.focus = -1;
          }
          const input = this.input.toLowerCase();
          for (const option of this.options) {
            option.show = option.name.toLowerCase().indexOf(input) >= 0;
          }
        },

        goFocus: function (delta = 0) {
          if (this.filtered[this.focus] !== undefined) this.filtered[this.focus].classes.focus = false;
          this.focus += delta;
          this.focus %= this.filtered.length;
          if (this.focus < 0) this.focus = this.filtered.length - 1;
          if (this.filtered[this.focus] !== undefined) this.filtered[this.focus].classes.focus = true;
        },

        action(option = null) {
          if (option === null) {
            if (this.filtered.length === 1) {
              option = this.filtered[0];
            } else if (this.filtered[this.focus] !== undefined) {
              option = this.filtered[this.focus];
            }
          }
          if (option !== null) {
            this.show = false;
            manager.callback([this.status.callback], this.options, option, option.index);
          }
        },

      },

    };
  }

  clearOptions() {
    const data = this.getData();

    data.options = [];
    data.focus = -1;
  }

  addOption(name) {
    const data = this.getData();

    data.options.push({
      name: name,
      show: true,
      classes: {
        focus: false,
      },
      index: data.options.length,
    });
  }

  openSelect(options, callback) {
    this.clearOptions();
    const data = this.getData();

    for (const option of options) {
      this.addOption(option);
    }

    data.status.callback = callback;
    data.status.classes.modal = true;
    data.show = true;
  }

}
