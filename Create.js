
import React, { Component } from 'react'

export default class Create extends Component{
    constructor(props){
        super(props);
        this.state ={
            name: '',
            phone: '',
            address:'',
            age: '',
            clax:'',
            message: '',
            error :'',
        }
    };

    componentDidMount(){

    }
    handleChange= name =>e =>{
        this.setState({[name]:e.target.value, message:'', error:''})
    }
    handleSubmit =async (e) =>{
        e.preventDefault();
        const {names, phone, address, clax, age} = this.state;
        const users = {names, phone, address, age, clax}
        fetch('http://localhost:5000/api/user/',{
            method:"POST",
            body:JSON.stringify(users),
            headers:{
                'content-type':'application/json',
                'accept':'application/json'
            }
    }).then(
        response=>response.json()
    ).then(
        responseDAta=>{
            console.log({responseDAta})
            if(responseDAta.message)return this.setState({message: responseDAta.message, names:'',phone:'', address:'', age:'', clax:''})
            if(responseDAta.error) return this.setState({error:responseDAta.error})
            return this.setState({error:"unkown message"})
        }
    ).catch(err=>console.log(err))
    
    }
    render() {

    const {names, phone, address,age, clax, message,error} =this.state;
    //console.log(JSON.stringify({names, classes, address}))
    return ( 
        <div>
            <h1>Create a new User Components </h1>
            <h3>{message}</h3>
            <h3>{error}</h3>
            <table>
                <tr>
                    <td>Name </td> <td><input type="input" value={names} placeholder ="name " onChange={this.handleChange('names')} /></td>   
                </tr>
                <tr>
                    <td>Phone </td> <td><input type="number" value={phone} placeholder ="Phone" onChange={this.handleChange('phone')} /></td>   
                </tr>
                <tr>
                    <td>Address </td> <td><input type="input" value={address} placeholder ="Address" onChange={this.handleChange('address')} /></td>   
                </tr>
                <tr>
                    <td>Class </td> <td><input type="input" value={clax} placeholder ="Class" onChange={this.handleChange('clax')} /></td>   
                </tr>
                <tr>
                    <td>Date of Birth </td> <td><input type="date" value={age} placeholder ="Address" onChange={this.handleChange('age')} /></td>   
                </tr>
                <tr>
                 <td><input type="submit" onClick={this.handleSubmit} value ="create new user" /></td>   
                </tr>
            </table>
        </div>
    )
}
}