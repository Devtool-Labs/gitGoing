import { DEBUG_MODE_ON, DEBUG_MODE_OFF } from './actions/debugMode.js';
import { FETCH_ERROR, JSON_PARSE_ERROR } from './actions/fetchHelper.js';
import { USER_GET_REQUEST, USER_GET_RESPONSE } from './actions/user.js';
import { REPO_GET_REQUEST, REPO_GET_RESPONSE } from './actions/getRepos.js';
import { BRANCHES_GET_REQUEST, BRANCHES_GET_RESPONSE } from './actions/getBranches.js';
import { COMMIT_GET_REQUEST, COMMIT_GET_RESPONSE } from './actions/getCommits.js';
import { ROOM_POST_RESPONSE, ROOM_POST_REQUEST } from './actions/room.js';
import { SHOW_BRANCHES, SHOW_COMMITS, SHOW_FILE_STRUCTURE, UPDATE_EDITOR} from './actions/ui.js';
import { FILETREE_GET_REQUEST, FILETREE_GET_RESPONSE } from './actions/getFileTree.js';
import { FILE_GET_REQUEST, FILE_GET_RESPONSE } from './actions/file';
import io from 'socket.io-client';
import { FILETREE_RECURSIVE_GET_REQUEST, FILETREE_RECURSIVE_GET_RESPONSE } from './actions/getFileTreeRecursively.js';


export const debugMode = function(state=false, action) {
  switch (action.type) {
    case DEBUG_MODE_ON:
      return true;
    case DEBUG_MODE_OFF:
      return false;
    case FETCH_ERROR:
      console.log('FETCH_ERROR: ' + action.error);
      return state;
    case JSON_PARSE_ERROR:
      console.log('JSON_PARSE_ERROR: ' + action.error);
      return state;
    default:
      !state || console.log('ACTION DISPATCHED:', action.type);
      console.log(action);
      return state;
  }
};

export const user = function (state={}, action) {
  switch (action.type) {
    case USER_GET_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const repos = function(state=[], action){
  switch (action.type) {
    case REPO_GET_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const branches = function(state=[], action){
  switch (action.type) {
    case BRANCHES_GET_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const commits = function(state=[], action){
  switch (action.type) {
    case COMMIT_GET_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const room = function() {
  switch (action.type) {
    case ROOM_POST_REQUEST:
      return action.data;
    default:
      return state;

  }

};

var intialUiState = {
  sidebarView: 'branches',
  sidebarStack: [],
  editorText: '',
}

export const ui = function(state= intialUiState, action){
  switch (action.type) {
    case SHOW_BRANCHES:
      return Object.assign({}, state, {
        sidebarView: action.display,
        sidebarStack: state.sidebarStack.concat([action]),
        stackLength: state.sidebarStack.length
      });
    case SHOW_COMMITS:
      return Object.assign({}, state, {
        sidebarView: action.display,
        sidebarStack: state.sidebarStack.concat([action]),
        currentBranchName: action.branchName,
        stackLength: state.sidebarStack.length
      });
    case SHOW_FILE_STRUCTURE:
      return Object.assign({}, state, {
        sidebarView: action.display,
        sidebarStack: state.sidebarStack.concat([action]),
        currentCommitSha: action.commitSha
      });
    case UPDATE_EDITOR:
      return Object.assign({}, state, {
        editorText: action.fileContent
      });
    case FILE_GET_RESPONSE:
      return Object.assign({}, state, {
        editorText: atob(action.data.content)
      })
    default:
      return state;

  }
};

export const fileTree = function (state={}, action) {
  switch (action.type) {
    case FILETREE_GET_RESPONSE:
      var returnArr = [];
      for (var i = 0; i < action.data.tree.length; i++) {
        if (action.data.tree[i].type === 'tree') {
          action.data.tree[i].absolutePath = action.data.tree[i].path;
        }
        action.data.tree[i].children = [];
        returnArr.push(action.data.tree[i]);
      }
      return Object.assign({}, state, {
        fileData: returnArr
      });
    case FILETREE_RECURSIVE_GET_RESPONSE:
      returnArr = [];
      for (var j = 0; j < action.data.tree.length; j++) {
        console.log('in loop, action data is', action.data.tree[j]);
        var path = action.data.tree[j].absolutePath;
        //path.concat('/', action.data.tree.path); 
        action.data.tree[j].children = [];
        returnArr.push(action.data.tree[j]);
      }
      console.log('return array is', returnArr);
      console.log('state at this point is', state);
      return action.data;
    default:
      return state;
  }
};

export const file = function(state={}, action) {
  switch (action.type) {
    case FILE_GET_RESPONSE:
      return action.data;
    default:
      return state;
  }
}

export const socket = function(state={}, action) {
  switch (action.type) {
    case CONNECT_SOCKET:
      return (state.connection) 
        ? state
        : Object.assign({}, state, {
          connection : io.connect()
        })
    default:
      return state;
  }
}


