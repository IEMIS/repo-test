import React, { Component } from 'react'
import './App.css';
export default class signin extends Component{
    constructor(props){
        super(props);
        this.state ={
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
        const {email, password, token} = this.state;
        const users = {email, password}
        fetch('http://localhost:5000/api/auth/signin',{
            method:"POST",
            body:JSON.stringify(users),
            headers:{
                'content-type':'application/json',
                'accept':'application/json',
                'bearer': token,
            }
    }).then(
        response=>response.json()
    ).then(
        responseDAta=>{
            console.log({responseDAta})
                if(responseDAta.message){
                    let jwt =responseDAta.token
                    localStorage.setItem("token", jwt)
                return this.setState({message: responseDAta.message, email:'', password:''})
            }
            
            if(responseDAta.error) return this.setState({error:responseDAta.error})
            return this.setState({error:"unkown message"})
        }
    ).catch(err=>console.log(err))
    }
    showToken= ()=>{
        const token =localStorage.getItem("token");
        console.log(JSON.stringify({token}))
        alert(token);
    }
    render() {

    const { email, password, message,error} =this.state;
    return ( 
        <div id="styleup">
        <h1 class="head">Welcome Please Sign in </h1>
            <h3>{message}</h3>
            <fieldset>
               <legend>Registered Users</legend>
                <p><label class="title">Email:</label><input type="input" value={email} placeholder =" your email" onChange={this.handleChange('email')} /> <br/>
                <label class="title">Password:</label><input type="password" value={password} placeholder ="passowrd" onChange={this.handleChange('password')} /></p>
                 <input type="submit" onClick={this.handleSubmit} value ="sign in" />  
                </fieldset>
        </div>
    )
    }
}
