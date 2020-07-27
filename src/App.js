import React, { Component } from "react"
import "./App.css"
import Webcam from 'react-webcam'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Webcam />
      </div>
    )
  }
}

export default App
