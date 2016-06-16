import React from 'react';
import { render } from 'react-dom';
import Ace from 'react-ace';
import brace from 'brace';
import RepositoryView from './RepositoryView.jsx';

//import 'brace/theme/monokai';
//import 'brace/mode/javascript';
export default class TestComponent extends React.Component {
 constructor(props) {
  super(props);
  this.props.debugModeOn();
 }

 render() {
  return (
    <div>
      <button onClick={this.props.testApi}>Button</button>
      <Ace theme="monokai" mode='javascript'/>
      <RepositoryView /> 
    </div>
  )
 } 
}