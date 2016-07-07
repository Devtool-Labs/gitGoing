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

  componentWillMount() {
    this.props.getAllRooms();
  }

  componentWillReceiveProps (newProps) {
    var username = newProps.user.username;
    if (newProps.user && !newProps.repos.length) {
      this.props.getRepos(newProps.user);
    }
  }

  handleSubmit(event) {
    event.preventDefault(); 
    this.props.postRoom(this.state.repoName);
  }

  clickRadio(e) {
    this.setState({ repoName: e.target.value});
  }

  render() {
    return (
      <div>
        <Navbar />
        <DashboardNotifications {...this.props}/>
        <div className='container'>
          <RepoSelector repos={this.props.repos} 
          handleSubmit={this.handleSubmit.bind(this)}
          clickRadio={this.clickRadio.bind(this)}
          parentState={this.state}/>
        </div>
      </div>
    );
  }
}
