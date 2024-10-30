import { useState,useEffect } from "react"
import {useNavigate,Link,useParams} from "react-router-dom"
import React from 'react'
import LocationsService from "../../services/LocationsService"

const AddLocation = () => {
    
    const [name, setName] = useState('')
    const [level, setLevel] = useState('')
    
    const {id} = useParams();

    const navigate = useNavigate();

    const saveLocation = (e) => {
        e.preventDefault();
        const location = { name,level}

        if (id) {
            LocationsService.updateLocation(location,id).then((response) => {
                console.log(id)
                console.log(response.data)
                navigate('/locations')
            }).catch(error => {
                console.log(error);
            })
        }
        else {        
            LocationsService.createLocation(location).then((response) => {

                console.log(response.data)
            
                navigate('/locations')

            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        LocationsService.getLocationById(id).then((response) => {
            setName(response.data.name)
            setLevel(response.data.level)
            console.log(id)
        }).catch(error => {
            console.log(error)
        })
    },[])
        

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update Location</h2>
            
        } else {
            return <h2 className="text-center">Add Location</h2>
        }
    }
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                      <h2 className="text-center">Add Location</h2>
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
                                        name='level'
                                        className='form-control'
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <button className="btn btn-success" onClick={(e)=>saveLocation(e)}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddLocation