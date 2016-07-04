
module.exports = function(socketClient , redisClient) {
  const rUtil = require('../util/redisUtil')(redisClient);

  socketClient.on('connection', function (socket){
    socket.on('joinRoom', function(message) {
      socket.join(message.roomId);
    });

    socket.on('updateFile', function (message) {

      const path = {
        roomId: message.room,
        sha: message.sha, //commit sha
        file: message.path
      };
      rUtil.setFileContent(path, message.content)
      .then(function(exists) {
        socket.to(path.roomId).broadcast.emit('updateFileOutward', message);
      })
    });
  });
}