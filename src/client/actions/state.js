export const CHANGE_STATE = 'CHANGE_STATE';

export const changeState = function(nextState) {
  return {
    type: CHANGE_STATE,
    nextState
  }
}

