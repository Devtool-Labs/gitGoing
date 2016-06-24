var Github = require('./githubInterface.js');
var Promise = require('bluebird');
module.exports = function(redisClient) {
  var rUtil = require('./redisUtil')(redisClient);

  var checkAndGet = function(params) {
    var { getRedis, setRedis, getGithub, path, user } = params;
    return getRedis(path)
    .then(function(value) {
      if(value === null) { //if no value, make call to github
        return rUtil.getRepo(path)
        .then(function(repo) {
          return getGithub(user.username, repo, path);
        })
        .then(function(data) {
          setRedis(path, JSON.stringify(data));
          return Promise.resolve(data); 
        });
      } else { //if value, return it
        return Promise.resolve(JSON.parse(value));
      }
    });
  }

  return {
    getBranches: function(user, path) {
      return checkAndGet({
        getRedis: rUtil.getBranches,
        setRedis: rUtil.setBranches,
        getGithub: Github.getBranchesData,
        user,
        path
      })
    },
    getBranch: function(username, path) {
      return checkAndGet({
        getRedis: rUtil.getBranch,
        setRedis: rUtil.setBranch,
        getGithub: Github.getBranchData,
        username,
        path,
      })
    },
    getFileTree: function(roomId, username, path) {
      return checkAndGet({
        getRedis: rUtil.getFileTree,
        setRedis: rUtil.setFileTree,
        getGithub: Github.getFileTreeData,
        username,
        path,
      });
    },
    getFile: function(roomId, username, path) {
      return checkAndGet({
        getRedis: rUtil.getFile,
        setRedis: rUtil.setFile,
        getGithub: Github.getFileData,
        username,
        path,
      });
    }
  }
}