import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class RepositoryView extends React.Component {
  constructor(props) {
    super(props);
    props.getUser();
  }

  componentWillReceiveProps (newProps) {
    var username = newProps.user.profile.username;
    if (newProps.user && !newProps.repos.length) {
      this.props.getRepos(username);
    }
  }

  render() {
    return (
      <div>
        {this.props.repos.map( (repoObj) => {
          return (
            <div>
              <h3><Link to={`/*`}>{repoObj.name}</Link></h3>
              <h5>{repoObj.description}</h5>
              <h5>{repoObj.url}</h5>
            </div>
          )
        })}
        <button>Create Editing Room</button>
      </div>
    );
  }
}