import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import bluebird from 'bluebird';

export default class BranchingView extends React.Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    props.debugModeOn();
    props.getBranches(props.location.pathname.split('/')[2]);
    this.props.getCommits(this.props.location.pathname.split('/')[2]);
    this.props.showBranches(true);
    this.state = {
      'sha': null
    };
    this.clickBranch = this.clickBranch.bind(this);
    this.clickCommit = this.clickCommit.bind(this);
    this.getFileTree = this.props.getFileTree.bind(this);
  }


  clickBranch() {
    this.props.showBranches(false);
    this.props.showCommits(true);
    this.props.showFileStructure(false);
  }
=======
 constructor(props) {
  super(props);
  props.debugModeOn();
  props.getBranches(props.location.pathname.split('/')[2]);
  this.props.getCommits(this.props.location.pathname.split('/')[2]);
  //find a way to get the sha
  this.props.getFileTree(props.location.pathname.split('/')[2], 'sha');
  this.props.showBranches(true);

  this.clickBranch = this.clickBranch.bind(this);
  this.clickCommit = this.clickCommit.bind(this);
 }


 clickBranch() {
  this.props.showBranches(false);
  this.props.showCommits(true);
  this.props.showFileStructure(false);
  console.log('commits in props are', this.props.commits);
 }

 clickCommit () {
  this.props.showBranches(false);
  this.props.showCommits(false);
  this.props.showFileStructure(true);
 }
>>>>>>> 00a73b6609a6b0d5ceccb6c5b28f61b4bd518b72

  clickCommit (event) {
    this.setState({ 'sha': event.target.value });
    this.getFileTree(this.props.location.pathname.split('/')[2], event.target.value);
    console.log('event target value is', event.target.value);
    this.props.showBranches(false);
    this.props.showCommits(false);
    this.props.showFileStructure(true); 
  }

  componentDidMount () {
    console.log('the state now is', this.state.sha);
  }
 
  componentWillReceiveProps(newProps) {
    console.log('newprops are', newProps);
  }



  render() {
    var showProperties = this.props.ui.sidebarStack;
    if (showProperties.length === 0 || (showProperties[0].display && showProperties.length === 1) || (showProperties[showProperties.length - 3].display && showProperties.length > 1)) {
      return (
        <div>
          <button>Back</button>
          {this.props.branches.map((branchObj) => {
            console.log('getting inside branch map', branchObj);
            return (
              <h3 onClick={this.clickBranch}>{branchObj.name}</h3>
            )
           })}
        </div>
      )
    } else if (showProperties[showProperties.length - 2].display && showProperties.length >= 2) {
      console.log('props are', this.props);
      return (
        <div>
          <button>Back</button>
          {this.props.commits.map((commitObj, index) => {
            return (
              <h4 key={index} onClick={this.clickCommit} value={commitObj.sha}>{commitObj.commit.message}</h4>
            )
          })}
        </div>
      )
    } else {
      console.log('filetree is', this.props.fileTree);
      return (
        <div>
          <button>Back</button>
          {this.props.fileTree.tree.map(function (fileObj) {
            return (
              <h4>{fileObj.path}</h4>
            );
          })}
        </div>
      )
    } 
  }
}
