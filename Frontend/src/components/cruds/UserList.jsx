import { Paper } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { Link, NavLink, Navigate, useParams } from 'react-router-dom'
import UsersService from '../../services/UsersService'





const UserList = () => {
    const [users, setUsers] = useState([])    
    useEffect(() => {
      UsersService.getAllUsers().then((response)=>{
        setUsers(response.data);
        
      }).catch(err=>{
        console.log(err);
      })
    

    }, [])
       

  return (
    <div className="container">
      <h2 className='text-center'>List Users</h2>
      <Link to="/add-user" className="btn btn-primary mb-2">Add User</Link>
      <button style={{display:"flex"}} onClick={()=>window.location.reload()} className='btn btn-warning'>Refresh Page </button>
        <table className='table table-bordered table-striped'>
           <thead>
            <tr>
                <th>User id</th>
                <th>User username</th>
                <th>User password</th>
                <th>User location</th>
                <th>Actions</th>
            </tr>
           </thead>
           <tbody>
            {
          users.map(
            user =>
              <tr>
                <td>{console.log(user.id)}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.currentLocation?.name}</td>
                <td>{}</td>
                <td>
                  <Link className="btn btn-info" to={{ pathname: `/edit-user/${user.id}` }}>Update</Link>

                  <button style={{marginLeft:"20px"}} onClick={()=>UsersService.deleteUser(user.id)} className='btn btn-danger'>Delete </button>
                </td>
              </tr>
                ) 
            }
          </tbody>
        </table>
    </div>
  )
}

export default UserList