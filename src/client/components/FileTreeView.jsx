import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class FileTreeView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      children: []
    };
    //props.getFileTree(props.roomid, props.sha);
    console.log('the props inside filetree view are', props);
    this.clickFolder = this.clickFolder.bind(this);
  }

  componentWillReceiveProps (newProps) {
    console.log('newprops are', newProps);
    this.setState({
      children: newProps.fileTree.fileData.children
    });
  }

  clickFolder (event) {
    this.props.getFileTreeRecursively(this.props.roomid, event.target.value);
  }

  render () {
    console.log('the state changed!', this.state.children);
    console.log('filedata is', this.props.fileTree);
    return (
      <div>
        <a href="/logout"><button type="button">Sign out</button></a>
        <button>Back</button>
        {this.state.children.map((childObj) => {
          var setReturns;
          var findAllChildren = (childObj) => {
            if (childObj.children.length === 0) {
              console.log('inside the map function in the if statement');
              if (childObj.type === 'tree') {
                setReturns = (
                  <h4 value={childObj.sha} onClick={this.clickFolder}>{childObj.path}</h4>
                );
              } else {
                setReturns = (
                  <h4>{childObj.path}</h4>
                );
              }
              return setReturns;
            } else {
              console.log('else statement!');
              for (var i = 0; i < childObj.children.length; i++) {
                console.log('iterating through the child object array!', childObj.children[i]);
                findAllChildren(childObj.children[i]);
                if (childObj.children[i].type === 'tree') {
                  setReturns = (
                    <h4 value={childObj.sha} onClick={this.clickFolder}>{childObj.path}</h4>
                  );
                } else {
                  setReturns = (
                    <h4>{childObj.children[i].path}</h4>
                  );
                }
                return setReturns;
              }
            }
          }
          findAllChildren(childObj);
          return setReturns;
        })}
      </div>
    );
    // var indent = 10;
    // var indentStyle = {
    //   'margin-left': indent + 'px'
    // };
  }
}




