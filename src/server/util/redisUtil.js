const Promise = require('bluebird');

module.exports = function (redisClient) {
  return {
    setUserToken : function(userId, token) {
      return redisClient.setAsync('user:' + userId + ':token', token );
    },
    setNewRoom : function(userId, repo) {
      let roomCount;
      return redisClient.incrbyAsync('ROOMCOUNT', 1)
      .then(function(rCount) {
        roomCount = rCount;
        return redisClient.setAsync('room:' + rCount +':host', userId);
      })
      .then(function() {
        return redisClient.setAsync('room:' + roomCount +':repo', repo);
      })
      .then(function() {
        return new Promise.resolve({
          roomId : roomCount,
          hostId : userId,
          repo
        });
      });
    },
    getRepo : function(path) {
      return redisClient.getAsync('room:' + path.roomId +':repo');
    },
    setRepo : function(path, repo) {
      return redisClient.setAsync('room:' + path.roomId +':repo', repo);
    },
    missingParam : function() {
      return Promise.reject('missing param');
    },
    path : function(roomId, branch, sha, file) {
      return {
        roomId,
        branch,
        sha,
        file
      }
    },
    getBranches : function(path) {
      return redisClient.getAsync('room:' + path.roomId + ':branches');
    },
    setBranches : function(path, branches) {
      return redisClient.setAsync('room:'+path.roomId+':branches', branches);
    },
    getBranch : function(path) {
      return redisClient.getAsync('room:'+ path.roomId+ ':branch:'+ path.branch);
    },
    setBranch : function(path, branch) {
      return redisClient.setAsync('room:'+ path.roomId+ ':branch:'+ path.branch, branch);
    },
    getFileTree : function(path) {
      return redisClient.getAsync('room:'+ path.roomId+ ':tree:sha:'+ path.sha);
    },
    setFileTree : function(path, tree) {
      return redisClient.setAsync('room:'+ path.roomId+ ':tree:sha:'+ path.sha, tree);
    },
    getFile : function(path) {
      return redisClient.getAsync('room:'+ path.roomId+ ':sha:'+ path.sha+ ':'+ path.file)
    },
    setFile : function(path, file) {
      return redisClient.setAsync('room:'+ path.roomId+ ':sha:'+ path.sha+ ':'+ path.file, file)
    }

  }
}