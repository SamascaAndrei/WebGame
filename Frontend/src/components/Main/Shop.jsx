import React, { Component } from 'react'
import Nav from '../styleComponents/Nav.jsx'
import ItemsService from '../../services/ItemsService.js'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UsersService from '../../services/UsersService.js'
import { Modal } from 'bootstrap'


const Shop = () => {
  var reposUser = JSON.parse(localStorage.getItem("userData"));
  const [items, setItems] = useState([])
  const [item, setItem] = useState('')
  const [user, setUser] = useState('')
  useEffect(() => {
    ItemsService.getAllItems().then((response) => {
      setItems(response.data);

    }).catch(err => {
      console.log(err);
    })

    UsersService.getUserById(reposUser.id).then((response) => {
      setUser(response.data);
    })


  }, [])




  const BuyItem = (itemID) => {
    console.log(itemID);
      ItemsService.getItemById(itemID).then((response) => {
        setItem(response.data);
        console.log(user.gold)
        if (user.gold >= 150) {
          UsersService.addItem(user.id, itemID);
          user.gold = user.gold - 150;
          UsersService.updateUser(user, user.id);
          localStorage.setItem("userData",JSON.stringify(user));
        }
        else {
          const myModal = new Modal(document.getElementById('exampleModal'), {
            keyboard: false
          })
          myModal.show();
        }
      }
      )
  }

  return (

    <div>
      <Nav active="shop" />
      <div>
        <h2 className='text-center'>Welcome to the shop!</h2>

        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
            <th>Item id</th>
            <th>Item name</th>
            <th>Item level</th>
            <th>Item damage</th>
            <th>Item cost</th>
          </tr>
          </thead>
          <tbody>
            {
              items.map(
                item =>
                  <tr key={item.id}>
                    <td >{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.level}</td>
                    <td>{item.damage}</td>
                    <td>150</td>
                    <td>
                      <button style={{ marginLeft: "20px" }} onClick={() => BuyItem(item.id)} className='btn btn-warning'>Buy </button>
                    </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Item Not Bought</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Nu ai bani :/
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>





    </div>
  )
}
export default Shop
