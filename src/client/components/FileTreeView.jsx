import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class FileTreeView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      children: [],
      sidebarStack: this.props.ui.sidebarStack
    };
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
    this.setState({
      children: this.props.fileTree.fileData.children
    });
  }

  render () {
    console.log('the state changed!', this.state.children);
    console.log('filedata is', this.props.fileTree);
    return (
      <div>
        {this.state.children.map((childObj) => {
          if (childObj.children.length > 0) {
            for (var i = 0; i < childObj.children.length; i++) {
              console.log('inside the iteration, child obj is', childObj.children[i]);
              return (<h4>{childObj.children[i].path}</h4>);
            }
          }
          if (childObj.type === 'tree') {
            return (<h4 value={childObj.sha} onClick={this.clickFolder}>{childObj.path}</h4>);
          } else {
            return (<h5>{childObj.path}</h5>);
          }

        })}
      </div>
    );
   
  }
}




