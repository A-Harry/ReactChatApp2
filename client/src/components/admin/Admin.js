import React, { Component } from 'react'
import EventList from "./EventList"
import ChatList from "./ChatList"
import RoomList from './RoomList'
import { Redirect } from 'react-router'

export default class Admin extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        document.title = "Admin Dashboard"
    }
    componentWillUnmount() {
        const {history} = this.props
        history.replace("/adminlogin")
    }

    logout = () => {
        const {history} = this.props
        history.replace("/admin")
    }
    render() {
        if (this.props.location.state) {
            return (
                <div className="admin-container">
                    <button onClick={this.logout}>Logout</button>
                    <EventList />
                    <ChatList />
                    <RoomList />
                </div>
            )
        }
        else {
            return <Redirect to="/adminlogin" />
        }
    }
}
