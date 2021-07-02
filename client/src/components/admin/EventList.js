import axios from "axios"
import React, { Component } from 'react'
import moment from "moment"

const EventItem = (props) => {
    const event = props.event
    return (
        <tr>
            <td>{event.socket_id}</td>
            <td>{event.event}</td>
            <td>{moment(event.createdAt).format("MMMM DD YYYY")}</td>
            <td>{moment(event.createdAt).format("hh:mm:ss a")}</td>
            <td>{event.username}</td>
            <td>{event.description}</td>
        </tr>
    )
}

export default class EventList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            log: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/eventlog').then(logs => {
            this.setState({
                log: logs.data
            })
        })
    }



    getEventList() {
        return (
            this.state.log.map((event) => {
                return <EventItem event={event} key={event._id} />
            })
        )
    }

    render() {
        return (
            <div className="eventLog">
                <h2>Event Logs</h2>
                <div className="tblContainer">
                    <table id="tblEventLog" className="log-data">
                        <thead>
                            <tr>
                                <th>SocketID</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Username</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getEventList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

