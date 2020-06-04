import React, { useState } from 'react'

function Word({ data, index, onChange }) {
  const [correct, setCorrect] = useState(false)
  const toggle = () => {
    setCorrect((prev) => !prev)
    onChange(index)
  }
  return (
    <div onClick={toggle} className={'word ' + (correct && 'selected')}>
      {data.SANA}
    </div>
  )
}

export default Word
