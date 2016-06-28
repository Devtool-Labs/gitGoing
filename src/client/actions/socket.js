export const CONNECT_SOCKET = 'CONNECT_SOCKET';

export const connectSocket = function() {
  return {
    type: CONNECT_SOCKET
  }
}

export const attachListener = function(listener) {
  return (disaptcher, getstate) => {
    const state = getstate();
    if(!state.connection) {
      disaptcher(connectSocket());
    }


  }
}