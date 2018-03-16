'use strict';

const View = require('./View');

module.exports = class RepositoryView extends View {

  get template() { return 'lists.list-items'; }

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
      loading: false,
    };
  }

  get params() {
    return {

      computed: {
        styles: function () {
          return {
            height: (this.show ? this.item.height * this.items.length + 'px' : '0px'),
          };
        },
        classes: function () {
          return {
            'list--content--show': this.show,
          };
        },
      },

      methods: {
        update: function () {
          if (this.show) {
            this.show = false;
            return;
          }
          const that = this;

          that.loading = true;
          that.show = true;
          gh.getUser().listRepos({}, function (err, repos) {
            const list = [];

            for (const repo of repos) {
              list.push({
                name: repo.name,
              });
            }
            that.items = list;
            that.loading = false;
          });
        },
        toggle: function () {
          this.show = !this.show;
        },
      },

    }
  }

}
