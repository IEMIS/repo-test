import React, { Component } from 'react'
import './style.css';
import {Link} from 'react-router-dom';

export default class App extends Component {
    constructor(pros){
        super(pros);
        this.state = {
            data :[],
            message:''
        }
    }
   
    componentDidMount(){
        fetch('http://localhost:5000/api/user/',{
            method:"GET",
            headers:{
                'content-type':'application/json',
                'accept':'application/json'
            }
        }).then(
            response=>response.json()
        ).then(
            responseDAta=>{
                console.log({responseDAta})
                this.setState({data:responseDAta.data, message:responseDAta.message})
            }
        ).catch(err=>console.log(err))
    }
    
    render() {
        const {data, message} = this.state;
        console.log(JSON.stringify({data}))
        return (
            <div>
                <h1>Manage user </h1>
                <ul id="navigation">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/create">Create-User</Link></li> 
            <li>  <Link to="/signup">Sign up here</Link></li>
              <li>  <Link to="/signin">Login</Link></li>
             </ul>
                <Link to="/create">Create new User</Link>
               
               
                {
                    data.length <= 0 ? 
                    (<h1>No record</h1>)
                    :(
                        <table>
                            <thead>
                                <th>SN</th><th>Names</th><th>Class</th><th>Date of Birth</th><th>Phone</th><th>Address</th><th>Action</th>
                            </thead>
                            {
                                data && data.map((user, index)=>{
                                    console.log(JSON.stringify(user));
                                    return(
                                        <tr key={index}>
                                            <td>{user._id}</td>
                                            <td>{user.names}</td>
                                            <td>{user.clax}</td>
                                            <td>{user.age}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.address}</td>
                                            <td><Link to={`/read/${user.phone}`}  >Read One</Link>  </td>
                                            <td><Link to="/create">Create Users</Link>  </td>
                                            <td><Link to={`/update/${user.phone}`}  >Update</Link>  </td>
                                            <td><Link to={`/delete/${user.phone}`}  >Delete</Link>  </td>

                                        </tr>
                                    )
                                })
                            }
                        </table>
                    )
                }
                 <h5>{message}</h5>
            </div>
        )
    }
}
