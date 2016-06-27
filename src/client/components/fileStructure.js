import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class BranchingView extends React.Component {
 constructor(props) {
  super(props);
  props.getBranches();
 }


 render() {
  return (
    <div>
    {this.props.branches.map((branchObj) => {
      return (
        <div>
          <a href="/logout"><button type="button">Signout</button></a>
          <h3><Link to={`/room/commits`}>{branchObj.name}</Link></h3>
        </div>
        )
     })
    }
    </div>
  )
 } 
}
