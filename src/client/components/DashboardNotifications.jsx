import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class DashboardNotifications extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.repos.length && !newProps.user.username) {
      Materialize.toast('There was a problem getting your repositories. We have noticed that this can sometimes happen because you are not signed in. Please try logging out and signing back in.', 8000, 'rounded');
    }
    if (newProps.user.username && !newProps.allRooms.length) {
      console.log('newProps.use is', newProps.user);
      var toastText = 'Welcome, ' + newProps.user.username + '! Pick your repo to get started editing. Please note: you will not be able to proceed until you have picked one.';
      Materialize.toast(toastText, 5000, 'rounded');
    }
  }

  render () {
    return (
      <div className="notifications"></div>
    );
  }
}