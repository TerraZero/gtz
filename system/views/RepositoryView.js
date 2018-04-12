'use strict';

const View = require('./View');

module.exports = class RepositoryView extends View {

  get template() { return 'lists.repos-view'; }

  get render() {
    return {
      id: 'repo-list',
      title: 'Repositories',
    }
  }

  get data() {
    return {
      show: false,
      item: {
        height: 22,
      },
      items: [],
    };
  }

  params(manager) {
    manager.addListener('storage.change.watchRepos', null, [this, this.onWatchRepos]);

    return {

      computed: {

        classes() {
          return {
            'list-items--content--show': this.show,
          };
        },

        styles() {
          return {
            height: (this.show ? this.item.height * this.items.length + 'px' : '0px'),
          };
        },

        count() {
          return 0 + ' / ' + this.items.length;
        }

      },

      methods: {

        toggle() {
          this.show = !this.show;
          if (!this.show) return;
        },

        addRepo() {
          manager.getManager('CommandManager').runCommand('AddRepoCommand');
        },

      },

    }
  }

  onWatchRepos(values, info) {
    this.getData().items = values;
  }

}
