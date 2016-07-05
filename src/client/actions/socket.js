export const CONNECT_ROOM_START = 'CONNECT_ROOM_START';
export const CONNECT_ROOM_COMPLETE = 'CONNECT_ROOM_COMPLETE';

export const ALREADY_CONNECTED = 'ALREADY_CONNECTED';

export const UPDATE_FILE = 'SOCKET_SEND_FILE';

export const alreadyConnected = function() {
  return {
    type: ALREADY_CONNECTED
  }
}

export const connectRoomStart = function(roomId) {
  return {
    type: CONNECT_ROOM_START,
    roomId
  }
}

export const connectRoomComplete = function() {
  return {
    type: CONNECT_ROOM_COMPLETE
  }
}

export const socketSendFile = function() {
  return {
    type: UPDATE_FILE,
  }

}

export const initialize = function(roomId) {
  return (dispatcher, getState) => {
    let { socket, room } = getState();
    if(socket.connection) {
      dispatcher(alreadyConnected());
      return;
    }
    dispatcher(connectRoomStart(roomId));
    socket = getState().socket;
    socket.connection.on('connect', (sock) => {
      dispatcher(connectRoomComplete());
    });
  }
}

export const joinRoom = function(roomId, user) {
  return (dispatcher, getState) => {
    let { socket } = getState();
    console.log('JIOGjeiowjgoweg');
    socket.connection.emit('joinRoom', {
      roomId,
      user
    });
  }
}

export const updateFile = function(fileContents) {
  return (dispatcher, getState) => {
    let { socket, ui, room } = getState();
    dispatcher(socketSendFile());
    socket.connection.emit('updateFile', {
      room: room.roomId,
      path: ui.currentFilePath,
      sha: ui.currentCommitSha,
      content: fileContents
    });
  }
}

export const listenToOutwardFileUpdate = function(listener) {
  return (dispatcher, getState) => {
    let socket = getState().socket;
    socket.connection.on('updateFileOutward', function(message) {
      listener(message);
    });
  }
}

//listen for other people entering the room
export const listenToOutwardJoinRoom = function (listener) {
  return (dispatcher, getState) => {
    let socket = getState().socket;
    socket.connection.on('joinRoomOutward', function (data) {
      console.log('got the data in the action!', data);
      listener(data);
    });
  }
};
