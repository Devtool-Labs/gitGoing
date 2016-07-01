//var Promise = require('es6-promise').polyfill();
var Promise = require('bluebird');
var fetch = require('isomorphic-fetch');
fetch.Promise = Promise;
var atob = require('atob');

exports.getUsername = function (accessToken) {
  var userTokenURL = 'https://api.github.com/user?access_token=' + accessToken;
  fetch(userTokenURL)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('There was an error recognizing your username');
      }
      return response;
    });
};

exports.getRepositoryData = function (username, accessToken) {
  var repositoryEndpoint = 'https://api.github.com/users/' + username + '/repos';
  if(accessToken) {
    repositoryEndpoint += '?access_token=' + accessToken;
  }
  return fetch(repositoryEndpoint)
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error in retrieving your repos from the server.');
      }
      return response.json();
    })
    .then(function(json) {
      return Promise.resolve(json);
    })
};

exports.getBranchesData = function (username, repo, path, accessToken) {
  var endpoint = 'https://api.github.com/repos/'+username +'/'+repo +'/branches';
  if(accessToken) {
    endpoint += '?access_token=' + accessToken;
  }
  return fetch(endpoint)
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error in retrieving your branches from the server.');
      }
      return response.json();
    })
    .then(function (json) {
      return Promise.resolve(json);
    });
};

exports.getBranchData = function (username, repo, path, accessToken) {
  var { branch } = path;
  var endpoint = 'https://api.github.com/repos/'+username +'/'+repo +'/branches/' + branch;
  if(accessToken) {
    endpoint += '?access_token=' + accessToken;
  }
  return fetch(endpoint)
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error in retrieving your branches from the server.');
      }
      return response.json();
    })
    .then(function (json) {
      return Promise.resolve(json);
    });
};

exports.getCommitsData = function(username, repo, path, accessToken) {
  var endpoint = 'https://api.github.com/repos/'+username +'/'+repo +'/commits';
  if(accessToken) {
    endpoint += '?access_token=' + accessToken;
  }
  return fetch(endpoint)
    .then(function(response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error in retrieving your commits');
      }
      return response.json();
    })
    .then(function(json) {
      return Promise.resolve(json);
    });
}

exports.getFileTreeData = function (username, repo, path, accessToken) {
  var {sha} = path;
  var endpoint = 'https://api.github.com/repos/' + username + '/' + repo + '/git/trees/' + sha + '?recursive=3';
  if(accessToken) {
    endpoint += '&access_token=' + accessToken;
  }
  console.log(endpoint);
  return fetch(endpoint)
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error in getting your files from GitHub. Status:' + response.status);
      }
      return response.json();
    })
    .then(function (json) {
      return Promise.resolve(json);
    });
};

exports.getFileContents = function (username, repo, path, accessToken) {
  var {file, sha} = path
  var endpoint = 'https://api.github.com/repos/' + username + '/' + repo + '/contents/' + file + '?ref=' + sha;
  if(accessToken) {
    endpoint += '&access_token=' + accessToken;
  }
  return fetch(endpoint)
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error loading the file contents.');
      }
      return response.json();
    })
    .then(function(json) {
      json.content = atob(json.content);
      return Promise.resolve(json);
    });
};

exports.pushFile = function(username, repo, path, accessToken) {
  var {file, sha} = path
  if(!accessToken) {
    return Promise.reject('Push file failed, no access token');
  }
  var body = {
    path: file,
    message,
    content,
    sha,
    branch
  }

  var endpoint = 'https://api.github.com/repos/' + username + '/' + repo + '/contents/' + file;
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error editing file. Status:', response.status);
      }
      return response.json();
    })
    .then(function(json) {
      return Promise.resolve(json);
    })
}
