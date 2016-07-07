import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import FileTreeView from './FileTreeView.jsx';

export default class BranchingView extends React.Component {
  constructor(props) {
    super(props);
    props.debugModeOn();
    this.roomid = this.props.roomid;
    props.getBranches(this.roomid);
    this.props.getCommits(this.roomid);
    this.props.showBranches(true);
    
    this.state = {
      sha: '',
      sidebarStack: this.props.ui.sidebarStack,
      currentBranchCommits: [] 
    };

    this.clickBranch = this.clickBranch.bind(this);
    this.clickCommit = this.clickCommit.bind(this);
    this.clickFile = this.clickFile.bind(this);
    this.getFileTree = this.props.getFileTree.bind(this);
    this.clickBackButton = this.clickBackButton.bind(this);
  }

  clickBranch(event) {
    this.props.showBranches(false);
    console.log('BRANCH', event.target.value.name);
    this.props.showCommits(true, event.target.value.name);
    this.props.showFileStructure(false);
    var theSha = event.target.value.commit.sha;
    var commits = this.props.commits;
    var returnArr = [];
    for (var i = 0; i < commits.length; i++) {
      console.log('return array is now', returnArr, 'current commit sha is', commits[i].sha, 'and the sha is', theSha);
      if (commits[i].sha === theSha) {
        console.log('>>>>>>>>>>>>>>FOUND THE SHA<<<<<<<<<<<<<<<<<<<<');
        // if (commits[i].parents.length === 0) {
        //   continue;
        // } else if (commits[i].parents.length === 1) {
        //   returnArr.push(commits[i]);
        //   theSha = commits[i].parents[0].sha;
        // } else {
        //   returnArr.push(commits[i]);
        //   break;
        // }
      } 
    }
    this.setState({
      currentBranchCommits: returnArr
    });
  }

  clickCommit (event) {
    this.setState({
      sha: event.target.value
    });
    this.getFileTree(this.roomid, event.target.value);
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

  componentWillReceiveProps(newProps) {
    console.log('new props are ', newProps);
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
                <div className='git-branch' key={index} onClick={this.clickBranch} value={branchObj}>{branchObj.name}</div>
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
//<button className='btn path-back-btn' onClick={this.clickBackButton}>Back</button>
