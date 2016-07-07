//var Promise = require('es6-promise').polyfill();
var Promise = require('bluebird');
var fetch = require('isomorphic-fetch');
fetch.Promise = Promise;
var atob = require('atob');
var btoa = require('btoa');

var fetchHelper = function(endpoint) {
  return fetch(endpoint)
    .then(function (response) {
      if(response.status >= 400) {
        console.log('ERROR:', response.status);
        console.log('AT ENDPOINT:', endpoint);
        return Promise.reject('ERROR: ' + response.status);
      }
      return response.json();
    })
    .then(function(json) {
      return Promise.resolve(json);
    });
}

exports.getRepositoryData = function (username, accessToken) {
  var repositoryEndpoint = 'https://api.github.com/users/' + username + '/repos';
  if(accessToken) {
    repositoryEndpoint += '?access_token=' + accessToken;
  }
  return fetchHelper(repositoryEndpoint);
};

exports.getBranchesData = function (username, repo, path, accessToken) {
  var endpoint = 'https://api.github.com/repos/'+username +'/'+repo +'/branches';
  if(accessToken) {
    endpoint += '?access_token=' + accessToken;
  }
  return fetchHelper(endpoint);
};

exports.getBranchData = function (username, repo, path, accessToken) {
  var { branch } = path;
  var endpoint = 'https://api.github.com/repos/'+username +'/'+repo +'/branches/' + branch;
  if(accessToken) {
    endpoint += '?access_token=' + accessToken;
  }
  return fetchHelper(endpoint);
};

exports.getCommitsData = function(username, repo, path, accessToken) {
  var endpoint = 'https://api.github.com/repos/'+username +'/'+repo +'/commits?sha=' + path.sha;
  if(accessToken) {
    endpoint += '&access_token=' + accessToken;
  }
  return fetchHelper(endpoint);
}

exports.getFileTreeData = function (username, repo, path, accessToken) {
  var {sha} = path;
  var endpoint = 'https://api.github.com/repos/' + username + '/' + repo + '/git/trees/' + sha;
  if(accessToken) {
    endpoint += '?access_token=' + accessToken;
  }
  return fetchHelper(endpoint);
};

exports.getFileContents = function (username, repo, path, accessToken) {
  var {file, sha} = path
  var endpoint = 'https://api.github.com/repos/' + username + '/' + repo + '/contents/' + file + '?ref=' + sha;
  if(accessToken) {
    endpoint += '&access_token=' + accessToken;
  }
  return fetchHelper(endpoint);
};

exports.pushFile = function(username, repo, path, accessToken, message, content) {
  var {file, fileSha, branch} = path
  if(!accessToken) {
    return Promise.reject('Push file failed, no access token');
  }
  var body = {
    path: file,
    message,
    content: btoa(content),
    sha: fileSha,
    branch
  }
  var endpoint = 'https://api.github.com/repos/' + username + '/' + repo + '/contents/' + file;
  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Authorization': 'token '+accessToken,
      'Accept': 'application/json',
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
