import React from 'react';

export default (props) => {
  console.log('props inside repo selector are', props);
  if (!props.parentState.repoName) {
    return (
      <div className='row margin-top-xl'>
        <div className='card offset-s4 col s4'>
          <div className='card-content section scrollspy'>
          <span className='card-title'>Select a repository</span>
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
            <button className="waves-effect waves-light btn margin-top-l disabled" disabled>Create Editing Room</button>
          </form>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='row margin-top-xl'>
        <div className='card offset-s4 col s4'>
          <div className='card-content section scrollspy'>
          <span className='card-title'>Select a repository</span>
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
            <button className="waves-effect waves-light btn margin-top-l">Create Editing Room</button>
          </form>
          </div>
        </div>
      </div>
    )
  }
}