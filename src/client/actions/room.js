import * as fetchHelper from './fetchHelper.js';
import { push } from 'react-router-redux';
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

export const get = function() {
  return fetchHelper.get(function() {

  });
}

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
  var apiEndpoint = '/api/repo/' + repoName + '/createroom';
  return fetchHelper.post({
    request: roomPostRequest,
    response: roomPostResponse
  }, apiEndpoint, data);
}

export const createAndRedirect = function(repoName) {
  return (dispatcher, getState) => {
    dispatcher(roomPostRequest());
    let status;
    return fetch('/api/repo/' + repoName + '/createroom', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => { 
      status= response.status;
      return response.json()
    })
    .then(json => {
      dispatcher(roomPostResponse(status, json));
      return dispatcher(push('/room/'+json.roomId));
    })
  }
}