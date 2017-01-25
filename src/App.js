import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {DeviceOrientation} from 'react-event-components'
import firebase from 'firebase'
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

firebase.initializeApp({
  apiKey: 'AIzaSyAX6HpGRqFpAU5blvJinLUKsOd8f2NjLOI',
  databaseURL: 'https://flipflip-7cfe3.firebaseio.com/',
})

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

  saveFlip (orientation) {
     const flip = {
       orientation
     }

     const newFlip = firebase.database().ref().child('flips').push().key
     const updates = {}

     updates['/flips/' + newFlip] = flip

     console.log(flip)

     return firebase.database().ref().update(updates)
  }

  handleDeviceOrientation = (orientation) => {
    if (!this.state.running) return

    const { alpha, gamma, absolute, timeStamp, type } = orientation
    const userAgent = navigator.userAgent

    const newOrientation = {
      alpha, gamma, absolute, timeStamp, type, fingerprint: { userAgent }
    }

    this.setState({ orientation: [...this.state.orientation, newOrientation] })
  }

  toggleRunning () {
    if (this.state.running) {
      this.saveFlip(this.state.orientation)
    } else {
      this.setState({ orientation: [] })
    }

    this.setState({
      running: !this.state.running
    })
  }

  componentDidMount() {
    const db = firebase.database()
    let flips = db.ref('flips')

    this.setState({
      ...this.state, flips: flips
    })
  }

  render() {
    const {running, orientation} = this.state

    return (
      <div className="App">
        <DeviceOrientation do={this.handleDeviceOrientation} />

        <p>
          <button className="App-button" onClick={this.toggleRunning}>{running ? 'Stop': 'Start New Recording'} Trick</button>
        </p>

        {!running && (<ResponsiveContainer height="100%" width="100%">
          <LineChart
            width={730}
            height={250}
            data={orientation}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <XAxis dataKey="x" />
            <YAxis />
            <Line dataKey="alpha" stroke="#19cade" animationDuration={0} />
            <Line dataKey="beta" stroke="green" animationDuration={0} />
            <Line dataKey="gamma" stroke="red" animationDuration={0} />
          </LineChart>
        </ResponsiveContainer>)}
      </div>
    )
  }
}

export default App
