'use strict';

const GitHub = require('github-api');

module.exports = class GithubManager {

  constructor(manager) {
    this._api = new GitHub(manager.getSetting('user'));
  }

  repos(request, cb) {
    this._api.getUser().listRepos({}, function (err, data) {
      cb(err, request, data);
    });
  }

}
