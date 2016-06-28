import { connect } from 'react-redux';
import Editor from '../components/Editor.jsx';
const mapStateToProps = function(state) {
  const {ui} = state;
  return {
    ui
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Editor);