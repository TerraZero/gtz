'use strict';

const GitHub = require('github-api');

module.exports = class GithubManager {

  constructor(manager) {
    this._api = new GitHub(manager.getSetting('user'));
  }

  repos() {
    return this._api
      .getUser()
      .listRepos()
      .catch(log.error);
  }

}
