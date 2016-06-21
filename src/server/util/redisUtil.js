const Promise = require('bluebird');

module.exports = function (redisClient) {
  return {
    checkAndSetUser : function(key, value) {
      return redisClient.hgetAsync('user', key)
      .then(function(v) {
        if(v === null) {
          return redisClient.hsetAsync('user', key, value)
        }
      })
    },
    createRoom : function(userId) {
      let roomObj;
      return redisClient.incrbyAsync('ROOMCOUNT', 1)
      .then(function(roomCount) {
        roomObj = {
          roomId: roomCount,
          host: userId
        }
        return redisClient.hsetAsync('room', roomCount, JSON.stringify(roomObj));
      })
      .then(function() {
        return new Promise(function(resolve) {
          resolve(roomObj);
        })
      });
    }

  }
}