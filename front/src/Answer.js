import React from 'react'

function Answer({ word }) {
  const correct =
    (word.Oikea === '1' && word.vastaus === true) ||
    (word.Oikea === '2' && word.vastaus === false)
  return (
    <div>
      {word.SANA}: arvauksesi oli {correct ? 'oikein' : 'väärin'}
    </div>
  )
}

export default Answer
