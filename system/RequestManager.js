'use strict';

module.exports = class RequestManager {

  constructor(manager) {
    this._status = manager.getManager('ViewManager').getView('StatusBarView');
    this._github = manager.getManager('GithubManager');
    this._requests = [];
    this._running = false;
  }

  status(message, request = null) {
    request = request || this._requests[0];
    this._status.getData().status = message + ': ' + request.command;
  }

  tick() {
    if (!this._running && this._requests.length) {
      this._running = true;
      const request = this._requests[0];

      log('HANDLE REQUEST:', request);
      this.status('HANDLE REQUEST');
      this._github[request.command](this.update.bind(this));
    }
  }

  add(command, callback) {
    this._requests.push({ command, callback });
    log('ADD REQUEST:', this._requests[this._requests.length - 1]);
    this.status('ADD REQUEST', this._requests[this._requests.length - 1]);
    this.tick();
  }

  update(err, data) {
    if (err) return this.error(err);

    log('UPDATE REQUEST:', this._requests[0]);
    this.status('UPDATE REQUEST');
    this.callback(this._requests.shift(), data);
    this._running = false;
    this.tick();
  }

  error(err) {
    log('ERROR REQUEST:', this._requests[0]);
    this.status('ERROR REQUEST');
  }

  callback(request, data) {
    if (typeof request.callback === 'function') {
      return request.callback(request, data);
    } else if (Array.isArray(request.callback)) {
      if (request.callback.length === 1) {
        return request.callback[0](request, data);
      } else if (request.callback.length === 2) {
        return request.callback[1].call(request.callback[0], request, data);
      }
    }
    console.error('Callback is not valid for command "' + request.command + '".');
  }

}
