import React from "react";
import Admin from "./Admin";

export default class AdminLogin extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            access: false
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        // request admin credentials from database
        if (this.state.username === ""){
            if(this.state.password === ""){
                this.setState({
                    access: true
                })
            }
        }
        // alert("login triggered")
    }

    render(){
        const {access} = this.state;
        return(
            <div className="admin-login">
                {
                !access?
                <div>
                <button onClick={this.returnHome}>Return to Home</button>
                <label>Admin Login</label>
                <form className= "admin-login" onSubmit={this.handleSubmit}>
                    <input id="username" type="text" placeholder="username" onChange={this.handleChange}></input>
                    <input id="password" type="password" placeholder="password" onChange={this.handleChange}></input>
                    <button id="admin-submit" type="submit">Login</button>
                </form>
                </div>
                :
                <Admin/>
                }
            </div>
        )
    }
}