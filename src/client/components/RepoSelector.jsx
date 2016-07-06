import React from 'react';

export default (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {props.repos.map( (repoObj, index) => {
        return (
          <div key={index}>
            <p>
              <input type="radio" id={index} name="group1" key={index} value={repoObj.name} onClick={props.clickRadio}/>
              <label htmlFor={index}>{repoObj.name}</label>
            </p>
          </div>
        );
      })}
      <button className="waves-effect waves-light btn">Create Editing Room</button>
    </form>
  )
}