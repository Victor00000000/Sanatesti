import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import 'axios'
import Axios from 'axios'

function App() {
  const [num, setNum] = useState(10)
  const tasoRef = useRef()
  const formRef = useRef()

  const play = (e) => {
    e.preventDefault()
    if (!formRef.current.reportValidity()) return
    Axios.get(`/api/${tasoRef.current.value}/${num}`).then((res) =>
      console.log(res.data)
    )
  }
  return (
    <div>
      <form ref={formRef}>
        <div>
          <label htmlFor="taso">Taso</label>
          <select name="taso" ref={tasoRef}>
            <option value={1}>Taso 1</option>
            <option value={2}>Taso 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount">Sanojen määrä</label>
          <input
            name="amount"
            type="number"
            min={10}
            max={60}
            value={num}
            step={10}
            onChange={(e) => {
              setNum(e.target.value)
            }}
          />
        </div>
        <button onClick={play}>Pelaa</button>
      </form>
    </div>
  )
}

export default App
