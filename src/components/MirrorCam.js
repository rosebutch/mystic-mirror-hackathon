import React, { useState, useEffect, useRef } from "react"
import * as FaceAPI from 'face-api.js'
import Webcam from 'react-webcam'
import "./Filter.css"

const MirrorCam = () => {
  const webcamRef = useRef(null);
  const [camera, setCamera] = useState(false)
  const [detections, setDetections] = useState({})
  const [overlayStyle, setOverlayStyle] = useState({})

  useEffect(() => {
    if (camera && webcamRef && webcamRef.current && webcamRef.current.video) {
      console.log("video ref", webcamRef.current.video)

      const waitForIt = ms => new Promise(resolve => setTimeout(resolve, ms))

      const getFaceStuff = async () => {
        console.log("inside getFaceStuff")
        await waitForIt(5000)
        console.log("waited")
        const face = await FaceAPI.detectSingleFace(webcamRef.current.video, new FaceAPI.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        console.log(face)
        setDetections(face)
        console.log(detections)
      }

      getFaceStuff()
    }
  }, [camera, detections])

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
