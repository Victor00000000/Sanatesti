import React, { useRef, useContext } from 'react'
import Axios from 'axios'
import { QuestionsContext } from './Context'
import Select from './components/select/Select'

function SelectPage({ setShow, lvl, setLvl, amount, setAmount }) {
  const formRef = useRef()
  const data = useContext(QuestionsContext)

  const play = (e) => {
    e.preventDefault()
    if (!formRef.current.reportValidity()) return
    Axios.get(`/api/${lvl}/${amount}`).then((res) => {
      data.questions = res.data
      setShow('game')
    })
  }

  return (
    <div className={'select center'}>
      <form ref={formRef}>
        <div className={'select-group'}>
          <label htmlFor="taso">Taso</label>
          <Select name="taso" value={lvl} setValue={setLvl}>
            <option value={1}>Taso 1</option>
            <option value={2}>Taso 2</option>
          </Select>
        </div>
        <div className={'select-group'}>
          <label htmlFor="amount">Sanojen määrä</label>
          <Select name="amount" value={amount} setValue={setAmount}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            <option value={60}>60</option>
          </Select>
        </div>
        <button className={'button'} onClick={play}>
          Pelaa
        </button>
      </form>
    </div>
  )
}

export default SelectPage
