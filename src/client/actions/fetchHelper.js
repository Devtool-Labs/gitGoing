import fetch from 'isomorphic-fetch';
export const FETCH_ERROR = 'ERROR';
export const JSON_PARSE_ERROR = 'JSON_PARSE_ERROR';

export const fetchError = function(error) {
  return {
    type: FETCH_ERROR,
    error
  }
}

export const jsonParseError = function(error) {
  return {
    type: JSON_PARSE_ERROR,
    error
  }
}

export const get  = function(actions, endpoint) {
  return dispatcher => {
    dispatcher(actions.request());
    let status;
    return fetch(endpoint, {
      credentials: 'same-origin'
      })
      .then(response => {
        status = response.status;
        console.log(response);
        return response.json();
      })
      .then(json => { return dispatcher(actions.response(status, json))})
      //.catch(() => { return dispatcher(jsonParseError('invalid json from get ' + endpoint))})
      //.error( e => { console.log(e);return dispatcher(fetchError(e))});
  }
}

export const post = function(actions, endpoint, data) {
  return (dispatcher, getState) => {
    dispatcher(actions.request());
    let status;
    return fetch(endpoint, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => { 
      status= response.status;
      console.log('STATUS', status);
      return response.json()
    })
    .then(json => {
      return dispatcher(actions.response(status, json))
    })
    //.catch(() => { return dispatcher(jsonParseError('invalid json from post ' + endpoint))})
    //.error( e => { return dispatcher(fetchError(e))});
  }
}
