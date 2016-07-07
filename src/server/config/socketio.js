
module.exports = function(socketClient , redisClient) {
  const rUtil = require('../util/redisUtil')(redisClient);

  socketClient.on('connection', function (socket){
    socket.on('joinRoom', function (data) {
      socket.join(data.roomId);
      socket.to(data.roomId).broadcast.emit('joinRoomOutward', data);
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
      });
    });

    socket.on('sendChat', function (message) {
      console.log('on the server side!', message);
      socketClient.to(message.roomId).emit('sendChatOutward', message);
    });

    socket.on('leaveRoom', function (person) {
      socket.leave(person.roomId);
      socket.to(person.roomId).broadcast.emit('leaveRoomOutward', person);
    });

  });
};