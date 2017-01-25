import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {DeviceOrientation, Every} from 'react-event-components'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Line
} from 'recharts'

class App extends Component {
  constructor () {
    super()
    this.state = {
      startTrick: false,
      trickTime: 0,
      graph: []
    }

    this.handleEvery = this.handleEvery.bind(this)
    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this)
    this.handleStartTrick = this.handleStartTrick.bind(this)
  }

  handleDeviceOrientation = (ev) => {
    console.log(ev)
    this.setState({
      graph: [...this.state.graph, {x: this.state.trickTime, value: ev}]
    })

    // console.log(this.state.graph)
  }

  handleEvery (delta) {
    console.log(this.state)
    this.setState({
      trickTime: this.state.trickTime + delta
    })
  }

  handleStartTrick () {
    // console.log(this.state)
    this.setState({
      startTrick: !this.state.startTrick
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.startTrick && (
            <div>
              <Every frame do={this.handleEvery} />

              <DeviceOrientation do={this.handleDeviceOrientation} />
            </div>
        )}

        <p className="App-intro">
          {this.state.trickTime}ms
        </p>

        <p>
          <button onClick={this.handleStartTrick}>Start Trick</button>
        </p>

        <p>
          <LineChart width={730} height={250} data={this.state.graph}>
            <XAxis dataKey="x" />
            <YAxis />
            <CartesianGrid />
            <Tooltip />
            <Legend />
            <Line dataKey="value.alpha" stroke="#19cade" animationDuration={0} />
            <Line dataKey="value.beta" stroke="green" animationDuration={0} />
            <Line dataKey="value.gamma" stroke="red" animationDuration={0} />
          </LineChart>
        </p>
      </div>
    );
  }
}

export default App;
