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
      redisClient.incrbyAync('ROOMCOUNT')
      .then(function(roomCount) {
        var room = {
          roomId: roomCount,
          host: userId
        }
        return redisClient.hset('room', roomId, JSON.stringify(room));
      });
    }

  }
}