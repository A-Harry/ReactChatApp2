import React, { Component } from 'react'
import EventList from "./EventList"
import ChatList from "./ChatList"
import "../../assets/styles.css"
import RoomList from './RoomList'

export default class Admin extends Component {
    render() {
        return (
            <div className="admin-container">
                <EventList/>
                <ChatList/>
                <RoomList/>
            </div>
        )
    }
}
