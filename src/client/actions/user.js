import * as fetchHelper from './fetchHelper.js';

export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_RESPONSE = 'USER_GET_RESPONSE';

const ENDPOINT = '/api/user';
// export const 
// export const

export const userGetRequest = function () {
  return {
    type: USER_GET_REQUEST,
  };
};

export const userGetResponse = function (status, data) {
  return {
    type: USER_GET_RESPONSE,
    status,
    data
  };
};

export const get = function () {
  return fetchHelper.get({
    request: userGetRequest,
    response: userGetResponse
  }, ENDPOINT);
}; 