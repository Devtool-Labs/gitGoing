import * as fetchHelper from './fetchHelper.js';
import { userGetResponse } from './user.js';

export const COMMIT_GET_REQUEST = 'COMMIT_GET_REQUEST';
export const COMMIT_GET_RESPONSE = 'COMMIT_GET_RESPONSE';


export const commitGetRequest = function() {
  return {
    type: COMMIT_GET_REQUEST
  };
};

export const commitGetResponse = function(status, data) {
  return {
    type: COMMIT_GET_RESPONSE,
    status,
    data
  };
};

export const get = function(roomid, sha){
  var apiEndpoint = '/api/room/' + roomid + '/sha/' + sha + '/commits';
  console.log('endpoint is', apiEndpoint);
  return fetchHelper.get({
    request: commitGetRequest,
    response: commitGetResponse
  }, apiEndpoint);
}