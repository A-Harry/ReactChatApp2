import axios from "axios"
import React, { Component } from "react"
import moment from "moment"

const ChatItem = (props) => {
    const { chat } = props
    return (
        <tr>
            <td>{chat.socket_id}</td>
            <td>{chat.username}</td>
            <td>{chat.room}</td>
            <td>{chat.message}</td>
            <td>{moment(chat.createdAt).format("MMMM DD YYYY")}</td>
            <td>{moment(chat.createdAt).format("hh:mm:ss a")}</td>
        </tr>
    )
}

export default class ChatList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chatlog: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/api/history").then(logs => {
            this.setState({
                chatlog: logs.data
            })
        })
    }



    getChatlogs() {
        return (
            this.state.chatlog.map(element => {
                return <ChatItem chat={element} key={element._id} />
            })
        )
    }

    render() {
        return (
            <div className="chatLog">
                <h2>Chat Logs</h2>
                <table id="tblChatLog" className="log-data">
                    <thead>
                        <tr>
                            <th>SocketID</th>
                            <th>Username</th>
                            <th>Room</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getChatlogs()}
                    </tbody>
                </table>
            </div>
        )
    }
}