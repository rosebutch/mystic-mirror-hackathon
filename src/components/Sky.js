import React, {useState, useEffect} from 'react'
import Star from './Star'
import {makeStars} from '../utility'

const Sky = () => {
  const [stars, setStars] = useState([])
  useEffect(() => {
    setStars(makeStars(200))
  }, []);

  return <div>
    {stars.map((star, idx) => <Star key={idx} />)}
  </div>
}

export default Sky
