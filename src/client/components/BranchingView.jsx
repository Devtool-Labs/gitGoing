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

  this.clickBranch = this.clickBranch.bind(this);
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
    var showProperties = this.props.ui.sidebarStack;
    if (showProperties.length === 0 || (showProperties[0].display && showProperties.length === 1) || (showProperties[showProperties.length - 3].display && showProperties.length > 1)) {
      return (
        <div>
          <button>Back2</button>
          {this.props.branches.map((branchObj) => {
            console.log('getting inside branch map', branchObj);
            return (
              <h3 onClick={this.clickBranch}>{branchObj.name}</h3>
            )
           })}
        </div>
      )
    } else if (showProperties[showProperties.length - 2].display && showProperties.length >= 2) {
      return (
        <div>
          <button>Back3</button>
          {this.props.commits.map((commitObj, index) => {
            return (
              <h4 key={index}>{commitObj.commit.message}</h4>
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
