import React from 'react'
import "./Sky.css"

const Star = props => {
  const {x, y, size} = props.star
  return <div className='star' style={{top: `${y}vh`, left: `${x}vw`, height: `${size}px`, width: `${size}px`, animation: `fade ${size * (Math.ceil(Math.random() * 5))}s linear infinite`}} />
}

export default Star
