import React from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import RepositoryView from './RepositoryView.jsx';
import fetch from 'isomorphic-fetch';
import DashboardContainer from '../containers/DashboardContainer.jsx';
import io from 'socket.io-client';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';

export default class TestComponent extends React.Component {
 constructor(props) {
  super(props);
  this.props.debugModeOn();
  this.state = {textEditorValue: "var connection = true;"}
 	this.emitMessage = this.emitMessage.bind(this);
 	this.updateEditor = this.updateEditor.bind(this);

 }

 onClicky(endpoint) {
  fetch(endpoint, {
    credentials: 'same-origin'
  })
  .then((res) => { return res.json() })
  .then(json => {console.log(json)});
 }

emitMessage(newValue) {
	var socket = io.connect();

 	// on change emit message to server
	socket.emit('Room1', newValue);

 	//update text editor with broadcasted message
  socket.on('ServerBroadcast',  (message) => {
  	this.updateEditor(message);
   });
 };

 updateEditor(message) {
 	console.log('inside update editor');
 	this.setState({textEditorValue: ''+message});
 };

 render() {
  return (
    <div>
      <button onClick={this.onClicky.bind(this, '/api/room/4/branch')}>branches</button>

    </div>
  )
 } 
}
