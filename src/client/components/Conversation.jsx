import React from 'react';
import io from 'socket.io-client';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: '',
      messages: [],
      currentMessage: ''
    };

    props.listenToOutwardSendChat(this.outwardSendChat.bind(this));
    this.submitChat = this.submitChat.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    var randomImages = ['http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg', 'http://www.factslides.com/imgs/black-cat.jpg', 'http://www.horsebreedsinfo.com/images/miniature_horse.jpg', 'http://slodive.com/wp-content/uploads/2013/02/cute-bunny-pictures/wild-bunny.jpg', 'http://www.peabodysmith.com/blog/files/2013/01/100_1739.jpg', 'https://s-media-cache-ak0.pinimg.com/236x/f7/c5/33/f7c5334e0f06c4aa86fcec2385d132eb.jpg', 'https://s-media-cache-ak0.pinimg.com/236x/74/1c/ff/741cffafdb3915e4fc135156527b2a6c.jpg'];
    var imgUrl;
    if (!this.props.user.photos) {
      var randNum = Math.floor(Math.random() * 7);
      imgUrl = randomImages[randNum];
      randomImages.splice(randNum, 1);
    } else {
      var pickImage = JSON.parse(this.props.user.photos);
      imgUrl = pickImage[0].value;
    }
    this.setState({
      userImage: imgUrl
    });
  }

  handleChange (event) {
    this.setState({
      currentMessage: event.target.value
    });
  }

  submitChat (event) {
    console.log('submitted a chat');
    event.preventDefault();
    this.props.sendChat(this.props.roomid, this.state.userImage, this.state.currentMessage);
    this.setState({
      currentMessage: ''
    });
  }

  outwardSendChat (message) {
    var messageData = { 
      userImage: message.userImage,
      text: message.text
    };
    this.setState({
      messages: this.state.messages.concat(messageData)
    });
  }


  render() {
    return (
      <div className="row">
        <div id="messages">
        {this.state.messages.map((messageObj) => {
          return (
            <div className="col s10">
              <img className="userimg circle responsive-img" src={messageObj.userImage}/>
              <div className="col s10">{messageObj.text}</div>
            </div>
          );
        })}
        </div>
        <form action="" onSubmit={this.submitChat}>
          <input id="m" autocomplete="off" value={this.state.currentMessage} onChange={this.handleChange}/>
          <button className='waves-effect waves-light btn'>Send</button>
        </form>
      </div>
    )
  }
}