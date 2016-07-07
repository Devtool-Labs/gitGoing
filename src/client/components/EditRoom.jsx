import React from 'react';
import ReactDom  from 'react-dom';
import BranchView from './BranchingView.jsx';
import Editor from './Editor.jsx';
import RoomNotifications from './RoomNotifications.jsx';
import Navbar from './Navbar.jsx';
import _ from 'underscore';
import Conversation from './Conversation.jsx';

export default class EditRoom extends React.Component {
  constructor(props) {
    super(props);
    props.debugModeOn();

    if(_.isEmpty(props.room)) {
      props.getRoom(props.params.roomid);
    }
    if(_.isEmpty(props.user)) {
      props.getUser();
    }

    props.getBranches(props.params.roomid);
    props.initializeSocket(props.params.roomid);
    window.onbeforeunload = (event) => {
      props.leaveRoom.call(this, this.props.params.roomid, this.props.user.username);
    };

  }

  componentWillReceiveProps (newProps) {
    if (this.props.user.username) {
      newProps.joinRoom(newProps.params.roomid, newProps.user.username);
    }
  }

  openModal() {
      $('#modal1').openModal();
  }

  closeModal() {
      $('#modal1').closeModal();
  }

  commit() {
    const path = {
      roomId: this.props.params.roomid,
      commitSha: this.props.ui.currentCommitSha,
      fileSha: this.props.ui.currentFileSha,
      filePath: this.props.ui.currentFilePath,
      branch: this.props.ui.currentBranchName 
    }
    this.props.commit(path, this.refs.commitMessage.value);
  }

  render() {
    return (
      <div>
        <Navbar />
        <RoomNotifications {...this.props}/>
        <div className='container'>
          <div className='row margin-top-xl'>
            <div className='col s4'>
              <div className='card'>
                <div className='card-content'>
                  <BranchView {...this.props} roomid={this.props.params.roomid}/>
                </div>
              </div>
            </div>
            <div className='col s8'>
              <div className='card card-editor'>
                <div className='card-content'>
                  <Editor ui={this.props.ui} 
                  commit={this.props.commit} 
                  roomid={this.props.params.roomid}
                  updateFile = {this.props.updateFile}
                  listenToOutwardFileUpdate = {this.props.listenToOutwardFileUpdate}/>
                </div>
              </div>
            </div>
            <div className='row margin-top-s'>
              <div className='col s12'>
                <div className='card'>
                  <div className='card-content'>
                    <Conversation {...this.props} roomid={this.props.params.roomid}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className='btn' onClick={this.openModal}>Commit</button>
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <div className="row">
              <h6>Committing file: {this.props.ui.currentFilePath}</h6>
              <div className="input-field col s12">
                <input ref='commitMessage' id="commit_message" type="text" class="validate" />
                <label for="commit_message">Commit Message</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.closeModal.bind(this)}>Cancel</a>
            <a className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.commit.bind(this)}>Commit</a>
          </div>
        </div>
      </div>
    )
  }
}
