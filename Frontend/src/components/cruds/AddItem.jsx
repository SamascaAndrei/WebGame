import { useState,useEffect } from "react"
import {useNavigate,Link,useParams} from "react-router-dom"
import React from 'react'
import ItemsService from "../../services/ItemsService"

const AddItem = () => {
    
    const [name, setName] = useState('')
    const [level, setLevel] = useState('') 
    const [damage, setDamage] = useState('') 
    const [userID,setUserID]= useState('')
    const [image,setImage]= useState('')
    const {internalId} = useParams();

    const navigate = useNavigate();

    const saveItem = (e) => {
        e.preventDefault();
        const item = {name,damage,level,userID,image}

        if (internalId) {
            ItemsService.updateItem(item,internalId).then((response) => {
                console.log(internalId)
                console.log(response.data)
                navigate('/items')
            }).catch(error => {
                console.log(error);
            })
        }
        else {        
            console.log(item, userID);
            ItemsService.createItem(item,userID).then((response) => {

                console.log(response.data)
            
                navigate('/items')

            }).catch(error => {
                console.log(error)
            })
        }
    }

    
    const title = () => {
        if (internalId) {
            return <h2 className="text-center">Update Item</h2>
            
        } else {
            return <h2 className="text-center">Add Item</h2>
        }
    }
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                      <h2 className="text-center">Add Item</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Name:</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Name'
                                        name="name"
                                        className='form-control'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Level:</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Level'
                                        name="level"
                                        className='form-control'
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Damage:</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Damage'
                                        name="damage"
                                        className='form-control'
                                        value={damage}
                                        onChange={(e) => setDamage(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Image Src:</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Image Src'
                                        name="image"
                                        className='form-control'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    >
                                    </input>
                                </div>
                                
                                <button className="btn btn-success" onClick={(e)=>saveItem(e)}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddItem