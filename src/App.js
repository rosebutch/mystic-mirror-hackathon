import React, { Component } from "react"
import "./App.css"
import Face from "./components/Face"
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
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="App">
        <h1>mystic mirror</h1>
        <p> your virtual mood ring. show us all your emotions.</p>
        <Face />
        <Sky />
      </div>
    )
  }
}

export default App
