import React, { useContext } from 'react'
import Word from './Word'
import { QuestionsContext } from './Context'

function Game({ setShow }) {
  const data = useContext(QuestionsContext)
  let wordAnswers = Array(data.questions.length).fill(false)

  const changeAnswer = (index) => {
    wordAnswers[index] = !wordAnswers[index]
  }
  const wordArray = data.questions.map((word, i) => {
    return <Word key={i} data={word} index={i} onChange={changeAnswer} />
  })

  const finish = () => {
    data.questions = data.questions.map((word, i) => {
      return { ...word, vastaus: wordAnswers[i] }
    })
    setShow('result')
  }

  return (
    <div className={'container game'}>
      <p className={'info'}>
        Valitse listasta kaikki sanat, jotka ovat sinulle tuttuja. Jos et ole
        varma, mitä sana tarkoittaa, älä valitse sitä.
      </p>
      <div className={'word-container'}>{wordArray}</div>
      <div className={'center'}>
        <button onClick={finish} className={'button'}>
          Tarkista
        </button>
        <button
          className={'button'}
          onClick={() => {
            setShow('select')
          }}
        >
          Takaisin
        </button>
      </div>
    </div>
  )
}

export default Game
