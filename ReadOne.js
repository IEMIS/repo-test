
import React, { Component } from 'react'

export default class ReadOne extends Component  {

    constructor(props){
        super(props);
        this.state ={
            user:''
        }
    }
    componentDidMount(){
        const phone = this.props.match.params.phone;
        //console.log(JSON.stringify({phone}))
        fetch(`http://localhost:5000/api/user/${phone}`,{
            method:"GET",
            headers:{
                'content-type':'application/json',
                'accept':'application/json',
            }
        }).then(
            response=>response.json()
        ).then(
            userData=>{
                //console.log({userDAta})
                this.setState({user:userData.user})
            }
        ).catch(err=>console.log(err))
    }
    
    render() { 
        const {user}=this.state;
        //console.log(JSON.stringify(user))
        return (
            <div>
                <h1>Read a single data</h1>
                <table>
                    <tr>
                        <td>User ID</td><td>{user._id}</td>
                    </tr>
                    <tr>
                        <td>Names</td><td>{user.names}</td>
                    </tr>
                    <tr>
                        <td>Class</td><td>{user.clax}</td>
                    </tr>
                    <tr>
                        <td>Phone</td><td>{user.phone}</td>
                    </tr>
                    <tr>
                        <td>Date of Birth</td><td>{user.age}</td>
                    </tr>
                    <tr>
                        <td>Address</td><td>{user.address}</td>
                    </tr>
                    <tr>
                        <td>Created Time</td><td>{user.created_at}</td>
                    </tr>
                    <tr>
                        <td>Last Update</td><td>{user.update_at}</td>
                    </tr>
                </table>
            </div>
        )
    }
    
}
