'use strict';

const Command = require('./Command');

module.exports = class AddRepoCommand extends Command {

  execute() {
    this.getStorage('repos').then(this.addRepo.bind(this));
  }

  addRepo(data) {
    const options = [];

    for (const repo of data.data) {
      options.push(repo.name);
    }
    this.select(options).then(this.addRepoWatch.bind(this));
    return data;
  }

  addRepoWatch(data) {
    this.addStorage('watchRepos', data.option.name);
  }

}
