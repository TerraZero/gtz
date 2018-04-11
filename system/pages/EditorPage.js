'use strict';

const Page = require('./Page');

module.exports = class EditorPage extends Page {

  get template() { return 'page.editor'; }

  get render() {
    return {
      id: 'page-editor',
    };
  }

  create() {
    this.addView('RepositoryView', '.page-editor--left');
  }

}
