import { connect } from 'react-redux';
import * as getBranches from '../actions/getBranches.js';
import * as getCommits from '../actions/getCommits.js';
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
		getBranches: function(roomid) {
		  dispatch(getBranches.get(roomid));
		},
		getCommits: function(roomid, branch){
			dispatch(getCommits.get(roomid, branch));
		},
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(BranchingView);


