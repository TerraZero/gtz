'use strict';

const View = require('./View');

module.exports = class SettingsOverlayView extends View {

  get template() { return 'overlay.settings'; }

  get render() {
    return {
      id: 'settings-overlay',
    }
  }

  get data() {
    return {
      show: false,
      definition: this._manager.getManager('SettingsManager').getDefinition(),
      actions: {
        cancel: {
          title: 'Cancel',
        },
        submit: {
          title: 'Submit',
        },
      },
      activeTab: null,
    };
  }

  params(manager) {
    for (const item in this.getData().definition) {
      this.getData().activeTab = item;
      break;
    }
    const that = this;

    return {

      computed: {

        tabs() {
          return this.definition;
        },

        items() {
          return this.definition[this.activeTab].items;
        },

      },

      methods: {

        tabClick(tab) {
          this.activeTab = tab;
        },

        actionClick(action) {
          that.close();
        },

        tabClass(tab) {
          if (tab === this.activeTab) return ['active'];
          return null;
        },

      },

    };
  }

  close() {
    const data = this.getData();

    data.show = false;
    data.resolve();
  }

  open() {
    this.getData().show = true;
    return new Promise(function (resolve, reject) {
      this.getData().resolve = resolve;
    }.bind(this));
  }

}
