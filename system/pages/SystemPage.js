'use strict';

const Page = require('./Page');

module.exports = class EditorPage extends Page {

  get template() { return 'pages.system'; }

  get render() {
    return {
      id: 'system-page',
    };
  }

  create() {
    this.addPage('EditorPage');
    this.addView('CommandOverlayView', '.system-tools');
    this.addView('MessageOverlayView', '.system-tools');
  }

}
