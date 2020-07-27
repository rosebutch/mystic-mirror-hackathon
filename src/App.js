import React, { Component } from "react"
import "./App.css"
import MirrorCam from "./components/MirrorCam"

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>mystic mirror</h1>
        <p> use the buttons below to generate an aura reading </p>
        <MirrorCam />
      </div>
    )
  }
}

export default App
