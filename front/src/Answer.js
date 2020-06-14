import React from 'react'

function Answer({ word }) {
  const correct =
    (word.Oikea === '1' && word.vastaus === true) ||
    (word.Oikea === '2' && word.vastaus === false)
  return (
    <div className={'anwser'}>
      <span>{word.SANA}</span>
      <span className={correct ? 'correct' : 'not-correct'}>
        : arvauksesi oli {correct ? 'oikein' : 'väärin'}
      </span>
    </div>
  )
}

export default Answer
