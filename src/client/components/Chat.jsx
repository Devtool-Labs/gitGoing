import React from 'react';
// import AceEditor from 'react-ace';
// import brace from 'brace';
// import 'brace/theme/monokai';
// import 'brace/mode/javascript';
import io from 'socket.io-client';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // text: props.ui.editorText
    };

  }

  getPic() {
    console.log('inside getPic');
    return fetch("/api/user", {
      credentials: 'same-origin'
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(jsonRes) {
      var photosArr = JSON.parse(jsonRes.photos);
      var currentPhoto = photosArr[photosArr.length - 1];
      var currentPhotoUrl = currentPhoto.value;
      console.log('currentPhotoUrl: ', currentPhotoUrl);
      return currentPhotoUrl;
    }).catch(function(err) {
      console.log('err: ' + err);
      return err;
    });
  }

  componentWillMount() {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg) {
      $('#messages').append($('<li>').text(msg));
    });
  }

  render() {
    return (
      <div>
        <ul id="messages"></ul>
        <form action="">
          <input id="m" autocomplete="off" /><button>Send</button>
        </form>
      </div>
    )
  }
}