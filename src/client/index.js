import React from 'react';
import ReactDom  from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { debugMode, user, repos, branches, commits, ui, fileTree, file, socket, room, allRooms } from './reducer.js';
import App from './components/App.jsx';
import TestContainer from './containers/TestContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
import EditRoom from './containers/EditRoomContainer.jsx';


require('file?name=[name].[ext]!./index.html');
require('file?name=[name].[ext]!./signin.html');
require('file?name=[name].[ext]!./signin.css');
require('file?name=[name].[ext]!./assets/GitHub-Mark-Light-64px.png');

const middlewareRouter = routerMiddleware(browserHistory);

let store = createStore(
  combineReducers(
  {
    debugMode,
    user,
    room,
    repos,
    branches,
    commits,
    ui,
    fileTree,
    file,
    socket,
    allRooms,
    routing: routerReducer
  }), applyMiddleware(
    thunkMiddleware,
    middlewareRouter
  ));

const history = syncHistoryWithStore(browserHistory, store);

ReactDom.render((
  <Provider store={store}>
    <Router history={history} component={App}>
       <Route path="/" component={DashboardContainer}/>
       <Route path="/room/:roomid" component={EditRoom}/>
       <Route path="/test/test" component={TestContainer} />
    </Router>
  </Provider>
  ), document.getElementById('app'));

