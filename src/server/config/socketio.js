module.exports = function(socketClient , redisClient) {
  socketClient.on('connection', function (socket, redisClient){
    console.log('a user connected');
    socket.on('Room1', function (message) {
      // broadcast message 
      socketClient.emit('ServerBroadcast', message);
    });
  });
}