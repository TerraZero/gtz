'use strict';

const Page = require('./Page');

module.exports = class EditorPage extends Page {

  get template() { return 'page.system'; }

  get render() {
    return {
      id: 'page-system',
    };
  }

  create() {
    this.addPage('EditorPage');

    this.addView('CommandOverlayView', '.page-system--tools');
    this.addView('MessageOverlayView', '.page-system--tools');

    this.addView('StatusBarView', '.page-system--status');
  }

}
