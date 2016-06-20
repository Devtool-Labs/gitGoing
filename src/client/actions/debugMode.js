import * as fetchHelper from './fetchHelper.js';

export const DEBUG_MODE_ON = 'DEBUG_ON';
export const DEBUG_MODE_OFF = 'DEBUG_OFF';

export const TEST_API_GET_REQUEST = 'TEST_API_GET_REQUEST';
export const TEST_API_GET_RESPONSE = 'TEST_API_GET_RESPONSE'

const ENDPOINT = '/testapi'

export const on = function() {
  return {
    type: DEBUG_MODE_ON
  }
}

export const off = function() {
  return {
    type: DEBUG_MODE_OFF
  }
}

export const testAPIgetRequest = function () {
  return {
    type: TEST_API_GET_REQUEST,
  }
}

export const testAPIgetResponse = function(status, data) {
  return {
    type: TEST_API_GET_RESPONSE,
    status,
    data
  }
}

export const testAPIget = function () {
  return fetchHelper.get({
    request: testAPIgetRequest,
    response: testAPIgetResponse
  }, ENDPOINT)
}
