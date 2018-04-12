'use strict';

const Command = require('./Command');

module.exports = class AddRepoCommand extends Command {

  execute() {
    const repos = this.get('repos');

    if (repos === null) {
      this._api.repos().then(this.selectRepo.bind(this));
    } else {
      this.selectRepo(repos);
    }
  }

  selectRepo(repos) {
    const watchRepos = this.get('watchRepos') || [];
    const options = [];

    this.set('repos', repos);

    for (const repo of repos) {
      if (watchRepos.indexOf(repo.name) === -1) {
        options.push(repo.name);
      }
    }
    this.select(options).then(this.addRepoWatch.bind(this));
    return repos;
  }

  addRepoWatch(data) {
    const watchRepos = this.get('watchRepos') || [];

    watchRepos.push(data.option.name);
    this.set('watchRepos', watchRepos);
    this.finish(watchRepos);
  }

}
