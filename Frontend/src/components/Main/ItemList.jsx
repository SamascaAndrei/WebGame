import { Paper } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, NavLink, Navigate, useParams } from 'react-router-dom'
import ItemsService from '../../services/ItemsService'
import UsersService from '../../services/UsersService'
import "./ItemList.css"
import Nav from '../styleComponents/Nav.jsx'




const ItemList = () => {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  var user=JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    UsersService.getItems(user.id).then((response) => {

      const items = [];
      for (let item of response.data) {
        item.image = item.image ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg';
        items.push(<li key={item.id} className='item' onClick={() => displayDetails(item)} data-name={item.name} data-amount={item.amount ?? 1} >{<img src={item.image}></img>}</li>);
      }

      setItems(<ul className='item-list'>{items}</ul>);

    }).catch(err => {
      console.log(err);
    })


  }, [])

  function displayDetails(item) {
    console.log(item.name);
    setSelectedItem(item)
  }

  function getItemDetails() {
    if (selectedItem == null) return (<h2>Select an item</h2>)

    const item = selectedItem;

    let stats = [];
    if(item.resource) {
      stats.push(<li key="0" className="list-group-item" data-value={item.amount}>Amount</li>)
    } else {
      stats.push(<li key="1" className="list-group-item" data-value={item.damage}>Damage</li>)
      stats.push(<li key="2" className="list-group-item" data-value={item.value}>Gold</li>)
      stats.push(<li key="3" className="list-group-item" data-value={item.level}>Level</li>)
    }

    return (
      <div className="item-details">
        <h1>{item.name}</h1>
        <img src={item.image} />
        <ul className="list-group stats">
          {stats}
        </ul>
      </div>
    )
  }

  function renderItems() {
    const items = [];
    for (let i = 0; i < 10; i++) {
      const item = {
        id: Math.floor(Math.random() * 100)
      }
      items.push(<li className='item' onClick={() => displayDetails(item)}>{<img src='https://media.sketchfab.com/models/cbe3de4b83164cbbb925ca677d27ec6c/thumbnails/75894e188ab7490b8f379430f3ba7516/1024x576.jpeg'></img>}</li>);
    }
    return <ul className='item-list'>{items}</ul>;
  }




  return (
    <div className='d-flex flex-column h-100'>
      <div>
        <Nav active="inventory" />
      </div>

      <div className='inventory'>
        <div className="left">
          {items}
        </div>
        <div className="right">
          {getItemDetails()}
        </div>
      </div>
      {/* <h2 className='text-center'>List Items</h2>
      <Link to="/add-item" className="btn btn-primary mb-2">Add Item</Link>
      <button style={{ display: "flex" }} onClick={() => window.location.reload()} className='btn btn-warning'>Refresh Page </button>
      <table className='table table-bordered table-striped'>
        <thead>
          <th>Item id</th>
          <th>Item name</th>
          <th>Item level</th>
          <th>Item value</th>
          <th>Item damage</th>
        </thead>
        <tbody>
          {
            items.map(
              item =>
                <tr>
                  <td>{item.id.timestamp}</td>
                  <td>{item.name}</td>
                  <td>{item.level}</td>
                  <td>{item.value}</td>
                  <td>{item.damage}</td>
                  <td>
                    <Link className="btn btn-info" to={{ pathname: `/edit-item/${item.internalId}` }}>Update</Link>

                    <button style={{ marginLeft: "20px" }} onClick={() => ItemsService.deleteItem(item.internalId)} className='btn btn-danger'>Delete </button>
                  </td>
                </tr>
            )
          }
        </tbody>
      </table> */}
    </div>
  )
}

export default ItemList