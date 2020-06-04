import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import Axios from 'axios'
import Game from './Game'
import Result from './Result'

function App() {
  const [questions, setQuestions] = useState({})
  const [show, setShow] = useState('select')
  const [lvl, setLvl] = useState(1)
  const [amount, setAmount] = useState(60)
  const formRef = useRef()

  const play = (e) => {
    e.preventDefault()
    if (!formRef.current.reportValidity()) return
    Axios.get(`/api/${lvl}/${amount}`).then((res) => {
      setQuestions(res.data)
      setShow('game')
    })
  }

  if (show === 'select') {
    return (
      <div className={'center'}>
        <form ref={formRef}>
          <div>
            <label htmlFor="taso">Taso</label>
            <select
              name="taso"
              value={lvl}
              onChange={(e) => setLvl(e.target.value)}
            >
              <option value={1}>Taso 1</option>
              <option value={2}>Taso 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount">Sanojen määrä</label>
            <select
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={60}>60</option>
            </select>
          </div>
          <button onClick={play}>Pelaa</button>
        </form>
      </div>
    )
  } else if (show === 'game') {
    return (
      <Game data={questions} setShow={setShow} setQuestions={setQuestions} />
    )
  } else if (show === 'result') {
    return <Result data={questions} setShow={setShow} />
  } else {
    return <h1>Error</h1>
  }
}

export default App
