import React, { Component } from 'react'
import Nav from '../styleComponents/Nav.jsx'

export default class Jobs extends Component {
  render() {
    return (

      <div>
        <Nav active="jobs" />



        <ul className="nav nav-tabs flex-column" style={{ marginTop: 20 }}>
          <li className="nav-item">
            <a className="nav-link" href="jobs/fishing">Fishing</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="jobs/mining">Mining</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="jobs/farming">Farming</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="jobs/lumbering">Lumbering</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="jobs/crafting">Crafting</a>
          </li>
        </ul>



      </div>



    )
  }
}
