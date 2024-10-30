import React from 'react'
import "./Profile.css"
import Nav from '../styleComponents/Nav.jsx'

const Profile = () => {

  var user=JSON.parse(localStorage.getItem("userData"));

  return (

    <div>
      <Nav active="profile" />

      <ul className="list-group stats">
        <li className="list-group-item" data-value={user.username}>Username</li>
        <li className="list-group-item" data-value={user.password}>Password</li>
        <li className="list-group-item" data-value={user.id}>ID</li>
        <li className="list-group-item" data-value={user.hp}>hp</li>
        <li className="list-group-item" data-value={user.atk}>dmg</li>
        <li className="list-group-item" data-value={user.gold}>gold</li>
      </ul>

    </div>
  )
}
export default Profile