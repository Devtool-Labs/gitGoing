import { connect } from 'react-redux';
import * as getBranches from '../actions/getBranches.js';
import * as getCommits from '../actions/getCommits.js';
import * as room from '../actions/room.js';
import * as user from '../actions/user.js'; 
import BranchingView from '../components/BranchingView.jsx';

const mapStatetoProps = function (state) {
  const { user, branches, commits, room } = state;
  return {
    user,
    branches,
    commits,
    room
  };
};

const mapDispatchtoProps = function(dispatch) {
	return {
		getUser: function() {
		  dispatch(user.get());
		},
		getBranches: function(repoName) {
		  dispatch(getBranches.get(repoName));
		},
		getCommits: function(roomid, branch){
			dispatch(getCommits.get(roomid, branch));
		},
    postRoom: function(reponame){
      dispatch(room.create(reponame, {}));
    } 
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(BranchingView);


