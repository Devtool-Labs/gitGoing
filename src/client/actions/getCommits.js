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

<<<<<<< HEAD
export const get = function(roomid, sha){
  var apiEndpoint = '/api/room/' + roomid + '/sha/' + sha + '/commits';
=======
export const get = function(roomid){
  var apiEndpoint = '/api/room/' + roomid + '/commits';
>>>>>>> 413cf8d93b0e8688b1baec5cc3073f9e3e795442
  return fetchHelper.get({
    request: commitGetRequest,
    response: commitGetResponse
  }, apiEndpoint);
}