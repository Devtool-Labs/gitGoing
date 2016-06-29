import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import RoomTableRow from './RoomTableRow.js';
import fetch from 'isomorphic-fetch';


let rooms = [];

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
   this.props.postRoom(this.state.repoName);
  }

  clickRadio(e) {
    this.setState({ repoName: e.target.value});
  }

  render() {
    return (
      <div>
        <a href="/logout"><button type="button">Sign out</button></a>
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Name</th>
              <th>Repo Name</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(function(room, index) {
              return (
                <RoomTableRow room={room} key={index}>{ room.roomName }</RoomTableRow>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}