import React, { useState, useEffect, useRef } from "react"
import * as FaceAPI from 'face-api.js'
import Webcam from 'react-webcam'
import "./Filter.css"

const MirrorCam = () => {
  const webcamRef = useRef(null);
  const [camera, setCamera] = useState(false)
  const [overlayStyle, setOverlayStyle] = useState({})

  useEffect(() => {
    if (camera && webcamRef && webcamRef.current && webcamRef.current.video) {
      console.log("video ref", webcamRef.current.video)

      const waitForIt = ms => new Promise(resolve => setTimeout(resolve, ms))

      const generateRandomColor = () => {
        return Math.floor(Math.random()*16777215).toString(16)
      }

      const emotionColor = {
        fearful: 'red',
        disgusted: 'orange',
        angry: 'yellow',
        sad: 'green',
        surprised: 'blue',
        happy: 'indigo',
        neutral: 'purple'
      }

      const getFaceStuff = async () => {
        try {
          await waitForIt(2000)
          const face = await FaceAPI.detectSingleFace(webcamRef.current.video, new FaceAPI.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
          console.log("face data: ", face)
          await waitForIt(2000)
          if (face) {
            const mostLikelyExpression = Object.entries(face.expressions).reduce((accumulator, currentEmotion)=> {
              console.log("currentEmotion: ", currentEmotion)
              console.log("accumulator: ", accumulator)
              if (currentEmotion[1] > accumulator[1]) {
                return currentEmotion
              } else {
                return accumulator
              }
            },['neutral', -1])[0]
            await waitForIt(2000)
            const style = {backgroundImage: `radial-gradient(at ${face.detection.box.x}px ${face.detection.box.y}px, ${emotionColor[mostLikelyExpression]}, #${generateRandomColor()}, #000000)`}
            setOverlayStyle(style)
            console.log('overlay reflecting emotion: ', style)
          } else {
            const randomStyle = {
              backgroundImage: `radial-gradient(#${generateRandomColor()}, #${generateRandomColor()}, #000000)`
            }
            setOverlayStyle(randomStyle)
            console.log('randomly generated overlay: ', randomStyle)
          }
        } catch (err) {
          console.error(err)
        }
      }

      getFaceStuff()
    }
  }, [camera, overlayStyle])

  const toggleCamera = () => {
    setOverlayStyle({})
    setCamera(!camera)
  }

  return (
    <div>
      <div className='card camera' >
        {camera && overlayStyle && <div className='overlay' style={overlayStyle} />}
        {camera && <Webcam ref={webcamRef} mirrored={true} audio={false}/>}
      </div>
      <div className='alert'>
        <button onClick={toggleCamera}>turn camera {camera? " off":" on" }</button>
      </div>
    </div>
  )
}

export default MirrorCam
