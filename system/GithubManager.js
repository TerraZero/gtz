'use strict';

const GitHub = require('github-api');

module.exports = class GithubManager {

  constructor(manager) {
    this._api = new GitHub(manager.getSetting('user'));
  }

  repos() {
    log.loading('Loading repository informations');
    return this._api
      .getUser()
      .listRepos()
      .then(function (data) {
        log.loading();
        return data.data;
      })
      .catch(log.error);
  }

}
