export const waitForIt = ms => new Promise(resolve => setTimeout(resolve, ms))

export const generateRandomColor = () => {
  return Math.floor(Math.random()*16777215).toString(16)
}

export const emotionColor = {
  fearful: 'red',
  disgusted: 'orange',
  angry: 'yellow',
  sad: 'green',
  surprised: 'blue',
  happy: 'indigo',
  neutral: 'purple'
}

export default { waitForIt, generateRandomColor, emotionColor }
