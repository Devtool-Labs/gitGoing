import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class BranchingView extends React.Component {
 constructor(props) {
  super(props);
 }


 render() {
  return (
    <div>
    {this.props.branches.map((branchObj) => {
    	return (
    		<h3>{branchObj.name}</h3>
    		)
   	 })
  	}
    </div>
    }
  )
 } 
}
