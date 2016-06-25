import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class RepositoryView extends React.Component {
  constructor(props) {
    super(props);
    //props.debugModeOn();
    props.getUser();
    this.state = {repoName: null};

  }

  componentWillReceiveProps (newProps) {
    var username = newProps.user.username;
    if (newProps.user && !newProps.repos.length) {
      this.props.getRepos(newProps.user);
    }
  }

  handleSubmit(event) {
   event.preventDefault(); 
   this.props.postRoom(this.state.repoName);
  }

  clickRadio(e) {
    this.setState({ repoName: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.props.repos.map( (repoObj, index) => {
            return (
              <div key={index}>
                <input type="radio" name="repo" onClick={this.clickRadio.bind(this)} key={index} value={repoObj.name} />
                <h3>{repoObj.name}</h3>
                <h5>{repoObj.description}</h5>
                <h5>{repoObj.url}</h5>
              </div>
            );
          })}
          <button onClick={this.handleClick}>Create Editing Room</button>
        </form>
      </div>
    );
  }
}