import React, {useState, useEffect} from 'react'
import "./Sky.css"

const Star = () => {
  const [x, setx] = useState(0)
  const [y, sety] = useState(0)
  const [size, setSize] = useState(0)

  useEffect(() => {
    setx(Math.random() * 100)
    sety(Math.random() * 100)
    setSize(Math.ceil(Math.random() * 3))
  }, [])

  return <div className='star' style={{top: `${y}vh`, left: `${x}vw`, height: `${size}px`, width: `${size}px`, animation: `fade ${size * (Math.ceil(Math.random() * 5))}s linear infinite`}} />
}

export default Star
