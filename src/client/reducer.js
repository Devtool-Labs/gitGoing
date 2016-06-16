import { CHANGE_STATE} from './actions/state.js';

export const state = function(state={}, action) {
  switch (action.type) {
    case CHANGE_STATE:
      return action.newState;
    default:
      return state
  }
}
