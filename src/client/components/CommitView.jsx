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
 				<h3>
 				)
 		})}

 		</div>
 		)


 } 
}