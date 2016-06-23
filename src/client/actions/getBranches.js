import * as fetchHelper from './fetchHelper.js';
import { userGetResponse } from './user.js';

export const BRANCH_GET_REQUEST = 'BRANCH_GET_REQUEST';
export const BRANCH_GET_RESPONSE = 'BRANCH_GET_RESPONSE';

export const branchGetRequest = function() {
  return {
    type: BRANCH_GET_REQUEST
  };
};

export const branchGetResponse = function(status, data) {
  return {
    type: BRANCH_GET_RESPONSE,
    status,
    data
  };
};

export const get = function(roomid){
  var apiEndPoint = 'api/room/'+roomid+'/branch';

  return fetchHelper.get({
    request: branchGetRequest,
    response: branchGetResponse
  }, apiEndPoint);
}