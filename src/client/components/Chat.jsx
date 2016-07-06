import React from 'react';
// import AceEditor from 'react-ace';
// import brace from 'brace';
// import 'brace/theme/monokai';
// import 'brace/mode/javascript';
import io from 'socket.io-client';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';

<<<<<<< HEAD
=======

>>>>>>> 303dca6cd8b4112b97587bb6835b9f6867062717
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

  componentDidMount() {
    var imgUrl = 'https://avatars2.githubusercontent.com/u/7043747?v=3&s=460';
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    // socket.on('chat message', function(msg) {
    //   $('#messages').append($('<li>').text(msg));
    // });
    var incremeter = 0;
    socket.on('chat message', function(msg) {
      incremeter++;
      $('#messages').append($('<div id="' + incremeter + '">' ));
      var appendString = '#' + incremeter;
      console.log('appendString: ', appendString);
      $(appendString).append($('<img>').attr('src', imgUrl));
      $(appendString).append('<p id="pTag' + incremeter + '" >');
      var pTagAppend = '#pTag' + incremeter;
      $(pTagAppend).html(msg);
    });
  }

  render() {
    return (
      <div>
        <div id="messages"></div>
        <form action="">
          <input id="m" autocomplete="off" /><button className='waves-effect waves-light btn'>Send</button>
        </form>
      </div>
    )
  }
}