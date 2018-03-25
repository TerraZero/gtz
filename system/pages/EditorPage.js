'use strict';

const Page = require('./Page');

module.exports = class EditorPage extends Page {

  get template() { return 'pages.editor'; }

  get render() {
    return {
      id: 'editor-page',
    };
  }

  create() {
    this.addView('RepositoryView', '.page-editor--left');
    this.addView('StatusBarView', '.page-editor--status');
  }

}
