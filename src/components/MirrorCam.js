import React, {useState} from "react"
import Webcam from 'react-webcam'

const MirrorCam = () => {
  const [camera, setCamera] = useState(true)

  const toggleCamera = () => {
    setCamera(!camera)
  }

  return (
    <div>
      <div className='card' >
        {camera && <Webcam mirrored={true} audio={false}/>}
      </div>
      <button class="btn btn-info" onClick={toggleCamera}>{camera? "off":"on" }</button>
    </div>
  )
}

export default MirrorCam
