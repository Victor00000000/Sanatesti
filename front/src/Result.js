import React, { useContext } from 'react'
import Answer from './Answer'
import { QuestionsContext } from './Context'

function Result({ setShow }) {
  const data = useContext(QuestionsContext)

  const answerArray = data.questions.map((word, i) => (
    <Answer key={i} word={word} />
  ))
  let oikeinArvattuja = 0
  data.questions.forEach((word) => {
    if (
      (word.Oikea === '1' && word.vastaus === true) ||
      (word.Oikea === '2' && word.vastaus === false)
    ) {
      oikeinArvattuja++
    }
  })

  return (
    <div className={'container center'}>
      <h1>Vastaukset</h1>
      <div className={'word-container'}>{answerArray}</div>
      <p className={'conclusion'}>
        Sait {((oikeinArvattuja / data.questions.length) * 100).toFixed(2)}%
        oikein
      </p>
      <button
        className={'button'}
        onClick={() => {
          setShow('select')
        }}
      >
        Pelaa uudestaan
      </button>
    </div>
  )
}

export default Result
