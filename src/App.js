
import './App.css'
import Keyboard from './components/Keyboard'
import Board from './components/Board'
import GameOver from './components/GameOver'
import {boardDefault, generateWordSet} from './Words'
import {React, createContext, useState, useEffect} from 'react'

export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState ([])
  const [correctWord, setCorrectWord] = useState('')
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  
  
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 5) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({attempt: currAttempt.attempt, letterPos: currAttempt.letterPos + 1})
  }

  const onDelete = () =>{
    if(currAttempt.letterPos ===0) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos -1] = ""
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const onEnter =() =>{
    if (currAttempt.letterPos !== 6) return
    
    let currWord = ""
    for (let i = 0; i < 6; i++) {
      currWord += board[currAttempt.attempt][i]
    }
    
    if (wordSet.has((currWord).toLowerCase())) {
         setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
    } else {
      alert(currWord + ' is not a valid word')
      return
    }
    if ((currWord)===correctWord.toUpperCase()){
      setGameOver({gameOver: true, guessedWord: true})
      return
    }
    if (currAttempt.attempt === 5){
      setGameOver({gameOver: true, guessedWord: false})
    }
  }
  return (
    <div className="App">
      <nav><h1>Hexadle</h1></nav>
      <AppContext.Provider value={{
        board, 
        setBoard, 
        currAttempt, 
        setCurrAttempt, 
        onSelectLetter, 
        onDelete, 
        onEnter, 
        correctWord,
        disabledLetters, 
        setDisabledLetters,
        gameOver,
        setGameOver
        }}>

        <div className='game'>
          <Board/>
          {gameOver.gameOver ? <GameOver/> : <Keyboard/>}
        </div>
     </AppContext.Provider>
    </div>
  )
}

export default App
