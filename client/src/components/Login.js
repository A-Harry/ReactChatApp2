import ChatDisplay from "./ChatDisplay";
import AdminLogin from "./admin/AdminLogin"
import React from "react"
import { Link, Redirect } from "react-router-dom";
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
            <div className="login-container">
                <div>
                    <Link to="/adminlogin"><button> Admin Login </button></Link>
                    <form onSubmit={this.handleSubmit}>
                        <button id="login-chat" type="submit">
                            Chat Login
                        </button>
                        <input placeholder="Enter a username" value={this.state.username} onChange={this.handleUsername}></input>
                    </form>
                </div>
            </div>
        )

    }
}