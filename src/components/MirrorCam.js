import React, { useState, useEffect, useRef } from "react"
import * as FaceAPI from 'face-api.js'
import Webcam from 'react-webcam'
import "./Filter.css"

const MirrorCam = () => {
  const webcamRef = useRef(null);
  const [camera, setCamera] = useState(false)
  const [overlayStyle, setOverlayStyle] = useState({})

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          FaceAPI.nets.tinyFaceDetector.loadFromUri("/models"),
          FaceAPI.nets.faceExpressionNet.loadFromUri("/models")
        ])
        console.log("hacker voice: i'm in!")
      } catch (err) {
        console.log(err)
      }
    }
    loadModels()
  }, [])

  const toggleCamera = () => {
    setOverlayStyle({})
    setCamera(!camera)
  }

  const changeColor = () => {
    setOverlayStyle({
      backgroundImage: `radial-gradient(#${generateRandomColor()}, #${generateRandomColor()}, #${generateRandomColor()})`
    })
  }

  const generateRandomColor = () => {
    return Math.floor(Math.random()*16777215).toString(16)
  }

  return (
    <div>
      <div className='card camera' >
        {camera && overlayStyle && <div className='overlay' style={overlayStyle} />}
        {camera && <Webcam ref={webcamRef} mirrored={true} audio={false}/>}
      </div>
      <div className='alert'>
        <button onClick={toggleCamera}>{camera? "camera off":"camera on" }</button>
        {camera && <button  onClick={changeColor}>generate reading</button>}
      </div>
    </div>
  )
}

export default MirrorCam
