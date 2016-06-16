import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class App extends React.Component {
 constructor(props) {
  super(props);
 }

 render() {
  return (
    <div>
      <div>Temp navbar</div>
      {this.props.children}
    </div>
  )
 } 
}