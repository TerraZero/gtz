'use strict';

const View = require('./View');

module.exports = class CommandOverlayView extends View {

  get template() { return 'overlay.command'; }

  get render() {
    return {
      id: 'command-overlay',
    }
  }

  get data() {
    return {
      show: false,
      loading: false,
      status: {
        input: true,
        classes: {
          modal: false,
        },
        resolve: null,
        reject: null,
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
            this.status.resolve({
              options: this.options,
              option: option,
              index: option.index,
            });
          }
        },

      },

    };
  }

  open() {
    this.getData().show = true;
    return this;
  }

  close() {
    const data = this.getData();

    data.show = false;
    if (data.status.reject !== null) {
      data.status.reject('The user dont chose a option.');
    }
    return this;
  }

  clear() {
    const data = this.getData();

    data.options = [];
    data.focus = -1;
    data.status.resolve = null;
    data.status.reject = null;
  }

  option(name) {
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

  select(options) {
    const that = this;
    const data = this.getData();

    this.clear();
    for (const option of options) {
      this.option(option);
    }

    data.status.classes.modal = true;
    return new Promise(function (resolve, reject) {
      data.status.resolve = resolve;
      data.status.reject = reject;
      that.open();
    }).catch(log.error);
  }

  loading(load = null) {
    const data = this.getData();

    if (load !== null) {
      data.loading = load;
    }
    return data.loading;
  }

}
