import React from "react";
import Admin from "./Admin";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default class AdminLogin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            access: false
        }
    }

    async componentDidMount() {
        this.admin = await axios.get("http://localhost:4000/api/admin")
        document.title = "Admin login"
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // request admin credentials from database
        const username = this.admin.data[0].username
        const password = this.admin.data[0].password
        const feedback = document.getElementById("feedback")
        if (this.state.username !== username && this.state.password !== password) {
            feedback.innerHTML = "Wrong credentials"
            setTimeout(() => {
                feedback.innerHTML = ""
            }, 3000)
        }
        else {
            this.props.history.replace("/admin", { access: true })
        }
        // alert("login triggered")
    }

    logout = () => {
        this.setState({
            access: false
        })
    }
    returnHome = () => {
        this.props.history.push("/");
    }

    render() {
        const { access } = this.state;
        return (
            <div className="admin-login">
                <div>
                    <button onClick={this.returnHome}>Return to Home</button>
                    <label>Admin Login</label>
                    <form className="admin-login" onSubmit={this.handleSubmit}>
                        <input id="username" type="text" placeholder="username" onChange={this.handleChange}></input>
                        <input id="password" type="password" placeholder="password" onChange={this.handleChange}></input>
                        <button id="admin-submit" type="submit">Login</button>
                    </form>
                    <p id="feedback"></p>
                </div>
            </div>
        )
    }
}