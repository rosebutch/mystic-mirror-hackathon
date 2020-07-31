import React, { useState, useRef } from "react"
import * as FaceAPI from 'face-api.js'
import Webcam from 'react-webcam'
import "./Filter.css"
import { emotionColor, findLikelyExpression } from '../utility'
import Emotions from "./Emotions"

const Face = () => {
  const defaultFace = {
    expressions: {
      angry: 0,
      disgusted: 0,
      fearful: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
      surprised: 0
    },
    landmarks: 0
  }
  const webcamRef = useRef(null);
  const [camera, setCamera] = useState(false)
  const [face, setFace] = useState(defaultFace)
  const [loading, setLoading] = useState(false)

  const generateReading = async () => {
    if (!loading) {
      setLoading(true)
      if (camera && webcamRef && webcamRef.current && webcamRef.current.video) {
        try {
          const faceRead = await FaceAPI.detectSingleFace(webcamRef.current.video, new FaceAPI.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
          console.log("here's your full face data, in case you're curious: ", faceRead)
          if (faceRead) {
            setFace(faceRead)
          } else {
            setFace(defaultFace)
          }
        } catch (err) {
          console.error(err)
          setFace(defaultFace)
        }
      } else {
        setFace(defaultFace)
      }
      setLoading(false)
    }
  }

  const allEmotions = Object.entries(face.expressions)
  const mostLikelyExpression = findLikelyExpression(allEmotions)
  const centerPoint = face.landmarks ? face.landmarks.getNose()[0] : { x: 320, y: 240}
  const overlayStyle = `at ${640 - Math.floor(centerPoint.x)}px ${Math.floor(centerPoint.y)}px, ${emotionColor[mostLikelyExpression]} 40%`

  const toggleCamera = () => {
    setCamera(!camera)
    setFace(defaultFace)
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
      <Emotions allEmotions={allEmotions} />
    </div>
  )
}

export default Face
