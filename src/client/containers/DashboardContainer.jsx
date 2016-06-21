import { connect } from 'react-redux';
import * as user from '../actions/user.js'; 
import RepositoryView from '../components/RepositoryView.jsx';

const mapStatetoProps = function (state) {
  const { user } = state;
  return {
    user  
  };
};



const mapDispatchtoProps = function (dispatch) {
  return {
    getUser: function () {
      dispatch(user.get());
    }
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(RepositoryView);
