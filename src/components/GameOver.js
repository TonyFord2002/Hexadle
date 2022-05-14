import React, {useContext} from 'react'
import {AppContext} from '../App'

function GameOver() {
    const {gameOver, setGameOver, correctWord, currAttempt} = useContext(AppContext)

  return (
    <div className='gameOver'>
        <h2>{gameOver.guessedWord ? "You found the correct word!": "You did not find the correct word!"}</h2>
        <h1>Correct Word: {correctWord.toUpperCase()}</h1>
        {gameOver.guessedWord && (<h3> You guess the word in {currAttempt.attempt} attempts</h3>)}
    </div>
  )
}

export default GameOver