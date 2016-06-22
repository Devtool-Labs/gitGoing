var Github = require('./githubInterface.js');

module.exports = function(redisClient) {
  rUtil = require('./redisUtil')(redisClient);

  var checkAndGet = function(params) {
    var { getRedis, setRedis, getGithub, path, username } = params;
    return getRedis(path)
    .then(function(value) {
      if(value === null) { //if no value, make call to github
        return rUtil.getRepo(path.roomId)
        .then(function(repo) {
          return getGithub(username, repo, path);
        })
        .then(function(data) {
          setRedis(path, data);
          return Promise.resolve(data); 
        });
      } else { //if value, return it
        return Promise.resolve(value);
      }
    });
  }

  return {
    getBranches: function(username, path) {
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