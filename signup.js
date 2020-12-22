import React, { Component } from 'react'
import './App.css';
export default class signup extends Component{
    constructor(props){
        super(props);
        this.state ={
            names: '',
            username: '',
            email:'',
            password: '',
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
        const {names, username, email, password} = this.state;
        const users = {names, username, email, password}
        fetch('http://localhost:5000/api/auth/signup',{
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
            if(responseDAta.message)return this.setState({message: responseDAta.message, names:'', username:'', email:'', password:''})
            if(responseDAta.error) return this.setState({error:responseDAta.error})
            return this.setState({error:"unkown message"})
        }
    ).catch(err=>console.log(err))
    
    }
    render() {

    const {names, username, email, password, message,error} =this.state;
    //console.log(JSON.stringify({names, classes, address}))
    return ( 
        <div id="styleup">
        <h1 class="head">Welcome Please Sign up </h1>
            <h3>{message}</h3>
            <h3>{error}</h3>
            <fieldset>
               <legend>New User</legend>
                <p>
                <label class="title">Name:</label><input type="input" value={names} placeholder ="enter names" onChange={this.handleChange('names')} /><br/>
                <label class="title">Username:</label><input type="input" value={username} placeholder ="username" onChange={this.handleChange('username')} /><br/>
                <label class="title">Email:</label><input type="input" value={email} placeholder =" your email" onChange={this.handleChange('email')} /> <br/>
                <label class="title">Password:</label><input type="password" value={password} placeholder ="passowrd" onChange={this.handleChange('password')} /></p>
                 <input type="submit" onClick={this.handleSubmit} value ="sign up" />  
                </fieldset>
                </div>
    )
}
}