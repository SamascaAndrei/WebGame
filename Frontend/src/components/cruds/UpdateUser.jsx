import { useState,useEffect } from "react"
import {useNavigate,Link,useParams} from "react-router-dom"
import React from 'react'
import UsersService from "../../services/UsersService"

const UpdateUser = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {id} = useParams();

    const navigate = useNavigate();

    const saveUser = (e) => {
        e.preventDefault();
    
        const user = { username, password }
        
            UsersService.updateUser(user, id).then((response) => {
                console.log(id)
                console.log(response.data)
                navigate('/users')
            }).catch(error => {
                console.log(error);
            })
        }

    useEffect(() => {
        console.log(1);
        UsersService.getUserById(id).then((response) => {
            setUsername(response.data.username)
            setPassword(response.data.password)
            console.log(id)
        }).catch(error => {
            console.log(error)
        })
    },[]) 
        

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                      <h2 className="text-center">Update User</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Username:</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Username'
                                        name="username"
                                        className='form-control'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Password:</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Password'
                                        name='password'
                                        className='form-control'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <button className="btn btn-success" onClick={(e)=>saveUser(e)}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default UpdateUser