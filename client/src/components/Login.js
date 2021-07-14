import ChatDisplay from "./ChatDisplay";
import AdminLogin from "./admin/AdminLogin"
import React from "react"
import { Link, Redirect } from "react-router-dom";
import {Container, Input, Button, Form as form} from "reactstrap"
// Login Screen -> ChatDisplay
export class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            chatLogin: false,
            isAdmin: false
        }
        this.history = this.props.history
    }

    showChat = () => {
        this.setState({
            chatLogin: !this.state.chatLogin
        })
    }

    showAdmin = () => {
        return (
            this.setState({
                isAdmin: !this.state.isAdmin
            })
        )
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.username != "") {
            this.history.push("/chat", { chat: true, username: this.state.username })
        }
        else {
            this.history.push("/chat", { chat: true, username: "anonymous" })
        }
    }

    toggleChat = () => {
        this.setState({
            chatLogin: !this.state.chatLogin
        })
    }

    render() {
        const { chatLogin, username, isAdmin } = this.state
        return (
            <div className="chat-login">
                <Container className="login-container">
                    <Link to="/adminlogin"><Button id="btnAdmin"> Admin Login </Button></Link>
                    <h1 id="lblHome">React Chat</h1>
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <Input id="txtUsername" placeholder="Enter a username" value={this.state.username} onChange={this.handleUsername}></Input>
                        <Button id="login-chat" type="submit">
                            Chat Login
                        </Button>
                    </form>
                </Container>
            </div>
        )

    }
}