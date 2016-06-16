import React from 'react';
import ReactDom  from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer} from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, combineReducers} from 'redux';
import { state } from './reducer.js';
import App from './components/App.jsx';
import TestComponent from './components/TestComponent.jsx';

require('file?name=[name].[ext]!./index.html');
let store = createStore(combineReducers({
  state,
  routing: routerReducer
}));
const history = syncHistoryWithStore(browserHistory, store);


ReactDom.render((
  <Provider store={store}>
    <TestComponent />
  </Provider>
  ), document.getElementById('app'));
