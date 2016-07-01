import { connect } from 'react-redux';
import * as getBranches from '../actions/getBranches.js';
import * as getCommits from '../actions/getCommits.js';
import * as user from '../actions/user.js'; 
import * as ui from '../actions/ui.js';
import * as fileTree from '../actions/getFileTree.js';
import * as fileAction from '../actions/file.js';
import EditRoom from '../components/EditRoom.jsx';
import * as debug from '../actions/debugMode.js';
import * as socket from '../actions/socket.js';
import * as room from '../actions/room.js';

const mapStateToProps = function (state) {
  const { user, branches, commits, room, ui, fileTree, file } = state;
  return {
    user,
    branches,
    commits,
    room,
    ui,
    fileTree,
    file
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    getUser: function() {
      dispatch(user.get());
    },
    getBranches: function(roomid) {
      dispatch(getBranches.get(roomid));
    },
    getCommits: function(roomid){
      dispatch(getCommits.get(roomid));
    },
    getFileTree: function (roomid, sha) {
      dispatch(fileTree.get(roomid, sha));
    },
    getFile: function(roomid, sha, file) {
      dispatch(fileAction.get(roomid, sha, file))
    },
    getRoom:  function(roomId) {
      dispatch(room.get(roomId));
    },
    showBranches: function(display) {
      dispatch(ui.showBranches(display));
    },
    showCommits: function(display) {
      dispatch(ui.showCommits(display));
    },
    showFileStructure: function(display, commitSha) {
      dispatch(ui.showFileStructure(display, commitSha));
    },
    debugModeOn: function() {
      dispatch(debug.on());
    },
    commit: function(roomid, currentCommitSha, currentFileSha, currentFilePath) {
      dispatch(fileAction.commit(roomid, currentCommitSha, currentFileSha, currentFilePath));
    },
    initializeSocket: function(roomId) {
      dispatch(socket.initialize(roomId));
    },
    updateFile: function(fileContent) {
      dispatch(socket.updateFile(fileContent));
    },
    listenToOutwardFileUpdate: function(listener) {
      dispatch(socket.listenToOutwardFileUpdate(listener));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps) (EditRoom);
