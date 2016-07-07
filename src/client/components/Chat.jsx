import React from 'react';
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

  // getPic() {
  //   console.log('inside getPic');
  //   return fetch("/api/user", {
  //     credentials: 'same-origin'
  //   })
  //   .then(function(res) {
  //     return res.json();
  //   })
  //   .then(function(jsonRes) {
  //     var photosArr = JSON.parse(jsonRes.photos);
  //     var currentPhoto = photosArr[photosArr.length - 1];
  //     var currentPhotoUrl = currentPhoto.value;
  //     console.log('currentPhotoUrl: ', currentPhotoUrl);
  //     return currentPhotoUrl;
  //   })
  //   .then(function(link) {
  //     return link;
  //   })
  //   .catch(function(err) {
  //     console.log('err: ' + err);
  //     return err;
  //   });
  // }

  componentDidMount() {
    var imgUrl = JSON.parse(this.props.user.photos)[0].value;
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    var incremeter = 0;
    socket.on('chat message', function(msg) {
      incremeter++;
      $('#messages').append($('<div id="' + incremeter + '" >' ));
      var appendString = '#' + incremeter;
      $(appendString).append($('<img class="userimg circle responsive-img" >').attr('src', imgUrl));
      $(appendString).append('<p id="pTag' + incremeter + '" class="userimg" >');
      var pTagAppend = '#pTag' + incremeter;
      $(pTagAppend).html(msg);
    });
  }

  // NEXT IMPROVEMENTS
  // Address no user pic
  // What about the other user's pic?

  render() {
    return (
      <div>
        <div id="messages"></div>
        <form action="" >
          <input id="m" autocomplete="off" /><button className='waves-effect waves-light btn'>Send</button>
        </form>
      </div>
    )
  }
}