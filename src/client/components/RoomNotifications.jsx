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

  componentDidMount() {
    Materialize.toast('Welcome to the editing room!', 1000);
  }

  componentWillReceiveProps (newProps) {
    console.log(newProps);
    if (newProps.notifications.queue[newProps.notifications.queue.length - 1].commitStatus === 200) {
      Materialize.toast('Success! Your code has been committed and pushed.', 3000);
    }
  }

  outwardJoinRoom(data) {
    if (!this.state.propsCalled) {
      var toastText = data.user + ' just joined room ' + data.roomId + '!';
      Materialize.toast(toastText, 1000);
      this.setState({
        propsCalled: true
      });
    }
  }

  outwardLeaveRoom (data) {
    var toast = data.user + ' just left this room.';
    Materialize.toast(toast, 1000, 'rounded');
  }

  render () {
    return (
      <div></div>
    );
  }

}