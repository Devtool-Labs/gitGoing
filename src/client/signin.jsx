import React from 'react';
import ReactDom  from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

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
        <h2>Click to signin here:</h2>
        <a href="/api/auth/github"><button type="button">Signin</button></a>
      </div>
    );
  }
}

ReactDOM.render(<Signin />, document.getElementById('app'));
