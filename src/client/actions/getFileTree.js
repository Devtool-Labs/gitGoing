import * as fetchHelper from './fetchHelper.js';

export const FILETREE_GET_REQUEST = 'FILETREE_GET_REQUEST';
export const FILETREE_GET_RESPONSE = 'FILETREE_GET_RESPONSE';

export const fileTreeGetRequest = function () {
  return {
    type: FILETREE_GET_REQUEST
  };
};

export const fileTreeGetResponse = function () {
  return {
    type: FILETREE_GET_RESPONSE
  };
};

export const get = function (roomid, sha) {
  var apiEndpoint = '/room/' + roomid + '/git/tree/' + sha;
  return fetchHelper.get({
    request: fileTreeGetRequest,
    response: fileTreeGetResponse
  }, apiEndpoint);
};