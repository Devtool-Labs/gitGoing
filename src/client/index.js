import React from 'react';
import ReactDom  from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { state, debugMode, user, repos, branches, commits } from './reducer.js';
import App from './components/App.jsx';
import TestContainer from './containers/TestContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
import DirectoryContainer from './containers/DirectoryContainer.jsx';


require('file?name=[name].[ext]!./index.html');
require('file?name=[name].[ext]!./signin.html');

const middlewareRouter = routerMiddleware(browserHistory);

let store = createStore(
  combineReducers(
  {
    debugMode,
    state,
    user,
    repos,
    branches,
    commits,
    routing: routerReducer
  }), applyMiddleware(
    thunkMiddleware,
    middlewareRouter
  ));

const history = syncHistoryWithStore(browserHistory, store);

ReactDom.render((
  <Provider store={store}>
    <Router history={history} component={App}>
       <Route path="/" component={TestContainer}/>
       <Route path="/dashboard" component={DashboardContainer}/>
       <Route path="/room/:roomid" component={DirectoryContainer}/>
    </Router>
  </Provider>
  ), document.getElementById('app'));

