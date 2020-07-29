import React, { Component } from "react"
import "./App.css"
import MirrorCam from "./components/MirrorCam"
import Sky from "./components/Sky"
import * as FaceAPI from 'face-api.js'

class App extends Component {

  async componentDidMount () {
    try {
      await Promise.all([
        FaceAPI.nets.tinyFaceDetector.loadFromUri("/models"),
        FaceAPI.nets.faceLandmark68Net.loadFromUri('/models'),
        FaceAPI.nets.faceExpressionNet.loadFromUri("/models")
      ])
      console.log("hacker voice: i'm in! models are loaded.")
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="App">
        <h1>mystic mirror</h1>
        <p> use the buttons below to generate an aura reading </p>
        <MirrorCam />
        <Sky />
      </div>
    )
  }
}

export default App
