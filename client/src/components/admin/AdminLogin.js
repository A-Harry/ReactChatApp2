import React from "react";
import axios from "axios";
import {Container, Input, Button} from "reactstrap";

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
        this.admin = await axios.get(`${process.env.REACT_APP_API}/api/admin`)
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
            // setTimeout(() => {
            //     feedback.innerHTML = ""
            // }, 3000)
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
        return (
            <div className="admin-login">
                <Container className="admin-container">
                    <Button onClick={this.returnHome}>Return to Home</Button>
                    <h1>Admin Login</h1>
                    <form className="admin-form" onSubmit={this.handleSubmit}>
                        <label className="lblAdmin">Username:</label>
                        <Input className="txtAdmin-form" id="username" type="text" placeholder="username" onChange={this.handleChange}></Input>
                        <label className="lblAdmin">Password:</label>
                        <Input className="txtAdmin-form" id="password" type="password" placeholder="password" onChange={this.handleChange}></Input>
                        <Button id="btn-admin-submit" type="submit">Login</Button>
                    </form>
                    <p id="feedback"></p>
                </Container>
            </div>
        )
    }
}