import { connect } from 'react-redux';
import * as getRepos from '../actions/getRepos.js';
import * as user from '../actions/user.js'; 
import { testAPIget, on } from '../actions/debugMode.js';
import RepositoryView from '../components/RepositoryView.jsx';
import * as room from '../actions/room.js';
import * as getAllRooms from '../actions/getAllRooms.js';

const mapStatetoProps = function (state) {
  const { user, repos, room, allRooms} = state;
  return {
    user: user,
    repos: repos,
    allRooms: allRooms,
  };
};

const mapDispatchtoProps = function (dispatch, ownProps) {
  return {
    getUser: function() {
      dispatch(user.get());
    },
    getRepos: function( user ) {
      dispatch(getRepos.get(user.username, user.accessToken));
    },
    postRoom: function(reponame){
      dispatch(room.createAndRedirect(reponame))
    },
    getAllRooms: function() {
      dispatch(getAllRooms.get());
    },
    debugModeOn: function() {
      dispatch(on());
    }
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(RepositoryView);
