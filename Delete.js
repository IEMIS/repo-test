import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Delete extends Component  {

    constructor(){
        super();
        this.state ={
            redirect:false,
            message:"",
           error:"",
        }
    }
    componentDidMount(){
        const phone = this.props.match.params.phone;
        //console.log(JSON.stringify({phone}))
        fetch(`http://localhost:5000/api/user`,{
            method:"DELETE",
            body:JSON.stringify({phone}),
            headers:{
                'content-type':'application/json',
                'accept':'application/json'
            }
        }).then(
            response=>response.json()
        ).then(
            userData=>{
                console.log(JSON.stringify({userData}))
                if(userData.message) return this.setState({redirect:true, message:userData.user})
                if(userData.error) return this.setState({redirect:true, error:userData.error})
                return alert("unknown error occured during the process")
        
            }
        ).catch(err=>console.log(err))
    }
    
    render() { 
        const {error, message}=this.state;
        if(message !==""){
            alert(message);
            return <Redirect to="/" />
        }
        if(error !==""){
            alert(error);
            return <Redirect to="/" />
        }
        
        return (
            <div>
             <h3>{message}</h3>
             <h3>{error}</h3>
            </div>
        )
    }
    
}
