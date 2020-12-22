import React, { Component } from 'react'

export default class update extends Component  {

    constructor(props){
        super(props);
        this.state ={
            names:'',
            phone:'',
            address:'',
            age:'',
            clax:'',
            message:'',
            error:'',
        }
    };
    componentDidMount(){
        const phone = this.props.match.params.phone;
        //console.log(JSON.stringify({phone}))
        fetch(`http://localhost:5000/api/user/${phone}`,{
            method:"GET",
            headers:{
                'content-type':'application/json',
                'accept':'application/json'
            }
        }).then(
            response=>response.json()
        ).then(
            userData=>{
                //console.log({userDAta})
                this.setState({names:userData.user.names, phone:userData.user.phone, address:userData.user.address, age:userData.user.address, clax:userData.user.clax, })
            }
        ).catch(err=>console.log(err))
    }
    
    handleChange= name =>e =>{
        this.setState({[name]:e.target.value, message:'', error:''})
    }
    handleUpdate =async (e) =>{
        e.preventDefault();
        const {names, phone, address, clax, age} = this.state;
        const users = {names, phone, address, age, clax}
        fetch('http://localhost:5000/api/user/',{
            method:"PUT",
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
            if(responseDAta.message)return this.setState({message:responseDAta.message})
            if(responseDAta.error) return this.setState({error:responseDAta.error})
            return this.setState({error:"unkown message"})
        }
    ).catch(err=>console.log(err))
    
    }
    render() { 
        const {names, phone, address, age, clax,message,error}=this.state;
        //console.log(JSON.stringify(user))
        return (
            <div>
                <h1>Update User Record Component</h1>
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
                 <td><input type="submit" onClick={this.handleUpdate} value ="Update user" /></td>   
                </tr>
            </table>
        </div>
    )
    }
    
}
