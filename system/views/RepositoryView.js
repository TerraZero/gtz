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

  params(manager) {
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

        toggle: function () {
          this.show = !this.show;
          if (!this.show) return;

          this.loading = true;
          manager.getManager('RequestManager').add('repos', [this, this.update]);
        },

        update: function (req, data) {
          this.items = [];
          for (const repo of data) {
            this.items.push(repo);
          }
          this.loading = false;
        },

      },

    }
  }

}
