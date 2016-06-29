import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class FileTreeView extends React.Component {
  constructor (props) {
    super(props);
    console.log('the props inside filetree view are', props);
  }

  componentWillReceiveProps(newProps) {
    console.log('Just received new props! INSIDE FILETREE VIEW', this.props.fileTree);
  }

  render () {
    return (
      <div>
        <a href="/logout"><button type="button">Sign out</button></a>
        <button onClick={this.clickBackButton}>Back</button> 
      </div>
    );
  }
}

