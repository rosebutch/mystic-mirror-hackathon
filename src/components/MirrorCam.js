import React, {useState} from "react"
import Webcam from 'react-webcam'
import "./Filter.css"

const MirrorCam = () => {
  const [camera, setCamera] = useState(true)
  const [overlayStyle, setOverlayStyle] = useState({})

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
        {camera && <Webcam mirrored={true} audio={false}/>}
      </div>
      <div className='alert'>
        <button className="btn btn-info m-3" onClick={toggleCamera}>{camera? "camera off":"camera on" }</button>
        {camera && <button className="btn btn-info m-3" onClick={changeColor}>generate reading</button>}
      </div>
    </div>
  )
}

export default MirrorCam
