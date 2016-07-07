import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class DashboardNotifications extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.repos.length && !newProps.user.username) {
      Materialize.toast('There was a problem getting your repositories.', 1000);
    }
    if (newProps.user.username && !newProps.allRooms.length) {
      console.log('newProps.use is', newProps.user);
      var toastText = 'Welcome, ' + newProps.user.username + '! Pick a repo to start editing.';
      Materialize.toast(toastText, 3000);
    }
  }

  render () {
    return (
      <div className="notifications"></div>
    );
  }
}