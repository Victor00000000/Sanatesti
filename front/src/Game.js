import React, { useRef, useState, useEffect } from 'react'
import Word from './Word'

function Game({ data, setShow, setQuestions }) {
  const [wordAnswers, setWordAnswers] = useState(Array(data.length).fill(false))

  const changeAnswer = (index) => {
    wordAnswers[index] = !wordAnswers[index]
  }
  const wordArray = data.map((word, i) => {
    return <Word key={i} data={word} index={i} onChange={changeAnswer} />
  })

  const finish = () => {
    setQuestions((array) => {
      return array.map((word, i) => {
        return { ...word, vastaus: wordAnswers[i] }
      })
    })
    setShow('result')
  }

  return (
    <div className={'game-container'}>
      <p className={'info'}>
        Valitse listasta kaikki sanat, jotka ovat sinulle tuttuja. Jos et ole
        varma, mitä sana tarkoittaa, älä valitse sitä.
      </p>
      {wordArray}
      <div className={'center'}>
        <button onClick={finish}>Tarkista</button>
        <button
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
