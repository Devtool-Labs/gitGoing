import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
import fetch from 'isomorphic-fetch';
import * as $ from 'jquery';
import Chat from './Chat.jsx';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.ui.editorText
    };
    props.listenToOutwardFileUpdate(this.outwardEdit.bind(this));
    // this.getPic = this.getPic.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      text: newProps.ui.editorText
    });
  }

  outwardEdit(message) {
    if(this.props.ui.currentFilePath === message.path &&
      this.props.ui.currentCommitSha === message.sha) {
      this.setState({
        text: message.content,
      })
    }
  }

  commit() {
    const path = {
      roomId: this.props.roomid,
      commitSha: this.props.ui.currentCommitSha,
      fileSha: this.props.ui.currentFileSha,
      filePath: this.props.ui.currentFilePath,
      branch: this.props.ui.currentBranchName 
    }
    this.props.commit(path, 'temp commit message');
  }

  change(newValue) {
    this.props.updateFile(newValue);
  }

  // getPic() {
  //   console.log('inside getPic');
  //   return fetch("/api/user", {
  //     credentials: 'same-origin'
  //   })
  //   .then(function(res) {
  //     return res.json();
  //   })
  //   .then(function(jsonRes) {
  //     var photosArr = JSON.parse(jsonRes.photos);
  //     var currentPhoto = photosArr[photosArr.length - 1];
  //     var currentPhotoUrl = currentPhoto.value;
  //     console.log('currentPhotoUrl: ', currentPhotoUrl);
  //     return currentPhotoUrl;
  //   }).catch(function(err) {
  //     console.log('err: ' + err);
  //     return err;
  //   });
  // }

  render() {
    return (
      <div>
        <AceEditor
        mode="javascript"
        theme="monokai"
        value={this.state.text} 
        onChange={this.change.bind(this)} />
        <button onClick={this.commit.bind(this)}>Commitment</button>
        <button onClick={this.getPic}>Testing</button>
        <Chat />
      </div>
    )
  }
}