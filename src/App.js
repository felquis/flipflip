import React, { Component } from 'react'
import './App.css'
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  ResponsiveContainer
} from 'recharts'

// import TimeSeries from './Other'
let orientationHistory = []

class App extends Component {
  constructor () {
    super()
    this.state = {
      snapShot: [],
      showError: "",
      // orientation: [],
      running: false,
      flipCount: 0,
    }

    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this)
    this.toggleRunning = this.toggleRunning.bind(this)
  }

  componentDidMount() {
    this.setState({
      running: true,
    })

    window.addEventListener('deviceorientation', this.handleDeviceOrientation, true)
    setTimeout(this.checkOrientationChangeEvents, 2000)
    this.setSnapShot()
  }

  checkOrientationChangeEvents = () => {
    if (this.state.snapShot.length < 10) {
      this.setState({
        showError: 'Orientation events doesn\'t work'
      })
    }
  }

  setSnapShot() {
    this.timer = setTimeout(() => this.setSnapShot(), 1000)

    this.setState({
      snapShot: orientationHistory.slice(0, orientationHistory.length - 1)
    })
  }

  onDismissHeaderError = () => {
    this.setState({
      showError: ''
    })
  }

  handleDeviceOrientation (orientation) {
    // alert('b')
    // alert('a')
    // if (!this.state.running) return

    const { alpha, gamma, absolute, timeStamp, type, beta } = orientation

    const newOrientation = {
      alpha, gamma, absolute, time: timeStamp, type, beta
    }

    const total = orientationHistory.length
        
    if (total > 200) {
      orientationHistory.shift()
    }

    orientationHistory.push(newOrientation)
  }

  toggleRunning () {
    this.setState({
      orientation: [],
      running: !this.state.running
    })
  }

  render() {
    const { snapShot } = this.state

    return (
      <div className="App">
        <footer className="App-footer">
          {snapShot.length}
          {/* <button className="App-button" onClick={this.toggleRunning}>
            {running? 'stop' : 'start'}
          </button> */}
        </footer>

        {/* <TimeSeries chartData={snapShot} /> */}

        <ResponsiveContainer height="90%" width="100%">
          <LineChart
            width={730}
            height={250}
            data={snapShot}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <XAxis dataKey="x" />
            <YAxis domain={[-100, 100]} />
            <Legend />
            <Line dataKey="alpha" stroke="#19cade" animationDuration={0} dot={false}/>
            <Line dataKey="beta" stroke="green" animationDuration={0} dot={false}/>
            <Line dataKey="gamma" stroke="red" animationDuration={0} dot={false}/>
          </LineChart>
        </ResponsiveContainer>

        {this.state.showError &&
          <div className="error-modal">
            <h2>{this.state.showError}</h2>

            <button onClick={this.onDismissHeaderError}>Close</button>
          </div>
        }
      </div>
    )
  }
}

export default App
