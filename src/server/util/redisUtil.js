const Promise = require('bluebird');

const stringifyObj = function(obj) {
  var output= {};
  for(var key in obj) {
    output[key] = JSON.stringify(obj[key]);
  }
  return output;
}

const parseObj = function(obj) {
  var output = {};
  for(var key in obj) {
    output[key] = JSON.parse(obj[key]); 
  }
  return output;
}

module.exports = function (redisClient) {
  return {
    setUserToken : function(userId, token) {
      return redisClient.setAsync('user:' + userId + ':token', token );
    },
    getRoom : function(roomId) {
      let hostId;
      return redisClient.getAsync('room:' + roomId +':host')
      .then(function(h) {
        hostId = h;
        return redisClient.getAsync('room:'+ roomId+ ':repo');
      })
      .then(function(repo) {
        return Promise.resolve({
          roomId,
          hostId,
          repo
        })
      });
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
      return redisClient.getAsync('room:' + path.roomId + ':branches')
      .then(function(data) {
        return Promise.resolve(JSON.parse(data));
      });
    },
    setBranches : function(path, branches) {
      return redisClient.setAsync('room:'+path.roomId+':branches', JSON.stringify(branches));
    },
    getBranch : function(path) {
      return redisClient.getAsync('room:'+ path.roomId+ ':branch:'+ path.branch);
    },
    setBranch : function(path, branch) {
      return redisClient.setAsync('room:'+ path.roomId+ ':branch:'+ path.branch, branch);
    },
    getFileTree : function(path) {
      return redisClient.getAsync('room:'+ path.roomId+ ':tree:sha:'+ path.sha)
      .then(function(str){
        return Promise.resolve(JSON.parse(str));
      });
    },
    setFileTree : function(path, tree) {
      return redisClient.setAsync('room:'+ path.roomId+ ':tree:sha:'+ path.sha, JSON.stringify(tree));
    },
    getFile : function(path) {
      return redisClient.hgetallAsync('room:'+ path.roomId+ ':sha:'+ path.sha+ ':'+ path.file)
      .then(function(file) {
        return Promise.resolve(parseObj(file));
      })
    },
    setFile : function(path, file) {
      return redisClient.HMSETAsync('room:'+ path.roomId+ ':sha:'+ path.sha+ ':'+ path.file, stringifyObj(file))
    },
    setFileContent : function(path, fileContent) {
      return redisClient.hsetAsync('room:'+ path.roomId+ ':sha:'+ path.sha+ ':'+ path.file, 'content', JSON.stringify(fileContent));
    },
    getFileContent : function(path) {
      return redisClient.hgetAsync('room:'+ path.roomId+ ':sha:'+ path.sha+ ':'+ path.file, 'content')
      .then(function(data) {
        return Promise.resolve(JSON.parse(data));
      });
    },
    getCommits : function(path) {
      return redisClient.getAsync('room:'+ path.roomId+ ':commits')
      .then(function(data) {
        return Promise.resolve(JSON.parse(data));
      });
    },
    setCommits : function(path, commits) {
      return redisClient.setAsync('room:'+ path.roomId+ ':commits', JSON.stringify(commits));
    },

  }
}