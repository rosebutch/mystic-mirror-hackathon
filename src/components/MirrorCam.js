import React, { useState, useRef } from "react"
import * as FaceAPI from 'face-api.js'
import Webcam from 'react-webcam'
import "./Filter.css"
import { generateRandomColor, emotionColor } from '../utility'

const MirrorCam = props => {
  const { setEmotion } = props
  const defaultColor = '#505050'
  const defaultEmotion = 'how are you feeling?'
  const webcamRef = useRef(null);
  const [camera, setCamera] = useState(false)
  const [overlayStyle, setOverlayStyle] = useState(defaultColor)
  const [loading, setLoading] = useState(false)

  const generateReading = async () => {
    if (!loading) {
      setLoading(true)
      if (camera && webcamRef && webcamRef.current && webcamRef.current.video) {
      try {
        const face = await FaceAPI.detectSingleFace(webcamRef.current.video, new FaceAPI.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        console.log("here's your face data, in case you're curious: ", face)
        if (face) {
          const mostLikelyExpression = Object.entries(face.expressions).reduce((accumulator, currentEmotion)=> {
            if (currentEmotion[1] > accumulator[1]) {
              return currentEmotion
            } else {
              return accumulator
            }
          },['neutral', -1])[0]
          const nose = face.landmarks.getNose()[0]
          const style = `at ${640 - Math.floor(nose.x)}px ${Math.floor(nose.y)}px, ${emotionColor[mostLikelyExpression]} 40%, #${generateRandomColor()}`
          setEmotion(`are you feeling a bit ${mostLikelyExpression}?`)
          setOverlayStyle(style)
        } else {
          setEmotion(defaultEmotion)
          setOverlayStyle(`#${generateRandomColor()}`)
        }
      } catch (err) {
        console.error(err)
      }
    } else {
      setEmotion(defaultEmotion)
      setOverlayStyle(`#${generateRandomColor()}`)
    }
    setLoading(false)
    }
  }


  const toggleCamera = () => {
    setCamera(!camera)
    setOverlayStyle(defaultColor)
    setEmotion(defaultEmotion)
  }

  return (
    <div>
      <div className='card camera' >
        {camera && <div className='overlay' style={{ backgroundImage: `radial-gradient(${overlayStyle}, #000000)`}} />}
        {camera && <Webcam ref={webcamRef} mirrored={true} audio={false}/>}
      </div>
      <div className='alert'>
        <button onClick={toggleCamera}>turn camera {camera? " off":" on" }</button>
        {camera && <button onClick={generateReading}>{loading? "loading  " :"generate "}reading</button>}
      </div>
    </div>
  )
}

export default MirrorCam
