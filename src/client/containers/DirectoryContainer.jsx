import { connect } from 'react-redux';
import * as getBranches from '../actions/getBranches.js';
import * as user from '../actions/user.js'; 
import BranchingView from '../components/BranchingView.jsx';

const mapStatetoProps = function (state) {
  const { user, branches } = state;
  return {
    user,
    branches
  };
};

const mapDispatchtoProps = function(dispatch) {
	return {
		getUser: function() {
		  dispatch(user.get());
		},
		getBranches: function() {
		  dispatch(getBranches.get());
		}
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(BranchingView);


