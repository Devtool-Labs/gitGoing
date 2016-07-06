import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import RoomTableRow from './RoomTableRow.js';
import fetch from 'isomorphic-fetch';
import DashboardNotifications from './DashboardNotifications.jsx';
import Navbar from './Navbar.jsx';
import RepoSelector from './RepoSelector.jsx';
export default class RepositoryView extends React.Component {
  constructor(props) {
    super(props);
    props.getUser();
    this.state = {repoName: null};


  }

  componentWillReceiveProps (newProps) {
    var username = newProps.user.username;
    if (newProps.user && !newProps.repos.length) {
      this.props.getRepos(newProps.user);
    }
  }

  handleSubmit(event) {
    event.preventDefault(); 
    if (!this.state.repoName) {
      Materialize.toast('Looks like you forgot to pick a repo! Please make sure you do that so that we can get you the right files.', 8000, 'rounded');
    }
    this.props.postRoom(this.state.repoName);
  }

  clickRadio(e) {
    console.log('clicked a button!', e.target.value);
    this.setState({ repoName: e.target.value});
  }

  componentWillMount() {
    this.props.getAllRooms();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <DashboardNotifications {...this.props}/>
          <RepoSelector repos={this.props.repos} 
          handleSubmit={this.handleSubmit.bind(this)}
          clickRadio={this.clickRadio.bind(this)}/>
        </div>
      </div>
    );
  }
}
