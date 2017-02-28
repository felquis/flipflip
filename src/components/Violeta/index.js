import React, { Component } from 'react'
import styles from './style.css'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Violeta extends Component {
  constructor() {
    super()
    this.state = {
      isArticleOpen: false,
      color: 'sky'
    }

    this.handleClose = this.handleClose.bind(this)
    this.openThisImage = this.openThisImage.bind(this)
  }

  handleClose() {
    this.setState({
      isArticleOpen: false
    })
  }

  openThisImage(color) {
    this.setState({
      isArticleOpen: true,
      selected: color
    })
  }

  render() {
    const { isArticleOpen, selected } = this.state

    return (
      <div className="Violeta">
        <div className="Violeta-intro">
          <ReactCSSTransitionGroup
            transitionName="changeBackground"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            <div className={'Violeta-intro-background background-' + selected}></div>
          </ReactCSSTransitionGroup>

          <div className="Violeta-options">
            <div onClick={() => this.openThisImage('green')} className="Violeta-options-item">
              <img
                src="/background-green.jpg"
                className="Violeta-options-image"
                width="200"
                alt=""/>
            </div>
            <div onClick={() => this.openThisImage('sky')} className="Violeta-options-item">
              <img
                src="/background-sky.jpg"
                className="Violeta-options-image"
                width="200"
                alt=""/>
            </div>
            <div onClick={() => this.openThisImage('view')} className="Violeta-options-item">
              <img
                src="/background-view.jpg"
                className="Violeta-options-image"
                width="200"
                alt=""/>
            </div>
          </div>

          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {(isArticleOpen ? (
              <div className="Violeta-content-center">
                <div
                  className="Violeta-content">
                  <div
                    className="Violeta-close"
                    onClick={this.handleClose}>X</div>
                  <div className="Violeta-scroll">
                    <div className="Violeta-content-wrap">
                      <h1>Hello World</h1>

                      <img src={`/background-${selected}.jpg`} width="500px" alt=""/>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null)}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default Violeta
