import React from 'react';
import ReactDom  from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import fetch from 'isomorphic-fetch';

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    console.log('Signin componentDidMount');
  }

  render() {
    return (
      <div>
        <a href="/logout"><button type="button">Logout</button></a>
        <h2>Click to signin here:</h2>
      </div>
    );
  }
}

export default Signin
