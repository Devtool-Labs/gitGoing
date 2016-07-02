import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import bluebird from 'bluebird';

export default class BranchingView extends React.Component {
  constructor(props) {
    super(props);
    props.debugModeOn();
    this.roomid = this.props.roomid;
    props.getBranches(this.roomid);
    this.props.getCommits(this.roomid);
    this.props.showBranches(true);
   
    this.clickBranch = this.clickBranch.bind(this);
    this.clickCommit = this.clickCommit.bind(this);
    this.clickFile = this.clickFile.bind(this);
    this.getFileTree = this.props.getFileTree.bind(this);
  }

  clickBranch(event) {
    this.props.showBranches(false);
    console.log('BRANCH', event.target.value);
    this.props.showCommits(true, event.target.value);
    this.props.showFileStructure(false);
  }

  clickCommit (event) {
    this.getFileTree(this.roomid, event.target.value);
    this.props.showBranches(false);
    this.props.showCommits(false);
    this.props.showFileStructure(true, event.target.value); 
  }

  clickFile(event) {
    this.props.getFile(this.roomid, this.props.ui.currentCommitSha, event.target.value);
  }
 
  componentWillReceiveProps(newProps) {

  }



  render() {
    var showProperties = this.props.ui.sidebarStack;
    if (showProperties.length === 0 || (showProperties[0].display && showProperties.length === 1) || (showProperties[showProperties.length - 3].display && showProperties.length > 1)) {
      return (
        <div>
          <a href="/logout"><button type="button">Sign out</button></a>
          <button>Back2</button>
          {this.props.branches.map((branchObj, index) => {
            return (
              <h3 key={index} onClick={this.clickBranch} value={branchObj.name}>{branchObj.name}</h3>
            )
           })}
        </div>
      )
    } else if (showProperties[showProperties.length - 2].display && showProperties.length >= 2) {
      return (
        <div>
          <a href="/logout"><button type="button">Sign out</button></a>
          <button>Back3</button>
          {this.props.commits.map((commitObj,index) => {
            return (
              <h4 key={index} onClick={this.clickCommit} value={commitObj.sha}>{commitObj.commit.message}</h4>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>
          <a href="/logout"><button type="button">Sign out</button></a>
          <button>Back</button>
          {this.props.fileTree.tree.map((fileObj, index) => {
            return (
              <h4 key={index} onClick={this.clickFile} value={fileObj.path}>{fileObj.path}</h4>
            );
          })}
        </div>
      )
    } 
  }
}
