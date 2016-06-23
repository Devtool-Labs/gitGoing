import { connect } from 'react-redux';
import * as getBranches from '../actions/getBranches.js';
import * as getCommits from '../actions/getCommits.js';
import * as user from '../actions/user.js'; 
import BranchingView from '../components/BranchingView.jsx';

const mapStatetoProps = function (state) {
  const { user, branches, commits } = state;
  return {
    user,
    branches,
    commits
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
		getCommits: function(){
			dispatch(getCommits.get());
		} 
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(BranchingView);


