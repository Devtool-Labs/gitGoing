import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

var repoData = [

  {
    'repoName': 'Memowise',
    'description': 'Memowise app',
    'pushed_at': 'April 6, 2016'
  },
  {
    'repoName': 'Farm-Connect',
    'description': 'Allow farmers to sell directly to users',
    'pushed_at': 'May 9, 2016'
  },
  {
    'repoName': 'GitGoing',
    'description': 'Github wrapper app',
    'pushed_at': 'June 16, 2016'
  }

];


export default class RepositoryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {repoData.map( (repoObj) => {
          return (
            <div>
              <h3><Link to={`/*`}>{repoObj.repoName}</Link></h3>
              <h3>{repoObj.repoName}</h3>
              <h5>{repoObj.description}</h5>
              <h5>{repoObj.pushed_at}</h5>
            </div>
          )
        })}
        <button>Create Editing Room</button>
      </div>
    );
  }
}