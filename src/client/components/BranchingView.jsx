import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';


export default class BranchingView extends React.Component {
 constructor(props) {
  super(props);
  props.debugModeOn();
  props.getBranches(props.location.pathname.split('/')[2]);
  this.props.getCommits(this.props.location.pathname.split('/')[2]);
  this.props.showBranches(true);

  this.clickBranch = this.clickBranch.bind(this)
 }


 clickBranch() {
  this.props.showBranches(false);
  this.props.showCommits(true);
  this.props.showFileStructure(false);
  console.log('commits in props are', this.props.commits);

 }

 // componentWillMount() {
 //  console.log('props.branches ', newProps);
 // }

  componentWillReceiveProps(newProps) {
    console.log('newprops are', newProps);
  }



 render() {
  if (this.props.showBranches) {
    return (
      <div>
      <button>Back</button>
      {this.props.branches.map((branchObj) => {
      	return (
      		<h3 onClick={this.clickBranch}>{branchObj.name}</h3>
      		)
     	 })
    	}
      </div>
    )
  } else if (this.props.showCommits) {
    return (
      <div>
        <button>Back</button>
        {this.props.commits.map((commitObj) => {
          return (
            <h4>{commitObj.commit.message}</h4>
          )
        })}
      </div>
    )
  }
 } 
}
