import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import FileTreeView from './FileTreeView.jsx';

export default class BranchingView extends React.Component {
  constructor(props) {
    super(props);
    props.debugModeOn();
    props.getBranches(this.props.roomid);
    this.props.showBranches(true);
    
    this.state = {
      sha: '',
      sidebarStack: this.props.ui.sidebarStack,
    };

    this.clickBranch = this.clickBranch.bind(this);
    this.clickCommit = this.clickCommit.bind(this);
    this.clickFile = this.clickFile.bind(this);
    this.getFileTree = this.props.getFileTree.bind(this);
    this.clickBackButton = this.clickBackButton.bind(this);
    this.getCommits = this.props.getCommits.bind(this);
  }

  clickBranch(event) {
    this.getCommits(this.props.roomid, event.target.value);
    this.props.showBranches(false);
    console.log('BRANCH', event.target.value.name);
    this.props.showCommits(true, event.target.value.name);
    this.props.showFileStructure(false);
  }

  clickCommit (event) {
    this.setState({
      sha: event.target.value
    });
    this.getFileTree(this.props.roomid, event.target.value);
    this.props.showBranches(false);
    this.props.showCommits(false);
    this.props.showFileStructure(true, event.target.value); 
  }

  clickFile(event) {
    this.props.getFile(this.roomid, this.props.ui.currentCommitSha, event.target.value);
  }

  clickBackButton () {
    for (var i = 0; i < 3; i++) {
      this.props.ui.sidebarStack.pop();
    }
    this.setState({
      sidebarStack: this.props.ui.sidebarStack
    });
  }

  render() {
    console.log('inside render, state for commits is', this.state);
    var showProperties = this.props.ui.sidebarStack;
    if (showProperties.length === 0 || (showProperties[0].display && showProperties.length === 1) || (showProperties[showProperties.length - 3].display && showProperties.length > 1)) {
      return (
        <div>
          {this.props.branches.map((branchObj, index) => {
            return (
              <div>
                <span className='card-title'>Select branch</span>
                <hr />
                <div className='git-branch' key={index} onClick={this.clickBranch} value={branchObj.commit.sha}>{branchObj.name}</div>
              </div>
            )
           })}
        </div>
      )
    } else if (showProperties[showProperties.length - 2].display && showProperties.length >= 2) {
      return (
        <div>
          <span><i onClick={this.clickBackButton} className="material-icons">fast_rewind</i></span>
          <span className='path-title'>Select Commit</span>
          <hr />
          {this.props.commits.map((commitObj, index) => {
            return (
              <div className='git-commit' key={index} onClick={this.clickCommit} value={commitObj.sha}>{commitObj.commit.message}</div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>
          <span><i onClick={this.clickBackButton} className="material-icons">fast_rewind</i></span>
          <span className='path-title'>Select File</span>
          <hr />
          <FileTreeView {...this.props} sha={this.state.sha} recursiveFileTree={this.props.getFileTreeRecursively} fileTree={this.props.fileTree}/>
        </div>
      );
    } 
  }
}
