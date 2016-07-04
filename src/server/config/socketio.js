
module.exports = function(socketClient , redisClient) {
  const rUtil = require('../util/redisUtil')(redisClient);

  socketClient.on('connection', function (socket){
    socket.on('updateFile', function (message) {
      const path = {
        roomId: message.room,
        sha: message.sha, //commit sha
        file: message.path
      };
      console.log(message);
      rUtil.setFileContent(path, message.content)
      .then(function(exists) {
        socket.broadcast.emit('updateFileOutward', message);
      })
    });
  });
}