import * as fetchHelper from './fetchHelper.js';

export const FILE_GET_REQUEST = 'FILE_GET_REQUEST';
export const FILE_GET_RESPONSE = 'FILE_GET_RESPONSE';

export const FILE_POST_REQUEST = 'FILE_POST_REQUEST';
export const FILE_POST_RESPONSE = 'FILE_POST_RESPONSE';

export const fileGetRequest = function() {
  return {
    type: FILE_GET_REQUEST
  };
};

export const fileGetResponse = function(status, data) {
  return {
    type: FILE_GET_RESPONSE,
    status,
    data
  };
};

export const filePostRequest = function() {
  return {
    type: FILE_POST_REQUEST,
  }
}

export const filePostResponse = function(status, data) {
  return {
    type: FILE_POST_RESPONSE,
    status,
    data
  }
}

export const get = function(roomid, sha, file) {
  var apiEndpoint = `/api/room/${roomid}/sha/${sha}/file/${file}`;
  return fetchHelper.get({
    request: fileGetRequest,
    response: fileGetResponse,
  }, apiEndpoint)
}

export const commit = function(path, message) {
  const {roomId, commitSha, fileSha, filePath, branch } = path;
  var apiEndpoint = `/api/room/${roomId}/commitsha/${commitSha}/filesha/${fileSha}/file/${filePath}`;
  return fetchHelper.post({
    request: filePostResponse,
    response: filePostResponse
  }, apiEndpoint, {
    message,
    branch
  });
}
