import React from 'react'
import { useState, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap'
import "./shake.css"
import Nav from '../styleComponents/Nav.jsx'
import {Modal} from 'bootstrap'
import UsersService from '../../services/UsersService'
import LocationsService from '../../services/LocationsService'

const wolfID="646106f2a15edd4afc137a09";




const Fight = () => {
  const [health, sethealth] = useState(100)
  const [healthcolor, sethealthcolor] = useState("success")
  const [drops, setDrops] = useState([])
  const [location, setLocation] = useState('')
  const [monsterID,setMonsterID]=useState(wolfID)


  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("userData"));
    LocationsService.getLocationById(user.currentLocation.id).then((response) => {
      setLocation(response.data);
    })
  //RANDOM PICK BEWTEEN MONSTERS OF THE LOCATION AND SELECT ONE
  // MonsterService.getMonsterbyID(getRandomMonster(location)).then((response)=>
  //{
  ////setMonsterID(monsterselected)  
  //})
  })
  

  const Shake = async (e) => {
    const poza = document.querySelector("#poza")
    poza.classList.add("shake")
    e.target.setAttribute("disabled", "");
    const newhealth = health - 10;
    sethealth(newhealth);
    const progress = document.querySelector("#progress")
    console.log(newhealth)

    if (newhealth < 80)
      sethealthcolor("warning")

    if (newhealth < 40)
      sethealthcolor("danger")

    if (newhealth < 1) {
      poza.classList.add("dead")
      e.target.setAttribute("disabled", "");
      UsersService.getDropItems(user.id, monsterID).then(res => {
        setDrops(res.data.map((x, i) => <div><label key={i}>x1 {x.name}</label><img src={x.image}></img></div>))
        const myModal = new Modal(document.getElementById('exampleModal'), {
          keyboard: false
        })

        myModal.show()
      })
      // setTimeout(() => {
      //   const myModal = new Modal(document.getElementById('exampleModal'), {
      //     keyboard: false
      //   })

      //   myModal.show()
      // }, 500)
      return;
    }

    setTimeout(() => {
      poza.classList.remove("shake");
      e.target.removeAttribute("disabled");
    }, 200);
  }

  function reset() {
    window.location.reload()
  }

  return (

    <div>
      <Nav active="fight" />
      <div style={{ display: 'flex', height: "90vh", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src="./flamand3_thumb.png" alt="logo" style={{ display: 'block' }} id='poza' />
        <div style={{ width: "30vw" }}><ProgressBar animated striped variant={healthcolor} now={health} id="progress"></ProgressBar></div>
        <br />
        <button className="btn btn-success" onClick={Shake}>Fight</button>
      </div>


      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Battle Won</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Ai primit:
              <br />
              {drops}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={reset}>Go again</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default Fight