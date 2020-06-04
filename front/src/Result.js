import React from 'react'
import Answer from './Answer'

function Result({ data, setShow }) {
  const answerArray = data.map((word, i) => <Answer key={i} word={word} />)
  let oikeinArvattuja = 0
  data.forEach((word) => {
    if (
      (word.Oikea === '1' && word.vastaus === true) ||
      (word.Oikea === '2' && word.vastaus === false)
    ) {
      oikeinArvattuja++
    }
  })

  return (
    <div className={'game-container'}>
      <h1>Vastaukset</h1>
      {answerArray}
      <p>Sait {((oikeinArvattuja / data.length) * 100).toFixed(2)}% oikein</p>
      <button
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
