import React, { useState, useRef } from 'react'
import './Select.css'

function Select({ children, value, setValue }) {
  const [isOpen, setIsOpen] = useState(false)
  const childrenState = useRef(
    children.map((option, i) => {
      return (
        <div
          style={{
            position: 'absolute',
            minWidth: '100%',
            background: 'lightgrey',
            top: `${i * 40 + 40}px`,
            left: 0,
            fontSize: '5vh',
            zIndex: !isOpen ? '10' : '0',
            border: '1px solid black',
            borderRadius: '2px',
          }}
          className={'select-option'}
          key={i}
          onClick={() => {
            setValue(option.props.value)
            open()
          }}
        >
          {option.props.children}
        </div>
      )
    })
  )

  let print = children.find((op) => op.props.value === value)

  const open = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <span
      style={{
        position: 'relative',
        cursor: 'pointer',
        fontSize: '5vh',
        border: '1px solid black',
        borderRadius: '2px',
      }}
      className={''}
    >
      <div onClick={open}>
        {print && print.props.children}
        {!isOpen ? (
          <i className="fas fa-caret-down"></i>
        ) : (
          <i className="fas fa-caret-up"></i>
        )}
      </div>
      {isOpen && childrenState.current}
    </span>
  )
}

export default Select
