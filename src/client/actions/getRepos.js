import * as fetchHelper from './fetchHelper.js';
import { userGetResponse } from './user.js';

export const REPO_GET_REQUEST = 'REPO_GET_REQUEST';
export const REPO_GET_RESPONSE = 'REPO_GET_RESPONSE';

// const USER_NAME = userGetResponse();
//console.log('USER_NAME: ', USER_NAME );
// const ENDPOINT = 'https://api.github.com/users/'+USER_NAME.userName+'/repos';

export const repoGetRequest = function() {
  return {
    type: REPO_GET_REQUEST
  };
};

export const repoGetResponse = function(status, data) {
  return {
    type: REPO_GET_RESPONSE,
    status,
    data
  };
};

export const get = function(username){
  var apiEndpoint = 'https://api.github.com/users/'+ username +'/repos';
  return fetchHelper.get({
    request: repoGetRequest,
    response: repoGetResponse
  }, apiEndpoint);
}