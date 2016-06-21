import React from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import Ace from 'react-ace';
import brace from 'brace';
import RepositoryView from './RepositoryView.jsx';
import fetch from 'isomorphic-fetch';
import DashboardContainer from '../containers/DashboardContainer.jsx';


import 'brace/theme/monokai';
import 'brace/mode/javascript';
export default class TestComponent extends React.Component {
 constructor(props) {
  super(props);
  //this.props.debugModeOn();
 }

 onClicky() {
  fetch('/api/room', {
    credentials: 'same-origin'
  })
  .then((res) => { return res.json() })
  .then(json => {console.log(json)});
 }

 render() {
  return (
    <div>
      <Link to="/dashboard"><button>Dashboard</button></Link>
      <button onClick={this.onClicky}>Button</button>
      <a href='/logout'><button>Logout</button></a>
      <button onClick={this.props.testApi}>Button</button>
      <Ace theme="monokai" mode='javascript'/>
      <DashboardContainer /> 
    </div>
  )
 } 
}