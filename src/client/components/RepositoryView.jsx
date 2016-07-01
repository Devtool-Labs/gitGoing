import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import RoomTableRow from './RoomTableRow.js';
import fetch from 'isomorphic-fetch';

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
    console.log('submitted a room', this.state.repoName);
    event.preventDefault(); 
    this.props.postRoom(this.state.repoName);
  }

  clickRadio(e) {
    console.log('clicked a button!', e.target.value);
    this.setState({ repoName: e.target.value});
  }

  // createNewRoom() {
  //   fetch('/api/');             // route, then body
  // }

  render() {
    return (
      <div>
        <a href="/logout" className="waves-effect waves-light btn">Sign Out</a>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.props.repos.map( (repoObj, index) => {
            return (
              <div key={index}>
                <p>
                  <input type="radio" id={index} name="group1" key={index} value={repoObj.name} onClick={this.clickRadio.bind(this)}/>
                  <label htmlFor={index}>{repoObj.name}</label>
                </p>
              </div>
            );
          })}
          <button className="waves-effect waves-light btn">Create Editing Room</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Name</th>
              <th>Repo Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.allRooms.map(function(room, index) {
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