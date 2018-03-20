'use strict';

module.exports = class RequestManager {

  constructor(manager, config) {
    this._config = config;
    this._storage = manager.getManager('StorageManager');
    this._status = manager.getManager('ViewManager').getView('StatusBarView');
    this._github = manager.getManager('GithubManager');
    this._requests = {};
  }

  status(message, request = null) {
    request = request || this._requests[0];
    this._status.getData().status = message + ': ' + request.command;
  }

  tick() {
    let l = 0;

    for (const index in this._requests) {
      const request = this._requests[index];

      l++;
      if (l === this._config.limit) break;
      if (request.running) continue;
      log('HANDLE REQUEST:', request);
      request.running = true;
      request.storage = this._github[request.command](request, this.update.bind(this));
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
    if (err) return this.error(err);

    log('UPDATE REQUEST:', request);
    this._storage.update(request.storage, data);
    this.callback(request, data);
    request.running = false;
    delete this._requests[request.command];
    this.tick();
  }

  error(err) {
    log('ERROR REQUEST:', this._requests[0]);
  }

  callback(request, data) {
    for (const callback of request.callbacks) {
      if (typeof callback === 'function') {
        return callback(request, data);
      } else if (Array.isArray(callback)) {
        if (callback.length === 1) {
          return callback[0](request, data);
        } else if (callback.length === 2) {
          return callback[1].call(callback[0], request, data);
        }
      }
    }
    console.error('Callback is not valid for command "' + request.command + '".');
  }

}
