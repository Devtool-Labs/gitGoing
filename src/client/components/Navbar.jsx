import React from 'react';

export default () => {
  return (
  <nav>
    <div className='nav-wrapper grey lighten-3'>
      <div className="container">
        <a href="#" className="nav-gitgoing">GitGoing</a>
        <ul className="right hide-on-med-and-down">
          <li><a className="nav-text" href="#about">About</a></li>
          <li><a className="nav-text" href="/logout">Sign Out</a></li>
        </ul>
      </div> 
    </div>
  </nav>
  )
}