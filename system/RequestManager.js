'use strict';

module.exports = class RequestManager {

  constructor(manager, config) {
    this._config = config;
    this._manager = manager;
    this._github = manager.getManager('GithubManager');
    this._requests = {};
  }

  tick() {
    let l = 0;

    for (const index in this._requests) {
      const request = this._requests[index];

      l++;
      if (l === this._config.limit) break;
      if (request.running) continue;
      request.running = true;
      this._github[request.command](request, this.update.bind(this));
    }
  }

  add(command, callback) {
    if (this._requests[command] !== undefined) {
      this._requests[command].callbacks.push(callback);
    } else {
      this._requests[command] = {
        command: command,
        callbacks: [callback],
        running: false,
      };
    }
    this.tick();
  }

  update(err, request, data) {
    if (err) return this.error(err, request, data);

    this._manager.callback(request.callbacks, request, data);
    request.running = false;
    delete this._requests[request.command];
    this.tick();
  }

  error(err, request, data) {
    log('ERROR');
    log(err);
    log(request);
    log(data);
  }

}
