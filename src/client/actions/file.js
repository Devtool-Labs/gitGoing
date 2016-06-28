import * as fetchHelper from './fetchHelper.js';

export const FILE_GET_REQUEST = 'FILE_GET_REQUEST';
export const FILE_GET_RESPONSE = 'FILE_GET_RESPONSE';

export const fileGetRequest = function() {
  return {
    type: FILE_GET_REQUEST
  };
};

export const FileGetResponse = function(status, data) {
  return {
    type: FILE_GET_RESPONSE,
    status,
    data
  };
};

export const get = function(roomid, sha, file) {
  var apiEndpoint = `/api/room/${roomid}/sha/${sha}/file/${file]`;
  return fetchHelper.get({
    request: fileGetRequest,
    response: fileGetResponse,
  }, apiEndpoint)
}
