import * as fetchHelper from './fetchHelper.js';

export const ROOMS_GET_REQUEST = 'ROOMS_GET_REQUEST';
export const ROOMS_GET_RESPONSE = 'ROOMS_GET_RESPONSE';

const ENDPOINT = '/api/rooms/getAll';
export const roomsGetRequest = function() {
  return {
    type: ROOMS_GET_REQUEST
  };
};

export const roomsGetResponse = function(status, data) {
  return {
    type: ROOMS_GET_RESPONSE,
    status,
    data
  };
};

export const get = function(roomid){
  return fetchHelper.get({
    request: roomsGetRequest,
    response: roomsGetResponse
  }, ENDPOINT);
};
