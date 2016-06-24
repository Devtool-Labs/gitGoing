import { connect } from 'react-redux';
import * as getRepos from '../actions/getRepos.js';
import * as user from '../actions/user.js'; 
import { testAPIget, on } from '../actions/debugMode.js';
import RepositoryView from '../components/RepositoryView.jsx';
import * as room from '../actions/room.js';

const mapStatetoProps = function (state) {
  const { user, repos, room} = state;
  return {
    user,
    repos,
  };
};

const mapDispatchtoProps = function (dispatch, ownProps) {
  return {
    getUser: function() {
      dispatch(user.get());
    },
    getRepos: function(username) {
      dispatch(getRepos.get(username));
    },
    postRoom: function(reponame){
      dispatch(room.createAndRedirect(reponame))
    },
    debugModeOn: function() {
      dispatch(on());
    }
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(RepositoryView);