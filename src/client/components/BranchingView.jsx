import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import bluebird from 'bluebird';

export default class BranchingView extends React.Component {
  constructor(props) {
    super(props);
    props.debugModeOn();
    props.getBranches(props.location.pathname.split('/')[2]);
    this.props.getCommits(this.props.location.pathname.split('/')[2]);
    this.props.showBranches(true);
   
    this.clickBranch = this.clickBranch.bind(this);
    this.clickCommit = this.clickCommit.bind(this);
    this.getFileTree = this.props.getFileTree.bind(this);
  }


  clickBranch() {
    this.props.showBranches(false);
    this.props.showCommits(true);
    this.props.showFileStructure(false);
  }

  clickCommit (event) {
    this.getFileTree(this.props.location.pathname.split('/')[2], event.target.value);
    this.props.showBranches(false);
    this.props.showCommits(false);
    this.props.showFileStructure(true); 
  }
 
  componentWillReceiveProps(newProps) {
    console.log('newprops are', newProps);
  }



  render() {
    var showProperties = this.props.ui.sidebarStack;
    if (showProperties.length === 0 || (showProperties[0].display && showProperties.length === 1) || (showProperties[showProperties.length - 3].display && showProperties.length > 1)) {
      return (
        <div>
          <a href="/logout"><button type="button">Logout</button></a>
          <button>Back2</button>
          {this.props.branches.map((branchObj) => {
            return (
              <h3 onClick={this.clickBranch}>{branchObj.name}</h3>
            )
           })}
        </div>
      )
    } else if (showProperties[showProperties.length - 2].display && showProperties.length >= 2) {
      return (
        <div>
          <a href="/logout"><button type="button">Logout</button></a>
          <button>Back3</button>
          {this.props.commits.map((commitObj, index) => {
            return (
              <h4 key={index} onClick={this.clickCommit} value={commitObj.sha}>{commitObj.commit.message}</h4>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>
          <a href="/logout"><button type="button">Logout</button></a>
          <button>Back</button>
          <a href="/logout"><button type="button">Logout</button></a>
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
