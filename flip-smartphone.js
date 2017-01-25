import React, { Component } from 'react'
import {DeviceOrientation, Every} from 'react-event-components'

class FlipSmartphone extends Component {  
  constructor () {
    super()
    this.state = {
      deviceOrientation: {}
    }
  }

  handleDeviceOrientation = ({beta, gamma, alpha, absolute}) => {
    this.setState({
      deviceOrientation: {
        beta,
        gamma,
        alpha,
        absolute
      }
    })
  }

  handleEvery = (a) => {
    console.log(a)
  }

  render() 
    return (
      <div>
        <DeviceOrientation do={this.handleDeviceOrientation} />
        <Every frame do={this.handleEvery} />
      </div>
    )
  }
}

export default App
