import React, { useState } from 'react'
import './App.css'
import Game from './Game'
import Result from './Result'
import SelectPage from './SelectPage'

function App() {
  const [show, setShow] = useState('select')
  const [lvl, setLvl] = useState(1)
  const [amount, setAmount] = useState(60)

  if (show === 'select') {
    return (
      <SelectPage
        setShow={setShow}
        lvl={lvl}
        setLvl={setLvl}
        amount={amount}
        setAmount={setAmount}
      />
    )
  } else if (show === 'game') {
    return <Game setShow={setShow} />
  } else if (show === 'result') {
    return <Result setShow={setShow} />
  } else {
    return <h1>Error</h1>
  }
}

export default App
