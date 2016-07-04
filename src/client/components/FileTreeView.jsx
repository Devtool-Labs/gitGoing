import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import _ from 'underscore';

export default class FileTreeView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileData: null,
      clickedBefore: [],
      sidebarStack: this.props.ui.sidebarStack,
    };
    this.clickFolder = this.clickFolder.bind(this);
    this.toggleFolder = this.toggleFolder.bind(this);
    this.clickFile = this.clickFile.bind(this);
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      fileData: newProps.fileTree.fileData
    });
  }

  clickFile(event) {
    this.props.getFile(this.props.roomid, this.props.ui.currentCommitSha, event.target.value);
  }

  clickFolder (event) {
    var called = false;
    var clicked = this.state.clickedBefore;
    for (var i = 0; i < clicked.length; i++) {
      if (clicked[i] === event.target.value) {
        called = true;
      }
    }
    if (!called) {
      this.props.getFileTreeRecursively(this.props.roomid, event.target.value);
      this.setState({
        fileData: this.props.fileTree.fileData,
        clickedBefore: clicked.concat(event.target.value),
      });
    }  
    this.toggleFolder(event.target.value);
  }

  toggleFolder (clickedSha) {
    var arrayCopy = this.state.fileData.slice(0);
    for (var i = 0; i < arrayCopy.length; i++) {
      if (arrayCopy[i].sha === clickedSha) {
        var currentDepth = arrayCopy[i].depth;
        arrayCopy[i].icon = !arrayCopy[i].icon;
        for (var j = i + 1; j < arrayCopy.length; j++) {
          if (arrayCopy[j].depth === currentDepth) {
            break;
          }
          arrayCopy[j].visible = !arrayCopy[j].visible; 
        }
        break;
      } 
    } 

    this.setState({
      fileData: arrayCopy
    });
  }

  render () {
    var flattened = _.flatten(this.state.fileData);
    return (
      <div>
        {flattened.map((childObj) => {
          var styles = {
            'marginLeft': 25 * childObj.depth + 'px',
            'cursor': 'pointer'
          };
          var icon = childObj.icon ? '-' : '+';
          if (childObj.visible) {
            if (childObj.type === 'tree') {
              return (<p style={styles} value={childObj.sha} onClick={this.clickFolder}>{icon}  {childObj.path}</p>);
            } else {
              return (<p style={styles} value={childObj.absolutePath} onClick={this.clickFile}>{childObj.path}</p>);
            } 
          }
        })}
      </div>
    );
  }
}


