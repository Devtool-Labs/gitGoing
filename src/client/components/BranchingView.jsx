import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class BranchingView extends React.Component {
 constructor(props) {
  super(props);
  props.getBranches(props.location.pathname.split('/')[2]);
  this.state = {
    branchName: null
  };
 }

 handleClick() {

 }

 clickBranch(event) {
  this.setState({branchName: event.target.value});

 }


 render() {
  return (
    <div>
    {this.props.branches.map((branchObj) => {
    	return (
    		<h3 onClick={this.clickBranch.bind(this)}>{branchObj.name}</h3>

    		)
   	 })
  	}
    </div>
  )
 } 
}
