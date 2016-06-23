import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class RepositoryView extends React.Component {
  constructor(props) {
    super(props);
    props.getUser();

    this.handleClick = this.handleClick.bind(this);
  }


  componentWillReceiveProps (newProps) {
    console.log(newProps);
    var username = newProps.user.username;
    if (newProps.user && !newProps.repos.length) {
      this.props.getRepos(username);
    }
  }

  handleClick(event) {
   event.preventDefault(); 
   console.log("event.target", event.target.value);
   this.props.postRoom();
  }

  render() {
    return (
      <div>
        <form>
          {this.props.repos.map( (repoObj) => {
            return (
              <div>
                <input type="radio" name="repo" value={repoObj.name} />
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