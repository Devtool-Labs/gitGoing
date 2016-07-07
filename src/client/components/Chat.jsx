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

  componentDidMount() {
    console.log('inside component did mount of chat', JSON.parse(this.props.user.photos));
    var randomImages = ['http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg', 'http://www.factslides.com/imgs/black-cat.jpg', 'http://www.horsebreedsinfo.com/images/miniature_horse.jpg', 'http://slodive.com/wp-content/uploads/2013/02/cute-bunny-pictures/wild-bunny.jpg'];
    var imgUrl;
    if (!this.props.user.photos) {
      var randNum = Math.floor(Math.random() * 3);
      imgUrl = randomImages[randNum];
      randomImages.splice(randNum, 1);
    } else {
      var pickImage = JSON.parse(this.props.user.photos);
      imgUrl = pickImage[0].value;
    }
    //var imgUrl = JSON.parse(this.props.user.photos)[0].value;
    var socket = io();
    $('form').submit(function(event){
      event.preventDefault();
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

  render() {
    return (
      <div>
        <div id="messages"></div>
        <form action="" >
          <input id="m" autocomplete="off" />
          <button className='waves-effect waves-light btn'>Send</button>
        </form>
      </div>
    )
  }
}