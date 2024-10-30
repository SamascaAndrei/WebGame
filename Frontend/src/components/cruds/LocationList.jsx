import { Paper } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { Link, NavLink, Navigate, useParams } from 'react-router-dom'
import LocationsService from '../../services/LocationsService'





const LocationList = () => {
    const [locations, setLocations] = useState([])    
    useEffect(() => {
      LocationsService.getAllLocations().then((response)=>{
        setLocations(response.data);
        
      }).catch(err=>{
        console.log(err);
      })
    

    }, [])
       

  return (
    <div className="container">
      <h2 className='text-center'>List Locations</h2>
      <Link to="/add-location" className="btn btn-primary mb-2">Add Location</Link>
      <button style={{display:"flex"}} onClick={()=>window.location.reload()} className='btn btn-warning'>Refresh Page </button>
        <table className='table table-bordered table-striped'>
           <thead>
                <th>Location id</th>
                 <th>Location name</th>
                <th>Location level</th>
           </thead>
           <tbody>
            {
          locations.map(
            location =>
              <tr>
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.level}</td>
                <td>
                  <Link className="btn btn-info" to={{ pathname: `/add-location/${location.id}` }}>Update</Link>

                  <button style={{marginLeft:"20px"}} onClick={()=>LocationsService.deleteLocation(location.id)} className='btn btn-danger'>Delete </button>
                </td>
              </tr>
                )
            }
          </tbody>
        </table>
    </div>
  )
}

export default LocationList