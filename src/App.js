import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {DeviceOrientation} from 'react-event-components'
import firebase from 'firebase'
import config from './config'
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

const db

class App extends Component {
  constructor () {
    super()
    this.state = {
      orientation: [],
      running: false,
      user: JSON.parse(localStorage.getItem('flipflip-user') || '{}'),
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

    if (this.state.running) {
      const flips = flips.push().key
      console.log('Should save to current user!')
    }

    this.setState({
      running: !this.state.running
    })
  }

  componentDidMount () {
    const db = firebase.initializeApp(config.firebase).database()

    // if we id
    if (this.state.user.key) {
      const users = db.ref('users/' + this.state.user.key)

      this.setState({
        ...this.state,
      })

      return
    }

    // does not have id

    const flips = users.child(this.state.user.key)

    this.setState({
      ...this.state, db: db
    })

    if (this.state.user.key) {}

    const user = users.push()
    const updates = {}

    updates['users/' + user.key] = {
      id: user.key,
      created_at: (new Date()).toISOString(),
      flips: []
    }

    localStorage.setItem('flipflip-user', JSON.stringify(updates['users/' + user.key]))

    db.ref().update(updates)
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
