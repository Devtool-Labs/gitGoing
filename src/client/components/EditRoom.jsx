import React from 'react';
import ReactDom  from 'react-dom';
import BranchView from './BranchingView.jsx';
import Editor from './Editor.jsx';
import RoomNotifications from './RoomNotifications.jsx';
import Navbar from './Navbar.jsx';
import _ from 'underscore';


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

  // componentWillUnmount () {
  //   console.log('unmounting component');
  //   this.props.leaveRoom(this.props.params.roomid, this.props.user.username);
  // }

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
                <div className='card-content card-git-path'>
                  <Editor ui={this.props.ui} 
                  commit={this.props.commit} 
                  roomid={this.props.params.roomid}
                  updateFile = {this.props.updateFile}
                  listenToOutwardFileUpdate = {this.props.listenToOutwardFileUpdate}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}