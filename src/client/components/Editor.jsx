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
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      text: newProps.ui.editorText
    })
  }

  render() {
    return (
      <AceEditor
      mode="javascript"
      theme="monokai"
      value={this.state.text} 
      onEd />
    )
  }
}