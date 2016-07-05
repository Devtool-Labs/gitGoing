import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class RoomNotifications extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      propsCalled: false
    };

    console.log('inside roomnotifications, props are', props.listenToOutwardJoinRoom(this.outwardJoinRoom.bind(this)));
    props.listenToOutwardJoinRoom(this.outwardJoinRoom.bind(this));
  }

  outwardJoinRoom(data) {
    console.log('joining the room', data);
    if (!this.state.propsCalled) {
      var toastText = data.user + ' just joined room number ' + data.roomId + '!';
      Materialize.toast(toastText, 8000, 'rounded');
      this.setState({
        propsCalled: true
      });
    }
  }

  render () {
    return (
      <div></div>
    );
  }

}