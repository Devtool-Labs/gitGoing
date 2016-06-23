import * as fetchHelper from './fetchHelper.js';
import { userGetResponse } from './user.js';

export const BRANCHES_GET_REQUEST = 'BRANCHES_GET_REQUEST';
export const BRANCHES_GET_RESPONSE = 'BRANCHES_GET_RESPONSE';


export const branchesGetRequest = function() {
  return {
    type: BRANCHES_GET_REQUEST
  };
};

export const branchesGetResponse = function(status, data) {
  return {
    type: BRANCHES_GET_RESPONSE,
    status,
    data
  };
};

export const get = function(repoName){
  var apiEndpoint = '/repo/' + repoName + '/createroom';
  return fetchHelper.get({
    request: branchesGetRequest,
    response: branchesGetResponse
  }, apiEndpoint);
};