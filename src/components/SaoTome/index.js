import React from 'react'
import style from './style.css'
import Icon from './Icon.js'
import IconChat from './IconChat.js'
import IconPizza from './IconPizza.js'
import IconPlanet from './IconPlanet.js'

const SaoTome = () => {
  return (
    <div className="SaoTome">
      <div className="SaoTome-intro">
        <div className="box">
        <div className="box-item">
          <div>{<IconChat />}</div>
          <h2>Chat with People</h2>
        </div>
        <div className="box-item">
          <div>{<IconPizza />}</div>
          <h2>Eat Pizza</h2>
        </div>
        <div className="box-item">
          <div>{<IconPlanet />}</div>
          <h2>Plant a Planet</h2>
        </div>
      </div>
      </div>
      <div className="SaoTome-intro-ghost"></div>
      <div className="SaoTome-content">
        <div>
          <h1>Qualquer Coisa</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  )
}
export default SaoTome
