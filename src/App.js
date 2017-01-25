import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {DeviceOrientation} from 'react-event-components'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Line,
  ResponsiveContainer
} from 'recharts'

class App extends Component {
  constructor () {
    super()
    this.state = {
      orientation: [],
      running: false,
    }

    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this)
    this.toggleRunning = this.toggleRunning.bind(this)
  }

  handleDeviceOrientation = (orientation) => {
    if (!this.state.running) return

    this.setState({ orientation: [...this.state.orientation, orientation] })
  }

  toggleRunning () {
    if (!this.state.running) {
      this.setState({ orientation: [] })
    }

    this.setState({
      running: !this.state.running
    })
  }

  render() {
    const {running, orientation} = this.state

    return (
      <div className="App">
        <DeviceOrientation do={this.handleDeviceOrientation} />

        <p>
          <button className="App-button" onClick={this.toggleRunning}>{running ? 'Stop': 'Start'} Trick</button>
        </p>

        {!running || running ? (<ResponsiveContainer height={350} width="100%">
          <LineChart
            width={730}
            height={250}
            data={orientation}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <XAxis dataKey="x" />
            <YAxis />
            <CartesianGrid />
            <Tooltip />
            <Legend />
            <Line dataKey="alpha" stroke="#19cade" animationDuration={0} />
            <Line dataKey="beta" stroke="green" animationDuration={0} />
            <Line dataKey="gamma" stroke="red" animationDuration={0} />
          </LineChart>
        </ResponsiveContainer>): <div>Something Else</div>}
      </div>
    )
  }
}

export default App
