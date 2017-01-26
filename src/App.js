import React, { Component } from 'react'
import './App.css'
import {DeviceOrientation} from 'react-event-components'
import firebase from 'firebase'
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
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
      flipCount: 0,
    }

    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this)
    this.toggleRunning = this.toggleRunning.bind(this)
  }

  saveFlip (orientation) {
    const userAgent = navigator.userAgent

    const flip = {
      orientation,
      fingerprint: { userAgent },
      created_at: firebase.database.ServerValue.TIMESTAMP
    }

    const newFlip = firebase.database().ref().child('flips').push().key

    const updates = {}
    updates[`/flips/${this.state.uid}/${newFlip}`] = flip
    firebase.database().ref().update(updates)
  }

  handleDeviceOrientation (orientation) {
    if (!this.state.running) return

    const { alpha, gamma, absolute, timeStamp, type, beta } = orientation

    const newOrientation = {
      alpha, gamma, absolute, timeStamp, type, beta
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

  getFlipPoints() {
    if (!this.state.uid) return

    firebase.database().ref(`flips/${this.state.uid}`).on('child_added', (flips) => {
      this.setState({
        ...this.state, flipCount: this.state.flipCount + 1
      })
    })
  }

  componentDidMount() {
    let flips = firebase.database().ref('flips')

    this.setState({
      ...this.state, flips: flips
    })

    firebase.auth().onAuthStateChanged((user) => {
      // User is signed in.
      if (user) {
        const uid = user.uid

        this.setState({
          ...this.state, uid: uid
        })

        this.getFlipPoints()

        return
      }

      this.setState({
        ...this.state, uid: false
      })

      // User is signed out, so create a new user
      firebase.auth().signInAnonymously().catch((error) => {
        const { code, message } = error

        alert(`Error While Saving Anonymous ID: ${message} ${code}`)
      })
    })
  }

  render() {
    const {running, orientation} = this.state

    return (
      <div className="App">
        <DeviceOrientation do={this.handleDeviceOrientation} />

        <footer className="App-footer">
          {this.state.flipCount} flips points
          <button className="App-button" onClick={this.toggleRunning}>{running ? 'Stop Recording': 'Start New Recording'}</button>
        </footer>

        {!running && (<ResponsiveContainer height="90%" width="100%">
          <LineChart
            width={730}
            height={250}
            data={orientation}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <XAxis dataKey="x" />
            <YAxis domain={[-100, 100]} />
            <Legend />
            <Line dataKey="alpha" stroke="#19cade" animationDuration={0} dot={false}/>
            <Line dataKey="beta" stroke="green" animationDuration={0} dot={false}/>
            <Line dataKey="gamma" stroke="red" animationDuration={0} dot={false}/>
          </LineChart>
        </ResponsiveContainer>)}
      </div>
    )
  }
}

export default App
