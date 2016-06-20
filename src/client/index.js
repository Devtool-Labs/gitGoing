import React from 'react';
import ReactDom  from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer} from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { state, debugMode } from './reducer.js';
import App from './components/App.jsx';
import TestContainer from './containers/TestContainer.jsx';

require('file?name=[name].[ext]!./index.html');
require('file?name=[name].[ext]!./signin.html');
let store = createStore(
  combineReducers(
  {
    debugMode,
    state,
    routing: routerReducer
  }), applyMiddleware(
    thunkMiddleware
  ));
const history = syncHistoryWithStore(browserHistory, store);

ReactDom.render((
  <Provider store={store}>
    <Router history={history} component={App}>
       <Route path="/" component={TestContainer}/>
    </Router>
  </Provider>
  ), document.getElementById('app'));

