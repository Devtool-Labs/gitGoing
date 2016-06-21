import React from 'react';
import { render } from 'react-dom';
import Ace from 'react-ace';
import brace from 'brace';
import RepositoryView from './RepositoryView.jsx';
import fetch from 'isomorphic-fetch';

//import 'brace/theme/monokai';
//import 'brace/mode/javascript';
export default class TestComponent extends React.Component {
 constructor(props) {
  super(props);
  this.props.debugModeOn();
 }

 onClicky() {
  fetch('/api/room')
  .then((res) => { return res.json() })
  .then(json => {console.log(json)});
 }

 render() {
  return (
    <div>
      <button onClick={this.onClicky}>Button</button>
      <a href='/logout'><button>Logout</button></a>
    </div>
  )
 } 
}