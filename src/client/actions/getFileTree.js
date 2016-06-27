import * as fetchHelper from './fetchHelper.js';

export const FILETREE_GET_REQUEST = 'FILETREE_GET_REQUEST';
export const FILETREE_GET_RESPONSE = 'FILETREE_GET_RESPONSE';

export const fileTreeGetRequest = function () {
  return {
    type: FILETREE_GET_REQUEST
  };
};

export const fileTreeGetResponse = function (status, data) {
  return {
    type: FILETREE_GET_RESPONSE,
    status,
    data
  };
};

export const get = function (roomid, sha) {
  var apiEndpoint = '/api/room/' + roomid + '/git/tree/' + sha;
  console.log('the endpoint is', apiEndpoint);
  return fetchHelper.get({
    request: fileTreeGetRequest,
    response: fileTreeGetResponse
  }, apiEndpoint);
};