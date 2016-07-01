import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.ui.editorText
    };
    props.listenToOutwardFileUpdate(this.outwardEdit.bind(this));
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      text: newProps.ui.editorText
    })
  }

  outwardEdit(message) {
    if(this.props.ui.currentFilePath === message.path &&
      this.props.ui.currentCommitSha === message.sha &&
      this.props.roomid === message.room) {
      this.setState({
        text: message.content,
      })
    }
  }

  commit() {
    this.props.commit(this.props.roomid,
      this.props.ui.currentCommitSha,
      this.props.ui.currentFileSha,
      this.props.ui.currentFilePath);
  }

  change(newValue) {
    this.props.updateFile(newValue);
  }

  render() {
    return (
      <div>
        <AceEditor
        mode="javascript"
        theme="monokai"
        value={this.state.text} 
        onChange={this.change.bind(this)} />
        <button onClick={this.commit.bind(this)}>Commitment</button>
      </div>
    )
  }
}