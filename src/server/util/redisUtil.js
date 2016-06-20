module.exports = function (redisClient) {
  return {
    checkAndSet : function(key, value) {
      return redisClient.getAsync(key)
      .then(function(v) {
        if(v === null) {
          return redisClient.setAsync(key, value)
        }
      })
    }
  }
}