'use strict';

const Command = require('./Command');

module.exports = class AddRepoCommand extends Command {

  execute() {
    return this.getRepo()
      .then(this.selectRepo.bind(this))
      .then(this.addRepoWatch.bind(this));
  }

  getRepo() {
    return this.get('repos') || this._api.repos();
  }

  selectRepo(repos) {
    const watchRepos = this.get('watchRepos', false) || [];
    const options = [];

    this.set('repos', repos);

    for (const repo of repos) {
      if (watchRepos.indexOf(repo.name) === -1) {
        options.push(repo.name);
      }
    }
    return this.select(options);
  }

  addRepoWatch(data) {
    const watchRepos = this.get('watchRepos', false) || [];

    watchRepos.push(data.option.name);
    this.set('watchRepos', watchRepos);
    return watchRepos;
  }

}
