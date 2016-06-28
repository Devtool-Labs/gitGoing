import * as fetchHelper from './fetchHelper.js';

export const FILETREE_RECURSIVE_GET_REQUEST = 'FILETREE_RECURSIVE_GET_REQUEST';
export const FILETREE_RECURSIVE_GET_RESPONSE = 'FILETREE_RECURSIVE_GET_RESPONSE';

export const fileTreeRecursiveGetRequest = function () {
  return {
    type: FILETREE_RECURSIVE_GET_REQUEST
  };
};

export const fileTreeRecursiveGetResponse = function (status, data) {
  return {
    type: FILETREE_RECURSIVE_GET_RESPONSE,
    status,
    data,
  };
};

export const get = function (roomid, sha) {
  var apiEndpoint = '/api/room/' + roomid + '/git/tree/' + sha;
  console.log('the endpoint is', apiEndpoint);
  return fetchHelper.get({
    request: fileTreeRecursiveGetRequest,
    response: fileTreeRecursiveGetResponse
  }, apiEndpoint);
};