import React from 'react';
import { render } from 'react-dom';
import RepositoryView from './RepositoryView.jsx';

export default class TestComponent extends React.Component {
 constructor(props) {
  super(props);
 }

 render() {
  return (
    <div>
      <RepositoryView /> 
    </div>
  )
 } 
}
