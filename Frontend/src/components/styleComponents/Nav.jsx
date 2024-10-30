import React, { useCallback, useEffect, useState } from 'react'
import "./Nav.css"
import UsersService from '../../services/UsersService';
import LocationsService from '../../services/LocationsService';



const Nav = (props) => {

  const [user,setUser] = useState('')
  const [location,setLocation]=useState('')
  var userStorage=JSON.parse(localStorage.getItem("userData"));





  

  function getClass(name) {
    return name === props.active ? "active" : "";
  }

  function logout()
  {
    localStorage.removeItem("userData");
  } 

  useEffect(() => {

    UsersService.getUserById(userStorage.id).then((response)=>
    {
      setUser(response.data);
    })
  })

 const changeLocation =  async(locationID) =>
  {
      var location=await LocationsService.getLocationById(locationID);
      console.log(location.data);
      user.currentLocation=location.data;
      console.log(location.data)
      console.log(user)
      UsersService.updateUser(user,userStorage.id)

  }
   

  

  return (
      <ul className="nav my-nav nav-tabs" role='navigation'>
        <li className="nav-item">
          <a className={"nav-link " + getClass("profile")} aria-current="page" href="profile">Profile</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + getClass("fight")} href="fight">Fight</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + getClass("jobs")} href="jobs" aria-controls='jobs'>Jobs</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + getClass("shop")} href="shop">Shop</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + getClass("inventory")} href="inventory">Inventory</a>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Change Location</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">{user.currentLocation?.name}</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" onClick={()=>(changeLocation("644a34efdac9487b6216e06a"))}>Start</a></li>
            <li><a className="dropdown-item" >Kaer Morhen</a></li>
            <li><a className="dropdown-item"  onClick={()=>{(changeLocation("644a2dedbae1dc6f9aad1770"))}}>Mordor</a></li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link disabled" href="#" aria-disabled="true">Comming Soon</a>
        </li>

        <li className="nav-item">
            <a className="nav-link" href="/login" onClick={logout} >Log Out</a>
            
          </li>
      </ul>
  )
}
export default Nav