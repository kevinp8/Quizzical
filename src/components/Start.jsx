import React from 'react'

function Start(props) {
  return (
    <div className='startPage'>
        <h1>Quizzical</h1>
        <p>Answer 5 Random Question To Win!</p>
        <button className='Start' onClick={props.startQuiz}>Start quiz</button>
    </div>
  )
}

export default Start