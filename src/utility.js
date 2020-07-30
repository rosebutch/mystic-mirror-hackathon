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
  neutral: 'indigo'
}

export default { waitForIt, generateRandomColor, emotionColor }
