import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class CommitView extends React.Component {
 constructor(props) {
  super(props);
 }


 render() {
 	return(
 		<div>
 		{this.props.commit.message.map((commitObj) => {
 			return (
        <div>
          <a href="/logout"><button type="button">Logout</button></a>
 				  <h3>Commit View</h3>
        </div>
 				)
 		})}

 		</div>
 		)


 } 
}