var Promise = require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');

//testing access token: 256d9d0eab9254ead07c447ec4011cf8040a4851

//function 1:
  // will take the access token as a parameter
  // get the username from github

exports.getUsernameAndRepos = function (accessToken) {
  var userTokenURL = 'https://api.github.com/user?access_token=' + accessToken;
  fetch(userTokenURL)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('There was an error recognizing your username');
      }
      return response;
    });
};

//function 2: 
  // get the data for all the branches within a requested repo

exports.getRepositoryData = function (username) {
  var repositoryEndpoint = 'https://api.github.com/users/' + username + '/repos';
  fetch(repositoryEndpoint)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('There was an error in retrieving your repos from the server.');
      }
      return response;
    });
};



//function 3: 
  // get the data for all the branches within a requested repo

exports.getBranchData = function (username) {
  var endpoint = 'https://api.github.com/users/' + username + '/repos';
  fetch(endpoint)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('There was an error in retrieving your branches from the server.');
      }
      return response;
    });
};

//function 4: 
  // get the data for the filetree contained in one branch of a certain repo 

exports.getFileTreeData = function (username, repo, sha) {
  var endpoint = 'https://api.github.com/repos/' + username + '/' + repo + '/git/trees/' + sha;
  fetch(endpoint)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('There was an error in getting your files from GitHub.');
      }
      return response;
    });
};

//function 5:
  //get the contents for a particular requested file

exports.getFileContents = function (username, repoName, filePath) {
  var endpoint = 'https://api.github.com/repos/' + username + '/' + repoName + '/contents/' + filePath;
  fetch(endpoint)
    .then(function () {
      if (response.status >= 400) {
        throw new Error('There was an error loading the file contents.');
      }
      return response;
    });
};
