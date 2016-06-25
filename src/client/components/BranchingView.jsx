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
    var showCommits = this.props.ui.sidebarStack[this.props.ui.sidebarStack.length - 2];
    var showBranches = this.props.ui.sidebarStack[this.props.ui.sidebarStack.length - 3];
    console.log('showBranches is', showBranches);
    // return (
    if (showBranches.display && showBranches.type === "SHOW_BRANCHES") {
      return (
        <div>
          <button>Back2</button>
          {this.props.branches.map((branchObj) => {
            return (
              <h3 onClick={this.clickBranch}>{branchObj.name}</h3>
            )
           })}
        </div>
      )
    } else if (showCommits.display && showCommits.type === "SHOW_COMMITS") {
      return (
        <div>
          <button>Back3</button>
          {this.props.commits.map((commitObj) => {
            return (
              <h4>{commitObj.commit.message}</h4>
            )
          })}
        </div>
      )
    } else {
      return (
        <div><h1>HELLO WORLD</h1></div>
      )
    } 
  }
}