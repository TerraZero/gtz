'use strict';

const View = require('./View');

module.exports = class MessageOverlayView extends View {

  get template() { return 'overlay.message'; }

  get render() {
    return {
      id: 'message-overlay',
    }
  }

  get data() {
    return {
      show: false,
      subshow: false,
      header: null,
      message: null,
      status: null,
      current: 0,
      count: 0,
      subcurrent: 0,
      subcount: 0,
      width: 500,
    };
  }

  params(manager) {
    return {

      computed: {

        loader() {
          return {
            'border-left-width': (this.width * this.current / this.count) + 'px',
          };
        },

        subloader() {
          return {
            'border-left-width': (this.width * this.subcurrent / this.subcount) + 'px',
          };
        },

        subloaderclass() {
          return {
            'is-subloader': this.subshow,
          };
        },

      },

    };
  }

  updateStatus(status, count = true) {
    const data = this.getData();

    data.status = status;
    if (!count) return this;
    if (data.subshow) {
      if (data.count > 0) {
        data.subcurrent++;
      }
    }
    if (!data.subshow || data.subcurrent === data.subcount) {
      if (data.count > 0) {
        data.current++;
        if (data.current === data.count) {
          data.show = false;
        }
      }
    }
    return this;
  }

  setMessage(message) {
    this.getData().message = message;
    return this;
  }

  open(header, message, count = 0, sub = false, status = null, show = true) {
    const data = this.getData();

    data.current = 0;
    data.header = header;
    data.message = message;
    data.count = count;
    if (status !== null) {
      this.updateStatus(status);
    }
    data.show = show;
    data.subshow = sub;
    return this;
  }

  openSub(count = 0) {
    const data = this.getData();

    data.subcurrent = 0;
    data.subcount = count;
    return this;
  }

}
