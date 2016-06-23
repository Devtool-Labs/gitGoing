import * as fetchHelper from './fetchHelper.js';
import { userGetResponse } from './user.js';

export const COMMIT_GET_REQUEST = 'COMMIT_GET_REQUEST';
export const COMMIT_GET_RESPONSE = 'COMMIT_GET_RESPONSE';

const ENDPOINT = "TOBEFIXED"; //ToDo: define endpoint

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

export const get = function(){
  return fetchHelper.get({
    request: commitGetRequest,
    response: commitGetResponse
  }, ENDPOINT);
}