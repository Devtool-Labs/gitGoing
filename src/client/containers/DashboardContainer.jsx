import { connect } from 'react-redux';
import * as getRepos from '../actions/getRepos.js';
import * as user from '../actions/user.js'; 
import RepositoryView from '../components/RepositoryView.jsx';

const mapStatetoProps = function (state) {
  const { user, repos } = state;
  return {
    user ,
    repos
  };
};

const mapDispatchtoProps = function (dispatch) {
  return {
    getUser: function() {
      dispatch(user.get());
    },
    getRepos: function(username) {
      dispatch(getRepos.get(username));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(RepositoryView);
