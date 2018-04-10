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
      loading: false,
      items: [],
    };
  }

  params(manager) {
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
          this.loading = true;
          manager.getManager('StorageManager').get('repos').then(this.addRepoCallback.bind(this));
        },

        addRepoCallback(repos) {
          const options = [];

          for (const repo of repos.data) {
            if (this.items.indexOf(repo.name) === -1) {
              options.push(repo.name);
            }
          }
          manager.getManager('ViewManager').getView('CommandOverlayView').select(options).then(this.addRepoSelect);
          this.loading = false;
        },

        addRepoSelect(data) {
          this.items.push(data.option.name);
          manager.getManager('StorageManager').set('watchRepos', this.items);
        },

      },

    }
  }

}
