import React from 'react';
import _ from 'underscore';

export default (props) => {
  let username = !_.isEmpty(props.user) ? props.user.username : null
  return (
  <div>
    <ul id="dropdown1" className="dropdown-content">
      <li><a className="nav-text" href="">{username}</a></li>
      <li className="divider"></li>
      <li><a className="nav-text" href="#about">Help</a></li>
      <li><a className="nav-text" href="/logout">Sign Out</a></li>
    </ul>
    <nav>
      <div className='nav-wrapper grey lighten-3'>
        <div className="container">
          <a href="#" className="nav-gitgoing">GitGoing</a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a className="dropdown-button nav-text" href="#!" data-activates="dropdown1">
                <img className="circle nav-profile-img" src={!_.isEmpty(props.user) ? JSON.parse(props.user.photos)[0].value : null}/>
                {username}
                <i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div> 
      </div>
    </nav>
  </div>
  )
}