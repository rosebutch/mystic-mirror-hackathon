export const waitForIt = ms => new Promise(resolve => setTimeout(resolve, ms))

export const generateRandomColor = () => {
  return Math.floor(Math.random()*16777215).toString(16)
}

export const emotionColor = {
  fearful: 'purple',
  disgusted: 'green',
  angry: 'red',
  sad: 'blue',
  surprised: 'orange',
  happy: 'yellow',
  neutral: 'grey'
}

export const makeStars = numStars => {
  const arr = []
  for (let i = 0; i <= numStars; i++) {
    arr.push('')
  }
  return arr
}

export const findLikelyExpression = arr => {
  return arr.reduce((accumulator, currentEmotion)=> {
    if (currentEmotion[1] > accumulator[1]) {
      return currentEmotion
    } else {
      return accumulator
    }
  },['neutral', 0])[0]
}

export default { waitForIt, generateRandomColor, emotionColor, makeStars, findLikelyExpression }
