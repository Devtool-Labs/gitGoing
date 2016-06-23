import * as fetchHelper from './fetchHelper.js';

export const ROOM_GET_REQUEST = 'ROOM_GET_REQUEST';
export const ROOM_GET_RESPONSE = 'ROOM_GET_RESPONSE';
export const ROOM_POST_RESPONSE = 'ROOM_POST_RESPONSE';
export const ROOM_POST_REQUEST = 'ROOM_POST_REQUEST';


export const roomGetRequest = function() {
  return {
    type: ROOM_GET_REQUEST
  };
};

export const roomGetResponse = function(status, data) {
  return {
    type: ROOM_GET_RESPONSE,
    status,
    data
  };
};

export const roomPostRequest = function() {
  return {
    type: ROOM_POST_REQUEST
  };
};

export const roomPostResponse = function(status, data) {
  return {
    type: ROOM_POST_RESPONSE,
    status,
    data
  };
};

export const create = function(repoName, data) {
  var apiEndpoint = '/repo/' + repoName + '/createroom';
  return fetchHelper.post({
    request: roomPostRequest,
    response: roomPostResponse
  }, apiEndpoint, data);
}