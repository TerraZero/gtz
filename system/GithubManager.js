'use strict';

const GitHub = require('github-api');

module.exports = class GithubManager {

  constructor(manager) {
    this._api = new GitHub(manager.getSetting('user'));
  }

  repos(cb) {
    this._api.getUser().listRepos({}, cb);
  }

}
