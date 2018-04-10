'use strict';

window.log = require('./system/Logger');

const remote = require('electron').remote;

remote.getCurrentWindow().setBounds(remote.screen.getPrimaryDisplay().bounds);

const mousetrap = require('mousetrap');

const Manager = require('./system/Manager');
const manager = new Manager({
  mode: 'render',
  execute: __filename,
  root: __dirname,
  user: require('./user.json'),
  managers: require('./managers.json'),
});

window.addEventListener('beforeunload', function (e) {
  if (manager.getStatus() !== Manager.EXIT) e.returnValue = false;
  manager.setStatus(Manager.EXIT);

  const message = manager.getManager('ViewManager').getView('MessageOverlayView');
  const batch = manager.batch('system:exit');

  batch.execute(message, 'Process: system:exit')
    .then(function () {
      require('electron').remote.app.quit();
    });
});

manager.getManager('PageManager').getPage('SystemPage').mount('body');
//*
Mousetrap.bind(['command+p', 'ctrl+p'], function () {
  manager.getManager('CommandManager').choseCommand();
});

/*
Mousetrap.bind(['esc'], function () {
  const overlayview = manager.getManager('ViewManager').getView('CommandOverlayView');

  if (overlayview.getData().show) {
    overlayview.getData().show = false;
  }
});
*/
manager.setStatus(Manager.NORMAL);
return;
/*
const user = require('./user.json');

const GitHub = require('github-api');
const axios = require('axios').create({
  baseURL: 'https://api.github.com',
  timeout: 1000,
  headers: {
    'Authorization': 'token ' + user.token,
  }
});
const $ = require('jquery');
const os = require('os');
const data = {};

const gh = new GitHub(user);

$('body').append('<ul class="root repos"></ul>');

gh.getUser().listRepos({}, function (err, repos) {
  data.repos = {};
  const list = $('.repos');

  for (const repo of repos) {
    data.repos[repo.name] = {
      data: repo,
      repo: null,
    };
    list.append('<li class="repo repo-' + repo.name + '" data-repo="' + repo.name + '"><label>' + repo.name + '</label></li>');
  }
  $('.repo', list).on('click', getPullRequests);
});

function getPullRequests(e) {
  e.preventDefault();
  e.stopPropagation();

  const item = $(this);
  const repo = data.repos[item.data('repo')];

  if (repo.repo === null) {
    repo.prs = {};
    const list = $('<ul class="prs"></ul>');

    repo.repo = gh.getRepo(user.username, repo.data.name);
    repo.repo.listPullRequests({}, function (err, prs) {
      for (const pr of prs) {
        repo.prs[pr.number] = pr;
        list.append('<li class="pr pr-' + pr.number + '" data-pr="' + pr.number + '"><label>' + pr.base.ref + ' <= ' + pr.head.ref + ' (' + pr.number + ')' + '</label></li>');
      }
      $('.pr', list).on('click', getPullRequestFiles);
      item.append(list);
    });
  }
}

function getPullRequestFiles(e) {
  e.preventDefault();
  e.stopPropagation();

  const item = $(this);
  const repo = data.repos[item.parents('.repo').data('repo')];
  const pr = repo.prs[item.data('pr')];

  if (pr.files === undefined) {
    pr.files = {};
    const list = $('<ul class="files"></ul>');

    repo.repo.listPullRequestFiles(pr.number, function (err, files) {
      for (const file of files) {
        const key = file.filename.replace(/[\/_\s]/, '-');

        pr.files[key] = file;
        list.append('<li class="file file-' + key + '" data-file="' + key + '"><label>' + file.filename + ' (+ ' + file.additions + ' - ' + file.deletions + ' * ' + file.changes + ')' + '</label></li>');
      }
      $('.file', list).on('click', showPatch);
      item.append(list);
    });
  }
}

function showPatch(e) {
  e.preventDefault();
  e.stopPropagation();

  const item = $(this);
  const repo = data.repos[item.parents('.repo').data('repo')];
  const pr = repo.prs[item.parents('.pr').data('pr')];
  const file = pr.files[item.data('file')];

  const list = $('<ul class="lines"></ul>');
  const lines = file.patch.split('\n');

  for (const line of lines) {
    let padding = 0;
    let match = null;

    if (match = line.match(/^([+-\s]*)/)) {
      padding = match[1].length * 15;
    }
    list.append('<li class="line" style="padding-left: ' + padding + 'px">' + line + '</li>');
  }

  item.append(list);

  log(repo);
  axios
    .post('/repos/' + user.username + '/' + repo.data.name + '/pulls/' + pr.number + '/reviews', {
      body: 'Please change',
      event: 'REQUEST_CHANGES',
      comments: [
        {
          path: file.filename,
          position: 6,
          body: 'hier bitte',
        }
      ]
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      log(arguments);
    });
}
*/
