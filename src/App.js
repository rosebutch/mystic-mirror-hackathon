import React, { Component } from "react"
import "./App.css"
import MirrorCam from "./components/MirrorCam"
import Sky from "./components/Sky"
import * as FaceAPI from 'face-api.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      emotion: 'how are you feeling?'
    }
  }

  setEmotion = emotion => {
    this.setState({emotion})
  }

  async componentDidMount () {
    try {
      await Promise.all([
        FaceAPI.nets.tinyFaceDetector.loadFromUri("/models"),
        FaceAPI.nets.faceLandmark68Net.loadFromUri('/models'),
        FaceAPI.nets.faceExpressionNet.loadFromUri("/models")
      ])
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="App">
        <h1>mystic mirror</h1>
        <p> your virtual mood ring. show us all your emotions. {this.state.emotion} </p>
        <MirrorCam  setEmotion={this.setEmotion} />
        <Sky />
      </div>
    )
  }
}

export default App
