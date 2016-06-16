import React from 'react';
import ReactDom  from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

require('file?name=[name].[ext]!./index.html');

ReactDom.render((
  <div>
    Hello World!
  </div>
  ), document.getElementById('app'));