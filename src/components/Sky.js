import React, {useState, useEffect} from 'react'
import Star from './Star'

const Sky = () => {
  const [stars, setStars] = useState([])
  useEffect(() => {
    setStars(makeStars(200))
  }, []);
  const makeStars = numStars => {
    const arr = []
    for (let i = 0; i <= numStars; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.ceil(Math.random() * 3)
      arr.push({x,y,size})
    }
    return arr
  }
  return <div>
    {stars.map((star, idx) => <Star key={idx} star={star} />)}
  </div>
}

export default Sky
