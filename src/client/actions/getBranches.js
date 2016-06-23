import * as fetchHelper from './fetchHelper.js';
import { userGetResponse } from './user.js';

export const BRANCH_GET_REQUEST = 'BRANCH_GET_REQUEST';
export const BRANCH_GET_RESPONSE = 'BRANCH_GET_RESPONSE';

const ENDPOINT = '/api/room';

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
  return fetchHelper.get({
    request: branchGetRequest,
    response: branchGetResponse
  }, ENDPOINT);
};