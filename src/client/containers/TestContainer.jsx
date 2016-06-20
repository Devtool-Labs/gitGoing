import { connect } from 'react-redux';
import { testAPIget, on } from '../actions/debugMode.js';
import TestComponent from '../components/TestComponent.jsx';

const mapDispatchToProps = function(dispatch) {
  return {
    testApi : () => {
      dispatch(testAPIget());
    },
    debugModeOn: () => {
      dispatch(on());
    }
  }
}

export default connect(null, mapDispatchToProps) (TestComponent)