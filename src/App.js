import React, { Component } from 'react'
import './App.css'
import {DeviceOrientation} from 'react-event-components'
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  ResponsiveContainer
} from 'recharts'

let orientationHistory = []

class App extends Component {
  constructor () {
    super()
    this.state = {
      snapShot: [],
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
    this.setSnapShot()
  }

  setSnapShot() {
    this.timer = setTimeout(() => this.setSnapShot(), 1000)

    this.setState({
      snapShot: orientationHistory.slice(0, orientationHistory.length - 1)
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
        {/* <DeviceOrientation do={this.handleDeviceOrientation} /> */}

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
      </div>
    )
  }
}

export default App
