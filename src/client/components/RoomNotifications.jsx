import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class RoomNotifications extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      propsCalled: false
    };

    props.listenToOutwardJoinRoom(this.outwardJoinRoom.bind(this));
    props.listenToOutwardLeaveRoom(this.outwardLeaveRoom.bind(this));
  }

  componentWillReceiveProps (newProps) {
    console.log(newProps);
    if (newProps.notifications.queue[newProps.notifications.queue.length - 1].commitStatus === 200) {
      Materialize.toast('Success! Your code has been committed.', 5000, 'rounded');
    }
  }

  outwardJoinRoom(data) {
    if (!this.state.propsCalled) {
      var toastText = data.user + ' just joined room ' + data.roomId + '!';
      Materialize.toast(toastText, 8000, 'rounded');
      this.setState({
        propsCalled: true
      });
    }
  }

  outwardLeaveRoom (data) {
    console.log('someone left the room!', data);
    var toast = data.user + ' just left this room.';
    Materialize.toast(toast, 5000, 'rounded');
  }

  render () {
    console.log('commit status is', this.props.commitStatus);
    return (
      <div></div>
    );
  }

}